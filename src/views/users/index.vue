<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.userName" placeholder="姓名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>

        <el-button type="primary" icon="el-icon-plus" @click="displayAdd()">添加</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="forbidStatus" label="工作状态">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.forbidStatus == 1"
              type="text"
              @click="forbidUser(scope.row)"
            >禁用</el-button>
            <el-button
              v-if="scope.row.forbidStatus != 1"
              type="text"
              @click="openUser(scope.row)"
            >启用</el-button>
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
    <el-dialog title="添加" :visible.sync="editVisible" width="50%">
      <el-form ref="form" :model="form" label-width="70px" :rules="rules">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="form.userName" :maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" type="password" :maxlength="50"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserListApi,
  forbidUserApi,
  openUserApi,
  addUserApi
} from '@/api/'

export default {
  name: 'workers',

  data() {
    return {
      query: {
        userName: '',
        page: 0,
        pageSize: 10
      },
      rules:{
        userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      tableData: [],
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
    this.getData();
  },
  methods: {
    async getData() {
      const res = await getUserListApi(this.query)
      if (res && res.code === 0) {
        this.tableData = res.data.list
        this.pageTotal = res.data.totalCount
      }
    },
    displayAdd () {
      this.editVisible = true
      this.form = {

      }
    },
    close() {
      this.editVisible = false
      this.form = {}
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'page', 1);
      this.getData();
    },
    async forbidUser(row) {
      const res = await forbidUserApi({userId: row.id})
      if (res && res.code == 0) {
        this.$message.success('禁用成功')
        this.getData()
      }
    },
    async openUser(row) {
      const res = await openUserApi({userId: row.id})
      if (res && res.code) {
        this.$message.success('启用成功')
        this.getData()
      }
    },
    viewDetail(index,row){
      console.log(index)
      window.open(row.signFileUrl , '__blank')
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
    async submitAdd() {
      this.editVisible = false;
      const res = await addUserApi(this.form)
      if (res && res.code == 0) {
        this.$message.success('添加成功');
      }
      this.getData()
    },
    // 保存编辑
    saveEdit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.submitAdd()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
