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
    // this.drawRadar();
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
       let monthdata=[];
       let monthdatainfo=[]
      this.chartData.forEach(item => {
        data = JSON.parse(item.ratingYM);
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
        if(xdata.length ==1){
          for (var i=0;i<12;i++){        
            let month=i+1<10?xdata+'-0'+(i+1):xdata+'-'+(i+1)
            monthdata.push(month)
          }
        }else{
          for (var i=0;i<12;i++){
            xdata.forEach(item =>{
              let month=i+1<10?item+'-0'+(i+1):item+'-'+(i+1)
              monthdata.push(month)
            })        
            
          }
        }
        monthdata.sort((a,b) =>{
          return new Date(a)-new Date(b)
        })
        // xdata.forEach((item,index) =>{
        //   yda.push(ydata[item])
        // })
        let val = Object.values(item);
        console.log(val)
        // let yarr={
        // }
        //  yarr[key]=val[0]
        //  ydata=item
        // ydata.push(yarr)
        // yda =ydata
        //  chart3obj=item.month
        let ynum=this.$utils.fmoney(val[0]*100,2,false,true)
        // val[1].forEach(item =>{
        //   monthdatainfo.push(item)
        // })
        monthdatainfo= monthdatainfo.concat(Object.values(val[1]))
        monthdatainfo.forEach((item,index) =>{
            monthdatainfo[index]=this.$utils.fmoney(item,2,false,true)  
        })
        yda.push(ynum);
      });
      console.log(yda);
      console.log(ydata);
      console.log(monthdatainfo)

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
              name: "年度回报"
            }
          ]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.chartid =='radarChart3'?monthdata:xdata,
            axisTick: {
              alignWithLabel: true
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
            name: "年度回报",
            type: "bar",
            barWidth: "30",
            data: this.chartid =='radarChart3'?monthdatainfo:yda
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
