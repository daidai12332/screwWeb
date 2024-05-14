<script>
import Swal from 'sweetalert2'

export default{
    data(){
        return{
            // 新增單號的變數
            isAdd: false,
            // 編輯單號的變數
            isEdit: false,
            // 裝取單號資料的變數
            orderNumber: "",
            name:"",
            weight:"",
            aim:"",
            rawNumber:1,
            rawArr:[{name:"", amount:"", carbonCoefficient:""}],
            produceNumber:1,
            produceArr:[{name:"", amount:"", carbonCoefficient:""}],
        }
    },
    methods:{
        // 內部編輯功能
        // 增加原料或製程
        addRawOrProduce(type){
            let obj = {name:"", amount:"", carbonCoefficient:""};
            switch (type) {
                case "raw":
                    this.rawArr.push(obj);
                    this.rawNumber++;
                    break;
                default:
                    this.produceArr.push(obj);
                    this.produceNumber++;
            }
        },
        // 刪除原料或製程
        delRawOrProduce(type, index){
            switch (type) {
                case "raw":
                    this.rawArr.splice(index, 1);
                    this.rawNumber--;
                    break;
                default:
                    this.produceArr.splice(index, 1);
                    this.produceNumber--;
            }
        },
        // 取消
        addCancelEvent(){
            Swal.fire({
                title: "確認要取消操作嗎？",
                text: "編輯的內容無法復原",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "確認",
                cancelButtonText: "取消"
            })
            if(this.isEdit){
                this.isEdit = false;
            } else {
                this.isAdd = false;
            }
            // 顯示預設文字: 點選左側功能列表操作
        },
        // 送出
        addSubmitEvent(){
            console.log(this.rawArr);
            console.log(this.produceArr);
            // 確認 produceArr 有無的
        },
        // 哪種編輯模式
        addBtnClickEvent(){
            this.orderNumber = "";
            this.name = "";
            this.weight = "";
            this.aim = "";
            this.rawNumber = 1;
            this.rawArr = [{name:"", amount:"", carbonCoefficient:""}];
            this.produceNumber = 1;
            this.produceArr = [{name:"", amount:"", carbonCoefficient:""}],
            this.isAdd = true;
        },
        editEvent(){

        },
        delEvent(){

        }
    }
}
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <div class="orderBody">
        <div class="orderList">
            <table>
                <tr>
                    <th colspan=2>
                        單號列表
                    </th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>螺絲起子bla#4125</td>
                </tr>
            </table>
            <button type="button" class="addOrder" @click="addBtnClickEvent">
                新增單號
            </button>
        </div>
        <p v-if="!this.isAdd && !this.isEdit">點選左側列表操作</p>
        <div class="orderDetail" v-if="this.isAdd || this.isEdit">
            <h1 v-if="this.isEdit">現在瀏覽的單號</h1>
            <h1 v-if="this.isAdd">新增單號</h1>
            <p v-if="this.isAdd" class="oneLine">
                <label for="">單號　　</label>
                <input type="text" :disabled="!this.isAdd && !this.isEdit" v-model.lazy="this.orderNumber">
            </p>
            <p class="oneLine">
                <label for="">品名　　</label>
                <input type="text" :disabled="!this.isAdd && !this.isEdit" v-model.lazy="this.name">
            </p>
            <p class="oneLine">
                <label for="">重量　　</label>
                <input type="number" :disabled="!this.isAdd && !this.isEdit" v-model.lazy="this.weight">
                <span>公克／顆</span>
            </p>
            <p class="oneLine">
                <label for="">訂購總量</label>
                <input type="number" :disabled="!this.isAdd && !this.isEdit" v-model.lazy="this.aim">
                <span>顆</span>
            </p>
            <div class="rawDetail inputDetail">
                <table>
                    <tr>
                        <th scope="col" :rowspan="this.rawNumber+1" class="inputTitle">原料</th>
                        <th scope="col" class="name">名稱</th>
                        <th scope="col">碳排係數</th>
                        <th scope="col">使用量（噸）</th>
                        <th scope="col" v-if="this.isAdd||this.isEdit"></th>
                    </tr>
                    <tr v-for="count in this.rawNumber">
                        <td><input type="text" :disabled="!this.isAdd && !this.isEdit" v-model.lazy="this.rawArr[count-1].name"></td>
                        <td><input type="number" :disabled="!this.isAdd && !this.isEdit" v-model.lazy="this.rawArr[count-1].carbonCoefficient"></td>
                        <td><input type="number" :disabled="!this.isAdd && !this.isEdit" v-model.lazy="this.rawArr[count-1].amount"></td>
                        <td  v-if="this.isAdd||this.isEdit"><i class="fa-solid fa-xmark" @click="delRawOrProduce('raw', count-1)"></i></td>
                    </tr>
                    <tr v-if="this.isAdd||this.isEdit">
                        <td colspan="4">
                            <button type="button" class="addBtn" @click="addRawOrProduce('raw')"><i class="fa-solid fa-plus"></i></button>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="produceDetail inputDetail">
                <table>
                    <tr>
                        <th scope="col" :rowspan="this.produceNumber+1" class="inputTitle">製程</th>
                        <th scope="col" class="name">名稱</th>
                        <th scope="col">使用量（單位）</th>
                        <th scope="col" class="deleteCol" v-if="this.isAdd||this.isEdit"></th>
                    </tr>
                    <tr  v-for="count in this.produceNumber">
                        <td><select :disabled="!this.isAdd && !this.isEdit" v-model.lazy="this.produceArr[count-1].name">
                            <option value="">請選擇</option>
                            <option value="天然氣">天然氣</option>
                            <option value="電力">電力</option>
                        </select></td>
                        <td><input type="number" :disabled="!this.isAdd && !this.isEdit" v-model.lazy="this.produceArr[count-1].amount">（<span>立方公尺</span>）</td>
                        <td v-if="this.isAdd||this.isEdit"><i class="fa-solid fa-xmark" @click="delRawOrProduce('produce', count-1)"></i></td>
                    </tr>
                    <tr v-if="this.isAdd||this.isEdit">
                        <td colspan="3">
                            <button type="button" class="addBtn" @click="addRawOrProduce('produce')"><i class="fa-solid fa-plus"></i></button>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="operateButton">
                <button type="button" v-if="!isAdd && !isEdit" @click="editEvent">編輯</button>　　
                <button type="button" v-if="!isAdd && !isEdit" @click="delEvent">刪除</button>
                <button type="button" v-if="isAdd || isEdit" @click="addCancelEvent">取消</button>　　
                <button type="button" v-if="isAdd || isEdit" @click="addSubmitEvent">送出</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.orderBody{
    display: flex;
    .orderList{
        margin-top: 2vw;
        margin-left: 2vw;
        width: 20vw;;
        .addOrder{
            width: 7vw;
            height: 3vw;
            margin-top: 1vw;
            margin-left: 6.4vw;
        }
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
    .orderDetail{
        margin-top: 2vw;
        margin-left: 4vw;
        h1{
                margin-bottom: 2vw;
            }
        .oneLine{
            margin-bottom: 1vw;
            font-size: 1.3vw;
            label{
                margin-right: 2vw;
            }
            input{
                padding-top: 0.2vw;
                padding-bottom: 0.2vw;
                padding-left: 0.5vw;
                width: 20vw;
                font-size: 1.3vw;   
                margin-right: 1vw;
            }             
        }
        .inputDetail{
            table {
                margin-top: 2vw;
                width: 100%;
                border: 2px solid rgb(206, 206, 206);
                border-collapse: collapse;
                td {
                    padding: 10px;
                    text-align: center;
                    input{
                        font-size: 1.3vw;
                        padding: 0.2vw;
                        text-align: center;
                    }
                    select{
                        width: 100%;
                        font-size: 1.3vw;
                        padding: 0.2vw;
                        text-align: center;                        
                    }
                    .fa-xmark{
                        font-size: 1.5vw;
                        margin-right: 1vw;
                        &:hover{
                            color: red;
                            cursor: pointer;
                        }
                    }
                }
                tr{
                    .deleteCol{
                        width: 1vw;
                    }
                    .name{
                        width: 18vw;
                    }
                    .addBtn{
                        cursor: pointer;
                        margin-left: 3vw;
                        margin-top: 0.1vw;
                        width: 95%;
                        height: 2vw;                   
                    }
                }
                tr:nth-child(1) {
                    background-color: rgb(242, 242, 242);
                    height: 2vw;
                }
                .inputTitle{
                    width: 2vw;
                    font-size: 1.3vw;   
                    padding-left: 0.5vw;
                    padding-right: 0.5vw;
                }
            }
            // .addBtn{
            //         margin-left: 3vw;
            //         margin-top: 0.1vw;
            //         border: 1px solid black;
            //         background-color: rgb(242, 242, 242);
            //         width: 95%;
            //         height: 2vw;                   
            //     }
        }
        .operateButton{
            margin-top: 2vw;
            text-align: center;
            button{
                width: 7vw;
                height: 4vw;
                font-size: 1.2vw;
                cursor: pointer;
            }
        }
    }
}
</style>