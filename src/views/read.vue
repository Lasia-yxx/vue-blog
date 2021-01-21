<template>
  <div class="showDataWarp">
    <!-- <mavon-editor :defaultOpen="preview" v-html="data" /> -->
    <ShowData :html="html" :darkMode="this.$darkMode" />
  </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'
import ShowData from "../components/ShowData.vue"
import {getBlogOrNotesDetail} from "../api/api"

@Component({
  components:{
    ShowData
  }
})
export default class read extends Vue{

  $route;$err

  private html: any = ""


  private mounted(): void{
    getBlogOrNotesDetail(this.$route.query).then(res => {
      if(this.$route.query.database == "note"){
        this.html = res.data[0].note_html
      }else{
        let title = "<div class='hljs-center'><h3><a id='_2'></a>"+res.data[0].blog_title+"</h3></div>"
        let info = "<div class='hljs-left'><h3><a id='_8'></a>前言</h3><p>"+res.data[0].blog_info+"</p></div>"
        this.html = title + info + res.data[0].blog_html
      }
    }).catch(err => {this.$err(err)})
  }
}
</script>
<style lang="scss" scoped>
.showDataWarp{
  width: 60%;
  min-width: 800px;
  margin: 0 auto;
  margin-top: 30px;
}
@media screen and(max-width: 800px) {
  .showDataWarp{
    width: 95%;
    min-width: initial;
    margin: 0 auto;
    margin-top: 30px;
  }
}
</style>