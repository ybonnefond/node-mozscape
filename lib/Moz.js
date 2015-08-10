
var Moz = (function(){
  function Moz(options) {
    this.options = {
      accessId: '',
      secret: '',
      url: ''
    }

    for (var k in options) { this.options[k] = options[k]; }

    if ('string' != typeof this.options.accessId || 0 <= this.options.accessId) throw new Error('API Access ID is required')
    if ('string' != typeof this.options.secret || 0 <= this.options.secret) throw new Error('API Secret is required');
  }

  // Moz.prototype.

  return Moz
})();

module.exports = exports = function(options) {
  return new Moz(options);
}
