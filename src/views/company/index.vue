<template>
  <div>
    <div class="container">
      <div class="handle-box">
        公司名称 <el-input v-model="query.companyName" placeholder="公司名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
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
        <el-table-column label="合同" align="center">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.contractImg"
              class="table-td-thumb"
              :src="scope.row.contractImg.split(separator)[0]"
              :preview-src-list="scope.row.contractImg.split(separator)"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="taxpayerNum" label="纳税人识别号"></el-table-column>
        <el-table-column prop="bankAccount" label="开户行名称"></el-table-column>
        <el-table-column prop="bankName" label="开户行账号"></el-table-column>
        <el-table-column prop="taxpayAddress" label="开票地址"></el-table-column>
        <el-table-column prop="mobile" label="联系电话"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleAuth(scope.row, 1)"
            >同意</el-button>
            <el-button
              type="text"
              @click="handleAuth(scope.row, 2)"
            >拒绝</el-button>
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
        <el-button @click="handleAuth(2)">拒 绝</el-button>
        <el-button type="primary" @click="handleAuth(1)">同 意</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCompanyList,
  handleAuthApi
} from '@/api/'

export default {
  name: 'basetable',
  data() {
    return {
      query: {
        companyName: '',
        authStatus: '1',
        page: 0,
        pageSize: 10
      },
      tableData: [
      ],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      separator: '#&#'
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await getCompanyList(this.query)
      if (res) {
        this.tableData = res.list
        this.pageTotal = res.totalCount
      }
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
    // 查看工程列表
    viewEngineerList(index, row) {
      this.$router.push({
        path: '/company-engineer',
        query: {
          id: row.id
        }
      })
    },
    // 保存编辑
    async handleAuth(row, type) {
      const res = await handleAuthApi({companyId: row.id, flag: type})
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
