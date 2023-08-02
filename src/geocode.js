const request = require("request")


function getGeo(address,callback){
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw"

    request({url, json:true},(error,response)=>{
        // console.log(response.body)
        // console.log(error)
        if(error){
            // console.log("ERROR: ", error);
            callback(undefined,"CANN'T REACH MAPBOX")
        }else if(response.body.message){
            // console.log(response.body.message)
            callback(undefined, response.body.message)
        }else if(response.body.features.length == 0){
            // console.log("Country name is wrong")
            callback(undefined, "CONTRY NAME IS WRONG")
        }else{
            // console.log(response.body.features)
            callback(response.body.features[1].center,undefined)
        }
    })
}

// getGeo("egypt")

module.exports = {
    getGeo
}