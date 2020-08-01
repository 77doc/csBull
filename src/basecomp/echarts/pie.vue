<template>
  <div>
    <div :id="chartid" style="height:400px"></div>
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
      this.chartData.forEach(item => {
        data.push(item.name + item.percent + "%");
        let temp = {
          value: item.percent,
          name: item.name + item.percent + "%"
        };
        val.push(temp);
      });
      //利用slice
      function truncate(arr) {
        return arr.slice(0, -1);
      }
      let val1 = truncate(val);
      let series = [];
      if (this.saveName == "重仓股") {
        series = [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["20%", "50%"],
            data: val,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          },
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["80%", "50%"],
            data: val1,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ];
      } else {
        series = [
          {
            name: "",
            type: "pie",
            radius: "55%",
            // center: ["35%", "30%"],
            data: val,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ];
      }

      this.option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}"
        },
        noDataLoadingOption: {
          text: "暂无数据",
          effect: "bubble",
          effectOption: {
            effect: {
              n: 0
            }
          }
        },
        color: [
          "#e65f3e",
          "#ffb577",
          "#ffe289",
          "#b79565",
          "#34aadb",
          "#6780ff",
          "#9574ff",
          "#d86fff",
          "#d24dba",
          "#86bfe3"
        ],
        legend: {
          x: "center",
          y: "bottom",
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
      // if (this.myChart != null) {
      //   this.myChart.showLoading();
      // }
      this.myChart.showLoading();
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
