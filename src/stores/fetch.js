import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFetchStore = defineStore('fetch', () => {
  // 變數
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  // 首頁：獲得最新機台資訊
  function fetchNewestMachineStatus() {
    fetch("http://localhost:8080/screw/findmachineDataNow",{
        method: 'POST',
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
        return data.machineDataList;
    });
  }

  // 首頁：獲得最新單號資訊
  function fetchNewestOrderStatus() {
    fetch("http://localhost:8080/screw/orderDataDay",{
        method: 'POST',
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
        return data.OrderAndMachineList;
    });
  }

  return { fetchNewestMachineStatus, fetchNewestOrderStatus }
})

// vue 中的寫法
// import { useCounterStore } from '../stores/hello'
// const countStore = useCounterStore();
// 接著用.去呼叫裡面的東西