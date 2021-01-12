<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-plus" @click="handleAddWorkers">添加</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="workerName" label="姓名"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="idCard" label="身份证号"></el-table-column>
        <el-table-column label="头像" align="center">
          <template slot-scope="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.avatar"
              :preview-src-list="[scope.row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="workTypeDesc" label="工种"></el-table-column>
        <el-table-column prop="workProgram" label="工作项目"></el-table-column>
        <el-table-column prop="workStatus" label="状态">
           <template slot-scope="scope">
            <span v-if="scope.row.workStatus == '1'">在职</span>
            <span v-else>未在职</span>
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
  </div>
</template>

<script>
import {
  getWorkerEmptyApi,
  assignWorkersApi
} from '@/api/'

export default {
  name: 'workers',
  props: {
    programId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      query: {
        workerName: '',
        workStatus	: '',
        page: 1,
        pageSize: 10
      },
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await getWorkerEmptyApi(this.query)
      if (res && res.code === 0) {
        this.tableData = res.data
      }
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'page', 1);
      this.getData();
    },
    async handleAddWorkers() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请至少选中一条');
        return
      }
      let ids = this.multipleSelection.map(item => {
        return item.userId
      })
      console.log(ids)
      const params = {
        programId: this.programId,
        userIds: ids.toString()
      }
      const res = await assignWorkersApi(params)
      if (res && res.code == 0) {
        this.$emit('close')
      }
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
      console.log(val)
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
