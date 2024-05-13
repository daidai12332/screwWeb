<script>
export default{
    data(){
        return{
            carbonEmissionArr:[],
            carbonEmissionShow:{},
            timerForCarbonEmission:null,
        }
    },
    mounted(){
        this.carbonEmissionArr = JSON.parse(sessionStorage.getItem('carbonEmission'));
    }
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
                <tr v-for="item in this.carbonEmissionArr" @click="this.carbonEmissionShow = item">
                    <td>{{ item.orderNumber }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.carbonEmission }}</td>
                </tr>
            </table>
        </div>
        <div class="calculateBody">
            <p class="calculateTarget">螺絲#804的排放係數</p>
            <p class="title">原料</p>
            <div class="rawCalculate eachCalculate">
                <div class="raw each">
                    <p class="materialName">
                        <span>碳鋼</span>
                    </p>
                    <p>
                        <span>係數：</span>
                        <span class="right">1.9699</span>
                    </p>
                    <p>
                        <span>使用量：</span>
                        <span class="right">1.05</span>
                    </p>
                    <span class="mutiple"><i class="fa-solid fa-xmark"></i></span>
                    <div class="divide"></div>
                    <p>
                        <span class="right product">2.0684</span>
                    </p>
                </div>
            </div>
            <p class="title">製程</p>
            <div class="produceCalculate eachCalculate">
                <div class="raw each">
                    <p class="materialName">
                        <span>電力</span>
                    </p>
                    <p>
                        <span>係數：</span>
                        <span class="right">1.9699</span>
                    </p>
                    <p>
                        <span>使用量：</span>
                        <span class="right">1.05</span>
                    </p>
                    <span class="mutiple"><i class="fa-solid fa-xmark"></i></span>
                    <div class="divide"></div>
                    <p>
                        <span class="right product">2.0684</span>
                    </p>
                </div>
            </div>
            <div class="divideForResult">
                　<i class="fa-solid fa-plus"></i>
            </div>
            <div class="result">
                <span class="left">碳排放總和</span>
                <span class="center">2.15151</span>
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
