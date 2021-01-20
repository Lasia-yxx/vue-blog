<template>
  <div id="ls-SD-warp">
    <mavon-editor :style="style_darkMode" class="ls-SD-show" v-html="html" />
  </div>
</template>
<script lang="ts">
import {Vue,Prop,Component,Watch} from 'vue-property-decorator'

interface styleDM{
  color:string,
  backgroundColor:string
}

@Component
export default class ShowData extends Vue{

  private style_darkMode: styleDM = null

  @Prop({type:String,required:true}) private html!: string

  @Prop({type:Boolean,default:false}) private darkMode!: boolean
  @Watch("darkMode",{immediate:true})
  onDarkModeChange(oldVal,newVal): void{
    if(oldVal){
      this.style_darkMode = {color:" #e4e4e4",backgroundColor:"#1e2023"}
    }else{
      this.style_darkMode = null
    }
  }
}
</script>
<style lang="scss" scoped>
  #ls-SD-warp{
    width: 100%;
    .ls-SD-show{
      padding: 80px 40px ;
    }
  }

  @media screen and(max-width: 800px) {
    #ls-SD-warp{
      width: 100%;
      .ls-SD-show{
        padding: 30px 20px;
      }
    }
  }
</style>