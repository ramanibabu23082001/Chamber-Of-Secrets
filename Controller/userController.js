const User = require("../models/user");
const bcrypt = require('bcryptjs');
const nodemailer  = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth : {
            api_key :'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'//this api key from sendgrip website login and get api from it you can use any website  

    }
}));
const ITEMS_PER_PAGE = 5;

exports.addUserForm = (req, res, next) => {
    res.render('addUserForm', {
        //csrfToken: res.locals.csrfToken
    });
};
//from
exports.addUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const contact = req.body.contact;
    const college = req.body.college;
   bcrypt   .hash(password, 12)
              .then(hashedPassword => {//hashed password from bcrpt because we give a promise
                const user = new User({
                    name: name, email: email, password: hashedPassword, contact: contact, college: college ,created_at:Date.now() 
                });
                return user.save();
              })
              .then(result => {
                res.locals.session.email = email,
                console.log("User created successfully!"),
                res.render("franchiseSelector");
               return transporter.sendMail({
                   to: email,
                   from: 'itrix@chamber_of_secrets.com',
                   subject: 'Signup succeeded!',
                   html: '<h1>You successfully signed up!</h1>'
                 });
              })
              .catch(err => {
                console.log(err); 
              });
   
    
};
//to
exports.loginForm = (req, res, next) => {
    if(res.locals.session.email)
        res.redirect("/logged/");
    res.render("loginForm", {
        message: ""
        //csrfToken: res.locals.csrfToken
    });
};
//from
exports.finish = (req, res, next) => {
    res.render('finish');
};
//to
//from
exports.loginCheck = (req, res, next) => {
      //var credentials = {email: req.body.email, password: req.body.password};
      const email=req.body.email
      const password= req.body.password;
        //console.log("Login fail before is " + res.locals.loginFail);
        User.findOne({email:email})
        .then(user => {
            bcrypt
            .compare(password,user.password)
            .then(doMatch=>{
                if(doMatch){
                    res.locals.session.loginFail = 0;
                    res.locals.session.email = req.body.email;
                    res.redirect("/logged/");
                }
                else{
                    res.locals.session.loginFail = 1;
                    res.redirect("/");
                }
            })
            .catch(err=>
                {
               console.log('err');
               res.redirect('/');
                });
            })
            //console.log(user);
        .catch(err => {
            console.log(err);
        });
};
//to
exports.loggedPage = (req, res, next) => {
    User.find({email: res.locals.session.email})
    .then(user => {
        const jsonFile = require("../JSON/question.json");
        //console.log("Welcome " + user);
        const q = jsonFile[user[0].level - 1];
        console.log(q);
//from 
       if(user[0].level==11)
        {
            console.log('asdf');
             res.redirect('/finish');
        }
        else
        {
            res.render("logged", {         
                loggedUser: user,
                level: user[0].level,
                question: q
            });
        
        }
        //to
    })
    .catch(err => {
        console.log(err);
    });
};

exports.landingPage = (req, res, next) => {
    console.log("Login fail value is " + res.locals.session.loginFail);
    var login_error = "";
    if(res.locals.session.loginFail === 1){
        login_error = "Incorrect username/password";
    }
    res.render("landingPage", {
        //csrfToken: res.locals.csrfToken
        loginFail: res.locals.session.loginFail,
        login_error: login_error
    });
    res.locals.session.loginFail = 0;
}
//from
exports.findhint = (req, res, next) => {

    User.findOne({email: res.locals.session.email})
    .then(user => {
        console.log("your level is " + user.level);
        var i = user.level - 1;    
        const jsonParsed = require("../JSON/hint.json");
        //console.log("the time is " + jsonParsed[i].ht1 + jsonParsed[i].ht2 +jsonParsed[i].ht3);
        console.log(jsonParsed[i]);
        res.json({hint1: jsonParsed[i].hint1, hint2: jsonParsed[i].hint2, hint3: jsonParsed[i].hint3,ht1:jsonParsed[i].ht1,ht2:jsonParsed[i].ht2,ht3:jsonParsed[i].ht3 });
                
         });

        }
        
