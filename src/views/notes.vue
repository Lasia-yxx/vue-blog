<template>

  <div class="notes-warp">
    <div class="notes-container">
      <NoteDataList :isUpload="isUpload" :darkMode="this.$darkMode" :isHoster="this.$isHoster" />
    </div>
    <div v-if="this.$writeWhat == 'tips' && this.$route.name == 'notes'" class="writeTipsWarp">
      <div class="writeContainer">
        <div class="title">Tips<i @click="doClose()" class="el-icon-close"></i></div>
        <div class="inputWarp">
          <textarea v-model="tips_info" class="tipInput"></textarea>
        </div>
        <div class="submitContainer">
          <el-button class="submit" @click="submit" type="success" icon="el-icon-check" circle></el-button>
          <el-button class="writeNote" @click="writeNote" type="primary" icon="el-icon-edit" circle></el-button>
      </div>
      </div>
    </div>
  </div>

</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'
import NoteDataList from "../components/noteDataList.vue"
import tool from "../ulits/tools"
import {uploadTips} from "../api/user"

@Component({
  components:{
    NoteDataList
  }
})
export default class notes extends Vue{
 
  $writeWhat;$err;$token;$router

  private tips_info: string = null
  private isUpload : boolean = false

  private doClose():void{
    this.$writeWhat = ""
  }

  private submit(): void{
    if(this.tips_info == ""){
      alert("未填写tips的内容")
    }else{
      let data = {date:tool.$getCurrentDate(),info:this.tips_info,token:this.$token}
      uploadTips(data).then(res => {        
        if(res.data){alert("提交成功");this.doClose();this.isUpload = !this.isUpload}
        else{Vue.prototype.$tokenReset()}
      }).catch(err => {this.$err(err)})
      
    }
  }

  private writeNote(): void{
    this.$router.push({name:"editor",query:{type:"note",isEditor:0}})
  }

}
</script>

<style lang="scss" scoped>
.notes-warp{
  width: 60%;
  min-width: 800px;
  margin: 0 auto;
  margin-top: 20px;
}
.writeTipsWarp{
  position: fixed;
  z-index: 9999999999;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,.5);
}
.writeContainer{
  width: 30%;
  background-color: white;
  min-width: 500px;
  padding: 30px 20px;
  border-radius: 15px;
  color: rgb(99, 99, 99);
  display: flex;
  align-items: center;
  flex-direction: column;
}
.title{
  font-size: 2.2rem;
  margin-bottom: 15px;
  font-weight: bold;
  width: 100%;
  i{
      float: right;
      display: block;
      font-size: 1.6rem;
      cursor: pointer;
    }
    i:hover{
      color: #ffa8a8;
    }
}
.inputWarp{
  user-select: none;
  margin-top: 0px;
  display: flex;
  width: 95%;
  flex-direction: row;
  align-items: center;
}
.tipInput{
  width: 100%;
  height: 150px;
  outline: none;
  border: none;
  background-color: rgb(248, 248, 248);
  font-size: 1.6rem;
  border-radius: 10px;
  padding: 10px;
  letter-spacing:  1px;
  font-family: inherit;
}
.submitContainer{
  width: 95%;
  margin-top: 20px;
  .submit{
    display: block;
    float: right;
  }
  .writeNote{
    display: block;
    float: left;
    margin-left: 0 !important;
  }
}
@media screen and (max-width: 800px) {
  .notes-warp{
    width: 92%;
    min-width: initial;
  }
  .writeContainer{
    width: 80%;
    background-color: white;
    min-width: initial;
    padding: 20px 20px;
    border-radius: 15px;
    color: rgb(99, 99, 99);
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .tipInput{
    height: 100px;
  }
}
</style>