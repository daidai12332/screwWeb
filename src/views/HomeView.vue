<script>
import { useChartStore } from '../stores/chart'
import { useShowStore } from '../stores/show'
import { useFetchStore } from '../stores/fetch'

export default {
    data() {
        return {
            // 紀錄現在時間 : 0年 1月 2日 3時 4分 5秒
            date:[],
            // 讀取時間的計時器
            timerForLocalDateTime: null,
            // 紀錄機台即時狀況
            timerForNewestMachineStatus: null,
            machineStatus: [],
            timerForChangeMachinePage: null,
            machineStatusPage: 0,
            machineStatusPageData: [],
            // 紀錄單號即時狀況
            timerForNewestOrderStatus: null,
            orderStatus: {},
            timerForChangeOrderPage: null,
            orderStatusPage: 0,
            orderStatusPageData: [],
        }
    },
    methods: {
        // 獲得現在時間
        getTime(){
            let date = new Date();
            this.date[0] = date.getFullYear().toString();
            this.date[1] = (date.getMonth()+1).toString().padStart(2, '0');
            this.date[2] = date.getDate().toString().padStart(2, '0');
            this.date[3] = date.getHours().toString().padStart(2, '0');
            this.date[4] = date.getMinutes().toString().padStart(2, '0');
            this.date[5] = date.getSeconds().toString().padStart(2, '0');
        },
        // 建立圖表
        test(){
            const chartService = useChartStore();
            let labels = [];
            let datasets = [{label: 'worst', data: [200, 16, 4, 11, 8, 9]}]
            // chartService.stackChart("stackedChartID", data);
        },
        // 更新機台資料
        newestMachineStatus(){
            // 取得機台最新狀況
            const fetchService = useFetchStore();
            this.machineStatus = fetchService.fetchNewestMachineStatus();
            console.log(this.machineStatus);
            this.machineStatusPage = 0;
            // 更新頁面
            this.changeMachineShow(0);
        },
        // 更新機台頁面
        changeMachineShow(page){
            const fetchService = useFetchStore();
            this.machineStatusPageData = fetchService.page(this.machineStatus, 17, page);            
        },
        newestOrderStatus(){
            // 取得單號最新狀況
            const fetchService = useFetchStore();
            this.orderStatus = fetchService.fetchNewestOrderStatus();
            console.log(this.orderStatus);
            this.orderStatusPage = 0;
            // 更新頁面
            this.changeOrderShow(0);
        },
        changeOrderShow(page){
            const fetchService = useFetchStore();
            this.orderStatusPageData = fetchService.page(this.orderStatus, 5, page);
        }
    },
    mounted() {
        const showService = useShowStore();
        // 修改所在介面顏色
        showService.modeChange(0);
        // 取得時間
        this.getTime();
        this.timerForLocalDateTime = setInterval(() => {
            setTimeout(this.getTime(), 0)
        }, 1000)
        // 取得機台最新狀況
        this.newestMachineStatus();
        this.timerForNewestMachineStatus = setInterval(() => {
            setTimeout(this.newestMachineStatus(), 0)
        }, 60000)
        this.timerForChangeMachinePage = setInterval(() => {
            setTimeout(this.changeMachineShow(this.machineStatusPage++), 0)
        }, 10000)
        // 取得單號最新狀況
        this.orderStatus = fetchService.fetchNewestOrderStatus();
        
        console.log(this.orderStatus);
    },
    beforeUnmount() {
        clearInterval(this.timerForLocalDateTime);
        this.timerForLocalDateTime = null;
        clearInterval(this.timerForNewestMachineStatus);
        this.timerForNewestMachineStatus = null;
        clearInterval(this.timerForChangeMachinePage);
        this.timerForChangeMachinePage = null;
        clearInterval();
    }
}
</script>

<template>
    <body>
        <div class="leftArea">

            <div class="machineStatus">

                <p class="title" @click="()=>{this.$router.push('/MachineStatus')}">機台最新資訊</p>
                <div class="detail">
                    <span class="machineNumber">機器編號</span>
                    <span class="machineType">機種</span>
                    <span class="status" style="font-weight: normal;">狀態</span>
                    <span class="order">單號</span>
                    <span class="produce">產量</span>
                    <span class="updateTime">更新時間</span>
                </div>
                <!-- 最多可以 17 筆 -->
                <div class="content">
                    <div class="item" :class="item.status" v-for="item in machineStatusPageData">
                        <span class="machineNumber">{{ item.name }}</span>
                        <span class="machineType">{{ item.type }}</span>
                        <span class="status">{{ item.status }}</span>
                        <span class="order">{{ item.orderNumber }}</span>
                        <span class="produce">{{ item.pass }}</span>
                        <span class="updateTime">{{ item.time }}</span>
                    </div>
                </div>

                <div class="button">
                    <button :class="{now: machineStatusPage===i-1}" v-for="i in Math.ceil(this.machineStatus.length()/17)+1"></button>
