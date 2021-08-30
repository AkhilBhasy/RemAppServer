const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/RemainderApp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const User=mongoose.model('User',{
    uid:Number,
    uname:String,
    password:String,
    events:[]
})

module.exports={
    User
}