var LTR = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-' +
          '\u0590\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
    RTL = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';

function checkDirection (str) {
  return new RegExp('^[^' + LTR + ']*[' + RTL + ' ]').test(str) ? 'rtl' : 'ltr';
}

function BidiEl (options) {
  this.el = document.querySelector(options.el);
}

BidiEl.prototype = Object.create({
  init: function() {

    this.keyup = Rx.DOM.fromEvent( this.el, 'keyup' ).select( function (evt) {
      return evt.target.value;
    }).select( function ( text ) {
      return checkDirection( text );
    }).distinctUntilChanged();

    this.subscribe();
  },
  subscribe: function () {
    this.subscription = this.keyup.subscribe( function( direction ) {
      this.el.style.direction = direction;
    }.bind(this));
  },
  dispose: function () {
    this.subscription.dispose();
  }
});

export default BidiEl;