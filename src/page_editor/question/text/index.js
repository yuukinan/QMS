require('./index.styl')

var template  = require('./template.html')
// var Model = require('../../model')

var text = Backbone.View.extend({
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
        // this.model = new Model(options)
        this.number = options.number
        this.model = options.model
    },
    
    radioHandler: function (evt) {
        var val = evt.target.value
        this.model.changeValue(this.number, val)
    },

    upHandler: function () {
        var self = this
        this.model.upQuestion(this.number, function(){
        var now = self.$el 
        var pre = self.$el.prev()
        now.insertBefore(pre)
        self.changeQuestionNumber()
        })
    },
    
    downHandler: function () {
        var self = this
        this.model.upQuestion(this.number+1, function(){
            var now = self.$el
            var after = self.$el.next()
            now.insertAfter(after)
            self.changeQuestionNumber()
        })
    },

    removeHandler: function () {
        var self = this
        console.log(this)

        this.model.removeQuestion(this.number, function () {
            self.$el.remove()
            self.changeQuestionNumber() 
            console.log(this)
        })
    },

    changeQuestionNumber: function () {
        var number=$(".number")
        for(var i=0;i<number.length;i++)
            {number[i].innerText=i+1}
        return number
    },

    againHandler: function () {
        this.model.againQuestion(this.number)
    },
    
    render: function () {
        this.$el.html(template({
            number: this.number
        }))

        return this
    }
})

module.exports = text