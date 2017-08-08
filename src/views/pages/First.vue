<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="采集Url">
        <el-select v-model="selurlclass" placeholder="请选择" >
          <el-option label="全部" value=""></el-option>
          <el-option v-for="item in option1" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
          <el-button icon="search" type="primary" @click="getFirst">查询</el-button>
          <el-button icon="document" type="primary" @click="downExcel">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData.entities" border style="width: 100%">
      <el-table-column prop="SELURLCLASS" label="环节">
      </el-table-column>
      <el-table-column prop="IP" label="IP地址">
      </el-table-column>
      <el-table-column prop="COMNAME" label="单位">
      </el-table-column>
      <el-table-column prop="WORKPLACE" label="出单点">
      </el-table-column>
      <el-table-column prop="WEEKALERT" label="本周报警次数">
      </el-table-column>
      <el-table-column prop="WEEKCOUNT" label="本周操作次数">
      </el-table-column>
      <el-table-column prop="WEEKRATE" label="本周报警比例" :formatter="weekRate">
      </el-table-column>
      <el-table-column prop="ALLALERT" label="累计报警次数">
      </el-table-column>
      <el-table-column prop="ALLCOUNT" label="累计操作次数">
      </el-table-column>
      <el-table-column prop="ALLRATE" label="累计报警比例" :formatter="allRate">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  created() {
    this.getSelectOption();
    // this.getFirst();
  },
  data() {
    return {
      option1:"",
      tableData: {},
      loading: false,
      selurlclass: "",
      form:{}
    }
  },
  methods: {
    getFirst() {
      let url = '/api/service/as/getFirstTable?selurlclass=' + this.selurlclass;
      this.loading = true;
      this.$axios({
          method: 'get',
          url: url,
          responseType: 'json',
          data: {
            startdate: '2017-07-14'
          }
        }).then((response) => {
          // console.log(response.data.entities);
          this.tableData = response.data;
          this.loading = false;
        })
        .catch(function(error) {
          this.loading = false;
          console.log(error);
        });
    },
    weekRate(row, column) {
      return ((row.WEEKRATE) * 100).toFixed(2) + '%';
    },
    allRate(row, column) {
      return ((row.ALLRATE ) * 100).toFixed(2) + '%';
    },
    downExcel() {
      let url = '/api/service/as/downFirstTable?selurlclass=' + this.selurlclass;
      window.open(url);
    },
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
  }
}

</script>
<style scodpe>
/*.downButton {
  margin: 10px 15px;
}
*/
</style>
