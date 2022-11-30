const express = require('express');
const bodyParser = require("body-parser");
const mysql2 = require('mysql2');
const bcrypt = require('bcryptjs');

const connection = mysql2.createConnection({
    host      : 'localhost',
    user      : 'forge',
    // password  : 'zjtf2be42LHMwko5HGbz',
    password: 'password', // local end
    database  : 'atc',
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL");
})



const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

// login/logout
app.post('/login', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            message: "Missing Email or Password",
            status: 400,
        })
    } else {
        let dbHash;
        let userIsAdmin = 'false';
        const admins = ['Austin Smith', 'Will Smith', 'Abbas Shaban', 'Richard Spaulding', 'Todd Bradley', 'Clifford Beam', 'Clinton Pomeroy'];

        // execute login query
        connection.query(`SELECT name, password FROM users WHERE email = '${email}'`, async function(error, results, fields) {
            if (error) throw error;

            user = results[0].name;
            dbHash = results[0].password;
            

            for(let i = 0; i < admins.length; ++i) {
                if (user === admins[i]) {
                    userIsAdmin = 'true';
                }
            }

            await bcrypt.compare(password, dbHash).then(validPass => {
                if (validPass) {
                    return res.status(200).json({
                        message: 'Success',
                        status: 200,
                        user: user,
                        isAdmin: userIsAdmin
                    });
                } else {
                    return res.status(401).json({
                        message: "Incorrect Password",
                        status: 401
                    });    
                }
            })
        })
    }
})

// get jobs
app.get('/jobs/:reg/:user', async (req, res) => {

    // console.lo(req.params);

    connection.query(`SELECT job_name, assigned_to FROM taskcards WHERE registration = '${req.params.reg}' AND assigned_to = '${req.params.user}'`, function (error, results, fields) {
        if (error) throw error;

        res.send(results);
    })
})

// get task card information
app.get('/taskcardinfo/:reg/:mode/:jobName/:user?', async (req, res) => {

    if (req.params.jobName.toString() == 'all') {
        connection.query(`SELECT * FROM taskcards WHERE registration = '${req.params.reg}'`, function (error, results, fields) {
            if (error) throw error;

            res.send(results);
        })
    } else {
        // the top if statement verifies the correct user is logged in
        if (req.params.mode.toString() == 'get') {
            connection.query(`SELECT * FROM taskcards WHERE job_name = '${req.params.jobName}' AND assigned_to = '${global.user}' AND registration = '${req.params.reg}'`, function (error, results, fields) {
                if (error) throw error;

                res.send(results);
            })
        } else { // req.params.mode.toString() == 'editing'
            connection.query(`SELECT * FROM taskcards WHERE job_name = '${req.params.jobName}'`, function (error, results, fields) {
                if (error) throw error;

                res.send(results);
            })
        }
    }
})


// get parts information
app.get('/parts/:reg/:jobName', async (req, res) => {

    connection.query(`SELECT * FROM parts WHERE registration = '${req.params.reg}' AND phase = (SELECT phase FROM taskcards WHERE job_name = '${req.params.jobName}' AND registration = '${req.params.reg}')`, function (error, results, fields) {
        if (error) throw error;

        res.send(results);
    })
})

app.get('/part/:id', async (req, res) => {

    connection.query(`SELECT * FROM parts WHERE id = '${req.params.id}' LIMIT 1`, function (error, results, fields) {
        if (error) throw error;

        // console.lo(results[0]);

        res.send(results)
    })
})

// get materials info
app.get('/materials/:reg/:jobName', async (req, res) => {

    connection.query(`SELECT * FROM taskcard_materials WHERE job_name = '${req.params.jobName}' AND registration = '${req.params.reg}'`, function (error, results, fields) {
        if (error) throw error;

        console.log(results);
        
        res.send(results);
    })
})

// get approval info
app.get('/approval/:name', async (req, res) => {

    connection.query(`SELECT name, title, id FROM users WHERE id IN (SELECT approver_id FROM taskcards WHERE job_name = '${req.params.name}')`, function(error, results, fields) {

        if (error) throw error;

        res.send(results);
    })
})

// get task card approval
app.get('/approvedBy/:name', async (req, res) => {

    connection.query(`SELECT name, title, id FROM users WHERE name = '${req.params.name}'`, function(error, results, fields) {

        if (error) throw error;

        // console.lo(results);
        
        res.send(results[0]);
    })
})

