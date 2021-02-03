<template>
  <div>
    <div class="container">
      <div class="handle-box">
        商户名称 <el-input v-model="query.companyName" placeholder="商户名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header">
        <el-table-column prop="companyName" label="商户名称"></el-table-column>
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
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="accountNum" label="账户余额"></el-table-column>
        <el-table-column prop="additionRate" label="附加税">
           <template slot-scope="scope">
            {{scope.row.additionRate*100}}%
          </template>
        </el-table-column>
        <el-table-column prop="serviceRate" label="服务税税率">
          <template slot-scope="scope">
            {{scope.row.serviceRate*100}}%
          </template>
        </el-table-column>
        <el-table-column prop="vatRate" label="增值税税率">
          <template slot-scope="scope">
            {{scope.row.vatRate*100}}%
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="联系电话"></el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
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
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="showEdit(scope.$index, scope.row)"
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

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="商户名称">
          <span>{{form.companyName}}</span>
        </el-form-item>
        <el-form-item label="附加税">
          <el-input type="number" class="input" v-model="additionRate"></el-input>%
        </el-form-item>
        <el-form-item label="增值税税率	">
          <el-input class="input" v-model="vatRate"></el-input>%
        </el-form-item>
        <el-form-item label="服务税税率">
          <el-input class="input" v-model="serviceRate"></el-input>%
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
  getCompanyList,
  updateRateApi
} from '@/api/'

export default {
  name: 'basetable',
  data() {
    return {
      query: {
        companyName: '',
        authStatus: '2',
        page: 1,
        pageSize: 10
      },
      additionRate: 0,
      serviceRate: 0,
      vatRate: 0,
      tableData: [],
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
      this.tableData = res.list
      this.pageTotal = res.totalCount
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
    viewRechargeHistory(index, row) {
      this.$router.push({
        path: '/recharge-history',
        query: {
          id: row.id
        }
      })
    },
    showEdit(index, row) {
      this.form = row
      this.additionRate = row.additionRate*100
      this.serviceRate = row.serviceRate*100
      this.vatRate = row.vatRate*100
      this.editVisible = true
    },
    // 保存编辑
    async saveEdit() {
      this.editVisible = false;
      const params = {
        companyId: this.form.id,
        additionRate: Number(this.additionRate)/100,
        serviceRate: Number(this.serviceRate)/100,
        vatRate: Number(this.vatRate)/100
      }
      const res = await updateRateApi(params)
      if (res && res.code == 0) {
        this.$message.success('更新成功');
        this.getData()
      }
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'page', val);
      this.getData();
    }
  },
  computed: {
  }
};
</script>

<style lang="scss" scoped>
.handle-box {
  margin-bottom: 20px;
}

.input {
  width: 80%;
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
/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
/deep/ input[type="number"]{
    -moz-appearance: textfield;
}
</style>
