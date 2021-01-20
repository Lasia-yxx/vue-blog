<template>
  <div class="editor_warp">
    <!-- <mavon-editor ref=md 
      @imgAdd="$imgAdd" 
      @imgDel="$imgDel" 
      @save="$save"
      v-model="value" 
      class="editor"></mavon-editor> -->
      <mavon-editor 
        ref="md"
        v-model="value"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        @save = "$save"
        class="editor"></mavon-editor>

        <div v-if="inLastMove" @click="cancleLastMove" class="lastMove">
          <div v-if="isBlog" class="lastMoveContainer" @click.stop>
            <div class="title">最后一步</div>
            <div class="inputWarp">
              <a class="label">博客标题</a>
              <input v-model="title" class="titleInput" />
            </div>
            <div class="inputWarp">
              <a class="label">博客简介</a>
              <textarea v-model="info" class="infoInput"></textarea>
            </div>
            <div class="inputWarp">
              <a class="label">博客Tag</a>
              <input v-model="type" class="tagInput" />
            </div>
            <div class="submitWarp">
              <el-button class="submit" @click="submit" type="success" icon="el-icon-check" circle></el-button>
            </div>
          </div>
          <div v-else class="lastMoveContainer" @click.stop>
            <div class="title">最后一步</div>
            <div class="inputWarp">
              <a class="label">博客标题</a>
              <input v-model="title" class="titleInput" />
            </div>
            <div class="submitWarp">
              <el-button class="submit" @click="submit" type="success" icon="el-icon-check" circle></el-button>
            </div>
          </div>
        </div>
  </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'
import {tokenCheck,uploadBlog,uploadNote,updateBlog,updateNote,updateAbout} from "../api/user"
import {uploadBlogPic,delPic} from "../api/pic"
import {getBlogOrNotesDetail} from "../api/api"
import tool from "../ulits/tools"

@Component
export default class editor extends Vue{

  $token;$loginStatus;$isHoster;$refs;$err;$route;$router

  private inLastMove: boolean = false

  private value: any = null
  private title: string = ""
  private info : string = ""
  private html : any    = null
  private md   : any    = null
  private id   : number = null
  private type : string = ""

  private isBlog: boolean =  true
  
  private mounted(): void{
    let optios = this.$route.query
    this.tokenCheck()
    if(Number(optios.isEditor)){this.initEditData(Number(optios.id),optios.type)}
    if(optios.type == "blog"){this.isBlog = true}else if(optios.type == "note"){this.isBlog = false}else{this.inLastMove = false}
  }
  

  private initEditData(id:number,database:string): void{
    getBlogOrNotesDetail({id:id,database:database}).then(res => {
      if(database == "blog"){
        this.id = res.data[0].id
        this.value = res.data[0].blog_md
        this.title = res.data[0].blog_title
        this.info = res.data[0].blog_info
        this.type = res.data[0].blog_type
      }else if(database == "note"){
        this.id = res.data[0].id
        this.value = res.data[0].note_md
        this.title = res.data[0].note_title
      }else{
        this.value = res.data[0].md
      }
      
    })
  }

  private tokenCheck(): void{
    if(this.$token || this.$loginStatus){
      tokenCheck({token:this.$token}).then(res => {
        if(res.data.code){this.$isHoster = true;}else{Vue.prototype.$tokenReset()}
      }).catch(err =>{Vue.prototype.$tokenReset()})
    }
  }

  private $imgAdd(pos, $file): void{
    var formdata = new FormData();
    formdata.append('image',$file);
    uploadBlogPic(formdata).then(res => {
      this.$refs.md.$img2Url(pos,res.data)
    }).catch(err => {this.$err(err)})
  }

  private $imgDel($filename): void{
    console.log($filename[0].split("/")[6])
    delPic({type:"blog",filename:$filename[0].split("/")[6]}).then(res => {
      alert(res.data)
    }).catch(err => {this.$err(err)})
  }

