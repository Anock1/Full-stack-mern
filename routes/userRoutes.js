const router = require('express').Router();
const {protectRoute} = require('../auth/protect');
const{registerView,loginView,registerUser,loginUser,logOut}= require('../controllers/userController');
const{dashboardView}=require('../controllers/dashboardController')

router.get('/register',registerView);
router.get('/',loginView);
router.post("/register", registerUser);
router.get("/dashboard", protectRoute, dashboardView);
router.post("/login", loginUser);
router.get('/logout',logOut);


module.exports=router;
