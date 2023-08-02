const request = require('request');


function forCast(lat, long, callback){
    const url = "https://api.weatherapi.com/v1/current.json?key=7f97e74ef23b418c97a155211230503&q=" + lat + "," + long

    request({url, json:true}, (error,response)=>{
        if(error){
            callback(undefined, "CAN'T REACH WEATHERAPI")
        }else if(response.message){
            callback(undefined, response.body.message)
        }else{
            callback(response.body)
        }
    })
}

module.exports={
    forCast
}