<template>
  <div>
    <div :id="chartid" style="height:300px"></div>
  </div>
</template>

<script>
export default {
  name: "bar",
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

      let xdata = [];
      let yda = [];
      this.chartData.forEach(item => {
        xdata.push(item.name);
        yda.push(item.percent);
      });
      this.option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          itemWidth: 14,
          top: 20,
          data: [
            {
              name: this.chartid == "radarChart3" ? "月度回报" : "年度回报"
            }
          ]
        },
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: 0,
            start: 0,
            end:
              this.chartid == "radarChart3"
                ? monthdatainfo.length > 30
                  ? 10
                  : 100
                : 100
          }
        ],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xdata,
            triggerEvent: true,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              formatter: function(value) {
                var res = value;
                if (res.length > 5) {
                  res = res.substring(0, 4) + "..";
                }
                return res;
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} %",
              textStyle: {
                color: "#9d9d9d"
              }
            }
          }
        ],
        series: [
          {
            // name: this.chartid == "radarChart3" ? "月度回报" : "年度回报",
            type: "bar",
            // barWidth: "20",
            barMaxWidth: "30",
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  return params.data + "%";
                },
                position: "top"
              }
            },
            data: yda
          }
        ]
      };
      if (this.chartData.length > 0) {
        this.myChart.setOption(this.option, true);
        this.myChart.hideLoading();
      } else {
        if (this.myChart != null) {
          this.myChart.dispose();
        }
      }

      // extension(this.myChart);
      // let _this=this.myChart
      // function extension(_this) {
      //   //判断是否创建过div框,如果创建过就不再创建了
      //   var id = document.getElementById("extension");
      //   if (!id) {
      //     var div = "<div id = 'extension' sytle=\"display:none\"></div>";
      //     $("html").append(div);
      //   }

      //   this.myChart.on("mouseover", function(params) {
      //     if (params.componentType == "xAxis") {
      //       $("#extension")
      //         .css({
      //           position: "absolute",
      //           color: "black",
      //           //"border":"solid 2px white",
      //           "font-family": "Arial",
      //           "font-size": "20px",
      //           padding: "5px",
      //           display: "inline"
      //         })
      //         .text(params.value);

      //       $("html").mousemove(function(event) {
      //         var xx = event.pageX - 30;
      //         var yy = event.pageY + 20;
      //         $("#extension")
      //           .css("top", yy)
      //           .css("left", xx);
      //       });
      //     }
      //   });

      //   this.myChart.on("mouseout", function(params) {
      //     if (params.componentType == "xAxis") {
      //       $("#extension").css("display", "none");
      //       2;
      //     }
      //   });
      // }
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
