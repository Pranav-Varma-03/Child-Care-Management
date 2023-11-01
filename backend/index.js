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


app.get('/auth', async(req,res) =>{
    try{

        const {role,emailid,password} = req.query;
        var table;

        if(role == "System"){
            table = "SystemAdmin";
        }else if(role == "Facility"){
            table = "FacilityAdmin";
        }else if(role == "Teacher"){
            table = "Teacher";
        }else if(role == "Parent"){
            table = "Parent";
        }else{
            console.log("Incorrect role.")
        }
        console.log(table);
        
        const query = `SELECT password FROM ${table} WHERE email = ?`;

        const [rows] = await pool.promise().query(query,[emailid]);

        console.log(rows[0].password);
        if(password == rows[0].password){
            res.json([{valid:true}])
            // res.send(1);
        }else{
            res.json([{valid:false}])
            // res.send(0);
        }

        // res.json(rows);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost: ${port}`)
})