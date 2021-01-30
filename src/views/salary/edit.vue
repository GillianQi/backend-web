<template>
  <div>
    <div class="container">
      <div class="handle-box">
        姓名：<el-input v-model="query.userName" placeholder="姓名" class="handle-input mr10"></el-input>
        身份证号： <el-input v-model="query.idCard" placeholder="身份证号" class="handle-input mr10"></el-input>
        手机号： <el-input v-model="query.mobile" placeholder="手机号" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getData()">搜索</el-button>
        <el-upload
          class="upload-excel"
          action="/salaryInfo/batchInsertSalary"
          :on-success="uploadSuccess"
          :before-remove="beforeRemove"
          :auto-upload="false"
          :on-change="uploadFile"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="programName" label="工程项目名称"></el-table-column>
        <el-table-column prop="orderNum" label="编号"></el-table-column>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="workType" label="工种"></el-table-column>
        <el-table-column prop="idCard" label="身份证号"></el-table-column>
        <el-table-column prop="signDate" label="出勤天数"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="bankCard" label="银行卡号"></el-table-column>
        <el-table-column prop="salaryDate" label="工资月份"></el-table-column>
        <el-table-column prop="salary" label="工资金额（元）"></el-table-column>
        <el-table-column label="操作" width="80" align="center">
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

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="姓名">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="form.idCard"></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="form.salary"></el-input>
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
  getSalaryDetailApi,
  updateSalaryDetailApi,
  importWorkersSalaryApi
} from '@/api/'
export default {
  name: 'engineer',
  data() {
    return {
      query: {
        salaryMainId: this.$route.query.id,
        userName: '',
        idCard: '',
        mobile: '',
        page: 1,
        pageSize: 10
      },
      tableData: [],
      fileList: [],
      delList: [],
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
      const res = await getSalaryDetailApi(this.query)
      this.tableData = res.data.list
    },
    // 删除操作
    addWorkers(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSubmit() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请至少选中一条');
        return
      }
      let ids = this.multipleSelection.map(item => {
        return item.userId
      })
      console.log(this.multipleSelection, ids)
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    async saveEdit() {
      this.editVisible = false;
      const params = {
        bankCard: this.form.bankCard,
        bankFullName: this.form.bankFullName,
        bankName: this.form.bankName,
        id: this.form.id,
        mobile: this.form.mobile,
        property: this.form.property,
        salary: this.form.salary
      }
      const res = await updateSalaryDetailApi(params)
      if (res && res.code === 0) {
        this.form = {}
        this.$message.success('修改成功')
        this.editVisible = false
      }
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'page', val);
      this.getData();
    },
    async uploadFile(file){
      var formData = new FormData();
      formData.append('mainId', this.$route.query.id);
      formData.append('file',file.raw);
      const res = await importWorkersSalaryApi(formData)
      if (res && res.code == 0) {
        this.$message.success('上传成功')
        this.fileList = []
      } else {
        this.$message.warning(res.message)
      }
    },
    uploadSuccess() {
      this.query.userName = ''
      this.query.idCard = ''
      this.query.mobile = ''
      this.fileList = []
      this.getData()
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
};
</script>
<style scoped lang="scss">
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.upload-excel {
  // display: inline;
  margin-top: 20px;

  /deep/ .el-upload--text {
    height: inherit;
    border: none;
    display: inline;
  }
}
.handle-input {
  width: 200px;
  display: inline-block;
}
.table-input {
  width: 100px;
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
