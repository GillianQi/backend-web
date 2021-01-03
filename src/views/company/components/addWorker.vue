<template>
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
</template>

<script>
export default {
  name: 'add',
  data() {
    return {
      editVisible: false,
      form: {},
    };
  },
  methods: {
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$set(this.tableData, this.idx, this.form);
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
