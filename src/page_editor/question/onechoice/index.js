require('./index.styl')

var template  = require('./template.html')

var oneChoice = Backbone.View.extend({
	tagName: 'div',

    className: 'question-number',

    events:{
      'click input'   : 'radioHandler',
      'click .up'     : 'upHandler',
      'click .down'   : 'downHandler',
      'click .remove' : 'removeHandler',
      'click .again'  : 'againHandler'
    },

    initialize: function (options) {
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
        this.model.upQuestion(this.number+1)
    },

    removeHandler: function () {
        var self = this

        this.model.removeQuestion(this.number, function () {
            self.$el.remove()
        })
    },

    againHandler: function(){
        this.model.againQuestion(this.number)
    },

    render: function () {
        this.$el.html(template({
            number: this.number
        }))

        return this
    }
})

module.exports = oneChoice