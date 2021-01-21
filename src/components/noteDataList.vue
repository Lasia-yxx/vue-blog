<template>
  <div id="ls-NDL-warp">
    <div v-disappear = "isDisappear" class="ls-NDL-switch" :style="fontColor">
      <a @click="doSwitch(1)" :class="['ls-NDL-switchTips',switchType==1?'ls-switchChoosed':'']">Tips</a>
      <a @click="doSwitch(2)" :class="['ls-NDL-switchNote',switchType==2?'ls-switchChoosed':'']">Note</a>
    </div>
    <div ref="tips" class="ls-NDL-tipsContainer">
      <div class="ls-NDL-tips" :style="darkModeStyle" v-for="item in tipsData" :key="item.index">
        <div class="ls-NDL-tipsDate">{{item.tips_date}}<i v-if="isHoster" @click="delTips" :data-id="item.id" class="el-icon-close"></i></div>
        <p class="ls-NDL-tipsInfo">{{item.tips_info}}</p>
        <div class="ls-NDL-label">Tips</div>
      </div>
      <PagesIndex style="margin-top:40px" :pagesNum="pagesTipsNum" @pageChange="pageChange" />
    </div>
    <div ref="notes" class="ls-NDL-noteContainer">
      <div class="ls-NDL-note" :style="fontColor" v-for="item in noteData" :key="item.index">
        <div @click="getNoteDetail" :data-id="item.id" class="ls-NDL-noteTitle">{{item.note_title}}</div>
        <div class="ls-NDL-noteDate">
          <i v-if="isHoster" @click="editNote" :data-id="item.id" class="el-icon-edit"></i> 
          <i v-if="isHoster" @click="delNote" :data-id="item.id" class="el-icon-delete"></i>
          Last Update {{item.last_date}}
        </div>
      </div>
      <div v-if="pagesNoteNum !== 1" class="ls-NDL-notePages" >
        <button @click="pagesReduce" :class="currentNotePage == 1?'disable':'nodisable'" :disabled="currentNotePage <= 1"><i class="el-icon-arrow-left"></i></button>
        <input v-model="currentNotePage" :title="'共有' + pagesTipsNum + '页'" @blur="inputPages" @keyup.enter="inputPages" />
        <button @click="pagesAdd" :class="currentNotePage == pagesNoteNum?'disable':'nodisable'" :disabled="currentNotePage >= pagesNoteNum"><i class="el-icon-arrow-right"></i></button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import PagesIndex from "../components/Pages.vue"
import {Vue,Component,Prop, Watch} from 'vue-property-decorator'
import {colorArr} from "../ulits/static-data"
import {getTips,getNote,getDataLength} from "../api/api"
import {delData} from "../api/user"

@Component({
  components:{
    PagesIndex
  }
})
export default class NoteDataList extends Vue{

  $refs;$err;$darkMode;$token;$tokenReset;$router

  private darkModeStyle: string = null
  private fontColor: string = null
  private switchType: number = 1

  private pagesTipsNum: number = 10
  private pagesNoteNum: number = 1
  private currentTipsPage: number = 1
  private currentNotePage: number = 1

  private tipsData = []

  private noteData = []

  private mounted(): void{
    if(!this.$darkMode){this.darkModeStyle = "backgroundColor:" + this.changeColor()}
    getDataLength({database:"tips"}).then(res =>{
      this.pagesTipsNum = Math.ceil(res.data[0]["count(*)"] / 8) * 10     
    }).catch(err => {this.$err(err)})
    getDataLength({database:"note"}).then(res =>{
      this.pagesNoteNum = Math.ceil(res.data[0]["count(*)"] / 10)    
    }).catch(err => {this.$err(err)})

    this.getTipsData()
    this.getNoteData()
  }

