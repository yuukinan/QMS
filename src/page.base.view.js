var ievent = require('./commons/ievent')

var PageBaseView = Backbone.View.extend({

  className: "sub-stage",

  // event name
  ename : '',

  isFirstInit : true,

  _initialize : function () {
    console.log('_initialize', this.ename)
    ievent.on(this.ename, this.render, this)
  },

  _render : function () {
    this.show()
    this.isFirstInit && this.$el.html(this.template())
    return this
  },

  show : function () {
    $('#stage .sub-stage').removeClass('active')
    this.$el.addClass('active')
  },

  initSubComponents : function () {}

})

module.exports = PageBaseView