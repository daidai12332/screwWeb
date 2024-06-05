
<script>
import List from '../components/statusMachine/List.vue'
import ListShow from '../components/statusMachine/ListShow.vue'

export default {
    // mounted() {
    //     console.log("MachineStatus");
    //     // 修改所在介面顏色
    //     const showService = useShowStore();
    //     showService.modeChange(1);
    //     console.log(showService.mode);
    //     // 獲得機台資料
    //     this.getDataNow();
    // },

    methods: {
        changeMode(){
            this.isList = !this.isList;
        },
    },

    data() {
        return {
            isList: true,
            dataShow: null,
            // list:[],
            // machineDataList:[],
            // names: ["test1", "test2"],
            // mName: "",
            // machineStatusPage:0,
            // machinePageNumber:0,

        }
    },
    components: {
        List,
        ListShow
    },
}
</script>

<template>
    <div class="statusMachine">

        <div class="titleArea">
            <p class="title">機台詳細資訊</p>
            <!-- <button class="listBtn" :class="{ now : this.isList}" @click="changeMode">清單</button>
            <button class="displayBtn" :class="{ now : !this.isList}" @click="changeMode">布局</button> -->
        </div>

        <div class="listArea">
            <List />
        </div>

        <div class="showArea">
            <ListShow />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    // 基本樣式
    .statusMachine{
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
                background-color: var(--yellow);
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
                border: 2px solid var(--yellow);
                border-bottom: 2px solid var(--yellow);
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
    .statusMachine{
        .titleArea{
            .now{
                border-bottom: 2px solid white;
            }
        }
    }

    // 框架
    .statusMachine{
        
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
