a<template>
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
      console.log(this.chartData);
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
      legendata = Array.from(new Set(legendata));
      legendata.forEach(item => {
        let serdata = [];
        this.chartData.forEach(val => {
            val.data.forEach(temp =>{
                if(item == temp.name){
                    serdata.push(temp.percent/100)
                }
            })
        });
        series.push({
          name: item,
          type: "bar",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "insideRight"
            }
          },
          data: serdata
        });
      });
      console.log(legendata);
      console.log(data);
      console.log(series);
      this.option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
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
          max: 1
        },
        xAxis: {
          type: "category",
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
