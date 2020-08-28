<template>
  <div>
    <div class="without-data"
         v-if="tableData.length === 0">
      <div class="page-tab">
        <div class="page-inner">
          <div class="page-info">
            <el-row :gutter="24"
                    type="flex"
                    justify="center">
              <!-- v-if="deptType === 1" -->
              <el-col :span="4">
                <a class="inner">
                  <i class="iconX icon-register"></i>
                  <div class="inner-title normal">
                    诉求登记
                  </div>
                  <p class="desc"></p>
                  <div @click="addCheckIn"
                       class="inner-btn">诉求登记</div>
                  <!-- <el-button @click="addCheckIn"
                             type="primary">诉求登记</el-button> -->
                </a>
              </el-col>
              <el-col :span="4">
                <a class="inner">
                  <i class="iconX icon-ontime"></i>

                  <div class="inner-title primary">
                    在办件数
                  </div>
                  <div class="inner-count"><span class="sub-text">在办件数：</span>{{onCount}}</div>
                  <!-- <el-button type="info">在办件数{{ onCount }}</el-button> -->
                </a>
              </el-col>
              <el-col :span="4">
                <a class="inner">
                  <i class="iconX icon-banjie"></i>
                  <div class="inner-title success">
                    办结件数
                  </div>
                  <div class="inner-count"><span class="sub-text">办结件数：</span>{{isCount}}</div>
                </a>
              </el-col>
              <el-col :span="8"
                      style="padding-top: 15px;background: #f5f6f8;">
                <div id="mainThree"
                     :style="{width: '100%', height: '242px'}"></div>
              </el-col>
            </el-row>

          </div>
          <div class="page-content">
            <el-row :gutter="24"
                    class="page-content_inner">
              <el-col :lg="20"
                      :md="20"
                      :sm="24"
                      style="border: solid 1px #ccc;padding-top: 15px;margin-top: 15px;">
                <div class="legend-box">
                  <el-row :gutter="20"
                          type="flex"
                          justify="center">
                    <el-col :span="6">
                      <el-date-picker class="date-picker-newClass"
                                      type="daterange"
                                      v-model="rangeDate"
                                      range-separator="/"
                                      value-format="yyyy-MM-dd"
                                      format="yyyy-MM-dd"
                                      @change="timeChange"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"></el-date-picker>
                    </el-col>
                    <el-col :span="2">
                      <el-button type="primary"
                                 @click="getMouthData()">查询</el-button>
                    </el-col>
                  </el-row>
                </div>
                <div id="main"
                     :style="{width: '100%', height: '300px'}"></div>
              </el-col>
              <el-col :lg="20"
                      :md="20"
                      :sm="24"
                      style="border: solid 1px #ccc;padding-top: 15px;margin-top: 15px;">
                <div class="legend-box">
                  <el-row :gutter="20"
                          type="flex"
                          justify="center">
                    <el-col :span="6">
                      <el-date-picker v-model="yearStr"
                                      type="year"
                                      placeholder="选择年">
                      </el-date-picker>
                    </el-col>
                    <el-col :span="2">
                      <el-button type="primary"
                                 @click="getYearData()">查询</el-button>
                    </el-col>

                  </el-row>
                </div>
                <div id="mainTwo"
                     :style="{width: '100%', height: '300px'}"></div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="content"
         v-else></div>
    <check-in v-if="visible"
              :title="title"
              :visible="visible"
              @close="visible = false"
              @handleUpdate="handleUpdate"></check-in>
  </div>
</template>

<script>
import CheckIn from './dialog/newCheck'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
require('echarts/lib/component/markLine')

