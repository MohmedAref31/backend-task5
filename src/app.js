const express = require("express");
const hbs = require("hbs");
const path = require("path")
const app = express();
const port = process.env.port || 3000;
const partialsDirectory = path.join(__dirname,"../views/partials")
app.set("view engine", "hbs");
hbs.registerPartials(partialsDirectory)

// read style file
app.use(express.static(path.join(__dirname,"../public")))

app.get("/",(req,res)=>{
    res.render("index",{
        title:"Home page"
    })
})

app.get("/weather",(req,res)=>{
    res.render("weather",{
        title:"Weather page"
    })
})
/////////////////////////////////////////////
const geocode = require("./geocode");
const forcast = require("./forcast")

//  geocode.getGeo("london",(res,error)=>{
//     console.log(res,error)
//     forcast.forCast(res[0],res[1],(res,error)=>{
//         console.log(res,error)
//     })
//  })


app.get("/weatherApi",(req,res)=>{
    const data = req.query;
    if(!data.location){
       return res.send({
            error:"please enter valid location"
        })
    }else{
        geocode.getGeo(data.location,(respo,error)=>{
            console.log(respo)
            if(error){
                return  res.send({
                    error:error
                })
            }else{
                forcast.forCast(respo[0],respo[1],(resp,error)=>{
                    console.log(resp)
                    if(error){
                        return  res.send({
                            error
                        })
                    }else if(resp.error){
                            res.send({
                                error:resp.error.message
                            })
                    }else{
                        res.send({
                            country:data.location,
                            location:[respo[0],respo[1]],
                            temp:resp.current.temp_c,
                            text:resp.current.condition.text,
                            icon:resp.current.condition.icon
                        })
                    }
                })
            }
        })
    }
   
})


app.listen(port,()=>{
    console.log("app is running")
})