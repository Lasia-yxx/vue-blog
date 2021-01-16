<template>
  <div id="ls-PI-Warp">
    <el-pagination
      background
      small
      layout="prev, pager, next"
      :pager-count="7"
      @current-change="handleCurrentChange"
      :total="pagesNum" class="ls-PI-small">
    </el-pagination>
    <el-pagination
      background
      layout="prev, pager, next"
      :pager-count="7"
      @current-change="handleCurrentChange"
      :total="pagesNum" class="ls-PI-large">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component,Prop, Vue, Watch, Emit } from "vue-property-decorator";

@Component
export default class PageIndexs extends Vue{
  private currenPage: number = 1

  @Prop({type:Number,required:true}) pagesNum!: number

  @Watch("currenPage",{immediate:true})
  popPageIndex(){
    console.log("change");
    
    this.pageChange()
  }

  @Emit("pageChange")
  private pageChange(): number{
    return this.currenPage
  }

  private handleCurrentChange(val): void{
    this.currenPage = val
  }

}
</script>
<style lang="scss" scoped>
  #ls-PI-Warp{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
  }
  .ls-PI-small{
    display: none;
  }
  .ls-PI-large{
    display: block;
  }
  @media screen and (max-width: 800px) {
    .ls-PI-small{
      display: block;
    }
    .ls-PI-large{
      display: none;
    }
  }
</style>