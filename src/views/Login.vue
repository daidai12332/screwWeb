<script>
export default{
    data(){
        return{
            
        }
    }
}
</script>

<template>
    <div class="loginBody">
        <div class="account eachInput">
            <label for="account">帳號</label>
            <input type="text" id="account">
        </div>
        <div class="pwd eachInput">
            <label for="pwd">密碼</label>
            <input type="password" id="pwd">
        </div>
        <button type="button" @click="this.$router.push('/Member/Machine')">登入</button>
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