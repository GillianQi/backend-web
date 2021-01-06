<template>
  <div>
    <div class="container">
      <div class="handle-box">
        客户名称：<el-input v-model="query.name" placeholder="客户名称" class="handle-input mr10"></el-input>
        企业名称： <el-input v-model="query.name" placeholder="企业名称" class="handle-input mr10"></el-input>
        工程名称： <el-input v-model="query.name" placeholder="工程名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="orderId" label="订单编号"></el-table-column>
        <el-table-column prop="customerName" label="客户名称"></el-table-column>
        <el-table-column prop="programCompanyName" label="企业名称"></el-table-column>
        <el-table-column prop="programName" label="工程项目名称"></el-table-column>
        <el-table-column prop="salaryDate" label="工资日期"></el-table-column>
        <el-table-column prop="salaryDate" label="预发工资"></el-table-column>
        <el-table-column prop="salaryDate" label="总发金额"></el-table-column>
        <el-table-column prop="applyTime" label="申请时间"></el-table-column>
        <el-table-column label="工资表" align="center">
          <template slot-scope="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.salaryPic"
              :preview-src-list="[scope.row.salaryPic]"
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
  name: 'workers',

  data() {
    return {
      query: {
        address: '',
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [
      ],
      pageTotal: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const params = {
        salaryStatus: '1', // 1:待处理，2：已同意，3：拒绝	
        page: 0,
        pageSize: 10
      }
      const res = await getSalaryListApi(params)
      this.tableData = res.list
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'pageIndex', 1);
      this.getData();
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
