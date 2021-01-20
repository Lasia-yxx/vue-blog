<template>
  <div class="showDataWarp">
    <ShowData :html="html" :darkMode="this.$darkMode" />
  </div>
</template>
<script lang="ts">
import {Vue,Component} from "vue-property-decorator"
import ShowData from "../components/ShowData.vue"
import {getAbout} from "../api/api"

@Component({
  components:{
    ShowData
  }
})
export default class about extends Vue{

  $err

  private html: any = ""

  private mounted(): void {
    this.initData()
  }
  private initData(): void{
    getAbout().then(res => {
      this.html = res.data[0].html
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