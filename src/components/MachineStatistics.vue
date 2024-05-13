<template>
    <div class="chartArea">

        <div class="block">
            <span>狀態比例　　</span>
            <span>週</span>
            <span>　　</span>
            <span>月</span>
            <span>　　</span>
            <span>年</span>
        </div>
        <v-chart class="chart" :option="this.option1" />

        <div class="block">
            <span>平均電流　　</span>
            <span>週</span>
            <span>　　</span>
            <span>月</span>
            <span>　　</span>
            <span>年</span>
        </div>
        <v-chart class="chartLine" :option="this.option2" />

        <div class="block">
            <span>平均良率　　</span>
                <span>週</span>
                <span>　　</span>
                <span>月</span>
                <span>　　</span>
                <span>年</span>
        </div>
        <v-chart class="chartLine" :option="this.option3" />

    </div>
    <!-- <p>{{this.mName}}</p> -->
    
</template>

<script>
import * as echarts from 'echarts/core';
import {
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
} from 'echarts/components';

import {
    BarChart,
    LineChart
} from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { UniversalTransition } from 'echarts/features';
import VChart, { THEME_KEY } from 'vue-echarts';

echarts.use([
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer,
    LineChart,
    UniversalTransition
]);
export default {
    data() {
        return {
            option1: {
                legend: {},
                tooltip: {},
                dataset: {
                    source: [
                        ['status', 'running', 'idel', 'error'],
                        ['週', '11', '22', '33'],
                        ['月', '5', '77', '66'],
                        ['年', '44', '33', '55'],
                        
                    ]
                },
                xAxis: { type: 'category' },
                yAxis: {},
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series: [{
                    type: 'bar',
                    // 此系列自己的调色盘。
                    color: [
                        '#9ADE7B',
                    ]

                },
                {
                    type: 'bar',
                    // 此系列自己的调色盘。
                    color: [
                        '#6895D2',
                    ]

                },
                {
                    type: 'bar',
                    // 此系列自己的调色盘。
                    color: [
                        '#FF8F8F',
                    ]

                }


                ]
            },
            option2: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [150, 230, 224, 218, 135, 147, 260],
                        type: 'line'
                    }
                ]
            },
            option3: {
                xAxis: {
                    type: 'category',
                    data: ['Mo', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [150, 230, 224, 218, 135, 147, 160],
                        type: 'line'
                    }
                ]
            }
        }
    },
    props: [
        "mName",

    ],
    components: {
        VChart,
    },
    provide: {
        [THEME_KEY]: 'light',
    },
    mounted() {
        
        // console.log(this.option1.dataset.source[0][0])
    },
    updated() {
        // this.option1.dataset.source[0][0] = this.mName
        // console.log(this.option1.dataset.source[0][0])
    },
}
</script>

<style lang="scss" scoped>
    .chartArea{
        // text-align: center;
        width: 100%;
        height: 150vh;
        // position: relative;
        // border: 1px solid black;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        

        .chart {
            width: 100%;
            height: 25%;
            background: rgb(249, 248, 248);
            // .canvas{
            //     height: 20%;
            // }
        }
        .chartLine{
            width: 100%;
            height: 25%;
            // .canvas{
            //     height: 20%;
            // }
            background: rgb(249, 248, 248);
        }

        
    }
</style>