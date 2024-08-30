//create user api app
const exp=require('express');
const userApp=exp.Router();
const bcryptjs=require('bcryptjs')
// to handle the errors from post
const expressAsyncHandler=require("express-async-handler")
//to encode the password from hashed to orginal
const jwt=require("jsonwebtoken");
const verifyToken = require('../Middlewares/verifyToken');
//dot env
require("dotenv").config()

let usercollection;
let articlecollection;
//get user collection app
userApp.use((req,res,next)=>{
    usercollection=req.app.get('usercollection')
    articlecollection=req.app.get('articlecollection')
    next()
})

//user registration form

userApp.post('/user',expressAsyncHandler(
    async(req,res)=>{
        //get user resource from client
        const newUser=req.body;
        //check for duplicate user based on username
        const dbuser=await usercollection.findOne({username:newUser.username})
        //if user found in db
        if (dbuser!=null){
            res.send({message:"User existed"})
        }else{
            //hash the password
            const hashedPassword=await bcryptjs.hash(newUser.password,6)
            //replace plain pw with hashed pw
            newUser.password=hashedPassword;
            //create user
            await usercollection.insertOne(newUser)
            //send res
            res.send({message:"User created"})
        }
    
    }
))

//user login
userApp.post('/login',expressAsyncHandler((async(req,res)=>{
    //get credientials obj from client
    const userCard=req.body;
    //check for username
    const dbuser=await usercollection.findOne({username:userCard.username})
    if(dbuser==null){
        res.send({message:"Invalid username"})
    }else{
        //check for password
        const status=await bcryptjs.compare(userCard.password,dbuser.password)
        if(status==false){
            res.send({message:"Invalid Password"})
    
        }else{
            //create jwt token and encode it
                const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
            //send res
            res.send({message:"login success",token:signedToken,user:dbuser})

        }
    }
})))

//get articles of all users
userApp.get('/articles',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get articlescollection
    const articlecollection=req.app.get('articlecollection')
    //get all articles
    let articleList=await articlecollection.find({status:true}).toArray()
    //send res
    res.send({message:"articles",payload:articleList})

}))

//post comments for an  article by article ID
userApp.post("/comment/:articleId",verifyToken,expressAsyncHandler(async(req,res)=>{
    //get user comment obj
    const userComment=req.body;
    const articleIdFromURL=(+req.params.articleId);
    //insert userComment object to comments array of article by Id
    let result=await articlecollection.updateOne({articleId:articleIdFromURL},{$addToSet:{comments:userComment}})
    
    console.log(result)
    res.send({message:"Comment posted"})

}))


//export userApp
module.exports=userApp;
