<script>
import { RouterLink, RouterView } from 'vue-router'
export default{
    data(){
        return{
            
        }
    },
    methods:{
        logoutEvent(){
            fetch("http://localhost:8080/member/logout",{
                method: 'GET',
                headers:{
                    "Content-Type":"application/json"
                },
            })
            .then(res => res.json())
            .then((data) => {
                if(data.code != 200){
                    console.log(data);
                    this.alarmEvent(data.message);
                    return;
                }
                this.successEvent("已登出");
                sessionStorage.removeItem("account");
                window.location.reload();
            });
        },
        alarmEvent(str){
            Swal.fire({
                icon: "error",
                title: "失敗",
                text: str,
            });
        },
        successEvent(str){
            Swal.fire({
                icon: "success",
                title: "成功",
                text: str,
            });
        },
    }
}
</script>

<template>
    <div class="memberBody">
        <div class="leftBar">
            <p>功能選單</p>
            <div class="machine option" @click="this.$router.push('/Member/Machine')">
                <RouterLink class="routeItem" to="/Member/Machine" style="text-decoration: none; color: inherit">管理設備</RouterLink>
            </div>
            <div class="order option" @click="this.$router.push('/Member/Order')">
                <RouterLink class="routeItem" to="/Member/Order" style="text-decoration: none; color: inherit">管理單號</RouterLink>
            </div>
            <div class="logout option" @click="logoutEvent">
                登出
            </div>
        </div>
        <RouterView />
    </div>

</template>

<style lang="scss" scoped>
.memberBody{
    display: flex;
    .leftBar{
        background-color: rgb(242, 242, 242);
        padding-top: 1vw;
        width: 8vw;
        height: 100vh;
        text-align: center;
        p{
            line-height: 3vw;
            height: 3vw;
        }
        .option{
            border: 1px solid black;
            cursor: pointer;
            height: 3vw;
            line-height: 3vw;
        }
    }
}
</style>