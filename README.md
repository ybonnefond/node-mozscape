### Moz

- [Get a moz authentication token and secret](https://moz.com/products/api/keys)
- [Moz api documentation](https://moz.com/help/guides/moz-api/mozscape)

## installation

```bash
  npm install node-mozscape
```

## Basic Usage

### Require the module and pass your options
```javascript
  var moz = require('node-moz')({
    accessId: '<YOUR ACCESSID>',
    secret: '<YOUR SECRET>',
    expires: 300  // Optional, default set to 300
  });
```

Available options:
- **accessId** {string} : Mozscape access id
- **secret** {string} : Mozscape secret
- **url** {string} [optional] : Api url, Default: http://apiv2.ahrefs.com/,
- **expires** {boolean} [optional] : Expires delay, Default: 300

### Build and run a query

```javascript
  var query = moz.newQuery('links')
    .target('http://moz.com')
    .linkCols(['title', 'url', 'moz_rank', 'page_authority'])
    .sort('page_authority')
    .limit(10)

  moz.exec(query, function(err, callback){

  });
```

### Batch mode

To use the batch mode, simply pass an array to the `targets` method. Batch mode request use POST method.

```javascript
  var query = moz.newQuery('links')
    .target(['http://moz.com', 'http://optimiz.me'])
    .linkCols(['title', 'url', 'moz_rank', 'page_authority'])
    .sort('page_authority')
    .limit(10)

  moz.exec(query, function(err, callback){

  });
```

### Metadata

Metadata request are done in a similar fashion
```javascript

  moz.metadata('last_update', function(err, last_update){

  });

  // Which is the short for:

  var query = moz.newQuery('metadata')
    .target('last_update');

  moz.exec(query, function(err, result){

  });
```


## Run tests

You must specify your token to run the test suite:

```bash
  ACCESSID="<ACCESSID>" SECRET="<SECRET>" npm test
```

You can also run the tests agains your own target if needed (default is `moz.com`):
```bash
  TARGET=<YOUR TARGET> ACCESSID="<ACCESSID>" SECRET="<SECRET>" npm test
```

Todo:
- Support request frequency rate
- Jsdoc
