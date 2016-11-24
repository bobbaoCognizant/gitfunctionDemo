var fs = require('fs');
var readline = require('readline');

var filename =  process.argv[2];
var targetFileHead = process.argv[3];
var keys = process.argv[4];
var ipsArray = new Array(keys.split(',').length);

var tempIp = '';

console.log(filename);
console.log(targetFileHead);
console.log(keys);

readline.createInterface({
    input: fs.createReadStream(filename),
    terminal: false
}).on('line', function(line) {
   if(line.indexOf(' Ping ') != -1){
     tempIp = line.substring(0, line.indexOf(' '));
   } else {
    keys.split(',').forEach(function(value, index) {
      if(line.indexOf('(' + value + '% ') != -1) {
        if(ipsArray[index] != null) {
		ipsArray[index] = ipsArray[index] + tempIp + "\r\n";
	} else {
		ipsArray[index] = tempIp + "\r\n";
	}
      }
    });
   }

}).on('close', function() {

 ipsArray.forEach(function(value, index) {
  var stream = fs.createWriteStream(targetFileHead + "-" + keys.split(',')[index] + ".txt");
      stream.once('open', function(fd) {
        stream.write(value);
        stream.end();
      });
 });

});

