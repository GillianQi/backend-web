<template>
  <div>
    <div class="container">
      <div class="invoice-checkbox">
        <label for="">发票类型:</label>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="1">增值税普票</el-checkbox>
          <el-checkbox label="2">增值税专票</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="handle-box">
        <el-input v-model="query.name" placeholder="顾客姓名" class="handle-input mr10"></el-input>
        <el-input v-model="query.name" placeholder="开票公司名称" class="handle-input mr10"></el-input>
        <el-input v-model="query.name" placeholder="收票公司名称" class="handle-input mr10"></el-input>
        <el-input v-model="query.name" placeholder="姓名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="name" label="顾客姓名"></el-table-column>
        <el-table-column prop="phone" label="开票公司"></el-table-column>
        <el-table-column prop="iNo" label="收票公司"></el-table-column>
        <el-table-column prop="iNo" label="开票金额"></el-table-column>
        <el-table-column prop="iNo" label="发票类型"></el-table-column>
        <el-table-column prop="iNo" label="发票备注"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="viewInvoice(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
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
    <!-- 查看详情弹框 -->
    <el-dialog title="发票审核" :visible.sync="isShowViewDialog" width="60%" class="view-invoice">
      <view-invoice></view-invoice>
      <div class="body-ope">
        <div style="position: absolute; left: 0;" class="title-font">&lt;&lt;返回</div>
        <div style="display: flex;align-items: center;">
          <div class="body-ope-button">完成</div>
          <div class="body-ope-button">驳回</div>
          <div class="body-ope-button">下载</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import viewInvoice from "./components/view-invoice.vue";
export default {
  name: "workers",
  components: {
    viewInvoice
  },

  data() {
    return {
      query: {
        address: "",
        name: "",
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [
        {
          id: "11",
          name: "cesi",
          phone: "135111",
          iNo: "1333333333",
          thumbFront: require("@/assets/img/img.jpg"),
          thumbBack: require("@/assets/img/login-bg.jpg")
        }
      ],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      isShowViewDialog: false,
      checkList: []
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
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$message.success("删除成功");
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
      let str = "";
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 查看操作
    viewInvoice(item) {
      this.isShowViewDialog = true;
      console.log(item);
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
      this.$set(this.query, "pageIndex", val);
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
.view-invoice {
}
.body-ope {
  display: flex;
  justify-content: center;
  position: relative;
  height: 60px;
  border: 1px solid #e9a549;
  border-top: none;
}
.body-ope-button {
  padding: 5px;
  background: #409eff;
  font-size: 12px;
  margin: 0 2px;
  color: #fff;
}
.title-font {
  color: #e9a549;
  font-size: 12px;
}
.invoice-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>
