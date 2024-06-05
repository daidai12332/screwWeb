<script>
export default{

    // lifecycle
    mounted(){
        // 抓取資料
        this.init();
    },
    beforeUnmount(){
        // 停止計時器
        this.stopTimer();
    },

    //
    methods: {
        init(){
            this.pageNow = 1;

            // 定時更新資料
            this.timerForNewStatus = setInterval(() => {
                    setTimeout(this.getNewestData(), 0)
                }, this.time);
        },

        // 抓取資料庫新資料
        getNewestData(){

            console.log("stop get data for displaying");
            return;

            // 設定更新時間
            const now = new Date();
            this.updateTime = now.getMonth().toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0') + ' ' + now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0') + ':' + now.getSeconds().toString().padStart(2, '0');

            // 清空
            this.dataList = [];
            this.showList = [];
            this.totalPage = 0;

            // 進入資料庫
            fetch("http://localhost:8080/screw/findmachineDataNow",{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                },
            })
            .then(res => res.json())
            .then((data) => {

                // 處理錯誤訊息
                if(data.code != 200){
                    this.dataList = null;
                    console.log(data);
                    return;
                }

                if(!data.machineDataList){
                    return;
                }

                // 設定顯示資料
                this.totalPage = Math.ceil( data.machineDataList.length / this.high );
                for(let index in data.machineDataList){
                    this.dataList.push(data.machineDataList[index]);
                    if( data.machineDataList[index].status === 'error' ){
                        this.errorList.push(this.turnIntoPage(index));
                        this.errorNotify.push(data.machineDataList[index].name);
                    }
                }

                // 設定倒數動畫
                this.setCountdownAnimation();
    
                // 設定單頁呈現資料
                this.getShowData();

            });
        },

        // 設定倒數動畫
        setCountdownAnimation(){
            const countDownAnimation = [
                { width: "100%" },
                { width: "0%" }
            ];
            const countDownTiming = {
                duration: this.time,
                iterations: 1,
            }

            const countdownLine = document.getElementById('countdownLineForMachineDetail');
            countdownLine.animate(countDownAnimation, countDownTiming);
        },

        // 設定單頁呈現資料
        getShowData(){
            this.showList = null;
            let startIndex = 0 + ( this.pageNow -1 ) * this.high;
            let largestIndex = high + ( this.pageNow -1 ) * this.high;
            let endIndex = largestIndex > this.dataList.length? this.dataList.length : largestIndex;
            for(startIndex; startIndex < endIndex; startIndex++){
                this.showList.push(this.dataList[startIndex]);
            }
        },

        // 停止計時器
        stopTimer(){
            clearTimeout(this.timerForNewStatus);
            this.timerForNewStatus = null;
        },
    },

    data(){
        return{

            // 常數管理
            high: 8,       // 單頁最多筆數 
            time: 10000,    // 多久更新資料(ms)

            // 資料管理
            dataList: [],   // 所有資料清單

            // 畫面呈現
            totalPage: 0,     // 總頁數
            pageNow: 0,       // 現在頁面
            showList: [],     // 現在頁面的資料清單
            updateTime: null,   // 資料更新時間
            
            // 計時器
            timerForNewStatus: null,  // 定時取資料
        }
    }
}
</script>

