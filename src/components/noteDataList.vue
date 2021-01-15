<template>
  <div id="ls-NDL-warp">
    <div v-disappear = "isDisappear" class="ls-NDL-switch" :style="fontColor">
      <a @click="doSwitch(1)" :class="['ls-NDL-switchTips',switchType==1?'ls-switchChoosed':'']">Tips</a>
      <a @click="doSwitch(2)" :class="['ls-NDL-switchNote',switchType==2?'ls-switchChoosed':'']">Note</a>
    </div>
    <div ref="tips" class="ls-NDL-tipsContainer">
      <div class="ls-NDL-tips" :style="darkModeStyle" v-for="item in tipsData" :key="item.index">
        <div class="ls-NDL-tipsDate">{{item.tips_date}}<i class="el-icon-close"></i></div>
        <p class="ls-NDL-tipsInfo">{{item.tips_info}}</p>
        <div class="ls-NDL-label">Tips</div>
      </div>
    </div>
    <div ref="notes" class="ls-NDL-noteContainer">
      <div class="ls-NDL-note" :style="fontColor" v-for="item in noteData" :key="item.index">
        <div class="ls-NDL-noteTitle">{{item.note_title}}</div>
        <div class="ls-NDL-noteDate">
          <i class="el-icon-edit"></i> 
          <i class="el-icon-delete"></i>
          Update {{item.note_date}}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue,Component,Prop, Watch} from 'vue-property-decorator'
import {colorArr} from "../ulits/static-data"


@Component
export default class NoteDataList extends Vue{

  $refs;

  private darkModeStyle: string = null
  private fontColor: string = null
  private switchType: number = 1