+                    <span>( 共 {{ this.machineStatus.length() }} 筆 )</span>
                </div>
            </div>
        </div>

        <div class="rightArea">
            <div class="todayBlock">
                <p class="title">今日累積數值</p>
                <div class="content">
                    <div class="left">
                        <div class="clock">
                            <div class="date">
                                {{ this.date[0] }} 年 {{ this.date[1] }} 月 {{ this.date[2] }} 日
                            </div>
                            <div class="time">
                                {{ this.date[3] }}:{{ this.date[4] }}:{{ this.date[5] }}
                            </div>                            
                        </div>
                    </div>
                    <div class="center">
                        <canvas id="stackedChartID" style="scale: 0.5;"></canvas>
                    </div>
                    <div class="right">

                    </div>
                </div>
            </div>

            <div class="orderBlock">
                <p class="title">單號最新資訊</p>
                <div class="detail">
                    <span class="orderNumber">單號</span>
                    <span class="aim">目標生產量</span>
                    <span class="sofar">累積產量</span>
                    <span class="passRatio">良率</span>
                    <span class="produceMachine">生產機台</span>
                    <span class="estimateTime">預估完成時間</span>
                    <span class="updateTime2">更新時間</span>
                </div>

                <div class="content">
                    <div class="item" v-for="item in this.orderStatusPageData">
                        <span class="orderNumber">{{ item.orderNumber }}</span>
                        <span class="aim">{{ item.aim }}</span>
                        <span class="sofar">{{ item.pass }}</span>
                        <span class="passRatio">{{ item.passAvg }}</span>
                        <span class="produceMachine">{{ item.name }}</span>
                        <span class="estimateTime">{{ item.finishTime }}</span>
                        <span class="updateTime2">{{ item.updateTime }}</span>
                    </div>
                </div>

                <div class="button">
                    <button :class="{now: orderStatusPage === i-1}" v-for="i in Math.ceil(this.orderStatus.length()/10)+1"></button>
                    <span>( 共 {{ this.orderStatus.length() }} 筆 )</span>
                </div>

            </div>
        </div>
    </body>
</template>

<style lang="scss" scoped>
body{
    display: flex;
    width: 100%;
    padding-top: 2vw;
    .leftArea {
        width: 32%;
        margin-left: 2vw;
        margin-right: 2vw;
        .machineStatus {
            width: 100%;
            height: 100%;
            .title{
                background-color: var(--yellow);
            }
            .content{
                height: 84vh;
            }
        }
    }
    .rightArea {
        width: 61%;
        .todayBlock{
            .title{
                background-color: var(--red);
            }
            .content{
                height: 30vh;
            }
        }
        .orderBlock{
            margin-top: 1.5vw;
            .title{
                background-color: var(--blue);
            }
            .content{
                height: 47.8vh;
            }
        }
    }
}

.title{
    height: 1.5vw;
    color: white;
    text-align: center;
    line-height: 1.6vw;
    font-size: 0.95vw;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 0.5vw;
}

.detail{
    span{
        display: inline-block;
        font-size: 0.9vw;
        text-align: center;
        padding-left: auto;
    }
}

.content {
    padding-top: 1.2vw;
    height: 10vh;
    border: 1px solid #5E5E5E;
    border-radius: 10px;
    .item{
        display: flex;
        align-items: center;
        margin-bottom: 0.3vw;
        span{
            display: inline-block;
            font-size: 1.1vw;
            text-align: center;
            height: 2vw;
            line-height: 2vw;
        }
    }
}

div{
    .machineNumber{
        width: 5vw;
        margin-left: 1.75vw;
    }
    .machineType{
        width: 5vw;
    }
    .status{
        width: 3.5vw;
        font-weight: 500;
    }
    .order{
        width: 3vw;
    }
    .produce{
        width: 3vw;
    }
    .updateTime{
        width: 7vw;
    }
    .updateTime2{
        width: 10vw;
    }
    .orderNumber{
        width: 5vw;
        margin-left: 1.76vw;
    }
    .aim{
        width: 10vw;
    }
    .sofar{
        width: 10vw;
    }
    .passRatio{
        width: 3vw;
    }
    .produceMachine{
        width: 10vw;
    }
    .estimateTime{
        width: 6vw;
    }
}

.machineStatus{
    .item{
        .machineType{
            font-size: 0.7vw;
        }
    }
    .idle{
        .status{
            color: var(--blue);
        }
    }
    .run{
        .status{
            color: var(--green);
        }
    }
    .error{
        position: relative;
        &::after{
            content: "";
            width: 96%;
            height: 96%;
            position: absolute;
            left: 2%;
            top: 2%;
            border-radius: 15px;
            background-color: var(--red);
            z-index: -1;
            -webkit-animation-name: errorAlarm;
            -webkit-animation-duration: 1.5s;
            -webkit-animation-iteration-count: infinite;
            -webkit-animation-direction: alternate;
            -webkit-animation-timing-function: ease;
            -webkit-animation-play-state: running;
        }
    }
}

.button{
    display: flex;
    justify-content: center;
    button{
        margin-left: 0.2vw;
        margin-right: 0.2vw;
        margin-top: 0.8vw;
        display: block;
        width: 0.5vw;
        height: 0.5vw;
        background-color: white;
        border: 1px solid #5E5E5E;
        border-radius: 50%;
    }
    span{
        margin-left: 0.5vw;
        line-height: 2vw;
        font-size: 0.8vw;
    }
    .error{
        border-color: var(--red);
        -webkit-animation-name: errorAlarm;
        -webkit-animation-duration: 1.5s;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-direction: alternate;
        -webkit-animation-timing-function: ease;
        -webkit-animation-play-state: running;
    }
    .now{
        background-color: #5E5E5E;
    }
}

@-webkit-keyframes errorAlarm{
    0% { 
        background-color: white;
    }
    50%{ background-color: var(--red); }
    70%{ 
        background-color: white;
    }
    100%{ background-color: var(--red); }
}


</style>
