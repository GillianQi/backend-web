<template>
  <div>
    <div class="container">
      <div class="handle-box">
        客户名称：<el-input v-model="query.userName" placeholder="客户名称" class="handle-input mr10"></el-input>
        企业名称： <el-input v-model="query.companyName" placeholder="企业名称" class="handle-input mr10"></el-input>
        工程名称： <el-input v-model="query.programName" placeholder="工程名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="orderNum" label="订单编号"></el-table-column>
        <el-table-column prop="companyUserName" label="客户名称"></el-table-column>
        <el-table-column prop="companyName" label="企业名称"></el-table-column>
        <el-table-column prop="companyWorkInfoName" label="工程项目名称"></el-table-column>
        <el-table-column prop="salaryDate" label="工资日期"></el-table-column>
        <el-table-column prop="createTime" label="申请时间"></el-table-column>
        <el-table-column prop="endTime" label="结束日期"></el-table-column>
        <el-table-column label="工资表" align="center">
          <template slot-scope="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.salaryPic"
              :preview-src-list="[scope.row.salaryPic]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="施工人员" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-view"
              @click="handleView(scope.$index, scope.row)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
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
  getSalaryListApi
} from '@/api/'

export default {
  name: 'finishsalary',

  data() {
    return {
      query: {
        userName: '',
        companyName: '',
        programName: '',
        salaryStatus: '2',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
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
      const res = await getSalaryListApi(this.query)
      this.tableData = res.data.list
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'pageIndex', 1);
      this.getData();
    },
    // 编辑操作
    handleView(index, row) {
      this.$router.push({
        path: '/salary-list',
        query: {
          id: row.id
        }
      })
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
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
