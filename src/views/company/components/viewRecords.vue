<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-date-picker
          v-model="query.date"
          type="date"
          value-format="yyyy-MM-dd"
          class="mr10"
          placeholder="选择日期">
        </el-date-picker>
        <el-input v-model="query.workerName" placeholder="姓名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="workerName" label="姓名"></el-table-column>
        <el-table-column prop="workCompany" label="参加单位"></el-table-column>
        <el-table-column prop="workGroup" label="班组"></el-table-column>
        <el-table-column prop="cardNo" label="卡号"></el-table-column>
        <el-table-column prop="idCard" label="身份证号"></el-table-column>
        <el-table-column prop="channel" label="通道"></el-table-column>
        <el-table-column prop="signType" label="进/出"></el-table-column>
        <el-table-column prop="signTime" label="考勤日期"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.page"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getWorkerClockinApi
} from '@/api/'

export default {
  name: 'workers',
  props: {
    programId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      query: {
        companyId: this.$route.query.id,
        workId: this.programId,
        date: '',
        workerName: '',
        page: 0,
        pageSize: 10,
      },
      fileList: [],
      tableData: [],
      companyList: [],
      projectList: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await getWorkerClockinApi(this.query)
      if (res && res.code === 0) {
        this.tableData = res.data.list
        this.pageTotal = res.data.totalCount
      }
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'page', 1);
      this.getData();
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'page', val);
      this.getData();
    }
  }
};
</script>

<style scoped lang="scss">
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.upload-excel {
  margin: 20px 0;
  width: 40%;

  /deep/ .el-upload--text {
    height: inherit;
    border: none;
    display: inline;
  }
}

.handle-input {
  width: 200px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
