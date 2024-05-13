<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);
export default {
    data() {
        return {

            list:[],
            list2:[],
            list3:[],
            voltage:10.0,
            machineDataList:[],

            carbonEmissionShow:[],
            timerForCarbonEmission:null,

            option: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '1%',
                    left: 'center'
                },
                series: [
                    {
                        name: '電度',
                        type: 'pie',
                        radius: ['50%', '80%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 20,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: 'Run' },
                            { value: 735, name: 'Idel' },
                            { value: 580, name: 'Error' },
                        ],
                        color: [
                            '#9ADE7B',
                            '#6895D2',
                            '#FF8F8F',
                        ]
                    }
                ]
            },
        }
    },
    methods:{
        clickCarbonEmission(){
            sessionStorage.setItem('carbonEmission', JSON.stringify(this.carbonEmissionShow));
            this.$router.push('/CarbonEmission');
        },
        fetchCarbonEmission(){
            fetch("http://localhost:8080/forestage/search",{
                method: 'GET',
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
                this.carbonEmissionShow = data.calculateList;
                console.log(this.carbonEmissionShow);
            });
        },
        getDataNow(){
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
        .then((data) =>{
            this.list.length = 0;
            this.list.push(data)
            // console.log(this.list[0].machineData)
            this.list[0].machineData.forEach((item,index) => {
                this.machineDataList.push(item);
            });

            // console.log(this.machineDataList)
        })
    },
    getVoltage(){
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
        .then((data) =>{
            this.list2.length = 0
            this.list2.push(data)
            this.voltage = this.list2[0].voltage
            console.log(this.voltage)
            
        })
    },
    getElectricity(){
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
        .then((data) =>{
            this.list3.push(data)
            
            console.log(this.list3)
            
        })
    }
    },
    components: {
        VChart,
    },
    provide: {
        [THEME_KEY]: 'light',
    },
    mounted(){
        this.fetchCarbonEmission();
        this.timerForCarbonEmission = setInterval(()=>{
            setTimeout(this.fetchCarbonEmission, 0)
        }, 60000)
        this.getDataNow()
        this.getVoltage()
    },
    beforeUnmount() {
        clearInterval(this.timerForCarbonEmission);
        this.timerForCarbonEmission = null;
    },
    updated() {
        this.getElectricity()
    }

}
</script>

<template>
    <div class="content">

        <div class="leftArea">

            <div class="machineStatus">
                <table>
                    <tr>
                        <th colspan=3>
                            <RouterLink class="routeItem" to="/MachineStatus"
                                style="text-decoration: none; color: inherit">機台狀況</RouterLink>
                        </th>
                    </tr>
                    <tr v-for="(item, index) in this.machineDataList" >
                        <td>{{item.name}}</td>
                        <td v-if="item.status == 'error'" class="error">{{item.status}}</td>
                        <td v-else-if="item.status == 'run'" class="run">{{item.status}}</td>
                        <td v-else="item.status == 'idle'" class="idle">{{item.status}}</td>
                        <td>{{item.orderNumber}}</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="rightArea">
            <div class="chartArea">
                <h4>當前累積電度</h4>
                <v-chart class="chart" :option="this.option" />
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
    justify-content: space-evenly;

    .leftArea {
        width: 35%;
        height: 90%;

        // border: 1px solid black;
        .machineStatus {
            width: 100%;
            height: 100%;

            // border: 1px solid black;
            table {
                width: 100%;
                border: 2px solid rgb(206, 206, 206);
                border-collapse: collapse;

                td {
                    padding: 10px;
                    width: 33%;
                    text-align: center;
                }

                .error{
                    color: #f46464;
                }

                .run{
                    color: #73cd4a;
                }

                .idle{
                    color: #6092d8;
                }

                tr:nth-child(odd) {
                    background-color: rgb(242, 242, 242);
                }
            }


        }
    }

    .rightArea {
        width: 40%;
        height: 90%;
        // border: 1px solid black;
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

            .chart {

                width: 100%;
                height: 90%;
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
