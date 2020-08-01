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
      let _this = this;
      let data = [];
      let xdata = [];
      let ydata = [];
      let yda = [];
      let chart3xdata = [];
      let chart3ydata = [];
      let chart3obj = {};
      let key = [];
      let monthdata = [];
      let monthdatainfo = [];
      this.chartData.forEach(item => {
        if (item.type == "group") {
          data = JSON.parse(item.ratingYM);
        }
      });
      data.forEach(item => {
        xdata = xdata.concat(Object.keys(item));
        key = Object.keys(item);

        let a = ["month"];
        xdata = xdata.filter(function(e) {
          return a.indexOf(e) < 0;
        });
        key = key.filter(function(e) {
          return a.indexOf(e) < 0;
        });
      
        if (xdata.length == 1) {
          for (var i = 0; i < 12; i++) {
            let month =
              i + 1 < 10 ? xdata + "-0" + (i + 1) : xdata + "-" + (i + 1);
            monthdata.push(month);
          }
        } else {
          for (var i = 0; i < 12; i++) {
            xdata.forEach(item => {
              let month =
                i + 1 < 10 ? item + "-0" + (i + 1) : item + "-" + (i + 1);
              monthdata.push(month);
            });
          }
        }
        monthdata.sort((a, b) => {
          return new Date(a) - new Date(b);
        });
        // xdata.forEach((item,index) =>{
        //   yda.push(ydata[item])
        // })
        let val = Object.values(item);
        // let yarr={
        // }
        //  yarr[key]=val[0]
        //  ydata=item
        // ydata.push(yarr)
        // yda =ydata
        //  chart3obj=item.month
    
        let ynum = this.$utils.fmoney(val[0] * 100, 2, false, true);
        // val[1].forEach(item =>{
        //   monthdatainfo.push(item)
        // })
        monthdatainfo = monthdatainfo.concat(Object.values(val[1]));

        yda.push(ynum);
      });
      monthdata = Array.from(new Set(monthdata));

      monthdatainfo.forEach((item, index) => {
     
        if (item == "--") {
          delete monthdatainfo[index];
          delete monthdata[index];
          // monthdatainfo.splice(index, index);
          // monthdata.splice(index, index);
        }
      });
      monthdatainfo.forEach((item, index) => {
        monthdatainfo[index] = this.$utils.fmoney(item * 100, 2, false, true);
      });

      // monthdatainfo.forEach((item,index) =>{
    
      //     if (item === 0) {
      //       monthdatainfo.splice(index, index);
      //       monthdata.splice(index, index);
      //     }
      // })
      let newmonthdata = [];
      let newmonthdatainfo = [];
      monthdata.forEach(item => {
        if (item != "undefined") {
          newmonthdata.push(item);
        }
      });
      monthdatainfo.forEach(item => {
        if (item != "undefined") {
          newmonthdatainfo.push(item);
        }
      });
      this.option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          //  formatter: "{a}:{b}:{c}",
          formatter: "{b}<br>{a}:{c}%",
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
                ? newmonthdatainfo.length > 30
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
            data: this.chartid == "radarChart3" ? newmonthdata : xdata,
            axisTick: {
              alignWithLabel: true
            }
            // axisLabel:{
            //   // interval:this.chartid =='radarChart9'?'0':'auto'
            //   interval:0
            // }
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
            name: this.chartid == "radarChart3" ? "月度回报" : "年度回报",
            type: "bar",
            // barWidth: "20",
            barMaxWidth: "30",
           label:{
             show:true,
             position:'top',
             formatter:"{c}%"
           },
            data: this.chartid == "radarChart3" ? newmonthdatainfo : yda
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
