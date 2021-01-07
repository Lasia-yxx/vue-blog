<template>
  <div id="app">
    <AuthorPost />
    <NaviTopBar />
    <FunctionBall />
    <router-view />
    <div class="bottomBlank"></div>
  </div>
</template>

<script>
import AuthorPost from "@/components/authorPost.vue"
import NaviTopBar from "@/components/naviTopBar.vue"
import FunctionBall from "@/components/functionBall.vue"
export default {
  name:"app",
  components:{
    AuthorPost,
    NaviTopBar,
    FunctionBall
  },
  methods:{
    
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
}

.bottomBlank{
  width: 100%;
  height: 100px;
}
@media screen and (max-width: 800px) {
  html{
    font-size: 8px;
  }
}
</style>
