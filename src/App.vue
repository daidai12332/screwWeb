<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <div class="header">
    <Header />
  </div>
  <br>
    <div class="content">
      
      <RouterView />
    </div>

</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 10vh;
  // border: 1px solid black;
  
}

// .content{
//   width: 100%;
//   height: 100vh;
//   text-align: center;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
  
// }


</style>
