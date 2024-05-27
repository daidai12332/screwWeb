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
  .header {
    width: 5%;
  }
  
  .content{
    width: 100%;
  }
}


</style>
