/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

// GET

exports.emails = function (req, res) {

  var emailIds = [];
  pool.getConnection(function(err, connection){
    connection.query( "select * from emails",  function(err, rows){
      if(err) {
        throw err;
      }else{
        res.json({
          emails: rows
        });
        console.log(rows);
      }
      connection.release();
    });
  });
};

exports.templates = function (req, res) {
  var templates = [];
  pool.getConnection(function(err, connection){
    connection.query( "select * from templates",  function(err, rows){
      if(err) {
        throw err;
      }else{
        res.json({
          templates: rows
        });
      }
      connection.release();
    });
  });
};

exports.email = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.emails.length) {
    res.json({
      email: data.emails[id]
    });
  } else {
    res.json(false);
  }
};

// POST

exports.addEmail = function (req, res) {

  var query = "INSERT INTO ??(??, ??, ??, ??) VALUES (?, ?, ?, ?)",
      table = ["emails","fname","lname","comp","email",req.body.fname,req.body.lname,req.body.comp,req.body.email],
      query = mysql.format(query,table);

  pool.getConnection(function(err, connection){
    connection.query( query,  function(err, rows){
      if(err) {
        //throw err;
        console.log(err);
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      }else{
        console.log(rows);
        res.json({"Error" : false, "Message" : "User Added !"});
      }
      connection.release();
    });
  });  

};

exports.addTemplate = function (req, res) {

  var query = "INSERT INTO ??(??, ??) VALUES (?, ?)",
      table = ["templates","title","template",req.body.title,req.body.template],
      query = mysql.format(query,table);

  pool.getConnection(function(err, connection){
    connection.query( query,  function(err, rows){
      if(err) {
        //throw err;
        console.log(err);
        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      }else{
        console.log(rows);
        res.json({"Error" : false, "Message" : "User Added !"});
      }
      connection.release();
    });
  }); 

};

exports.sendEmail = function (req, res) {

  var emailsList = "'" + Object.keys(req.body.emails).join("','") + "'";
  var emailsToSend, template;
  var emailBody = '';

  pool.getConnection(function(err, connection){
    connection.query( "select * from emails where email in (" + emailsList + ")",  function(err, rows){
      if(err) {
        throw err;
      }else{
        emailsToSend = rows;

        connection.query( "select * from templates where slno = "+req.body.template+";",  function(err1, rows1){
          if(err) {
            throw err1;
          }else{
            template = rows1;
            connection.release();

            emailsToSend.forEach(function(element, index){
              emailBody = template[0].template.replace("{{email}}", element.email)
                                        .replace("{{fname}}", element.fname)
                                        .replace("{{lname}}", element.lname)
                                        .replace("{{company}}", element.comp);
              
              var mailOptions = {
                  from: 'Debjit Saha <' + transporter.transporter.options.auth.user + '>', // sender address
                  to: element.email, // list of receivers
                  subject: 'Hello ' + element.fname,
                  text: emailBody,
                  html: emailBody
              };

              // send mail with defined transport object
              transporter.sendMail(mailOptions, function(error, info){
                  if(error){
                      console.log(error);
                  }else{
                      console.log('Message sent: ' + info.response);
                  }
              });

            });
          }
          
        });

      }
    });
  });

  console.log(req.body);
  res.json({});

}

// PUT

exports.editEmail = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.emails.length) {
    data.emails[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};

// DELETE

exports.deleteEmail = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.emails.length) {
    data.emails.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};