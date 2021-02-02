<template>
  <div>
    <div class="container">
      <div class="handle-box">
        客户名称：<el-input v-model="query.userName" placeholder="客户名称" class="handle-input mr10"></el-input>
        企业名称： <el-input v-model="query.companyName" placeholder="企业名称" class="handle-input mr10"></el-input>
        工程名称： <el-input v-model="query.programName" placeholder="工程名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button type="primary" @click="handleRefuse">拒绝</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="orderNum" label="订单编号"></el-table-column>
        <el-table-column prop="companyUserName" label="客户名称"></el-table-column>
        <el-table-column prop="companyName" label="企业名称"></el-table-column>
        <el-table-column prop="companyWorkInfoName" label="工程项目名称"></el-table-column>
        <el-table-column prop="salaryDate" label="佣金日期"></el-table-column>
        <el-table-column prop="preSalary" label="预发佣金"></el-table-column>
        <el-table-column prop="sumSalary" label="总发金额"></el-table-column>
        <el-table-column prop="createTime" label="申请时间"></el-table-column>
        <el-table-column label="佣金表" align="center">
          <template slot-scope="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.salaryImg"
              :preview-src-list="[scope.row.salaryImg]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
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
  getSalaryListApi,
  refuseSalaryApi,
  submitWorkersSalaryApi
} from '@/api/'
export default {
  name: 'workers',

  data() {
    return {
      query: {
        salaryStatus: '1', // 1:待处理，2：已同意，3：拒绝
        programName: '',
        companyName: '',
        userName: '',
        page: 1,
        pageSize: 10
      },
      tableData: [],
      multipleSelection: [],
      pageTotal: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await getSalaryListApi(this.query)
      if (res && res.code == 0) {
        this.tableData = res.data.list
        this.pageTotal = res.data.totalCount
      }
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'page', 1);
      this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async handleSubmit() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请至少选中一条');
        return
      }
      let ids = this.multipleSelection.map(item => {
        return item.id
      })
      const res = await submitWorkersSalaryApi({ids: ids.toString()})
      if (res && res.code ==0) {
        this.$message.success('操作成功')
        this.getData()
      }
    },
    async handleRefuse() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请至少选中一条');
        return
      }
      let ids = this.multipleSelection.map(item => {
        return item.id
      })
      const res = await refuseSalaryApi({ids: ids.toString()})
      if (res && res.code ==0) {
        this.$message.success('操作成功')
        this.getData()
      }
    },
    // 编辑操作
    handleEdit(index, row) {
      this.$router.push({
        path: '/salary-edit',
        query: {
          id: row.id
        }
      })
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'page', val);
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
