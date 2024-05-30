<script>
import { useChartStore } from '../stores/chart'
import { useShowStore } from '../stores/show'

export default {
    data() {
        return {
            // 紀錄現在時間 : 0年 1月 2日 3星期 4時 5分 6秒
            date:[],
            // 讀取時間的計時器
            timerForLocalDateTime: null,
            // 機台
            timerForNewestMachineStatus: null,
            machineStatus: [],
            timerForChangeMachinePage: null,
            machineStatusPage: 0,
            machineStatusPageData: [],
            machinePageNumber: 0,
            // 單號
            timerForNewestOrderStatus: null,
            orderStatus: {},
            timerForChangeOrderPage: null,
            orderStatusPage: 0,
            orderStatusPageData: [],
            orderPageNumber: 0,
            // 統計結果
            timerForSum: null,
            sumPower: 0,
            sumProduce: 0
        }
    },
    methods: {
        // 獲得現在時間
        getTime(){
            let date = new Date();
            this.date[0] = date.getFullYear().toString();
            this.date[1] = (date.getMonth()+1).toString().padStart(2, '0');
            this.date[2] = date.getDate().toString().padStart(2, '0');
            switch (date.getDay()) {
                case 0:
                this.date[3] = "日";
                    break;            
                case 1:
                this.date[3] = "一";
                    break;            
                case 2:
                this.date[3] = "二";
                    break;            
                case 3:
                this.date[3] = "三";
                    break;            
                case 4:
                this.date[3] = "四";
                    break;            
                case 5:
                this.date[3] = "五";
                    break;            
                case 6:
                this.date[3] = "六";
            }
            this.date[4] = date.getHours().toString().padStart(2, '0');
            this.date[5] = date.getMinutes().toString().padStart(2, '0');
            this.date[6] = date.getSeconds().toString().padStart(2, '0');
        },
        // 更新機台資料
        newestMachineStatus(){
            fetch("http://localhost:8080/screw/findmachineDataNow",{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            })
            .then(res => res.json())
            .then((data) => {
                if(data.code != 200){
                    console.log(data);
                    return;
                }
                this.machineStatus = data.machineData;
                console.log("更新機台資料"+this.machineStatus);
                this.machineStatusPage = 0;
                this.machinePageNumber = Math.ceil(this.machineStatus.length/17);
                this.changeMachineShow(0);
            });
        },
        // 更新機台頁面
        changeMachineShow(){
            const high = 17;
            this.machineStatusPageData = [];
            let startIndex = 0 + (this.machineStatusPage)*high;   // 每頁的陣列起始 index
            let largestIndex = high + (this.machineStatusPage)*high;  // 每頁能塞的最大 index
            let endIndex = largestIndex > this.machineStatus.length? this.machineStatus.length : largestIndex;   // 如果最大 index 超過陣列長度，那就用陣列長度作為該頁的上限
            for(startIndex; startIndex < endIndex; startIndex++){
                this.machineStatusPageData.push(this.machineStatus[startIndex]);   // 根據剛剛設定好的 index 將資料放入要呈現的陣列中
            }
            console.log("更新機台頁面："+this.machineStatusPageData);
        },
        // 輪播機台頁面
        carouselMachineShow(){
            this.machineStatusPage = (this.machineStatusPage+1)%(Math.ceil(this.machineStatus.length/17));
            console.log("輪播機台頁面");
            this.changeMachineShow();
        },
        // 更新單號資料
        newestOrderStatus(){
            // 取得單號最新狀況
            fetch("http://localhost:8080/screw/orderDataDay",{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                },
            })
            .then(res => res.json())
            .then((data) => {
                if(data.code != 200){
                    console.log(data);
                    return;
                }
                this.orderStatus = data.orderAndMachineList;
                console.log("取得單號最新狀況"+this.orderStatus);
                this.orderStatusPage = 0;
                this.orderPageNumber = Math.ceil(this.orderStatus.length/10);
                // 更新頁面
                this.changeOrderShow();
            });
        },
        // 更新單號頁面
        changeOrderShow(){
            const high = 5;
            this.orderStatusPageData = [];
            let startIndex = 0 + (this.orderStatusPage)*high;   // 每頁的陣列起始 index
            let largestIndex = high + (this.orderStatusPage)*high;  // 每頁能塞的最大 index
            let endIndex = largestIndex > this.orderStatus.length? this.orderStatus.length : largestIndex;   // 如果最大 index 超過陣列長度，那就用陣列長度作為該頁的上限
            for(startIndex; startIndex < endIndex; startIndex++){
                this.orderStatusPageData.push(this.orderStatus[startIndex]);   // 根據剛剛設定好的 index 將資料放入要呈現的陣列中
            }
        },
        // 輪播單號頁面
        carouselOrderShow(){
            this.orderStatusPage = (this.orderStatusPage+1)%(Math.ceil(this.orderStatus.length/10));
            console.log("輪播單號頁面");
            this.changeOrderShow();
        },
        // 抓取圖表資料
        fetchChartData(){
            let label = [];
            let data0 = [];
            let data1 = [];
            let data2 = [];
            let doughnutLabel = ["一般型", "鍵財型", "成型機"];
            let totalPower = [0, 0, 0];
            let totalProduce = [0, 0, 0];
            for(let index = 0; index < 24; index++){
                label[index] = index;
                data0[index] = 0;
                data1[index] = 0;
                data2[index] = 0;
            }
            fetch("http://localhost:8080/screw/machineHoursData",{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            })
            .then(res => res.json())
            .then((data) => {
                if(data.code != 200){
                    console.log(data);
                    return;
                }                
                for(let index in data.equipmentHoursDayList){
                    switch (data.equipmentHoursDayList[index].type) {
                        case '0':
                            data0[parseInt(data.equipmentHoursDayList[index].time.substring(11,13))] = data.equipmentHoursDayList[index].pass;
                            totalPower[0] += data.equipmentHoursDayList[index].power;
                            totalProduce[0] += data.equipmentHoursDayList[index].pass;
                            break;
                        case '1':
                            data1[parseInt(data.equipmentHoursDayList[index].time.substring(11,13))] = data.equipmentHoursDayList[index].pass;                        
                            totalPower[1] += data.equipmentHoursDayList[index].power;
                            totalProduce[1] += data.equipmentHoursDayList[index].pass;
                            console.log(totalProduce[1]);
                            break;
                        case '2':
                            data2[parseInt(data.equipmentHoursDayList[index].time.substring(11,13))] = data.equipmentHoursDayList[index].pass;                                                    
                            totalPower[2] += data.equipmentHoursDayList[index].power;
                            totalProduce[2] += data.equipmentHoursDayList[index].pass;
                            break;                    
                    }                    
                }
                fetch("http://localhost:8080/screw/machineNewHourData",{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            })
            .then(res => res.json())
            .then((data) => {
                if(data.code != 200){
                    console.log(data);
                } else {
                    console.log(data.equipmentHourList);
                    for(let index in data.equipmentHourList){
                        switch (data.equipmentHourList[index].type) {
                            case 0:
                                data0[parseInt(data.equipmentHoursDayList[index].time.substring(11,13))] = data.equipmentHoursDayList[index].pass;
                                totalPower[0] += data.equipmentHoursDayList[index].power;
                                totalProduce[0] += data.equipmentHoursDayList[index].pass;
                                break;
                            case 1:
                                data1[parseInt(data.equipmentHoursDayList[index].time.substring(11,13))] = data.equipmentHoursDayList[index].pass;      
                                totalPower[1] += data.equipmentHoursDayList[index].power;
                                totalProduce[1] += data.equipmentHoursDayList[index].pass;
                                break;
                            case 2:
                                data2[parseInt(data.equipmentHoursDayList[index].time.substring(11,13))] = data.equipmentHoursDayList[index].pass;   
                                totalPower[2] += data.equipmentHoursDayList[index].power;
                                totalProduce[2] += data.equipmentHoursDayList[index].pass;
                                break;
                        }                    
                    }
                }
                const chartService = useChartStore();
                let datasets = [{label: '一般型', data: data0}, {label: '鍵財型', data: data1}, {label: '成型機', data: data2}]
                chartService.stackChart("stackedChartID", label, datasets);
                chartService.doughnutChart("totalPower", doughnutLabel, totalPower);
                chartService.doughnutChart("totalProduce", doughnutLabel, totalProduce);
                this.sumProduce = totalProduce[0] + totalProduce[1] + totalProduce[2];
                this.sumPower = totalPower[0] + totalPower[1] + totalPower[2];
            });

            });
        },
    },
    mounted() {
        // 修改所在介面顏色
        const showService = useShowStore();
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
        // 更換機台頁面
        this.timerForChangeMachinePage = setInterval(() => {
            setTimeout(this.carouselMachineShow(), 0)
        }, 10000)
        // 取得單號最新狀況
        this.newestOrderStatus();
        this.timerForNewestMachineStatus = setInterval(() => {
            setTimeout(this.newestOrderStatus(), 0)
        }, 60000)
        // 更換機台頁面
        this.timerForChangeMachinePage = setInterval(() => {
            setTimeout(this.carouselOrderShow(), 0)
        }, 10000)
        // 取得最新生產趨勢
        this.fetchChartData();
        this.timerForSum = setInterval(() => {
            setTimeout(this.carouselOrderShow(), 0)
        }, 60000)
    },
    beforeUnmount() {
        clearInterval(this.timerForLocalDateTime);
        this.timerForLocalDateTime = null;
        clearInterval(this.timerForNewestMachineStatus);
        this.timerForNewestMachineStatus = null;
        clearInterval(this.timerForChangeMachinePage);
        this.timerForChangeMachinePage = null;
        clearInterval(this.timerForNewestMachineStatus);
        this.timerForNewestMachineStatus = null;
        clearInterval(this.timerForChangeMachinePage);
        this.timerForChangeMachinePage = null;
        clearInterval(this.timerForSum);
        this.timerForSum = null;
    }
}
</script>

