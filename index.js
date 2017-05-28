fs=require('fs');var exports = module.exports = {};
function getFilesNameInDirectory(directory){
    var results=[];
    console.log(directory);
    var promise = new Promise((resolve,reject)=>{
    fs.readdir(directory,function(err,List) {
            if(err)reject(err);
            else resolve({items:List,path:directory});

        }

    );


    });


    return promise;





};

//console.log(getFilesNameInDirectory(__dirname).then((got)=>{console.log(got);}));
function fileorfolder(fullpath){
   var pro=new Promise((resolve,reject)=>{

       fs.stat(fullpath,function(err,stats){
          if(err)reject(err);
          else {
              var t = stats.isDirectory();
              if(t)
              resolve(t);
               else{reject(t);
               }
          }
       });

   });
return pro;




}
fileorfolder("C:\\Users\\as1733\\ntuser.ini").then((result)=>{console.log("hey"+result);
getFilesNameInDirectory("C:\\Users\\as1733\\").then((results)=>{console.log("hiierhh",results);})}).catch((e)=>{console.log("ITS A FILE");});


exports.isDirectory=fileorfolder;
exports.getFileinDirectory=getFilesNameInDirectory;