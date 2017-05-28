var express=require('express');
var customfile=require('./index.js');
var mime = require('mime');
var fs=require('fs');
var https=require('https');
var path=require('path');
const app=express();
var currentdir=__dirname;
var root=__dirname;
var authIp="192.168.0.108";
var secureserverport=8000;
var options={cert:fs.readFileSync('./cert.pem'),key:fs.readFileSync('./newkey.pem')};
https.createServer(options,app).listen(secureserverport);
var securityCheck=function(req,res,next){
    var ip=req.connection.remoteAddress.toString();
    ip=ip.substr(ip.lastIndexOf(':')+1);
    if(authIp!=ip) {
        console.log("Unauthorized IP -%s",req.connection.remoteAddress);
       res.writeHead(404);
        res.end("Contact as1733 error");
    }else if(authIp===ip) {console.log("GOing throug with ip %s",req.connection.remoteAddress);next();};}
//app.use(securityCheck);
app.use(express.static('public'));
app.get('/',function(req,res){res.send("deny");});
app.get('/view',view);
app.get('/fetch',fetch);
app.get('/p2p',p2p);
app.listen(8081,"localhost");

function view(req,res){

res.sendFile(path.join(__dirname,'public\\interface.html'));


};
function fetch(req,res) {
    var dirname = req.query.directory;
    console.log("******dirname from url ", dirname);
    var direct = __dirname;
    if (req.query.currentdire === 'root') {
        resd = {"path": 'root', 'current': root};
        resd = JSON.stringify(resd);
        res.send(resd);
        res.end();
        console.log("FIRST TIME USER TAB DIRECTORY SENT");
    }
    if (dirname === 'parent_up') {currentdir=req.query.currentdire;
        direct = currentdir.substr(0, currentdir.lastIndexOf('\\'));
    }else
     {currentdir=req.query.currentdire;
        direct = currentdir + "\\" + dirname;}
    console.log("Sending Path %s", direct);

    customfile.isDirectory(direct).then((result) => {console.log("It is a directory");
    customfile.getFileinDirectory(direct)
        .then(
            (results) => {
        console.log("sending", results);
    results['current'] = direct;
    res.send(results);
    res.end();
}
)
}
).
    catch((e) => {
        var filename = path.basename(direct);
    var mimetype = mime.lookup(direct);
    console.log("ITS A FILE %s %s", filename, mimetype);
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);
    var filestream = fs.createReadStream(direct);
    filestream.pipe(res);


}) ;




};
//console.log(customFile.getFileinDirectory("C:\\").then((got)=>{console.log(got);}));
function p2p(req,res){
    res.sendFile(path.join(__dirname,'public\\p2p.html'));
};