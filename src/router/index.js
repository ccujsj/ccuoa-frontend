/*
filename: router/index.js
desc: 主要路由组件
@author: Dongxu Fei
@contact: phil616@163.com
@copyright: CCUJSJ - 长春大学计算机科学技术学院学生会
@licence: Apache 2.0
@date: 2023-9-6
*/

import VueRouter from 'vue-router'
import MainAdmin from '../components/MainAdmin'
import MainQuery from '../components/MainQuery'
import MainFeedback from '../components/MainFeedback'
import MainPublic from '../components/MainPublic'


export default new VueRouter({
    routes:[
        {
            path:'/',
            component:MainPublic
        },

        {
            path:'/public',
            component:MainPublic
        },
        {
            path:'/admin',
            component:MainAdmin
        },
        {
            path:'/query',
            component:MainQuery
        },
        {
            path:'/feedback',
            component:MainFeedback
        },
    ]
})