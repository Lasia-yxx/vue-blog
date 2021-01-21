<template>
  <div id="ls-UPG-warp">
    <div class="ls-upload-warp">
      <div class="ls-UPG-title">摄影作品<i class="el-icon-close" @click="doClose"></i></div>
      <div class="ls-UPG-container">
        <div class="ls-laberl">拍摄时间</div>
        <input v-model="shotTime" placeholder="格式如2021-01-18" class="ls-UPG-shotTime" />
      </div>
      <div class="ls-UPG-container">
        <div class="ls-laberl">拍摄地点</div>
        <input v-model="shotPosi" class="ls-UPG-shotPosi" />
      </div>
      <div class="ls-UPG-container">
        <div class="ls-laberl">照片标题</div>
        <input v-model="shotTitle" class="ls-UPG-shotTitle" />
      </div>
      <div class="ls-UPG-Btncontainer">
        <div class="ls-laberl_blank"></div>
        <el-button :disabled="Boolean(filename)" size="small" @click="uploadPic" type="primary" class="ls-UPG-insert">上传图片</el-button>
        <el-button :disabled="!Boolean(filename)" size="small" @click="deletePic()" type="danger" class="ls-UPG-delete">删除图片</el-button>
        <p>{{filename}}</p>
      </div>
      <div class="ls-UPG-submitContainer">
        <el-button class="ls-UPG-submit" @click="submit" type="success" icon="el-icon-check" circle></el-button>
      </div>
    </div>
    
    <input ref="choosePic" @change="choosePic" type="file" accept="image/*" style="display:none" />
  </div>
</template>
<script lang="ts">
import {Vue,Component,Watch, Emit} from 'vue-property-decorator'
import {uploadPhotography,delPic} from "../api/pic"
import {uploadPhotographyPost} from "../api/user"

@Component
export default class UploadPhotography extends Vue{

  $refs;$err;$tokenReset;$token

  private isDel: boolean = true

  private shotTime: string = null
  private shotPosi: string = null
  private shotTitle: string = null
  private filename: string = null
  private imgWidth: number = null
  private isClose: boolean = false
  @Watch("isClose",{immediate:false})
  listenClose(): void{
    this.doClose()
  }

  @Emit("isClose")
  private doClose(): boolean{    
    if(this.filename && this.isDel){this.deletePic()}
    return this.isClose
  }

  private beforeDestory(): void{
    if(this.filename){this.deletePic()}
    this.isClose = false
  }

  private uploadPic(): void{
    this.$refs.choosePic.value = ""
    this.$refs.choosePic.click()
  }

  private choosePic(): boolean{
    let that = this
    let file = this.$refs.choosePic.files[0]
    let url = window.URL || window.webkitURL;
    let img = new Image()
    img.src = url.createObjectURL(file)
    img.onload = function(){
      that.imgWidth = img.width
      console.log(that.imgWidth)
    }
    if(file.size > 1024*1024*3.5){
      alert("图片太大了")
      return false
    }
    let data = new FormData()
    data.append("file",file)
    uploadPhotography(data).then(res => {
      if(res.status == 200){this.filename = res.data.filename}else{alert("Something Wrong")}      
    })
  }

  private deletePic(): void{
    let data = {filename:this.filename,type:"photo"}
    delPic(data).then(res => {
      alert(res.data)
      this.filename = null
    }).catch(err => {this.$err(err)})
  } 

  @Emit("uploadSuccess")
  uploadSucc(){
    return true
  }

  private submit(): void{ 
    if(!this.shotTime || !this.shotPosi || !this.filename){
      alert("提交前需要填写时间，地点，和上传图片")
    }else{
      let data = {
        shotTime:this.shotTime,
        shotPosi:this.shotPosi,
        shotTitle:this.shotTitle,
        imgWidth:this.imgWidth,
        filename:this.filename,
        token:this.$token
      }
      uploadPhotographyPost(data).then(res => {
        if(res.data){alert("上传成功");this.isDel = false;this.uploadSucc();this.doClose()}else{this.$tokenReset()}
      }).catch(err => {this.$err(err)})
    }
  }

}
</script>
<style lang="scss" scoped>
  #ls-UPG-warp{
    width:100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(1, 1, 1, 0.35);
    position: fixed;
    top: 0;
    z-index: 9999999999;
  }
  .ls-upload-warp{
    width: 40%;
    background-color: white;
    min-width: 600px;
    padding: 40px 30px;
    border-radius: 15px;
    color: rgb(99, 99, 99);
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .ls-UPG-title{
    font-size: 2.2rem;
    margin-bottom: 15px;
    font-weight: bold;
    width: 100%;
    i{
      float: right;
      display: block;
      font-size: 1.6rem;
      cursor: pointer;
    }
    i:hover{
      color: #ffa8a8;
    }
  }
  .ls-UPG-container,.ls-UPG-Btncontainer{
    user-select: none;
    margin-top: 25px;
    display: flex;
    width: 90%;
    flex-direction: row;
    align-items: center;
    .ls-laberl,.laberl_blank{
      font-size: 1.6rem;
      margin: 0 10px;
      font-weight: bold;
      letter-spacing: 1px;
      width: 15%;
      height: 30px;
      line-height: 30px;
    }
    p{
      font-size: 1.4rem;
      margin-left: 10px;
    }
    .ls-UPG-shotTime,.ls-UPG-shotPosi,.ls-UPG-shotTitle{
      outline:none;
      width: 80%;
      height: 30px;
      border: 1px solid #b9bbc0;
      padding: 2px 10px;
      border-radius: 4px;
      font-size: 1.6rem;
      color: rgb(99, 99, 99);
    }
    
  }
  .ls-UPG-submitContainer{
    width: 90%;
    .ls-UPG-submit{
      display: block;
      float: right;
    }
  }

  @media screen and(max-width: 800px) {
    .ls-upload-warp{
      width: 80%;
      background-color: white;
      min-width: initial;
      padding: 20px 15px;
      border-radius: 15px;
    }
    .ls-UPG-container{
      flex-direction: column;
      align-items: initial;
      margin-top: 5px;
      .ls-laberl{
        font-size: 1.6rem;
        margin: initial;
        font-weight: bold;
        letter-spacing: 1px;
        width: initial;
        height: 30px;
        line-height: 30px;
      }
      .ls-UPG-shotTime,.ls-UPG-shotPosi,.ls-UPG-shotTitle{
        width: initial;
      }
      .ls-UPG-Btncontainer{
        margin-top: 10px;
        .ls-laberl_blank{display: none}
        p{
          overflow: hidden;
        }
      }
    }
  }
</style>