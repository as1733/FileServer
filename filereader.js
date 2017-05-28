/**
 * Created by as1733 on 25-05-2017.
 */
fs=require('fs');
write=fs.createWriteStream('get');
//stream=fs.createReadStream("naruto.mkv");
c=0;
stream.setEncoding('utf-8');
stream.on('data',function(chunk){


    console.log("******");
    console.log(chunk.length);
c++;
    }

);

stream.on("end",function(){console.log("#################",c);});

stream.pipe(write);