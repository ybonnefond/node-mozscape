"use strict";
 /**
  * Define a callback for a mozscape request
  * @callback Moz~resultCallback
  * @param {Error|null} err        - Error thrown during the request, null if the request has been executed correctly
  * @param {object|null} result    - Results return by mozscape or null if there is an error
  */

/**
 * @private
 */
var crypto    = require('crypto')
  , util      = require('util')
  , request   = require('request')
  , Query     = require('./Query')

;

/**
 * Create a new Moz class instance.
 * Get your access id and secret [here](https://moz.com/products/api/keys)
 *
 * For more information about the options check the [anatomy of a mozscape api call](https://moz.com/help/guides/moz-api/mozscape/getting-started-with-mozscape/anatomy-of-a-mozscape-api-call)
 *
 * @module mozscape-request
 * @class Moz
 * @param {object} options - Options
 * @param {string} options.accessId     - Mozscape access id
 * @param {string} options.secret       - Mozscape secret
 * @param {string} [options.url]        - Base url of the mozsape api. Default : http://lsapi.seomoz.com/linkscape
 * @param {integer} [options.expires]   - Number of seconds used to create the unix timestamp at which the request will no longer be valid
 */
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
 * Create a new Query object.
 *
 * @param {string} api - Api name to call
 * @return {Query}
 */
Moz.prototype.newQuery = function(api) {
  return new Query(api);
}

/**
 * Send a query to mozscape.
 *
 * The callback passed as the second parameter
 *
 * Example:
 * ```javascript
 * var query = moz.newQuery('links');
 * // ...
 * // Set the query parameters
 * // ...
 * moz.send(query, function(err, result){
 *   // Process result
 * });
 * ```
 *
 * @param {Query} query                   - Query to send
 * @param {Moz~resultCallback} callback   - Function called when the request is done or in case of error
 */
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

/**
 * Create the option object to pass to the request module
 *
 * @private
 * @param {Query} query - The query to send
 * @return {object}
 */
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

/**
 * Add authentication parameters to a query
 *
 * @private
 * @param {Query} query - A query object
 * @return {Query} The very same query object passed as parameter
 */
Moz.prototype._addAuthParameters = function (query) {
  var expires = this._expires();
  query
    .accessId(this.options.accessId)
    .expires(expires)
    .signature(this._signature(expires));
  return query;
}

/**
 * Build an URL from a QUery object. This URL will be used to make the call to the mozscape API
 *
 * @private
 * @param {Query} query - A Query object
 * @return {string}
 */
Moz.prototype._buildUrl = function(query) {
  var url = [this.options.url, query.api];

  if (!this._isBatch(query)) url.push(query.targets);

  return url.join('/') + '?' + this._buildQueryString(query);
}

/**
 * Verify if a Query send multiple targets.
 *
 * @private
 * @param {Query} query - A Query object
 * @return {boolean} True if the query has multiple targets, otherwise false
 */
Moz.prototype._isBatch = function (query) {
  return util.isArray(query.targets);
}

/**
 * Build a query string from a Query object.
 * This will be used to build the URL to send to the mozscape API
 *
 * @private
 * @param {Query} query - A Query object
 * @return {string} A query string
 */
Moz.prototype._buildQueryString = function(query) {
  var args = []
  for (var key in query.params) {
    args.push(encodeURIComponent(key) + '=' + encodeURIComponent(query.params[key]));
  }
  return args.join('&')
}

/**
 * Generate the signature parameter value
 *
 * @private
 * @param {integer} expires - A timestamp defining when the request will expire
 * @return {string} A signature hash
 */
Moz.prototype._signature = function (expires) {
	var hash = crypto.createHmac('sha1', this.options.secret);
	hash.setEncoding('base64');
	hash.write(this.options.accessId + '\n' + expires);
	hash.end();

	return hash.read();
}
/**
 * Get the timestamp when the request will expire.
 * It is calculated by adding the number of seconds defined in options.expires
 * to the timestamp at the moment of the call of this function
 *
 * @private
 * @return {integer} A timestamp
 */
Moz.prototype._expires = function () {
	return Math.round((new Date().getTime()) / 1000 + this.options.expires);
}

/**
 * Get the flags from a bitflag sum.
 * This method is used for instance with the `links` API if the flags (bitflag 2) parameter is set.
 * the result returned by the API will contain a bitflag sum that can be reverted to an array of flags using this method.
 *
 * Example:
 * ```javascript
 * // 15 is 1 + 2 + 4 + 8 <=> 'no_follow' + 'same_subdomain' + 'meta_refresh' + 'same_ip_address'
 * var flags = moz.bitsToFlags('linkcols', 15);
 * // flags: ['no_follow', 'same_subdomain', 'meta_refresh', 'same_ip_address']
 * ```
 *
 * @param {string} type - One of the key defined in flags.js (`url-metrics`, 'anchor-text', etc)
 * @param {integer} bits - An integer representing a sum of bitflags
 * @return {array} Array of flags
 */
Moz.prototype.bitsToFlags = function(type, bits) {
  var result = [];
  for (var k in Query.lags[type]) if (bits & Query.flags[type][k]) result.push(k)
  return result;
}

/**
 * Run a metadata query.
 *
 * There are 3 metadata commands:
 * - last_update: Returns the date (in Unix Epoch format) of the last Mozscape Index update (In JSON).
 * - next_update: Returns the date (in Unix Epoch format) of the next scheduled Mozscape Index update (In JSON).
 * - index_stats: Returns data about the volume of information in the Mozscape Index.
 *
 * Check the [API reference](https://moz.com/help/guides/moz-api/mozscape/api-reference/metadata) for more information.
 *
 * This method is a shortcut for:
 * ```javascript
 * var query = moz.newQuery('metadata')
 *   .target(command);
 * moz.send(query, callback);
 * ```
 *
 * @param {stirng} command - One of `last_update`, `next_update`, `index_stats`
 * @param {Moz~resultCallback} callback   - Function called when the request is done or in case of error
 */
Moz.prototype.metadata = function(command, callback) {
  var query = this.newQuery('metadata')
    .target(command);
  this.exec(query, callback)
}


module.exports = exports = function(options){ return new Moz(options); };
