<template >
    <div class="content">
        <div class="leftArea">
            <div class="bar">
                <h3>管理設備</h3>
                <h3>管理單號資訊</h3>
            </div>
        </div>

        <div class="rightArea">
            <div class="topArea">
                <h3>工廠基本設施</h3>
                <span>電壓</span>
                <span>220V</span>
            </div>

            <div class="bottomArea">
                <h3>設備管理</h3>
                <span>設備名稱　　　　　　添購日期
                    <ul>
                        <li>　test1</li>
                    </ul>
                </span>
                
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .content{
        width: 100%;
        height: 100vh;
        display: flex;
        .leftArea{
            width: 20%;
            height: 100%;
            // border: 1px solid black;
            background: rgb(242, 242, 242);
            .bar{
                width: 100%;
                height: 10%;
                border-top: 1px solid black;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                text-align: center;
                h3{
                    width: 100%;
                    height: 49%;
                    border-left: 1px solid black;
                    border-right: 1px solid black;
                    border-bottom: 1px solid black;
                }
            }
        }

        .rightArea{
            width: 40%;
            height: 100%;
            // border: 1px solid black;
            margin-left: 15%;

            .topArea{
                width: 100%;
                height: 15%;
                // border: 1px solid black;
                margin-top: 5%;

                span{
                    display: inline-block;
                    margin-left: 21%;
                    margin-top: 3%;
                }
            }

            .bottomArea{
                width: 100%;
                height: 80%;
                // border: 1px solid black;
                margin-top: 5%;

                span{
                    display: inline-block;
                    margin-left: 21%;
                    margin-top: 3%;

                    ul{
                        list-style-type:none;
                    }
                }
            }
        }
    }
</style>