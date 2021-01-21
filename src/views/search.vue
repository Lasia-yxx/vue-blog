<template>
  <div id="search-warp">
    <div class="searchContaier" :style="dark_mode_style">
      <input @keyup.enter="doSearch" v-model="searchKey" class="search-input" />
      <div class="searchIcon-warp">
        <i @click="doSearch" :class="icon_class"></i>
      </div>
    </div>
    <div class="blogDataWarp"><BlogDataList :isHoster="this.$isHoster" :darkMode="this.$darkMode" :blogData="blogData" /></div>

  </div>
</template>
<script lang="ts">
import { Component,Watch,Vue,Prop } from "vue-property-decorator";
import BlogDataList from "../components/blogDataList.vue"
import {searchBlog} from "../api/api"
import {tokenCheck} from "../api/user"

interface blogObject{
  blog_title:string,
  blog_describle:string,
  blog_date:string,
  blog_type:string
}

@Component({
  components: {
    BlogDataList
  }
})
export default class search extends Vue{

  $loginStatus;$token;$isHoster;$err

  private dark_mode_style: object = null
  private icon_class: string = "el-icon-search"
  private searchKey: string = ""

  private blogData: Array<blogObject> = []

  private mounted(): void{
    if(this.$loginStatus && this.$token){
      tokenCheck({token:this.$token}).then(res => {
        if(res.data.code){this.$isHoster = true}
      })
    }
  }

  private doSearch(): boolean{
    let keyword = this.searchKey
    if(!keyword){alert("输入值不能为空");return false}
    this.icon_class = "el-icon-loading"
    searchBlog({keyword:keyword}).then(res => { 
      if(res.data.length == 0){alert("搜索结果为空")}
      else{this.blogData = res.data}
      this.icon_class = "el-icon-search"
    }).catch(err => {this.$err(err);this.icon_class = "el-icon-search"})
  }

  @Prop({type:Boolean,required:true}) darkMode!: boolean
  @Watch("darkMode",{immediate:true,deep:true})
  onDarkModeChange(oldVal:boolean,newVal:boolean): void{
    if(oldVal){
      this.dark_mode_style = {color:"#e4e4e4",backgroundColor:"#212127"}
    }else{
      this.dark_mode_style = null
    }
  }

}
</script>

<style lang="scss" scoped>
  #search-warp{
    width: 60%;
    min-width: 800px;
    margin: 0 auto;
  }
  .searchContaier{
    width: 70%;
    height: 50px;
    margin: 0 auto;
    background-color: white;
    display: flex;
    align-items: center;
    border-radius: 25px;
    padding: 0 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-top: 30px;
    color: #606266;
  }

  .search-input{
    width: 90%;
    height: 40px;
    display: inline-block;
    border: none;
    outline: none;
    padding-left: 20px;
    font-size: 1.7rem;
    background-color: inherit;
    color: inherit;
  }

  .searchIcon-warp{
    width: 10%;
    text-align: center;
    font-size: 2rem;
    i{
      cursor: pointer;
    }
    i:hover{
      color: #ffa8a8;
    }
  }

  .blogDataWarp{
    margin: 0 20px;
  }

  @media screen and (max-width: 800px) {
    #search-warp{
      width: 100%;
      min-width: initial;
    }
    .searchContaier{
      width:80%;
    }
  }
</style>