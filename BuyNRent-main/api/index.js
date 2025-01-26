const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');

const mongoose = require('mongoose');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');

const multer = require('multer');
const fs = require('fs');
const { resolve } = require("path");
const { rejects } = require("assert");

require('dotenv').config();
const app = express();


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "vsagfddvsdfj_ofaed_bvfgsbSAFD";

app.use(express.json());
app.use(cookieParser());
// to access uploads folder on browser so the we can add photos through link in accomodation
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(cors({
credentials: true,
origin:'http://localhost:5173',
}))
mongoose.connect(process.env.MONGO_URL);
function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
      jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      });
    });
  }


app.get('/test',(req,res)=>{
    res.json('test ok');
});

app.post('/register',async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt)
        });
         res.json({name,email,password});
    }catch(e)
    {
        res.status(422).json(e);
    }
   
});

app.post('/login',async (req,res)=>{

    const {email,password} = req.body;
        const userDoc = await User.findOne({email});
        if(userDoc)
        {  const passOk = bcrypt.compareSync(password,userDoc.password);
            if(passOk)
            {  jwt.sign({email:userDoc.email,id:userDoc._id},jwtSecret,{},(err,token)=>{
                if(err)
                throw err;
                res.cookie('token',token).json(userDoc);

            })
            
        }
           else
           console.log("Not pass");
        }
        else{
            console.log("Not Found");
        }
});
app.get('/profile',(req,res)=>{
//     to get user id
    const {token} = req.cookies;
    if(token)
    {
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            if(err)
            throw err;
            const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
        })
    }else
    res.json(null);
});

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
});

app.post('/upload-by-link',async (req,res)=>{
    const {link} = req.body;
    const newName ='photo'+ Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname+'/uploads/'+newName,
    });
    res.json(newName);
});

// for uploading img from system
const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
    const uploadFiles =[];
    for(let i = 0;i<req.files.length;i++)
    {
        // providing proper extension for img 
       const {path,originalname} = req.files[i];
       const parts = originalname.split('.');
       const ext = parts[parts.length-1];
       const newPath = path +'.'+ext;
       fs.renameSync(path,newPath);
       uploadFiles.push(newPath.replace("uploads\\",''));
    }
res.json(uploadFiles);
});

//  to add places.
app.post('/places',(req,res)=>{
//     to get user id
    const {token} = req.cookies;
    const {
        title , address ,addPhotos ,description ,perks,
        extraInfo,checkIn,checkOut,maxGuest,price
      } = req.body;
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            if(err)
            throw err;
          const placeDoc = await Place.create({
            owner : userData.id,
            title , address ,photos:addPhotos ,description ,perks,
        extraInfo,checkIn,checkOut,maxGuest,price
            });
            res.json(placeDoc);
        });
    
});

//  to display places on places plage

app.get('/user-places',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        if(err)
        throw err;
     const {id} = userData;
     res.json(await Place.find({owner:id}));
    });

});

app.get('/places/:id',async (req,res)=>{
//  to grab id use params
const {id} = req.params;
res.json(await Place.findById(id));

});

// to update existing places
app.put('/places',async (req,res)=>{
    const {token} = req.cookies;
    const {
       id, title , address ,addPhotos ,description ,perks,
        extraInfo,checkIn,checkOut,maxGuest,price
      } = req.body;
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            if(err)
            throw err;
          const placeDoc = await Place.findById(id);
          if(userData.id===placeDoc.owner.toString())
          {
            placeDoc.set({
                title , address ,photos:addPhotos ,description ,perks,
            extraInfo,checkIn,checkOut,maxGuest,price
            });
            placeDoc.save();
            res.json('ok');
          }
});
});

app.get('/places',async (req,res)=>{
    res.json(await Place.find());
});

app.post('/bookings',async (req,res)=>{
    const userData = await getUserDataFromReq(req);
    const 
  {price,name,phone,checkIn,checkOut,place,numberOfGuest}=req.body;
   Booking.create({
    price,name,phone,checkIn,checkOut,place,numberOfGuest,user:userData.id}).then((doc)=>{
      res.json(doc);
    }).catch(err=>{
        throw err;
    });
    
});


app.get('/bookings',async (req,res)=>{
    const userData = await getUserDataFromReq(req); 
    // place will no longer be id rather than it will become an object which hold info about particular place
    res.json(await Booking.find({user:userData.id}).populate('place'));
});

app.listen(4000);