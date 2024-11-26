<template>
  <div id="transaction-chart-container"></div>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue'
import * as echarts from 'echarts'
import { dateDispose } from '@/utils'
const transactionData = reactive([])
const countArr = reactive([])
const dateArr = reactive([])

onMounted(() => {
  echartsInit()
})


const props = defineProps(['result'])


watch(
  () => props.result,
  () => {
    if(!props.result.data){
      return
    }
    echartsInit()
  }
)

/**
 * @description: 初始化echart
 * @return {*}
 */
const echartsInit =  () => {
  var dom = document.getElementById('transaction-chart-container')
  var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  })

  if(!props.result || !props.result.data || !props.result.data.data || !props.result.data.data.transactionTrend){
    return
  }
  transactionData.length = 0
  dateArr.length = 0
  countArr.length = 0
  transactionData.push(...props.result.data.data.transactionTrend)
  transactionData.forEach((v, i) => {
    dateArr.unshift(dateDispose(v.date))
    countArr.unshift(v.count)
  })

  var option

  option = {
    title: {
      text: '近七日交易数',
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
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
      }
    },
    xAxis: {
      type: 'category',
      data: dateArr,
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
      }
    },

    series: [
      {
        data: countArr,
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
#transaction-chart-container {
  background: #19355b;
  width: pxToVw(564);
  height: pxToVh(280);
}

@media screen and (max-width: 1920px) {
  #transaction-chart-container {
    height: 30vh;
  }
}
</style>
