const Redis = require("ioredis");
const redis = new Redis();

    redis.on('connect', function(){
        console.log('redis connected');
    })
    
    redis.on('error', function(err){
        console.error('redis error => ' + err);
    })
export default redis;
