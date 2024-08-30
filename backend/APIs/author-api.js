//create author api app
const exp=require('express');
const authorApp=exp.Router();
const bcryptjs=require('bcryptjs')
// to handle the errors from post
const expressAsyncHandler=require("express-async-handler")
//to encode the password from hashed to orginal
const jwt=require("jsonwebtoken")
const verifyToken=require("../Middlewares/verifyToken")


let authorscollection;
let articlecollection;
//get author collection app
authorApp.use((req,res,next)=>{
    authorscollection=req.app.get('authorscollection')
    articlecollection=req.app.get('articlecollection')
    next()
})

//author registration route
authorApp.post('/author',expressAsyncHandler(
    async(req,res)=>{
        //get user resource from client
        const newUser=req.body;
        //check for duplicate user based on username
        const dbuser=await authorscollection.findOne({username:newUser.username})
        //if user found in db
        if (dbuser!=null){
            res.send({message:"author existed"})
        }else{
            //hash the password
            const hashedPassword=await bcryptjs.hash(newUser.password,6)
            //replace plain pw with hashed pw
            newUser.password=hashedPassword;
            //create user
            await authorscollection.insertOne(newUser)
            //send res
            res.send({message:"Author created"})
        }
    
    }
))

//author login
authorApp.post('/login',expressAsyncHandler((async(req,res)=>{
    //get credientials obj from client
    const userCard=req.body;
    //check for username
    const dbuser=await authorscollection.findOne({username:userCard.username})
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

//adding new article  by author
authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get new article from client
    const newArticle=req.body;
    //post to article collection
    await articlecollection.insertOne(newArticle)
    //send res
    res.send({message:"New article created"})
    
}))

//modify the article by author
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get modified article from client
    const modifiedArticle=req.body;
    //update by article id
    let result=await articlecollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    let latestArticle=await articlecollection.findOne({articleId:modifiedArticle.articleId})
    res.send({message:"Article modified",article:latestArticle})
}))

//delete a article by article ID
authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get aarticleId from url
    const articleIdFromUrl=(+req.params.articleId);
    //get article
    const articleToDelete=req.body;

    if(articleToDelete.status===true){
        let modifiedArt=await articlecollection.findOneAndUpdate({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
        res.send({message:"article deleted",payload:modifiedArt.status})
    }
    if(articleToDelete.status===false){
        let modifiedArt=await articlecollection.findOneAndUpdate({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
        res.send({message:"article restored",payload:modifiedArt.status})
    }
}))


//read articles of author 
authorApp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get author's username from url
    const authorName=req.params.username;
    //get articles whose status is true
    const articleList=await articlecollection.find({username:authorName}).toArray()
    res.send({message:"List of articles",payload:articleList})
}))

//export authorApp
module.exports=authorApp;
