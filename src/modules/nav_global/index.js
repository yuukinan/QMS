require('./index.styl')

var ievent   = require('../../commons/ievent')
var template = require('./template.html')

var GlobalNav = Backbone.View.extend({

  tagName: "div",

  className: "nav-global",

  events: {
    'click .page-editor' : 'pageClickHandler',
    'click .page-list'   : 'pageClickHandler',
    'click .page-new'    : 'pageClickHandler',
    'click .page-detail' : 'pageClickHandler'
  },

  initialize: function () {
    ievent.on([
      'page:editor', 'page:list',
      'page:detail', 'page:new'
    ].join(' '), this.updateNavStatus, this)
  },

  updateNavStatus : function (type) {
    this.pages.removeClass('active')

    this.pages
      .find('a[href="#'+ type.split(':')[1] +'"]')
      .closest('li')
      .addClass('active')
  },

  pageClickHandler : function (evt) {
    var target = $(evt.target).closest('li')

    if (!target.hasClass('active')) {
      this.pages.removeClass('active')
      target.addClass('active')
    }
  },

  render: function () {
    this.$el.html(template())
    this.pages = this.$('.navPages>li')
    return this
  }

});

var globalNav = new GlobalNav

module.exports = globalNav