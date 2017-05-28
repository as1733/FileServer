/**
 * Created by as1733 on 24-05-2017.
 */
var exports = module.exports = {};
var path =require('path');
var fs=require('fs');
var result;
var results={filename:"",size:0,dir:null};
var walk=function(dir,list){
    fs.readdir(dir,function(error,items)
            { console.log("************%s######%s",dir,items);
                items.forEach(function(filefolder)
                    {console.log("************%s######%s",dir,filefolder);

                        fs.lstat(dir+"\\"+filefolder,function(err,fileStats){

                            if(fs.statSync(dir+"\\"+filefolder).isFile())
                            {console.log("compare and return the control for %s",filefolder);
                                if(results.size<fileStats.size)
                                    { results.filename=filefolder;
                                        results.size=fileStats.size;
                                        results.pathname=dir+"\\"+filefolder;
                                        list=results;
                                        console.log(results);}
                            }else
                            {console.log("use Recursion for %s",filefolder);
                            newpath=dir+"\\"+filefolder;
                            console.log(newpath);
                            walk(newpath,null)
                            }


                        });

                    }
                );
            });


console.log(result);};
//walk("C:\\Users\\as1733\\WebstormProjects\\recursiveFileSearch\\" ,null);
function helloworld(){console.log("Hello World")};


exports.adityaHello=helloworld;
exports.recursiveSearch=walk;