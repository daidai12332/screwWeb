<script>
import { useChartStore } from '../stores/chart'
import NewMachineStatus from '../components/homeView/NewMachineStatus.vue'
import DayAccumulation from '../components/homeView/DayAccumulation.vue'
import NewOrderStatus from '../components/homeView/NewOrderStatus.vue'

export default {

    // lifecycle
    mounted() {
        // 播放公告
        this.announce();
    },
    beforeUnmount(){
        // 停止計時器
        this.stopTimer();
    },

    //
    methods: {
        // 接收機台要公告的資料
        alarmFromMachine(errorListFromMachine){
            this.errorList = errorListFromMachine;
        },

        // 接收單號要公告的資料
        alarmFromOrder(finishListFromMachine){
            this.finishList = finishListFromMachine;
        },

        // 播放公告
        announce(){
            // 若無公告
            if( !this.errorList && !this.finishList){
                this.errorListIndex = 0;
                this.finishListIndex = 0;
                console.log('若無公告，請嘗試在 update 呼叫此方法，避免無窮迴圈');
                // this.timerForRenew = setTimeout(this.announce(), 500000);
                return;
            }

            const announceText = document.getElementById('announceText');

            // 輪播機台公告
            if( this.errorListIndex < this.errorList.length ){
                announceText.innerText = '【機台異常】機台：' + this.errorList[this.errorListIndex] + ' 狀態異常';
                this.errorListIndex++;
                this.timerForRenew = setTimeout(this.announce(), this.time);
                return;
            }
            if( this.errorListIndex === this.errorList.length ){
                this.finishListIndex = 0;
                this.errorListIndex++;
            }

            // 輪播單號公告
            if( this.finishListIndex < this.finishList.length ){
                announceText.innerText = '【訂單完成】訂單：' + this.finishList[this.finishListIndex].orderNumber + ' 預計於十分鐘內完成，機台為 ' + this.finishList[this.finishListIndex].machineName;
                this.finishListIndex++;
                this.timerForRenew = setTimeout(this.announce(), this.time);
                return;
            }
            if( this.finishListIndex === this.finishList.length ){
                this.errorListIndex = 0;
                this.finishListIndex++;
            }
        },

        // 停止計時器
        stopTimer(){
            clearTimeout(this.timerForRenew);
            this.timerForRenew = null;
        },

    },

    data() {
        return {

            // 常數管理
            time: 7000,

            // 畫面呈現
            errorList: null,
            finishList: null,
            errorListIndex: 0,
            finishListIndex: 0,
            
            // 計時器
            timerForRenew: null,
        }
    },

    components:{
        NewMachineStatus,
        DayAccumulation,
        NewOrderStatus,
    }
}
</script>

<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <div class="announcement">
        <i class="fa-solid fa-bullhorn"></i>
        <span id="announceText"></span>
    </div>

    <div class="component">

        <div class="leftArea">
            <NewMachineStatus @machineAlarm="alarmFromMachine" />
        </div>
    
        <div class="rightArea">
            <div class="top">
                <DayAccumulation />
            </div>
            <div class="bottom">
                <NewOrderStatus @orderAlarm="alarmFromOrder" />
            </div>
        </div>

    </div>
    
</template>

<style lang="scss" scoped>

    // 基本樣板
    .announcement{
        width: 100%;
        height: 4%;
        border-bottom: 1px solid #D4D4D1;
        margin-bottom: 2%;

        i{
            margin-left: 1vw;
            margin-right: 0.5vw;
            font-size: 1.2vw;
        }
        span{
            line-height: 160%;
            font-size: 1vw;
        }
    }

    // 框架
    .component{
        display: flex;

        .leftArea {
            width: 35vw;
            height: 89vh;
            margin-left: 1.8vw;
            margin-right: 1.8vw;
        }

        .rightArea {
            width: 54.5vw;
            height: 89vh;
            .top{
                width: 54.5vw;
                height: 40vh;
                margin-bottom: 3vh;
                // border: 1px solid black;
            }
            .bottom{
                width: 54.5vw;
                height: 46vh;
                // border: 1px solid black;
            }
        }
    }

</style>
