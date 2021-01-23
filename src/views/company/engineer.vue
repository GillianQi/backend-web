<template>
  <div>
    <div class="container">
      <div class="handle-box">
        工程名称 <el-input v-model="query.programName" placeholder="工程名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="programCompanyName" label="施工单位"></el-table-column>
        <el-table-column prop="programName" label="工程名称"></el-table-column>
        <el-table-column prop="programStartTime" label="起始时间"></el-table-column>
        <el-table-column prop="programEndTime" label="终止时间"></el-table-column>
        <el-table-column prop="programRealEndTime" label="实际结束时间"></el-table-column>
        <!-- <el-table-column prop="updateUser" label="施工人数"></el-table-column> -->
        <el-table-column prop="programStatus" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.programStatus === '1' ? '已完成' : '进行中'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-view"
              @click="viewRecord(scope.$index, scope.row)"
            >打卡记录</el-button>
            <el-button
              type="text"
              icon="el-icon-plus"
              @click="addWorkers(scope.$index, scope.row)"
            >添加工人</el-button>
            <el-button
              type="text"
              icon="el-icon-view"
              @click="viewWorkers(scope.$index, scope.row)"
            >查看工人</el-button>
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

    <el-dialog title="打卡记录" :visible.sync="viewVisibleR" width="80%">
      <view-records v-if="viewVisibleR" :programId="id" @close="closeAddWorkers"></view-records>
    </el-dialog>

    <el-dialog title="添加工人" :visible.sync="editVisible" width="80%">
      <add-workers v-if="editVisible" :programId="id" @close="closeAddWorkers"></add-workers>
    </el-dialog>

     <el-dialog title="查看工人" :visible.sync="viewVisible" width="80%">
      <view-workers v-if="viewVisible" :programId="viewId" :viewForm="viewForm" @close="closeViewWorkers"></view-workers>
    </el-dialog>
  </div>
</template>

<script>
import {
  getProjectListApi
} from '@/api/'
import addWorkers from './components/addWorker'
import viewWorkers from './components/viewWorkers'
import viewRecords from './components/viewRecords'

export default {
  name: 'engineer',
  data() {
    return {
      query: {
        companyId: this.$route.query.id,
        programName: '',
        page: 1,
        pageSize: 10
      },
      tableData: [],
      delList: [],
      editVisible: false,
      viewVisible: false,
      viewVisibleR: false,
      viewForm: {},
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      viewId: -1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await getProjectListApi(this.query)
      if (res && res.code == 0) {
         this.tableData = res.data.list
        this.pageTotal = res.data.totalCount
      }
    },
    // 操作
    addWorkers(index, row) {
      this.id = row.id
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    viewRecord(index, row) {
      this.id = row.id
      this.idx = index;
      this.form = row;
      this.viewVisibleR = true
    },
    closeViewRecords() {
      this.id = ''
      this.idx = 0;
      this.form = {};
      this.viewVisibleR = false
    },
    closeAddWorkers() {
      this.id = ''
      this.idx = 0;
      this.form = {};
      this.editVisible = false
    },
    closeViewWorkers() {
      this.viewId = ''
      this.viewVisible = false
    },
    viewWorkers(index, row) {
      this.viewForm = row;
      this.viewId = row.id
      this.viewVisible = true;
    },
    // 编辑操作
    editEngineer(index, row) {
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
    }
  },
  components: {
    addWorkers,
    viewWorkers,
    viewRecords
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
