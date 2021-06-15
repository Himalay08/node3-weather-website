const request = require("request")

const forecast=(latitude,longitude,callback)=>{
  const url='https://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&appid=1c615301b2958825b20412aa1526b4a8'

  request({url,json:true},(error,{body})=>{
      if(error){
        callback('Unable to connect to location services',undefined)
      }else if(body.error){
        callback('Unable to connect try another services',undefined)
      }else{
    console.log(body)    
          callback(undefined,
            
            'It is currently '+body.weather[0].description+' and high and low tempreture respectively is '+body.main.temp_max+' and '+body.main.temp_min+' degree out. There is a wind speed is '+body.wind.speed+'km/h and pressure is '+body.main.pressure+' outside.'
            
            // name:body.main.pressure,
            // temp_min:body.main.temp_min,
            // temp_max:body.main.temp_max
          )

      }
  })
}
module.exports=forecast  