/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2)

	var ievent = __webpack_require__(6)
	var router = __webpack_require__(7)

	var globalNav  = __webpack_require__(8)
	var pageEditor = __webpack_require__(12)
	var pageList   = __webpack_require__(36)
	var pageDetail = __webpack_require__(45)
	var pageNew    = __webpack_require__(54)

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/stylus-loader/index.js!./index.styl", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/stylus-loader/index.js!./index.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n}\nli {\n  list-style-type: none;\n}\na {\n  text-decoration: none;\n}\n#header {\n  height: 60px;\n  line-height: 60px;\n  color: #fff;\n  background-color: #ee7419;\n}\n#stage {\n  position: absolute;\n  top: 60px;\n  bottom: 0;\n  width: 100%;\n  background-color: #efefef;\n}\n.sub-stage {\n  width: 1024px;\n  margin: 60px auto 0;\n  display: none;\n}\n.sub-stage.active {\n  display: block;\n}\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	var ievent = _.extend({}, Backbone.Events);


	// 开发时用于观察，上线的时候最好注释掉
	ievent.on('all', function () {
	  console.log('ievent.all', arguments);
	});

	module.exports = window.ievent = ievent;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var ievent = __webpack_require__(6)
	// var server = require('./server')

	var Router = Backbone.Router.extend({

	  routes: {
	    "editor(/:id)" : "pageEditor",
	    "list"         : "pageList",
	    "detail(/:id)" : "pageDetail",
	    "new"          : "pageNew",
	    "add"          : "pageEditor"
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(9)

	var ievent   = __webpack_require__(6)
	var template = __webpack_require__(11)

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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./index.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./index.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".nav-global {\n  width: 1024px;\n  margin: 0 auto;\n}\n.nav-global h1 {\n  float: left;\n}\n.navPages {\n  overflow: hideen;\n}\n.navPages li {\n  display: inline-block;\n  margin-left: 20px;\n}\n.navPages li a {\n  display: block;\n  color: #fff;\n}\n.navPages .active a {\n  color: #bfbfbf;\n}\n.navPages .page-detail {\n  display: none;\n}\n", ""]);

	// exports


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<h1>问卷管理</h1>\n<nav>\n  <ul class="navPages">\n    <li class="page-list">\n      <a href="#list">问卷列表</a>\n    </li>\n    <li class="page-new">\n      <a href="#new">新建问卷</a>\n    </li>\n    <li class="page-editor">\n      <a href="#editor">问卷编辑</a>\n    </li>\n    <li class="page-detail">\n      <a href="#detail">问卷详情</a>\n    </li>\n  </ul>\n</nav>';

	}
	return __p
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	console.log('editor start...')
	__webpack_require__(13)

	var template      = __webpack_require__(15)
	var index         = __webpack_require__(16)
	var PageBaseView  = __webpack_require__(17)
	var ievent        = __webpack_require__(6)
	var server        = __webpack_require__(18)
	var router        = __webpack_require__(7)
	var store         = __webpack_require__(19)
	var Model         = __webpack_require__(20)
	var question      = __webpack_require__(21)

	var PageEditor = PageBaseView.extend({

	  id: 'pageEditor',

	  ename: 'page:editor',

	  template: template,

	  events: {
	    'change .title'         : 'titleHandler',
	    'change .deadline'      : 'deadlineHandler',
	    'click .oneChoice'      : 'oneChoiceHandler',
	    'click .multipleChoice' : 'multipleChoiceHandler',
	    'click .text'           : 'textHandler',
	    'click .addQuestion'    : 'addQuestionHandler',
	    'click .save'           : 'saveHandler',
	    'click .publish'        : 'publishHandler'
	  },

	  initialize: function () {
	    this._initialize(arguments)

	    // this.model = new Model()
	    // this.number = this.model.get('list').length
	  },

	  titleHandler: function (evt) {
	    this.model.set('title', evt.target.value)
	  },

	  deadlineHandler: function (evt) {
	    this.model.set('deadline', evt.target.value)
	  },

	  oneChoiceHandler: function () {
	    this.number = this.model.get('list').length + 1

	    var oneChoice = new question.oneChoice({
	      number: this.number,
	      model: this.model
	    })

	    // 视图增加
	    this.container.append(oneChoice.render().$el)
	    // model 增加，保持同步
	    this.model.addQuestion({
	      type: 'oneChoice',
	      title: '',
	      value: []
	    })
	  },

	  multipleChoiceHandler: function () {
	    this.number = this.model.get('list').length + 1

	    var multipleChoice = new question.multipleChoice({
	      number: this.number,
	      model: this.model
	    })

	    this.container.append(multipleChoice.render().$el)
	    this.model.addQuestion({
	      type: 'multipleChoice',
	      title: '',
	      value: []
	    })
	  },

	  textHandler: function () {
	    this.number = this.model.get('list').length + 1

	    var text = new question.text({
	      number: this.number,
	      model: this.model
	    })

	    this.container.append(text.render().$el)
	    this.model.addQuestion({
	      type:'text',
	      required: false,
	      title: '',
	      value: ''
	    })
	  },

	  addQuestionHandler: function () {
	    var target = $(".questionType")

	    if (target.hasClass('visible')) {
	      target.removeClass('visible')
	    } else {
	      target.addClass('visible')
	    }
	  },

	  titleHandler: function (){
	    var title = $(".title").val()
	    this.model.set("title", title)
	  },

	  deadlineHandler: function (){
	    var deadline = $(".deadline").val()
	    this.model.set("deadline",deadline)
	  },

	  saveHandler: function () {
	    var data = this.model.toJSON()
	    var id = this.id

	    if (!data) return

	    store.update(id, data, function (id) {
	      router.navigate('detail/'+id, {trigger: true})
	    })
	  },

	  publishHandler: function () {
	    var data = this.model.toJSON()

	    if (!data) return

	    store.save(data, function (id) {
	      router.navigate('detail/'+id, {trigger: true})
	    })
	  },

	  initData: function (data) {
	    var self = this

	    this.model.set('list', data.list)
	    this.model.set('title', data.title)
	    this.model.set('deadline', data.deadline)

	    if (data.status) {
	      this.model.set('status', data.status)
	    }

	    this.$el.find('.title').val(data.title)
	    this.$el.find('#deadline').val(data.deadline)

	    this.number = this.model.get('list').length

	    var temp = null

	    _.each(data.list, function (ele, idx) {
	      temp = new question[ele.type]({
	        number: idx+1,
	        model: self.model,
	        title: ele.title,
	        data: ele.value,
	        required: ele.required
	      })

	      self.container.append(temp.render().$el)
	    })

	  },

	  render: function (action, id) {
	    var self = this
	    this._render()

	    // if (this.isFirstInit) {
	    //   this.isFirstInit = false
	    // }

	    this.model = new Model()
	    this.number = this.model.get('list').length

	    this.container = this.$el.find('.container')

	    if (id.indexOf('question-') == 0 && !!store.get(id)) {
	      store.get(id, function (data) {
	        self.initData(data)

	        self.id = id
	        self.$el.find('.publish')[0].disabled = true
	      })
	    } else {
	      this.$el.find('.save')[0].disabled = true
	    }

	    return this
	  }
	})

	var pageEditor = new PageEditor

	module.exports = pageEditor

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./index.styl", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./index.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "body {\n  background-color: #eee;\n}\n#pageEditor h2 {\n  font-weight: bold;\n  text-align: center;\n  margin-bottom: 20px;\n  margin-top: 20px;\n}\n.title {\n  text-align: center;\n  font-size: 36px;\n  outline: none;\n  border: none;\n}\nspan {\n  padding: 5px;\n}\n.box {\n  background-color: #fff;\n  width: 1024px;\n  min-height: 400px;\n  border: 1px solid #ddd;\n  padding-bottom: 20px;\n  margin-bottom: 40px;\n  box-shadow: 1px 1px 1px 1px #ccc;\n}\n.question {\n  background-color: #eee;\n  width: 900px;\n  height: 100px;\n  margin: 0 auto;\n  text-align: center;\n  margin-top: 20px;\n  margin-bottom: 20px;\n  border: 1px solid #ddd;\n}\n.empty {\n  width: 950px;\n  height: 0;\n  border: 1px solid #ddd;\n  margin: 0 auto;\n}\n.result {\n  width: 800px;\n  heitht: 100px;\n  margin-top: 40px;\n  margin-left: 100px;\n}\nlabel {\n  margin-left: 100px;\n}\n.deadline {\n  margin-left: 10px;\n  margin-right: 100px;\n}\n#pageEditor button {\n  height: 30px;\n  width: 80px;\n  margin-right: 10px;\n  background-color: #fff;\n  outline: none;\n}\n#pageEditor button:hover {\n  cursor: pointer;\n}\nspan.addQuestion:hover {\n  cursor: pointer;\n}\n.visible {\n  display: none;\n}\n.questionType {\n  margin-top: 10px;\n}\np {\n  margin-top: 30px;\n}\n", ""]);

	// exports


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="box">\r\n	<h2>\r\n		<input type="text" placeholder="这里是问卷名字(必填)" class="title">\r\n	</h2>\r\n	<div class="container"></div>\r\n	<div class="empty"></div>\r\n	<div class="question">\r\n		<div class="questionType visible">\r\n			<button class="oneChoice">单选题</button>\r\n			<button class="multipleChoice">多选题</button>\r\n			<button class="text">文本题</button>\r\n		</div>\r\n		<p><span class="addQuestion">+</span><span class="addQuestion">添加问题</span></p>\r\n	</div>\r\n	<div class="empty"></div>\r\n	<div class="result">\r\n		<label for="deadline">问卷截止日期</label><input type="text" class="deadline"/>\r\n		<button class="save">保存问卷</button>\r\n		<button class="publish">发布问卷</button>\r\n	</div>\r\n</div>\r\n\r\n\r\n';

	}
	return __p
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div  data-id="' +
	((__t = ( id )) == null ? '' : __t) +
	'">\r\n   <h1>' +
	((__t = ( title )) == null ? '' : __t) +
	'</h1>\r\n   <h2>' +
	((__t = ( endTime )) == null ? '' : __t) +
	'</h2>\r\n   <h2>' +
	((__t = ( status )) == null ? '' : __t) +
	'</h2>\r\n   <div>\r\n	   这是题目\r\n   </div>\r\n</div>';

	}
	return __p
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var ievent = __webpack_require__(6)

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

