<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-select v-model="query.companyId" filterable clearable placeholder="请选择" class="mr10" @change="getProjectList()">
          <el-option
            v-for="item in companyList"
            :key="item.id"
            :label="item.companyName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="query.workId" filterable clearable placeholder="请选择" class="mr10">
          <el-option
            v-for="item in projectList"
            :key="item.id"
            :label="item.programName"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-upload
        class="upload-excel"
        action="/worker/sign/upload"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :before-remove="beforeRemove"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="workerName" label="姓名"></el-table-column>
        <el-table-column prop="workCompany" label="参加单位"></el-table-column>
        <el-table-column prop="workGroup" label="班组"></el-table-column>
        <el-table-column prop="cardNo" label="卡号"></el-table-column>
        <el-table-column prop="idCard" label="身份证号"></el-table-column>
        <el-table-column prop="channel" label="通道"></el-table-column>
        <el-table-column prop="signType" label="进/出"></el-table-column>
        <el-table-column prop="signTime" label="考勤日期"></el-table-column>
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
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
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
  getWorkerClockinApi,
  getCompanyList,
  getProjectListApi,
  importWorkersSignApi
} from '@/api/'

export default {
  name: 'workers',

  data() {
    return {
      query: {
        companyId: '',
        workId: '',
        date: '',
        workerName: '',
        page: 0,
        pageSize: 10,
      },
      fileList: [],
      tableData: [],
      companyList: [],
      projectList: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    this.getCompanyList();
  },
  methods: {
    async getData() {
      const res = await getWorkerClockinApi(this.query)
      if (res && res.code === 0) {
        this.tableData = res.data.list
        this.pageTotal = res.data.totalCount
      }
    },
    async getCompanyList() {
      const query = {
        authStatus: '2',
        page: 1,
        pageSize: 9999
      }
      const res = await getCompanyList(query)
      this.companyList = res.list
      // this.getProjectList()
    },
    async getProjectList() {
      const query = {
        companyId: this.query.companyId,
        page: 1,
        pageSize: 9999
      }
      const res = await getProjectListApi(query)
      this.projectList = res.data.list
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
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = '';
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' ';
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 编辑操作
    handleEdit(index, row) {
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
      this.$set(this.query, 'page', val);
      this.getData();
    },
    beforeUpload(file) {
      this.uploadFile(file)
    },
    uploadFile(file){
      var formData = new FormData();
      formData.append('companyId', this.query.companyId);
      formData.append('workId',this.query.workId);
      formData.append('file',file);
      importWorkersSignApi(formData)
    },
    uploadSuccess() {
      this.query.workerName = ''
      this.query.date = ''
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
  margin: 20px 0;
  width: 40%;

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
