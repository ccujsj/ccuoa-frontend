<!--
filename: MainFeedback.vue
desc: 主要反馈组件
@author: Dongxu Fei
@contact: phil616@163.com
@copyright: CCUJSJ - 长春大学计算机科学技术学院学生会
@licence: Apache 2.0
@date: 2023-9-6
-->
<template>
    <div>
        <h2>反馈中心</h2>
        <p>
            反馈中心提供意见反馈渠道，包括意见反馈、工作建议，问题举报和行政提问等。
            反馈渠道均可选择匿名反馈，但可能需要提供腾讯账号以供反爬虫和对抗恶意网络攻击。
        </p>
        <el-collapse v-model="activeNames">
  <el-collapse-item title="生活意见反馈" name="1">
    <el-link type="primary" :href="this.type_A">反馈关于“吃、穿、住、行”方面的内容和建议。</el-link>
  </el-collapse-item>
  <el-collapse-item title="校园建设反馈" name="2">
    <el-link type="primary" :href="this.type_B">反馈关于校园基础设施、教学设施、体育设施、无障碍设施和校园安全设施等方的问题。</el-link>

  </el-collapse-item>
  <el-collapse-item title="学生工作建议" name="3">
    <el-link type="primary" :href="this.type_C">反馈关于班级干部工作、团支部工作、学生组织工作和学生社团工作的建议。</el-link>

  </el-collapse-item>
  <el-collapse-item title="学生干部违纪举报" name="4">
    <el-link type="primary" :href="this.type_D">举报班委、团支部成员、学生会、团委和其它学生组织骨干成员的作风问题、态度问题和工作问题。</el-link>

  </el-collapse-item>
  <el-collapse-item title="校园行政事务提问" name="5">
    <el-link type="primary" :href="this.type_E">向志愿者提出关于选课、免修、活动报名、考试报名、学分德育分申报、奖助学金等行政方面的问题。</el-link>

  </el-collapse-item>
</el-collapse>
    </div>


    
</template>
<script>
import axios from 'axios';
import baseurl from '@/utils';
  export default {
    data() {
      return {
        links:[],
        type_A:'',
        type_B:'',
        type_C:'',
        type_D:'',
        type_E:'',
        activeNames: ['1']
      };
    },
    created(){
        axios.get(baseurl + '/api/v1/get/info/all')
          .then(response => {
              response.data.forEach(element => {
                  if(element.text_key === "type_a") this.type_A = element.text_value;
                  if(element.text_key === "type_b") this.type_B = element.text_value;
                  if(element.text_key === "type_c") this.type_C = element.text_value;
                  if(element.text_key === "type_d") this.type_D = element.text_value;
                  if(element.text_key === "type_e") this.type_E = element.text_value;
              });
          })
          .catch(error => {
            this.$message(error)
        })
    }
  }
</script>