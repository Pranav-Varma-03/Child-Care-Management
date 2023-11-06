const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
// const pool = require('./conf')

const app = express()
const port = 3002

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "cms_user",
    password: "test@323",
    database: "CMS",
    connectionLimit: 10
});

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost: ${port}`)
})

app.get('/auth', async(req,res) =>{
    try{

        const {role,email,password} = req.query;
        // var table;
        let query;
        if(role == "System"){
            table = "SystemAdmin";
            query = `SELECT password FROM SystemAdmin WHERE email = ?`;
        }else if(role == "Facility"){
            table = "FacilityAdmin";
            query = `SELECT facility_id as id, password FROM FacilityAdmin WHERE email = ?`;
        }else if(role == "Teacher"){
            table = "Teacher";
            query = `SELECT teacher_id as id, password FROM Teacher WHERE email = ?`;
        }else if(role == "Parent"){
            table = "Parent";
            query = `SELECT parent_id as id, password FROM Parent WHERE email = ?`;
        }else{
            console.log("Incorrect role.")
        }
        // console.log(table);
        
        // query = `SELECT id, password FROM ${table} WHERE email = ?`;

        const [rows] = await pool.promise().query(query,[email]);
        console.log(rows)
        // console.log(rows[0].password);
        if((rows == null || rows.length !== 0) && password == rows[0].password){
            // res.json(rows)
            // console.log(rows[0].password);
            // Create a new object by merging rows and { valid: true }
        const responseObject = [{ ...rows[0], valid: true }];
        
        console.log(responseObject);
        console.log(rows);
        res.json(responseObject);
        console.log(responseObject)
        console.log(rows[0].password);
            // res.send(1);
        }else{
            res.json([{valid:false}])
            // res.send(0);
        }

        
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/facilityadmin',async(req,res) =>{
    try {
        
        const {email,facility_id} = req.query;
        const query = `SELECT * FROM FacilityAdmin WHERE email = ? AND facility_id = ?`;

        const [rows] = await pool.promise().query(query,[email,parseInt(facility_id)]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.get('/dayweek',async(req,res) =>{
    try {
        
        const query = `SELECT WEEK(NOW()) AS week, DAYOFWEEK(NOW()) as day;`;

        const [rows] = await pool.promise().query(query);
        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.post('/parent/add',async(req,res) =>{
    try {
        const {email,name,password,ph,addr} = req.body;
        
        const query = `INSERT INTO Parent (name, email, password, ph_number, address) VALUES (?, ?, ?, ?, ?);`;

        const [rows] = await pool.promise().query(query,[name,email,password,ph,addr]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.post('/child/add',async(req,res) =>{
    try {
        const {parentemail,name,dob,allergies,consent,license} = req.body;
        

        let query = 'SELECT parent_id FROM Parent WHERE email = ? ;';

        const [parent_id] = await pool.promise().query(query,[parentemail]);

        console.log(parent_id);

        if(parent_id != null && parent_id.length !== 0){
        query = `INSERT INTO Child (name, dob, allergies, parent_id,consent_Form,license_number) VALUES (?, ?, ?, ?, ?,?);`;

        const [rows] = await pool.promise().query(query,[name,dob,allergies,parent_id[0].parent_id,consent,license]);
        // console.log(rows[0]);
        res.json([{val:1}]);
        }else{
            res.json([{val:0}]);
        }        

    } catch (error) {
        console.error(error)
    }
})

app.post('/child/delete',async(req,res) =>{
    try {
        const {childid} = req.body;
        

        let query = 'DELETE FROM Child WHERE child_id = ?;';

        const [parent_id] = await pool.promise().query(query,[childid]);

        console.log(parent_id);

        if(parent_id != null && parent_id.length !== 0){
            
            // query = 'DELETE FROM Attendance WHERE child_id = ?;';
            // await pool.promise().query(query,[childid]);    
        res.json([{val: 1}]);
        }else{
            res.json([{val: 0}]);
        }        

    } catch (error) {
        console.error(error)
    }
})

app.post('/teacher/delete',async(req,res) =>{
    try {
        const {email,license} = req.body;
        

        let query = 'DELETE FROM Teacher WHERE email = ? AND license = ?;';

        const [rows] = await pool.promise().query(query,[email,license]);

        if(rows != null && rows.length !== 0){
            
            // query = 'DELETE FROM Attendance WHERE child_id = ?;';
            // await pool.promise().query(query,[childid]); 
            //REQUEST TO DELETE OTHER TABLE DATA REL. TO TEACHER.   
        res.json([{val: 1}]);
        }else{
            res.json([{val: 0}]);
        }        

    } catch (error) {
        console.error(error)
    }
})

app.post('/teacher/assign',async(req,res) =>{
    try {
        const {class_id, teacheremail,license} = req.body;
        
        let query = 'SELECT teacher_id FROM Teacher WHERE email = ? ;';

        const [teacher] = await pool.promise().query(query,[teacheremail]);

        const teacher_id = teacher[0].teacher_id

        //IF QUERY iNTERUPPTED. send res("INVALID CREDENTIALS")

        query = 'SELECT COUNT(*) FROM ClassTeacher where class_id = ?';

        const [rows] = await pool.promise().query(query,[class_id]);

        if(rows[0].count === 0){

            query = 'SELECT COUNT(*) FROM Classroom where class_id = ? AND license_number = ?';

            const [checkclass] = await pool.promise().query(query,[class_id,license]);

            if(checkclass[0].count === 0){
                res.json([{val: 0}]); //class not found
            }else{
                query = 'INSERT INTO ClassTeacher (class_id, teacher_id) VALUES (?, ?);';

            await pool.promise().query(query,[class_id,teacher_id]);
            res.json([{val: 1}]); //added Successfully.
            }
        }else if(rows[0].count === 1){
            res.json([{val: 1}]); // added Successfully.
        } else{
            res.json([{val: -1}]); // Number of teachers > 2.
        }       

    } catch (error) {
        console.error(error)
    }
})


app.post('/ledger',async(req,res) =>{
    try {
        const {week} = req.body

        let query = `SELECT COUNT(*) as count FROM Ledger WHERE week_number = ?`;

        const [rows] = await pool.promise().query(query,[week]);

        if(rows[0].count == 0){
            //add Data.

            query = 'INSERT INTO Ledger (child_id, license_number, confirm_status, payment_status, week_number) ' +
            'SELECT cc.child_id, c.license_number, 0 AS confirm_status, 0 AS payment_status, ? AS week_number ' +
            'FROM ClassChild cc ' +
            'INNER JOIN Child c ON cc.child_id = c.child_id;';

            await pool.promise().query(query,[week]);

            res.json([{val: 1}]);
        }else{
            res.json([{val: 0}]) //Data already Added.
        }

    } catch (error) {
        console.error(error)
    }
})

app.get('/ledger/collect',async(req,res) =>{
    try {
        const {license} = req.query;
        const query = `SELECT child_id, week_number, confirm_status FROM Ledger WHERE license_number = ? AND confirm_status = 0;`;

        const [rows] = await pool.promise().query(query,[license]);
        res.json(rows);
        console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.get('/ledger/all',async(req,res) =>{
    try {
        const {license} = req.query;
        const query = `SELECT child_id, week_number, payment_status FROM Ledger WHERE license_number = ?;`;

        const [rows] = await pool.promise().query(query,[license]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.post('/ledger/confirm',async(req,res) =>{
    try {
        const {child_id,week,license} = req.body;
        

        let query = 'UPDATE Ledger SET confirm_status = 1 ' +
          'WHERE week_number = ? ' +
          'AND child_id = ? ' +
          'AND license_number = ?;';

        const [rows] = await pool.promise().query(query,[week,child_id,license]);

        if(rows != null && rows.length !== 0){
            
            // query = 'DELETE FROM Attendance WHERE child_id = ?;';
            // await pool.promise().query(query,[childid]); 
            //REQUEST TO DELETE OTHER TABLE DATA REL. TO TEACHER.   
        res.json([{val: 1}]);
        }else{
            res.json([{val: 0}]);
        }        

    } catch (error) {
        console.error(error)
    }
})

app.get('/billed',async(req,res) =>{
    try {
        const {license,week} = req.query;
        const query = `SELECT SUM(
            CASE
                WHEN c.type = 'infant' THEN 300
                WHEN c.type = 'toddler' THEN 275
                WHEN c.type = 'twalder' THEN 250
                WHEN c.type = '3 years old' THEN 225
                WHEN c.type = '4 years old' THEN 200
                ELSE 0
            END
        ) AS total_money
        FROM Classroom AS c
        INNER JOIN ClassChild AS cc ON c.class_id = cc.class_id
        INNER JOIN Attendance AS a ON cc.child_id = a.child_id
        WHERE c.license_number = ?
        AND a.week_number = ?;
        `;

        const [rows] = await pool.promise().query(query,[license,week]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.get('/earned',async(req,res) =>{
    try {
        const {license,week} = req.query;
        const query = `SELECT SUM(
            CASE
                WHEN cc.type = 'infant' THEN 300
                WHEN cc.type = 'toddler' THEN 275
                WHEN cc.type = 'twalder' THEN 250
                WHEN cc.type = '3 years old' THEN 225
                WHEN cc.type = '4 years old' THEN 200
                ELSE 0
            END
        ) AS total_earned
        FROM Classroom cc
        INNER JOIN ClassChild cch ON cc.class_id = cch.class_id
        INNER JOIN Ledger l ON cch.child_id = l.child_id
        WHERE l.confirm_status = 1
        AND l.week_number = ?
        AND cc.license_number = ?;
        `;

        const [rows] = await pool.promise().query(query,[week,license]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.get('/allclasses',async(req,res) =>{
    try {
        const {license} = req.query;
        const query = `SELECT class_id FROM Classroom WHERE license_number = ?`;

        const [rows] = await pool.promise().query(query,[license]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.get('/attendance/present',async(req,res) =>{
    try {
        const {license,class_id,week,day} = req.query;
        const query = `SELECT cc.child_id, c.name AS child_name
        FROM ClassChild AS cc
        JOIN Child AS c ON cc.child_id = c.child_id
        WHERE c.license_number = ? 
        AND cc.class_id = ? 
        AND cc.child_id IN (
            SELECT a.child_id
            FROM Attendance AS a
            WHERE a.day_number = ?
            AND a.week_number = ?
        );
        `;

        const [rows] = await pool.promise().query(query,[license,class_id,day,week]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.get('/attendance/absent',async(req,res) =>{
    try {
        const {license,class_id,week,day} = req.query;
        const query = `SELECT cc.child_id, c.name AS child_name
        FROM ClassChild AS cc
        JOIN Child AS c ON cc.child_id = c.child_id
        WHERE c.license_number = ? 
        AND cc.class_id = ? 
        AND cc.child_id NOT IN (
            SELECT a.child_id
            FROM Attendance AS a
            WHERE a.day_number = ?
            AND a.week_number = ?
        );
        `;

        const [rows] = await pool.promise().query(query,[license,class_id,day,week]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})