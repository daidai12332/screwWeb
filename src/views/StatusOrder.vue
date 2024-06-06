<script>
import List from '../components/statusOrder/List.vue'
import ListShow from '../components/statusOrder/ListShow.vue'

export default{

    mounted() {

    },

    methods: {
        changeMode(){
            this.isList = !this.isList;
        },

        getData1(name){

            // 進入資料庫
            fetch(`http://localhost:8080/orderManagement/find_order_all`,{
                method: 'GET',
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

                if(!data.orderManagementList){
                    return;
                }

                for(let index in data.orderManagementList){
                    if(data.orderManagementList[index].orderNumber === name){
                        this.data1 = data.orderManagementList[index]
                    }
                }
                this.staticData1 = data.equipmentHourList;

            });

        },

        getData2(name){

            return;
            // 進入資料庫
            fetch(`http://localhost:8080/orderManagement/get_order_manufacture?${name}`,{
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

                if(!data.orderManufacture){
                    return;
                }

                this.data2 = data.orderManufacture;

            });


        },

        getDetail(detail){
            this.getData1(detail);
            this.getData2(detail);
        }

    },
    
    data() {
        return {
            isList: true,
            dataShow: null,
            data1: "",
            data2: "",
            formingString:{
                raw:[
                    {
                        name: '鍛造螺絲',
                        amount: 1.05,
                        carbon: 2.474,
                    }
                ],
                process:[
                    {
                        name: '電力',
                        amount: 24000,
                        carbon: 0.475,
                    }
                ]
            },

        }
    },
    components: {
        List,
        ListShow
    },
}
</script>

<template>

    <div class="statusOrder">

        <div class="titleArea">
            <p class="title">單號詳細資訊</p>
            <!-- <button class="listBtn" :class="{ now : this.isList}" @click="changeMode">清單</button>
            <button class="displayBtn" :class="{ now : !this.isList}" @click="changeMode">布局</button> -->
        </div>

        <div class="listArea">
            <List @sendMachineDetail="getDetail"  />
        </div>

        <div class="showArea">
            <ListShow :data1="this.data1" :data2="this.data2" />
        </div>
    </div>

</template>

<style lang="scss" scoped>
    // 基本樣式
    .statusOrder{
        width: 100%;
        height: 100%;
        
        .titleArea{
            width: 98%;
            height: 1.5vw;
            margin-top: 1%;
            margin-left: 1%;
            
            position: relative;

            .title{
                width: 100%;
                height: 100%;
                background-color: var(--green);
                border-radius: 10px 10px 0px 0px;
    
                color: white;
                text-align: center;
                line-height: 1.6vw;
                font-size: 0.95vw;
            }

            button{
                cursor: pointer;
                width: 4%;
                height: 100%;
                border: 2px solid var(--green);
                border-bottom: 2px solid var(--green);
                border-radius: 15px 5px 0px 0px;
                background-color: white;

                font-size: 1vw;
                color: #5E5E5E;
                line-height: 150%;

                position: absolute;
                top: 0%;
                left: 2%;
            }
            .displayBtn{
                left: 6%;
            }
        }
    }

    // 特殊樣式：正在瀏覽的分頁
    .statusOrder{
        .titleArea{
            .now{
                border-bottom: 2px solid white;
            }
        }
    }

    // 框架
    .statusOrder{
        
        .listArea{
            // border: 1px solid black;
            width: 98%;
            height: 42%;
            margin-top: 0.5%;
            margin-left: 1%;

        }

        .showArea{
            // border: 1px solid black;
            width: 98%;
            height: 48%;
            margin-top: 1%;
            margin-left: 1%;
        }

    }
</style>