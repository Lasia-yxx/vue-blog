<template>
  <div class="blogWarp">
    <BlogDataList v-if="showStatus" :darkMode="this.$darkMode" :blogData="blogData" :isHoster="this.$isHoster" />    
  </div>
  
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'
import HosterFuncBar from "../components/hosterFuncBar.vue"
import BlogDataList from "../components/blogDataList.vue"
import NoteDataList from "../components/noteDataList.vue"
import {tokenCheck} from "../api/user"
import {getBlogData} from "../api/api"

interface blogObject{
  blog_title:string,
  blog_describle:string,
  blog_date:string,
  blog_type:string,
  id:Number
}

@Component({
  components:{
    HosterFuncBar,
    BlogDataList,
    NoteDataList
  }
})
export default class hoster extends Vue{

  $token;$loginStatus;$isHoster

  private showStatus: boolean = true
  private blogData: Array<blogObject> = []

  private mounted(): void{
    this.tokenCheck()
    getBlogData({pages:1}).then(res =>{    
      if(res.status == 200){this.blogData = res.data}else{alert("Something Wrong")}
    })
  }

  private switchBlog(value): void{
    if(value == "Blog"){this.showStatus = true}else{this.showStatus = false}
    
  }

  private tokenCheck(): void{
    if(this.$token || this.$loginStatus){
      tokenCheck({token:this.$token}).then(res => {
        if(res.data.code){this.$isHoster = true}else{Vue.prototype.$tokenReset()}
      }).catch(err =>{console.log("登陆身份出现错误请重新登录");Vue.prototype.$tokenReset()})
    }
  }
}


</script>
<style scoped>
.blogWarp{
  width: 60%;
  min-width: 800px;
  margin: 0 auto;
}
@media screen and (max-width: 800px) {
  .blogWarp{
    width: 90%;
    min-width: initial;
  }
}
</style>