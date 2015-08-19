var crypto = require('crypto')
  , util = require('util')
  , request = require('request')
  , Query = require('./Query')
  , flags = require('./flags')

;

var Moz = (function(){
  function Moz(options) {
    this.options = {
      accessId: '',
      secret: '',
      url: 'http://lsapi.seomoz.com/linkscape',
      expires: 300
    }

    for (var k in options) { this.options[k] = options[k]; }

    if ('string' != typeof this.options.accessId || 0 <= this.options.accessId) throw new Error('API Access ID is required')
    if ('string' != typeof this.options.secret || 0 <= this.options.secret) throw new Error('API Secret is required');
  }

  /**
   * @param {string} api Api name to call
   * @return {Query}
   */
  Moz.prototype.newQuery = function(api) {
    return new Query(api);
  }

  Moz.prototype.send = function(query, callback) {
    this._addAuthParameters(query);
    var options = this._getRequestOptions(query);
    query.reset(); // reset the query so it can be reused later with different targets
    request(options, function(err, response, body) {
      if (err) callback(err);
      else if (body.error_message) callback(body.error_message)
      else callback(null, body);
    });
  }


  Moz.prototype._getRequestOptions = function (query) {
    var url = this._buildUrl(query);
    var options = {
      url: url,
      method: 'GET',
      json: true
    }

    if (this._isBatch(query)) {
      options.method = 'POST';
      options.body =  query.targets;
    }
    return options;
  }

  Moz.prototype._addAuthParameters = function (query) {
    var expires = this._expires();
    query
      .accessId(this.options.accessId)
      .expires(expires)
      .signature(this._signature(expires));
    return query;
  }

  Moz.prototype._buildUrl = function(query) {
    var url = [this.options.url, query.api];

    if (!this._isBatch(query)) url.push(query.targets);

    return url.join('/') + '?' + this._buildQueryString(query);
  }

  Moz.prototype._isBatch = function (query) {
    return util.isArray(query.targets);
  }

  Moz.prototype._buildQueryString = function(query) {
    var args = []
    for (var key in query.params) {
      args.push(encodeURIComponent(key) + '=' + encodeURIComponent(query.params[key]));
    }
    return args.join('&')
  }


  Moz.prototype._signature = function (expires) {
  	var hash = crypto.createHmac('sha1', this.options.secret);
  	hash.setEncoding('base64');
  	hash.write(this.options.accessId + '\n' + expires);
  	hash.end();

  	return hash.read();
  }

  Moz.prototype._expires = function () {
  	return Math.round((new Date().getTime()) / 1000 + this.options.expires);
  }

  /**
   * @param {string} type - One of the key defined in flags.js (`url-metrics`, 'anchor-text', etc)
   * @params {integer} bits - An integer representing a sum of bit flags
   */
  Moz.prototype.bitsToFlags = function(type, bits) {
    var result = [];
    for (var k in flags[type]) if (bits & flags[type][k]) result.push(k)
    return result;
  }

  /**
   * Metadata query
   */
  Moz.prototype.metadata = function(command, callback) {
    var query = this.newQuery('metadata')
      .target(command);
    this.exec(query, callback)
  }

  return Moz
})();

module.exports = exports = function(options) {
  return new Moz(options);
}
