require('./index.styl')

var ievent = require('./commons/ievent')
var router = require('./commons/router')

var globalNav  = require('./modules/nav_global')
var pageEditor = require('./page_editor')
var pageList   = require('./page_list')
var pageDetail = require('./page_detail')
var pageNew    = require('./page_new')

var stage  = $('#stage')
var header = $('#header')

// 初始化全局导航条
header.append(globalNav.render().el)

// 初始化涉及的所有页面
// 注意：这里的初始化仅仅是占个坑，待 router 生效后才会真正的执行对应的初始化
_.each([
  pageEditor,
  pageList,
  pageDetail,
  pageNew
], function (subStage) {
  stage.append(subStage.el)
})

var hasAMatchRoute = Backbone.history.start({pushState: false})
!hasAMatchRoute && router.navigate("list", {trigger: true})