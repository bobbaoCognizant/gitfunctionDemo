var fs = require('fs');
var readline = require('readline');
var iconvlite = require('iconv-lite')
var filename =  './ping3/log3.txt';
var tempIp = '';
var zeroIps = '';
var oneIps = '';


readline.createInterface({
    input: fs.createReadStream(filename),
    terminal: false
}).on('line', function(line) {
   if(line.indexOf(' Ping ') != -1){
	tempIp = line.substring(0, line.indexOf(' '));
   } else if(line.indexOf('(0% ') != -1) {
     //var ip = iconvlite.decode(tempIp, 'EUC-CN');
     
     zeroIps += tempIp + "\r\n ";
   } else if(line.indexOf('(100% ') != -1) {
     oneIps += tempIp + "\r\n ";
   }
}).on('close', function() {
  var stream = fs.createWriteStream("3-0.txt");
    stream.once('open', function(fd) {
	//console.log(zeroIps);
      stream.write(zeroIps);
      stream.end();
  });

  var stream2 = fs.createWriteStream("3-100.txt");
      stream2.once('open', function(fd) {
	//console.log(oneIps);
        stream2.write(oneIps);
        stream2.end();
      });
});
