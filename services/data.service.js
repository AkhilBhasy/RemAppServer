const db = require('./db')

user = {
  1000: { uid: 1000, uname: "Akhil", password: "userone", events: [] },
  1001: { uid: 1001, uname: "Shinu", password: "usertwo", events: [] },
  1002: { uid: 1002, uname: "Hiran", password: "userthree", events: [] },
  1003: { uid: 1003, uname: "Sayooj", password: "userfour", events: [] },
  1004: { uid: 1004, uname: "Binu", password: "userfive", events: [] }
}


const register = (uid, uname, password) => {
  return db.User.findOne({
    uid
  }).then(user => {
    console.log(user)
    if (user) {
      return {
        statusCode: 422,
        status: false,
        message: "User already exists... plz log in"
      }
    }
    else {
      const newUser = new db.User({
        uid,
        uname,
        password,
        events: []
      })
      newUser.save()
      return {
        statusCode: 200,
        status: true,
        message: "Registered Successfully....!!!"
      }
    }
  })

  
}

const login = (req, uid, pswd) => {

  return db.User.findOne({
    uid,
    password: pswd
  }).then(user => {
    if (user) {
      req.session.currentAcc = user.uid
      return {
        statusCode: 200,
        status: true,
        message: "Login Successfull...!!!",
        userName:user.uname,
        currentAcc:user.uid
      }
    }
    return {
      statusCode: 422,
      status: false,
      message: "Invalid User"
    }
  })
}


const addRem = (req,uid,event,date) => {
 

  return db.User.findOne({
    uid
  }).then(user => {
    if (!user) {
      return {
        statusCode: 422,
        status: false,
        message: "Invalid User"
      }
    }
    if(req.session.currentAcc!=user.uid){
      return {
        statusCode: 422,
        status: false,
        message: "Operation denied.. plz log in..."
      }
    }
    
    user.events.push({
        Event:event,
        Date:date
    })
    user.save()
    return {
      statusCode: 200,
      status: true,
      message:  " Event added.....!! " 
    }
  })
}


// const withdraw = (req,acno, pswd, amt) => {
//   var amount = parseInt(amt)

//   return db.User.findOne({
//     acno,
//     password: pswd
//   }).then(user => {
//     if (!user) {
//       return {
//         statusCode: 422,
//         status: false,
//         message: "Invalid User"
//       }
//     }
//     if(req.session.currentAcc!=user.acno){
//       return {
//         statusCode: 422,
//         status: false,
//         message: "Operation denied.. plz log in..."
//       }
//     }
//     if (user.balance > amount) {
//       user.balance -= amount
//       user.transaction.push({
//         amount: amount,
//         type: "Debit"
//       })
//       user.save()
//       return {
//         statusCode: 200,
//         status: true,
//         message: amount + " Debited successfully.. Balance: " + user.balance
//       }
//     }
//     else {
//       return {
//         statusCode: 422,
//         status: false,
//         message: "Insufficient Balance"
//       }
//     }
//   })
// }




const getRems = (uid) => {
  return db.User.findOne({
    uid
  }).then(user => {
    if (user) {
      return {
        statusCode: 200,
        status: true,
        events: user.events
      }
    }
    else {
      return {
        statusCode: 422,
        status: false,
        message: "Invalid Operation"
      }
    }
  })
}


// const deleteAcc = (acno) => {
//   return db.User.deleteOne({
//     acno:acno
//   }).then(user => {
//     if (user) {
//       return {
//         statusCode: 200,
//         status: true,
//         message:"Account "+ acno +" Successfully deleted..!!!"
//       }
//     }
//     else {
//       return {
//         statusCode: 422,
//         status: false,
//         message: "Invalid Operation"
//       }
//     }
//   })
// }


module.exports = {
  register,
  login,
  addRem,
  getRems
}