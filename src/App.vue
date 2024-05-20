<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <div class="headerAndContent">
    <div class="header">
      <Header />
    </div>
    
      <div class="content">
        
        <RouterView />
      </div>
  </div>

</template>

<style scoped lang="scss">
.headerAndContent{
  display: flex;
  // border: 1px solid black;
  .header {
    width: 10%;
    height: 100vh;
    // border: 1px solid black;
    
  }
  
  .content{
    width: 100%;
    height: 100vh;
    // border: 1px solid black;
    // text-align: center;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // flex-direction: column;
    
  }
}


</style>
