<template>
	<div>
		<el-form ref="form" :model="form" style="display:inline;label-width=80px">
			<el-form-item label="IP地址:">
				<el-input placeholder="IP地址" v-model="form.ipaddress" ref="type1">
				</el-input>
				<div style="display:inline">
					<span>采集URL:</span>
					<el-select v-model="form.selurlclass" placeholder="请选择" @change="selurlclassChange">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="item in option1" :key="item.name" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
					<el-select v-model="form.selurl" placeholder="请选择">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="item in option2" :key="item.name" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
					</div>
			</el-form-item>
        <el-form-item>
				<span> 查询日期:</span>
				<el-date-picker v-model="form.startDate" @change="setStartDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
				</el-date-picker>&nbsp至&nbsp
				<el-date-picker v-model="form.endDate" @change="setEndDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
				</el-date-picker>
				<div style="display:inline">
					<el-button type="primary" @click="showEchart()">查询</el-button>
					<el-button type="primary" @click="exportIpcheck">
						<i class="fa fa-cloud-download"></i>&nbsp批量导出</el-button>
				</div>
	</el-form-item>
		</el-form>
		<el-table v-loading.body="loading" :data="tableData.entities" border style="margin-top:20px;width: 100%">
			<el-table-column prop="IP" label="IP地址">
			</el-table-column>
			<el-table-column prop="SELURL" label="应用">
			</el-table-column>
			<el-table-column prop="HANDLE" label="操作">
			</el-table-column>
			<el-table-column prop="AVERAGE" label="平均时长(秒)">
			</el-table-column>
			<el-table-column prop="DEPT" label="出单点">
			</el-table-column>
			<el-table-column prop="USERNAME" label="出单员">
			</el-table-column>
		</el-table>
		<div class="block" v-show="tableData.total > 0">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
			</el-pagination>
		</div>
		</div>
</template>
<script>
export default {
	data() {
		return {
			tableData: {},
			loading: false,
			sth: '',
			option1: [],
			option2: [],
			form: {
				startDate: '',
				endDate: '',
				selurlclass: '',
				selurl: '',
				ipaddress: ''
			},
			pickerOptions0: {
				disabledDate(time) {
					return time.getTime() > Date.now();
				}
			},
			tableData: {},
			loading: false,
			total: 1,
			currentPage: 1,
			size: 10,
		}
	},
	created() {
		this.getSelectOption();
	},
	watch: {
		items: {
			handler: function (val, oldval) {
				console.log(this.$refs.type.value);
			}
		}
	},
	methods: {
		getSelectOption() {
			this.$axios({
				method: 'get',
				url: '/api/service/as/getUrlSelect',
			}).then((response) => {
				this.option1 = response.data;
			})
				.catch(function (error) {
					this.loading = false;
					console.log(error);
				});
		},
		exportIpcheck() {
			var data = this.$qs.stringify(this.form);
			let url = '/api/service/as/downIpcheckTable?' + data;
			window.open(url);
		},
		showEchart() {
			this.loading = true;
			// var data = this.$qs.stringify(this.form);
			var data = this.form;
			console.log(data);
			let url = '/api/service/as/getIpcheckTable?size=' + this.size + '&pageIndex=' + this.currentPage;
			this.$axios({
				method: 'post',
				url: url,
				data: data,
				/***如果qs没有stringify,将下面方法打开才能提交form **/
				transformRequest: [function (data) {
					// Do whatever you want to transform the data
					let ret = ''
					for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				}],
				// headers: {
				//   'Content-Type': 'application/x-www-form-urlencoded'
				// }
			}).then((response) => {
				this.tableData = response.data;
				this.loading = false;
			})
				.catch(function (error) {
					this.loading = false;
					console.log(error);
				});
		},

		//联动菜单
		selurlclassChange(val) {
			var item = this.option1;
			for (var i = 0; i < item.length; i++) {
				var option1 = item[i];
				if (option1.name == val) {
					this.option2 = option1.children;
				}
			}
		},

		handleSizeChange(val) {
			this.size = val;
			this.showEchart();
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.showEchart();
		},
		setStartDate(val) {
			this.form.startDate = val;
		},
		setEndDate(val) {
			this.form.endDate = val;
		}

	}
}
</script>

<style scoped>
.el-input {
	width: 145px;
	height: 36px;
}
</style>