/***/ },
/* 18 */
/***/ function(module, exports) {

	var baseUrl = 'http://localhost:3000'

	var server = {}

	server.addNew = function (data, callback){
		$.ajax({
			url: baseUrl + '/addNew',
			type: 'POST',
			dataType: 'json',
			data: data,
			success: callback
		})
	}

	server.list = function (data, callback) {
	  $.ajax({
	    url: baseUrl + '/list',
	    type: 'GET',
	    dataType: 'json',
	    data: data,
	    success: callback
	  })
	}

	server.detail = function (data, callback) {
	  $.ajax({
	    url: baseUrl + '/detail',
	    type: 'GET',
	    dataType: 'json',
	    data: data,
	    success: callback
	  })
	}

	server.edit = function (data, callback){
		$.ajax({
			url: baseUrl + '/edit',
			type: 'GET',
			dataType: 'json',
			data: data,
			success: callback
		})
	}

	server.editSave = function (data, callback){
		$.ajax({
			url: baseUrl + '/edit',
			type: 'POST',
			dataType: 'json',
			data: data,
			success: callback
		})
	}

	module.exports = server

/***/ },
/* 19 */
/***/ function(module, exports) {

	var storage = window.localStorage

	var store = {}

	var prefix = 'question-'

	function computeLength () {
	  var length = 0

	  for (var i = 0; i < storage.length; i++) {
	    if (storage.key(i).indexOf(prefix) == 0) {
	      length += 1
	    }
	  }

	  return length
	}

	store.save = function (val, callbck) {
	  var id = prefix + (computeLength() + 1)
	  val = JSON.stringify(val)

	  storage.setItem(id, val)
	  callbck && callbck(id)
	}

	store.update = function (id, val, callbck) {
	  val = JSON.stringify(val)

	  storage.setItem(id, val)
	  callbck && callbck(id)
	}

	store.get = function (id, callbck) {
	  var val = storage.getItem(id)
	  val = JSON.parse(val)

	  callbck && callbck(val)
	  return val
	}

	store.del = function (id, callbck) {
	  storage.setItem(id, null)

	  callbck && callbck()
	}

	store.delSelected = function (arr, callbck) {
	  _.each(arr, function (id) {
	    storage.setItem(id, null)
	  })

	  callbck && callbck()
	}

	store.list = function (callbck) {
	  var temp = null
	  var result = []
	  var length = computeLength()

	  for (var i = 1; i <= length; i++) {
	    temp = storage.getItem(prefix + i)
	    temp = JSON.parse(temp)

	    if (temp) {
	      result.push(_.extend({
	        id: prefix + i
	      }, temp))
	    }
	  }

	  callbck && callbck(result)

	  return result
	}

	module.exports = store

/***/ },
/* 20 */
/***/ function(module, exports) {

	var EditorModel = Backbone.Model.extend({
	  defaults: {
	    // 存放 question
	    list: [],
	    // 问卷名字
	    title: '',
	    // 截止日期
	    deadline: '',
	    status: 'published'
	  },

	  initialize: function () {
	    this.set('list', new Array)
	  },

	  // 改变单个选项的value
	  changeValue: function (number, newVal, required) {
	    var target = this.get('list')[number - 1]

	    target.value = newVal

	    if (target.type == 'text') {
	      target.required = required
	    }

	    console.log(this.toJSON())
	  },

	  // 改变单个选项的title
	  changeTitle: function (number, newTitle) {
	    var target = this.get('list')[number - 1]

	    target.title = newTitle

	    console.log(this.toJSON())
	  },

	  addQuestion: function (question) {
	    this.get('list').push(question)
	  },

	  removeQuestion:function(number, callback){
	    this.get('list').splice(number-1, 1)
	    callback && callback()
	  },

	  // 上移
	  upQuestion: function (number, callback) {
	    // 第一个不要上移
	    if (number == 1) return

	    var list   = this.get('list')
	    var target = list.splice(number-1, 1)[0]

	    list.splice(number-2, 0, target)
	    callback && callback()
	    console.log(this.toJSON())
	  },

	  // 下移
	  downQuestion: function (number, callback) {
	    var list = this.get('list')

	    // 最后一个不要下移
	    if (number == list.length) return

	    var target = list.splice(number-1, 1)[0]
	    list.splice(number, 0, target)
	    callback && callback()

	    console.log(this.toJSON())
	  },

	  // 复制
	  againQuestion: function (number, callback) {
	    var list = this.get('list')
	    var again = list[number-1]

	    list.splice(number, 0, again)
	    callback && callback(again)

	    console.log(this.toJSON())
	  }
	})

	module.exports = EditorModel

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports.multipleChoice = __webpack_require__(22)
	exports.oneChoice      = __webpack_require__(27)
	exports.text           = __webpack_require__(32)

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(23)

	var template  = __webpack_require__(25)
	var optTemplate = __webpack_require__(26)

	var multipleChoice = Backbone.View.extend({
	  tagName: 'div',

	  className: 'question-number',

	  events:{
	    'change .ques-title' : 'changeTitleHandler',
	    'change .checkbox'   : 'changeValueHandler',
	    'click .up'          : 'upHandler',
	    'click .down'        : 'downHandler',
	    'click .remove'      : 'removeHandler',
	    'click .again'       : 'againHandler',
	    'click .addOpt'      : 'addOptHandler',
	    'click .rmOpt'       : 'rmOptHandler'
	  },

	  initialize: function (options) {
	    this.number = options.number
	    this.model = options.model
	    this.data = options.data
	    this.title = options.title
	  },

	  initData: function (data) {
	    var container = this.$el.find('.optContainer')

	    container.html({})
	    _.each(data, function (ele, idx) {
	      container.append(optTemplate({
	        value: ele,
	        number: idx+1
	      }))
	    })
	  },

	  changeValueHandler: function () {
	    var inputs = this.$el.find('.checkbox')
	    var newVal = []
	    var temp   = null
	    var number = parseInt(this.$el.find('.number').text())

	    for (var i = 0; i < inputs.length; i++) {
	      temp = inputs[i].value
	      temp && newVal.push(temp)
	    }

	    this.model.changeValue(number, newVal)
	  },

	  changeTitleHandler: function (evt) {
	    var number = parseInt(this.$el.find('.number').text())
	    var value = evt.target.value

	    this.model.changeTitle(number, value)
	  },

	  upHandler: function () {
	    var self = this
	    var number = parseInt(this.$el.find('.number').text())

	    this.model.upQuestion(number, function(){
	      var now = self.$el
	      var pre = self.$el.prev()

	      now.insertBefore(pre)
	      self.changeQuestionNumber()
	    })
	  },

	  downHandler: function () {
	    var self = this
	    var number = parseInt(this.$el.find('.number').text())

	    this.model.downQuestion(number, function(){
	      var now = self.$el
	      var after = self.$el.next()

	      now.insertAfter(after)
	      self.changeQuestionNumber()
	    })
	  },

	  removeHandler: function () {
	    var self = this
	    var number = parseInt(this.$el.find('.number').text())

	    this.model.removeQuestion(number, function () {
	      self.$el.remove()
	      self.changeQuestionNumber()
	    })
	  },

	  againHandler: function () {
	    var self = this
	    var number = parseInt(this.$el.find('.number').text())

	    this.model.againQuestion(number, function (ele) {
	      var now = self.$el
	      // now.clone().insertAfter(now)

	      var temp = new self.constructor({
	        number: number+1,
	        model: self.model,
	        title: ele.title,
	        data: ele.value,
	        required: ele.required
	      })

	      temp.render().$el.insertAfter(now)

	      self.changeQuestionNumber()
	    })
	  },

	  addOptHandler: function () {
	    var container = this.$el.find('.optContainer')
	    var label = this.$el.find('label')

	    if (label.length == 10) return

	    var tmpl = [
	      '<label>',
	        '<input type="checkbox" name="multiplechoice_question" value="选项',
	          label.length+1, '"/> ',
	        '<input type="text" class="checkbox" placeholder="选项', label.length+1, '">',
	      '</label>'
	    ].join('')

	    container.append($(tmpl))

	    this.changeValueHandler()
	  },

	  rmOptHandler: function () {
	    var container = this.$el.find('.optContainer')
	    var opt = container.find('input:checked')

	    opt.parent().remove()

	    var opts = container.find('.checkbox')
	    _.each(opts, function (ele, idx) {
	      $(ele).attr('placeholder', '选项'+(idx+1))
	    })

	    this.changeValueHandler()
	  },

	  changeQuestionNumber: function () {
	    var number = $(".number")

	    for(var i = 0; i < number.length; i++) {
	      number[i].innerText = i+1
	    }
	    // return number
	  },

	  render: function () {
	    this.$el.html(template({
	      number: this.number
	    }))

	    this.data && this.initData(this.data)
	    this.title && this.$el.find('.ques-title').val(this.title)

	    return this
	  }
	})

	module.exports = multipleChoice

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(24);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./index.styl", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./index.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<h4>\r\n  <span class="number">' +
	((__t = ( number )) == null ? '' : __t) +
	'</span>\r\n  <input type="text" class="ques-title" placeholder="题目名字(必填)">\r\n</h4>\r\n<div class="optContainer">\r\n  <label>\r\n    <input type="checkbox" name="multiplechoice_question" value="选项1"/>\r\n    <input type="text" class="checkbox" placeholder="选项1">\r\n  </label>\r\n  <label>\r\n    <input type="checkbox" name="multiplechoice_question" value="选项2"/>\r\n    <input type="text" class="checkbox" placeholder="选项2">\r\n  </label>\r\n  <label>\r\n    <input type="checkbox" name="multiplechoice_question" value="选项3"/>\r\n    <input type="text" class="checkbox" placeholder="选项3">\r\n  </label>\r\n  <label>\r\n    <input type="checkbox" name="multiplechoice_question" value="选项4"/>\r\n    <input type="text" class="checkbox" placeholder="选项4">\r\n  </label>\r\n</div>\r\n<ul class="actions">\r\n  <li class="up">上移</li>\r\n  <li class="down">下移</li>\r\n  <li class="again">复用</li>\r\n  <li class="remove">删除</li>\r\n  <li class="addOpt">增加选项</li>\r\n  <li class="rmOpt">删除选项</li>\r\n</ul>';

	}
	return __p
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<label>\n  <input type="checkbox" name="multiplechoice_question" value="选项' +
	((__t = ( number )) == null ? '' : __t) +
	'"/>\n  <input type="text" class="checkbox" value="' +
	((__t = ( value )) == null ? '' : __t) +
	'" placeholder="选项' +
	((__t = ( number )) == null ? '' : __t) +
	'">\n</label>';

	}
	return __p
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(28)

	var template = __webpack_require__(30)
	var optTemplate = __webpack_require__(31)

	var oneChoice = Backbone.View.extend({
	  tagName: 'div',

	  className: 'question-number',

	  events:{
	    'change .ques-title' : 'changeTitleHandler',
	    'change .radio' : 'changeValueHandler',
	    'click .up'     : 'upHandler',
	    'click .down'   : 'downHandler',
	    'click .remove' : 'removeHandler',
	    'click .again'  : 'againHandler',
	    'click .addOpt' : 'addOptHandler',
	    'click .rmOpt'  : 'rmOptHandler'
	  },

	  initialize: function (options) {
	    // 标示题目序号
	    this.number = options.number
	    this.model = options.model
	    this.data = options.data
	    this.title = options.title
	  },

	  initData: function (data) {
	    var container = this.$el.find('.optContainer')

	    container.html({})
	    _.each(data, function (ele, idx) {
	      container.append(optTemplate({
	        value: ele,
	        number: idx+1
	      }))
	    })
	  },

	  changeValueHandler: function () {
	    var inputs = this.$el.find('.radio')
	    var newVal = []
	    var temp   = null
	    var number = parseInt(this.$el.find('.number').text())

	    for (var i = 0; i < inputs.length; i++) {
	      temp = inputs[i].value
	      temp && newVal.push(temp)
	    }

	    this.model.changeValue(number, newVal)
	  },

	  changeTitleHandler: function (evt) {
	    var number = parseInt(this.$el.find('.number').text())
	    var value = evt.target.value

	    this.model.changeTitle(number, value)
	  },

	  upHandler: function () {
	    var self = this
	    var number = parseInt(this.$el.find('.number').text())

	    this.model.upQuestion(number, function(){
	      var now = self.$el
	      var pre = self.$el.prev()

	      now.insertBefore(pre)
	      self.changeQuestionNumber()
	    })
	  },

	  downHandler: function () {
	    var self = this
	    var number = parseInt(this.$el.find('.number').text())

	    this.model.downQuestion(number, function(){
	      var now = self.$el
	      var after = self.$el.next()

	      now.insertAfter(after)
	      self.changeQuestionNumber()
	    })
	  },

	  removeHandler: function () {
	    var self = this
	    var number = parseInt(this.$el.find('.number').text())

	    this.model.removeQuestion(number, function () {
	      self.$el.remove()
	      self.changeQuestionNumber()
	    })
	  },

	  againHandler: function () {
	    var self = this
	    var number = parseInt(this.$el.find('.number').text())

	    this.model.againQuestion(number, function (ele) {
	      var now = self.$el
	      // now.clone().insertAfter(now)

	      var temp = new self.constructor({
	        number: number+1,
	        model: self.model,
	        title: ele.title,
	        data: ele.value,
	        required: ele.required
	      })

	      temp.render().$el.insertAfter(now)

	      self.changeQuestionNumber()
	    })
	  },

	  addOptHandler: function () {
	    var container = this.$el.find('.optContainer')
	    var label = this.$el.find('label')

	    if (label.length == 10) return

	    var tmpl = [
	      '<label>',
	        '<input type="radio" name="questionType" value="选项',
	          label.length+1, '"/> ',
	        '<input type="text" class="radio" placeholder="选项', label.length+1, '">',
	      '</label>'
	    ].join('')

	    container.append($(tmpl))
	    this.changeValueHandler()
	  },

	  rmOptHandler: function () {
	    var container = this.$el.find('.optContainer')
	    var opt = container.find('input:checked')

	    opt.parent().remove()

	    var opts = container.find('.radio')
	    _.each(opts, function (ele, idx) {
	      $(ele).attr('placeholder', '选项'+(idx+1))
	    })

	    this.changeValueHandler()
	  },

	  changeQuestionNumber: function () {
	    var number = $(".number")

	    for(var i = 0; i < number.length; i++) {
	      number[i].innerText = i+1
	    }
	    // return number
	  },

	  render: function () {
	    this.$el.html(template({
	      number: this.number
	    }))

	    this.data && this.initData(this.data)
	    this.title && this.$el.find('.ques-title').val(this.title)

	    return this
	  }
	})

	module.exports = oneChoice

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(29);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./index.styl", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./index.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".actions li {\n  display: inline-block;\n}\n.actions li:hover {\n  cursor: pointer;\n}\nh4 input[type=\"text\"] {\n  outline: 0;\n  border: 0;\n  font-size: 16px;\n}\n.question-number {\n  width: 900px;\n  margin: 0 auto 20px;\n}\n.question-number h4 {\n  margin-bottom: 10px;\n}\n.question-number ul {\n  overflow: hidden;\n}\n.question-number li {\n  float: right;\n  margin-left: 10px;\n}\n.question-number label {\n  display: block;\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n.question-number .addOpt,\n.question-number .rmOpt {\n  color: #666;\n}\n.optContainer input[type=\"text\"] {\n  border: none;\n  margin-left: 10px;\n  outline: none;\n}\n", ""]);

	// exports


