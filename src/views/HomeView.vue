<script>
import * as echarts from 'echarts/core';
import {
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import VChart, { THEME_KEY } from 'vue-echarts';

echarts.use([
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer
]);
export default {
    data() {
        return {

            list: [],
            list2: [],
            list3: [],
            voltage: 10.0,
            runElectricity: 10.0,
            idleElectricity: 10.0,
            errorElectricity: 10.0,
            totalElectricity: 10.0,
            machineDataList: [],
            carbonEmissionShow: [],
            timerForCarbonEmission: null,

            option: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // Use axis to trigger tooltip
                        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                    }
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['0', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23']
                    
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [320, 302, 301, 334, 390, 330, 320]
                    },
                    {
                        name: 'Mail Ad',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: 'Affiliate Ad',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: 'Video Ad',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [150, 212, 201, 154, 190, 330, 410]
                    },
                    {
                        name: 'Search Engine',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [820, 832, 901, 934, 1290, 1330, 1320]
                    }
                ]
            },
        }
    },
    methods: {
        clickCarbonEmission() {
            sessionStorage.setItem('carbonEmission', JSON.stringify(this.carbonEmissionShow));
            this.$router.push('/CarbonEmission');
        },
        fetchCarbonEmission() {
            fetch("http://localhost:8080/forestage/search", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(res => res.json())
                .then((data) => {
                    if (data.code != 200) {
                        console.log(data);
                        return;
                    }
                    this.carbonEmissionShow = data.calculateList;
                    // console.log(this.carbonEmissionShow);
                });
        },
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
                    // console.log(this.list[0].machineData)
                    this.list[0].machineData.forEach((item, index) => {
                        this.machineDataList.push(item);
                    });

                    // console.log(this.machineDataList)
                })
        },
        getVoltage() {
            let obj = {

            }
            fetch("http://localhost:8080/screw/getVoltage", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then((data) => {
                    this.list2.length = 0
                    this.list2.push(data)
                    this.voltage = this.list2[0].voltage
                    // console.log(this.voltage)

                })
        },
        getElectricity() {
            let obj = {
                data_run_avg: this.voltage
            }
            fetch(`http://localhost:8080/screw/electricityPeriod?data_run_avg=${this.voltage}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then((data) => {
                    this.list3.length = 0
                    this.list3.push(data)
                    this.runElectricity = Math.round(this.list3[0].runElectricity)
                    this.idleElectricity = Math.round(this.list3[0].idleElectricity)
                    this.errorElectricity = Math.round(this.list3[0].errorElectricity)
                    this.totalElectricity = this.runElectricity + this.idleElectricity + this.errorElectricity
                    this.option.series[0].data[0].value = this.runElectricity
                    this.option.series[0].data[1].value = this.idleElectricity
                    this.option.series[0].data[2].value = this.errorElectricity
                    // console.log(this.totalElectricity)

                })
        }
    },
    components: {
        VChart,
    },
    provide: {
        [THEME_KEY]: 'light',
    },
    mounted() {
        this.fetchCarbonEmission();
        this.timerForCarbonEmission = setInterval(() => {
            setTimeout(this.fetchCarbonEmission, 0)
        }, 60000)
        // this.getDataNow()
        // this.getVoltage()
    },
    beforeUnmount() {
        clearInterval(this.timerForCarbonEmission);
        this.timerForCarbonEmission = null;
    },
    updated() {
        // this.getElectricity()
    }

}
</script>

<template>
    <div class="content">

        <div class="leftArea">

            <div class="machineStatus">
                <p><RouterLink class="routeItem" to="/MachineStatus"
                                style="text-decoration: none; color: inherit">機台最新資訊</RouterLink></p>
                <span>　機器編號 </span>
                <span>　 狀態　</span>
                <span>　　 單號　</span>
                <span>　　產量　</span>
                <span>　更新時間</span>

                <table>
                    <tr><td>test_1</td>
                        <td>run</td>
                        <td>1</td>
                        <td>1111</td>
                        <td>12:00</td>
                    </tr>
                    <tr v-for="(item, index) in this.machineDataList">
                        <td>{{ item.name }}</td>
                        <td v-if="item.status == 'error'" class="error">{{ item.status }}</td>
                        <td v-else-if="item.status == 'run'" class="run">{{ item.status }}</td>
                        <td v-else="item.status == 'idle'" class="idle">{{ item.status }}</td>
                        <td>{{ item.orderNumber }}</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="rightArea">
            <div class="chartArea">
                <h4>今日累積數值</h4>
                <div class="Electricity">
                    <div class="time">
                        <h3>Total</h3>
                        <p>{{ this.totalElectricity }}</p>
                    </div>
                    <v-chart class="chart" :option="this.option" />
                    <div class="totalData">
                        <div class="block">
                            <p >累積耗電量</p>
                            <div class="innerBlock">
                                <p >1312
                                    <p>瓦</p>
                                </p>
                                
                            </div>
                        </div>
                        <div class="block">
                            <p>累積生產量</p>
                            <div class="innerBlock">
                                <p class="result">1424
                                    <p>顆</p>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="carbonEmissions">
                <table>
                    <tr>
                        <th colspan=3 @click="clickCarbonEmission">
                            碳排放
                        </th>
                    </tr>
                    <tr v-for="item in this.carbonEmissionShow">
                        <td>{{ item.orderNumber }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.carbonEmission }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    display: flex;
    width: 100%;
    height: 100vh;
    margin-top: 3%;
    // border: 1px solid black;
    // justify-content: space-evenly;

    .leftArea {
        width: 30%;
        height: 90%;
        margin-left: 4%;
        // border: 1px solid black;
        .machineStatus {
            width: 100%;
            height: 100%;
            // border: 1px solid black;

            p{
                width: 100%;
                height: 5%;
                border: 1px solid black;
                text-align: center;
                padding-top: 1%;
                border-radius: 5px;
            }
            span{
                font-size: 15px;
            }
            table {
                width: 100%;
                border: 2px solid rgb(206, 206, 206);
                border-collapse: collapse;

                td {
                    // padding: 5px;
                    width: 13%;
                    text-align: center;
                }

                .error {
                    color: #f46464;
                }

                .run {
                    color: #73cd4a;
                }

                .idle {
                    color: #6092d8;
                }

                tr:nth-child(odd) {
                    background-color: rgb(242, 242, 242);
                }
            }


        }
    }

    .rightArea {
        width: 60%;
        height: 90%;
        // border: 1px solid black;
        margin-left: 3%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .chartArea {
            width: 100%;
            height: 44%;
            border: 2px solid rgb(206, 206, 206);

            h4 {

                text-align: center;
                background: rgb(242, 242, 242);
            }

            .Electricity {
                width: 100%;
                height: 92%;
                // border: 1px solid black;
                display: flex;

                .time {
                    width: 20%;
                    height: 50%;
                    // border: 1px solid black;
                    text-align: center;
                    margin-top: 15%;
                }

                .chart {
                    width: 58%;
                    height: 90%;
                    // border: 1px solid black;
                }

                .totalData{
                    width: 25%;
                    height: 80%;
                    // border: 1px solid black;
                    margin-top: 2%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    .block{
                        display: flex;
                        width: 100%;
                        height: 40%;
                        align-items:center;
                        // border: 1px solid black;

                        .innerBlock{
                            text-align: center;
                                padding-top: 7%;
                                width: 35%;
                                height: 70%;
                                border-radius: 100%;
                                border: 10px solid black;
                                margin-left: 8%;
                            
                        }

                        p{
                            // border: 1px solid black;
                        }
                        
                    }
                }
            }

        }

        .carbonEmissions {
            width: 100%;
            height: 48%;
            // border: 1px solid black;

            table {
                width: 100%;
                border: 2px solid rgb(206, 206, 206);
                border-collapse: collapse;

                td {
                    padding: 10px;
                }

                tr:nth-child(odd) {
                    background-color: rgb(242, 242, 242);
                }
            }

        }
    }
}
</style>
