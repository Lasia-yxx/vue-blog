<template>

    <UploadPhotography v-if="this.$writeWhat == 'photo' && this.$route.name == 'photo'" @isClose="doClose" />

</template>
<script lang="ts">
import {Vue,Component,Prop,Watch} from "vue-property-decorator"
import UploadPhotography from "../components/UploadPhotography.vue"

@Component({
  components:{
    UploadPhotography
  }
})
export default class photo extends Vue{

  $writeWhat;
      


  private doClose(value): void{
    this.$writeWhat = " "
  }

}
</script>