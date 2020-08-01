<template>
  <div>
    <div :id="chartid" style="height:300px"></div>
  </div>
</template>

<script>
export default {
  name: "pie",
  props: ["chartid", "chartData", "indicator", "saveName"],
  mounted() {
    this.drawRadar();
  },
  data() {
    return {
      myChart: null,
      option: null,
      realChartData: null
    };
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
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById(this.chartid));

      let data = [];
      let val = [];
      let legendata = [];
      let series = [];
      this.chartData.forEach(item => {
        data.push(item.date);
        item.data.forEach(val => {
          legendata.push(val.name);
        });
      });
      console.log(this.chartData)
      legendata = Array.from(new Set(legendata));
      legendata.forEach((item,c) => {
        let serdata = [];
        console.log(item)
        this.chartData.forEach((val,index) => {
          val.data.forEach((temp,i) => {
            if (item == temp.name) {

              serdata.push(temp.percent);
            }
          });
        });
        console.log(serdata)
        // serdata=c ==0 ? [100,66.67,33.33,33.33] :[0,33.33,66.67,66.67]
        series.push({
          name: item,
          type: "bar",
          stack: "总量",
          barWidth: "100%",
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            opacity: 0.8
          },
          data: serdata
        });
      });
      this.option = {
        tooltip: {
          trigger: "axis",
          //  formatter: "{b}<br />{a0}:{c0}<br />{a1}:{c1}",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: ["#e65f3e", "#ffe289", "#ffb577", "#fdc700", "#b79565"],
        legend: {
          x: "center",
          y: "bottom",
          y2: "120",
          data: legendata
        },

        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          min: 0,
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ["green"],
              width: 1
            }
          },
          axisLabel: {
            show: true,
            interval: "auto",
            formatter: "{value} %"
          },
          max: 100
        },
        xAxis: {
          type: "category",
          interval: 1,
          splitLine: {
            show: true,
            lineStyle: {
              // 使用深浅的间隔色
              color: ["green"],
              width: 1
            }
          },
          axisLabel: {
            interval: 0,
            rotate: 40
          },
          data: data
        },
        series: series
      };

      this.myChart.setOption(this.option, true);

      //   if (this.chartData.length > 0) {
      //     this.myChart.setOption(this.option, true);
      //     this.myChart.hideLoading();
      //   } else {
      //     if (this.myChart != null) {
      //       this.myChart.dispose();
      //     }
      //   }
    },
    loading() {
      if (this.myChart != null) {
        this.myChart.showLoading();
      }
    }
  }
};
</script>
<style scoped>
.hamburger {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  transform: rotate(180deg);
  transition: 0.38s;
  transform-origin: 50% 50%;
  color: #1f2b35 !important;
}

.hamburger.is-active {
  transform: rotate(90deg);
}
</style>
