<template>
  <div id="ls-FoB-warp" :style="darkModeStyle">
    <p>Email:Sia_18075083007@outlook.com</p>
    <div class="ls-FoB-recordNum">
      <a @click="jumpUrl" data-url="https://beian.miit.gov.cn/">皖 ICP 备2020018277号</a>
      <div style="display:flex;align-items: center;">
      <img src="http://www.yxxlasia.fun:3000/static/images/icon/recordIcon.png">
      <a>皖公安网备 24150202000266</a>
      </div>
    </div>
    <p @click="jumpUrl" class="ls-github" data-url="https://github.com/Lasia-yxx">Github: https://github.com/Lasia-yxx</p>
  </div>
</template>
<script lang="ts">
import {Vue,Component,Prop,Watch} from 'vue-property-decorator'

@Component
export default class FooterBar extends Vue{

  private darkModeStyle: any = null

  @Prop({type:Boolean,default:false}) darkMode!: boolean
  @Watch("darkMode",{immediate:true})
  onDarkModeChange(oldVal,newVal): void{
    if(oldVal){
      this.darkModeStyle = {color:"#e4e4e4"}
    }else{
      this.darkModeStyle = null
    }
  }

  private jumpUrl(e): void{
    window.open(e.srcElement.dataset.url)
  }
}
</script>
<style lang='scss' scoped>
  #ls-FoB-warp{
    width: 100%;
    padding: 20px 0 30px 0;
    text-align: center;
    font-size: 1.4rem;
    color: #636363;
  }
  .ls-FoB-recordNum{
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    a{
      margin-right:30px;
      cursor: pointer;
    }
    a:hover{
      color: #409EFF;
    }
    img{
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
  .ls-github:hover{
    cursor: pointer;
    color: #409EFF;
  }
  @media screen and(max-width: 800px) {
    .ls-FoB-recordNum{
      flex-direction: column;
      a{
        margin-right: 0px;
      }
      img{
        width: 15px;
        height: 15px;
        margin-right: 5px;
      }
      div{
        margin-top: 5px;
      }
    }
    p{
      display: none;
    }
    #ls-FoB-warp{
      padding: 10px 0;
    }
  }
</style>