<script>
export default{
    data(){
        return{
            indexWatching: 0,
            carbonEmissionArr:[],
            // 目前正在查看的單號
            carbonEmissionShow:{},
            timerForCarbonEmission:null,
        }
    },
    methods:{
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
                this.carbonEmissionArr = data.calculateList;
                this.carbonEmissionShow = data.calculateList[this.indexWatching];
            });
        },
        clickEvent(item, index){
            this.carbonEmissionShow = item;
            this.indexWatching = index;
        }
    },
    mounted(){
        this.fetchCarbonEmission();
        this.timerForCarbonEmission = setInterval(()=>{
            setTimeout(this.fetchCarbonEmission, 0)
        }, 60000)
    },
    beforeUnmount() {
        clearInterval(this.timerForCarbonEmission);
        this.timerForCarbonEmission = null;
    },
}
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <div class="carbonBody">
        <div class="carbonEmissions">
            <table>
                <tr>
                    <th colspan=3>
                        碳排放
                    </th>
                </tr>
                <tr v-for="(item, index) in this.carbonEmissionArr" @click="clickEvent(item, index)">
                    <td>{{ item.orderNumber }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.carbonEmission }}</td>
                </tr>
            </table>
        </div>
        <div class="calculateBody">
            <p class="calculateTarget">{{ this.carbonEmissionShow.name }}</p>
            <p class="title">原料</p>
            <div class="rawCalculate eachCalculate">
                <div class="raw each" v-for="item in this.carbonEmissionShow.raw">
                    <p class="materialName">
                        <span>{{ item.name }}</span>
                    </p>
                    <p>
                        <span>係數：</span>
                        <span class="right">{{ item.carbonCoefficient }}</span>
                    </p>
                    <p>
                        <span>使用量：</span>
                        <span class="right">{{ item.amount }}</span>
                    </p>
                    <span class="mutiple"><i class="fa-solid fa-xmark"></i></span>
                    <div class="divide"></div>
                    <p>
                        <span class="right product">{{ item.carbonCoefficient*item.amount }}</span>
                    </p>
                </div>
            </div>
            <p class="title">製程</p>
            <div class="produceCalculate eachCalculate">
                <div class="produce each" v-for="item in this.carbonEmissionShow.process">
                    <p class="materialName">
                        <span>{{ item.name }}</span>
                    </p>
                    <p>
                        <span>係數：</span>
                        <span class="right">{{ item.carbonCoefficient }}</span>
                    </p>
                    <p>
                        <span>使用量：</span>
                        <span class="right">{{ item.amount }}</span>
                    </p>
                    <p>
                        <span>總量：</span>
                        <span class="right">1/{{ item.aim*item.weight }}</span>
                    </p>
                    <span class="mutiple"><i class="fa-solid fa-xmark"></i></span>
                    <div class="divide"></div>
                    <p>
                        <span class="right product">{{ item.carbonCoefficient*item.amount/(item.aim*item.weight) }}</span>
                    </p>
                </div>
            </div>
            <div class="divideForResult">
                　<i class="fa-solid fa-plus"></i>
            </div>
            <div class="result">
                <span class="left">碳排放總和</span>
                <span class="center">{{ this.carbonEmissionShow.carbonEmission }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.carbonBody{
    display: flex;
    justify-content: space-between;
    padding-left: 2vw;
    padding-right: 6vw;
    .carbonEmissions {
        margin-top: 5vw;
        margin-left: 4.5vw;
        width: 30%;
        height: 48%;
        border: 1px solid black;
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
    .calculateBody{
        margin-top: 5vw;
        width: 60%;
        .title{
            width: 100%;
            text-align: center;
            margin-bottom: 1%
        }
        .calculateTarget{
            text-align: center;
            margin-bottom: 2%;
            font-size: large;
        }
        .eachCalculate{
            flex-wrap: wrap;
            display: flex;
            justify-content: center;
            .each{
                width: 20%;
                background-color: rgb(245, 244, 244);
                padding: 2.5%;
                padding-bottom: 1%;
                margin-bottom: 4%;
                .materialName{
                    text-align: center;
                    margin-bottom: 6%;
                }
                p{
                    display: flow-root;
                    margin-bottom: 3%;
                    .right{
                        float: right;
                    }
                    .product{
                        font-weight: 800;
                    }
                }
                span{
                    i{
                        font-size: 1.3vw;
                        margin-top: 1.5%;
                    }
                }
                .mutiple{
                    display: block;
                    margin-top: 8%;
                }
                .divide{
                    margin-top: 2%;
                    margin-bottom: 4%;
                    width: 100%;
                    border-top: 1px solid black;
                }
            }
        }
    }
    .divideForResult{
        width: 100%;
        border-bottom: 2px solid black;
        padding-bottom: 1%;
        margin-bottom: 1%;
    }
    .result{
        text-align: center;
        display: flow-root;
        .left{
            float: left;
        }
    }
    margin-bottom: 5vw;
}
</style>
