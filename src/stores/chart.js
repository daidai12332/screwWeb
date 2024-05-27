import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const backgroundColorList = ["blue", "green", "red", ];

// 儲存製作表單相關的方法
export const useChartStore = defineStore('chart', () => {

  /*
   *  [堆疊長條圖] (存放圖表的元素ID名稱, X軸的標籤陣列, y軸的資料集合 ) : null
   */  
  function stackChart(elementId, inputLabel, inputDataset) {

    // 整理資料格式
    let datasetRef = [];
    for(let item in inputDataset){
        const obj = {
            label: inputDataset[item].label,
            backgroundColor: backgroundColorList[item],
            data: inputDataset[item].data,
        }
        datasetRef.push(obj);
    }
    console.log(datasetRef);
    let dataRef = {
        labels: inputLabel, 
        datasets: datasetRef, 
    }

    // 製作圖表
    const myContext = document.getElementById(elementId).getContext('2d');
    let myChart = new Chart(myContext, { 
        type: 'bar', 
        data: dataRef, 
        options: { 
            plugins: { 
                legend: {display: false},
                label: { 
                    display: false, 
                }, 
            }, 
            scales: { 
                x: { 
                    stacked: true, 
                }, 
                y: { 
                    stacked: true 
                } 
            }
        } 
    }); 

  }

  /*
   * [甜甜圈圖] (存放圖表的元素ID名稱, 每一塊的標籤陣列,  ) : null
   */
  function doughnutChart(elementId, inputLabel, inputDataset){

    // 整理資料格式
    const dataRef = { 
        labels: inputLabel, 
        datasets: [{ 
            data: inputDataset, 
            backgroundColor: backgroundColorList, 
        }], 
    }; 
    
    // 製作圖表
    const ctx = document.getElementById(elementId).getContext('2d');
    const config = { 
        type: 'doughnut', 
        data: dataRef, 
        options: { 
            plugins: { 
            legend:{ display: false}
            }, 
        }, 
    }; 
    new Chart(ctx, config); 

  }

  function name(params) {
    
  }

  return { stackChart, doughnutChart }
})
