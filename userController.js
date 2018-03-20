var con = require('./connection');
exports.getUserList = function (req, res) {
  var sql = "SELECT * FROM users";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.render('collection', { resultArray: result, title: "COLLECTOR LIST" });
  });
}

exports.getCollector = function (req, res) {
  // var id=req.body.id;
  console.log(req.params.id);
  var id = req.params.id;
  //var sql = "SELECT * FROM collections WHERE collector_id="+id;

  var sql = "SELECT * FROM collections INNER JOIN users ON collections.user_id = users.user_id WHERE collector_id=" + id;

    con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    var totalCollection=0;

  //NEED TO CHANGE THIS. 
  // REDUNDENT LOOP : STARTS
  // DID THIS JUST FOR TEST PURPOSE
  for(var i=0;i<result.length;i++){
    totalCollection=totalCollection+parseInt(result[i].amount);
  }
  console.log(totalCollection);
// REDUNDENT LOOP: ENDS
    res.render('collector_history', { 
      resultArray: result, 
      title: "History", 
      totalAmount:totalCollection,this_collector_id:id 
    });
  });
}

exports.addNewCollector = function (req, res) {
    console.log("opening add new page");
    var newName=req.body.name;
    var newPhone=req.body.phone;
    var newArea=req.body.area;

    var sql = "INSERT INTO collectors (id, name, phone , area, last_collection, status) VALUES ('NULL','"+newName+"','"+newPhone+"','"+newArea+"','not assigned','active ')";

    con.query(sql, function (err, result) {
      if (err) throw err;
      res.render('control_panel', { resultArray: result, title: "COLLECTOR LIST" });
    });
}

exports.singleCollectorStatus = function (req, res) {
  console.log(req.params.id);
  var colID=req.params.id;
  var sql = "SELECT * FROM collectors WHERE id="+colID;

  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render('collector_changeStatus', { resColl: result[0], title: "COLLECTOR DETAILS" });
  });
}

exports.updateCollectorInfo = function (req, res) {
  console.log("updating the collector");
  var idid=req.body.theid;
  var newArea=req.body.thearea;
  var newStatus=req.body.thestatus;

  console.log(idid);
  console.log(newArea);
  console.log(newStatus);
  // "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
  var sql = "UPDATE collectors SET area='"+newArea+"',status='"+newStatus+"' WHERE id='"+idid+"'";
  // UPDATE collectors SET area='bdt',status='status' WHERE id=1
  con.query(sql, function (err, result) {
    if (err) throw err;
    var sql2 = "SELECT * FROM collectors";
  con.query(sql2, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.render('collector_list', { resultArray: result, title: "COLLECTOR LIST" });
  });
  });
}

// exports.getCollectors = function (req, res) {
//   var sql = "SELECT * FROM collectors";

//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//     res.render('control_panel', { resultArray: result, title: "COLLECTOR LIST" });
//   });
// }

// WARNING !!!!!!!!!!!!!!
// I DIDNT CLOSE THE CONNECTION