export default {
  name: 'dashBoard',
  components: { CheckIn },
  data() {
    const deptType = sessionStorage.getItem('deptType') - 0
    return {
      deptType: null,
      /* pageniation */
      pageNum: 1,
      pageSize: 15,
      total: 0,
      endNumber: 0,

      tableData: [],

      visible: false,
      title: null,
      onCount: null,
      isCount: null,
      yearDict: ['2018', '2019', '2020'],
      searchForm: {
        startDate: null,
        endDate: null,

      },
      rangeDate: [],
      xAxis1: [],
      yAxis1: [],
      xAxis2: [],
      yAxis2: [],
      yAxis3: [],
      ratioData: [],
      isLogin: false,
      userName: null,
      position: null,
      yearStr: null
    }
  },
  computed: {
    computeLogin() {
      const isLogin = sessionStorage.getItem('isLogin')
      return isLogin
    },
    computeDept() {
      const dept = sessionStorage.getItem('deptType') ? sessionStorage.getItem('deptType') - 0 : null
      return dept
    },
    options() {
      const _ = this
      let option = {
        title: {
          text: '诉求类型办结数图',

        },
        color: ['#2e5aa6'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: [
          {
            type: 'category',
            data: _.xAxis1,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              margin: 8,
              interval: 0,//解决代码
              textStyle: {
                color: "#676767"
              }
            }
          }
        ],
        yAxis: {
          type: 'value',
          minInterval: 1
        },
        series: [{
          data: _.yAxis1,
          type: 'bar',
          barWidth: '50%',
        }]
      }
      return option
    },
    eOptions() {
      const _ = this
      let option = {
        color: ['#2e5aa6', '#84AEEF'],
        title: {
          text: '月份办件数图',
        },
        legend: {
          top: 20,
          right: '8%',
          data: ['在办件', '办结件']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: [
          {
            type: 'category',
            data: _.xAxis2,
            axisLabel: {
              margin: 8,
              interval: 0,//解决代码
              textStyle: {
                color: "#676767"
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            minInterval: 1
          }
        ],
        series: [
          {
            name: '在办件',
            type: 'bar',
            barGap: 0,
            barWidth: '50%',
            data: _.yAxis2
          },
          {
            name: '办结件',
            type: 'bar',
            barGap: 0,
            barWidth: '50%',
            data: _.yAxis3
          },
        ]
      }
      return option
    },
    rOptions() {
      const _ = this
      let option = {
        // title: {
        //   text: '各状态办件数占比图',
        //   left: 'left'
        // },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: ['审核', '在办', '完结', '退回']
        },
        series: [
          {
            name: '事件比例',
            type: 'pie',
            data: _.ratioData
          }
        ]
      }
      return option
    }
  },
  methods: {
    addCheckIn() {
      if (this.computeDept === 2) {
        return
      }
      this.visible = true
      this.title = '诉求登记'
    },
    handleUpdate(val) {
      console.log('Handle Update')
    },
    getList() {
      const url = `/api/login/index`,
        _ = this
      _.$http.post(url, {}).then(res => {
        console.log('Dash board List', res)
      }).catch(err => {
        console.log('Loading DashBoard Data Faild.')
      })
    },
    getHomeList() {
      const url = `/api/question/homeCount`
      this.$http.get(url).then(res => {
        console.log('Get Home Data List', res)
        this.isCount = res.list.isCounts[0] ? res.list.isCounts[0] : '0'
        this.onCount = res.list.noneCounts[0] ? res.list.noneCounts[0] : '0'
      }).catch(err => {
        console.log('Get Home Data Faild.', err)
      })
    },
    getCount() {
      const url = `/api/question/questionTypeCount`
      const params = {
        createDate: 'null',
        endDate: 'null'
      }
      this.$http.get(url).then(res => {
        console.log('Questition Count.', res)
      })
    },
    getYearData() {
      const mainTwo = echarts.init(document.getElementById('mainTwo'))
      const str = this.yearStr ? this.yearStr.toString().substring(11, 15) : ''
      const url = `/api/question/monthCount`
      this.$http.get(url, { yearString: str }).then(res => {
        console.log('Get Year Echart Data', res)
        const { months = [], isCounts = [], noneCounts = [] } = res.list
        this.xAxis2 = months
        this.yAxis2 = noneCounts
        this.yAxis3 = isCounts
        mainTwo.setOption(this.eOptions)
      }).catch(err => {
        console.log(err)
      })
      window.addEventListener('resize', () => {
        mainTwo.resize()
      })
    },
    getMouthData() {
      const mainCharts = echarts.init(document.getElementById('main'))
      const url = `/api/question/questionTypeCount`
      const params = {
        startDate: this.searchForm.startDate || '',
        endDate: this.searchForm.endDate || ''
      }
      this.$http.get(url, params).then(res => {
        console.log('Get Mouth Data', res)
        const { y = [] } = res.list,
          { x = [] } = res.list
        this.xAxis1 = x
        this.yAxis1 = y
        console.log(this.options)
        mainCharts.setOption(this.options, true)
      }).catch(err => {
        console.log(err)
      })
      window.addEventListener('resize', () => {
        mainCharts.resize()
      })
    },
    getRatioCount() {
      const mainThree = echarts.init(document.getElementById('mainThree'))
      const url = `/api/question/homeRatioCount`
      const params = {
        createDate: ''
      }
      this.$http.get(url, params).then(res => {
        console.log('Ratio Count.', res)
        this.ratioData = res.list
        console.log(this.rOptions)
        mainThree.setOption(this.rOptions)
      }).catch(err => {
        console.log(err)
      })
      window.addEventListener('resize', () => {
        mainThree.resize()
      })
    },
    timeChange() {
      this.searchForm.startDate = this.rangeDate ? this.rangeDate[0] + '' : ''
      this.searchForm.endDate = this.rangeDate ? this.rangeDate[1] + '' : ''
    }
  },
  beforeMount() {
    const dept = sessionStorage.getItem('deptType') ? sessionStorage.getItem('deptType') : null
    console.log(dept)
    this.deptType = dept
  },
  mounted() {
    if (this.computeLogin) {
      this.getHomeList()
      this.getYearData()
      this.getCount()
      this.getRatioCount()
      this.getMouthData()
    }
  },
  activated() {
    if (this.computeLogin) {
      this.getHomeList()
      this.getYearData()
      this.getCount()
      this.getRatioCount()
      this.getMouthData()
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  padding-top: 15px;
}
.page-content_inner {
  margin-left: 0 !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.iconX {
  display: block;
  width: 100%;
  text-align: center;
  height: 60px;

  &.icon-register {
    background: url('~@/assets/icon/icon-register.svg') center center no-repeat;
    background-size: auto 50%;
  }
  &.icon-banjie {
    background: url('~@/assets/icon/icon-banjie.svg') center center no-repeat;
    background-size: auto 50%;
  }
  &.icon-ontime {
    background: url('~@/assets/icon/icon-ontime.svg') center center no-repeat;
    background-size: auto 50%;
  }
}
.inner {
  display: block;
  padding: 10px;
  height: 260px;
  background: #f5f6f8;
  position: relative;
  text-align: center;
  color: #302d46;
  &:hover {
    text-decoration: none;
    background: #2e5aa6;
    color: #fff;
    .icon-register {
      background: url('~@/assets/icon/icon-register_active.svg') center center
        no-repeat;
      background-size: auto 50%;
    }
    .icon-banjie {
      background: url('~@/assets/icon/icon-banjie_active.svg') center center
        no-repeat;
      background-size: auto 50%;
    }
    .icon-ontime {
      background: url('~@/assets/icon/icon-ontime_active.svg') center center
        no-repeat;
      background-size: auto 50%;
    }
  }
  .inner-title {
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    // &.primary {
    //   background: #409eff;
    // }
    // &.success {
    //   background: #67c23a;
    // }
    // &.normal {
    //   background: #2969b2;
    // }
  }
  .inner-btn {
    margin-top: 80px;
    display: inline-block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-weight: 300;
    border-radius: 2px;
    border: solid 1px #ccc;
    text-align: center;
    cursor: pointer;
  }
  .inner-count {
    padding-top: 80px;
    display: inline-block;
    vertical-align: baseline;
    width: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    .sub-text {
      font-size: 14px;
      font-weight: 300;
    }
  }
}
</style>
<style>
.el-range-editor,
.el-date-editor--year {
  width: 100% !important;
}
.el-button--primary {
  /* background: #2e5aa6 !important;
  border-radius: none !important; */
}
</style>
