<template>
  <div id="ls-navi-warp">
    <div v-for="item in naviLink" :key="item.index" class="ls-navi-title-warp" >
      <i :class="[item.iconClass,'ls-navi-icon',item.choose?'ls-navi-choose':'']"></i>
      <a @click="chooseNavi(item.id)" :class="item.choose?'ls-navi-choose':''">{{item.name}}</a>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface naviObject {
  id:number,
  name:string,
  choose:boolean,
  iconClass:string
}

@Component
export default class NaviTopBar extends Vue{
  private naviLink: Array<naviObject> = [
      {id:0,name:"BLOG",choose:true,iconClass:"el-icon-menu"},
      {id:1,name:"NOTES",choose:false,iconClass:"el-icon-s-management"},
      {id:2,name:"PHOTO",choose:false,iconClass:"el-icon-camera-solid"},
      {id:3,name:"ABOUT",choose:false,iconClass:"el-icon-user-solid"},
    ];
  private chooseIndex: number = 0
  private chooseNavi(id:number): boolean{    
    if(id == this.chooseIndex){return false}
    this.naviLink[id].choose = true
    this.naviLink[this.chooseIndex].choose = false
    this.chooseIndex = id
    return true
  }
}
</script>
<style lang="scss" scoped>
  #ls-navi-warp{
    width: 100%;
    text-align: right;
    display: block;
    font-size: 1.8rem;
    font-weight: bold;
    color: white;
    letter-spacing: 3px;
    position: absolute;
    top: 0px;
    right: 60px;
    margin-top: 30px;
    user-select: none;
    cursor: pointer;
  }
  .ls-navi-title-warp{
    display: inline;
  }
  #ls-navi-warp .ls-navi-title-warp > a{
    margin: 0 10px;
  }

  #ls-navi-warp .ls-navi-title-warp > a:hover{
    color: #409EFF;
  }
  #ls-navi-warp .ls-navi-title-warp .ls-navi-choose{
    color: #409EFF;
  }
  .ls-navi-icon{
    display: none;
  }
  @media screen and (max-width: 800px) {
    #ls-navi-warp{
      top:initial;
      right: initial;
      position: fixed;
      bottom: 0px;
      letter-spacing: initial;
      background-color: white;
      border-top-right-radius: 30px;
      border-top-left-radius : 30px;
      height: 80px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      color: rgb(99, 99, 99);
      -webkit-tap-highlight-color:rgba(0,0,0,0);
      display: flex;
      font-size: 1.6rem;
    }
    .ls-navi-title-warp{
      display: flex;
      width: 25%;
      height: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .ls-navi-icon{
      display: block;
      margin-bottom: 10px;
      // font-size: 2.2rem;
    }
  }

</style>