<template>
    <div class="content">

        <div class="leftArea">

            <div class="machineStatus">
                <table>
                    <tr>
                        <th colspan=3>
                            機台狀況
                        </th>
                    </tr>
                    <tr v-for="(item, index) in this.machineDataList" @click="this.machineRow(item.name)" :style="this.hover">
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
            <MachineStatistics v-bind:mName="this.mName" />
        </div>
    </div>
</template>

<script>
import MachineStatistics from '../components/MachineStatistics.vue'
export default {
    data() {
        return {
            list:[],
            machineDataList:[],
            names: ["test1", "test2"],
            mName: "",
        }
    },
    components: {
        MachineStatistics
    },
    methods: {
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
        machineRow(n) {
            this.mName = n
        },
        
    },
    mounted() {
        this.getDataNow()
    },
}
</script>

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

                .error {
                    color: #f46464;
                }

                .run {
                    color: #73cd4a;
                }

                .idle {
                    color: #6092d8;
                }

                tr:nth-child(1){
                    pointer-events: none;
                }
                tr:nth-child(odd) {
                    background-color: rgb(242, 242, 242);
                    &:hover{
                        background: rgb(204, 204, 204);
                    }
                    cursor: pointer;
                }

                tr:nth-child(even){
                    cursor: pointer;
                    &:hover{
                        background:rgb(198, 197, 197)
                    }
                }
            }



        }
    }

    .rightArea {
        width: 40%;
        height: 150%;
        // border: 1px solid black;
        display: flex;
        flex-direction: column;

    }
}
</style>
