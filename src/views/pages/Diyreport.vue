<template>
	<div>
		<el-form ref="form" :model="form" style="display:inline;label-width=80px">
			<el-form-item label="查询日期：">
				<div style="display:inline">
					<el-date-picker v-model="form.startDate" @change="setStartDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
					</el-date-picker>&nbsp至&nbsp
					<el-date-picker v-model="form.endDate" @change="setEndDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
					</el-date-picker>
				</div>
				<div style="display:inline">
					<el-button type="primary" @click="showEchart()">查询</el-button>
					<el-button type="primary" @click="exportReport">
						<i class="fa fa-cloud-download"></i>&nbsp批量导出</el-button>
				</div>
			</el-form-item>
			<el-form-item label="上传更新：">
				<el-upload ref="upload" action="/api/service/as/uploadDiyIP" :on-success="handleRes" :on-remove="handleRemove">
					<el-button icon="upload" type="primary">IP上载</el-button>
					<el-button icon="document" @click.stop="downTemplate" type="success">模板下载</el-button>
				</el-upload>
			</el-form-item>
		</el-form>
		<el-table v-loading.body="loading" :data="tableData.entities" border style="margin-top:20px;width: 100%">
			<el-table-column prop="IP" label="IP地址">
			</el-table-column>
			<el-table-column prop="SELURL" label="应用">
			</el-table-column>
			<el-table-column prop="HANDLE" label="操作">
			</el-table-column>
			<el-table-column prop="ALERTDATE" label="统计时间">
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
		<el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
			<span>{{message}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			tableData: {},
			loading: false,
			sth: '',
			option1: "",
			option2: "",
			message: "",
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
			dialogVisible: false,
			total: 1,
			currentPage: 1,
			size: 10,
		}
	},
	created() {
		this.showEchart();
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
		exportReport() {
			var data = this.$qs.stringify(this.form);
			let url = '/api/service/as/downReportTable?' + data;
			window.open(url);
		},
		showEchart() {
			this.loading = true;
			// var data = this.$qs.stringify(this.form);
			var data = this.form;
			console.log(data);
			let url = '/api/service/as/getReportTable?size=' + this.size + '&pageIndex=' + this.currentPage;
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

		handleRes(response, file, fileList) {
			this.message = response.message;
			this.dialogVisible = true;
			this.$refs.upload.clearFiles();

		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handleClose(done) {

			this.$confirm('确认关闭？')
				.then(_ => {
					done();
				}).catch(_ => { });
		},
		setStartDate(val) {
			this.form.startDate = val;
		},
		setEndDate(val) {
			this.form.endDate = val;
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
		//      alertDate(row, column) {
		//   return (ALERTDATE.getTime());
		// },
		handleSizeChange(val) {
			this.size = val;
			this.showEchart();
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.showEchart();
		},
		downTemplate() {
			let url = '/api/service/as/downTemplate?filename=asiptemplate.xlsx';
			window.open(url);
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