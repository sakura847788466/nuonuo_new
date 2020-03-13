<template>
  <div class="dealRecord-wrap"
       style="margin-top:55px;">
    <button @click="isActive=!isActive">点击我</button>
    <collapse-transition>
      <div class="collapse-wrap"
           v-show="isActive">
        <!-- @slot default -->
        <slot>三大大大大大大大</slot>
      </div>
    </collapse-transition>
  </div>
</template>
 
<script>
import collapseTransition from '../../plugins/plane.js'
export default {
  data () {
    return {
      isActive: true
    }
  },


  components: {
    collapseTransition
  },


}
</script>
<style >
</style>