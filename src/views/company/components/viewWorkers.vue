<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-plus" @click="handleRemoveWorkers">删除</el-button>
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
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="startTime" label="开始时间"></el-table-column>
        <el-table-column prop="workType" label="工种"></el-table-column>
        <el-table-column prop="relateStatus" label="工作状态">
          <template slot-scope="scope">
            <span v-if="scope.row.relateStatus == '1'">工程中</span>
            <span v-else>已剔除</span>
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
  getWorkersByProjectApi,
  removeWorkerdApi
} from '@/api/'

export default {
  name: 'workers',
  props: {
    programId: {
      type: Number,
      default: null
    },
    viewForm: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      query: {
        companyId: this.viewForm.companyId,
        programId:  this.viewForm.id,
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
      const res = await getWorkersByProjectApi(this.query)
      if (res && res.code === 0) {
        this.tableData = res.data.list
        this.pageTotal = res.data.totalCount
      }
    },
    async handleRemoveWorkers() {
      console.log(this.multipleSelection)
      if (!this.multipleSelection.length) {
        this.$message.warning('请至少选中一条');
        return
      }
      let ids = this.multipleSelection.map(item => {
        return item.userId
      })
      const params = {
        programId: this.programId,
        userIds: ids.toString()
      }
      const res = await removeWorkerdApi(params)
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
