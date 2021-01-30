<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <span>公司：</span>
        <el-select v-model="query.companyId" filterable clearable placeholder="请选择" class="mr10" @change="getProjectList()">
          <el-option
            v-for="item in companyList"
            :key="item.id"
            :label="item.companyName"
            :value="item.id">
          </el-option>
        </el-select>
        <span>项目：</span>
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
        :auto-upload="false"
        :on-change="uploadFile"
        :on-success="uploadSuccess"
        :file-list="fileList">
        <el-button slot="trigger" size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
import {
  getWorkerClockinApi,
  getCertifiedListApi,
  getWorkByCompanyApi,
  importWorkersSignApi
} from '@/api/'

export default {
  name: 'workers',

  data() {
    return {
      query: {
        companyId: '',
        workId: ''
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
    this.getCertifiedListApi();
  },
  methods: {
    async getData() {
      const res = await getWorkerClockinApi(this.query)
      if (res && res.code === 0) {
        this.tableData = res.data.list
        this.pageTotal = res.data.totalCount
      }
    },
    async getCertifiedListApi() {
      const res = await getCertifiedListApi()
      this.companyList = res.data
      // this.getProjectList()
    },
    async getProjectList() {
      this.query.workId = ''
      const query = {
        companyId: this.query.companyId
      }
      const res = await getWorkByCompanyApi(query)
      this.projectList = res.data
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
    beforeUpload() {
      console.log('beff--')
      if (!this.query.companyId) {
        this.$message.warning('请先选择公司');
        return false
      }
      if (!this.query.workId) {
        this.$message.warning('请先选择项目');
        return false
      }
    },
    async uploadFile(file){
      if (!this.query.companyId) {
        this.$message.warning('请先选择公司');
        this.fileList = []
        return
      }
      if (!this.query.workId) {
        this.fileList = []
        this.$message.warning('请先选择项目');
        return
      }
      var formData = new FormData();
      formData.append('companyId', this.query.companyId);
      formData.append('workId',this.query.workId);
      formData.append('file',file.raw);
      const res = await importWorkersSignApi(formData)
      if (res && res.code == 0) {
        this.fileList = []
        this.$message.success('上传成功')
      }else {
        this.$message.warning(res.message)
      }
      console.log(res)
    },
    uploadSuccess() {
      this.$message.success('上传成功');
      this.fileList = []
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
