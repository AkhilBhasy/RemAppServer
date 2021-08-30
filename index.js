const express=require('express')
const dataService=require('./services/data.service')
const session=require('express-session')
const app=express()
const cors=require('cors')
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))
app.use(session({
    secret:'randomSecureString',
    resave:false,
    saveUninitialized:false
}))
app.use(express.json())

app.use((req,res,next)=>{
    console.log("Middleware");
    next()
})

const loginMiddleware=(req,res,next)=>{
    if(!req.session.currentAcc){
        return res.json({
            statusCode:422,
            status:false,
            message:"Plz log in" 
        })
    }
    next()
}

app.get('/',(req,res)=>{
    res.status(401).send("Server Started,GET Method...")
})



app.post('/register',(req,res)=>{   
    dataService.register(req.body.uid,req.body.uname,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})


app.post('/login',(req,res)=>{
    dataService.login(req,req.body.uid,req.body.pswd)
   .then(result=>{
    res.status(result.statusCode).json(result)
})
})
app.post('/addRem',loginMiddleware,(req,res)=>{
   dataService.addRem(req,req.body.uid,req.body.event,req.body.date)
  .then(result=>{
   res.status(result.statusCode).json(result)
})
})
// app.post('/withdraw',loginMiddleware,(req,res)=>{
//    dataService.withdraw(req,req.body.acno,req.body.pswd,req.body.amt)
//   .then(result=>{
//    res.status(result.statusCode).json(result)
// })
// })

app.post('/getRems',loginMiddleware,(req,res)=>{
   dataService.getRems(req.body.uid)
   .then(result=>{
   res.status(result.statusCode).json(result)
})
})


// app.delete('/deleteAcc/:acno',loginMiddleware,(req,res)=>{
//    dataService.deleteAcc(req.params.acno)
//    .then(result=>{
//    res.status(result.statusCode).json(result)
// })
// })

app.listen(3030,()=>{
    console.log("Server started at port number:3030");
})