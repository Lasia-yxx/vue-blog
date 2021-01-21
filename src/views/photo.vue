<template>
  <div class="photoWarp">
    <div class="picContainer">
      <div class="photoContainer" v-for="item in photographyData" :key="item.index">
        <div style="position: relative;">
          <img class="photo" :src="item.url" /> 
          <div class="cover">
            <div class="photoTime">{{item.shot_time}}
              <i v-if="isHoster" @click="delPohtography" :data-id="item.id" :data-url="item.url" class="el-icon-close"></i>
            </div>
            <div class="photoPosi">{{item.shot_posi}}</div>
            <div class="photoTitle">{{item.shot_title}}</div>
          </div>
        </div>
      </div>
    </div>
    <PagesIndex :pagesNum="pagesNum" @pageChange="pageChange" />
    <UploadPhotography @uploadSuccess="isSuccess" v-if="this.$writeWhat == 'photo' && this.$route.name == 'photo'" @isClose="doClose" />

  </div>

</template>
<script lang="ts">
import {Vue,Component,Prop,Watch} from "vue-property-decorator"
import UploadPhotography from "../components/UploadPhotography.vue"
import PagesIndex from "../components/Pages.vue"
import {getDataLength,getPhotography} from "../api/api"
import {delData} from "../api/user"
import {delPic} from "../api/pic"

@Component({
  components:{
    UploadPhotography,
    PagesIndex
  }
})
export default class photo extends Vue{

  $writeWhat;$err;$token;$tokenReset
      
  private pagesNum: number = 1000
  private currentPage: number = 1
  private photographyData: any = null
  private isHoster = Vue.prototype.$isHoster


  private mounted():void {
    getDataLength({database:"photography"}).then(res =>{      
      this.pagesNum = Math.ceil(res.data[0]["count(*)"]/6) * 10      
    }).catch(err => {this.$err(err)})

    this.getData()
    
  }

  private pageChange(val): void{
    this.currentPage = val
    this.getData()
  }

  private getData(): void{
    getPhotography({page:this.currentPage}).then(res =>{         
      if(res.status == 200){this.photographyData = res.data}else{alert("Something Wrong")}
    }).catch(err => {this.$err(err)})
  }

  private doClose(value): void{
    this.$writeWhat = " "
  }

  private delPohtography(e): void{
    let all = e.srcElement.dataset
    let data1 = {id:all.id,database:"photography",token:this.$token}
    let data2 = {filename:all.url.split("/").pop(),type:"photo"}
    delData(data1).then(res => {
      if(res.data){alert("删除成功");this.getData();delPic(data2)}
      else{this.$tokenReset()}
    }).catch(err => {this.$err(err)})
  }

  private isSuccess(val): void{
    this.getData()
  }

}
</script>
<style lang="scss" scoped>
  .photoWarp{
    width: 100%;
  }
  .picContainer{
    width: 50%;
    min-width: 800px;
    margin: 0 auto;
    display: flex;  
    flex-direction: column;
    align-items: center;

  }
  .photoContainer{
    background-color: rgba(208,208,208,.2);
    margin: 20px auto;
    padding: 10px 10px;
    border-radius: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    user-select: none;
  }
  .photo{
    max-width: 100%;
    max-height: 690px;
    border-radius: 10px;
    object-fit: contain;
  }
  .cover{
    width: 100%;
    height: 100%;
    background-color: initial;
    position: absolute;
    z-index: 1;
    top:0;
    border-radius: 10px;
    transition: .6s background-color linear;
    color: white;
    .photoTime,.photoPosi,.photoTitle{
      opacity: 0;
      transition: .6s opacity linear;
    }
  }
  .cover:hover{
    background-color: rgba(0, 0, 0, 0.4);
    .photoTime,.photoPosi,.photoTitle{
      opacity: 1;
    }
  }
  .photoTime{
    font-size: 3rem;
    margin: 15px;
    i{
      display: block;
      float: right;
      font-size: 1.6rem;
      cursor: pointer;
    }
    i:hover{
      font-weight: bolder;
      transform: rotate(180deg);
      transition: transform .4s linear ;
    }
  }
  .photoPosi{
    font-size: 1.8rem;
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
  .photoTitle{
    font-size: 2.4rem;
    margin: 15px;
  }
  @media screen and (max-width: 800px) {
    .picContainer{
      width: 95%;
      min-width: initial;
    }
    .photoContainer{
      margin: 10px auto;
    }
    .photoTime{
      margin: 10px 0 5px 10px;
    }
    .photoTitle{
      margin: 0 0px 0 10px;
    }
  }
</style>