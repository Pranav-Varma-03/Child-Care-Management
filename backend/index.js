const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
// const pool = require('./conf')

const app = express()
const port = 3002

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "cms_user",
    password: "test@323",
    database: "CMS",
    connectionLimit: 10
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost: ${port}`)
})

app.get('/auth', async (req, res) => {
    try {

        const { role, email, password } = req.query;
        // var table;
        let query;
        if (role == "System") {
            table = "SystemAdmin";
            query = `SELECT password FROM SystemAdmin WHERE email = ?`;
        } else if (role == "Facility") {
            table = "FacilityAdmin";
            query = `SELECT facility_id as id, password FROM FacilityAdmin WHERE email = ?`;
        } else if (role == "Teacher") {
            table = "Teacher";
            query = `SELECT teacher_id as id, password FROM Teacher WHERE email = ?`;
        } else if (role == "Parent") {
            table = "Parent";
            query = `SELECT parent_id as id, password FROM Parent WHERE email = ?`;
        } else {
            console.log("Incorrect role.")
        }
        // console.log(table);

        // query = `SELECT id, password FROM ${table} WHERE email = ?`;

        const [rows] = await pool.promise().query(query, [email]);
        // console.log(rows)
        // console.log(rows[0].password);
        if ((rows == null || rows.length !== 0) && password == rows[0].password) {
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
        } else {
            res.json([{ valid: false }])
            // res.send(0);
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/facilityadmin', async (req, res) => {
    try {

        const { email, facility_id } = req.query;
        const query = `SELECT * FROM FacilityAdmin WHERE email = ? AND facility_id = ?`;

        const [rows] = await pool.promise().query(query, [email, parseInt(facility_id)]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.get('/dayweek', async (req, res) => {
    try {

        const query = `SELECT WEEK(NOW()) AS week, DAYOFWEEK(NOW()) as day;`;

        const [rows] = await pool.promise().query(query);
        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.post('/parent/add', async (req, res) => {
    try {
        const { email, name, password, ph, addr } = req.body;

        const query = `INSERT INTO Parent (name, email, password, ph_number, address) VALUES (?, ?, ?, ?, ?);`;

        const [rows] = await pool.promise().query(query, [name, email, password, ph, addr]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.post('/child/add', async (req, res) => {
    try {
        const { parentemail, name, dob, allergies, consent, license } = req.body;


        let query = 'SELECT parent_id FROM Parent WHERE email = ? ;';

        const [parent_id] = await pool.promise().query(query, [parentemail]);

        console.log(parent_id);

        if (parent_id != null && parent_id.length !== 0) {
            query = `INSERT INTO Child (name, dob, allergies, parent_id,consent_Form,license_number) VALUES (?, ?, ?, ?, ?,?);`;

            const [rows] = await pool.promise().query(query, [name, dob, allergies, parent_id[0].parent_id, consent, license]);
            // console.log(rows[0]);
            res.json([{ val: 1 }]);
        } else {
            res.json([{ val: 0 }]);
        }

    } catch (error) {
        console.error(error)
    }
})

app.post('/child/delete', async (req, res) => {
    try {
        const { childid } = req.body;


        let query;

        query = `DELETE FROM Attendance WHERE child_id = ?;`;
        await pool.promise().query(query, [childid]);
        query = `DELETE FROM Ledger WHERE child_id = ?;`
        await pool.promise().query(query, [childid]);
        query = `DELETE FROM ClassChild WHERE child_id = ?;`
        await pool.promise().query(query, [childid]);

        query = 'DELETE FROM Child WHERE child_id = ?;';
        const [parent_id] = await pool.promise().query(query, [childid]);

        console.log(parent_id);

        if (parent_id != null && parent_id.length !== 0) {

            // query = 'DELETE FROM Attendance WHERE child_id = ?;';
            await pool.promise().query(query, [childid]);
            res.json([{ val: 1 }]);
        } else {
            res.json([{ val: 0 }]);
        }

    } catch (error) {
        console.error(error)
    }
})



app.post('/teacher/delete', async (req, res) => {
    try {
        const { email, license } = req.body;


        let query = 'SELECT teacher_id FROM Teacher WHERE email = ? AND license_number = ?;';
        await pool.promise().query(query, [email, license]);
        const teacher_id = rows[0].teacher_id;

        query = `Delete from Attendance table
        DELETE FROM Attendance WHERE teacher_id = ?;`
        
        await pool.promise().query(query, [teacher_id]);
        query = `Delete from ClassTeacher table
        DELETE FROM ClassTeacher WHERE teacher_id = ?;`
        
        await pool.promise().query(query, [teacher_id]);

        query = `Delete from Teacher table
        DELETE FROM Teacher WHERE teacher_id = ?;`;
        const [rows] = await pool.promise().query(query, [teacher_id]);
        
        if (rows != null && rows.length !== 0) {

            // query = 'DELETE FROM Attendance WHERE child_id = ?;';
            // await pool.promise().query(query,[childid]); 
            //REQUEST TO DELETE OTHER TABLE DATA REL. TO TEACHER.   
            res.json([{ val: 1 }]);
        } else {
            res.json([{ val: 0 }]);
        }

    } catch (error) {
        console.error(error)
    }
})

app.post('/child/assign', async (req, res) => {
    try {
        const { class_id, child_id, license } = req.body;

        let query;

        //IF QUERY iNTERUPPTED. send res("INVALID CREDENTIALS")

        query = `SELECT
        CASE
            WHEN c.type = cc.type THEN 1
            ELSE 0
        END AS match_result
    FROM Child AS c
    JOIN ClassChild AS cc ON c.child_id = cc.child_id
    WHERE c.child_id = ? AND cc.class_id = ?;
    `;

        const [rows] = await pool.promise().query(query, [child_id, class_id]);

        if (rows[0].match_result === 1) {

            query = 'INSERT INTO ClassChild (class_id, child_id) VALUES (?, ?);';

            await pool.promise().query(query, [class_id, child_id]);
            res.json([{ val: 1 }]); //added Successfully.

        } else {
            res.json([{ val: -1 }]); // type mis-match.
        }

    } catch (error) {
        console.error(error)
    }
})

app.post('/add/classroom', async (req, res) => {
    try {
        const { type, license } = req.body;

        let query;

        if (type === 'infant') {
            query = `INSERT INTO Classroom (type, capacity, license_number)
                VALUES ('infant', 8, ?);`;
        } else if (type === 'toddler') {
            query = `INSERT INTO Classroom (type, capacity, license_number)
                VALUES ('toddler', 12,?);`;
        } else if (type === 'twaddler') {
            query = `INSERT INTO Classroom (type, capacity, license_number)
                VALUES ('twaddler', 16, ?);`;
        } else if (type === '3 years old') {
            query = `INSERT INTO Classroom (type, capacity, license_number)
                VALUES ('3 years old', 18, ?);`;
        } else if (type === '4 years old') {
            query = `INSERT INTO Classroom (type, capacity, license_number)
                VALUES ('4 years old', 20, ?);`;
        } else {
            console.error(error)
        }
        await pool.promise().query(query, [license]);
        res.json([{ val: 1 }]);


    } catch (error) {
        console.error(error)
    }
})

app.get('/classroom/all', async (req, res) => {
    try {
        const { license } = req.query;
        const query = `SELECT * FROM Classroom WHERE license_number = ? ;`;

        const [rows] = await pool.promise().query(query, [license]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.get('/children/all', async (req, res) => {
    try {
        const { license } = req.query;
        const query = `SELECT * FROM Child WHERE license_number = ? ;`;

        const [rows] = await pool.promise().query(query, [license]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.post('/ledger', async (req, res) => {
    try {
        const { week } = req.body

        let query = `SELECT COUNT(*) as count FROM Ledger WHERE week_number = ?`;

        const [rows] = await pool.promise().query(query, [week]);

        if (rows[0].count == 0) {
            //add Data.

            query = 'INSERT INTO Ledger (child_id, license_number, confirm_status, payment_status, week_number) ' +
                'SELECT cc.child_id, c.license_number, 0 AS confirm_status, 0 AS payment_status, ? AS week_number ' +
                'FROM ClassChild cc ' +
                'INNER JOIN Child c ON cc.child_id = c.child_id;';

            await pool.promise().query(query, [week]);

            res.json([{ val: 1 }]);
        } else {
            res.json([{ val: 0 }]) //Data already Added.
        }

    } catch (error) {
        console.error(error)
    }
})

app.get('/ledger/collect', async (req, res) => {
    try {
        const { license } = req.query;
        const query = `SELECT child_id, week_number, confirm_status FROM Ledger WHERE license_number = ? AND confirm_status = 0;`;

        const [rows] = await pool.promise().query(query, [license]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.get('/ledger/all', async (req, res) => {
    try {
        const { license } = req.query;
        const query = `SELECT child_id, week_number, payment_status FROM Ledger WHERE license_number = ?;`;

        const [rows] = await pool.promise().query(query, [license]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.post('/ledger/confirm', async (req, res) => {
    try {
        const { child_id, week, license } = req.body;


        let query = 'UPDATE Ledger SET confirm_status = 1 ' +
            'WHERE week_number = ? ' +
            'AND child_id = ? ' +
            'AND license_number = ?;';

        const [rows] = await pool.promise().query(query, [week, child_id, license]);

        if (rows != null && rows.length !== 0) {

            // query = 'DELETE FROM Attendance WHERE child_id = ?;';
            // await pool.promise().query(query,[childid]); 
            //REQUEST TO DELETE OTHER TABLE DATA REL. TO TEACHER.   
            res.json([{ val: 1 }]);
        } else {
            res.json([{ val: 0 }]);
        }

    } catch (error) {
        console.error(error)
    }
})

app.get('/billed', async (req, res) => {
    try {
        const { license, week } = req.query;
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

        const [rows] = await pool.promise().query(query, [license, week]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.get('/earned', async (req, res) => {
    try {
        const { license, week } = req.query;
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

        const [rows] = await pool.promise().query(query, [week, license]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.get('/allclasses', async (req, res) => {
    try {
        const { license } = req.query;
        const query = `SELECT class_id FROM Classroom WHERE license_number = ?`;

        const [rows] = await pool.promise().query(query, [license]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.get('/attendance/present', async (req, res) => {
    try {
        const { license, class_id, week, day } = req.query;
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

        const [rows] = await pool.promise().query(query, [license, class_id, day, week]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.get('/attendance/absent', async (req, res) => {
    try {
        const { license, class_id, week, day } = req.query;
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

        const [rows] = await pool.promise().query(query, [license, class_id, day, week]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.post('/teacher/attendance', async (req, res) => {
    try {
        const { time, email, week, day } = req.body;

        let query = "SELECT NOW() as time;"
        const [curr_time] = await pool.promise().query(query);

        query = 'SELECT teacher_id FROM Teacher WHERE email = ?;';
        const [teacher] = await pool.promise().query(query, [email]);

        console.log(time);

        const teacherId = teacher[0].teacher_id;
        const currentTime = curr_time[0].time;

        if (time.activeButton == 'INTIME') {

            console.log('entered if block');

            query = 'INSERT INTO Attendance ' +
                '(week_number, day_number, teacher_id, in_time, out_time, child_id) ' +
                'VALUES (?, ?, ?, ?, ?, NULL);';

            await pool.promise().query(query, [week, day, teacherId, currentTime, currentTime]);
            res.json([{ val: 1 }]); //inserted. - in Time.
        } else {

            query = 'UPDATE Attendance ' +
                'SET out_time = ? ' +
                'WHERE week_number = ? ' +
                'AND day_number = ? ' +
                'AND teacher_id = ?;';

            await pool.promise().query(query, [currentTime, week, day, teacherId]);
            res.json([{ val: 2 }]); //Out Time.
        }

    } catch (error) {
        console.error(error)
    }
})


app.get('/teacher', async (req, res) => {
    try {

        const { teacher_id } = req.query;
        const query = `SELECT * FROM Teacher WHERE teacher_id = ?`;

        const [rows] = await pool.promise().query(query, [teacher_id]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.get('/attendance/teacher', async (req, res) => {
    try {
        const { license, teacher_id, week } = req.query;
        const query = `SELECT day_number, TIME(a.in_time) AS in_time, TIME(a.out_time) AS out_time
        FROM Attendance AS a
        INNER JOIN Teacher AS t ON a.teacher_id = t.teacher_id
        WHERE t.license_number = ?
        AND a.teacher_id = ?
        AND a.week_number = ?;        
        `;
        const [rows] = await pool.promise().query(query, [license, teacher_id, week]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.get('/salary/teacher', async (req, res) => {
    try {
        const { license, teacher_id, week } = req.query;
        const query = `SELECT a.day_number,
        SUM((TIME_TO_SEC(TIMEDIFF(a.out_time, a.in_time)) / 3600) * t.hour_salary) AS daily_salary
 FROM Attendance AS a
 INNER JOIN Teacher AS t ON a.teacher_id = t.teacher_id
 WHERE t.license_number = ?
 AND a.teacher_id = ?
 AND a.week_number = ?
 GROUP BY a.day_number;
         
        `;
        const [rows] = await pool.promise().query(query, [license, teacher_id, week]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.get('/hours/teacher', async (req, res) => {
    try {
        const { license, teacher_id, week } = req.query;
        const query = `SELECT a.day_number,
        ROUND(SUM(TIME_TO_SEC(TIMEDIFF(a.out_time, a.in_time)) / 3600), 2) AS daily_working_hours
 FROM Attendance AS a
 INNER JOIN Teacher AS t ON a.teacher_id = t.teacher_id
 WHERE t.license_number = ?
 AND a.teacher_id = ?
 AND a.week_number = ?
 GROUP BY a.day_number;
        `;
        const [rows] = await pool.promise().query(query, [license, teacher_id, week]);
        res.json(rows);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.post('/child/attendance', async (req, res) => {
    try {
        const { time, child_id, week, day, teacher_id } = req.body;

        let query = "SELECT NOW() as time;"
        const [curr_time] = await pool.promise().query(query);

        // query = 'SELECT teacher_id FROM Teacher WHERE email = ?;';
        // const [teacher] = await pool.promise().query(query,[email]);

        console.log(time);

        // const teacherId = teacher[0].teacher_id;
        const currentTime = curr_time[0].time;

        if (time.activeButton == 'PRESENT') {

            console.log('entered if block');

            query = `SELECT COUNT(*) AS row_count
        FROM ClassTeacher AS ct
        JOIN ClassChild AS cc ON ct.class_id = cc.class_id
        WHERE cc.child_id = ?
        AND ct.teacher_id = ?;
        `;

            const [count] = await pool.promise().query(query, [child_id, teacher_id]);

            if (count[0].row_count !== 0) {
                query = `SELECT COUNT(*) AS row_count
                FROM Attendance
                WHERE week_number = ?
                AND day_number = ?
                AND child_id = ?;
                `;

                const [count2] = await pool.promise().query(query, [child_id, teacher_id]);

                if (count2[0].row_count === 0) {
                    query = `INSERT INTO Attendance (week_number, day_number, in_time, child_id)
                    VALUES (?,?,?,?);
                `;
                    await pool.promise().query(query, [week, day, currentTime, child_id]);
                } else {
                    res.json([{ val: 2 }]);
                }

            } else {
                res.json([{ val: 3 }]);
            }

            //inserted. - in Time.
        } else {
            res.json([{ val: 0 }])
        }

    } catch (error) {
        console.error(error)
    }
})

app.get('/parent', async (req, res) => {
    try {

        const { parent_id } = req.query;
        const query = `SELECT * FROM Parent WHERE parent_id = ? `;

        const [rows] = await pool.promise().query(query, [parent_id]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.get('/parent/children', async (req, res) => {
    try {

        const { parent_id } = req.query;
        const query = `SELECT c.child_id, c.name AS child_name, c.license_number
        FROM Child AS c
        WHERE c.parent_id = ?;`;

        const [rows] = await pool.promise().query(query, [parent_id]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.get('/payment/child', async (req, res) => {
    try {

        const { child_id } = req.query;
        const query = `SELECT l.week_number, f.fee_per_week AS fee
        FROM Ledger AS l
        JOIN Child AS c ON l.child_id = c.child_id
        JOIN Fees AS f ON c.type = f.type
        WHERE l.child_id = ?
        AND l.payment_status = 0;
        
        `;

        const [rows] = await pool.promise().query(query, [child_id]);

        res.json(rows);
        // console.log(child_id);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})

app.post('/payment/confirm', async (req, res) => {
    try {
        const { child_id, week } = req.body;


        let query = `UPDATE Ledger
        SET payment_status = 1
        WHERE child_id = ?
        AND week_number = ?;`
            ;

        const [rows] = await pool.promise().query(query, [child_id, week]);

        if (rows != null && rows.length !== 0) {

            // query = 'DELETE FROM Attendance WHERE child_id = ?;';
            // await pool.promise().query(query,[childid]); 
            //REQUEST TO DELETE OTHER TABLE DATA REL. TO TEACHER.   
            res.json([{ val: 1 }]);
        } else {
            res.json([{ val: 0 }]);
        }

    } catch (error) {
        console.error(error)
    }
})

app.get('/ledger/child', async (req, res) => {
    try {

        const { child_id } = req.query;
        const query = `SELECT
        L.week_number,
        L.license_number,
        L.payment_status,
        L.confirm_status,
        F.fee_per_week
    FROM Ledger L
    JOIN Child C ON L.child_id = C.child_id
    JOIN Fees F ON C.type = F.Type
    WHERE L.child_id = ?;    
        `;

        const [rows] = await pool.promise().query(query, [child_id]);

        res.json(rows);
        // console.log(child_id);
        // console.log(rows);
    } catch (error) {
        console.error(error)
    }
})


app.get('/child', async (req, res) => {
    try {

        const { child_id } = req.query;
        const query = `SELECT
        DATE_FORMAT(dob, '%d-%m-%y') AS formatted_dob,
        name AS child_name,
        allergies,
        license_number,
        consent_Form
    FROM Child
    WHERE child_id = ?;
    `;

        const [rows] = await pool.promise().query(query, [child_id]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.post('/child/update', async (req, res) => {
    try {
        const { name, dob, allergies, child_id } = req.body;


        let query = `UPDATE Child SET
            name = ?,
            dob = ?, 
            allergies = ?
        WHERE child_id = ?;`
            ;

        const [rows] = await pool.promise().query(query, [name, dob, allergies, child_id]);

        if (rows != null && rows.length !== 0) {

            // query = 'DELETE FROM Attendance WHERE child_id = ?;';
            // await pool.promise().query(query,[childid]); 
            //REQUEST TO DELETE OTHER TABLE DATA REL. TO TEACHER.   
            res.json([{ val: 1 }]);
        } else {
            res.json([{ val: 0 }]);
        }

    } catch (error) {
        console.error(error)
    }
})

app.get('/child/month', async (req, res) => {
    try {

        const { child_id } = req.query;
        const query = `SELECT
        DATE_FORMAT(in_time, '%Y-%m') AS month,
        COUNT(*) AS count
    FROM Attendance
    WHERE teacher_id = ?
    GROUP BY teacher_id, month
    ORDER BY teacher_id, month;
    
    `;

        const [rows] = await pool.promise().query(query, [child_id]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})

app.get('/child/week', async (req, res) => {
    try {

        const { child_id } = req.query;
        const query = `SELECT
        week_number as week,
        COUNT(*) AS count
    FROM Attendance
    WHERE teacher_id = ?
    GROUP BY teacher_id, week_number
    ORDER BY teacher_id, week_number;
    `;

        const [rows] = await pool.promise().query(query, [child_id]);

        res.json(rows);

    } catch (error) {
        console.error(error)
    }
})