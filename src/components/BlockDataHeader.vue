<template>
  <div class="block-data-header">
    <div class="leftLongTransverseLine">
      <img src="../assets/img/blockDataHeader/leftLongTransverseLine.png" />
    </div>
    <div class="header-title">
      <div class="left-background">
        <img class="leftbg" src="../assets/img/blockDataHeader/leftbg.png" />
        <img
          class="leftShortTransverseLine"
          src="../assets/img/blockDataHeader/shortTransverseLine.png"
        />
      </div>
      <div class="center-backround">
        <img src="../assets/img/blockDataHeader/center.png" />
        <div class="header-text">{{ proxy.$ChainTitle }}数据大屏</div>
      </div>
      <div class="right-background">
        <img class="rightbg" src="../assets/img/blockDataHeader/rightbg.png" />
        <img
          class="rightShortTransverseLine"
          src="../assets/img/blockDataHeader/shortTransverseLine.png"
        />
      </div>
    </div>
    <div class="rightLongTransverseLine">
      <img src="../assets/img/blockDataHeader/rightLongTransverseLine.png" />
    </div>
    <div class="header-time">{{ time }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import dayjs from 'dayjs'
const time = ref(null)

const { proxy } = getCurrentInstance()

onMounted(() => {
  getTime()
})
const getTime = () => {
  setInterval(() => {
    let day = dayjs().day()
    let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    time.value = dayjs().format('YYYY-MM-DD') + ' ' + week[day] + ' ' + dayjs().format('HH:mm:ss')
  }, 1000)
}
</script>

<style lang="scss" scoped>
.block-data-header {
  width: 100vw;
  height: pxToVh(75);
  position: relative;
  .leftLongTransverseLine,
  .rightLongTransverseLine {
    width: pxToVw(500);
    height: pxToVh(10);
  }
  .leftLongTransverseLine {
    position: absolute;
    top: 53px;
    left: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .rightLongTransverseLine {
    position: absolute;
    top: 53px;
    right: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .header-title {
    width: pxToVw(930);
    height: pxToVh(75);
    position: relative;
    margin: 0 auto;
    .left-background,
    .right-background {
      width: pxToVw(120);
      height: pxToVh(64);
    }
    .left-background {
      position: absolute;
      top: 0px;
      left: 0px;
      .leftbg {
        width: 100%;
        height: 100%;
      }
      .leftShortTransverseLine {
        width: pxToVw(68);
        height: pxToVh(2);
        position: absolute;
        top: 68px;
        right: 2px;
      }
    }
    .center-backround {
      width: pxToVw(753);
      height: pxToVh(75);
      margin: 0 auto;
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      img {
        width: 100%;
      }
      .header-text {
        width: pxToVw(403);
        height: pxToVh(62);
        font-size: 48px;
        font-family: YouSheBiaoTiHei-Bold, YouSheBiaoTiHei;
        font-weight: 400;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      @media screen and (max-width: 1920px) {
        .header-text {
          font-size: 18px;
        }
      }
    }

    .right-background {
      position: absolute;
      top: 0px;
      right: 0px;
      .rightbg {
        width: 100%;
        height: 100%;
      }
      .rightShortTransverseLine {
        width: pxToVw(68);
        height: pxToVh(2);
        position: absolute;
        top: 68px;
        left: 2px;
      }
    }
  }
  .header-time {
    position: absolute;
    top: 0px;
    right: 153px;
    width: pxToVw(173);
    height: pxToVh(60);
    text-align: center;
    font-size: 18px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #04e38a;
  }

  @media screen and (max-width: 1920px) {
    .header-time {
      white-space: nowrap;
      font-size: 14px;
    }
  }
}
</style>
