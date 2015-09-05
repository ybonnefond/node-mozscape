"use strict";

var fs          = require('fs')
  , util        = require('util')
  , flags       = JSON.parse(fs.readFileSync(__dirname + '/../config/flags.json', 'utf8'))
  , rules       = JSON.parse(fs.readFileSync(__dirname + '/../config/rules.json', 'utf8'))
  , apis_names  = Object.keys(rules.api)
;
/**
 * Create a new Query object.
 *
 * Check the [API reference](https://moz.com/help/guides/moz-api/mozscape/api-reference) for more information about the various endpoints
 *
 * @module mozscape-request
 * @class Query
 * @param {string} api - API endpoint. One of `anchor-text`, `links`, `top-pages`, `url-metrics`, `metadata`
 */
function Query(api) {
  if (apis_names.indexOf(api) < 0) throw new Error('Unknown api name ' + api)

  this.api = api
  this.definition = rules.api[api]
  this.params = {}
  this.targets = null;
}

/**
 * flags
 */
Query.flags = flags;

/**
 * @member rules
 */
Query.rules = rules;

/**
 * Set the query target(s).
 *
 * Pass an array of targets to run the query in batch mode.
 * **The batch mode currently works only on the `url-metrics` endpoint.**
 *
 * @param {string|string[]} targets - A target or an array of target
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.target = function(targets) {
  if ('string' !== typeof targets && !util.isArray(targets)) throw new Error('Invalid typeof targets');
  this.targets = targets;
  return this;
}

/**
 * Set the AccessId parameter.
 *
 * This method is used by the Moz class when sending the request
 * which will override values set by prior call
 *
 * @private
 * @param {string} id - Mozscape access ID
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.accessId = function(id){
  return this.setParam('AccessID', id);
}

/**
 * Set the Expires parameter.
 *
 * This method is used by the Moz class when sending the request
 * which will override values set by prior call
 *
 * @private
 * @param {integer} timestamp - Expires timestamp
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.expires = function(timestamp){
  return this.setParam('Expires', timestamp);
}

/**
 * Set the Signature parameter.
 *
 * This method is used by the Moz class when sending the request
 * which will override values set by prior call
 *
 * @private
 * @param {string} signature - Signature hash
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.signature = function(signature){
  return this.setParam('Signature', signature);
}

/**
 * Set the Limit parameter.
 *
 * Specifies a maximum number of results to return for a call.
 *
 * Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.
 *
 * @param {integer} limit - Limit integer
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.limit = function(limit) {
  return this.setParam('Limit', limit)
}

/**
 * Set the Offset parameter.
 *
 * Specifies a number of results to skip past.
 *
 * Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.
 *
 * @param {integer} offset - Offset integer
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.offset = function(offset) {
  return this.setParam('Offset', offset)
}

/**
 * Set the Sort parameter.
 *
 * Sort orders results in descending order for a particular value.
 * Only `links` and `top-pages` endpoints accept Sort parameters.
 *
 * Some Sort values are incompatible with Scope values.
 * Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.
 *
 * @param {string} sorter - Sorter field
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.sort = function(sorter) {
  return this.setParam('Sort', sorter)
}

/**
 * Set the Filter parameter.
 *
 * Sort orders results in descending order for a particular value.
 * You can either pass a single filter or an array of filters.
 *
 * Only `links`, `anchor-text`, and `top-pages` endpoints accept different Filter values
 * Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.
 *
 * @param {string|string[]} filter - Filter field
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.filter = function(filter) {
  return this.setParam('Filter', filter);
}

/**
 * Set the Scope parameter.
 *
 * Scope narrows results by returning only certain kinds of links.
 *
 * Only `links` and `anchor-text` calls accept Scope values.
 * Each endpoint has its own set of possible values.
 * Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.
 *
 * @param {string} scope - Scope field
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.scope = function(scope) {
  return this.setParam('Scope', scope);
}

/**
 * Set the SourceDomain parameter.
 *
 * SourceDomain excludes results unless they originate from the root domain you specify.
 *
 * Only `links` calls accept SourceDomain values.
 * Check mozscape [links endoint](https://moz.com/help/guides/moz-api/mozscape/api-reference/link-metrics) documentation for more information.
 *
 * @param {string} domain - Source domain to filter results with.
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.sourceDomain = function(domain) {
  return this.setParam('SourceDomain', domain);
}

/**
 * Set the Cols parameter.
 *
 * Specifies which URL metrics to retrieve for a target URL.
 * Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.
 *
 * @param {(String[]|integer[])} cols - Array of flags or bitflags
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.cols = function(cols) {
  return this.setParam('Cols', cols);
}

/**
 * Set the SourceCols parameter.
 *
 * Specifies which URL metrics to retrieve for the source URL of a link.
 * Only `links` calls accept SourceCols values.
 * Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.
 *
 * @param {(String[]|integer[])} cols - Array of flags or bitflags
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.sourceCols = function(cols) {
  return this.setParam('SourceCols', cols);
}

/**
 * Set the TargetCols parameter.
 *
 * Specifies which URL metrics to retrieve for the target URL of a link.
 * Only `links` calls accept TargetCols values.
 * Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.
 *
 * @param {(String[]|integer[])} cols - Array of flags or bitflags
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.targetCols = function(cols) {
  return this.setParam('TargetCols', cols);
}

/**
 * Set the LinkCols parameter.
 *
 * Specifies which link metrics to retrieve for a link.
 * Only `links` calls accept LinkCols values.
 * Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.
 *
 * @param {(String[]|integer[])} cols - Array of flags or bitflags
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.linkCols = function(cols) {
  return this.setParam('LinkCols', cols);
}

/**
 * Set a parameter.
 *
 * @private
 * @param {string} param - Name of the parameter
 * @param {mixed} value - Value of the parameter
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.setParam = function(param, value) {
  this.params[param] = this.validate(param, value);
  return this;
}

/**
 * Reset the query.
 *
 * This method only set the targets to null so the same Query instance can be
 * run multiple time with the same setup on varuous targets.
 *
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.reset = function() {
  this.target = null;
  return this;
}

/**
 * Validate a value of a parameter.
 *
 * @private
 * @param {string} param - Parameter name
 * @param {mixed} value - Parameter value
 * @return {Query} The instance on which this method was called.
 */
