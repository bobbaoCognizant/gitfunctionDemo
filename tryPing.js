var fs = require('fs');
var readline = require('readline');
var ping = require('ping');
var Promise = require("bluebird");

var filename =  process.argv[2];
var targetFileHead = process.argv[3];

var ips = new Array(0);
var successIps = "";
var failedIps = "";

function checkping(host) {
  return ping.promise.probe(host).then(function(res){
    //console.dir(res)
    if(res.alive) {
      //console.dir(isAlive);
      console.log(host + " success!");
      successIps += host + "\r\n";
    } else {

//	console.log(host + " failed!");
      failedIps += host + "\r\n";
    }
  });
}

readline.createInterface({
    input: fs.createReadStream(filename),
    terminal: false
}).on('line', function(line) {
   if(line.match(/,\d+.\d+.\d+.\d+/g) != null) {
     ip = line.match(/,\d+.\d+.\d+.\d+/g)[0];
     ip = ip.substr(1,ip.length);
     //console.log(ip);
    ips = ips.concat(ip);
   }
}).on('close', function() {

  var resChkPings = Promise.all(ips.map(checkping)).then(function() { 
  var successStream = fs.createWriteStream(targetFileHead + "-" + "success.txt");
  successStream.once('open', function(fd) {
        successStream.write(successIps);
        successStream.end();
      });

      var failedstream = fs.createWriteStream(targetFileHead + "-" + "failed.txt");
      failedstream.once('open', function(fd) {
            failedstream.write(failedIps);
            failedstream.end();
          });
      });
});




