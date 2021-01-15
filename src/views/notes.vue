<template>

  <div class="notes-warp">
    <div class="notes-container">
      <NoteDataList :darkMode="this.$darkMode" />
    </div>
  </div>

</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'
import NoteDataList from "../components/noteDataList.vue"

@Component({
  components:{
    NoteDataList
  }
})
export default class notes extends Vue{
  
}
</script>

<style lang="scss" scoped>
.notes-warp{
  width: 60%;
  min-width: 800px;
  margin: 0 auto;
  margin-top: 20px;
}
@media screen and (max-width: 800px) {
  .notes-warp{
    width: 92%;
    min-width: initial;
  }
}
</style>