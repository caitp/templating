define(["assert", './node_container', './linked_list', './linked_list', 'di/injector'], function($__0,$__1,$__2,$__3,$__4) {
  "use strict";
  var __moduleName = "view";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  if (!$__3 || !$__3.__esModule)
    $__3 = {'default': $__3};
  if (!$__4 || !$__4.__esModule)
    $__4 = {'default': $__4};
  var assert = ($__0).assert;
  var NodeContainer = ($__1).NodeContainer;
  var LinkedList = ($__2).LinkedList;
  var LinkedListItem = ($__3).LinkedListItem;
  var Injector = ($__4).Injector;
  var View = function View(container, injector) {
    var executionContext = arguments[2] !== (void 0) ? arguments[2] : {};
    assert.argumentTypes(container, NodeContainer, injector, Injector, executionContext, Object);
    $traceurRuntime.superCall(this, $View.prototype, "constructor", []);
    this.injector = injector;
    this.executionContext = executionContext;
    this.nodes = Array.prototype.slice.call(container.childNodes);
    if (container.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      this._fragment = container;
      this.removed = true;
    } else {
      this._fragment = new DocumentFragment();
      this.removed = false;
    }
  };
  var $View = View;
  ($traceurRuntime.createClass)(View, {
    _removeIfNeeded: function() {
      var $__5 = this;
      if (!this.removed) {
        this.removed = true;
        this.nodes.forEach((function(node) {
          $__5._fragment.appendChild(node);
        }));
      }
    },
    insertBefore: function(refNode) {
      assert.argumentTypes(refNode, Node);
      var parent = refNode.parentNode;
      this._removeIfNeeded();
      parent.insertBefore(this._fragment, refNode);
      this.removed = false;
    },
    appendTo: function(node) {
      assert.argumentTypes(node, Node);
      this._removeIfNeeded();
      node.appendChild(this._fragment);
      this.removed = false;
    },
    watch: function(expression, callback) {
      var context = arguments[2] !== (void 0) ? arguments[2] : null;
      assert.argumentTypes(expression, $traceurRuntime.type.string, callback, Function, context, Object);
    },
    assign: function(expression, value) {
      var context = arguments[2] !== (void 0) ? arguments[2] : null;
      assert.argumentTypes(expression, $traceurRuntime.type.string, value, Object, context, Object);
    }
  }, {}, LinkedListItem);
  View.parameters = [[NodeContainer], [Injector], [Object]];
  View.prototype.insertBefore.parameters = [[Node]];
  View.prototype.appendTo.parameters = [[Node]];
  View.prototype.watch.parameters = [[$traceurRuntime.type.string], [Function], [Object]];
  View.prototype.assign.parameters = [[$traceurRuntime.type.string], [Object], [Object]];
  var ViewPort = function ViewPort(anchor) {
    assert.argumentTypes(anchor, Comment);
    this.anchor = anchor;
    this.list = new LinkedList();
  };
  ($traceurRuntime.createClass)(ViewPort, {
    append: function(view) {
      assert.argumentTypes(view, View);
      view.insertBefore(this.anchor);
      this.list.append(view);
    },
    insertBefore: function(view, referenceView) {
      assert.argumentTypes(view, View, referenceView, View);
      view.insertBefore(referenceView.nodes[0]);
      this.list.insertBefore(view, referenceView);
    },
    prepend: function(view) {
      assert.argumentTypes(view, View);
      if (this.list.head) {
        this.insertBefore(view, this.list.head);
      } else {
        this.append(view);
      }
    },
    insertAfter: function(view, referenceView) {
      assert.argumentTypes(view, View, referenceView, View);
      if (!referenceView.next) {
        this.append(view);
      } else {
        this.insertBefore(view, referenceView.next);
      }
    },
    remove: function(view) {
      assert.argumentTypes(view, View);
      this.list.remove(view);
      view._removeIfNeeded();
    }
  }, {});
  ViewPort.parameters = [[Comment]];
  ViewPort.prototype.append.parameters = [[View]];
  ViewPort.prototype.insertBefore.parameters = [[View], [View]];
  ViewPort.prototype.prepend.parameters = [[View]];
  ViewPort.prototype.insertAfter.parameters = [[View], [View]];
  ViewPort.prototype.remove.parameters = [[View]];
  return {
    get View() {
      return View;
    },
    get ViewPort() {
      return ViewPort;
    },
    __esModule: true
  };
});
