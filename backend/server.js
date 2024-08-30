//create express app

const exp=require('express');
const app=exp()
require('dotenv').config()//procees.env.PORT protect purpose
//connect the database
const mongoClient=require('mongodb').MongoClient;
const path=require('path')

//deploy react build in this server
app.use(exp.static(path.join(__dirname,'../client/clientapp/build')))


//to parse the body of req
app.use(exp.json())

//connect to databse
mongoClient.connect(process.env.DB_url)
.then(
    client=>{
        //get db  obj
        const blogdb=client.db('blogdb')
        //get collection obj
        const usercollection=blogdb.collection('usercollection')
        const articlecollection=blogdb.collection('articlecollection')
        const authorscollection=blogdb.collection('authorscollection')
        //share collection obj with express app
        app.set('usercollection',usercollection)
        app.set('articlecollection',articlecollection)
        app.set('authorscollection',authorscollection)

        //confire db connection status
        console.log("DB connection success")
    }
)
.catch(err=>console.log("Error in DB connection ",err))


//import API routes
const userApp=require('./APIs/user-api1');
const authorApp=require('./APIs/author-api');
const adminApp=require('./APIs/admin-api');

//if path starts with user-api send req to userapp
app.use('/user-api1',userApp)
//if path starts with user-api send req to userapp
app.use('/author-api',authorApp)
//if path starts with user-api send req to userapp
app.use('/admin-api',adminApp)

// if we refresh the page there is no error shown for the blog app it stays in the smae page after reloading also
//deals with page refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/clientapp/build/index.html'))
})

//error handler must always below of refresh page handler
//express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err})
})



//assign port number
const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Web server on port ${port}`))