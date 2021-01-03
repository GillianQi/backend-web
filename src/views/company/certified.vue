<template>
  <div>
    <div class="container">
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header">
        <el-table-column prop="companyName" label="公司名称"></el-table-column>
        <el-table-column label="营业执照" align="center">
          <template slot-scope="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.companyImg"
              :preview-src-list="[scope.row.companyImg]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="taxpayerNum" label="纳税人识别号"></el-table-column>
        <el-table-column prop="bankAccount" label="开户行名称"></el-table-column>
        <el-table-column prop="bankName" label="开户行账号"></el-table-column>
        <el-table-column prop="taxpayAddress" label="开票地址"></el-table-column>
        <el-table-column prop="mobile" label="联系电话"></el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="authCompany(scope.$index, scope.row)"
            >充值</el-button>
            <el-button
              type="text"
              icon="el-icon-view"
              @click="viewEngineerList(scope.$index, scope.row)"
            >项目列表</el-button>
            <el-button
              type="text"
              icon="el-icon-view"
              @click="viewRechargeHistory(scope.$index, scope.row)"
            >充值记录</el-button>
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
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="公司名称">
          <!-- <el-input v-model="form.name"></el-input> -->
          <span>这里是公司名称</span>
        </el-form-item>
        <el-form-item label="充值金额">
          <el-input v-model="form.sum"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCompanyList
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
      const params = {
        authStatus: '2',
        page: 0,
        pageSize: 10
      }
      const res = await getCompanyList(params)
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
      this.$router.push({
        path: '/company-engineer',
        query: {
          id: row.id
        }
      })
    },
    viewRechargeHistory(index, row) {
      this.$router.push({
        path: '/recharge-history',
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
