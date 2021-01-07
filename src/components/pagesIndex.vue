<template>
  <div id="ls-PI-Warp">
    <el-pagination
      background
      small
      layout="prev, pager, next"
      :pager-count="7"
      :total="pagesNum" class="ls-PI-small">
    </el-pagination>
    <el-pagination
      background
      layout="prev, pager, next"
      :pager-count="7"
      :total="pagesNum" class="ls-PI-large">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component,Prop, Vue } from "vue-property-decorator";

@Component
export default class PageIndexs extends Vue{
  // private pagesNum: number = 10*10
  @Prop({type:Number,required:true}) pagesNum!: number
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