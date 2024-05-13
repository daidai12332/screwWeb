<script>
import { RouterLink, RouterView } from 'vue-router'
export default{
    data(){
        return{
            
        }
    }
}
</script>

<template>
    <div class="memberBody">
        <div class="leftBar">
            <div class="machine">
                <RouterLink class="routeItem" to="/Member/Machine">管理設備</RouterLink>
            </div>
            <div class="order">
                <RouterLink class="routeItem" to="/Member/Order">管理單號</RouterLink>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.memberBody{
    display: flex;
    padding-top: 1vw;
    .leftBar{
        width: 15vw;
        border: 1px solid black;
        
    }
}
</style>