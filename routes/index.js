var express = require('express');
var router = express.Router();

var mysql = require('mysql');

/* GET home page. */
var connection = mysql.createConnection({
  host  : 'localhost',
  user  : 'root',
  password : '',
  database : 'tbl_admin'
});
connection.connect(function(err){
if(!err) {
  console.log("Database is ON");

}else {
  console.log("Error Attack on your Work");

}
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/admintable', function(req, res, next) {
  res.render('admintable');
});

router.post('/admintable', function(req, res){
console.log(req.body);
const mybodydata = {
  admin_id: req.body.admin_id,
  admin_name: req.body.admin_name,
  admin_email: req.body.admin_email,
  admin_password: req.body.admin_password,
}
connection.query("insert into tableadmin set ?",mybodydata,function(err,result) {
  if(err) throw err;
res.redirect('/admintable');
});
});
 
router.get('/display',function(req,res,next) {
connection.query("select * from tableadmin",function(err,db_rows){
  if(err) throw err;
  console.log(db_rows);
  res.render('display-table',{db_rows_array:db_rows});
});

router.get('/delete/:id',function(req, res) {
var deleteid= req.params.id;
console.log("Delete id is " + deleteid);
connection.query("delete from tableadmin  where admin_id = ? ",[deleteid],function(err,db_rows){
  if(err) throw err;
  console.log(db_rows);
  console.log("Record Deleted");
  res.redirect('/display');
})
});

router.get('/show/:id',function(req, res){
var showid =req.params.id;
console.log("show id is " + showid);
connection.query("select * from tableadmin where admin_id = ? ",[showid],function (err,db_rows){
  {
    console.log(db_rows);
    if(err) throw err;
    res.render("show",{db_rows_array:db_rows});
  }
})
});

router.get('/edit/:id',function(req, res){
console.log("Edit id is : " + req.params.id);
var admin_id = req.params.id;
connection.query("select * from tableadmin where admin_id = ?",[admin_id],function(err,db_rows){
  {
    if(err) throw err;
    console.log(db_rows);
    res.render("edit-form",{db_rows_array:db_rows});
  }
})
});

router.post('/edit/:id',function(req, res){
console.log("Edit ID is"+ req.params.id);
var adminid = req.params.id;

var adminname = req.body.admin_name;
var adminemail = req.body.admin_email;
var adminpassword = req.body.admin_password;
connection.query("update tableadmin set admin_name= ? , admin_email = ? , admin_password = ? where admin_id = ?",
[adminname,adminemail,adminpassword,adminid],function(err,respond){
  if(err) throw err;
  res.redirect('/display');
    });
});



});  
module.exports = router;
