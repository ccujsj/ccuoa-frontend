import Vue from 'vue'
import App from './App.vue'
// Import Vuex for data commuication
import store from './store'

// Import Element ui 2
import ElementUI from 'element-ui';
// Import Main css of element ui
import 'element-ui/lib/theme-chalk/index.css';

// Import Style of Element UI  (Optional) 
/*
In general, this personalized theme and internationalization
 configuration is not required, and the personalized 
 css configuration is omitted
*/
// import './element-variables.scss'

// Import Axios for network commuication
import axios from 'axios';
import VueRouter from 'vue-router';
import router from './router'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.config.productionTip = false
Vue.prototype.$axios=axios;

// Avoid NavigationDuplicated Exceptions
const originalPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}


/*
This prefix route is used to match the state of the navigation
 bar to the user who comes in directly through the route.
*/
router.beforeEach((to, from, next) => {
  store.commit('navBarState', to.fullPath.replace("/",""))
  next()
})

console.log("计算机科学技术学院学生组织欢迎广大同学加入")
console.log("该网站来源于学生组织信息化项目SOIP")
console.log("访问 https://github.com/ccujsj/soip 了解更多")
new Vue({
  render: h => h(App),
  store,
  router:router,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