/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<h4>\r\n  <span class="number">' +
	((__t = ( number )) == null ? '' : __t) +
	'</span>\r\n  <input type="text" class="ques-title" placeholder="题目名字(必填)">\r\n</h4>\r\n<div class="optContainer">\r\n  <label>\r\n    <input type="radio" name="questionType" value="选项1"/>\r\n    <input type="text" class="radio" placeholder="选项1">\r\n  </label>\r\n  <label>\r\n    <input type="radio" name="questionType" value="选项2"/>\r\n    <input type="text" class="radio" placeholder="选项2">\r\n  </label>\r\n  <label>\r\n    <input type="radio" name="questionType" value="选项3"/>\r\n    <input type="text" class="radio" placeholder="选项3">\r\n  </label>\r\n  <label>\r\n    <input type="radio" name="questionType" value="选项4"/>\r\n    <input type="text" class="radio" placeholder="选项4">\r\n  </label>\r\n</div>\r\n<ul class="actions">\r\n  <li class="up">上移</li>\r\n  <li class="down">下移</li>\r\n  <li class="remove">删除</li>\r\n  <li class="again">复用</li>\r\n  <li class="addOpt">增加选项</li>\r\n  <li class="rmOpt">删除选项</li>\r\n</ul>';

	}
	return __p
	}

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<label>\n  <input type="radio" name="questionType" value="选项' +
	((__t = ( number )) == null ? '' : __t) +
	'"/>\n  <input type="text" class="radio" value="' +
	((__t = ( value )) == null ? '' : __t) +
	'" placeholder="选项' +
	((__t = ( number )) == null ? '' : __t) +
	'">\n</label>';

	}
	return __p
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(33)

	var template  = __webpack_require__(35)

	var text = Backbone.View.extend({
	  tagName: 'div',

	  className: 'question-number',

	  events:{
	    'change .ques-title' : 'changeTitleHandler',
	    'change textarea' : 'changeValueHandler',
	    'change .require' : 'changeValueHandler',
	    'click .up'       : 'upHandler',
	    'click .down'     : 'downHandler',
	    'click .remove'   : 'removeHandler',
	    'click .again'    : 'againHandler'
	  },

	  initialize: function (options) {
	    this.number   = options.number
	    this.model    = options.model
	    this.data     = options.data
	    this.title    = options.title
	    this.required = options.required
	  },

	  changeValueHandler: function () {
	    var newVal = this.$el.find('textarea').val()
	    var number = parseInt(this.$el.find('.number').text())
	    var required = this.$el.find('label input')[0].checked

	    this.model.changeValue(number, newVal, required)
	  },

	  changeTitleHandler: function (evt) {
	    var number = parseInt(this.$el.find('.number').text())
	    var value = evt.target.value

	    this.model.changeTitle(number, value)
	  },

	  upHandler: function () {
	    var self = this
	    var number = parseInt(this.$el.find('.number').text())

	    this.model.upQuestion(number, function(){
	      var now = self.$el
	      var pre = self.$el.prev()

	      now.insertBefore(pre)
	      self.changeQuestionNumber()
	    })
	  },

	  downHandler: function () {
	    var self = this
	    var number = parseInt(this.$el.find('.number').text())

	    this.model.downQuestion(number, function(){
	      var now = self.$el
	      var after = self.$el.next()

	      now.insertAfter(after)
	      self.changeQuestionNumber()
	    })
	  },

	  removeHandler: function () {
	    var self = this
	    var number = parseInt(this.$el.find('.number').text())

	    this.model.removeQuestion(number, function () {
	      self.$el.remove()
	      self.changeQuestionNumber()
	    })
	  },

	  againHandler: function () {
	    var self = this
	    var number = parseInt(this.$el.find('.number').text())

	    this.model.againQuestion(number, function (ele) {
	      var now = self.$el
	      // now.clone().insertAfter(now)

	      var temp = new self.constructor({
	        number: number+1,
	        model: self.model,
	        title: ele.title,
	        data: ele.value,
	        required: ele.required
	      })

	      temp.render().$el.insertAfter(now)

	      self.changeQuestionNumber()
	    })
	  },

	  changeQuestionNumber: function () {
	    var number = $(".number")

	    for(var i = 0; i < number.length; i++) {
	      number[i].innerText = i+1
	    }
	    // return number
	  },

	  render: function () {
	    this.$el.html(template({
	      number: this.number
	    }))

	    this.title && this.$el.find('.ques-title').val(this.title)
	    this.data && this.$el.find('textarea').val(this.data)
	    this.$el.find('.require')[0].checked = !!this.required

	    return this
	  }
	})

	module.exports = text

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(34);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./index.styl", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./index.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "textarea {\n  width: 350px;\n  height: 66px;\n  font-size: 16px;\n  outline: none;\n  resize: none;\n  margin-left: 20px;\n}\n.required {\n  color: #666;\n}\n", ""]);

	// exports


/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<h4>\r\n  <span class="number">' +
	((__t = ( number )) == null ? '' : __t) +
	'</span>\r\n  <input class="ques-title" type="text" placeholder="题目名字(必填)">\r\n</h4>\r\n<textarea name="questionType" value="text_question"></textarea>\r\n<ul class="actions">\r\n  <li class="up">上移</li>\r\n  <li class="down">下移</li>\r\n  <li class="again">复用</li>\r\n  <li class="remove">删除</li>\r\n  <li class="required">\r\n    <label>\r\n      <input type="checkbox" class="require" name="required" value="false">\r\n      此题是否必填\r\n    </label>\r\n  </li>\r\n</ul>';

	}
	return __p
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	console.log('list start...')
	__webpack_require__(37)

	var template     = __webpack_require__(39)
	var PageBaseView = __webpack_require__(17)
	var ievent       = __webpack_require__(6)
	var server       = __webpack_require__(18)
	var store        = __webpack_require__(19)
	var router       = __webpack_require__(7)

	// 列表项
	var Item         = __webpack_require__(40)

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
	   /* var data = [{
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

	*/
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

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(38);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./index.styl", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./index.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "#pageList table {\n  width: 1024px;\n  margin: 0 auto;\n  color: #666;\n}\n#pageList thead th {\n  padding-bottom: 10px;\n}\n#pageList tbody {\n  height: 100px;\n  background-color: #fff;\n}\n#pageList tbody tr {\n  border-bottom: 1px solid #ccc;\n}\n#pageList td {\n  text-align: center;\n  font-size: 14px;\n}\n#pageList .t2 {\n  width: 160px;\n}\n#pageList .t3 {\n  width: 120px;\n}\n#pageList .t4 {\n  width: 300px;\n}\n#pageList .list-item {\n  height: 40px;\n}\n#pageList .list-item:hover {\n  background-color: #fcf0e5;\n}\n#pageList button {\n  font-size: 12px;\n  padding: 2px 5px;\n  background-color: #fff;\n  outline: none;\n  border: 1px solid #ccc;\n  cursor: pointer;\n}\n#pageList label {\n  margin-left: 20px;\n}\n#pageList tfoot {\n  background-color: #fff;\n}\n#pageList tfoot label {\n  margin-left: 0;\n}\n#pageList tfoot td {\n  padding: 10px 0;\n}\n#pageList tfoot .delSelectd {\n  margin-left: 10px;\n}\n", ""]);

	// exports


