console.log('list start...')
require('./index.styl')

var template     = require('./template.html')
var PageBaseView = require('../page.base.view')
var ievent       = require('../commons/ievent')
var server       = require('../commons/server')
var store        = require('../commons/store')
var router       = require('../commons/router')

// 列表项
var Item         = require('./item')

var PageList = PageBaseView.extend({

  id: 'pageList',

  ename: 'page:list',

  template: template,

  events: {

    'click .selectAll'  : 'selectAllHandler',
    'click .delSelectd' : 'delSelectdHandler'

  },

  initialize: function () {
    this._initialize(arguments)
  },

  render: function () {
    this._render()

    // if (this.isFirstInit) {
    //   this.isFirstInit = false
    // }

    // 渲染列表项
    this.renderItem()

    return this
  },

  selectAllHandler: function (evt) {
    var checked = evt.target.checked
    var checkboxs = this.$el.find('input[name="list-item"]')

    _.each(checkboxs, function (ele) {
      ele.checked = checked
    })
  },

  delSelectdHandler: function () {
    var selectArray = []
    var checkboxs = this.$el.find('input[name="list-item"]:checked')
    var temp = null
    var self = this

    _.each(checkboxs, function (ele) {
      temp = $(ele).closest('.list-item').attr('id')
      selectArray.push(temp)
    })

    // 删除选中的
    store.delSelected(selectArray, function () {
      checkboxs.closest('tr').remove()
    })
  },

  renderItem: function () {
    var container = this.$el.find('tbody')
    var tempItem  = null

    // 先清空
    container.html({})


    // test
    var data = [{
        id: 1,
        title: '这是问卷1',
        createdAt: '2015-08-09',
        status: 'unPublish',
        checked: false
      }, {
        id: 2,
        title: '这是问卷2',
        createdAt: '2015-08-21',
        status: 'published',
        checked: false
      }, {
        id: 3,
        title: '这是问卷3',
        createdAt: '2015-12-09',
        status: 'end',
        checked: false
      }]

    data.forEach(function (ele) {
        tempItem = new Item(ele)
        container.append(tempItem.render().el)
      })


    store.list(function (data) {
      console.log(data)
      data.forEach(function (ele) {
        tempItem = new Item(ele)
        container.append(tempItem.render().el)
      })
    })

    return this
  }

//  dataHandler: function(){
//   var id = $("#data-id")
//  }
})

var pageList = new PageList

module.exports = pageList