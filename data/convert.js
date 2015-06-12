var fs = require('fs');

var old_engrams = require('./old_engrams');

var engrams = {};


function Convert(old_engram, target) {

  var key = camelize(old_engram.name);
  var engram = {
    prettyName: old_engram.name,
    cost: old_engram.consumes,
    level: old_engram.lvlreq
  };
  if (old_engram.requires === null) {
    engram.depends = [];
  } else {
    engram.depends = old_engram.requires.map(function(item) {
      return camelize(old_engrams[item - 1].name);
    });
  }

  target[key] = engram;
}

function camelize(str) {
  //try {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  // } catch (error) {
  //   console.log(str);
  //   console.log(error);
  // }

}

old_engrams.map(function(item) {
  Convert(item, engrams);
});

var file = fs.openSync('./engrams.json', 'w');
fs.writeSync(file, JSON.stringify(engrams, null, 2));