/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<table rules="none">\n  <thead>\n    <tr>\n      <th class="t1">标题</th>\n      <th class="t2">时间</th>\n      <th class="t3">状态</th>\n      <th class="t4">操作</th>\n    </tr>\n  </thead>\n  <tbody>\n  </tbody>\n  <tfoot>\n    <tr>\n      <td>\n        <label>\n          <input type="checkbox" class="selectAll">\n          全选\n        </label>\n        <button class="delSelectd">删除</button>\n      </td>\n      <td></td>\n      <td></td>\n      <td></td>\n    </tr>\n  </tfoot>\n</table>';

	}
	return __p
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	console.log('list start...')
	__webpack_require__(41)

	var router    = __webpack_require__(7)
	var store     = __webpack_require__(19)

	var template  = __webpack_require__(43)
	var ItemModel = __webpack_require__(44)

	var Item = Backbone.View.extend({

	  tagName: 'tr',

	  className: 'list-item',

	  events: {
	    'click .delete' : 'itemDelete',
	    'click .editor' : 'editorHandler',
	    'click .detail' : 'detailHandler'
	  },

	  initialize: function (options) {
	    this.model = new ItemModel(options)
	  },

	  editorHandler: function (evt) {
	    var parent = $(evt.target).parent()
	    var id     = parent.data('id')

	    router.navigate('editor/' + id, {trigger: true})
	  },

	  detailHandler: function (evt) {
	    var parent = $(evt.target).parent()
	    var id     = parent.data('id')
	    console.log('list', id)

	    router.navigate('detail/' + id, {trigger: true})
	  },

	  editHandler: function (evt) {
	    var parent = $(evt.target).parent()
	    var id     = parent.data('id')

	    router.navigate('editor/' + id, {trigger: true})
	  },

	  itemDelete: function (evt) {
	    var parent = $(evt.target).parent()
	    var id     = parent.data('id')
	    var st     = this.model.get("status")

	    if (st == "end") {
	      alert("问卷已结束，不能删除")
	    } else {
	      var _confirm = confirm("确认删除?")

	      if (_confirm == true) {
	        store.del(id, function () {
	          $(evt.target).closest('.list-item').remove()
	        })
	      }
	    }
	  },

	  render: function () {
	    this.$el.html(template(this.model.toJSON()))

	    return this
	  }

	})

	module.exports = Item

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(42);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./index.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./index.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<td>\n  <input type="checkbox" name="list-item">\n  ' +
	((__t = ( title )) == null ? '' : __t) +
	'\n</td>\n<td>' +
	((__t = ( deadline )) == null ? '' : __t) +
	'</td>\n<td>' +
	((__t = ( status )) == null ? '' : __t) +
	'</td>\n\n<td data-id="' +
	((__t = ( id )) == null ? '' : __t) +
	'">\n  <button class="editor">编辑</button>\n  <button class="delete">删除</button>\n  <button class="detail">查看问卷</button>\n</td>';

	}
	return __p
	}