  private $save($value,$render): void{
    this.html = $render
    this.md   = $value
    if(this.$route.query.type != "lasia"){
      this.inLastMove = true
    }else{
      let data = {token:this.$token,html:this.html,md:this.md}
      updateAbout(data).then(res => {
        if(res.data){alert("上传成功");this.$router.push({path:"/about"})}
        else{Vue.prototype.$tokenReset()}
      }).catch(err => {this.$err(err)})
    }
  }

  private uploadData(){
    let check = Number(this.$route.query.isEditor)
    let data = this.splicingData()
    if(Boolean(check)){
      if(this.$route.query.type == "blog"){
        updateBlog(data).then(res => {
          if(res.data){alert("上传成功");this.$router.push({path:"/index"})}
          else{Vue.prototype.$tokenReset()}
        }).catch(err => {this.$err(err)})
      }else{
        updateNote(data).then(res => {
          if(res.data){alert("上传成功");this.$router.push({path:"/notes"})}
          else{Vue.prototype.$tokenReset()}
        }).catch(err => {this.$err(err)})
      }
    }else{
      if(this.$route.query.type == "blog"){        
        uploadBlog(data).then(res => {
          if(res.data){alert("上传成功");this.$router.push({path:"/index"})}
          else{Vue.prototype.$tokenReset()}
        }).catch(err => {this.$err(err)})
      }else{
        uploadNote(data).then(res => {
          if(res.data){alert("上传成功");this.$router.push({path:"/notes"})}
          else{Vue.prototype.$tokenReset()}
        }).catch(err => {this.$err(err)})
      }
    }
  }

  private splicingData(): object{
    let data = {
      title : this.title,
      date  : tool.$getCurrentDate(),
      info  : this.info,
      html  : this.html,
      md    : this.md,
      id    : this.id,
      token : this.$token,
      type  : this.type
    }
    return data
  }


  private cancleLastMove(): void{
    this.inLastMove = false
  }

  private submit(): void{
    if(this.isBlog){
      if(this.title == "" || this.info=="" || this.type=="" || this.title.length<4 || this.info.length<4 || this.type.length < 2){
        alert("请填写标题，简介和标签")
      }else{
        this.uploadData()
        this.cancleLastMove()
      }
    }else{
      if(this.title == "" || this.title.length<4){
        alert("请填写标题")
      }else{
        this.uploadData()
        this.cancleLastMove()
      }
    }
  }


}
</script>
<style scoped>
  .editor_warp{
    width: 100%;
    height: 100vh;
  }
  .editor{
    height: 100%;
  }
  .lastMove{
    position: fixed;
    z-index: 9999999999;
    width: 100%;
    height: 100vh;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,.5);
  }
  .lastMoveContainer{
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
  .title{
    font-size: 2.2rem;
    margin-bottom: 15px;
    font-weight: bold;
    width: 100%;
  }
  .inputWarp{
    user-select: none;
    margin-top: 25px;
    display: flex;
    width: 90%;
    flex-direction: row;
    align-items: center;
  }
  .label{
    font-size: 1.6rem;
    margin: 0 10px;
    font-weight: bold;
    letter-spacing: 1px;
    width: 15%;
    height: 30px;
    line-height: 30px;
  }
  .titleInput,.infoInput,.tagInput{
    outline:none;
    width: 80%;
    height: 30px;
    border: 1px solid #b9bbc0;
    padding: 2px 10px;
    border-radius: 4px;
    font-size: 1.6rem;
    color: rgb(99, 99, 99);
  }
  .submitWarp{width: 90%;margin-top: 25px;}
  .submit{
    display: block;
    float: right;
  }

  @media screen and (max-width: 800px) {
    .lastMoveContainer{
      width: 80%;
      min-width: initial;
      padding: 20px 15px;
      border-radius: 15px;
    }
    .inputWarp{
      flex-direction: column;
      align-items: initial;
      margin-top: 15px;
    }
    .label{
      font-size: 1.6rem;
      margin: 0 0 5px 0;
      font-weight: bold;
      letter-spacing: 1px;
      width: initial;
      height: initial;
      line-height: initial;
    }
    .titleInput,.infoInput,.tagInput{
      width: initial;
    }
  }
</style>