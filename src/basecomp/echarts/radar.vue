<template>
  <div>
    <div :id="chartid" style="height:300px;min-width:300px;"></div>
  </div>
</template>

<script>
  export default {
    name: 'radar',
    props: {
      chartid: {
        type: String,
        default: 'chartid'
      },
      chartData: {
        type: Array,
        default: [10, 20, 30, 50, 60]
      },
      indicator: {
        type: Array,
        default: [{text: '股票型', max: 100},
          {text: '混合型', max: 100},
          {text: '债券型', max: 100},
          {text: '货币基金', max: 100},
          {text: 'FOF基金', max: 100},
        ],
      },
    },
    mounted() {
      this.drawRadar();
    },
    data(){
      return {
        myChart: null,
        option: null,
        realChartData:null,
      }
    },
    watch: {
      chartData: {
        handler(newValue, oldValue) {
          this.drawRadar();
        },
        deep: true
      }
    },
    methods: {
      drawRadar() {
        let _this = this;
        if (this.chartData.length > 0) {
          // 基于准备好的dom，初始化echarts实例
          this.myChart = this.$echarts.init(document.getElementById(this.chartid));
          this.option = {
            title: {
              show: false,
              text: '',
            },
            tooltip: {
              trigger: 'item',
              axisPointer: {
                type: 'line'
              }
            },
            legend: {
              orient: 'vertical',
              x: 'right',
              y: 'bottom',
              data: ['近一周业绩五分位排名']
            },
            toolbox: {
              show: true,
              right:20,
              feature: {
              }
            },
            radar: {
              center: ["50%", "50%"],
              radius: "70%",
              startAngle: 90,
              splitNumber: 4,
              shape: "circle",
              splitArea: {
                  areaStyle: {
                      color: ["#fff"]// 图表背景的颜色
                  }
              },
              
              
              axisLine: {
                  show: true,
                  lineStyle: {
                      type: "dashed",
                      color: "#ccc"
                  }
              },
              axisLabel: {// 坐标轴文本标签，详见axis.axisLabel
                  show:false,
                  fontSize: 20,
                  textStyle: {
                    color: function (value, index) {
                        return 'green';
                    }
                  }
              },
              splitLine: {
                  show: true,
                  lineStyle: {// 图表背景网格线的颜色
                      type: "dashed",
                      color: "#ccc"
                  }
              },
              indicator:  this.indicator,
            },
            name: {
              show:true,
              color: '#00b7ee',
            },
            //calculable: true,
            series: [
                {
                  type: "radar",
                  symbol: "circle",
                  symbolSize: 10,
                  /* areaStyle: {//围起来的区域
                      normal: {
                          color: "black"
                      }
                  }, */
                  itemStyle: {
                      color: '#f9732c',
                      borderColor: 'rgba(249,115,44, 0.3)',
                      borderWidth: 1,
                  },
                  
                  lineStyle: {
                      normal: {
                          color: "#f9732c",
                          width: 1
                      }
                  },
                  data: [
                      {
                        value: this.chartData,
                        tooltip:{
                          formatter:function (params, ticket, callback) {
                            let message = '';
                            for (let i = 0;i<_this.indicator.length;i++){
                              message += _this.indicator[i].text+':'+_this.chartData[i]+'<br>';
                            }
                            return message;
                          }
                        },
                      },
                  ]
              },
            ]
          };
          //console.log(this.option)
          this.myChart.setOption(this.option,true);
        }
      },
      enterDiv(){
        if(this.myChart != null){
          this.option.polar[0].splitArea.show = true;
          this.option.polar[0].splitLine.lineStyle.color = '#286fbb';
          this.myChart.setOption(this.option, true);
        }
      },
      leaveDiv(){
        if (this.myChart != null) {
          this.option.polar[0].splitArea.show = false;
          this.option.polar[0].splitLine.lineStyle.color = '#ccc';
          this.myChart.setOption(this.option, true);
        }
      }
    }
  }
</script>
<style scoped>
  .hamburger {
      display: inline-block;
      cursor: pointer;
      width: 20px;
      height: 20px;
      transform: rotate(180deg);
      transition: .38s;
      transform-origin: 50% 50%;
      color: #1f2b35!important;
  }

  .hamburger.is-active {
      transform: rotate(90deg);
  }
</style>

