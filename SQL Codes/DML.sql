use CMS;
-- NSERT INTO SystemAdmin (name, email, password)
-- VALUES ('System Admin', 'SA1@cms.in', '123');

-- SELECT password FROM SystemAdmin WHERE email = 'afa';

-- DELETE FROM Child WHERE child_id = 10;

-- INSERT INTO FacilityAdmin (name, email, password, license_number)
-- VALUES
--     ('FacilityAdmin1', 'FA1@cms.in',123, 1),
--     ('FacilityAdmin2', 'FA2@cms.in',123, 2),
--     ('FacilityAdmin3', 'FA3@cms.in',123, 3);

-- INSERT INTO Facility (license_number, name, address, facility_admin)
-- VALUES (1, 'Facility 1', '456 Elm St.', 1);

-- INSERT INTO Parent (name, email, password, ph_number, address)
-- VALUES ('Parent1', 'P1@cms.in', '123', '(555) 555-5555', '123 Main St');

-- INSERT INTO Child (name, dob, allergies, parent_id, consent_Form, license_number)
-- VALUES ('1Child1', '2020-05-15', 'None', 1, 1, 1);

SELECT * FROM Child;


-- ALTER TABLE Child MODIFY consent_Form BOOL;
-- DROP TABLE Teacher;
-- SELECT * FROM Teacher;
-- DELETE FROM Teacher;
-- ALTER TABLE Teacher ADD PRIMARY KEY (email, license_number);

-- SELECT COUNT(*) FROM ClassTeacher where class_id = '12';
SELECT CURRENT_TIMESTAMP;

SELECT WEEK(NOW()) AS week, DAYOFWEEK(NOW()) as day;	

SELECT * from Classroom;

INSERT INTO Classroom (type, license_number)
VALUES ('infant', 1);


INSERT INTO ClassChild (class_id, child_id)
VALUES (1, 11);

SELECT * FROM Teacher;
INSERT INTO Teacher (email, password, name, dob, address, phone_number, hour_salary, license_number)
VALUES ('TA@cms.in', '123', 'Teacher 1', '1985-03-15', '123 Main St, City', '+1234567890', 25.00, 1);

SELECT * FROM Classroom;
SELECT * FROM Attendance;

INSERT INTO Attendance (week_number, day_number, in_time, out_time, teacher_id, child_id)
VALUES (45, 1, '2023-11-05 08:30:00', '2023-11-05 16:00:00', 1, 11);
DELETE FROM Attendance WHERE child_id = 11; 

-- INSERT INTO Ledger (child_id, license_number, confirm_status, payment_status, week_number)
-- SELECT cc.child_id, c.license_number, 0 AS confirm_status, 0 AS payment_status, 0 AS week_number
-- FROM ClassChild cc
-- INNER JOIN Child c ON cc.child_id = c.child_id;

-- DELETE FROM Ledger WHERE child_id = 11; 

-- TOTAL MONEY BILLED

-- SELECT SUM(
--     CASE
--         WHEN c.type = 'infant' THEN 300
--         WHEN c.type = 'toddler' THEN 275
--         WHEN c.type = 'twalder' THEN 250
--         WHEN c.type = '3 years old' THEN 225
--         WHEN c.type = '4 years old' THEN 200
--         ELSE 0
--     END
-- ) AS total_money
-- FROM Classroom AS c
-- INNER JOIN ClassChild AS cc ON c.class_id = cc.class_id
-- INNER JOIN Attendance AS a ON cc.child_id = a.child_id
-- WHERE c.license_number = 1
-- AND a.week_number = 44;


-- TOTAL MONEY EARNED.

-- SELECT SUM(
--     CASE
--         WHEN cc.type = 'infant' THEN 300
--         WHEN cc.type = 'toddler' THEN 275
--         WHEN cc.type = 'twalder' THEN 250
--         WHEN cc.type = '3 years old' THEN 225
--         WHEN cc.type = '4 years old' THEN 200
--         ELSE 0
--     END
-- ) AS total_earned
-- FROM Classroom cc
-- INNER JOIN ClassChild cch ON cc.class_id = cch.class_id
-- INNER JOIN Ledger l ON cch.child_id = l.child_id
-- WHERE l.confirm_status = 1
-- AND l.week_number = 45
-- AND cc.license_number = 1;

SELECT cc.child_id
FROM ClassChild AS cc
JOIN Child AS c ON cc.child_id = c.child_id
WHERE c.license_number = 1 
AND cc.class_id = 1
AND cc.child_id  IN (
    SELECT a.child_id
    FROM Attendance AS a
    WHERE a.day_number = 1
);

SELECT NOW() as time;

SELECT * FROM Teacher;

SELECT * FROM Ledger;

SELECT day_number, in_time, out_time
FROM Attendance AS a
INNER JOIN Teacher AS t ON a.teacher_id = t.teacher_id
WHERE t.license_number = 1
AND a.teacher_id = 1
AND a.week_number = 45;

SELECT a.day_number,
       SUM((TIME_TO_SEC(TIMEDIFF(a.out_time, a.in_time)) / 3600) * t.hour_salary) AS daily_salary
FROM Attendance AS a
INNER JOIN Teacher AS t ON a.teacher_id = t.teacher_id
WHERE t.license_number = 1
AND a.teacher_id = 1
AND a.week_number = 45
GROUP BY a.day_number;

