var con=  require('./connection');
exports.doLogin = function(req,res){
    console.log('ssolala');
    // console.log(con);
    var email=req.body.email;
    var pass=req.body.password;
    var sql = "SELECT * FROM admin WHERE email='"+email+"'";
    con.query(sql, function(err,result){
            if(err) throw err;
            console.log(result);
            if(result.length>0 && result[0].password==pass){
                console.log("LOGGED IN"); 
                res.render('index', { title: 'Congratulations !! : Welcome' }); 
            }else{
                console.log("Wrong Credentials")
                res.render('login', { title: 'Failed : Try Again' });
            }
        });
}

// WARNING !!!!!!!!!!!!!!
// I DIDNT CLOSE THE CONNECTION
 