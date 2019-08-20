const Express =require('express'); //express 
var app= new Express();

const Mongoose=require('mongoose'); //mongoose


var request =require('request'); //request 

var bodyParser=require('body-parser'); //bodyparser

app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


 const StudentModel=Mongoose.model("Employ",
{
    e:String,
    d:String,
    s:String
 });

Mongoose.connect("mongodb://localhost:27017/employdb");//mongoose connection.

app.get('/',(rq,rs)=>{
    rs.render('emp',{title:"Employee details"});
});

 app.post('/read',(rq,rs)=>{
     //var x=rq.body
    //rs.render('read',{info:x,title:'values'});
    console.log(rq.body);
     var student= new StudentModel(rq.body);
     var result=student.save((error,data)=>{
         if (error)
         {
            throw error;
             rs.send(error);
        
         }
        else
         {
            rs.send("user created"+data);
        }
     });

    student.save();
 });
app.get('/emp',(rq,rs)=>{
     rs.render('emp',{title:'Employ info'});
 });

 app.get('/getdatas',(rq,rs)=>{
    result=StudentModel.find((error,data)=>{  //api 
         if (error){
             throw error;
         }
        else{
            rs.send(data);
         }
    });
    
 });

 const APIurl="http://localhost:5005/getdatas";         //api 


 app.get('/viewemp',(rq,rs)=>{            //api ne call cheythu
    request(APIurl,(error,response,body)=>{
       var data=JSON.parse(body);
                                                  
    
       rs.render('view',{data:data}); //display cheyyunath view il aanu, data enna variable add cheythu
   });
 });


app.listen(process.env.PORT||5005,()=>{
    console.log("server running on 5005");
});
