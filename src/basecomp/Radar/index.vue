<template>
  <div>
      <div :id="chartid" style="height:300px;"></div>
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
        chartData:{
            type: Array,
            default: [10, 20, 30, 50, 60, 70,80]
        }
    },
    mounted(){
        this.drawRadar();
    },
    methods:{
        drawRadar(){
            var option = {
                title : {
                },
                tooltip : {
                    trigger: 'item',
                    axisPointer:{
                        type:'line'
                    }
                },
                legend: {
                    orient : 'vertical',
                    x : 'right',
                    y : 'bottom',
                    data:['近一周业绩五分位排名']
                },
                toolbox: {
                    show : true,
                    feature : {
                    }
                },
                polar : [
                {
                    indicator : [
                        { text: '主动股票熊', max: 100},
                        { text: '混合型', max: 100},
                        { text: '主动债券型', max: 100},
                        { text: '货币基金', max: 100},
                        { text: 'FOF基金', max: 100},
                        { text: 'QDII', max: 100},
                        { text: '其他基金', max: 100}
                        ]
                    }
                ],
                calculable : true,
                series : [
                    {
                        name: '',
                        type: 'radar',
                        data : [
                            {
                                value : this.chartData,
                                name : ''
                            }
                        ]
                    }
                ]
            };

            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById(this.chartid))
            // 绘制图表
            myChart.setOption(option);
                    
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



// WEBPACK FOOTER //
// src/components/Hamburger/index.vue