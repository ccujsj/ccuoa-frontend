<!--
filename: app.vue
desc: 主应用挂载组件
@author: Dongxu Fei
@contact: phil616@163.com
@copyright: CCUJSJ - 长春大学计算机科学技术学院学生会
@licence: Apache 2.0
@date: 2023-9-6
-->
<template>
  <div id="app">
    <div>
      <el-row type="flex" justify="center" align="middle">
        <el-col :span="24">
          <h1>计算机科学技术学院</h1>
          <h2>团学组织微主页</h2>
        </el-col>
      </el-row>
    </div>
    <div>

    <el-menu
      :default-active="activeIndex"
      class="top-menu"
      mode="horizontal"
      :collapse="false"
    >
      <el-menu-item index="public" @click="$router.push('/public')">首页</el-menu-item>
      <el-menu-item index="query" @click="$router.push('/query')">查询</el-menu-item>
      <el-menu-item index="feedback" @click="$router.push('/feedback')">反馈</el-menu-item>
      <el-menu-item index="admin" @click="$router.push('/admin')">后台</el-menu-item>
    </el-menu>

    <!-- 其他页面内容 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data(){
    return {
      activeIndex: this.getComputedNavBarState()
    };
  },
  methods: {
    getComputedNavBarState(){
      return this.$store.getters.getNavBar
    }
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.top-menu {
  line-height: 60px;
}

.toggle-btn {
  position: absolute;
  right: 20px;
  top: 20px;
}

.content {
  margin-top: 20px;
  padding: 20px;
}
</style>
