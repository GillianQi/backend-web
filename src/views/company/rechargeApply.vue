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
        <el-table-column prop="companyName" label="服务商"></el-table-column>
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
            <span v-if="applyStatus === '1'">
              <el-button
                type="text"
                icon="el-icon-edit"
                @click="authCompany(scope.$index, scope.row)"
              >同意</el-button>
              <el-button
                type="text"
                icon="el-icon-edit"
                @click="authCompany(scope.$index, scope.row)"
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
          :current-page="query.pageIndex"
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
  rechargeApplyListApi
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
        authStatus: '0',
        page: 0,
        pageSize: 10
      }
      const res = await rechargeApplyListApi(params)
      this.tableData = res.list
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'pageIndex', 1);
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
    // 查看工程列表
    viewEngineerList(index, row) {
      // this.idx = index;
      // this.form = row;
      // this.editVisible = true;
      this.$router.push({
        path: '/company-engineer',
        query: {
          id: row.id
        }
      })
    },
    // 编辑操作
    authCompany(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
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
