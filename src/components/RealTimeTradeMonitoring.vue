<template>
  <div class="real-time-trade-container">
    <img src="../assets/img/RealTimeTradeMonitoring/realtTimeTradeBackground.png" />
    <div class="real-time-trade-title">实时交易监控</div>
    <div class="list" @mouseenter="autoplay = false" @mouseleave="autoplay = true">
      <div class="thead">
        <div class="th">交易hash</div>
        <div class="th">应用名称</div>
        <div class="th">上链时间</div>
      </div>
      <div class="tbody">
        <Vue3SeamlessScroll
          :list="realTimeTradeMonitoringData"
          class="scroll"
          wheel="true"
          step="0.4"
          v-model="autoplay"
        >
          <div class="child" v-for="item in realTimeTradeMonitoringData" :key="item.hash">
            <div class="td">
              <div
                style="
                  width: max-content;
                  white-space: nowrap; /* 禁止文本换行 */
                  text-overflow: ellipsis; /* 使用省略号来表示溢出内容 */
                "
              >
                {{ item.hash }}
              </div>
              <img
                style="height: 16px; margin-left: 4px"
                src="../assets/img/RealTimeTradeMonitoring/copy.png"
                @click="handleCopy(item.hash)"
              />
            </div>
            <div class="td">{{ item.appName }}</div>
            <div class="td">{{ item.transactionTime }}</div>
          </div>
        </Vue3SeamlessScroll>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, watch } from 'vue'
import dayjs from 'dayjs'
import useClipboard from 'vue-clipboard3'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
import { notification } from 'ant-design-vue'

const realTimeTradeMonitoringData = reactive([])

const autoplay = ref(true)

const { toClipboard } = useClipboard()


const props = defineProps(['result'])


watch(
  () => props.result,
  () => {
    if(!props.result.data || !props.result.data.data || !props.result.data.data.recentBtsiTransactions ){
      return
    }
    let recentBtsiTransactions =  [...props.result.data.data.recentBtsiTransactions]
    recentBtsiTransactions.forEach((e) => {
      e.transactionTime = dayjs(e.transactionTime).format('YYYY-MM-DD HH:mm:ss')
    })
    realTimeTradeMonitoringData.length = 0
    realTimeTradeMonitoringData.push(...recentBtsiTransactions)
  }
)


const handleCopy = async (text) => {
  try {
    await toClipboard(text) //实现复制

    notification.success({
      message: `复制成功`,
      description: `交易hash：${text}`,
      placement: 'topRight',
      duration: 1
    })
  } catch (e) {
    console.error(e)
  }
}
</script>
<style lang="scss" scoped>
.real-time-trade-container {
  width: pxToVw(915);
  height: pxToVh(320);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  > img {
    width: pxToVw(915);
    height: pxToVh(320);
  }
  .real-time-trade-title {
    width: pxToVw(216);
    height: pxToVh(24);
    font-size: 36px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #29f1fa;
    line-height: 24px;
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    position: absolute;
    top: 25px;
    right: 25px;
  }
  @media screen and (max-width: 1920px) {
    .real-time-trade-title {
      white-space: nowrap;
      font-size: 16px;
    }
  }

  .list {
    height: pxToVh(200);
    width: pxToVw(852);
    position: absolute;
    top: 95px;
    left: 32px;
    overflow: hidden;
    .thead {
      position: relative;
      z-index: 999;
      background: #0d142b;
      display: flex;
      .th {
        width: pxToVw(284);
        height: pxToVh(40);
        font-size: 15px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #1890ff;
        line-height: pxToVh(40);
        text-align: center;
      }
    }
    .tbody {
      width: pxToVw(852);
      height: pxToVh(160);
      display: flex;
      flex-wrap: wrap;
      z-index: -1;
      .child {
        display: flex;

        height: pxToVh(40);
        .td {
          width: pxToVw(284);
          height: pxToVh(40);
          background: #073354;
          opacity: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        :first-child {
          font-size: 14px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
          word-wrap: break-word;
          word-break: break-all;
          overflow: hidden;
        }
        :nth-child(2) {
          font-size: 14px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #ffe905;
        }
        :last-child {
          font-size: 14px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
          line-height: 24px;
        }
      }
    }
  }

  @media screen and (max-width: 1920px) {
    .list {
      top: 50px;
    }

    .thead {
      margin-bottom: 15px;
    }
  }
}
</style>
