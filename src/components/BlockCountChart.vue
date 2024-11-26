<template>
  <div id="block-chart-container"></div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import * as echarts from 'echarts'
import { dateDispose } from '@/utils'

const blockData = reactive([])
const arrDate = reactive([])
const arrCount = reactive([])

const props = defineProps(['result'])


watch(
  () => props.result,
  () => {
    if(!props.result.data || !props.result.data.data || !props.result.data.data.blockTrend){
      return
    }
    manageData()
  }
)


const manageData = () => {
  var dom = document.getElementById('block-chart-container')
  var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  })

  blockData.length = 0
  arrDate.length = 0
  arrCount.length = 0
  blockData.push(...props.result.data.data.blockTrend)
  blockData.forEach((v) => {
    arrDate.unshift(dateDispose(v.date))
    arrCount.unshift(v.count)
  })
  var option

  option = {
    title: {
      text: '近七日出块数',
      left: 'center',
      top: '2%',
      textStyle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 400
      }
    },
    yAxis: {
      // type:'category',
      type: 'value',
      axisLabel: {
        show: true,
        color: '#fff',
        fontSize: 12
      }
    },
    xAxis: {
      type: 'category',
      data: arrDate,
      axisLabel: {
        show: true,
        color: '#fff',
        fontSize: 12
      }
    },

    series: [
      {
        data: arrCount,
        type: 'bar',

        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: {
                //数值样式
                color: '#ffffff',
                fontSize: 10
              }
            },
            color: '#00FF94'
          }
        }
      }
    ]
  }

  if (option && typeof option === 'object') {
    myChart.setOption(option)
  }

  window.addEventListener('resize', myChart.resize)
}
</script>

<style scoped lang="scss">
#block-chart-container {
  background: #19355b;
  width: pxToVw(564);
  height: pxToVh(280);
}

@media screen and (max-width: 1920px) {
  #block-chart-container {
    height: 30vh;
  }
}
</style>
