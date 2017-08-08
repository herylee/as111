<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="采集Url">
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
        <el-button icon="search" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item label="上传更新">
        <el-upload ref="upload" action="/api/service/as/uploadThreshold" :on-success="handleRes" :on-remove="handleRemove">
          <el-button icon="upload" type="primary">批量上传</el-button>
          <el-button icon="document" @click.stop="downTemplate" type="success">模板下载</el-button>
        </el-upload>
      </el-form-item>
      <!--       <el-form-item label="查询日期">
      </el-form-item> -->
    </el-form>
    <el-table v-loading.body="loading" :data="tableData.entities" border style="width: 100%">
      <el-table-column prop="selurlclass" label="环节">
      </el-table-column>
      <el-table-column prop="selurl" label="IP地址">
      </el-table-column>
      <el-table-column prop="threshold" label="阈值">
      </el-table-column>
    </el-table>
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
  created() {
    this.getSelectOption();
  },
  data() {
    return {
      msg: '我是统计',
      form: {
        selurlclass: '',
        selurl: '',
      },
      option1: "",
      option2: "",
      loading: false,
      tableData: "",
      message: "",
      dialogVisible: false
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
        .catch(function(error) {
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
    onSubmit() {
      this.loading = true;
      var data = this.form;
      console.log(this.form);
      let url = '/api/service/as/getThreshold';
      this.$axios({
          method: 'post',
          url: url,
          data: data,
          /***如果qs没有stringify,将下面方法打开才能提交form **/
          transformRequest: [function(data) {
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
        .catch(function(error) {
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
        }).catch(_ => {});
    },
    downTemplate() {
      let url = '/api/service/as/downTemplate?filename=asthresholdtemplate.xlsx';
      window.open(url);
    }
  }
}

</script>
