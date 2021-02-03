<template>
  <div>
    <div class="container">
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header">
        <el-table-column prop="userName" label="用户认证姓名"></el-table-column>
        <el-table-column prop="accountChange" label="金额"></el-table-column>
        <el-table-column prop="companyName" label="公司"></el-table-column>
        <el-table-column prop="bankAccount" label="银行账号"></el-table-column>
        <el-table-column prop="bankName" label="银行名称"></el-table-column>
        <el-table-column prop="accountChangeImg" label="转账凭证">
          <template slot-scope="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.accountChangeImg"
              :preview-src-list="[scope.row.accountChangeImg]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="操作时间"></el-table-column>
        <el-table-column prop="descript" label="备注"></el-table-column>
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
  rechargeFinishListApi,
} from '@/api/'

export default {
  name: 'basetable',
  data() {
    return {
      query: {
        page: 1,
        pageSize: 10
      },
      tableData: [
      ],
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
      const res = await rechargeFinishListApi(this.query)
      this.tableData = res.data.list
      this.pageTotal = res.data.totalCount
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

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
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
