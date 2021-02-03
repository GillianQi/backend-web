<template>
  <div>
    <div class="container">
      <div class="invoice-checkbox">
        <label for="">发票类型:</label>
        <el-radio-group v-model="query.billType">
          <el-radio label="">全部</el-radio>
          <el-radio label="2">增值税普票</el-radio>
          <el-radio label="1">增值税专票</el-radio>
        </el-radio-group>
      </div>
      <div class="handle-box">
        <el-input v-model="query.customerName" placeholder="顾客姓名" class="handle-input mr10"></el-input>
        <el-input v-model="query.billCompanyName" placeholder="开票商户名称" class="handle-input mr10"></el-input>
        <el-input v-model="query.collectionCompanyName" placeholder="收票商户名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="customerName" label="顾客姓名"></el-table-column>
        <el-table-column prop="billCompanyName" label="开票公司"></el-table-column>
        <el-table-column prop="collectionCompanyName" label="收票公司"></el-table-column>
        <el-table-column prop="billSum" label="开票金额"></el-table-column>
        <el-table-column prop="invoiceType" label="发票类型">
          <template slot-scope="scope">
            <span v-if="scope.row.invoiceType === '1'">专用发票</span>
            <span v-if="scope.row.invoiceType === '2'">普通发票</span>
          </template>
        </el-table-column>
        <el-table-column prop="descript" label="发票备注"></el-table-column>
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
      <view-invoice :row="form" :detail="detail" @success="closeDetail()"></view-invoice>
    </el-dialog>
  </div>
</template>

<script>
import viewInvoice from "./components/viewInvoice";
import {
  getInvoiceListApi,
  getInvoiceDetailApi,
  getInvoiceTemplateApi
} from '@/api/'

export default {
  name: "workers",
  components: {
    viewInvoice
  },

  data() {
    return {
      query: {
        billCompanyName: '',
        billType: '',
        collectionCompanyName: '',
        customerName: '',
        invoiceStatus: '1',
        invoiceType: '1',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      detail: {},
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
    async getData() {
      const res = await getInvoiceListApi(this.query)
      if (res && res.code === 0) {
        this.tableData = res.data.list
        this.pageTotal = res.data.totalCount
      }
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
    async viewInvoice(item) {
      const res = await getInvoiceDetailApi({id:item.id})
      const res1 = await getInvoiceTemplateApi()
      let param = {
        companyName1: res1.data.companyName,
        taxpayerNum1: res1.data.taxpayerNum,
        companyAddMobile1: res1.data.companyAddMobile,
        bankNameAccount1: res1.data.bankNameAccount
      }
      if (res && res.code == 0) {
        this.detail = res.data
        this.form = item
        this.detail = Object.assign(this.detail, param) 
      }
      this.isShowViewDialog = true;
    },
    closeDetail() {
      this.detail = {}
      this.form = {}
      this.isShowViewDialog = false;
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
