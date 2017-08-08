<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="刷新日期">
        <el-date-picker v-model="startDate" @change="setStartDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
        </el-date-picker>至
        <el-date-picker v-model="endDate" @change="setEndDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
        </el-date-picker>
        <el-button icon="search" type="primary" :disabled="submitStatus" @click="onSubmit('form')">刷新</el-button>
      </el-form-item>
    </el-form>
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
  created() {},
  data() {
    return {
      form: {
        alertDate: '',
        startDate: '',
        endDate: ''
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      alertDate: '',
      submitStatus: false,
      dialogVisible: false,
      message: '',
      rules: {
        alertDate: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }], 
        startDate: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
        endDate: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]
      },
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submit() {
      this.submitStatus = true;
      var data = this.$qs.stringify(this.form);
      // var data = this.form;

      console.log(this.alertDate);
      let url = '/api/service/as/runAsFlow';
      this.$axios({
          method: 'post',
          url: url,
          data: data,
        }).then((response) => {
          console.log(response);
          this.submitStatus = false;
          this.message = response.data.message;
          this.dialogVisible = true;
        })
        .catch(function(error) {
          this.submitStatus = false;
          console.log(error);
        });

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
    setAlertDate(val) {

      this.alertDate = val;
    },
    setStartDate(val) {
      this.form.startDate = val;
    },
    setEndDate(val) {
      this.form.endDate = val;
    }

  },
  watch: {


  }

}

</script>
<style scoped>
.el-input {
  width: 205px;
}

</style>
