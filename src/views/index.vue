<template>
  <div>
    <!-- <AuthorPost /> -->
    <!-- <NaviTopBar /> -->
    <div class="blogDataListWarp">
      <BlogDataList :darkMode="this.$darkMode" :blogData="blogData"  />
      <PagesIndex :pagesNum="pagesNums" />
    </div>

  </div>
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BlogDataList from "../components/blogDataList.vue"
import PagesIndex from "../components/pagesIndex.vue"
import {getBlogData} from "../api/api"

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

  private name :string = "ubdedawweq";
  private darkMode: boolean = false
  private pagesNums: number = 120
  private blogData: Array<blogObject> = []

  private mounted(): void{
    getBlogData().then(res =>{    
      if(res.status == 200){this.blogData = res.data}else{alert("Something Wrong")}
    })
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