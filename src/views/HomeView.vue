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
                        name: 'Access From',
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
                            { value: 1048, name: 'Running' },
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
    components: {
        VChart,
    },
    provide: {
        [THEME_KEY]: 'light',
    },

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
                    <tr>
                        <td>　　test_1</td>
                        <td>running　　</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>　　test_1</td>
                        <td>running　　</td>
                        <td>1</td>
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
                        <th colspan=3>碳排放</th>
                    </tr>
                    <tr>
                        <td>　　不鏽鋼304　　</td>
                        <td>大扁頭 十字孔 機械牙螺絲 #8-32X1</td>
                        <td>1.2024</td>
                    </tr>
                    <tr>
                        <td>　　不鏽鋼304　　</td>
                        <td>大扁頭 十字孔 機械牙螺絲 #8-32X1</td>
                        <td>1.2024</td>
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
