<!--
filename: AboutUs.vue
desc: 关于组建
@author: Dongxu Fei
@contact: phil616@163.com
@copyright: CCUJSJ - 长春大学计算机科学技术学院学生会
@licence: Apache 2.0
@date: 2023-9-6
-->
<template>
    <div>
        <h3>了解更多</h3>
        <el-menu>
        <el-menu-item v-for="link in links" :key="link.id" @click="handleMenuClick">
            <el-link style="font-size: 16px;" :href="link.text_value" target="_blank" type="primary">{{ link.text_key }}</el-link>
        </el-menu-item>
    </el-menu>
    </div>
</template>

<script>
import axios from 'axios';
import baseurl from '@/utils';
export default {

  data() {
    return {
      links:[],
    };
  },
  methods: {
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
                if(element.text_type == 3){
                  this.links.push(element)
                }
              });
          })
          .catch(error => {
          this.$message(error)
    })
}
};
</script>

<style scoped>
</style>