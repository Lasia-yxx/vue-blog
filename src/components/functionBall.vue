<template>
  <div id="ls-FB-warp">
    <div class="ls-FB-ball" @click="showFunction">
      <i class="el-icon-ice-cream-round"></i>
    </div>
    <div class="ls-FB-funcWarp" :style="style" >
      <div class="ls-FB-func">Dark Mode</div>
      <div class="ls-FB-func" @click="search">Search</div>
      <div class="ls-FB-func" @click="backTop">Back Top</div>
      
    </div>
  </div>
</template>
<script lang="ts">
import {Component,Vue} from 'vue-property-decorator'


@Component
export default class FunctionBall extends Vue{
  private display: boolean = false
  private style: string = "max-height:0px"
  private showFunction(): void{
    if(this.display){this.style = "max-height:0px"}else{this.style = "max-height:200px"}
    this.display = !this.display
  }
  private backTop(): void{scrollTo(0,0)}
  private search(): void{
    
  }
}
</script>

<style lang="scss" scoped>
  #ls-FB-warp{
    position: fixed;
    bottom: 50px;
    left: 30px;
    display: flex;
    flex-direction: column-reverse;
  }
  .ls-FB-ball{
    width: 60px;
    height: 60px;
    background-color: #ffffff;
    border-radius: 50%;
    box-shadow: 0 2px 12px 0 rgba(102, 67, 67, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #ffa8a8;
    cursor: pointer;
    i{
      transform: rotate(-30deg);
    }
  }
  .ls-FB-ball:hover{
    box-shadow: 0 2px 22px 0 rgba(102, 67, 67, 0.2);
    color:  #08bbff;
  }
  .ls-FB-funcWarp{
    font-size: 1.6rem;
    user-select: none;
    cursor: pointer;
    margin-left: 30px;
    border-left: 3px solid #ffa8a8;
    margin-bottom: 10px;
    transition: max-height .8s ease-in-out;
    overflow: hidden;
    padding-right: 15px;
  }
  .ls-FB-func{
    margin: 5px 0 15px 10px;
    width: 140px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 25px;
  }

  .ls-FB-func:hover{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .15);
    color: #ffa8a8;
  }
</style>