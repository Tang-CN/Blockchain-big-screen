<template>
  <div id='block-china-map-container'></div>
</template>
<script setup>
import {  watch } from 'vue'
import * as echarts from 'echarts'
import lodash from 'lodash'

import geoJson from '@/assets/json/chinaMap.json'


const props = defineProps(['result'])

const manageData = () => {
  // 准备 涟漪点 经纬度二维数组
  let coordinates = props.result.data.data.nodes.map((item) => [item.longitude, item.latitude])

  // 准备 涟漪点lines的起点，终点，多起点一终点
  let randomIndex = lodash.random(coordinates.length - 1)
  let endPoint = coordinates[randomIndex]
  let lineData = coordinates.filter((coord, index) => {
    if (index !== randomIndex) {
      return coord
    }
  })

  // 多起点
  let lineFormatData = []
  lineData.forEach((v) => {
    let obj = {
      coords: [v, endPoint]
    }
    lineFormatData.push(obj)
  })
  // 初始化 echarts
  var dom = document.getElementById('block-china-map-container')
  var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  })
  myChart.hideLoading()
  echarts.registerMap('china', geoJson)

  let option = {
    series: [
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: coordinates,

        hoverAnimation: 'ture',
        showEffectOn: 'render',
        zlevel: 2,
        rippleEffect: {
          period: 2.5, //波纹秒数
          brushType: 'stroke', //stroke(涟漪)和fill(扩散)，两种效果
          scale: 4 //波纹范围
        },
        label: {
          normal: {
            formatter: '{b}',
            position: 'top',
            show: true
          }
        },
        itemStyle: {
          normal: {
            show: true,
            color: '#37F6E0' //字体和点颜色
          }
        }
      },
      {
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 5,
        effect: {
          show: true,
          period: 2, //箭头指向速度，值越小速度越快
          trailLength: 0.2, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: 'triangle', //箭头图标
          symbolSize: 10, //图标大小
          color: '#023AFD' // 图标颜色
        },
        lineStyle: {
          normal: {
            show: true,
            width: 4, //尾迹线条宽度
            opacity: 0.2, //尾迹线条透明度
            curveness: 0.4, //尾迹线条曲直度
            color: '#026FE0' // 飞线颜色
          },
          color: '#026FE0'
        },
        data: lineFormatData
      }
    ],
    // 涟漪点提示
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        const dataIndex = params.dataIndex
        const name = props.result.data.data.nodes[dataIndex].name
        return `${name}`
      }
    },
    geo: {
      map: 'china',
      label: {
        emphasis: {
          //对应的鼠标悬浮效果
          show: true,
          textStyle: { color: '#FFFFFF' }
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#162446',
          borderColor: '#6063E0',
          borderWidth: 1
        },
        emphasis: {
          areaColor: 'rgba(0,255,255,.1)',
          color: '#fff'
        }
      }
    }
  }

  if (option && typeof option === 'object') {
    myChart.setOption(option)
  }

  window.addEventListener('resize', myChart.resize)
}


watch(
  () => props.result,
  () => {
    manageData()
  }
)
</script>
<style lang='scss' scoped>
#block-china-map-container {
  width: pxToVw(672);
  height: pxToVh(514);
  margin: 0 auto;
}
</style>
