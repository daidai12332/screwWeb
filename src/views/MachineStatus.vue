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
                    <tr v-for="(item, index) in this.names" @click="this.machineRow(item)">
                        <td>　　{{ item }}</td>
                        <td>running　　</td>
                        <td>1</td>
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
            names:["test1","test2"],
            mName:"",
        }
    },
    components:{
        MachineStatistics
    },
    methods: {
        machineRow(n){
            this.mName = n
        }
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
                }

                tr:nth-child(odd) {
                    background-color: rgb(242, 242, 242);
                }
            }


        }
    }

    .rightArea{
        width: 40%;
        height: 100%;
        // border: 1px solid black;
        display: flex;
        flex-direction: column;
        
    }
}
</style>
