<!--
filename: MainPublic.vue
desc: 主页组件
@author: Dongxu Fei
@contact: phil616@163.com
@copyright: CCUJSJ - 长春大学计算机科学技术学院学生会
@licence: Apache 2.0
@date: 2023-9-6
-->

<template>
    <div>
      <div>
        <img alt="计算机科学技术学院LOGO" src="../assets/jsjlogo.png" class="logo" />
      </div>
      <div class="container">
        <div class="content"> 
          <div class="main_welcome">
            <p>
                欢迎来到团学组织微主页,提供常用链接、信息公开、团学工作介绍和德育分查询服务。
            </p>
        </div>
        <div class="quick-link">
            <h3>快捷链接</h3>
            <el-menu>
            <el-menu-item v-for="link in quick_links" :key="link.id" @click="handleMenuClick">
                <el-link style="font-size: 16px;" :href="link.text_value" target="_blank" type="primary">{{ link.text_key }}</el-link>
            </el-menu-item>
        </el-menu>
        </div>
        
        <div class="open-policy">
          <h3>信息公开</h3>
          <el-menu>
            <el-menu-item v-for="link in open_policy_links" :key="link.id" @click="handleMenuClick">
                <el-link style="font-size: 16px;" :href="link.text_value" target="_blank" type="primary">{{ link.text_key }}</el-link>
            </el-menu-item>
        </el-menu>
        </div>
        
          
        <div class="learn-more">
            <h3>了解更多</h3>
            <el-menu>
            <el-menu-item v-for="link in learn_more_links" :key="link.id" @click="handleMenuClick">
                <el-link style="font-size: 16px;" :href="link.text_value" target="_blank" type="primary">{{ link.text_key }}</el-link>
            </el-menu-item>
        </el-menu>
        </div>
        </div>

        <div class="footer">
          <div>
            <p>长春大学计算机科学技术学院团委 <br> 长春大学ACM协会提供技术支持</p>
            <p>
                <i class="el-icon-tickets"></i> <el-link href="https://github.com/ccujsj" target="_blank"> Github 开放源代码 </el-link>
                &nbsp;
                <i class="el-icon-phone-outline"></i> <el-link href="https://github.com/ccujsj/soip" target="_blank"> 联系我们 </el-link>
            </p>
        </div>
        </div>
      </div>

    </div>
</template>
<script>

import axios from 'axios';
import baseurl from '@/utils';
export default {
  name: 'MainPublic',
    data() {
    return {
      quick_links:[],
      open_policy_links:[],
      learn_more_links:[]
    };
  },
  methods:{
    handleMenuClick(event) {
      /*
      Click on other parts of the menu on the 
      mobile side to transfer the click effect to the 
      blank area, using this method can make the 
      click on the link text equivalent to linking other
       blank areas
      */

      const href = event.$children[0].href
      window.open(href,"_blank")
  },
  },
  created(){
    axios.get(baseurl + '/api/v1/get/info/all')
          .then(response => {
              response.data.forEach(element => {
                if(element.text_type == 2){
                  this.quick_links.push(element)
                }
                if(element.text_type == 1){
                  this.open_policy_links.push(element)
                }
                if(element.text_type == 3)
                {
                  this.learn_more_links.push(element)
                }
              });
          })
          .catch(error => {
          this.$message(error)
    })
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 75vh; /* 设置容器的最小高度为视口高度 */
}

.content {
  flex: 1;
}

.footer {
  flex-shrink: 0;
  background-color: #f0f0f0;
}
.logo{
  max-width: 40%;
  display: block;
  margin: 0 auto;
}
@media (min-width: 768px) { /* 假设屏幕宽度大于等于 768px 视为电脑端 */
  .logo {
    max-width: 200px;
  }
}
</style>
