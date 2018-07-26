var express = require('express');
var path = require('path');
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var nodeMailer = require('nodemailer');


var app = express();
//enter the name of the database in the end
var new_db = "mongodb://localhost:27017/webtios";

app.set('view engine' , 'ejs');
app.use('/webtios', express.static('webtios'));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));
app.get('/', function(req,res){
  res.render('index');
});
app.get('/about', function(req, res){
  res.render('about');
});
app.get('/career', function(req, res){
  res.render('career');
});
app.get('/contact', function(req,res){
  res.render('contact');
});
app.get('/package', function(req, res){
  res.render('package');
});
app.get('/product', function(req, res){
  res.render('product');
});
app.get('/quote', function(req,res){
  res.render('quote');
});
app.get('/service', function(req,res){
  res.render('service');
});
app.get('/terms', function(req,res){
  res.render('terms');
});
app.get('/privacy', function(req,res){
  res.render('privacy');
});


// Sign-up function starts here. . .
app.post('/sign_up' ,function(req,res){
	var fname = req.body.first_name;
	var lname = req.body.last_name;
	var phone= req.body.phone;
	var email = req.body.email;
	var type = req.body.type;
		var rtype = req.body.rtype;
	var date = req.body.date;
	var time = req.body.time;


	var data = {
		"First Name":fname,
		"Last Name":lname,
		"phone":phone,
		"email":email,
		"Website type":type,
		"Reference Site":rtype,
		"Date": date,
		"Time" : time,

		Email : function() {
			return this.email;
	 }
	}

	mongo.connect(new_db , function(error , db){
		if (error){
			throw error;
		}
		console.log("connected to database successfully");
		//CREATING A COLLECTION IN MONGODB USING NODE.JS
		db.collection("webtios").insertOne(data, (err , collection) => {
			if(err) throw err;
			console.log("Record inserted successfully");
			console.log(collection);
		});
	});

	console.log("DATA is " + JSON.stringify(data) );
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	let transporter = nodeMailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
					user: 'webtioshost@gmail.com',
					pass: 'Pro_231678'
			}
	});
	var mailoutput = "<html>\n\
											 <body>\n\
											 <table>\n\
											 <tr>\n\
											 <td>First Name: </td>" + req.body.first_name + "<td></td>\n\
											 </tr>\n\
											 <tr>\n\
											 <td>Last Name: </td>" + req.body.last_name + "<td></td>\n\
											 </tr>\n\
											 <tr>\n\
											 <td>Phone: </td>" + req.body.phone + "<td></td>\n\
											 </tr>\n\
											 <tr>\n\
											 <td>Email: </td><td>" + req.body.email + "</td>\n\
											 </tr>\n\
											 <tr>\n\
											 <td>Website Type </td>" + req.body.type + "<td></td>\n\
											 </tr>\n\
											 <tr>\n\
											 <td>Referense Website: </td>" + req.body.rtype + "<td></td>\n\
											 </tr>\n\
											 <tr>\n\
											 <td>Date: </td>" + req.body.date + "<td></td>\n\
											 </tr>\n\
											 <tr>\n\
											 <td>Time: </td>" + req.body.time + "<td></td>\n\
											 </tr>\n\
											 <tr>\n\
											 <td><h1><b><u>Thanqyou for quote us.</u></b></h1><h3>As per your details we will contact you within two business day.<h3></td>\n\
											 </tr>\n\
											 </table> </body></html>";
	let mailOptions = {
			from: '"Webtios" <webtioshost@gmail.com>', // sender address
			to: req.body.email, // list of receivers
			subject: "Webtios Enquiry", // Subject line
			text: req.body.phone, // plain text body
			html: mailoutput // html body
	};

	transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
					return console.log(error);
			}
			console.log('Message %s sent: %s', info.messageId, info.response);
			});
return res.redirect('/');
});

app.post('/Submit' ,function(req,res){
	var name = req.body.user_name;
	var email= req.body.user_email;
	var phone = req.body.user_phone;
	var msg = req.body.user_bio;


	var data = {
		"name":name,
		"email":email,
		"phone" : phone,
		"msg": msg,

		Email : function() {
			return this.email;
	 }
	}

	mongo.connect(new_db , function(error , db){
		if (error){
			throw error;
		}
		console.log("connected to database successfully");
		//CREATING A COLLECTION IN MONGODB USING NODE.JS
		db.collection("contact").insertOne(data, (err , collection) => {
			if(err) throw err;
			console.log("Record inserted successfully");
			console.log(collection);
		});
	});

	console.log("DATA is " + JSON.stringify(data) );
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	let transporter = nodeMailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
					user: 'webtioshost@gmail.com',
					pass: 'Pro_231678'
			}
	});
	var mailoutput = "<html>\n\
											 <body>\n\
											 <table>\n\
											 <tr>\n\
											 <td>Name: </td>" + req.body.user_name + "<td></td>\n\
											 </tr>\n\
											 <tr>\n\
											 <td>Email: </td><td>" + req.body.user_email + "</td>\n\
											 </tr>\n\
											 <tr>\n\
											 <td>Phone: </td>" + req.body.user_phone + "<td></td>\n\
											 </tr>\n\
											 <tr>\n\
											 <td>Messge: </td>" + req.body.user_bio + "<td></td>\n\
											 </tr>\n\
											 <tr>\n\
											 <td><h1><b><u>Thanqyou to contact us.</u></b></h1><h3>As per your details we will contact you within two business day.<h3></td>\n\
											 </tr>\n\
											 </table></body></html>";
	let mailOptions = {
			from: '"Webtios" <webtioshost@gmail.com>', // sender address
			to: req.body.user_email, // list of receivers
			subject: "Webtios Enquiry", // Subject line
			text: req.body.phone, // plain text body
			html: mailoutput // html body
	};

	transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
					return console.log(error);
			}
			console.log('Message %s sent: %s', info.messageId, info.response);
			});
return res.redirect('/');
});

app.listen(3333);
console.log("Server listening at : 3333");