// get completed by info
app.get('/completed/:name', async (req, res) => {
    connection.query(`SELECT title FROM users WHERE name = '${req.params.name}'`, function(error, results, fields) {
        if (error) throw error;

        res.send(results);
    })
})

// post new task card to DB
app.post('/taskcard', (req, res) => {

    let body = req.body;
    let materials = body.materials;

    console.log(body);
   
    connection.query(`INSERT INTO taskcards (registration, msn, aircraft_type, job_name, assigned_to, location, description, tools, phase, est_time, techs, labor, approver_id)
                    VALUES ('${body.registration}', '${body.msn}', '${body.aircraft_type}', '${body.jobName}', '${body.employeeAssigned}', '${body.jobLocation}', '${body.desc}', '${body.toolsNeeded}', '${body.phase}', '${body.estTime}', '${body.technicians}', '${body.labor}', '${body.approvalId}')`, function(error, results, fields) {
        if (error) throw error;

        res.send(results);
    })

    for (let i in materials) {
        connection.query(`INSERT INTO taskcard_materials (title, quantity, amount, registration, job_name) VALUES ('${materials[i].name}', '${materials[i].quantity}', '${materials[i].amount}', '${body.reg}', '${body.jobName}')`, function(error, results, fields) {
            if (error) throw error;
        })
    }
})

// update task cards
app.post('/update', (req, res) => {

    let body = req.body;
    let materials = body.materials

    console.log(materials);
   
    connection.query(`UPDATE taskcards SET registration = '${body.reg}', assigned_to = '${body.employeeAssigned}', location = '${body.jobLocation}', description = '${body.desc}', tools = '${body.toolsNeeded}', phase = '${body.phase}', est_time = ${body.estTime}, techs = ${body.technicians}, labor = ${body.labor} WHERE registration = '${body.reg}' AND job_name = '${body.jobName}'`, function(error, results, fields) {
        if (error) throw error;

        res.send(results);
    })

    for (let i in materials) {
        connection.query(`INSERT INTO taskcard_materials (title, quantity, amount, registration, job_name) VALUES ('${materials[i].name}', '${materials[i].quantity}', '${materials[i].amount}', '${body.reg}', '${body.jobName}')`, function(error, results, fields) {
            if (error) throw error;
        })
    }
})
// set task as completed
app.post('/setCompleted/:jobName/:name/:watchTime/:remarks?/:tools?', async (req, res) => {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1; // off by one so I made up for it. Not sure why it's off
    var year = new Date().getFullYear();

    var fullDate = `${year}-${month}-${date}`;

    connection.query(`UPDATE taskcards SET completion_date = '${fullDate}', time = ${req.params.watchTime}, remarks = '${req.params.remarks}', tools = '${req.params.tools}' WHERE job_name = '${req.params.jobName}'`, function(error, results, fields) {
        if (error) throw error;

        res.send(results);
    });
})
// add new part
app.post('/newPart/:partNum/:modelValue?/:reg/:description/:jobName/:expDate?/:ipc?/:ata?/:cage?', async (req, res) => {
    var params = req.params;

    connection.query(`INSERT INTO parts (part_number, model_value, registration, description, ipc, expiration_date, ata, cage, phase) VALUES ('${params.partNum}', '${params.modelValue}', '${params.reg}', '${params.description}', '${params.ipc}', '${params.expDate}', '${params.ata}', '${params.cage}', '${params.jobName}')`, function(error, results, fields) {
        if (error) throw error;

        res.send(results);
    })
})
// edit part
app.post('/editPart/:partNumber/:modelValue?/:description/:ipc?/:expDate?/:ata?/:cage?/:id', async (req, res) => {
    var params = req.params;

    connection.query(`UPDATE parts SET model_value = '${params.modelValue}', description = '${params.description}', ipc = '${params.ipc}', expiration_date = '${params.expDate}', ata = '${params.ata}', cage = '${params.cage}' WHERE id = ${params.id}`, function(error, results, fields) {
        if (error) throw error;

        res.send(results);
    })
})

app.post('/deletePart/:id', async (req, res) => {
    connection.query(`DELETE FROM parts WHERE id = ${req.params.id}`, function(error, results, fields) {
        if (error) throw error;

        res.send(results);
    })
})

app.listen(9001, () => {
    console.log('MySQL Server up!!');
})
