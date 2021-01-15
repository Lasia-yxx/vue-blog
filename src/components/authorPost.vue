<template>
  <div id="ls-AP-app" :style="style">
    <div class="ls-AP-user-info-warp">
      <img @click="about" src="http://www.yxxlasia.fun:3000/static/images/avatar/avatar.jpg" >
      <p class="ls-AP-motto">Life Is Strange</p>
      <p class="ls-AP-nickName">花落柳下</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component,Emit,Vue } from "vue-property-decorator";
import {gradientColor} from "../ulits/static-data"

@Component
export default class AuthorPost extends Vue{
  
  $router;

  private style: string = ''
  private mounted(): void {
    let i :number = Number((Math.random()*gradientColor.length).toFixed())
    this.style = gradientColor[i]    
  }

  private about(): void{
    this.$router.push({path:"/about"})
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
    margin: 10px 0 5px 0;
    font-size: 2.2rem;
    font-weight: bold;
  }
  .ls-AP-nickName{
    font-size: 1.8rem;
  }
}
.ls-AP-user-info-warp > img{
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 100%;
  box-shadow:  0 2px 12px 0 rgba(51, 51, 51, .4);
  cursor: pointer;
}

@media screen and (max-width: 800px){
  #ls-AP-app{
    height: 40vh;
  }
  .ls-AP-user-info-warp > img{
    width: 80px;
    height: 80px;
  }
}

</style>