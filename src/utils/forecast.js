const request = require("request")

const forecast=(latitude,longitude,callback)=>{
  const url='https://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&appid=1c615301b2958825b20412aa1526b4a8'

  request({url,json:true},(error,{body})=>{
      if(error){
        callback('Unable to connect to location services',undefined)
      }else if(body.error){
        callback('Unable to connect try another services',undefined)
      }else{
          callback(undefined,{
            // message:'It is currently '+response.body.main.temp_min+' degree out',
            name:body.name,
            temp_min:body.main.temp_min,
            temp_max:body.main.temp_max
          })

      }
  })
}
module.exports=forecast  