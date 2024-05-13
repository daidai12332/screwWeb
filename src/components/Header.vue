<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <div class = "header">
        
        <div class="logo" @click="()=>{this.$router.push('/')}">
            
        </div>
        
        <div class="user">
            <i class="fa-solid fa-user" @click="()=>{this.$router.push('/Login')}"></i>
        </div>


    </div>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
    components:{
        RouterLink,
        RouterView,
    },
    
}
</script>
<style lang="scss" scoped>
    .header{
        width: 100%;
        height: 13vh;
        // border-top: 1px solid ;
        background: rgb(242, 242, 242);
        display: flex;
        justify-content: space-between;

        .logo{
            width: 5%;
            height: 70%;
            border: 1px solid black;
            margin-left: 7%;
            margin-top: 0.8%;
            cursor: pointer;
        }

        .user{
            margin-right: 5%;
            margin-top: 2.2%;
            i {
                font-size: 45px;
                cursor: pointer;
            }
        }
    }
</style>