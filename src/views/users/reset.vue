<template>
  <div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-form-item label="原密码" prop="oldPwd">
            <el-input v-model="form.oldPwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="form.newPwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmPwd">
            <el-input v-model="form.confirmPwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {resetPwdApi} from '@/api/'
export default {
  name: 'reset',
  data() {
    return {
      rules:{
        oldPwd: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPwd: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        confirmPwd: [{ required: true, message: '请输入确认密码', trigger: 'blur' }],
      },
      form: {
        confirmPwd: '',
        oldPwd: '',
        newPwd: ''
      }
    };
  },
  methods: {
    async confirmSubmit() {
      const res = await resetPwdApi(this.form)
      if (res && res.code == 0) {
        this.$message.success('提交成功！');
      }
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.confirmSubmit()
        } else {
          console.log('error submit!!');
          return false;
        }
      });

      
    }
  }
};
</script>