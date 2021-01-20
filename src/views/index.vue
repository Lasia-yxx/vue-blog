<template>
  <div>
    <!-- <AuthorPost /> -->
    <!-- <NaviTopBar /> -->
    <div class="blogDataListWarp">
      <BlogDataList :darkMode="this.$darkMode" :blogData="blogData"  />
      <PagesIndex :pagesNum="pagesNum" @pageChange="pageChange" />
    </div>

  </div>
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BlogDataList from "../components/blogDataList.vue"
import PagesIndex from "../components/Pages.vue"
import {getBlogData,getDataLength} from "../api/api"

interface blogObject{
  blog_title:string,
  blog_describle:string,
  blog_date:string,
  blog_type:string,
  id:Number
}

@Component({
  components: {
    BlogDataList,
    PagesIndex
  }
})
export default class index extends Vue{

  $err

  private darkMode: boolean = false
  private pagesNum: number = 1000
  private blogData: Array<blogObject> = []
  private currentPage: number = 1

  private mounted(): void{

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
}
</script>

<style lang="scss" scoped>
  .blogDataListWarp{
    width: 60%;
    min-width: 800px;
    margin: 0 auto;
  }
  @media screen and (max-width: 800px) {
    .blogDataListWarp{
      width: 90%;
      min-width: initial;
    }
  }
</style>