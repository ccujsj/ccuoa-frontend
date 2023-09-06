<!--
filename: MainAdmin.vue
desc: 登陆组件
@author: Dongxu Fei
@contact: phil616@163.com
@copyright: CCUJSJ - 长春大学计算机科学技术学院学生会
@licence: Apache 2.0
@date: 2023-9-6
-->
<template>
  <div class="login-container">
    <el-row>
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" :xxl="4" :offset="offset">
        <h2>用户登录</h2>
        <el-form ref="loginForm" :model="loginData" :rules="loginRules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginData.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import  baseurl  from '../utils.js';
  
export default {
  data() {
    return {
      loginData: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    offset() {
      // 根据屏幕宽度计算偏移量，使表单居中显示
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        return 0; // 手机端不需要偏移
      } else {
        return (24 - 6) / 2; // 偏移量为栅格列数的一半
      }
    }
  },
  methods: {
   copyToClipboard(text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          this.$message('内容已成功复制到粘贴板');
        })
        .catch((error) => {
          this.$message.error('复制到粘贴板时出错:', error);
        });
    },
    constructLoginSuccessHTML(response){
      var str = ""
      str += "登录成功 <br>"
      str += "访问协议：OAuth2.0 Bearer Header" + "<br>"
      str += "访问令牌：<input value=\"" + response.data.access_token + "\" </input><br>"
      str += "点击确认后，访问令牌将会粘贴到粘贴板"
      return str
    },
    constructLoginFailedHTML(resp){
      var str = ""
      str += "错误码：" + resp.response.status + "<br>"
      str += "错误类型：" + resp.response.statusText + "<br>"
      str += "错误消息：" + resp.message + "<br>"
      str += "错误原因：" + resp.response.data.detail + "<br>"
      return str
    },
    submitLogin(){
      // Login Network for OAuth 2.0
      axios({
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'post',
            url: baseurl + '/api/v1/token',
            FormData: true,
            data: {
                username: this.loginData.username,
                password: this.loginData.password
            }}
            ).then(response => {
                // 将令牌存储在本地存储中
                this.$alert(this.constructLoginSuccessHTML(response), "OAuth登录成功", {
                  confirmButtonText: '复制令牌到粘贴板',
                  dangerouslyUseHTMLString: true,
                  callback: action => {
                    if(action == "confirm")
                      this.copyToClipboard(response.data.access_token)
                  }
                });
            })
          .catch(error => {
            // 处理登录错误
            this.$alert(this.constructLoginFailedHTML(error),'OAuth登录错误',
            {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true,
              callback: action => {action}
            })
          });
          /// LOGIN END HERE

    },

    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {

          this.submitLogin()
          // 执行登录操作
        } else {
          return false;
        }
      });
      
    }
  }
};
</script>

<style>
.login-container {
  padding: 20px;
}
</style>