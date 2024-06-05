<script>

export default{
    methods: {

        // 改變顯示分頁
        changeTab(tabNumber){
            if( this.tab === tabNumber){
                return;
            }
            this.tab = tabNumber;
        }
        
    },
    data(){
        return{

            // 模式管理
            tab: 0,

            // 畫面呈現
            dataStatic: null,
            dataDynamic: null,
        }
    }
}
</script>

<template>

    <div class="tabBlock">
        <button :class="{ now:this.tab===0}" @click="changeTab(0)">基本資料</button>
        <button :class="{ now:this.tab===1}" @click="changeTab(1)">維修紀錄</button>
        <button :class="{ now:this.tab===2}" @click="changeTab(2)">績效分析</button>
    </div>

    <div class="basicInfoBlock tabShowBlock" v-show="this.tab === 0">

        <div class="basicInfo infoBlock">
            <div class="line">
                <label for="machineName">　名稱　</label><input id="machineName" type="text" disabled>
            </div>
            <div class="line">
                <label for="machineUsage">使用狀態</label>
                <select name="machineUsage" id="machineUsage" disabled>
                    <option value="">使用中</option>
                    <option value="">停用</option>
                </select>
            </div>
            <div class="line">
                <label for="status">運作狀態</label><input id="status" type="text" disabled>
            </div>
            <div class="line">
                <label for="type">　種類　</label>
                <select name="machineType" id="type" disabled>
                    <option value="">一般機</option>
                    <option value="">成型機</option>
                    <option value="">鍵財機</option>
                </select>
            </div>
            <div class="line">
                <label for="voltage">　電壓　</label><input id="voltage" type="number" disabled>
                <span> 伏特</span>
            </div>
        </div>
        
        <div class="buyInfo infoBlock">
            <p>採購</p>
            <div class="line">
                <label for="buyTime">購買時間</label><input id="buyTime" type="date" disabled>                
            </div>
            <div class="line">
                <label for="buyLocation">購買地點</label><input id="buyLocation" type="text" disabled>
            </div>
            <div class="line">
                <label for="buyPrice">購買價格</label><input id="buyPrice" type="number" disabled>
                <span> 元</span>
            </div>
            <div class="line">
                <label for="fixFreeExp">保固日期</label><input id="fixFreeExp" type="date" disabled>
            </div>
            <div class="line">
                <label for="useExp">使用年限</label><input id="useExp" type="date" disabled>
            </div>
        </div>

        <div class="fixInfo infoBlock">
            <p>維修</p>
            <div class="line">
                <label for="fixPerson">維修人員姓名</label><input id="fixPerson" type="text" disabled>
            </div>
            <div class="line">
                <label for="fixPhone">　　電話　　</label><input id="fixPhone" type="tel" disabled>
            </div>
            <div class="line">
                <label for="fixEmail">　　電郵　　</label><input id="fixEmail" type="email" disabled>
            </div>
            <div class="line">
                <label for="fixAdress">　　地址　　</label><input id="fixAdress" type="text" disabled>
            </div>
        </div>

        <div class="noteInfo infoBlock">
            <p>備註</p>
            <div class="line">
                <textarea name="note" id="noteInfo" disabled></textarea>
            </div>
        </div>

    </div>

    <div class="fixInfoBlock tabShowBlock" v-show="this.tab===1">

        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th scope="col" class="fixTime">維修時間</th>
                        <th scope="col" class="fixReason">維修原因</th>
                        <th scope="col" class="fixResult">結果</th>
                        <th scope="col" class="fixNote">備註</th>
                    </tr>
                </thead>
    
                <tbody>
                    <tr v-for="i in 10">
                        <td>2025-05-17 05:30</td>
                        <td>定期保養</td>
                        <td class="fixResult">狀況良好</td>
                        <td class="fixNote">沒什麼大問題，須注意清潔</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>

    <div class="statisticsBlock tabShowBlock" v-show="this.tab===2">

        <div class="todayTable statisticsTable">

            <p>今日趨勢</p>
            <div class="table">
                <table>
                    <thead>
                        <tr>
                            <th scope="col" class="timeRange">統計時間</th>
                            <th scope="col" class="current">耗電量(瓦特)</th>
                            <th scope="col" class="produce">生產量(顆)</th>
                            <th scope="col" class="passRatio">良率(%)</th>
                            <th scope="col" class="activationRatio">稼動率(%)</th>
                        </tr>
                    </thead>
    
                    <tbody>
                        <tr v-for="i in 24">
                            <td>{{ i-1 }}:00-{{ i }}:00</td>
                            <td>2.456</td>
                            <td>50000</td>
                            <td class="fixResult">20%</td>
                            <td class="fixNote">80%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="averageTable statisticsTable">

            <p>歷史資料</p>
            <div class="table">
                <p>統計時間：</p>
                <table>
                    <thead>
                        <tr>
                            <th scope="col" class="avgCurrent">平均耗電量(瓦特)</th>
                            <th scope="col" class="avgPassRatio">平均良率(%)</th>
                            <th scope="col" class="avgActivationRatio">平均稼動率(%)</th>
                        </tr>
                    </thead>
    
                    <tbody>
                        <tr>
                            <td>360</td>
                            <td>31%</td>
                            <td>80%</td>
                        </tr>
                    </tbody>                    
                </table>

                <p class="title">維修原因統計</p>
                <table>
                    <thead>
                        <tr>
                            <th scope="col" class="avgCurrent">當機原因</th>
                            <th scope="col" class="avgPassRatio">發生次數</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>定期保養</td>
                            <td>2</td>
                        </tr>
                    </tbody>

                </table>
            </div>

        </div>
        
        <div class="linkArea">
            <button>統計圖呈現</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    // 基本樣式
    .tabBlock{
        width: 100%;
        height: 8%;
        // border: 1px solid red;
        button{
            cursor: pointer;
            width: 8%;
            height: 100%;
            font-size: 1vw;
            border-radius: 13px 13px 0px 0px;
            background-color: var(--yellowLight);
        }
    }

    .tabShowBlock{
        width: 100%;
        height: 92%;
        border: 0.15vw solid var(--yellow);
        padding-left: 1vw;
        // border: 1px solid red;
        display: flex;

        .infoBlock{
            width: 24vw;
            border-right: 1px solid var(--yellow);
            padding-left: 2.5vw;
            padding-right: 2.5vw;
            padding-top: 1vw;

            p{
                font-size: 1vw;
                text-align: center;
            }

            .line{
                width: 18vw;
                margin-top: 1vw;
                margin-bottom: 1vw;

                label{
                    width: 10vw;
                    margin-right: 1vw;
    
                    font-size: 1.1vw;
                }
    
                input{
                    width: 10vw;
                    border: 1px solid black;
                    padding: 0.1vw;
                    font-size: 1.1vw;
                }
                
                select{
                    width: 10vw;
                    border: 1px solid black;

                    font-size: 1.1vw;

                    option{
                        font-size: 1.1vw;
                    }
                }

                textarea{
                    width: 100%;
                    height: 33vh;
                    border: 1px solid black;
                    padding: 0.1vw;
                    resize: none;

                    font-size: 1.1vw;
                }

                span{
                    font-size: 1.1vw;
                }
            }
            
        }
    }

    .basicInfoBlock{

        .basicInfo{
            padding-top: 2.5vw;
        }

        .infoBlock{

            .line{
                #voltage{
                    width: 38%;
                }
    
                #buyPrice{
                    width: 47%;
                }
            }
        }

        .noteInfo{
            border-right: none;
        }
    }

    .fixInfoBlock{
        width: 100%;
        height: 92%;
        padding-left: 0px;
        .table{
            width: 100%;
            max-height: 100%;
            overflow-y: scroll;
            table{
                width: 100%;
                border-collapse: collapse;

                thead{
                    tr{
                        th{
                            height: 3vh;
                            padding-top: 1vh;
                            border-right: 1px solid var(--yellow);

                            font-weight: normal;
                            font-size: 1vw;
                            text-align: center;
                        }
                        .fixTime{
                            width: 12%;
                        }
                        .fixReason{
                            width: 10%;
                        }
                        .fixResult{
                            width: 39%;
                        }
                        .fixNote{
                            width: 39%;
                        }
                    }
                }

                tbody{
                    tr:nth-child(odd){
                        background-color: #f2f2f2;
                        border: 0;
                    }

                    tr{
                        border: 0;
                        height: 5vh;

                        td{
                            border-right: 1px solid var(--yellow);
                            word-wrap: break-word;

                            font-size: 1.1vw;
                            text-align: center;
                            font-size: 1.1vw;
                            vertical-align: center;
                        }

                        .fixResult{
                            padding-left: 1vw;
                            text-align: left;
                        }

                        .fixNote{
                            padding-left: 1vw;
                            text-align: left;
                        }
                    }

                }
            }
        }
    }

    .statisticsBlock{
        width: 100%;
        height: 44vh;
        padding: 0px;
        .statisticsTable{
            width: 40%;
            p{
                text-align: center;
                font-size: 1vw;
            }
            .table{
                max-height: 93%;
                overflow-y: scroll;
                p{
                    padding-left: 1vw;

                    text-align: left;
                    font-size: 0.9vw;
                }
                .title{
                    margin-top: 2vw;
                    text-align: center;
                    font-size: 1vw;
                }
                table{
                    width: 100%;
                    border-collapse: collapse;
    
                    thead{
                        tr{
                            th{
                                height: 2vh;
                                padding-top: 1vh;
    
                                font-weight: normal;
                                font-size: 0.9vw;
                                text-align: center;
                            }
                            .fixTime{
                                width: 12%;
                            }
                            .fixReason{
                                width: 10%;
                            }
                            .fixResult{
                                width: 39%;
                            }
                            .fixNote{
                                width: 39%;
                            }
                        }
                    }
    
                    tbody{
                        tr:nth-child(odd){
                            background-color: #f2f2f2;
                            border: 0;
                        }
    
                        tr{
                            border: 0;
                            height: 5vh;
    
                            td{
                                word-wrap: break-word;
    
                                font-size: 1.1vw;
                                text-align: center;
                                font-size: 1.1vw;
                                vertical-align: center;
                            }
    
                        }
    
                    }
                }
            }
        }

        .todayTable{
            margin-left: 3vw;
            margin-right: 2vw;
        }
    }

    .linkArea{
        width: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
        button{
            display: block;
            width: 7.5vw;
            height: 6vh;
            background-color: var(--yellowLight);
            border: 1px solid var(--yellow);
            border-radius: 10px;

            font-size: 1.2vw;
            &:hover{
                cursor: pointer;
                background-color: var(--yellow);
            }
        }
    }

    // 特殊樣式：按鈕-現在頁面
    .tabBlock{
        .now{
            background-color: var(--yellow);
        }
    }

</style>