  private tipsData = [
    {tips_date:"28  OCT  2020",tips_info:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil laborum corrupti mollitia praesentium quibusdam magnam quia iure consectetur, ipsa, alias deserunt distinctio. Iste quisquam autem iure cupiditate fugit eius nobis."},
    {tips_date:"28  FEB  2020",tips_info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam odit ex harum ullam incidunt ab eligendi at impedit itaque corrupti ut velit, magnam libero ad voluptate debitis. Rerum soluta fuga nostrum hic impedit sunt, delectus eos laudantium numquam. Officiis voluptatum exercitationem expedita unde qui consequuntur id animi nesciunt similique laudantium recusandae dicta placeat voluptates, deleniti deserunt sed eos odio adipisci dignissimos aspernatur ipsum? Ad doloremque excepturi optio incidunt eveniet, quam facilis animi modi iste suscipit soluta? Quibusdam excepturi, numquam molestiae provident sequi facilis ipsa reprehenderit velit expedita incidunt aliquid ab ipsum! Accusantium eos sunt distinctio quod ea ad temporibus sed."},
    {tips_date:"28  AUG  2020",tips_info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque at blanditiis tempora facere modi cum, eveniet error doloremque obcaecati qui est dolorem minus vel nam, quos, tenetur earum ipsum nobis? Natus vel delectus laboriosam tenetur. Cum, blanditiis nihil, a est cumque consequuntur praesentium at repellendus doloremque possimus similique eveniet aliquam eaque voluptates, repudiandae quos voluptas consectetur ullam voluptatum maxime ipsa?"}
  ]

  private noteData = [
    {note_title:"JavaScript高级程序设计(第四版)读书笔记",note_date:"15 JAN 2021"},
    {note_title:"JavaScript高级程序设计(第四版)读书笔记",note_date:"15 JAN 2021"},
    {note_title:"娱乐至死读书笔记",note_date:"15 JAN 2021"}
  ]

  private mounted(): void{
    this.darkModeStyle = "backgroundColor:" + this.changeColor()
  }

  private changeColor(): string{    
    return colorArr[Math.ceil(Math.random()*colorArr.length -1)]
  }

  private isDisappear(val): void{
    if(val){
      this.$refs.tips.style.display = "block";
      this.$refs.notes.style.display = "block"
    }else{
      this.$refs.tips.style.display = "block";
      this.$refs.notes.style.display = "none"
    }
  }

  private doSwitch(index: number): void{
    let tips  = this.$refs.tips
    let notes = this.$refs.notes
    if(this.switchType !== 1 && index == 1){
      console.log("111")
      this.switchType = index
      tips.style.display = "block";notes.style.display = "none"
    }else if(this.switchType !== 2 && index == 2){
      console.log("222")
      this.switchType = index
      tips.style.display = "none";notes.style.display = "block"
    }
  }

  @Prop({type:Boolean,required:true}) darkMode!:boolean
  @Watch("darkMode",{deep:true,immediate:true})
  onDarkModeChange(oldVal:boolean,newVal:boolean): void{
    if(oldVal){
      this.darkModeStyle = "backgroundColor:#192233"
      this.fontColor = "color:white"
    }else{
      this.darkModeStyle = "backgroundColor:" + this.changeColor()
      this.fontColor = null
    }    
    // console.log(this.darkModeStyle);
    
  }

}
</script>
<style lang="scss" scoped>
#ls-NDL-warp{
  width: 100%;
  color: white;
  font-size: 1rem;
  display: flex;
}
.ls-NDL-switch{
  display: none;
  text-align: center;
}
.ls-NDL-label{
  float: right;
  font-size: 1.2em;
  font-weight: bold;
}
.ls-NDL-tipsContainer{
  width: 70%;
  display: block ; 
  padding: 0 20px 0 0;
  .ls-NDL-tips{
    background-color: #ffbcbc;
    padding: 25px 30px;
    border-radius: 25px;
    margin-bottom: 20px;
    box-shadow: 0 3px 14px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .ls-NDL-tips:hover{
    box-shadow: 0 3px 14px 0 rgba(0, 0, 0, 0.2)
  }
  .ls-NDL-tipsDate{
    font-size: 1.8em;
    font-weight: bold;
    i{
      float: right;
      font-size: .8em;
    }
  }
  .ls-NDL-tipsInfo{
    font-weight: lighter;
    font-size: 1.7em;
    margin-top: 10px;
    margin-bottom: 5px;
    cursor: text;
  }
}
.ls-NDL-noteContainer{
  display: flex ;
  flex-direction: column;
  width: 30%;
  padding:  0 20px;
  color: rgb(99, 99, 99);
  border-left: 1px solid #808080;
  height: auto;
}
.ls-NDL-note{
  margin: 20px 0;
  box-sizing: content-box;
}

.ls-NDL-noteTitle{
  font-size: 1.8em;
  font-weight: bold;
  cursor: pointer;
}
.ls-NDL-noteTitle:hover,.ls-switchChoosed{
  color:#409EFF
}

.ls-NDL-noteDate{
  margin-top: 10px;
  font-size: 1.2em;
  text-align: right;
  i{
    float: left;
    margin: 0 20px 0 0;
  }
}

@media screen and (max-width: 800px) {
  #ls-NDL-warp{
    flex-direction: column;
    
  }
  .ls-NDL-switch{
    display: block;
    margin-bottom: 20px;
    font-size: 1.8em;
    font-weight: bold;
    color: rgb(99, 99, 99);
    a{
      margin: 0 40px;
      user-select: none;
    }
  }
  .ls-NDL-tipsContainer{
    width: 100%;
    display: block;
    padding: initial;
    .ls-NDL-tips{
      box-shadow: 0 3px 14px 0 rgba(0, 0, 0, 0.2)
    }
    .ls-NDL-tipsInfo{
      font-weight: normal;
    }
  }
  .ls-NDL-noteContainer{
    width: initial;
    display: none;
    padding: initial;
    border: none;
    margin: 0 20px;
    .ls-NDL-noteTitle{
      font-size: 2em;
      letter-spacing: 1px;
    }
    .ls-NDL-noteDate{
      font-size: 1.4em;
    }
  }
}
</style>