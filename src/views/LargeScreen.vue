<script setup>
import BlockCountChart from '@/components/BlockCountChart.vue'
import TransactionCountChart from '@/components/TransactionCountChart.vue'
import LivenessTopFiveChart from '@/components/LivenessTopFiveChart.vue'
import DataStatistics from '@/components/DataStatistics.vue'
import BlockDataHeader from '@/components/BlockDataHeader.vue'
import BlockChinaMap from '@/components/BlockChinaMap.vue'
import NodeMonitoring from '@/components/NodeMonitoring.vue'
import RealTimeTradeMonitoring from '@/components/RealTimeTradeMonitoring.vue'
import HashSeach from '@/components/HashSeach.vue'
import axios from '@/utils/http'
import { getCurrentInstance, reactive } from 'vue'


const { proxy } = getCurrentInstance()

const singleNodeReqResult = reactive({ data:{data:{}} } )
const statReqResult = reactive({ data:{data:{transactionTrend:[]}} })
let getChainNodeData = () => {
  axios
    .get('api/v1/screen/chainNode/single', {
      params: proxy.$ChainName
    })
    .then((result) => {
      singleNodeReqResult.value = result
    })
    .catch((err) => console.log(err))
}


let getStatData = () => {
  axios
    .get('api/v1/screen/stat/single', {
      params: proxy.$ChainName
    })
    .then((result) => {
      statReqResult.value = result
    })
    .catch((err) => console.log(err))
}

getStatData()
getChainNodeData()

setInterval(getStatData,5000)
setInterval(getChainNodeData,30000)
</script>

<template>
  <main class="main">
    <div class="header">
      <BlockDataHeader />
    </div>

    <div class="middlebox">
      <div class="left-middle">
        <div class="left-middle-top">
          <DataStatistics :result='statReqResult.value'/>
        </div>
        <div class="left-middle-down">
          <LivenessTopFiveChart :result='statReqResult.value'/>
        </div>
      </div>
      <div class="main-middle">
        <BlockChinaMap  :result='singleNodeReqResult.value'/>
        <HashSeach />
      </div>
      <div class="right-middle">
        <div class="right-middle-top">
          <BlockCountChart :result='statReqResult.value'/>
        </div>
        <div class="right-middle-down">
          <TransactionCountChart :result='statReqResult.value'/>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="left-footer">
        <NodeMonitoring  :result='singleNodeReqResult.value'/>
      </div>
      <div class="right-footer">
        <RealTimeTradeMonitoring :result='statReqResult.value'/>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
body {
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
}
.main {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #122741;

  // flex-wrap: wrap;
  flex-direction: column;

  .header {
    width: 100vw;
    height: pxToVh(98);
    background-color: #122741;
  }

  .middlebox {
    width: 100vw;
    height: pxToVh(610);
    display: flex;
    background-color: #122741;
    .left-middle {
      width: 30vw;
      background-color: #122741;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      .left-middle-top,
      .left-middle-down {
        width: pxToVw(564);
        height: pxToVh(280);
        background: rgba(4, 4, 26, 0.2);
        box-shadow: inset 0px 0px 24px 0px #00a3ff;
        opacity: 1;
        overflow: hidden;
        margin-bottom: 10px;
      }
    }
    .main-middle {
      width: 40vw;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      background-color: #122741;
    }
    .right-middle {
      width: 30vw;
      background-color: #122741;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      .right-middle-top,
      .right-middle-down {
        width: pxToVw(564);
        height: pxToVh(280);
        background: rgba(4, 4, 26, 0.2);
        box-shadow: inset 0px 0px 24px 0px #00a3ff;
        opacity: 1;
        overflow: hidden;
        margin-bottom: 10px;
        // margin-left: 20px;
      }
    }
  }

  .footer {
    height: pxToVh(372);
    width: 100vw;
    background-color: #122741;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

    .left-footer,
    .right-footer {
      height: 100%;
      width: 50%;
      background-color: #122741;
    }

    .left-footer {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-left: 10px;
    }

    .right-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-right: 10px;
    }
  }
}
</style>
