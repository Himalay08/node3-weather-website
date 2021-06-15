const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app=express()
const port=process.env.PORT || 3000

//Define Path For Express Config

const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup Handlebars engine and views location

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup Static Directory to serve

app.use(express.static(publicDirectoryPath))

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Himalay'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is a some helpful.',
        title:'Help',
        name:'Himalay'
    })
})

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Himalay'
    })

})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
      return res.send({
          error:'You must provide address'
      })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                // message:forecastData.message,
                address:req.query.address,
            })
        })

    })
    // res.send({
    //     forecast:'It is snowing',

    //     location:'London',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'Yout must provide search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Himalay',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
   res.render('404',{
       title:'404',
       name:'Himalay',
       errorMessage:'Page not found'
   })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})
