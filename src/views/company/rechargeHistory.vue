<template>
  <div>
    <div class="container" style="padding-top: 10px;">
      <img src="../../assets/img/back.png" style="height: 20px" @click="back()">
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header">
        <!-- <el-table-column prop="userName" label="用户认证姓名"></el-table-column> -->
        <el-table-column prop="companyName" label="商户名称"></el-table-column>
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
  rechargeHistoryListApi
} from '@/api/'

export default {
  name: 'basetable',
  data() {
    return {
      query: {
        companyId: this.$route.query.id,
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
      const res = await rechargeHistoryListApi(this.query)
      if (res && res.code === 0) {
        this.tableData = res.data.list
        this.pageTotal = res.data.totalCount
      }
    },
    back() {
      this.$router.go(-1)
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
