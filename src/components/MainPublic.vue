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
          <WelcomeLogo />
          <QuickLink />
          <OpenPolicy />

          <AboutUs />
        </div>

        <div class="footer">
          <QuickStart />
        </div>
      </div>

    </div>
</template>
<script>
import AboutUs from './public/AboutUs.vue'
import QuickLink from './public/QuickLink.vue'
import QuickStart from './public/QuickStart.vue'
import OpenPolicy from './public/OpenPolicy.vue'
import WelcomeLogo from './public/WelcomeLogo.vue'
export default {
  name: 'MainPublic',
  components: {
    AboutUs,
    OpenPolicy,
    QuickLink,
    QuickStart,
    WelcomeLogo,
},
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
