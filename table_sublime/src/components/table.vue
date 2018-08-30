<template>
  <div class="table">
    <table border="1" id="subtable">
      <thead>
        <tr v-if="nums == 1">
          <th v-for="item in weekthead" :colspan="item.colSpan" :id="item.id">{{item.title}}</th>
        </tr>
        <tr v-else>
          <th v-for="item in monthead" :colspan="item.colSpan" :id="item.id">{{item.title}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in newTable">
          <td>{{item.type}}</td>
          <td>{{item.text}}</td>
          <td v-if="nums == 1" v-for="ite in weekthead.length - 1" :id="item.id" @click="choice(item.id, ite+''+item.id)" :ref='ite+""+item.id'></td>
          <td v-if="nums == 0" v-for="ite in monthead.length - 1" :id="item.id" @click="choice(item.id, ite+''+item.id)" :ref='ite+""+item.id'></td>
        </tr>
      </tbody>
    </table>

    <table border="1" v-if="fsdata">
      <thead>
        <tr>
          <th v-for="item in fsdata.theads" :colspan="item.colSpan" :id="item.id">{{item.title}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in fsdata.tbodys">
          <td v-for="items in item" :colspan="items.colspan" :rowspan="items.rowspan" :id="items.id" :style='{"display": items.display}'>{{items.text}}</td>
        </tr>
      </tbody>
    </table>

    <table id="newtable">

    </table>

    <div class="hb">
      <h1>合并并发送数据</h1>
      <button id="btn" @click="hbh('#subtable', 1)">合并行单元格</button>
      <button id="btn" @click="hbl('#subtable', 1)">合并列单元格</button>
      <button id="btn" @click="cl('#subtable')">处理数据</button>
      <button id="btn" @click="fs('#subtable')">发送数据</button>
      <button id="btn" @click="hf('#subtable')">恢复表格</button>
    </div>

    <div>
      <h1>获取存储好的数据并渲染</h1>
      <button id="btn" @click="hqcu('#subtable')">获取存储好的数据并渲染</button>
    </div>

    <div class="choice">
      <h1>选择数据</h1>
      <select class="category" v-model="nums">
        <option value="0">主题计划</option>
        <option value="1">周计划</option>
      </select>
      <select class="classname">
        <option value="100">小班</option>
        <option value="200">中班</option>
        <option value="300">大班</option>
      </select>
      <select class="month">
        <option value="1">一月</option>
        <option value="2">二月</option>
        <option value="3">三月</option>
        <option value="4">四月</option>
        <option value="5">五月</option>
        <option value="6">六月</option>
        <option value="7">七月</option>
        <option value="8">八月</option>
        <option value="9">九月</option>
        <option value="10">十月</option>
        <option value="11">十一月</option>
        <option value="12">十二月</option>
      </select>
      <select class="status">
        <option value="0">保存</option>
        <option value="1">提交</option>
      </select>
      <select class="week">
        <option value="1">第一周</option>
        <option value="2">第二周</option>
        <option value="3">第三周</option>
        <option value="4">第四周</option>
      </select>
      <button id="getdata" @click="getmonthdata()">获取月数据</button>
      <button id="getdata" @click="getweekdata()">获取周数据</button>
    </div>

    <div class="mask" v-show="flag">
      <div class="content">
        <span v-for="(item, index) in maskData" :class="'li'+item.ref+index" :style='{"background": item.background}' @click="inner(item.name, item.ref, 'li'+item.ref+index)">{{item.name}}</span>
      </div>
      <button @click="sure()">确定内容</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      weekthead: [
        {title: '日期/星期', colSpan: 2},
        {title: '星期一', id: 1},
        {title: '星期二', id: 2},
        {title: '星期三', id: 3},
        {title: '星期四', id: 4},
        {title: '星期五', id: 5}
      ],
      monthead: [
        {title: '活动区 学习类型', colSpan: 2},
        {title: '人际交往智能', id: 2},
        {title: '内省智能', id: 6},
        {title: '语言智能', id: 1},
        {title: '逻辑数学智能', id: 8},
        {title: '自然探索智能', id: 7},
        {title: '视觉空间智能', id: 5},
        {title: '音乐智能', id: 3},
        {title: '身体运动智能', id: 4}
      ],
      nums: 0,
      tableList: {
        thbody: [
          {
            id: 1001,
            text: '区角活动',
            children: [
              {id: 8, text: '积木区', type: '区角活动'},
              {id: 3, text: '角色区', type: '区角活动'},
              {id: 2, text: '语言区', type: '区角活动'},
              {id: 5, text: '益智区', type: '区角活动'},
              {id: 6, text: '科学区', type: '区角活动'},
              {id: 7, text: '美工区', type: '区角活动'},
              {id: 4, text: '音乐区', type: '区角活动'}
            ]
          },
          {
            id: 1002,
            text: '集体·分组活动',
            children: [
              {id: 1, text: '集体教育活动', type: '集体·分组活动'},
              {id: 10, text: '童话/儿童剧', type: '集体·分组活动'},
              {id: 13, text: '音乐', type: '集体·分组活动'},
              {id: 11, text: '身体活动', type: '集体·分组活动'},
              {id: 12, text: '烹饪', type: '集体·分组活动'}
            ]
          }
        ]
      },
      newTable: [],
      allData: null,
      flag: false,
      maskData: [],
      fsdata: null,
      innerData: []
    }
  },
  created () {
    let tbody = this.tableList.thbody
    for (var i=0; i<tbody.length; i++) {
      for(var j=0; j<tbody[i].children.length; j++) {
        this.newTable.push(tbody[i].children[j])
      }
    }
  },
  methods: {
    hbh (tb, num) {
      // for (var i=0; i<$(tb)[0].rows.length; i++){
      //   _w_table_rowspan(tb, i)
      // }
      this._w_table_rowspan(tb, num)
    },
    hbl (tb, num) {
      for (var i = 0; i < $(tb)[0].rows.length; i++) {
        for (var j = 0; j < $(tb)[0].rows.length; j++) {
          this._w_table_colspan(tb, j)
        }
      }
    },
    _w_table_rowspan (_w_table_id, _w_table_colnum) {
      let _w_table_firsttd = ''
      let _w_table_currenttd = ''
      let _w_table_SpanNum = 0
      let _w_table_Obj = $(_w_table_id + ' tr td:nth-child(' + _w_table_colnum + ')')
      _w_table_Obj.each(function (i) {
        if (i == 0) {
          _w_table_firsttd = $(this)
          _w_table_SpanNum = 1
        } else {
          _w_table_currenttd = $(this)
          if (_w_table_firsttd.text() == _w_table_currenttd.text()) { // 这边注意不是val（）属性，而是text（）属性
            _w_table_SpanNum++
            _w_table_currenttd.hide() // remove();
            _w_table_firsttd.attr('rowSpan', _w_table_SpanNum)
          } else {
            _w_table_firsttd = $(this)
            _w_table_SpanNum = 1
          }
        }
      })
    },
    _w_table_colspan (_w_table_id, _w_table_rownum, _w_table_maxcolnum) {
      if (_w_table_maxcolnum == void 0) { _w_table_maxcolnum = 0 }
      let _w_table_firsttd = ''
      let _w_table_currenttd = ''
      let _w_table_SpanNum = 0
      $(_w_table_id + ' tr:nth-child(' + _w_table_rownum + ')').each(function (i) {
        let _w_table_Obj = $(this).children()
        _w_table_Obj.each(function (i) {
          if (i == 0) {
            _w_table_firsttd = $(this)
            _w_table_SpanNum = 1
          } else if ((_w_table_maxcolnum > 0) && (i > _w_table_maxcolnum)) {
            return ''
          } else {
            _w_table_currenttd = $(this)
            if (_w_table_firsttd.text() == _w_table_currenttd.text() && _w_table_firsttd.text() != '' && _w_table_currenttd.text() != '') {
              _w_table_SpanNum++
              _w_table_currenttd.hide() // remove();
              _w_table_firsttd.attr('colSpan', _w_table_SpanNum)
            } else {
              _w_table_firsttd = $(this)
              _w_table_SpanNum = 1
            }
          }
        })
      })
    },
    getweekdata () {
      let classname = $('.classname')[0].value
      let month = $('.month')[0].value
      let week = $('.week')[0].value
      let _this = this
      $.ajax({
        type: 'GET',
        url: '/api/portal_course/course/api/v1/activity?month=' + month + '&grade=' + classname + '&week=' + week,
        success: function (data) {
          _this.allData = data
          console.log(data)
        }
      })
    },
    getmonthdata() {
      let classname = $('.classname')[0].value
      let month = $('.month')[0].value
      let _this = this
      $.ajax({
        type: 'GET',
        url: '/api/portal_course/course/api/v1/activity/theme?month=' + month + '&grade=' + classname,
        success: function (data) {
          _this.allData = data
          console.log(data)
        }
      })
    },
    choice(id, ref) {
      if (!this.flag) {
        this.flag = true
      }
      this.maskData = []
      for (var i=0; i<this.allData.length; i++){
        if (this.allData[i].area == id) {
          this.allData[i].ref = ref
          this.maskData.push(this.allData[i])
        }
      }
      let all = []
      let bll = []
      let datas = this.$refs[ref][0].childNodes
      if (datas) {
        for (var i=0; i<datas.length; i++) {
          all.push(datas[i].innerText)
          bll.push({
            text: datas[i].innerText,
            background: datas[i].id
          })
        }
        for (var i=0; i<this.maskData.length; i++) {
          for(var j=0; j<all.length; j++) {
            if (this.maskData[i].name == all[j]) {
              this.maskData[i].background = 'orange'
            }
          }
        }
      }
      this.innerData = all
    },
    inner(name, ref, classname) {
      for (var i=0; i<$('.content').children().length; i++) {
        if ($('.content').children()[i].className == classname) {
          if ($('.content').children()[i].style.background == '') {
            $('.content').children()[i].style.background = 'orange';
            if (this.innerData.indexOf($('.content').children()[i].innerText) == -1) {
              this.innerData.push($('.content').children()[i].innerText)
            }
          } else if($('.content').children()[i].style.background == 'orange') {
            $('.content').children()[i].style.background = ''
            if (this.innerData.indexOf($('.content').children()[i].innerText) != -1) {
             this.innerData.splice(this.innerData.indexOf($('.content').children()[i].innerText), 1)
            }
          }
        }
      }
      let str = ''
      for (var i=0; i<this.innerData.length; i++) {
        str += '<span id='+this.innerData[i].background+'>'+this.innerData[i]+'</span>'
      }
      this.$refs[ref][0].innerHTML = str
    },
    sure(){
      if(this.flag) {
        this.flag = false
      }
      for (var i=0; i<$('.content')[0].children.length; i++) {
        $('.content')[0].children[i].style.background = ''
      }
      this.innerData = []
    },
    cl (tb) {
      let arr = Array.from($(tb)[0].rows).splice(1)
      let brr = []
      let crr = {}
      let child = {}
      let len = arr[0].cells.length
      let lens = null


      for (let i=0; i<arr.length; i++){
        lens = arr[i].cells.length
        for (let j=0; j<arr[i].cells.length; j++) {
          brr.push({
            text: arr[i].cells[j].innerText,
            colspan: arr[i].cells[j].colSpan,
            rowspan: arr[i].cells[j].rowSpan,
            display: arr[i].cells[j].style.display,
            id: arr[i].cells[j].id
          })
        }
      }
      let num = lens
      var Arr = new Array(Math.ceil(brr.length/num));
      for(var i = 0; i<Arr.length;i++){
        Arr[i] = new Array();
        for(var j = 0; j<num; j++){
          Arr[i][j] = '';
        }
      }
      for(var i = 0; i<brr.length;i++){
        Arr[parseInt(i/num)][i%num] = brr[i]; 
      }

      let arrs = {}

      if (this.nums == 1) {
        arrs.tbodys = Arr
        arrs.theads = this.weekthead
      } else if (this.nums == 0) {
        arrs.tbodys = Arr
        arrs.theads = this.monthead
      }
      this.fsdata = arrs
    },
    hf (tb) {
      for (var i=0; i<$(tb)[0].rows.length; i++) {
        for (var j=0; j<$(tb)[0].rows[i].cells.length; j++) {
          $(tb)[0].rows[0].cells[0].colSpan = 2
          $(tb)[0].rows[i].cells[j].colSpan = 1
          $(tb)[0].rows[i].cells[j].rowSpan = 1
          $(tb)[0].rows[i].cells[j].style.display = ''
        }
      }
    },
    fs (tb) {
      let classname = $('.classname')[0].value
      let month = $('.month')[0].value
      let week = $('.week')[0].value
      let category = $('.category')[0].value
      let status = $('.status')[0].value
      let _this = this

      console.log(this.fsdata)
      $.ajax({
        url: '/api/portal_course/course/api/v1/activity/data',
        type: 'post',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
          "grade": classname,
          "month": month,
          "week": week,
          "category": category,
          "status": status,
          "data": this.fsdata
        }),
        dataType: 'json',
        success: function (data) {
          console.log(data)
        },
        error: function (e) {
          console.log(e)
        }
      })
    },
    hqcu (tb) {
      let classname = $('.classname')[0].value
      let month = $('.month')[0].value
      let week = $('.week')[0].value
      let category = $('.category')[0].value
      let status = $('.status')[0].value
      let _this = this
      $.ajax({
        type: 'GET',
        url: '/api/portal_course/course/api/v1/activity/new?month=' + month + '&grade=' + classname + '&week=' + week + '&category=' + category + '&status=' + status,
        success: function (data) {
          // _this.allData = data
          // JSON.parse(data.data)
          console.log(data)
        }
      })
    }
  }
}
</script>

<style lang="css">
ul li {
  list-style: none;
}
.mask {
  background: rgba(0, 0, 0, .2);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.content {
  background: #fff;
  padding: 20px;
  width: 60%;
  margin: 20px auto;
}
.content span {
  display: block;
  padding: 8px 0;
  margin-bottom: 2px;
}
.content span.bg {
  background: #ff8a00;
}
th, td {
  font-size: 12px;
  line-height: 1.3;
  font-family: Tahoma, Helvetica, Arial, "Microsoft Yahei","微软雅黑", STXihei, 华文细黑, serif;
  color: #333;
  font-weight: normal;
}
table {
  margin: 0 auto;
  width: 1040px;
  border-top: 3px solid #4782ca;
  border-collapse: collapse;
  margin-top: 10px;
}
table thead th {
  color: #4782ca;
  background: #eff6ff;
  text-align: center;
  padding: 20px 0;
  border: 1px solid #d4d4d4;
  font-weight: bold;
}
table tbody td {
  padding: 20px 7px;
  line-height: 14px;
  border: 1px solid #d4d4d4;
}
table tbody td span {
  display: block;
  padding: 8px 0;
}
</style>