  private getTipsData(): void{
    getTips({pages:this.currentTipsPage}).then(res => {
      this.tipsData = res.data
    }).catch(err => {this.$err(err)})
  }
  private getNoteData(): void{
    getNote({pages:this.currentNotePage}).then(res => {
      this.noteData = res.data
    }).catch(err => {this.$err(err)})
  }

  private inputPages(): void{
    if(this.currentNotePage >= 1 && this.currentNotePage <= this.pagesNoteNum){
      this.getNoteData()
    }else{
      this.currentNotePage = 1
      alert("最多只有"+ this.pagesNoteNum + "页，只能输入中文")
    }
  }

  private pageChange(val): void{
    this.currentTipsPage = val
    this.getTipsData()
  }

  private pagesReduce(): void{
    if(this.currentNotePage > 1){
      this.currentNotePage = this.currentNotePage - 1
      this.getNoteData()
    }else{
      this.currentNotePage = 1
    }
  }

  private pagesAdd(): void{
    if(this.currentNotePage < this.pagesNoteNum){
      this.currentNotePage = this.currentNotePage + 1
      this.getNoteData()
    }else{
      this.currentNotePage = this.pagesNoteNum
    }
  }

  private delTips(e): void{
    let data = {id:e.srcElement.dataset.id,token:this.$token,database:"tips"}
    delData(data).then(res => {
      if(res.data){alert("删除成功");this.getTipsData()}
      else{this.$tokenReset()}
    }).catch(err => {this.$err(err)})
  }

  private getNoteDetail(e): void{
    let data = {id:e.srcElement.dataset.id,database:"note"}
    this.$router.push({path:"/read",query:data})
  }

  private delNote(e): void{
    let data = {id:e.srcElement.dataset.id,token:this.$token,database:"note"}
    delData(data).then(res => {
      if(res.data){alert("删除成功");this.getNoteData()}
      else{this.$tokenReset()}
    }).catch(err => {this.$err(err)})
  }

  private editNote(e): void{
    this.$router.push({name:"editor",query:{type:"note",isEditor:1,id:e.srcElement.dataset.id}})
  }


  private changeColor(): string{    
    return colorArr[Math.ceil(Math.random()*colorArr.length -1)]
  }

  private isDisappear(val): void{
    if(val){
      this.$refs.tips.style.display = "block";
      this.$refs.notes.style.display = "block"
    }else{
      this.doSwitch(this.switchType)
    }
  }

  private doSwitch(index: number): void{
    let tips  = this.$refs.tips
    let notes = this.$refs.notes
    if(index == 1){
      this.switchType = index
      tips.style.display = "block";notes.style.display = "none"
    }else if(index == 2){
      this.switchType = index
      tips.style.display = "none";notes.style.display = "block"
    }
  }

  @Prop({type:Boolean,default:false}) isHoster!:boolean

  @Prop({type:Boolean,required:true}) isUpload!:boolean
  @Watch("isUpload",{immediate:false})
  onRefrashData(){
    this.getTipsData()
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
    i:hover{
      // color: #409EFF;
      font-weight: bolder;
      transform: rotate(180deg);
      transition: transform .4s linear ;
      // transition: opacity .8s ease-in-out;
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
  margin: 20px 0 40px 0;
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
    cursor: pointer;
  }
  i:hover{
    color:#409EFF;
  }
}

.ls-NDL-notePages{
  text-align: center;
  button{
    width: 35px;
    height: 35px;
    display: inline-block;
    margin: 0 15px;
    border: none;
    outline: none;
    
    color: white;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  input{
    width: 35px;
    height: 35px;
    border-radius: 10px;
    border: none;
    outline: none;
    display: inline-block;
    text-align: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}

.disable{
  cursor: not-allowed;
  background-color: #b7b7b7;
}
.nodisable{
  cursor: pointer;
  background-color: #409EFF;
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
  .ls-NDL-notePages{
    button,input{
      width: 30px;
      height: 30px;
      border-radius: 10px;
    }
  }
}
</style>