<template>
  <div>
    <h1>花卉管理系统首页</h1>
    <el-row type="flex" justify="center"> <!-- 1. 行容器水平居中 -->
      <el-col :span="12" style="display: flex; justify-content: center;"> <!-- 2. 列容器水平居中 -->
        <div id="main1" style="width:500px;height:500px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {

    mounted() {//页面元素渲染之后再触发

   var chartDom1 = document.getElementById('main1');
      var myChart1 = echarts.init(chartDom1);
      var option1 = {
         title: {
        text: '热销花卉统计',
        subtext: '趋势图',
        left: 'center'
      },
        tooltip: {
        trigger: 'item'
      },
        legend: {
        orient: 'vertical',
        left: 'left'
      },
        xAxis: {
           type: 'value'
        },
        yAxis: {
          type: 'category',
          data: []
        },
        series: [
          {
            // name:"批发",
            data: [],
            type: 'bar'//柱状图
            // type: 'line'//折线图
          },
        ]
      };




 

  this.request.get("/echarts/members1").then(res1 =>{
    console.log(res1.data)
    // if(this.res.data != undefined || this.res.data.length >0){
       for (var i = 0; i < res1.data.length; i++) {
    var item = res1.data[i];
  option1.yAxis.data.push(item.name);
   option1.series[0].data.push(item.proSales);
}
 myChart1.setOption(option1);
//如果数据量大时，可能会因为数据加载不完全就渲染图表，会引发报错，因此可以使用setTimeout进行延时处理
})

   this.request.get("/echarts/members").then(res =>{
     console.log(res.data)
        //填空
        // option.xAxis.data=res.data.x 
        option.series[0].data=res.data
        //在数据准备完毕之后再set
        myChart.setOption(option);

  


        }  )

 myChart.setOption(option);




  this.request.get("/customer/findsale").then(res =>{
     this.retail=res.data
      
        }  )
          this.request.get("/customer/findwholesale").then(res =>{
     this.wholeretail=res.data
      
        }  )
        this.request.get("/put/findsum").then(res =>{
       this.expend=res.data
      
        }  )
  this.request.get("/out/findsum").then(res =>{
       this.income=res.data
        }  )
          this.request.get("/out/findwholesale").then(res =>{
       this.volume=res.data
        }  )
//如果数据量大时，可能会因为数据加载不完全就渲染图表，会引发报错，因此可以使用setTimeout进行延时处理
}


}

  

</script>

<style>

</style>