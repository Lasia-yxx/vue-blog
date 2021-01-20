<template>
  <div class="blogWarp">
    <BlogDataList v-if="showStatus" :darkMode="this.$darkMode" :blogData="blogData" @delBlog="delBlog" :isHoster="this.$isHoster" />
    <PagesIndex :pagesNum="pagesNum" @pageChange="pageChange" />    
  </div>
  
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'
import HosterFuncBar from "../components/hosterFuncBar.vue"
import BlogDataList from "../components/blogDataList.vue"
import NoteDataList from "../components/noteDataList.vue"
import PagesIndex from "../components/Pages.vue"
import {tokenCheck,delData} from "../api/user"
import {getBlogData,getDataLength} from "../api/api"

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
    NoteDataList,
    PagesIndex
  }
})
export default class hoster extends Vue{

  $token;$loginStatus;$isHoster;$err

  private showStatus: boolean = true
  private blogData: Array<blogObject> = []
  private pagesNum: number = 1000
  private currentPage: number = 1

  private mounted(): void{
    this.tokenCheck()

    getDataLength({database:"blog"}).then(res =>{
      this.pagesNum = Math.ceil(res.data[0]["count(*)"]/10) * 10      
    }).catch(err => {this.$err(err)})
    
    this.getData()
  }

  private getData(): void{
    getBlogData({pages:this.currentPage}).then(res =>{    
      if(res.status == 200){this.blogData = res.data}else{alert("Something Wrong")}
    }).catch(err => {this.$err(err)})
  }

  private pageChange(val): void{
    this.currentPage = val
    this.getData()
  }

  // private switchBlog(value): void{
  //   if(value == "Blog"){this.showStatus = true}else{this.showStatus = false}
  // }

  private delBlog(val): void{
    let data = {id:Number(val),token:this.$token,database:"blog"}
    delData(data).then(res => {
      if(res.data){alert("删除成功");this.getData()}else{Vue.prototype.$tokenReset()}
    }).catch(err => {this.$err(err)})
    
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