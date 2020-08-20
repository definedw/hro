<template>
  <div>
    <div class="without-data"
         v-if="tableData.length === 0">
      <div class="page-tab">
        <div class="page-inner">
          <div class="page-info">
            <el-row :gutter="20">
              <el-col :span="4"
                      v-if="deptType === 1">
                <div class="inner">
                  <el-button @click="addCheckIn"
                             type="primary">诉求登记</el-button>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="inner">
                  <el-button type="info">在办件数{{ onCount }}</el-button>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="inner">
                  <el-button type="success">办结件数{{ isCount }}</el-button>
                </div>
              </el-col>
              <el-col :span="8"
                      style="border: solid 1px #ccc;padding-top: 15px;border-radius: 5px;">
                <div id="mainThree"
                     :style="{width: '100%', height: '242px'}"></div>
              </el-col>
            </el-row>

          </div>
          <div class="page-content">
            <el-row :gutter="24"
                    style="margin-left: 0;">
              <el-col :span="12"
                      :lg="18"
                      :md="20"
                      style="border: solid 1px #ccc;padding-top: 15px;margin-top: 15px;"
                      :sm="24">
                <div class="legend-box">
                  <el-row :gutter="15"
                          type="flex"
                          justify="end">
                    <el-col :span="9">
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
                    <el-col :span="3">
                      <el-button type="primary"
                                 style="width: 100%;text-align: center"
                                 @click="getMouthData()">按月统计</el-button>
                    </el-col>
                  </el-row>
                </div>
                <div id="main"
                     :style="{width: '100%', height: '300px'}"></div>
              </el-col>
              <el-col :span="12"
                      :lg="18"
                      :md="20"
                      :sm="24"
                      style="border: solid 1px #ccc;padding-top: 15px;margin-top: 15px;">
                <div class="legend-box">
                  <el-row :gutter="15"
                          type="flex"
                          justify="end">
                    <el-col :span="3">
                      <el-button type="primary"
                                 @click="getYearData('2018')">2018</el-button>
                    </el-col>
                    <el-col :span="3">
                      <el-button type="primary"
                                 @click="getYearData('2019')">2019</el-button>
                    </el-col>
                    <el-col :span="2">
                      <el-button type="primary"
                                 style="width: 100%;"
                                 @click="getYearData('2020')">2020</el-button>
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
require('echarts/lib/component/markLine')

export default {
  name: 'dashBoard',
  components: { CheckIn },
  data() {
    return {
      deptType: parseInt(sessionStorage.getItem('deptType')),
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
        yearStr: null
      },
      rangeDate: [],
      xAxis1: [],
      yAxis1: [],
      xAxis2: [],
      yAxis2: [],
      yAxis3: [],
      ratioData: []
    }
  },
  created() {
  },
  computed: {
    options() {
      const _ = this
      let option = {
        title: {
          text: 'test',
          show: true,
          textStyle: {
            fontSize: 16
          }
        },
        color: ['#3398DB'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
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
          type: 'value'
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
        color: ['#3398DB', '#4cabce'],
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
            type: 'value'
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
        title: {
          text: '比例图',
          left: 'center'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          left: 'right',
          data: ['审核', '在办', '办结', '退回']
        },
        series: [
          {
            name: '比例图',
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
    getYearData(str) {
      const mainTwo = echarts.init(document.getElementById('mainTwo'))

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
  mounted() {
    this.getHomeList()
    this.getYearData()
    this.getCount()
    this.getRatioCount()
    this.getMouthData()
  },
  activated() {
    this.getHomeList()
    this.getYearData()
    this.getCount()
    this.getRatioCount()
    this.getMouthData()
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  padding-top: 15px;
}
.el-range-editor {
  width: 100% !important;
}
.inner {
  display: block;
  padding: 10px;
  height: 260px;
  border: solid 1px #ccc;
  border-radius: 5px;
}
</style>
