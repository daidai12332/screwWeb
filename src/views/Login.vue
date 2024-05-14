<script>
import Swal from 'sweetalert2'

export default{
    data(){
        return{
            account:"",
            pwd: "",
        }
    },
    methods:{
        loginEvent(){
            if(!this.account){
                this.alarmEvent("帳號不得為空");
                return;
            }
            if(!this.pwd){
                this.alarmEvent("密碼不得為空");
                return;
            }
            let req = {
                account: this.account,
                pwd: this.pwd,
            }
            fetch("http://localhost:8080/member/login",{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(req)
            })
            .then(res => res.json())
            .then((data) => {
                if(data.code != 200){
                    console.log(data);
                    this.alarmEvent(data.message);
                    return;
                }
                sessionStorage.setItem("account", this.account);
                this.$router.push('/Member/Machine')
            });
        },
        alarmEvent(str){
            Swal.fire({
                icon: "error",
                title: "失敗",
                text: str,
            });
        },
        beforeCreate() {
            if(sessionStorage.getItem("account")){
                this.$router.push('/Member/Machine');
            }
        },
    }
}
</script>

<template>
    <div class="loginBody">
        <div class="account eachInput">
            <label for="account">帳號</label>
            <input type="text" id="account" v-model.lazy="this.account">
        </div>
        <div class="pwd eachInput">
            <label for="pwd">密碼</label>
            <input type="password" id="pwd" v-model.lazy="this.pwd">
        </div>
        <button type="button" @click="loginEvent">登入</button>
    </div>
</template>

<style lang="scss" scoped>
.loginBody{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15%;
    .eachInput{
        margin-bottom: 2vw;
        label{
            margin-right: 2vw;
        }
        input{
            padding-left: 0.5vw;
            border-radius: 8px;
            width: 30vw;
            height: 2vw;
        }
    }
    button{
        width: 35vw;
        height: 2vw;
    }
}
</style>