<template>
    <div class="orderStatus">

        <div class="table">
            <p v-if="!this.dataList.length" style="font-size: 1vw">暫無資料</p>
            <table v-if="this.dataList.length">
                <thead>
                    <tr class="detail">
                        <th scope="col" class="orderNumber">訂單編號</th>
                        <th scope="col" class="aim">目標產量</th>
                        <th scope="col" class="machineName">生產機台</th>
                        <th scope="col" class="machineType">種類</th>
                        <th scope="col" class="sofar">累積產量</th>
                        <th scope="col" class="finishRatio">完成率</th>
                        <th scope="col" class="estimateFinishTime">預估完成時間</th>
                        <th scope="col" class="updateTime">最後接收時間</th>
                    </tr>
                </thead>
    
                <tbody>
                    <tr class="content" v-for="item in this.showList">
                        <td>1</td>
                        <td>500000</td>
                        <td>test01</td>
                        <td>鍵財機</td>
                        <td>5000</td>
                        <td>12%</td>
                        <td>2024-05-12 12:00</td>
                        <td>2024-05-12 05:30</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="button">
            <!-- <button :class="{ 'now': this.pageNow === i }" v-for="i in this.totalPage">{{ i }}</button> -->
        </div>        


        <div class="note">
            <div id="countdownLineForMachineDetail"></div>
            <table>
                <tr class="countdown">
                    <th scope="row" class="renewTime">更新時間：{{ this.updateTime }}</th>
                    <th scope="row" class="dataCount" v-if="this.dataList.length"> ( 共 {{ this.dataList.length }} 筆 ) </th>
                    <th scope="row" class="dataCount" v-if="!this.dataList.length"> ( 共 - 筆 ) </th>
                </tr>
            </table>
        </div>
    
    </div>

</template>

<style lang="scss" scoped>

    // 基本樣式
    .orderStatus {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;

        .table{
            // border: 1px solid black;
            height: 84%;
            border-bottom: 1px solid #f2f2f2;

            table{
                border-collapse: collapse;

                thead{
                    .detail{
                        th{
                            font-size: 0.9vw;
                            text-align: center;
                            border-bottom: 1vh solid white;
                        }
                        .orderNumber{
                            width: 10vw;
                        }
                        .aim{
                            width: 11.5vw;
                        }
                        .machineName{
                            width: 10vw;
                        }
                        .machineType{
                            width: 10vw;
                        }
                        .sofar{
                            width: 11.5vw;
                        }
                        .finishRatio{
                            width: 10vw;
                        }
                        .estimateFinishTime{
                            width: 13vw;
                        }
                        .updateTime{
                            width: 17vw;
                        }
                    }
                }

                tbody{
                    tr{
                        border: 0;
                    }

                    tr:nth-child(odd){
                        background-color: #f2f2f2;
                        border: 0;
                    }

                    .content{
                        height: 70%;
                        .type{
                            font-size: 0.9vw;
                        }
                        td{
                            height: 4vh;

                            word-wrap: break-word;
                            vertical-align: center;
                            text-align: center;
                            font-size: 1.1vw;
                        }
                    }
                }
            }
        }
        
        .button{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 10%;
            // border:1px solid #5E5E5E;
            button{
                margin-left: 0.3vw;
                margin-right: 0.3vw;
                display: block;
                width: 1vw;
                height: 1vw;
                background-color: white;
                cursor: pointer;
                // border: 1px solid #5E5E5E;
                border-radius: 50%;

                font-size: 0.8vw;
                &:hover{
                background-color: var(--greenLight);
                }
            }

        }

        .note{
            #countdownLineForMachineDetail{
                width: 100%;
                height: 0.5vh;
                background-color: var(--green);
            }

            table{
                border-collapse: collapse;
                
                .countdown{
                    border: 0;
                    th{
                        background-color: var(--green);
                        width: 46.5vw;

                        font-weight: 600;
                        font-size: 0.95vw;
                        vertical-align: top;
                    }
                    .renewTime{
                        border-radius: 0px 0px 0px 10px;
                        padding-left: 2vw;
                        text-align: left; 
                    }
                    .dataCount{
                        border-radius: 0px 0px 10px 0px;
                        padding-right: 2vw;
                        text-align: right;
                    }
                }
            }
        }

    }

    // 特殊樣式：按鈕-現在頁面
    .orderStatus{
        .button{
            .now{
                background-color: var(--green);
                color: white;
                &:hover{
                    background-color: var(--green);
                }
            }
        }
    }

</style>