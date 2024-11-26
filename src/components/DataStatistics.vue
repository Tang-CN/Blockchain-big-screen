<template>
  <div class="data-statistics-container">
    <img src="@/assets/img/dataStatistics/dataStatisticsBackground.png" />
    <div class="title">
      <div class="logo">
        <img src="@/assets/img/dataStatistics/chartLogo.png" />
      </div>
      <div class="text">数据统计</div>
    </div>
    <!-- 条纹logo -->
    <div class="stripe">
      <img src="@/assets/img/dataStatistics/topStripe.png" />
    </div>

    <!-- 内容 -->
    <div class="content">
      <div class="child" v-for="(item, index) in newData" :key="index">
        <img class="background" :src="item.background" />
        <img class="content-logo" :src="item.logo" />
        <div class="content-text">{{ item.title }}</div>
        <div class="content-num">{{ item.num }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, watch } from 'vue'

const newData = reactive([])

function getIcon(iconName) {
  return new URL(`../assets/img/dataStatistics/${iconName}.png`, import.meta.url).href
}

const dataStatistics = reactive([
  {
    background: getIcon('navCheck'),
    logo: getIcon('blockLogo'),
    title: '区块总数'
  },
  {
    background: getIcon('navCheck'),
    logo: getIcon('storageLogo'),
    title: '总交易数'
  },
  {
    background: getIcon('navCheck'),
    logo: getIcon('backupLogo'),
    title: '智能合约数'
  }
])


const props = defineProps(['result'])


watch(
  () => props.result,
  () => {
    if(!props.result.data){
      return
    }
    let arr = [props.result.data.data.blockTotal, props.result.data.data.transactionTotal, props.result.data.data.contractTotal]
    newData.length = 0
    newData.push(
      ...dataStatistics.map((item, index) => {
        return {
          ...item,
          num: arr[index]
        }
      })
    )
  }
)
</script>
<style lang="scss" scoped>
.data-statistics-container {
  width: pxToVw(564);
  height: pxToVh(280);
  position: relative;
  background-color: #122741;
  overflow: hidden;

  > img {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    z-index: 9;
  }
  .title {
    width: pxToVw(106);
    height: pxToVh(24);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 24px;
    top: 12px;
    .logo {
      width: pxToVw(24);
      height: pxToVh(24);
      img {
        width: 100%;
        height: 100%;
      }
      margin-right: 10px;
    }
    .text {
      width: pxToVw(72);
      height: pxToVh(24);
      font-size: 18px;
      font-family: Inter-Regular, Inter;
      font-weight: 400;
      color: #ffffff;
      line-height: 24px;
      border-bottom-left-radius: 10px;
    }
    @media screen and (max-width: 1920px) {
      .text {
        white-space: nowrap;
        font-size: 14px;
      }
    }
  }

  .stripe {
    width: pxToVw(339.37);
    height: pxToVh(23.18);
    background-color: #122741;
    position: absolute;
    top: 1px;
    right: 35px;
    > img {
      width: 100%;
    }
  }

  .content {
    position: absolute;
    z-index: 99;
    top: 70px;
    left: 51px;
    height: pxToVh(161);
    width: pxToVw(477);
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .child {
      width: pxToVw(117);
      height: pxToVh(161);
      position: relative;
      // margin-right: 82px;
      .background {
        width: pxToVw(102.55);
        height: pxToVh(88);
        position: absolute;
        top: 28px;
        left: 5px;
      }
      .content-logo {
        position: absolute;
        width: pxToVw(69.65);
        height: pxToVh(72);
        left: 50%;
        transform: translateX(-50%);
      }
      .content-text {
        width: pxToVw(117);
        height: pxToVh(16);
        font-size: 14px;
        font-family: Alibaba Sans-Regular, Alibaba Sans;
        font-weight: 400;
        color: #ffffff;
        position: absolute;
        top: 45%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      @media screen and (max-width: 1920px) {
        .content-text {
          white-space: nowrap;
          font-size: 12px;
        }
      }

      .content-num {
        width: pxToVw(117);
        height: pxToVh(48);
        font-size: 24px;
        font-family: Alibaba Sans-Regular, Alibaba Sans;
        font-weight: 400;
        color: #00ff94;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 0px;
        bottom: 0px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      @media screen and (max-width: 1920px) {
        .content-num {
          white-space: nowrap;
          font-size: 14px;
        }
      }
    }
    :last-child {
      flex-grow: 0;
    }
  }
}
</style>
