<template>
  <div>
    <div class="container">
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header">
        <!-- <el-table-column prop="userName" label="用户认证姓名"></el-table-column> -->
        <el-table-column prop="companyName" label="公司名称"></el-table-column>
        <el-table-column prop="accountChange" label="金额">
           <template slot-scope="scope">
            <span v-if="scope.row.changeType == '1'">+</span>
            <span v-else-if="scope.row.changeType == '0'">-</span>
            <span>{{scope.row.accountChange}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="bankName" label="转账凭证">
          <template slot-scope="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.accountChangeImg"
              :preview-src-list="[scope.row.accountChangeImg]"
            ></el-image>
          </template>
        </el-table-column> -->
        <el-table-column prop="descript" label="备注"></el-table-column>
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
  rechargeHistoryListApi
} from '@/api/'

export default {
  name: 'basetable',
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
      const params = {
        companyId: this.$route.query.id,
        page: 0,
        pageSize: 10
      }
      console.log(params)
      const res = await rechargeHistoryListApi(params)
      if (res && res.code === 0) {
        this.tableData = res.data.list
      }
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