<template>
<body>
    <div class="leftArea">
        <div class="machineStatus">
            <p class="title">機台最新資訊</p>
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
            <div class="item" :class="item.status" v-for="item in this.machineStatusPageData">
            <span class="machineNumber">{{ item.name }}</span>
            <!-- <span class="machineType 成型機">成型機</span> -->
            <span class="machineType" :class="item.type">{{ item.type }}</span>
            <span class="status">{{ item.status }}</span>
            <span class="order">{{ item.orderNumber }}</span>
            <span class="produce">{{ item.pass }}</span>
            <span class="updateTime">{{ item.time.substring(5, 10) + " " + item.time.substring(11) }}</span>
        </div>
    </div>

    <div class="button">
        <button :class="{now: machineStatusPage===i-1}" v-for="i in this.machinePageNumber"></button>
        <span>( 共 {{ this.machineStatus.length }} 筆 )</span>
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
                <div class="week">
                    星期{{ this.date[3] }}
                </div>
                <div class="time">
                    {{ this.date[4] }}:{{ this.date[5] }}:{{ this.date[6] }}
                </div>                            
            </div>
        </div>
        <div class="center">
            <p>生產趨勢</p>
            <canvas id="stackedChartID"></canvas>
        </div>
        <div class="right">
            <div class="explain">
                <p class="totalPower">累積電量
                    <p><span style='font-weight: 600'>{{ Math.round(this.sumPower) }}</span><br>瓦</p>
                </p>
                <p class="totalProduce">累積產量
                    <p><span style='font-weight: 600'>{{ this.sumProduce }}</span><br>顆</p>
                </p>
            </div>
            <div class="chart">
                <canvas id="totalPower"></canvas>
                <canvas id="totalProduce"></canvas>
            </div>
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
            <span class="estimateTime">{{ item.finishTime.substring(5, 10) + " " + item.finishTime.substring(11, 16) }}</span>
            <span class="updateTime2">{{ item.updateTime.substring(5, 10) + " " + item.updateTime.substring(11, 19) }}</span>
        </div>
    </div>

    <div class="button">
        <button :class="{now: orderStatusPage === i-1}" v-for="i in this.orderPageNumber"></button>
        <span>( 共 {{ this.orderStatus.length }} 筆 )</span>
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
                display: flex;
                height: 30vh;
                padding: 1.2vw;
                .left{
                    padding-top: 2vw;
                    padding-right: 1vw;
                    border-right: 1px solid #5E5E5E;
                    margin-right: 1vw;
                    .clock{
                        width: 10vw;
                        .date{
                            height: 1.5vw;
                            font-size: 1vw;
                            text-align: center;
                        }
                        .week{
                            height: 1.5vw;
                            font-size: 1vw;
                            text-align: center;
                            margin-bottom: 2vw;
                        }
                        .time{
                            height: 1.8vw;
                            font-size: 1.9vw;
                            text-align: center;
                        }
                    }
                }
                .center{
                    width: 48%;
                    border-right: 1px solid #5E5E5E;
                    p{
                        font-size: 0.9vw;
                        text-align: center;
                    }
                    canvas{
                        width: 92%;
                    }
                }
                .right{
                    width: 29%;
                    display: flex;
                    padding-left: 1vw;
                    .explain{
                        width: 30%;
                        text-align: center;
                        .totalPower{
                            margin-top: 3.2vw;
                        }
                        .totalProduce{
                            margin-top: 5.8vw;
                        }
                        p{
                            position: relative;
                            font-size: 0.9vw;
                            p{
                                width: 5vw;
                                font-size: 0.8vw;
                                position: absolute;
                                z-index: 2;
                                left: 162%;
                                top: 0;
                                text-align: center;
                                span{
                                    font-size: 0.8vw;
                                }
                            }
                        }
                    }
                    .chart{
                        width: 70%;
                        canvas{
                            margin-top: 1vw;
                            margin-bottom: 1vw;
                        }
                    }
                }
            }
        }
        .orderBlock{
            margin-top: 1.5vw;
            .title{
                background-color: var(--green);
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
        margin-left: 1.3vw;
    }
    .machineType{
        width: 5vw;
    }
    .status{
        width: 3.5vw;
        font-weight: 800;
    }
    .order{
        width: 3vw;
    }
    .produce{
        width: 3vw;
    }
    .updateTime{
        width: 7.7vw;
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
        .成型機{
            color: white;
            background-color: var(--blue);
            border-radius: 10px;
            position: relative;
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
    50%{ 
        background-color: var(--red); 
    }
    70%{ 
        background-color: white;
    }
    100%{ 
        background-color: var(--red); 
    }
}


</style>
