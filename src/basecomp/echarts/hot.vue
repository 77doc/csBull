<template>
  <div>
    <div :id="chartid" style="height:600px;"></div>
  </div>
</template>

<script>
export default {
  name: "hot",
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
      //   app.title = "笛卡尔坐标系上的热力图";
   
      let hours = [];
      let days = [];
      let code = [];
      let arr = [];
      let data = [];
      let sss = [];
      if (this.chartData.length != 0) {
        // this.chartData=this.chartData.splice(0,10)
        let relevance = JSON.parse(this.chartData[0].relevance);
        hours = Object.keys(relevance);
      }
      this.chartData.forEach((item, key) => {
        days.push(item.strSName);
        code.push(item.strSCode);
        // hours.forEach((temp, index) => {
        //    let ance = JSON.parse(item.relevance);
      
        //  arr=[key,index,this.$utils.fmoney(ance[code[index]], 4, false, false)]
        //  data.push(arr);
        // });
      });
      days.forEach(item => {
        sss.push("");
      });
      this.chartData.forEach((item, key) => {
        hours.forEach((temp, index) => {
          let ance = JSON.parse(item.relevance);
          let str = "";
          //  arr=[key,index,this.$utils.fmoney(ance[code[index]], 4, false, false)]
     
          // if (ance[code[index]] != 1) {
          //    str = ance[code[index]].toString().substr(0, 6);
          // }
          // console.log(ance)
          // console.log(code)
          // console.log(ance[code[index]])
          // console.log(ance[code[index]])
          str = ance[code[index]].toString().substr(0, 6);

          arr = [key, index, str];
          data.push(arr);
        });
      });
    
      // var data = [
      //   [0, 0, 5],
      //   [0, 1, 1],
      //   [0, 2, 0],
      //   [0, 3, 0],
      //   [0, 4, 0],
      //   [0, 5, 0],
      //   [0, 6, 0],
      //   [0, 7, 0],
      //   [0, 8, 0],
      //   [0, 9, 0],
      //   [0, 10, 0],
      //   [0, 11, 2],
      //   [0, 12, 4],
      //   [0, 13, 1],
      //   [0, 14, 1],
      //   [0, 15, 3],
      //   [0, 16, 4],
      //   [0, 17, 6],
      //   [0, 18, 4],
      //   [0, 19, 4],
      //   [0, 20, 3],
      //   [0, 21, 3],
      //   [0, 22, 2],
      //   [0, 23, 5],
      //   [1, 0, 7],
      //   [1, 1, 0],
      //   [1, 2, 0],
      //   [1, 3, 0],
      //   [1, 4, 0],
      //   [1, 5, 0],
      //   [1, 6, 0],
      //   [1, 7, 0],
      //   [1, 8, 0],
      //   [1, 9, 0],
      //   [1, 10, 5],
      //   [1, 11, 2],
      //   [1, 12, 2],
      //   [1, 13, 6],
      //   [1, 14, 9],
      //   [1, 15, 11],
      //   [1, 16, 6],
      //   [1, 17, 7],
      //   [1, 18, 8],
      //   [1, 19, 12],
      //   [1, 20, 5],
      //   [1, 21, 5],
      //   [1, 22, 7],
      //   [1, 23, 2],
      //   [2, 0, 1],
      //   [2, 1, 1],
      //   [2, 2, 0],
      //   [2, 3, 0],
      //   [2, 4, 0],
      //   [2, 5, 0],
      //   [2, 6, 0],
      //   [2, 7, 0],
      //   [2, 8, 0],
      //   [2, 9, 0],
      //   [2, 10, 3],
      //   [2, 11, 2],
      //   [2, 12, 1],
      //   [2, 13, 9],
      //   [2, 14, 8],
      //   [2, 15, 10],
      //   [2, 16, 6],
      //   [2, 17, 5],
      //   [2, 18, 5],
      //   [2, 19, 5],
      //   [2, 20, 7],
      //   [2, 21, 4],
      //   [2, 22, 2],
      //   [2, 23, 4],
      //   [3, 0, 7],
      //   [3, 1, 3],
      //   [3, 2, 0],
      //   [3, 3, 0],
      //   [3, 4, 0],
      //   [3, 5, 0],
      //   [3, 6, 0],
      //   [3, 7, 0],
      //   [3, 8, 1],
      //   [3, 9, 0],
      //   [3, 10, 5],
      //   [3, 11, 4],
      //   [3, 12, 7],
      //   [3, 13, 14],
      //   [3, 14, 13],
      //   [3, 15, 12],
      //   [3, 16, 9],
      //   [3, 17, 5],
      //   [3, 18, 5],
      //   [3, 19, 10],
      //   [3, 20, 6],
      //   [3, 21, 4],
      //   [3, 22, 4],
      //   [3, 23, 1],
      //   [4, 0, 1],
      //   [4, 1, 3],
      //   [4, 2, 0],
      //   [4, 3, 0],
      //   [4, 4, 0],
      //   [4, 5, 1],
      //   [4, 6, 0],
      //   [4, 7, 0],
      //   [4, 8, 0],
      //   [4, 9, 2],
      //   [4, 10, 4],
      //   [4, 11, 4],
      //   [4, 12, 2],
      //   [4, 13, 4],
      //   [4, 14, 4],
      //   [4, 15, 14],
      //   [4, 16, 12],
      //   [4, 17, 1],
      //   [4, 18, 8],
      //   [4, 19, 5],
      //   [4, 20, 3],
      //   [4, 21, 7],
      //   [4, 22, 3],
      //   [4, 23, 0],
      //   [5, 0, 2],
      //   [5, 1, 1],
      //   [5, 2, 0],
      //   [5, 3, 3],
      //   [5, 4, 0],
      //   [5, 5, 0],
      //   [5, 6, 0],
      //   [5, 7, 0],
      //   [5, 8, 2],
      //   [5, 9, 0],
      //   [5, 10, 4],
      //   [5, 11, 1],
      //   [5, 12, 5],
      //   [5, 13, 10],
      //   [5, 14, 5],
      //   [5, 15, 7],
      //   [5, 16, 11],
      //   [5, 17, 6],
      //   [5, 18, 0],
      //   [5, 19, 5],
      //   [5, 20, 3],
      //   [5, 21, 4],
      //   [5, 22, 2],
      //   [5, 23, 0],
      //   [6, 0, 1],
      //   [6, 1, 0],
      //   [6, 2, 0],
      //   [6, 3, 0],
      //   [6, 4, 0],
      //   [6, 5, 0],
      //   [6, 6, 0],
      //   [6, 7, 0],
      //   [6, 8, 0],
      //   [6, 9, 0],
      //   [6, 10, 1],
      //   [6, 11, 0],
      //   [6, 12, 2],
      //   [6, 13, 1],
      //   [6, 14, 3],
      //   [6, 15, 4],
      //   [6, 16, 0],
      //   [6, 17, 0],
      //   [6, 18, 0],
      //   [6, 19, 0],
      //   [6, 20, 1],
      //   [6, 21, 2],
      //   [6, 22, 2],
      //   [6, 23, 6]
      // ];

      data = data.map(function(item) {
        return [item[1], item[0], item[2] || "-"];
      });
      this.option = {
        tooltip: {
          position: "top"
        },
        animation: false,
        grid: {
          right:'0',
          top: "120",
          y2: "60"
        },
        xAxis: [
          {
            type: "category",
            data: sss,
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            axisLine: {
              show: false
            },
            splitArea: {
              show: true
            }
          },
          {
            type: "category",
            data: days,
            // position:top,
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            splitArea: {
              show: true
            }
          }
        ],
        yAxis: {
          type: "category",
          data: days,
          inverse: true,
            axisLabel: {
              interval: 0,
              rotate: 40
            },
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: -1,
          max: 1,
          calculable: true,
          // itemWidth:100,
          orient: "horizontal",
          inRange: {
            color: ["#4e863b", "#ffffff", "#cc2a1f"]
          },
          left: "center"
          // bottom: "15%"
        },
        series: [
          {
            // name: "Punch Card",
            type: "heatmap",
            data: data,
            // barMaxWidth:330,
            label: {
              normal: {
                color: "#333333",
                show: true
              }
            },
            itemStyle: {
              borderColor: "#ffffff",
              emphasis: {
                shadowBlur: 1,
                shadowColor: "rgba(0, 0, 0, 0.5)",
                borderColor: "#ffffff"
              }
            }
          }
        ]
      };
      if (this.chartData.length > 0) {
        //  document.getElementById(this.chartid).style.width = this.interval + "px";
        //  this.myChart.resize();
        this.myChart.setOption(this.option, true);
        this.myChart.hideLoading();
      } else {
        if (this.myChart != null) {
          this.myChart.dispose();
        }
      }
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
