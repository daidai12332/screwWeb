<script>
import { RouterLink, RouterView } from 'vue-router'
import { useShowStore } from '../stores/show'

export default {
    data(){
        return {
            htmlNow: "",
            account: "",
        }
    },
    methods: {
        logout(){
            sessionStorage.removeItem('account');
            location.reload();
        },
        changeRouter(page, link){
            const showService = useShowStore();
            showService.modeChange(page);
            this.htmlNow = link;
            this.$router.push(link);
        }
    },
    components:{
        RouterLink,
        RouterView,
    },
    mounted() {
        this.htmlNow = this.$router.options.history.location;
        console.log("htmlNow" + this.htmlNow);
        this.account = sessionStorage.getItem("account");
    },

}
</script>


<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <div class = "header">
        <div class="logo" @click="()=>{this.$router.push('/')}">
            Logo
        </div>
        
        <div class="home item" :class="{now:this.htmlNow === '/'}" @click="changeRouter(0, '/')">
            <i class="fa-solid fa-house"></i>
        </div>

        <div class="machine item" :class="{now:this.htmlNow === '/MachineStatus'}">
            <i class="fa-solid fa-database" @click="changeRouter(1, '/MachineStatus')"></i>
        </div>

        <div class="user item" :class="{now:this.htmlNow === '/Login'}"  v-if="!this.account">
            <i class="fa-solid fa-user" @click="changeRouter(3, '/Login')"></i>
        </div>

        <div class="memberMachine item" :class="{now:this.htmlNow === '/Member/Machine' || this.htmlNow === '/Login'}" v-if="this.account">
            <i class="fa-solid fa-database" @click="changeRouter(4, '/Member/Machine')"></i>
            <i class="fa-solid fa-gear" @click="changeRouter(4, '/Member/Machine')"></i>
        </div>

        <div class="memberOrder item" :class="{now:this.htmlNow === '/Member/Order'}" v-if="this.account">
            <i class="fa-solid fa-clipboard-list" @click="changeRouter(5, '/Member/Order')"></i>
            <i class="fa-solid fa-gear" @click="changeRouter(5, '/Member/Order')"></i>
        </div>

        <div class="logout item"  v-if="this.account" @click="logout">
            登出
        </div>

    </div>
</template>

<style lang="scss" scoped>
    .header{
        width: 90%;
        height: 100vh;
        border-right: 1px solid #D4D4D1;
        padding-top: 2vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .item{
            cursor: pointer;
        }
        div{
            position: relative;
            i {
                font-size: 1.8vw;
                margin-bottom: 2vw;
                color: #5E5E5E;
                &:hover{
                    color: #3d3d3d;
                }
            }
            .fa-gear{
                font-size: 1vw;
                position: absolute;
                right: -0.5vw;
                bottom: -0.5vw;
                background-color: white;
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

    .logout{
        position: fixed;
        bottom: -30vw;
        font-size: 1.2vw;
    }
</style>