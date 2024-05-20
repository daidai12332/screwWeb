<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <div class = "header">
        
        <div class="logo" @click="()=>{this.$router.push('/')}">
            <p>logo</p>
        </div>
        
        <div class="home">
            <p>首頁</p>
        </div>

        <div class="machine">
            <p>機台</p>
        </div>

        <div class="order">
            <p>單號</p>
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
        height: 100vh;
        // border-top: 1px solid ;
        background: rgb(242, 242, 242);
        position: relative;
        // display: flex;
        // justify-content: space-between;

        .logo{
            width: 55%;
            height: 10%;
            border: 1px solid black;
            position: absolute;
            left: 20%;
            top: 6%;
            cursor: pointer;
        }

        .home{
            border: 1px solid black;
            width: 50%;
            height: 10%;
            position: absolute;
            left: 22%;
            top: 20%;
        }

        .machine{
            border: 1px solid black;
            width: 50%;
            height: 10%;
            position: absolute;
            left: 22%;
            top: 35%;
        }

        .order{
            border: 1px solid black;
            width: 50%;
            height: 10%;
            position: absolute;
            left: 22%;
            top: 50%;
        }

        .user{
            width: 50%;
            height: 10%;
            position: absolute;
            left: 30%;
            top: 65%;
            i {
                font-size: 45px;
                cursor: pointer;
            }
        }
    }
</style>