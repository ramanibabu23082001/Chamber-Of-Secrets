const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const User= require("../models/user");
const userController = require("../Controller/userController");

router.post("/addUser/", function(req, res, next){
    res.locals.session = req.session;
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
    next()
},
userController.addUser);


router.get("/rules/", function(req, res, next){
    if (!req.session.email){
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        ); 
        res.redirect("/");
    }
    res.locals.session = req.session;
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
    next()
},
userController.rules);
router.get("/leader/", function(req, res, next){
    if (!req.session.email){
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        ); 
        res.redirect("/");
    }
    res.locals.session = req.session;
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
    next()
},
userController.leader);

router.get("/myrankee/", function(req, res, next){
    if (!req.session.email){
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        ); 
        res.redirect("/");
    }
    res.locals.session = req.session;
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
    next()
},
userController.myrankee);
router.get("/leaderthree/", function(req, res, next){
    if (!req.session.email){
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        ); 
        res.redirect("/");
    }
    res.locals.session = req.session;
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
    next()
},
userController.leaderthree);
router.get("/developer/", function(req, res, next){
    if (!req.session.email){
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        ); 
        res.redirect("/");
    }
    res.locals.session = req.session;
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
    next()
},
userController.develop);

router.post("/findtime/", function (req, res, next) {
    res.locals.session = req.session
   res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
    next()
 },
     userController.findtime
 );
 router.post("/findhint/", function (req, res, next) {
    res.locals.session = req.session    
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
    res.locals.num = req.body.num
    next()
 },
     userController.findhint
 );



router.get("/finish/", function(req, res, next){
    if (!req.session.email){
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        );
        res.redirect("/");
    }
    res.locals.session = req.session;
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
    next()
},
userController.finish);
router.get("/logged/", function (req, res, next) {

    if (!req.session.email){
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        ); 
    
        res.set({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        })
        res.redirect("/");
    }
    
    res.locals.session = req.session

    next()
},
    userController.loggedPage
);

router.post("/loginCheck/", function (req, res, next) {
    res.locals.session = req.session;
    res.locals.session.loginFail = 0;
    next();
},
    userController.loginCheck
);

router.get("/logout/", function (req, res, next) {
    req.session.email = null;
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    });
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    res.redirect("/");
});

router.get("/", function (req, res, next) {
 
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    });
    res.locals.session = req.session;
    next()
},
    userController.landingPage
);

router.post("/validateAnswer/", function (req, res, next) {
   if (!req.session.email){
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );  
    res.redirect("/");
    }
    res.locals.session = req.session
   res.locals.text = req.body.name
   next()
},
    userController.validateAnswer
);
router.post("/checkEmail/", function(req, res, next){
    
    res.locals.email = req.body.email
    next()
},
    userController.checkEmail
);

router.post("/logged/", function(req, res, next){
    if (!req.session.email){
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        ); 
        res.redirect("/");
    }
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );  
    res.redirect("/logged/");
});


router.get("/franchise/", function(req, res, next){
   
    if (!req.session.email){
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        ); 
        res.redirect("/");
    }
    res.locals.session = req.session;
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
    next();
},
    userController.franchise);


    
router.post("/franchise/", function(req,res,next){
   
    if(!req.session.email)
    {
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        ); 
        res.redirect("/");
    }  
    var players=req.body.play;
        var p1=players[0];
        var p2= players[1];
        var p3= players[2];
        var email= req.session.email;
        var k=0,franchise;
        var myquery = { email: email };
        var newvalues = { $set: {player1 : p1, player2 : p2, player3 : p3}};
        User.updateOne(myquery, newvalues, function(err, res){
            if(err) throw err;
        });
        res.locals.session = req.session;
        res.set({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        })
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        ); 
        res.redirect("/logged/");
});

router.post("/addFranchise/", function(req, res, next){
    if (!req.session.email){
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        ); 
        res.redirect("/");
    }

    res.locals.email = req.session.email;
    res.locals.franchise = req.body.franchise;
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
    next();
},
userController.addFranchise
);

router.post("/addPlayer/",function(req,res,next){
    if (!req.session.email){
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        );  
        res.redirect("/");
    }
    res.locals.email=req.session.email;
    res.locals.pla1=req.body.pl1;
    res.locals.pla2=req.body.pl2;
    res.locals.pla3=req.body.pl3;
    res.locals.session = req.session;
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
},userController.addPlayer);

module.exports = router;