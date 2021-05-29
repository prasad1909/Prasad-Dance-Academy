const express=require("express");
const path=require("path");
const port=3000;
const app=express();
const mongoose = require('mongoose');
const bodyparser=require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    desc: String
  });

  var Contact = mongoose.model('Contact', ContactSchema);

app.use('/static',express.static('static'));
app.use(express.urlencoded());


app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.render('index.pug');
})

app.get('/contacts',(req,res)=>{
    res.render('contacts.pug');
})

app.post('/contacts',(req,res)=>{
    var myData=new Contact(req.body);
    console.log(myData);
    myData.save().then(()=>{
        res.send("item saved to db");
    }).catch(()=>{
        res.status(400).send("error");
    })
    //res.render('contacts.pug');
})

app.listen(port,()=>{
    console.log(`started at ${port}`);
})


