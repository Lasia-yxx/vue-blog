<template>
  <div id="ls-FB-warp">
    <div class="ls-FB-ball" @click="showFunction">
      <i class="el-icon-ice-cream-round"></i>
    </div>
    <div class="ls-FB-funcWarp" :style="style" >

      <div :class="['ls-FB-func',this.$darkMode?'choose':'']" @click="darkMode">Dark Mode</div>
      <div :class="['ls-FB-func',$route.name=='search'?'choose':'']" @click="search">Search</div>
      <div :class="['ls-FB-func',$isHoster?'choose':'']" @click="login">Login</div>
      
    </div>
  </div>
</template>
<script lang="ts">
import {Component,Vue,Emit,Prop,Watch} from 'vue-property-decorator'

interface styleObj{
  maxHeight:String,
  opacity: Number
}

@Component
export default class FunctionBall extends Vue{

  $router;$darkMode;$route;$loginStatus

  private display: boolean = false
  private style: styleObj = {maxHeight:'0px',opacity:0}

  private showFunction(): void{
    if(this.display){this.style = {maxHeight:"0px",opacity:0}}else{this.style = {maxHeight:"200px",opacity:1}}
    this.display = !this.display
  }
  private search(): void{
    if(this.$route.name != "search"){
      this.$router.push({path:"search"})
    }
    this.showFunction()
  }

  @Emit("darkMode")
  private darkMode(): boolean{ //告知全部组件，是否开启dark mode
    this.$darkMode = !this.$darkMode
    this.showFunction()
    return this.$darkMode
  }
  @Emit("login")
  private login(): boolean{
    this.showFunction()
    return true
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
    transition-property: max-height,opacity; 
    transition-duration:.8s , 1.2s;
    transition-timing-function:ease;
    // transition: opacity .8s ease-in-out;
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

  .choose{
    color: #08bbff;
  }

  @media screen and (max-width: 800px) {
    #ls-FB-warp{
      bottom: initial;
      top: 20px;
      left: 15px;
      display: flex;
      flex-direction: column;
    }
    .ls-FB-ball{
      width: 50px;
      height: 50px;
    }
    .ls-FB-ball:hover{
      box-shadow: 0 2px 12px 0 rgba(102, 67, 67, 0.2);
      color: #ffa8a8;
    }
    .ls-FB-funcWarp{
      margin-left: 22px;
      margin-top: 10px;
    }
    .ls-FB-func{
      width: 110px;
      height: 40px;
      line-height: 40px;
    }
    .ls-FB-func:hover{
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      color: inherit;
    }
  }
</style>