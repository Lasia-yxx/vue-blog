<template>
  <div id="ls-BDL-warp">
    <div v-for="item in blogData" :key="item.index" class="ls-BDL-container">
      <div class="ls-BDL-title">{{item.blog_title}}</div>
      <div class="ls-BDL-describle">{{item.blog_describle}}<a class="ls-BDL-arrow">>></a></div>
      <div class="ls-BDL-date">{{item.blog_date}}</div>
      <div class="ls-BDL-type"><i class="el-icon-link"></i>{{item.blog_type}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

interface blogObject{
  blog_title:string,
  blog_describle:string,
  blog_date:string,
  blog_type:string
}

@Component
export default class BlogDataList extends Vue{
  private blogData: Array<blogObject> = [
    {blog_title:"JavaScript基础算法：反转字符串",blog_describle:"mac上无论是npm、git都会需要用到终端操作，虽然坑多，但是总要去尝试。空中做了吧ac上无论是npm、git都会需要用到终端操作，虽然坑多，但是总要去尝试。空中做了吧",blog_date:"28 OCT 2016",blog_type:"工具"},
    {blog_title:"JavaScript基础算法：反转字符串",blog_describle:"mac上无论是npm、git都会需要用到终端操作，虽然坑多，但是总要去尝试。空中做了吧",blog_date:"28 OCT 2016",blog_type:"工具"},
    {blog_title:"JavaScript基础算法：反转字符串",blog_describle:"mac上无论是npm、git都会需要用到终端操作，虽然坑多，但是总要去尝试。空中做了吧",blog_date:"28 OCT 2016",blog_type:"工具"}
  ]
}
</script>
<style lang="scss" scoped>
  #ls-BDL-warp{
    width: 100%;
    // min-width: 800px;
    color: rgb(99, 99, 99);
    font-size: 1rem;
  }

  .ls-BDL-container{
    // background-color: white;
    margin: 20px 0;
    padding: 20px 0;
    letter-spacing: 1px;
    .ls-BDL-title{
      font-size: 2.5em;
      font-weight: bold;
      cursor: pointer;
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

  @media screen and (max-width: 800px) {
     #ls-BDL-warp{
      //  width: 90%;
      //  min-width: initial;
       font-size: 0.8rem;
     }
     .ls-BDL-container{
       margin: 10px 0 5px 0;
     }

     .ls-BDL-container > .ls-BDL-describle{
        margin-top: 10px;
        line-height: 20px;
        .ls-BDL-arrow{
          margin-left: 10px;
          line-height: 20px;
          font-size: 1em;

        }
      }
  }
</style>