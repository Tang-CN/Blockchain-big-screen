<template>
  <div class="node-container">
    <img src="../assets/img/nodeMonitoring/nodebackground.png" alt="" />
    <div class="node-title">节点监控</div>

    <div class="list">
      <div class="thead">
        <div class="th">节点名称</div>
        <div class="th">运营机构</div>
        <div class="th">节点状态</div>
      </div>
      <div class="tbody">
        <div class="child" v-for="(item, index) in nodesData" :key="index">
          <div class="td">{{ item.name }}</div>
          <div class="td">{{ item.subjectName }}</div>
          <div class="td" :style="{ color: item.status == 0 ? '#00FF94' : '#FA0000' }">
            {{ item.statusDesc }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
const nodesData = reactive([])

const props = defineProps(['result'])


watch(
  () => props.result,
  () => {
    if(!props.result.data){
      return
    }
    nodesData.length = 0
    nodesData.push(...props.result.data.data.nodes)
  }
)
</script>

<style lang="scss" scoped>
.node-container {
  width: pxToVw(915);
  height: pxToVh(320);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  > img {
    width: pxToVw(915);
    height: pxToVh(320);
  }
  .node-title {
    width: pxToVw(144);
    height: pxToVh(24);
    font-size: 36px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #29f1fa;
    line-height: 24px;
    position: absolute;
    top: 25px;
    left: 30px;
  }

  @media screen and (max-width: 1920px) {
    .node-title {
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
      display: flex;
      .th {
        width: pxToVw(284);
        height: pxToVh(40);
        font-size: 15px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #1890ff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .tbody {
      width: pxToVw(852);
      height: pxToVh(160);
      display: flex;
      flex-wrap: wrap;
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
          color: rgba(255, 255, 255, 0.87);
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
          color: #00ff94;
          line-height: 24px;
        }
      }
    }
  }

  @media screen and (max-width: 1920px) {
    .list {
      top: 56px;
    }
  }
}
</style>
