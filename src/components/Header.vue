<script>
import { RouterLink, RouterView } from 'vue-router'
import { useShowStore } from '../stores/show'

export default {
    data(){
        return {
            mode:0,
        }
    },
    components:{
        RouterLink,
        RouterView,
    },
    mounted() {
        const showService = useShowStore();
        this.mode = showService.mode;
        console.log(this.mode);
    },

}
</script>


<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <div class = "header">
        <div class="logo" @click="()=>{this.$router.push('/')}">
            Logo
        </div>
        
        <div class="home" :class="{now:this.mode===0}" @click="()=>{this.$router.push('/')}">
            <i class="fa-solid fa-house"></i>
        </div>

        <div class="machine" :class="{now:this.mode===1}">
            <i class="fa-solid fa-database" @click="()=>{this.$router.push('/MachineStatus')}"></i>
        </div>

        <div class="order" :class="{now:this.mode===2}">
            <i class="fa-solid fa-clipboard-list" @click="()=>{this.$router.push('/Login')}"></i>
        </div>

        <div class="user" :class="{now:this.mode===3}">
            <i class="fa-solid fa-user" @click="()=>{this.$router.push('/Login')}"></i>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .header{
        width: 100%;
        height: 100vh;
        border-right: 1px solid #D4D4D1;
        padding-top: 2vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        div{
            cursor: pointer;
            i {
                font-size: 1.8vw;
                margin-bottom: 2vw;
                color: #5E5E5E;
                &:hover{
                    color: #3d3d3d;
                }
            }
        }
        .logo{
            width: 3vw;
            height: 3vw;
            background-color: #5E5E5E;
            color: white;
            border-radius: 50%;
            cursor: pointer;
            text-align: center;
            line-height: 3vw;
            margin-bottom: 2.5vw;
            font-size: 1vw;
        }
        .now{
            i{
                color: var(--blue);
                &:hover{
                    color: var(--blue);
                }   
            }
        }
    }


</style>