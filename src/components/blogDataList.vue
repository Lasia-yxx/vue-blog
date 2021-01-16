<template>
  <div id="ls-BDL-warp" :style="dark_mode_style">
    <div v-for="item in cleanData" :key="item.index" class="ls-BDL-container">
      <div class="ls-BDL-title">{{item.blog_title}}</div>
      <div class="ls-BDL-describle" :style="dark_mode_style">{{item.blog_info}}<a class="ls-BDL-arrow">>></a></div>
      <div class="ls-BDL-date" :style="dark_mode_style">{{item.blog_date}}</div>
      <div class="ls-BDL-type" :style="dark_mode_style"><i class="el-icon-link"></i>{{item.blog_type}}</div>
      <div v-if="isHoster" :style="dark_mode_style" class="ls-del-btn">删除</div>
      <div v-if="isHoster" :style="dark_mode_style" class="ls-edit-btn">编辑</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Watch,Prop, Vue, } from "vue-property-decorator";
import tool from "../ulits/tools"

interface blogObject{
  blog_title:string,
  blog_info:string,
  blog_date:string,
  blog_type:string,
  id:Number
}
interface styleDM{
  color:string,
  backgroundColor:string
}

@Component
export default class BlogDataList extends Vue{

  @Prop({type:Boolean,default:false}) isHoster!: boolean
  @Prop({type:Array,required:true}) blogData!: Array<blogObject>
  get cleanData(){
    tool.$dateFormat(this.blogData)
    return this.blogData
  }

  @Prop({type:Boolean,required:true}) darkMode!: boolean
  @Watch("darkMode",{immediate:true,deep:true})
  onDarkModeChange(oldVal:boolean,newVal:boolean): void{
    if(oldVal){
      this.dark_mode_style = {color:"#e4e4e4",backgroundColor:""}
    }else{
      this.dark_mode_style = null
    }
  }

  private dark_mode_style: styleDM = null
}
</script>
<style lang="scss" scoped>
  #ls-BDL-warp{
    width: 100%;
    color: rgb(99, 99, 99);
    font-size: 1rem;
  }

  .ls-BDL-container{
    margin: 20px 0;
    padding: 20px 0;
    letter-spacing: 1px;
    .ls-BDL-title{
      font-size: 2.5em;
      font-weight: bold;
      cursor: pointer;
    }
    .ls-BDL-title:hover{
      color: #409EFF;
    }
    .ls-BDL-date,.ls-BDL-type{
      display: inline-block;
      font-size: 1.5em;
      font-weight: bold;
      color: rgba(99, 99, 99, .65);
      margin-top: 15px;
    }
    .ls-BDL-type{
      font-weight: normal;
      i{
        font-weight: bold;
        margin: 0 0px 0 25px;
      }
    }
  }
  
  .ls-BDL-container > .ls-BDL-describle{
    margin-top: 15px;
    font-size: 1.8em;
    font-weight: lighter;
    color: rgba(99, 99, 99, .8);
    line-height: 25px;
    .ls-BDL-arrow{
      margin-left: 10px;
      font-size: 1em;
      line-height: 25px;
    }
  }

  .ls-del-btn,.ls-edit-btn{
    display: inline-block;
    font-size: 1.5em;
    color: rgba(99, 99, 99, .65);
    cursor: pointer;
    margin-left: 30px;
    user-select: none;
  }
  .ls-del-btn:hover,.ls-edit-btn:hover{
    color: #409EFF;
  }

  @media screen and (max-width: 800px) {
     #ls-BDL-warp{
       font-size: 0.8rem;
     }
     .ls-BDL-container{
       margin: 10px 0 5px 0;
     }

     .ls-BDL-container > .ls-BDL-describle{
        margin-top: 10px;
        line-height: 20px;
        font-weight: bold;
        .ls-BDL-arrow{
          margin-left: 10px;
          line-height: 20px;
          font-size: 1em;
        }
      }
  }
</style>