require('./index.styl')

var template  = require('./template.html')
// var Model     = require('../../model')

var oneChoice = Backbone.View.extend({
	tagName: 'div',

    className: 'question-number',

    events:{
      'click input'   : 'radioHandler',
      'click .up'     : 'upHandler',
      'click .down'   : 'downHandler',
      'click .remove' : 'removeHandler'
    },

    initialize: function (options) {
        // this.model = new Model(options)
        // 标示题目序号
        this.number = options.number
        this.model = options.model
    },

    radioHandler: function (evt) {
        var val = evt.target.value
        this.model.changeValue(this.number, val)
    },

    upHandler: function () {
        this.model.upQuestion(this.number)
    },

    downHandler: function () {

    },

    removeHandler: function () {

    },

    render: function () {
        this.$el.html(template({
            number: this.number
        }))

        return this
    }
})

module.exports = oneChoice