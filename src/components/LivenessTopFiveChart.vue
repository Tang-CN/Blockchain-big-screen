<template>
  <div id="liveness-chart-container"></div>
</template>

<script setup>
/**
 * @description: 方法二
 * @return {*}
 */
import { watch } from 'vue'
import * as echarts from 'echarts'


const props = defineProps(['result'])


watch(
  () => props.result,
  () => {
    if(!props.result.data){
      return
    }
    import('echarts').then(() => {
      getDataAndInitEcharts()
    })
  }
)


const getDataAndInitEcharts = () => {
      // 初始化 echarts
      var dom = document.getElementById('liveness-chart-container')
      var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
      })

      //定义条数
      const strip = 5

      //柱图的最大宽度
      var maxWidth = document.getElementById('liveness-chart-container').clientHeight / strip

      // echarts X Y轴数据准备
      let appNameArr = []
      let activeValueArr = []



      var option
      if (props.result.data.data.appActiveTop.length === 0) {
        option = {
          grid: {
            left: '20%'
          },
          title: {

            text: '近七日应用活跃度',
            left: 'center',
            top: '2%',
            textStyle: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 400
            },

          }
        }
      } else {
        let appActiveTop = [...props.result.data.data.appActiveTop]
        appActiveTop.sort((a, b) => {
          return a.activeValue - b.activeValue
        })
        appActiveTop.forEach((v, i) => {
          if (i < strip) {
            appNameArr.push(v.appName)
            activeValueArr.push(v.activeValue)
          }
        })
        option = {
          grid: {
            left: '20%'
          },
          title: {
            text: '近七日应用活跃度',
            left: 'center',
            top: '2%',
            textStyle: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 400
            },
          },
          xAxis: {
            type: 'value',
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            data: appNameArr,

            splitLine: {
              // 是否显示y轴分割线
              show: true,
              lineStyle: {
                color: '#E0E6F1',
                with: 1,
                opacity: 1
              }
            },
            //x y 轴字体颜色
            axisLabel: {
              show: true,
              formatter: function (val) {
                var strs = val.split('') //字符串数组
                var str = ''
                for (var i = 0, s; (s = strs[i++]); ) {
                  //遍历字符串数组
                  str += s
                  if (!(i % 5)) str += '\n'
                }
                return str
              },
              textStyle: {
                color: '#fff',
                fontSize: 12
              }
            }
          },
          series: [
            {
              data: activeValueArr,
              type: 'bar',
              barMaxWidth: maxWidth,
              //柱图颜色
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
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
      }

      if (option && typeof option === 'object') {
        myChart.setOption(option)
      }

      window.addEventListener('resize', myChart.resize)
}
</script>

<style scoped lang="scss">
#liveness-chart-container {
  background: #19355b;
  width: pxToVw(564);
  height: pxToVh(280);
  padding-left: 10px;
}
</style>
