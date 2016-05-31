var ievent = _.extend({}, Backbone.Events);


// 开发时用于观察，上线的时候最好注释掉
ievent.on('all', function () {
  console.log('ievent.all', arguments);
});

module.exports = window.ievent = ievent;