Query.prototype.validate = function(param, value) {
  var def = this.definition.parameters[param] || rules.parameters[param]

  if (!def) throw new Error('This api doesn\'t accept the param : ' + param)
  if (!value) throw new Error('Value cannot be empty for param `'+param+'`')

  if (util.isArray(def))  def = { type: 'string', enum: def }

  if ('string' === typeof def) def = { type: def };

  switch (def.type) {
    case 'array':
      if ('string' === typeof value) value = [value];
      if (def.enum) {
        value.forEach(function(v){
          if (def.enum.indexOf(v) < 0) throw new Error('Invalid value `'+v+'` for parameter `'+param+'`, expected one of :' + def.enum.join(', '));
        });
      }
      value = value.join('+');
      break;
    case 'string':
      if ('string' !== typeof value) throw new Error('Expected value to be a string');
      if ((value+'').length === 0) throw new Error('Expect parameter `'+param+'` not to be empty');
      if (def.enum && def.enum.indexOf(value) < 0)  throw new Error('Invalid ' + param + '. Expected one of : ' + def.join(', '));
      break;
    case 'int':
      if(!(!isNaN(parseInt(value+'')) && isFinite(value))) throw new Error('Expected parameter `'+param+'` to be an integer');
      break;
    case 'bitflags':
      if (!util.isArray(value)) throw new Error('Expect parameter `'+param+'` to be an array')
      if (0 === value.length) throw new Error('Expect parameter `'+param+'` not to be empty')
      var bits = 0
      var col_flags = def.flags? flags[def.flags] : flags[this.api];
      for (var k in value) {
        var col = value[k];
        if ('string' === typeof col) {
          if (!col_flags[col]) throw new Error('Unknown column ' + col + ' for parameter ' + param);
          col = col_flags[col];
        };
        bits += col;
      }
      value = bits;
      break;
    default: throw new Error('Unsupported type `' + def + '` for parameter `'+param+'`');
  }

  return value;
}

module.exports = exports = Query;
