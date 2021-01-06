<template>
  <div><AuthorPost /></div>
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AuthorPost from "../components/authorPost.vue"

@Component({
  components: {
    AuthorPost
  }
})
export default class index extends Vue{
  private name :string = "ubdedaw"
}
</script>