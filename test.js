var fs = require('fs')
var all = require('./lib/flags');

var json = []

for (var type in all) {
  var flags = all[type];
  for (var param in flags){
    var bitflag = flags[param];
    json.push({
      type: type,
      bitflag: bitflag,
      name: param,
      key: ''
    })
  }
}

var string = JSON.stringify(json)
  .replace('[', "[\n")
    .replace(']', "\n]")
  .replace(new RegExp('{', 'g'), "  { ")
  .replace(new RegExp(',', 'g'), ", ")
  .replace(new RegExp('}, ', 'g'), " },\n");

fs.writeFile(__dirname + "/config/flags.json", string, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