/***/ },
/* 44 */
/***/ function(module, exports) {

	var statusMap = {
	  'unPublish' : '未发布',
	  'published' : '已发布',
	  'end'       : '已结束'
	}

	var ItemModel = Backbone.Model.extend({
	  defaults: {
	    id: 0,
	    title: '',
	    deadline:'',
	    status: 'published',
	    checked: false
	  },

	  toJSON: function(options) {
	    var obj =  _.clone(this.attributes)

	    obj.status = statusMap[obj.status]

	    return obj
	  }
	})

	module.exports = ItemModel

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	console.log('detail start...')
	__webpack_require__(46)

	var template     = __webpack_require__(48)
	var index        = __webpack_require__(49)
	var PageBaseView = __webpack_require__(17)

	var ievent       = __webpack_require__(6)
	var server       = __webpack_require__(18)
	var router       = __webpack_require__(7)
	var store        = __webpack_require__(19)

	var question = __webpack_require__(50)

	var PageDetail = PageBaseView.extend({

	  id: 'pageDetail',

	  ename: 'page:detail',

	  template: template,

	  events: {
	  },

	  initialize: function () {
	    this._initialize(arguments)
	  },

	  render: function (action, id) {
	    this._render()

	    var self = this

	    // if (this.isFirstInit) {
	    //   this.isFirstInit = false
	    // }

	    if (id.indexOf('question-') != 0 && !store.get(id)) {
	      router.navigate('list', {trigger: true})
	      return
	    }

	    store.get(id, function (data) {
	      self.$el.find('h1').text(data.title)

	      var container = self.$el.find('.container')

	      _.each(data.list, function (ele, idx) {
	        if (ele.type == 'text') {
	          ele.number = idx+1
	          container.append(question.text(ele))
	        } else {
	          ele.number = idx+1
	          container.append(question.oneChoice(ele))
	        }
	      })
	    })

	    return this
	  }

	})

	var pageDetail = new PageDetail

	module.exports = pageDetail

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(47);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./index.styl", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./index.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "#pageDetail h1 {\n  text-align: center;\n  margin: 20px auto;\n  color: #666;\n}\n#pageDetail p {\n  margin: 0 0 0 20px;\n}\n#pageDetail .ques-item {\n  margin-left: 80px;\n  margin-bottom: 40px;\n}\n#pageDetail h2 {\n  font-size: 16px;\n  margin-bottom: 10px;\n}\n#pageDetail li {\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n", ""]);

	// exports


/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="box">\n  <h1></h1>\n  <div class="container"></div>\n</div>\n';

	}
	return __p
	}

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div  data-id="' +
	((__t = ( id )) == null ? '' : __t) +
	'">\r\n   <h1>' +
	((__t = ( title )) == null ? '' : __t) +
	'</h1>\r\n   <h2>' +
	((__t = ( endTime )) == null ? '' : __t) +
	'</h2>\r\n   <h2>' +
	((__t = ( status )) == null ? '' : __t) +
	'</h2>\r\n   <div>\r\n	   这是题目\r\n   </div>\r\n</div>';

	}
	return __p
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	exports.multipleChoice = __webpack_require__(51)
	exports.oneChoice      = __webpack_require__(52)
	exports.text           = __webpack_require__(53)

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="ques-item">\n  <h2>' +
	((__t = ( number )) == null ? '' : __t) +
	'. ' +
	((__t = ( title )) == null ? '' : __t) +
	'</h2>\n  <ul>\n    ';
	 for (var i = 0; i < value.length; i++) {;
	__p += '\n      <li>' +
	((__t = ( value[i] )) == null ? '' : __t) +
	'</li>\n    ';
	 } ;
	__p += '\n  </ul>\n</div>';

	}
	return __p
	}

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="ques-item">\n  <h2>' +
	((__t = ( number )) == null ? '' : __t) +
	'. ' +
	((__t = ( title )) == null ? '' : __t) +
	'</h2>\n  <ul>\n    ';
	 for (var i = 0; i < value.length; i++) {;
	__p += '\n      <li>' +
	((__t = ( value[i] )) == null ? '' : __t) +
	'</li>\n    ';
	 } ;
	__p += '\n  </ul>\n</div>';

	}
	return __p
	}

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="ques-item">\n  <h2>' +
	((__t = ( number )) == null ? '' : __t) +
	'. ' +
	((__t = ( title )) == null ? '' : __t) +
	'</h2>\n  <p>' +
	((__t = ( value )) == null ? '' : __t) +
	'</p>\n</div>';

	}
	return __p
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	console.log('new start...')

	__webpack_require__(55)

	var template     = __webpack_require__(57)
	var PageBaseView = __webpack_require__(17)
	var ievent       = __webpack_require__(6)

	var PageNew = PageBaseView.extend({

	  id: 'pageNew',

	  ename: 'page:new',

	  template: template,

	  events: {
	  },

	  initialize: function () {
	    this._initialize(arguments)
	  },


	  render: function () {
	    this._render()

	    if (this.isFirstInit) {
	      this.isFirstInit = false
	    }

	    return this
	  }
	})

	var pageNew = new PageNew

	module.exports = pageNew

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(56);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./index.styl", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./index.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".newPage {\n  width: 800px;\n  height: 280px;\n  margin: 0 auto;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  box-shadow: 2px 2px 3px 3px #ccc;\n  position: relative;\n}\nbutton.add {\n  width: 200px;\n  height: 50px;\n  background-color: #ee7419;\n  font-size: 20px;\n  color: #fff;\n  position: absolute;\n  top: 50%;\n  margin-top: -25px;\n  left: 50%;\n  margin-left: -100px;\n}\nbutton.add:hover {\n  cursor: pointer;\n}\n", ""]);

	// exports


/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="newPage">\r\n	<a href="#add">\r\n    <button class="add">+新建问卷</button>\r\n  </a>\r\n</div>';

	}
	return __p
	}

/***/ }
/******/ ]);