exports.validateAnswer = (req, res, next) =>
{
    console.log("Your email is " + res.locals.session.email);
    User.findOne({email: res.locals.session.email})
    .then(user => {
        console.log("your level is " + user.level);
        const tex = res.locals.text;
        const jsonParsed = require("../JSON/question.json");
        console.log("The answer is " + jsonParsed[user.level-1].answer);
        if (jsonParsed[user.level-1].answer === tex) {
            console.log('correct'); 
            const jspl=require("../JSON/player.json");
            var num;
            var random =  Math.floor((Math.random() * 4) + 0);
            switch(user.franchise)
            {
                case "kkr" :num=0;break;
                case "rcb" :num=1;break;
                case "csk" :num=2;break;
                case "srh" :num=3;break;
                case "mi" :num=4;break;
            }
            while(random==num)
            {
                random =  Math.floor((Math.random() * 4) + 0)
            }
    
            var gifPath;
            for(k=0;k<5;k++)
                if(jspl[k].team === user.franchise)
                    break;
                console.log(k);
                    if(user.level === 1||user.level === 4||user.level === 7)
                        gifPath=jspl[k].gif[user.player1];
                    else if(user.level === 2||user.level === 5||user.level === 8)
                        gifPath=jspl[k].gif[user.player2];
                    else if(user.level === 3||user.level === 6||user.level === 9)
                        gifPath=jspl[k].gif[user.player3];      
                        console.log(gifPath);  
            //form
            if(user.level==10)
            {
                res.json({ data: "1",number: jsonParsed[user.level-1].number,redirect:jsonParsed[user.level-1].redirect });
                var myquery = { email: res.locals.session.email };
                var newvalues = { $set: {level: user.level+1 } };
                User.updateOne(myquery, newvalues, function(err, res){
                    if(err) throw err;
                    console.log("Level updated");
                });
            }
            else if((user.level-1)!=9)
            {
                console.log("not 10");
                res.json({ data: "1", path: jsonParsed[user.level].question,level :user.level+1, number:user.level+1,  gif:gifPath, oppTeam : jspl[random] , curTeam : jspl[num] }); 

                var myquery = { email: res.locals.session.email};
                var newvalues = { $set: {level: user.level+1,updated_at:Date.now() } };
                User.updateOne(myquery, newvalues, function(err, res){
                    if(err) throw err;
                    console.log("Level updated");
                });
            }
            }
            else {
                console.log(jsonParsed[user.level-1].gif);
                res.json({ data: "0" });
            }  //to
    });
    
   
}

exports.checkEmail = (req, res, next) => {
    User.findOne({email: res.locals.email})
    .then(user => {
        console.log("The user with email is " + user);
        if(user != null){
            res.json({message: "Email already exists"});
        }
        else{
            res.json({message: ""});
        }
    });
}
exports.leaderthree=(req,res,next)=>
{
    console.log('leadera');
    User.find().sort([["level","descending"],["updated_at","ascending"]]).limit(3)
    .then(user=>
        {
            console.log(user);
            
            res.json({onename:user[0].name,onelevel:user[0].level,oneteam:user[0].franchise, twoname:user[1].name,twolevel:user[1].level,twoteam:user[1].franchise,threename:user[2].name,threelevel:user[2].level,threeteam:user[2].franchise });
          
        })
     .catch(err=>
        {
       console.log(err);
        });   
}
exports.myrank=(req,res,next)=>
{
    console.log('myrank');
    User.findOne({email: res.locals.session.email})
    .then(user=>
        {
            console.log(user);
            res.json({name:user.name,level:user.level,team:user.franchise });
        })
     .catch(err=>
        {
       console.log(err);
        });   
}
exports.leader =(req,res,next)=>
{
  var email= res.locals.session.email 
     const page = +req.query.page || 1;
     let totalItems;``
     User.find().countDocuments()
     .then(numProducts => {
        totalItems = numProducts;
        return User.find()
        .skip((page - 1) * ITEMS_PER_PAGE)//page- 1 = previous page number
        .limit(ITEMS_PER_PAGE).sort([["level","descending"],["updated_at","ascending"]]);
      })
      .then(users => {
        res.render('leader', {
          prods: users,
          pagetitle: 'leaderboard',
          mail:email,
          currentPage: page,
          hasNextPage: ITEMS_PER_PAGE * page < totalItems,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
    // User.find().sort([["level","descending"],["updated_at","descending"]]).limit(3)
    // .then(user=>
    //     {

    //         console.log(user);
    //      res.render("leader",{
    //       pagetitle : "leaderboard",
    //       one: user[0],
    //       two:user[1],
    //  three:user[2],
    //     //   four: user[3]
    //     //   five:user[4],
    //     //   six:user[5],
    //     //   seven: user[6],
    //     //   eightwo:user[7],
    //     //   nine:user[8],
    //     //   ten:user[9],
    //      });
    //     })
    //  .catch(err=>
    //     {
    //    console.log(err);
    //     });   
    
}
exports.develop =(req,res,next)=>
{
    res.render("developer");
}

exports.addPlayer= (req,res,next)=>{
    console.log("what");
    console.log(res.locals.pla1);
}

exports.addFranchise= (req,res,next)=>{
    const tex = res.locals.franchise;
        console.log(res.locals.email);
     var myquery = { email: res.locals.email };
                var newvalues = { $set: {franchise: tex} };
                User.updateOne(myquery, newvalues, function(err, res){
                    if(err) throw err;
                });
                     User.findOne({email: res.locals.email})
        .then(user => {
                console.log(user.franchise);
            })
            var i=0;
        const jsonParsed = require("../JSON/player.json");
        //console.log("The answer is " + jsonParsed[i].answer);
        for(i=0;i<5;i++)
        if (jsonParsed[i].team === tex) {
                res.json({ data: "1",team: jsonParsed[i].team_name,pla_name: jsonParsed[i].pla_name,pla_photo:jsonParsed[i].pla_photo});
            }
         
}

exports.franchise = (req, res, next) => {
    // const fs = require("fs");
    // const jsonData = require("../JSON/franchises.json");
    // var i = 0;
    // for(i = 0; i < jsonData.length; i++){
    //     if(jsonData[i].email === res.locals.session.email){
    //         break;
    //     }
    // }
    // console.log("I value is "+ i);
    // console.log("JSON length is " + jsonData.length);
    res.render("franchiseSelector");
}