const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');


// post request
const registerUser =(req,res)=>{
    const {name,email,password,confirm} = req.body;
    console.log(password,confirm);
    if (!name || !email || !password || !confirm) {
        console.log('Fill empty fields');
    }
    // password confirmation
    if (password !==confirm) {
        console.log("password must match");
        
    } else{
        User.findOne({email:email})
        .then((user)=>{
            if (user) {
                console.log("email exists");
                res.render('register',{
                name,
                email,
                password,
                confirm
                });
            } else{
                const newUser = new User({
                name,
                email,
                password,
                });
                // hashing
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser
                        .save()
                        .then(res.redirect('/'))
                        .catch((err)=>console.log(err));
                        
                    })

                })
            }
        })
    }

}



// register view
const registerView =(req,res)=>{
res.render("register")
}

//logout
const logOut =(req,res)=>{
res.render('login')
}

// login view
const loginView =(req,res)=>{
    res.render("login")
    }

// post request for login
const loginUser = (req,res)=>{
const {email,password}=req.body;
//required
if (!email||!password) {
    console.log('Please fill all the fields');
    res.render('login',{
        email,
        password
    });
} else{
    passport.authenticate('local',{
        successRedirect:"/dashboard",
        failureRedirect:"/login",
        failureFlash:true
    })(req,res);
}
}

//logout

const logoutView =(req,res)=>{
res.render('/register')
}


    module.exports =  {
        registerView,
        loginView,
        registerUser,
        loginUser,
        logOut
       
    
    };
