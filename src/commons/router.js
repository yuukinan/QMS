var ievent = require('./ievent')
// var server = require('./server')

var Router = Backbone.Router.extend({

  routes: {
    "editor(/:id)" : "pageEditor",
    "list"         : "pageList",
    "detail(/:id)" : "pageDetail",
    "new"          : "pageNew",
    "add"          : "pageEditor",
    "edit(/:id)"         : "pageEditor",
    "data(/:id)"   : "pageDetail"
  },

  pageEditor: function (id) {
    ievent.trigger('page:editor', 'page:editor', id || '')
  },

  pageList: function () {
    ievent.trigger('page:list', 'page:list')
  },

  pageDetail: function (id) {
    ievent.trigger('page:detail', 'page:detail', id || '')
  },

  pageNew: function () {
    ievent.trigger('page:new', 'page:new')
  }
})

var router = new Router

module.exports = router