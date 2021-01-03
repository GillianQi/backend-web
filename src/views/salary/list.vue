<template>
  <div>
    <div class="container">
      <div class="handle-box">
        姓名：<el-input v-model="query.name" placeholder="姓名" class="handle-input mr10"></el-input>
        身份证号： <el-input v-model="query.name" placeholder="身份证号" class="handle-input mr10"></el-input>
        手机号： <el-input v-model="query.name" placeholder="手机号" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="programName" label="工程项目名称"></el-table-column>
        <el-table-column prop="programName" label="编号"></el-table-column>
        <el-table-column prop="programStartTime" label="姓名"></el-table-column>
        <el-table-column prop="programEndTime" label="工种"></el-table-column>
        <el-table-column prop="programRealEndTime" label="身份证号"></el-table-column>
        <el-table-column prop="updateUser" label="出勤天数"></el-table-column>
        <el-table-column prop="updateUser" label="手机号"></el-table-column>
        <el-table-column prop="updateUser" label="银行卡号"></el-table-column>
        <el-table-column prop="updateUser" label="起始时间"></el-table-column>
        <el-table-column prop="updateUser" label="终止时间"></el-table-column>
        <el-table-column prop="updateUser" label="工资金额（元）"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
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
export default {
  name: 'engineer',
  data() {
    return {
      query: {
        address: '',
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [
        {
          "companyId": 0,
          "createTime": "",
          "createUser": 0,
          "descript": "",
          "id": 0,
          "programCompanyName": "公司111",
          "programEndTime": "2020-11-11",
          "programName": "工程111",
          "programRealEndTime": "2020-11-11",
          "programStartTime": "2020-11-11",
          "programStatus": "0",
          "status": 0,
          "updateTime": "",
          "updateUser": 0
        },
        {
          "companyId": 0,
          "createTime": "",
          "createUser": 0,
          "descript": "",
          "id": 0,
          "programCompanyName": "公司111",
          "programEndTime": "2020-11-11",
          "programName": "工程222",
          "programRealEndTime": "2020-11-11",
          "programStartTime": "2020-11-11",
          "programStatus": "1",
          "status": 0,
          "updateTime": "",
          "updateUser": 0
        }
      ],
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
    // 获取 easy-mock 的模拟数据
    getData() {
      // fetchData(this.query).then(res => {
      //   console.log(res);
      //   this.tableData = res.list;
      //   this.pageTotal = res.pageTotal || 50;
      // });
    },
    // 删除操作
    addWorkers(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
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
      this.$set(this.query, 'pageIndex', val);
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
