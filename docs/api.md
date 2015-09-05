## Classes
<dl>
<dt><a href="#Moz">Moz</a></dt>
<dd></dd>
<dt><a href="#Query">Query</a></dt>
<dd></dd>
</dl>
<a name="Moz"></a>
## Moz
**Kind**: global class  

* [Moz](#Moz)
  * [new Moz(options)](#new_Moz_new)
  * _instance_
    * [.newQuery(api)](#Moz+newQuery) ⇒ <code>[Query](#Query)</code>
    * [.send(query, callback)](#Moz+send)
    * [.bitsToFlags(type, bits)](#Moz+bitsToFlags) ⇒ <code>array</code>
    * [.metadata(command, callback)](#Moz+metadata)
  * _inner_
    * [~resultCallback](#Moz..resultCallback) : <code>function</code>

<a name="new_Moz_new"></a>
### new Moz(options)
Create a new Moz class instance.
Get your access id and secret [here](https://moz.com/products/api/keys)

For more information about the options check the [anatomy of a mozscape api call](https://moz.com/help/guides/moz-api/mozscape/getting-started-with-mozscape/anatomy-of-a-mozscape-api-call)


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options |
| options.accessId | <code>string</code> | Mozscape access id |
| options.secret | <code>string</code> | Mozscape secret |
| [options.url] | <code>string</code> | Base url of the mozsape api. Default : http://lsapi.seomoz.com/linkscape |
| [options.expires] | <code>integer</code> | Number of seconds used to create the unix timestamp at which the request will no longer be valid |

<a name="Moz+newQuery"></a>
### moz.newQuery(api) ⇒ <code>[Query](#Query)</code>
Create a new Query object.

**Kind**: instance method of <code>[Moz](#Moz)</code>  

| Param | Type | Description |
| --- | --- | --- |
| api | <code>string</code> | Api name to call |

<a name="Moz+send"></a>
### moz.send(query, callback)
Send a query to mozscape.

The callback passed as the second parameter

Example:
```javascript
var query = moz.newQuery('links');
// ...
// Set the query parameters
// ...
moz.send(query, function(err, result){
  // Process result
});
```

**Kind**: instance method of <code>[Moz](#Moz)</code>  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>[Query](#Query)</code> | Query to send |
| callback | <code>[resultCallback](#Moz..resultCallback)</code> | Function called when the request is done or in case of error |

<a name="Moz+bitsToFlags"></a>
### moz.bitsToFlags(type, bits) ⇒ <code>array</code>
Get the flags from a bitflag sum.
This method is used for instance with the `links` API if the flags (bitflag 2) parameter is set.
the result returned by the API will contain a bitflag sum that can be reverted to an array of flags using this method.

Example:
```javascript
// 15 is 1 + 2 + 4 + 8 <=> 'no_follow' + 'same_subdomain' + 'meta_refresh' + 'same_ip_address'
var flags = moz.bitsToFlags('linkcols', 15);
// flags: ['no_follow', 'same_subdomain', 'meta_refresh', 'same_ip_address']
```

**Kind**: instance method of <code>[Moz](#Moz)</code>  
**Returns**: <code>array</code> - Array of flags  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | One of the key defined in flags.js (`url-metrics`, 'anchor-text', etc) |
| bits | <code>integer</code> | An integer representing a sum of bitflags |

<a name="Moz+metadata"></a>
### moz.metadata(command, callback)
Run a metadata query.

There are 3 metadata commands:
- last_update: Returns the date (in Unix Epoch format) of the last Mozscape Index update (In JSON).
- next_update: Returns the date (in Unix Epoch format) of the next scheduled Mozscape Index update (In JSON).
- index_stats: Returns data about the volume of information in the Mozscape Index.

Check the [API reference](https://moz.com/help/guides/moz-api/mozscape/api-reference/metadata) for more information.

This method is a shortcut for:
```javascript
var query = moz.newQuery('metadata')
  .target(command);
moz.send(query, callback);
```

**Kind**: instance method of <code>[Moz](#Moz)</code>  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>stirng</code> | One of `last_update`, `next_update`, `index_stats` |
| callback | <code>[resultCallback](#Moz..resultCallback)</code> | Function called when the request is done or in case of error |

<a name="Moz..resultCallback"></a>
### Moz~resultCallback : <code>function</code>
Define a callback for a mozscape request

**Kind**: inner typedef of <code>[Moz](#Moz)</code>  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> &#124; <code>null</code> | Error thrown during the request, null if the request has been executed correctly |
| result | <code>object</code> &#124; <code>null</code> | Results return by mozscape or null if there is an error |

<a name="Query"></a>
## Query
**Kind**: global class  

* [Query](#Query)
  * [new Query(api)](#new_Query_new)
  * [.target(targets)](#Query+target) ⇒ <code>[Query](#Query)</code>
  * [.limit(limit)](#Query+limit) ⇒ <code>[Query](#Query)</code>
  * [.offset(offset)](#Query+offset) ⇒ <code>[Query](#Query)</code>
  * [.sort(sorter)](#Query+sort) ⇒ <code>[Query](#Query)</code>
  * [.filter(filter)](#Query+filter) ⇒ <code>[Query](#Query)</code>
  * [.scope(scope)](#Query+scope) ⇒ <code>[Query](#Query)</code>
  * [.sourceDomain(domain)](#Query+sourceDomain) ⇒ <code>[Query](#Query)</code>
  * [.cols(cols)](#Query+cols) ⇒ <code>[Query](#Query)</code>
  * [.sourceCols(cols)](#Query+sourceCols) ⇒ <code>[Query](#Query)</code>
  * [.targetCols(cols)](#Query+targetCols) ⇒ <code>[Query](#Query)</code>
  * [.linkCols(cols)](#Query+linkCols) ⇒ <code>[Query](#Query)</code>
  * [.reset()](#Query+reset) ⇒ <code>[Query](#Query)</code>

<a name="new_Query_new"></a>
### new Query(api)
Create a new Query object.

Check the [API reference](https://moz.com/help/guides/moz-api/mozscape/api-reference) for more information about the various endpoints


| Param | Type | Description |
| --- | --- | --- |
| api | <code>string</code> | API endpoint. One of `anchor-text`, `links`, `top-pages`, `url-metrics`, `metadata` |

<a name="Query+target"></a>
### query.target(targets) ⇒ <code>[Query](#Query)</code>
Set the query target(s).

Pass an array of targets to run the query in batch mode.
**The batch mode currently works only on the `url-metrics` endpoint.**

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| targets | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | A target or an array of target |

<a name="Query+limit"></a>
### query.limit(limit) ⇒ <code>[Query](#Query)</code>
Set the Limit parameter.

Specifies a maximum number of results to return for a call.

Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| limit | <code>integer</code> | Limit integer |

<a name="Query+offset"></a>
### query.offset(offset) ⇒ <code>[Query](#Query)</code>
Set the Offset parameter.

Specifies a number of results to skip past.

Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| offset | <code>integer</code> | Offset integer |

<a name="Query+sort"></a>
### query.sort(sorter) ⇒ <code>[Query](#Query)</code>
Set the Sort parameter.

Sort orders results in descending order for a particular value.
Only `links` and `top-pages` endpoints accept Sort parameters.

Some Sort values are incompatible with Scope values.
Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| sorter | <code>string</code> | Sorter field |

<a name="Query+filter"></a>
### query.filter(filter) ⇒ <code>[Query](#Query)</code>
Set the Filter parameter.

Sort orders results in descending order for a particular value.
You can either pass a single filter or an array of filters.

Only `links`, `anchor-text`, and `top-pages` endpoints accept different Filter values
Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | Filter field |

<a name="Query+scope"></a>
### query.scope(scope) ⇒ <code>[Query](#Query)</code>
Set the Scope parameter.

Scope narrows results by returning only certain kinds of links.

Only `links` and `anchor-text` calls accept Scope values.
Each endpoint has its own set of possible values.
Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| scope | <code>string</code> | Scope field |

<a name="Query+sourceDomain"></a>
### query.sourceDomain(domain) ⇒ <code>[Query](#Query)</code>
Set the SourceDomain parameter.

SourceDomain excludes results unless they originate from the root domain you specify.

Only `links` calls accept SourceDomain values.
Check mozscape [links endoint](https://moz.com/help/guides/moz-api/mozscape/api-reference/link-metrics) documentation for more information.

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| domain | <code>string</code> | Source domain to filter results with. |

<a name="Query+cols"></a>
### query.cols(cols) ⇒ <code>[Query](#Query)</code>
Set the Cols parameter.

Specifies which URL metrics to retrieve for a target URL.
Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| cols | <code>Array.&lt;String&gt;</code> &#124; <code>Array.&lt;integer&gt;</code> | Array of flags or bitflags |

<a name="Query+sourceCols"></a>
### query.sourceCols(cols) ⇒ <code>[Query](#Query)</code>
Set the SourceCols parameter.

Specifies which URL metrics to retrieve for the source URL of a link.
Only `links` calls accept SourceCols values.
Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| cols | <code>Array.&lt;String&gt;</code> &#124; <code>Array.&lt;integer&gt;</code> | Array of flags or bitflags |

<a name="Query+targetCols"></a>
### query.targetCols(cols) ⇒ <code>[Query](#Query)</code>
Set the TargetCols parameter.

Specifies which URL metrics to retrieve for the target URL of a link.
Only `links` calls accept TargetCols values.
Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| cols | <code>Array.&lt;String&gt;</code> &#124; <code>Array.&lt;integer&gt;</code> | Array of flags or bitflags |

<a name="Query+linkCols"></a>
### query.linkCols(cols) ⇒ <code>[Query](#Query)</code>
Set the LinkCols parameter.

Specifies which link metrics to retrieve for a link.
Only `links` calls accept LinkCols values.
Check mozscape [common parameters](https://moz.com/help/guides/moz-api/mozscape/api-reference/query-parameters) documentation for more information.

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  

| Param | Type | Description |
| --- | --- | --- |
| cols | <code>Array.&lt;String&gt;</code> &#124; <code>Array.&lt;integer&gt;</code> | Array of flags or bitflags |

<a name="Query+reset"></a>
### query.reset() ⇒ <code>[Query](#Query)</code>
Reset the query.

This method only set the targets to null so the same Query instance can be
run multiple time with the same setup on varuous targets.

**Kind**: instance method of <code>[Query](#Query)</code>  
**Returns**: <code>[Query](#Query)</code> - The instance on which this method was called.  
