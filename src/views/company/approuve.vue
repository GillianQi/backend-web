<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.programName" placeholder="项目名" clearable class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>

      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="programCompanyName" label="商户名称"></el-table-column>
        <el-table-column prop="programName" label="工程名称"></el-table-column>
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
        <el-table-column prop="programStartTime" label="起始时间"></el-table-column>
        <el-table-column prop="programEndTime" label="终止时间"></el-table-column>
        <el-table-column prop="programRealEndTime" label="实际结束时间"></el-table-column>
        <el-table-column prop="programStatus" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.programStatus == 0">已失效</span>
            <span v-if="scope.row.programStatus == 1">已发布</span>
            <span v-if="scope.row.programStatus == 2">已完工</span>
            <span v-if="scope.row.programStatus == 3">进行中</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="approuve(scope.row,'1')"
            >同意</el-button>
            <el-button
              type="text"
              @click="approuve(scope.row,'0')"
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
  </div>
</template>

<script>
import {
  getProgramApprouveListApi,
  approuveProgramApi
} from '@/api/'

export default {
  name: 'workers',

  data() {
    return {
      query: {
        programName: '',
        page: 0,
        pageSize: 10
      },
      tableData: [],
      multipleSelection: [],
      delList: [],
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
      const res = await getProgramApprouveListApi(this.query)
      if (res && res.code === 0) {
        this.tableData = res.data.list
        this.pageTotal = res.data.totalCount
      }
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'page', 1);
      this.getData();
    },
    async approuve(row,type) {
      const res = await approuveProgramApi({id: row.id, flag: type})
      if (res && res.code == 0) {
        this.$message.success('操作成功')
        this.getData()
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
