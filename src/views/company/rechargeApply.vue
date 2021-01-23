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
        <el-table-column prop="bankName" label="转账凭证">
          <template slot-scope="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.accountChangeImg"
              :preview-src-list="[scope.row.accountChangeImg]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="descript" label="备注"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.applyStatus === '1'">
              <el-button
                type="text"
                @click="handleAuth(scope.row, 1)"
              >同意</el-button>
              <el-button
                type="text"
                @click="handleAuth(scope.row, 0)"
              >驳回</el-button>
            </span>
            <span v-else></span>
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

    <!-- 编辑弹出框 -->
    <el-dialog title="认证" :visible.sync="editVisible" width="30%">
      
      <el-form ref="form" :model="form" label-width="70px">
        <div class="company-name">{{form.companyName}}</div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible == false">取 消</el-button>
        <!-- <el-button type="primary" @click="confirm()">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  rechargeApplyListApi,
  handleApplyOptionApi
} from '@/api/'

export default {
  name: 'basetable',
  data() {
    return {
      query: {
        authStatus: '0',
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
    console.log(22)
    this.getData();
  },
  methods: {
    async getData() {
      const res = await rechargeApplyListApi(this.query)
      this.tableData = res.data.list
      this.pageTotal = res.data.totalCount
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'page', 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.$message.success('删除成功');
          this.tableData.splice(index, row);
        })
        .catch(() => {});
    },
    async handleAuth(row, type) {
      // option 1:通过，0：拒绝
      const res = await handleApplyOptionApi({id: row.id, companyId: row.companyId, option: type})
      if (res && res.code === 0) {
        this.$message.success('操作成功');
        this.editVisible = false;
        this.getData()
      } else {
        this.$message.error('认证失败')
      }
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
