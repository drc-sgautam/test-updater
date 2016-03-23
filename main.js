

'use strict';


var fs= require('fs');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;


var cmdCheck = 'launchctl list local.ecaservice';
var cmdLoad = 'cd /Users/shubasgautam/Library/Services/ && rm -rf * && git clone https://github.com/drc-sgautam/testService.git api && cd  api && npm install';
var cmdstart = 'launchctl unload ~/Library/LaunchAgents/local.ecaservice.plist && launchctl load -w ~/Library/LaunchAgents/local.ecaservice.plist';
var cmdStartService='launchctl start local.ecaservice';


// Module to control application life.
const app = {};

//plist file content and cofiguration
var _plist = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict> <key>AbandonProcessGroup</key>  <true/> <key>KeepAlive</key>  <true/> <key>Label</key>  <string>local.ecaservice</string> <key>ProgramArguments</key> <array>   <string>/usr/local/bin/node</string>    <string>/Users/shubasgautam/Library/Services/api/server.js</string>  </array>  <key>RunAtLoad</key>  <true/> <key>StandardErrorPath</key>  <string>/usr/local/var/log/runner/output.log</string> <key>StandardOutPath</key>  <string>/usr/local/var/log/runner/output.log</string> <key>WorkingDirectory</key> <string>/Users/shubasgautam/dev/test/api</string></dict></plist>';

function chckPlist(cb) {
  fs.writeFile('/Users/shubasgautam/Library/LaunchAgents/local.ecaservice.plist',_plist,function(err){   
    if(!err){
      return cb();
    } else{ console.log("Error occured while writing.plist file >>> " , err);}
     
  });
  return null;
}


app.run = function(cb) {
   chckPlist(function(){
            console.log('Loading local.ecaservice now..');
            var options = {env:'/usr/local/bin/node'};
            var strload = execSync(cmdLoad,options);
            if(strload){
            var strstart = execSync(cmdstart);  
              if(strstart)  {
                var strtfinal =  execSync(cmdStartService);
                if(strtfinal){           
                    cb();
                   }
              } 
            }    
    });
  

   
}
exports = module.exports=app;


