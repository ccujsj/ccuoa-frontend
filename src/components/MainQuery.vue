<!--
filename: Query.vue
desc: 德育分查询组件
@author: Dongxu Fei
@contact: phil616@163.com
@copyright: CCUJSJ - 长春大学计算机科学技术学院学生会
@licence: Apache 2.0
@date: 2023-9-6
-->
<template>
    <div>
    <div class="component-container">
      <div class="input-container">
        <el-input v-model="inputText" :clearable="this.input_clearable" @keyup.enter.native="submit" placeholder="请输入学号"></el-input>
        <el-button type="primary" @click="submit">查询</el-button>
      </div>

      <el-table :data="basicData" style="width: 100%">
        <el-table-column prop="stu_id" label="学号"></el-table-column>
        <el-table-column prop="stu_name" label="姓名"></el-table-column>
        <el-table-column prop="stu_score" label="当前分数"></el-table-column>
        <el-table-column prop="stu_clazz" label="班级"></el-table-column>
    </el-table>
    </div>
    <el-divider></el-divider>
        <el-table :data="listData" style="width: 100%">
        <el-table-column prop="rec_id" label="ID"></el-table-column>
        <el-table-column prop="student_name" label="姓名"></el-table-column>
        <el-table-column prop="rec_desc" label="活动简介"></el-table-column>
        <el-table-column prop="rec_score" label="分值"></el-table-column>
        <el-table-column prop="rec_status" label="审核情况"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="downloadItem(scope.row.rec_id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </template>
  
<script>
import axios from 'axios';
import baseurl  from '../utils.js';
  
export default {
  props:{
    clearable: String
  },
  data() {
    return {
      inputText: '',
      input_clearable:true,  // allow user to earse input id number
      listData: [],
      basicData:[]
    };
  },
  methods: {

    formatReadableTime(timeString) {
        const date = new Date(timeString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const readableTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return readableTime;
    },
    statusMapping(number){
    
        if(number == 1){
            return "未审核"
        }
        if (number == 2){
            return "审核通过，尚未公布"
        }
        if (number == 3){
            return "审核不通过"
        }
        if (number == 4){
            return "审核通过"
        }
        else {return "状态未知，请联系相关部门"}
    },
    constract_detail_info(rec_id){
        var str = ""
        this.listData.forEach(element => {
            if(element.rec_id == rec_id){
                str += "ID:" + element.rec_id + "<br>";
                str += "学号：" + element.student_id + "<br>";
                str += "姓名：" + element.student_name + "<br>";
                str += "类型：" + element.rec_types + "<br>";
                str += "分值：" + element.rec_score + "<br>";
                str += "描述：" + element.rec_desc + "<br>";
                str += "日期：" + this.formatReadableTime(element.rec_date) + "<br>";
                str += "提交备注：" + element.rec_msg + "<br>";
                str += "审核结果：" + this.statusMapping(element.rec_status) + "<br>";
                str += "审核员：" + element.chk_username + "<br>";
                str += "审核备注：" + element.chk_commit + "<br>";
                str += "审核时间：" + this.formatReadableTime(element.chk_date) + "<br>";
            }
        });
        return str
    },
    downloadItem(rec_id){

        this.$alert(this.constract_detail_info(rec_id), "关于ID="+rec_id+"的详细信息", {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true,
          callback: action => {action}
        });
      
    },
    submit() {
        if (this.inputText) {

            // first get basic info
            axios.get(baseurl + '/api/v1/get/moral/score/id?uid=' + this.inputText)
            .then(response => {
                response.data.stu_score += 80.0;  // according to the policy file, student's default score is 80.0
                this.basicData.pop()
                this.basicData.push(response.data)
            })
            .catch(error => {
                this.$message.error(error)
            });

            // get list info
            axios.get(baseurl + '/api/v1/get/moral/record/id?uid=' + this.inputText)
            .then(response => {
                this.listData = response.data
                this.listData.forEach(element => {
                    element.rec_status = this.statusMapping(element.rec_status)
                });
            })
            .catch(error => {
                this.$message.error(error)
            });
        }
    }
  }
}
</script>
  <style scoped>
  .component-container {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .input-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .input-container .el-input {
    margin-right: 10px;
  }
  </style>