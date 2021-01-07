<template>
  <div>
    <!-- <AuthorPost /> -->
    <!-- <NaviTopBar /> -->
    <div class="blogDataListWarp">
      <BlogDataList />
      <PagesIndex :pagesNum="pagesNums" />
    </div>

  </div>
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BlogDataList from "../components/blogDataList.vue"
import PagesIndex from "../components/pagesIndex.vue"

@Component({
  components: {
    BlogDataList,
    PagesIndex
  }
})
export default class index extends Vue{
  private name :string = "ubdedawweq";
  private pagesNums: number = 120
  public test(): void{
    console.log("hahahahahha")
    
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