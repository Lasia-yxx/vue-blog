<template>
  <div id="ls-AP-app" :style="style">
    <div class="ls-AP-user-info-warp">
      <img @click="about" :src="avatar" >
      <p class="ls-AP-motto">{{motto}}</p>
      <p class="ls-AP-nickName">{{name}}</p>
    </div>
    <div v-if="changeMyDataWarp" class="changeMyDataWarp">
      
      <div class="changeMyDataContainer">
        <div class="title"><i @click="doClose" class="el-icon-close" ></i></div>
        <div class="avatarWarp">
          <img @click="uploadPic" class="avatar" :src="avatar" />
        </div>
        <div class="inputWarp">
          <div class="ls-laberl">Motto</div>
          <input  v-model="motto" class="mottoInput" />
        </div>
        <div class="inputWarp">
          <div class="ls-laberl">Name</div>
          <input v-model="name" class="nameInput" />
        </div>
        <div class="submitWarp">
          <el-button class="submit" @click="submit" type="primary" round>Submit</el-button>
        </div>
      </div>
      <input ref="choosePic" @change="choosePic" type="file" accept="image/*" style="display:none" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component,Emit,Vue,Prop } from "vue-property-decorator";
import {gradientColor} from "../ulits/static-data"
import {getAbout} from "../api/api"
import {uploadAvatar} from "../api/pic"
import {updateMyData} from "../api/user"

@Component
export default class AuthorPost extends Vue{
  
  $router;$route;$refs;$token;$tokenReset;$err

  @Prop({type:Boolean,default:false}) isHoster!: boolean

  private avatar: string = "http://www.yxxlasia.fun:3000/static/images/static/avatar.jpg"
  private motto : string = "Life Is Strange"
  private name  : string = "Lasia"

  private changeMyDataWarp: boolean = false

  private style: string = ''
  private mounted(): void {
    let i :number = Number((Math.random()*gradientColor.length).toFixed())
    this.style = gradientColor[i]    
    this.initData()
  }

  private initData(): void{
    getAbout().then(res => {
      this.avatar = res.data[0].avatar
      this.motto = res.data[0].motto
      this.name = res.data[0].name
    })
  }

  private about(): void{
    if(this.isHoster){
      this.changeMyDataWarp = true
    }else{
      if(this.$route.name != "about"){this.$router.push({path:"/about"})}
    }
  }

  private doClose():void {
    this.changeMyDataWarp = false
    this.initData()
  }

  private uploadPic(): void{
    console.log("sss");
    
    this.$refs.choosePic.value = ""
    this.$refs.choosePic.click()
  }

  private choosePic(): boolean{
    let that = this
    let file = this.$refs.choosePic.files[0]
    if(file.size > 1024*1024*1){
      alert("图片太大了")
      return false
    }
    let data = new FormData()
    data.append("file",file)
    uploadAvatar(data).then(res => {
      if(res.status == 200){this.avatar = res.data}else{alert("Something Wrong")}      
    })
  }
  
  private submit():void {
    if(this.name.length < 3 || this.motto.length < 4 || this.avatar.length < 10){
      alert("输入条件不合法")
    }else{
      let data = {name:this.name,avatar:this.avatar,motto:this.motto,token:this.$token}
      updateMyData(data).then(res => {
        if(res.data){alert("提交成功");this.doClose();this.initData()}
        else(this.$tokenReset())
      }).catch(err => {this.$err(err)})
      
    }
  }

}
</script>

<style lang="scss" scoped>

#ls-AP-app{
  width: 100%;
  height: 50vh;
  background: linear-gradient(to right, #ffafbd, #ffc3a0);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ls-AP-user-info-warp{
  text-align: center;
  color: white;
  letter-spacing: 2px;
  user-select: none;
  .ls-AP-motto{
    margin: 15px 0 10px 0;
    font-size: 2.2rem;
    font-weight: normal;
  }
  .ls-AP-nickName{
    font-size: 2.2rem;
    font-weight: bold;
    letter-spacing: 1px;
  }
}

.title{
  font-size: 2.2rem;
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
.ls-AP-user-info-warp > img{
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 100%;
  border: 2px solid rgba(212, 212, 212, 0.1);
  box-shadow:  0 2px 12px 0 rgba(51, 51, 51, .4);
  cursor: pointer;
}

.changeMyDataWarp{
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999999999;
  background-color: rgba(1, 1, 1, 0.35);
}
.changeMyDataContainer{
  width: 30%;
  background-color: white;
  min-width: 500px;
  padding: 40px 30px;
  border-radius: 15px;
  color: rgb(99, 99, 99);
  display: flex;
  align-items: center;
  flex-direction: column;
}
.avatarWarp{
  width: 160px;
  height: 160px;
  overflow: hidden;
  border-radius: 100%;
  margin-bottom: 20px;
  img{
    height: 100%;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }
}
.inputWarp{
  user-select: none;
  margin-top: 25px;
  display: flex;
  width: 90%;
  flex-direction: row;
  align-items: center;
  .ls-laberl{
    font-size: 1.6rem;
    margin: 0 10px;
    font-weight: bold;
    letter-spacing: 1px;
    width: 15%;
    height: 30px;
    line-height: 30px;
  }
  .mottoInput,.nameInput{
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
.submitWarp{
  width: 100%;
  display: block;
  margin-top: 25px;
  .submit{
    width: 35%;
    display: block;
    margin: 0 auto;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
}

@media screen and (max-width: 800px){
  #ls-AP-app{
    height: 40vh;
  }
  .ls-AP-user-info-warp > img{
    width: 80px;
    height: 80px;
  }
  .changeMyDataContainer{
    width: 80%;
    margin-bottom: 80px;
    background-color: white;
    min-width: initial;
    padding: 20px 15px;
    border-radius: 15px;
  }

  .avatarWarp{
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
  }

  .inputWarp{
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
    .mottoInput,.nameInput{
      width: initial;
    }
  }
}

</style>