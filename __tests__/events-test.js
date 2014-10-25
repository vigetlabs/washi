jest.autoMockOff();

describe("Events", function() {

  var Washi = require('washi');

  function click (el) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, false );
    el.dispatchEvent(event);
  }

  describe("Events", function() {

    it ("binds events to its element", function() {
      var m = Washi({

        el: document.createElement('button'),

        events: {
          click: 'finished'
        },

        finished: jest.genMockFunction()

      });

      click(m.el);

      expect(m.finished).toBeCalled();
    });

    it ("delegates events to regular selectors", function() {
      var m = Washi({
        el: function() {
          var div = document.createElement('div');
          div.innerHTML = "<p>Test</p>";
          return div;
        },
        ui: {
          child: 'p'
        },
        events: {
          'click p': 'finished'
        },
        finished: jest.genMockFunction()
      });

      click(m.ui.child[0]);

      expect(m.finished).toBeCalled();
      expect(m.finished.mock.calls[0][0].target.tagName).toEqual('P')
    });

    it ("can alias event names using the ui object", function() {
      var m = Washi({
        el: function() {
          var div = document.createElement('div');
          div.innerHTML = "<p>Test</p>";
          return div;
        },
        ui: {
          child: 'p'
        },
        events: {
          'click {child}': 'finished'
        },
        finished: jest.genMockFunction()
      });

      click(m.ui.child[0]);

      expect(m.finished).toBeCalled();
      expect(m.finished.mock.calls[0][0].target.tagName).toEqual('P')
    });

    it ("trims matched aliases", function() {
      var m = Washi({
        el: function() {
          var div = document.createElement('div');
          div.innerHTML = "<p>Test</p>";
          return div;
        },
        ui: {
          child: 'p'
        },
        events: {
          'click { child }': 'finished'
        },
        finished: jest.genMockFunction()
      });

      click(m.ui.child[0]);

      expect(m.finished).toBeCalled();
      expect(m.finished.mock.calls[0][0].target.tagName).toEqual('P')
    });
  });
});