SELECT l.week_number, f.fee_per_week AS fee
FROM Ledger AS l
JOIN Child AS c ON l.child_id = c.child_id
JOIN Fees AS f ON c.type = f.type
WHERE l.child_id = 11
AND l.payment_status = 0;

-- Retrieve all values from the SystemAdmin table
SELECT * FROM SystemAdmin;

-- Retrieve all values from the FacilityAdmin table
SELECT * FROM FacilityAdmin;

-- Retrieve all values from the Facility table
SELECT * FROM Facility;

-- Retrieve all values from the Teacher table
SELECT * FROM Teacher;

-- Retrieve all values from the Parent table
SELECT * FROM Parent;

-- Retrieve all values from the Child table
SELECT * FROM Child;

-- Retrieve all values from the Classroom table
SELECT * FROM Classroom;

-- Retrieve all values from the ClassTeacher table
SELECT * FROM ClassTeacher;

-- Retrieve all values from the ClassChild table
SELECT * FROM ClassChild;

-- DROP table ClassTeacher;


-- Retrieve all values from the Attendance table
SELECT * FROM Attendance;

-- Retrieve all values from the Fees table
SELECT * FROM Fees;

-- Retrieve all values from the Ledger table
SELECT * FROM Ledger;
SELECT * FROM SystemAdmin;
-- System Admin
INSERT INTO SystemAdmin (name, email, password)
VALUES ('System Admin', 'admin@cms.in', 'admin');

-- DROP TABLE SystemAdmin;

-- Facility Admin
INSERT INTO FacilityAdmin (facility_id, name, email, password, license_number)
VALUES
(1, 'FacilityAdmin1', 'FA1@cms.in', '123', 1),
(2, 'FacilityAdmin2', 'FA2@cms.in', '123', 2),
(3, 'FacilityAdmin3', 'FA3@cms.in', '123', 3);

-- Facility
INSERT INTO Facility (license_number, name, address, facility_admin)
VALUES (1, 'Facility 1', '456 Elm St.', 1);

-- Teacher
INSERT INTO Teacher (email, password, name, dob, address, phone_number, hour_salary, license_number)
VALUES ('TA@cms.in', '123', 'Teacher 1', '1985-03-15', '123 Main St, City', '+1234567890', 25.00, 1);

-- Parent
INSERT INTO Parent (name, email, password, ph_number, address)
VALUES ('Parent1', 'P1@cms.in', '123', '(555) 555-5555', '123 Main St');

-- Child
INSERT INTO Child (name, dob, allergies, parent_id, consent_Form, license_number, type)
VALUES ('1Child1', '2020-05-15', 'None', 1, 1, 1, 'infant');

-- Classroom
INSERT INTO Classroom (type, license_number, capacity)
VALUES ('infant', 1, 8);

-- ClassChild
INSERT INTO ClassChild (class_id, child_id)
VALUES (1, 3);

-- Attendance
INSERT INTO Attendance (week_number, day_number, in_time, out_time, teacher_id, child_id)
VALUES (45, 3, '2023-11-05 08:30:00', '2023-11-05 16:00:00', NULL, 1);
-- (45, 2, '2023-11-06 11:17:51', '2023-11-06 22:58:24', 1, NULL),
-- (45, 2, '2023-11-06 22:58:19', '2023-11-06 22:58:24', 1, NULL);

-- Fee
INSERT INTO Fees (type, fee_per_week)
VALUES
('infant', 300),
('Toddler', 275),
('Twadler', 250),
('3 years old', 225),
('4 years old', 200);

-- Ledger
INSERT INTO Ledger (child_id, confirm_status, payment_status, week_number, license_number)
VALUES (1, '0', '0', 45, 1);

SELECT
    DATE_FORMAT(in_time, '%Y-%m') AS month,
    COUNT(*) AS count
FROM Attendance
WHERE teacher_id = 1
GROUP BY teacher_id, month
ORDER BY teacher_id, month;

SELECT
    CASE
        WHEN c.type = cl.type THEN 1
        ELSE 0
    END AS type_match
FROM Child AS c
INNER JOIN Classroom AS cl ON c.child_id = 2 AND cl.class_id = 2;

DELETE FROM ClassTeacher
WHERE teacher_id = 2
AND EXISTS (SELECT 1 FROM ClassTeacher WHERE teacher_id = 2);


SELECT * FROM Teacher WHERE email = 'TA2@cms.in' AND license_number = 1;

SELECT COUNT(*) AS row_count
        FROM ClassTeacher AS ct
        JOIN ClassChild AS cc ON ct.class_id = cc.class_id
        WHERE cc.child_id = 3
        AND ct.teacher_id = 1;
        
        
        
SELECT *
FROM Classroom AS c
INNER JOIN ClassChild AS cc ON c.class_id = cc.class_id
WHERE c.license_number = 1
;
        
        select * from Attendance;
        Select * from Child;
        Select * from ClassChild;
		SELECT * FROM Classroom;
        SELECT * FROM Ledger;
        
        SELECT
    CH.child_id,
    CH.name AS child_name,
    CH.dob AS child_dob,
    CH.allergies,
    CH.parent_id,
    CH.consent_Form,
    CH.license_number AS Ch_license,
    CH.type AS child_type,
    CC.class_id,
    CR.license_number AS Cr_license,
    CR.type AS class_type,
    CR.capacity AS class_capacity
FROM
    Child AS CH
JOIN
    ClassChild AS CC ON CH.child_id = CC.child_id
JOIN
    Classroom AS CR ON CC.class_id = CR.class_id;
