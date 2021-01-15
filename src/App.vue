<template>
  <div id="app">
    <AuthorPost />
    <NaviTopBar />
    <FunctionBall @darkMode="darkMode" @login="login"/>

    <router-view :darkMode="this.$darkMode" />

    <div class="bottomBlank"></div>
    <div v-if="isLogin" @click="cancleLogin" class="login-warp">
      <div class="login-container" @click.stop>
        <div class="label">登录</div>
        <div class="input">
          <input v-model="pwd" class="login-pwd" @keyup.enter="doLogin" type="password" />
          <div class="login-icon-warp"><i @click="doLogin" :class="searchIcon"></i></div>
        </div>
        <button class="loginBtn" @click="doLogin">Sign In</button>
      </div>
    </div>
  </div>
</template>

<script>
import AuthorPost from "@/components/authorPost.vue"
import NaviTopBar from "@/components/naviTopBar.vue"
import FunctionBall from "@/components/functionBall.vue"
import {loginCheck} from "@/api/user"

export default {
  name:"app",
  components:{
    AuthorPost,
    NaviTopBar,
    FunctionBall
  },
  data(){
    return {
      isLogin:false,
      pwd:"",
      searchIcon:"el-icon-finished"
    }
  },
  methods:{
    darkMode(param){
      if(param){
        document.getElementsByTagName("html")[0].style.backgroundColor = "#06090f"
      }else{
        document.getElementsByTagName("html")[0].style.backgroundColor = "#f5f5f5"
      }
    },
    login(param){if(this.$loginStatus){this.doLogin()}else{this.isLogin = param}},
    cancleLogin(){this.isLogin = false},
    doLogin(){
      if(!this.$loginStatus){
        this.searchIcon = "el-icon-loading"
        let data = {password:this.$md5(this.pwd)}
        loginCheck(data).then(res => {
          if(res.data.code){
            this.$loginStatus=true
            this.$token = res.data.token
            this.$cookies.set("token",res.data.token,"2d")
            this.$router.push({path:"/hoster"})
            this.isLogin = false
          }else{this.$loginStatus=false;alert("Something Wrong,检查密码是否正确")}
          this.searchIcon = "el-icon-finished"
        }).catch(err => {this.$err(err)})
      }else{
        this.isLogin = false
        if(this.$route.name !== 'hoster'){this.$router.push({path:"/hoster"})}
      }
    }
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
}
html{
  font-size: 10px;
  background-color: #f5f5f5;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
}

.bottomBlank{
  width: 100%;
  height: 100px;
}

.login-warp{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,.5);
  position: fixed;
  top: 0;
}
.login-container{
  width: 30%;
  min-width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 30px;
  color: #606266;
}
.label{
  font-size: 1.6rem;
  margin-bottom: 10px;
  margin-left: 10px;
  font-weight: bold;
  letter-spacing: 3px;
}
.input{
  height: 40px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #cccfd4;
}
.login-pwd{
  width: 90%;
  font-size: 1.6rem;
  outline: none;
  border: none;
}
.login-icon-warp{
  width: 10%;
  text-align: center;
  font-size: 1.6rem;
  i{
    cursor: pointer;
  }
  i:hover{
    color:#ffa8a8
  }
}
.loginBtn{
  display: none;
}

@media screen and (max-width: 800px) {
  html{
    font-size: 8px;
  }
  .login-container{
    width: 80%;
    min-width: initial;
    i{
      display: none;
    }
  }
  .loginBtn{
    display: block;
    margin: 0 auto;
    margin-top: 20px;
    border: none;
    background-color: rgb(250, 121, 121);
    color: white;
    font-size: 1.6rem;
    padding: 12px 40px;
    border-radius: 20px;
    outline: none;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
}
</style>
