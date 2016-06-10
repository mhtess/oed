/* helper javascript utilities */

var readCsv = function(fileName) {
  var fileContents = require('fs').readFileSync(fileName, 'UTF8');
  var csv = require('babyparse').parse(fileContents, {header: true, skipEmptyLines: true}).data;
  return csv;
}

module.exports = {
  readCsv: readCsv
}
