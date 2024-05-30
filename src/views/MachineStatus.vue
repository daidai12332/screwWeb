
<script>
import MachineStatistics from '../components/MachineStatistics.vue'
import { useShowStore } from '../stores/show'

export default {
    data() {
        return {
            list:[],
            machineDataList:[],
            names: ["test1", "test2"],
            mName: "",
            machineStatusPage:0,
            machinePageNumber:0,

        }
    },
    components: {
        MachineStatistics
    },
    methods: {
        getDataNow() {
            let obj = {

            }
            fetch("http://localhost:8080/screw/findmachineDataNow", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then((data) => {
                    this.list.length = 0;
                    this.machineDataList.length = 0;
                    this.list.push(data)
                    this.list[0].machineData.forEach((item, index) => {
                        this.machineDataList.push(item);
                    });
                    this.machineStatusPage =  Math.ceil(this.machineDataList.length/17);
                })
        },
        machineRow(n) {
            this.mName = n
        },
        
    },
    mounted() {
        console.log("MachineStatus");
        // 修改所在介面顏色
        const showService = useShowStore();
        showService.modeChange(1);
        console.log(showService.mode);
        // 獲得機台資料
        this.getDataNow();
    },
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
                <div class="item" :class="{ now: item.name=== this.mName }" v-for="item in this.machineDataList" @click="this.machineRow(item.name)">
                    <span class="machineNumber">{{ item.name }}</span>
                    <span class="machineType">{{ item.type }}</span>
                    <span class="status" :class="item.status">{{ item.status }}</span>
                    <span class="order">{{ item.orderNumber }}</span>
                    <span class="produce">{{ item.pass }}</span>
                    <span class="updateTime">{{ item.time.substring(5, 10) + " " + item.time.substring(11) }}</span>
                </div>
            </div>

        <div class="button">
            <button :class="{now: this.machinePageNumber===i-1}" v-for="i in this.machineStatusPage" @click="()=>{this.machinePageNumber = i-1}"></button>
            <span>( 共 {{ this.machineDataList.length }} 筆 )</span>
        </div>
        </div>
    </div>

    <div class="rightArea">
        <p v-if="!this.mName">點選左側列表查看詳情</p>
        <MachineStatistics v-bind:mName="this.mName" v-if="this.mName" />
    </div>
</body>
</template>

<style lang="scss" scoped>

body{
    display: flex;
    width: 100%;
    .leftArea {
        width: 32%;
        margin-top: 2vw;
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
    .now{
        background-color: #eae8e8;
    }
    .item{
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 0.3vw;
        &:hover{
            cursor: pointer;
            &::after{
                content: "";
                width: 96%;
                height: 96%;
                position: absolute;
                left: 2%;
                top: 2%;
                border-radius: 15px;
                background-color: #eae8e8;
                z-index: -1;
            }
        }
        span{
            display: inline-block;
            font-size: 1.1vw;
            text-align: center;
            height: 2vw;
            line-height: 2vw;
        }
    }
}

.itemNow{
    &::after{
                content: "";
                width: 96%;
                height: 96%;
                position: absolute;
                left: 2%;
                top: 2%;
                border-radius: 15px;
                background-color: #eae8e8;
                z-index: -1;
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
}

.machineStatus{
    .item{
        .machineType{
            font-size: 0.7vw;
        }
        .idle{
            color: var(--blue);
        }
        .run{
            color: var(--green);
        }
        .error{
            color: var(--red);
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
        cursor: pointer;
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

.rightArea{
    height: 100vh;
    width: 60%;
    overflow-x: hidden;
    overflow-y: scroll;
    p{
        text-align: center;
        margin-top: 25vw;
    }
}

</style>
