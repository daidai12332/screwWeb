<script>
export default {
    data() {
        return {
            list: [],
            list2: [],
            list3: [],
            list4:[],
            machineNameList: [],
            addMachineName: "",
            deleteMachineName: [],
            voltage: 220,
        }
    },
    methods: {
        getMachineName() {
            let obj = {

            }
            fetch("http://localhost:8080/screw/findMachineName", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then((data) => {
                    this.list.length = 0;
                    this.machineNameList.length = 0;
                    this.list.push(data)
                    // console.log(this.list[0].machineNameList)
                    this.list[0].machineNameList.forEach((item, index) => {
                        this.machineNameList.push(item);
                    });

                    // console.log(this.machineNameList)
                })
        },
        addMachine() {
            let obj = {
                name: this.addMachineName
            }
            fetch(`http://localhost:8080/screw/addMachine?name=${this.addMachineName}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then((data) => {
                    this.list2.length = 0;
                    this.list2.push(data)
                    // console.log(this.list2)

                })
        },
        deleteMachine() {
            let obj = {
                machineName_list: this.deleteMachineName
            }
            fetch(`http://localhost:8080/screw/deleteMachine`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then((data) => {
                    // this.list3.length = 0;
                    // this.list3.push(data)
                    // console.log(this.deleteMachineName)
                    // console.log(this.list3)
                    // this.deleteMachineName.length = 0

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
            this.list4.length = 0
            this.list4.push(data)
            this.voltage = this.list4[0].voltage
            // console.log(this.voltage)
            
        })
    },
        changeVoltage() {
            let obj = {
                data_run_avg: this.voltage
            }
            fetch(`http://localhost:8080/screw/updateVoltage?data_run_avg=${this.voltage}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then((data) => {
                    
                })
            console.log(this.voltage)
        }
    },
    beforeCreate() {
            if(!sessionStorage.getItem("account")){
                this.$router.push('/Login');
            }
        },
    mounted() {
        this.getMachineName()
        this. getVoltage()
    },
    updated() {
        this.getMachineName()
    },
}
</script>

<template>
    <div class="content">
        <div class="leftArea">
            <div class="topArea">
                <h3>工廠基本設施</h3>
                <span>電壓(V)</span>
                <input type="number" v-model="this.voltage" @keydown="this. changeVoltage()">
            </div>

            <div class="bottomArea">
                <h3>設備管理</h3>
                <span>設備名稱</span>
                <div class="checkbox">
                    <div class="label">
                        <label for="" v-for="(item, index) in this.machineNameList">{{ item.name }}</label>
                    </div>
                    <div class="input">
                        <input type="checkbox" v-for="(item, index) in this.machineNameList" :value="item.name"
                            v-model="this.deleteMachineName" name="nameList">
                    </div>
                </div>
            </div>
        </div>
        <div class="rightArea">
            <input type="text" v-model="this.addMachineName">
            <p>　</p>
            <button type="button" @click="this.addMachine()">新增設備</button>

            <div class="delete">
                <button type="button" @click="this.deleteMachine()">刪除設備</button>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 100vh;
    display: flex;
    // border: 1px solid black;

    .leftArea {
        width: 40%;
        height: 100%;
        // border: 1px solid black;
        margin-left: 15%;

        .topArea {
            width: 100%;
            height: 15%;
            // border: 1px solid black;
            margin-top: 5%;

            span {
                display: inline-block;
                margin-left: 21%;
                margin-top: 3%;
            }

            input {
                display: inline-block;
                margin-left: 21%;
            }
        }

        .bottomArea {
            width: 100%;
            height: 80%;
            // border: 1px solid black;
            margin-top: 5%;


            span {
                display: inline-block;
                margin-left: 21%;
                margin-top: 3%;
                display: flex;
                flex-direction: column;

            }

            .checkbox {
                width: 50%;
                height: 70vh;
                // border: 1px solid black;
                display: flex;
                justify-content: space-evenly;
                margin-left: 8%;

                .label {
                    display: flex;
                    flex-direction: column;
                    width: 70%;
                    height: 90%;
                    text-align: center;

                    label {
                        margin: 10px;
                    }
                }

                .input {
                    display: flex;
                    flex-direction: column;
                    width: 20%;
                    height: 90%;
                    text-align: center;

                    input {
                        margin: 13px;
                    }

                }
            }
        }
    }

    .rightArea {
        width: 20%;
        height: 50%;
        // border: 1px solid black;
        margin-top: 12%;

        input {
            height: 7%;
        }

        p {
            height: 4%;
        }

        button {
            width: 30%;
            height: 10%;
            font-size: 14px;
        }

        .delete {
            height: 100%;
            width: 100%;
            margin-top: 5%;
        }
    }
}
</style>