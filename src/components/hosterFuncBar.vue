<template>
  <div class="ls-HF-warp">
    <div class="ls-HF-ball" @click="showFunction">
      <i id="ls-HF-widthScreen" class="el-icon-plus"></i>
      <i id="ls-HF-narrowScreen" class="el-icon-s-operation"></i>
    </div>
    <div class="ls-HF-funcWarp" :style="style">
      <div :class="['ls-HF-func',this.$darkMode?'choose':'']" @click="darkMode">Dark Mode</div>
      <div :class="['ls-HF-func',$route.name=='search'?'choose':'']" @click="search">Search</div>
      <div :class="['ls-HF-func',$loginStatus?'choose':'']" @click="login">{{hosterStatus}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue,Component,Prop,Watch,Emit} from 'vue-property-decorator'

interface styleObj{
  maxHeight:String,
  opacity: Number
}

@Component
export default class HosterFuncBar extends Vue{

  $cookies

  private display: boolean = false
  private style: styleObj = {maxHeight:'0px',opacity:0}
  private hosterStatus: string  = "Blog"

  private showFunction(): void{
    if(this.display){this.style = {maxHeight:"0px",opacity:0}}else{this.style = {maxHeight:"200px",opacity:1}}
    this.display = !this.display
  }

  private darkMode(): void{
    this.$cookies.remove("token")
    console.log(this.$cookies.get("token"));
    
  }
  private search(): void{}
  @Emit("switchBlog")
  private login(): string{
    if(this.hosterStatus === "Blog"){
      this.hosterStatus = "Notes"
    }else{this.hosterStatus = "Blog"}
    return this.hosterStatus
  }
}
</script>
<style lang='scss' scoped>
.ls-HF-warp{
  position: fixed;
  bottom: 50px;
  right: 30px;
  display: flex;
  flex-direction: column-reverse;
  // opacity: ;
  align-items: center;
}
.ls-HF-ball{
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 2px 12px 0 rgba(102, 67, 67, 0.2);
  text-align: center;
  line-height: 60px;
  font-size: 2.5rem;
  color: #ffa8a8;
  cursor: pointer;
}
.ls-HF-ball:hover{
  box-shadow: 0 2px 22px 0 rgba(102, 67, 67, 0.2);
  color: #08bbff;
}
.ls-HF-funcWarp{
  font-size: 1.6rem;
  user-select: none;
  cursor: pointer;
  margin-bottom: 10px;
  transition-property: max-height,opacity; 
  transition-duration:.8s , 1.2s;
  transition-timing-function:ease;
  overflow: hidden;
  padding-right: 15px;
}
.ls-HF-func{
  margin: 5px 0 15px 10px;
  width: 140px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 25px;
}

.ls-HF-func:hover{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .15);
  color: #ffa8a8;
}
.choose{
  color: #08bbff;
}
#ls-HF-widthScreen{display: initial;}
#ls-HF-narrowScreen{display: none;}

@media screen and (max-width: 800px) {
  .ls-HF-warp{
    flex-direction: column;
    bottom: initial;
    top: 0;
    right: 0;
    padding-top: 20px;
    color: white;
    display: block;
  }
  .ls-HF-ball{
    width: auto;
    height: auto;
    background-color: initial;
    box-shadow: initial;
    color: white;
    font-size: 3rem;
    text-align: right;
    i{margin-right: 20px;}
    .ls-HF-warp{
      background-color: darkcyan;
    }
  }
  .ls-HF-ball:hover{
    box-shadow: initial;
    color: #08bbff;
  }
  .ls-HF-funcWarp{
    background-color: rgba(130,130,130,.4);
    font-size: 1.8rem;
  }
  .ls-HF-func{
    background-color: initial;
    box-shadow: initial;
    width: 90px;
  }
  .ls-HF-func:hover{
    box-shadow: initial;
  }
  #ls-HF-widthScreen{display: none;}
  #ls-HF-narrowScreen{display: initial;}
}
</style>
