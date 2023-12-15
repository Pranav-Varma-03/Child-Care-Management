use CMS;
-- System Admin
INSERT INTO SystemAdmin (name, email, password) VALUES ('System Admin', 'admin@cms.in', 'admin');

-- FA
INSERT INTO FacilityAdmin (name, email, password, facility_id)
VALUES
    ('Facility admin 1', 'FA1@cms.in', '123', 1),
    ('Facility admin 2', 'FA2@cms.in', '123', 2),
    ('Facility admin 3', 'FA3@cms.in', '123', 3),
    ('Facility admin 4', 'FA4@cms.in', '123', 4),
    ('Facility admin 5', 'FA5@cms.in', '123', 5),
    ('Facility admin 6', 'FA6@cms.in', '123', 6),
    ('Facility admin 7', 'FA7@cms.in', '123', 7),
    ('Facility admin 8', 'FA8@cms.in', '123', 8),
    ('Facility admin 9', 'FA9@cms.in', '123', 9),
    ('Facility admin 10', 'FA10@cms.in', '123', 10);
    
INSERT INTO Facility (license_number, name, address, facility_admin)
VALUES
    (1, 'Facility 1', '123 Main St.', 1),
    (2, 'Facility 2', '456 Elm St.', 2),
    (3, 'Facility 3', '789 Oak St.', 3),
    (4, 'Facility 4', '101 Pine St.', 4),
    (5, 'Facility 5', '234 Cedar St.', 5),
    (6, 'Facility 6', '567 Birch St.', 6),
    (7, 'Facility 7', '890 Maple St.', 7),
    (8, 'Facility 8', '123 Spruce St.', 8),
    (9, 'Facility 9', '456 Fir St.', 9),
    (10, 'Facility 10', '789 Redwood St.', 10);

INSERT INTO Teacher (email, password, name, dob, address, phone_number, hour_salary, license_number)
VALUES
    ('TA1@cms.in', '123', 'Teacher 1', '1985-03-15', '123 Main St, City', '+1234567890', 25.00, 1),
    ('TA2@cms.in', '123', 'Teacher 2', '1986-04-16', '456 Elm St, Town', '+2345678901', 26.00, 2),
    ('TA3@cms.in', '123', 'Teacher 3', '1987-05-17', '789 Oak St, Village', '+3456789012', 27.00, 3),
    ('TA4@cms.in', '123', 'Teacher 4', '1988-06-18', '101 Pine St, Suburb', '+4567890123', 28.00, 4),
    ('TA5@cms.in', '123', 'Teacher 5', '1989-07-19', '234 Cedar St, City', '+5678901234', 29.00, 5),
    ('TA6@cms.in', '123', 'Teacher 6', '1990-08-20', '567 Birch St, Town', '+6789012345', 30.00, 6),
    ('TA7@cms.in', '123', 'Teacher 7', '1991-09-21', '890 Maple St, Village', '+7890123456', 31.00, 7),
    ('TA8@cms.in', '123', 'Teacher 8', '1992-10-22', '123 Spruce St, Suburb', '+8901234567', 32.00, 8),
    ('TA9@cms.in', '123', 'Teacher 9', '1993-11-23', '456 Fir St, City', '+9012345678', 33.00, 9),
    ('TA10@cms.in', '123', 'Teacher 10', '1994-12-24', '789 Redwood St, Town', '+0123456789', 34.00, 10);

INSERT INTO Parent (name, email, password, ph_number, address)
VALUES
    ('Parent1', 'P1@cms.in', '123', '(555) 555-5555', '123 Main St'),
    ('Parent2', 'P2@cms.in', '123', '(555) 555-5556', '124 Main St'),
    ('Parent3', 'P3@cms.in', '123', '(555) 555-5557', '125 Main St'),
    ('Parent4', 'P4@cms.in', '123', '(555) 555-5558', '126 Main St'),
    ('Parent5', 'P5@cms.in', '123', '(555) 555-5559', '127 Main St');

-- Child data for Parent 1 , 2 , 3, 4, 5.

INSERT INTO Child (name, dob, allergies, parent_id, consent_Form, license_number, type)
VALUES
    ('1 Child 1', '2020-05-15', 'None', 1, 1, FLOOR(RAND() * 10) + 1, 'infant'),
    ('1 Child 2', '2019-04-12', 'None', 1, 1, FLOOR(RAND() * 10) + 1, 'Toddler'),
    ('1 Child 3', '2018-03-10', 'None', 1, 1, FLOOR(RAND() * 10) + 1, 'Twaddler'),
    ('1 Child 4', '2017-02-05', 'None', 1, 1, FLOOR(RAND() * 10) + 1, '3 Years Old');

-- Child data for Parent 2
INSERT INTO Child (name, dob, allergies, parent_id, consent_Form, license_number, type)
VALUES
    ('2 Child 1', '2020-06-18', 'None', 2, 1, FLOOR(RAND() * 10) + 1, '4 Years Old'),
    ('2 Child 2', '2019-05-19', 'None', 2, 1, FLOOR(RAND() * 10) + 1, 'infant'),
    ('2 Child 3', '2018-04-17', 'None', 2, 1, FLOOR(RAND() * 10) + 1, 'Toddler'),
    ('2 Child 4', '2017-03-22', 'None', 2, 1, FLOOR(RAND() * 10) + 1, 'Twaddler');

-- Child data for Parent 3
INSERT INTO Child (name, dob, allergies, parent_id, consent_Form, license_number, type)
VALUES
    ('3 Child 1', '2020-07-25', 'None', 3, 1, FLOOR(RAND() * 10) + 1, 'infant'),
    ('3 Child 2', '2019-06-23', 'None', 3, 1, FLOOR(RAND() * 10) + 1, 'Toddler'),
    ('3 Child 3', '2018-05-20', 'None', 3, 1, FLOOR(RAND() * 10) + 1, 'Twaddler'),
    ('3 Child 4', '2017-04-19', 'None', 3, 1, FLOOR(RAND() * 10) + 1, '3 Years Old');

-- Child data for Parent 4
INSERT INTO Child (name, dob, allergies, parent_id, consent_Form, license_number, type)
VALUES
    ('4 Child 1', '2020-08-12', 'None', 4, 1, FLOOR(RAND() * 10) + 1, 'Toddler'),
    ('4 Child 2', '2019-07-11', 'None', 4, 1, FLOOR(RAND() * 10) + 1, 'Twaddler'),
    ('4 Child 3', '2018-06-14', 'None', 4, 1, FLOOR(RAND() * 10) + 1, '3 Years Old'),
    ('4 Child 4', '2017-05-21', 'None', 4, 1, FLOOR(RAND() * 10) + 1, '4 Years Old');

-- Child data for Parent 5
INSERT INTO Child (name, dob, allergies, parent_id, consent_Form, license_number, type)
VALUES
    ('5 Child 1', '2020-09-30', 'None', 5, 1, FLOOR(RAND() * 10) + 1, 'infant'),
    ('5 Child 2', '2019-08-28', 'None', 5, 1, FLOOR(RAND() * 10) + 1, 'Toddler'),
    ('5 Child 3', '2018-07-19', 'None', 5, 1, FLOOR(RAND() * 10) + 1, 'Twaddler'),
    ('5 Child 4', '2017-06-16', 'None', 5, 1, FLOOR(RAND() * 10) + 1, '3 Years Old');

-- License Number 1
INSERT INTO Classroom (type, license_number, capacity)
VALUES
    ('infant', 1, 8),
    ('toddler', 1, 12),
    ('twaddler', 1, 16),
    ('3 years old', 1, 18),
    ('4 years old', 1, 20);

-- License Number 2
INSERT INTO Classroom (type, license_number, capacity)
VALUES
    ('infant', 2, 8),
    ('toddler', 2, 12),
    ('twaddler', 2, 16),
    ('3 years old', 2, 18),
    ('4 years old', 2, 20);

-- License Number 3
INSERT INTO Classroom (type, license_number, capacity)
VALUES
    ('infant', 3, 8),
    ('toddler', 3, 12),
    ('twaddler', 3, 16),
    ('3 years old', 3, 18),
    ('4 years old', 3, 20);

-- License Number 4
INSERT INTO Classroom (type, license_number, capacity)
VALUES
    ('infant', 4, 8),
    ('toddler', 4, 12),
    ('twaddler', 4, 16),
    ('3 years old', 4, 18),
    ('4 years old', 4, 20);

-- License Number 5
INSERT INTO Classroom (type, license_number, capacity)
VALUES
    ('infant', 5, 8),
    ('toddler', 5, 12),
    ('twaddler', 5, 16),
    ('3 years old', 5, 18),
    ('4 years old', 5, 20);

-- License Number 6
INSERT INTO Classroom (type, license_number, capacity)
VALUES
    ('infant', 6, 8),
    ('toddler', 6, 12),
    ('twaddler', 6, 16),
    ('3 years old', 6, 18),
    ('4 years old', 6, 20);

-- License Number 7
INSERT INTO Classroom (type, license_number, capacity)
VALUES
    ('infant', 7, 8),
    ('toddler', 7, 12),
    ('twaddler', 7, 16),
    ('3 years old', 7, 18),
    ('4 years old', 7, 20);

-- License Number 8
INSERT INTO Classroom (type, license_number, capacity)
VALUES
    ('infant', 8, 8),
    ('toddler', 8, 12),
    ('twaddler', 8, 16),
    ('3 years old', 8, 18),
    ('4 years old', 8, 20);

-- License Number 9
INSERT INTO Classroom (type, license_number, capacity)
VALUES
    ('infant', 9, 8),
    ('toddler', 9, 12),
    ('twaddler', 9, 16),
    ('3 years old', 9, 18),
    ('4 years old', 9, 20);

-- License Number 10
INSERT INTO Classroom (type, license_number, capacity)
VALUES
    ('infant', 10, 8),
    ('toddler', 10, 12),
    ('twaddler', 10, 16),
    ('3 years old', 10, 18),
    ('4 years old', 10, 20);

-- For License Number 1
-- Assign up to 2 teachers for each class in License Number 1
INSERT INTO ClassTeacher (class_id, teacher_id)
SELECT CT1.class_id, T1.teacher_id
FROM (
    SELECT C1.class_id
    FROM Classroom AS C1
    WHERE C1.license_number = 1
) AS CT1
JOIN (
    SELECT T1.teacher_id
    FROM Teacher AS T1
    WHERE T1.license_number = 1
    LIMIT 2
) AS T1 ON 1=1;

-- -- For License Number 2
-- -- Assign up to 2 teachers for each class in License Number 2
INSERT INTO ClassTeacher (class_id, teacher_id)
SELECT CT2.class_id, T2.teacher_id
FROM (
    SELECT C2.class_id
    FROM Classroom AS C2
    WHERE C2.license_number = 2
) AS CT2
JOIN (
    SELECT T2.teacher_id
    FROM Teacher AS T2
    WHERE T2.license_number = 2
    LIMIT 2
) AS T2 ON 1=1;

-- -- For License Number 3
-- -- Assign up to 2 teachers for each class in License Number 3
INSERT INTO ClassTeacher (class_id, teacher_id)
SELECT CT3.class_id, T3.teacher_id
FROM (
    SELECT C3.class_id
    FROM Classroom AS C3
    WHERE C3.license_number = 3
) AS CT3
JOIN (
    SELECT T3.teacher_id
    FROM Teacher AS T3
    WHERE T3.license_number = 3
    LIMIT 2
) AS T3 ON 1=1;

-- -- For License Number 4
-- -- Assign up to 2 teachers for each class in License Number 4
INSERT INTO ClassTeacher (class_id, teacher_id)
SELECT CT4.class_id, T4.teacher_id
FROM (
    SELECT C4.class_id
    FROM Classroom AS C4
    WHERE C4.license_number = 4
) AS CT4
JOIN (
    SELECT T4.teacher_id
    FROM Teacher AS T4
    WHERE T4.license_number = 4
    LIMIT 2
) AS T4 ON 1=1;

-- -- For License Number 5
-- -- Assign up to 2 teachers for each class in License Number 5
INSERT INTO ClassTeacher (class_id, teacher_id)
SELECT CT5.class_id, T5.teacher_id
FROM (
    SELECT C5.class_id
    FROM Classroom AS C5
    WHERE C5.license_number = 5
) AS CT5
JOIN (
    SELECT T5.teacher_id
    FROM Teacher AS T5
    WHERE T5.license_number = 5
    LIMIT 2
) AS T5 ON 1=1;

-- ...

-- For License Number 1
INSERT INTO ClassChild (class_id, child_id)
SELECT C1.class_id, CH1.child_id
FROM Classroom AS C1
JOIN Child AS CH1 ON C1.type = CH1.type AND C1.license_number = CH1.license_number
WHERE C1.license_number = 1;

-- For License Number 2
INSERT INTO ClassChild (class_id, child_id)
SELECT C2.class_id, CH2.child_id
FROM Classroom AS C2
JOIN Child AS CH2 ON C2.type = CH2.type AND C2.license_number = CH2.license_number
WHERE C2.license_number = 2;

-- For License Number 3
INSERT INTO ClassChild (class_id, child_id)
SELECT C3.class_id, CH3.child_id
FROM Classroom AS C3
JOIN Child AS CH3 ON C3.type = CH3.type AND C3.license_number = CH3.license_number
WHERE C3.license_number = 3;

-- For License Number 4
INSERT INTO ClassChild (class_id, child_id)
SELECT C4.class_id, CH4.child_id
FROM Classroom AS C4
JOIN Child AS CH4 ON C4.type = CH4.type AND C4.license_number = CH4.license_number
WHERE C4.license_number = 4;

-- For License Number 5
INSERT INTO ClassChild (class_id, child_id)
SELECT C5.class_id, CH5.child_id
FROM Classroom AS C5
JOIN Child AS CH5 ON C5.type = CH5.type AND C5.license_number = CH5.license_number
WHERE C5.license_number = 5;


-- Entries with child_id not null and teacher_id null
INSERT INTO Attendance (week_number, day_number, in_time, out_time, teacher_id, child_id)
VALUES
(1, 1, '2023-01-02 08:30:00', '2023-01-02 16:00:00', NULL, 1),
(1, 2, '2023-01-03 08:30:00', '2023-01-03 16:00:00', NULL, 2),
(1, 3, '2023-01-04 08:30:00', '2023-01-04 16:00:00', NULL, 3);

-- Entries with child_id null and teacher_id not null
INSERT INTO Attendance (week_number, day_number, in_time, out_time, teacher_id, child_id)
VALUES
(1, 4, '2023-01-05 08:30:00', '2023-01-05 16:00:00', 1, NULL),
(1, 5, '2023-01-06 08:30:00', '2023-01-06 16:00:00', 2, NULL),
(1, 6, '2023-01-07 08:30:00', '2023-01-07 16:00:00', 3, NULL);

-- Other random entries with valid values
INSERT INTO Attendance (week_number, day_number, in_time, out_time, teacher_id, child_id)
VALUES
(2, 1, '2023-01-09 08:30:00', '2023-01-09 16:00:00', NULL, 4),
(2, 2, '2023-01-10 08:30:00', '2023-01-10 16:00:00', NULL, 5),
(2, 3, '2023-01-11 08:30:00', '2023-01-11 16:00:00', NULL, 6);

-- Entries with child_id not null and teacher_id null
INSERT INTO Attendance (week_number, day_number, in_time, out_time, teacher_id, child_id)
VALUES
(2, 4, '2023-01-12 08:30:00', '2023-01-12 16:00:00', NULL, 7),
(2, 5, '2023-01-13 08:30:00', '2023-01-13 16:00:00', NULL, 8),
(2, 6, '2023-01-14 08:30:00', '2023-01-14 16:00:00', NULL, 9);

-- Entries with child_id null and teacher_id not null
INSERT INTO Attendance (week_number, day_number, in_time, out_time, teacher_id, child_id)
VALUES
(2, 7, '2023-01-15 08:30:00', '2023-01-15 16:00:00', 4, NULL),
(2, 1, '2023-01-16 08:30:00', '2023-01-16 16:00:00', 5, NULL),
(2, 2, '2023-01-17 08:30:00', '2023-01-17 16:00:00', 6, NULL);

-- Other random entries with valid values
INSERT INTO Attendance (week_number, day_number, in_time, out_time, teacher_id, child_id)
VALUES
(3, 3, '2023-01-18 08:30:00', '2023-01-18 16:00:00', NULL, 10),
(3, 4, '2023-01-19 08:30:00', '2023-01-19 16:00:00', NULL, 11),
(3, 5, '2023-01-20 08:30:00', '2023-01-20 16:00:00', NULL, 12);

SELECT * FROM Ledger;

-- For License Number 1
-- Create Ledger entries for each class in License Number 1
INSERT INTO Ledger (child_id, confirm_status, payment_status, week_number, license_number)
SELECT CC1.child_id, RAND() < 0.5, RAND() < 0.5, FLOOR(RAND() * 52) + 1, 1
FROM ClassChild AS CC1
WHERE CC1.class_id IN (
    SELECT C1.class_id
    FROM Classroom AS C1
    WHERE C1.license_number = 1
);

-- For License Number 2
-- Create Ledger entries for each class in License Number 2
INSERT INTO Ledger (child_id, confirm_status, payment_status, week_number, license_number)
SELECT CC2.child_id, RAND() < 0.5, RAND() < 0.5, FLOOR(RAND() * 52) + 1, 2
FROM ClassChild AS CC2
WHERE CC2.class_id IN (
    SELECT C2.class_id
    FROM Classroom AS C2
    WHERE C2.license_number = 2
);

-- For License Number 3
-- Create Ledger entries for each class in License Number 3
INSERT INTO Ledger (child_id, confirm_status, payment_status, week_number, license_number)
SELECT CC3.child_id, RAND() < 0.5, RAND() < 0.5, FLOOR(RAND() * 52) + 1, 3
FROM ClassChild AS CC3
WHERE CC3.class_id IN (
    SELECT C3.class_id
    FROM Classroom AS C3
    WHERE C3.license_number = 3
);

-- For License Number 4
-- Create Ledger entries for each class in License Number 4
INSERT INTO Ledger (child_id, confirm_status, payment_status, week_number, license_number)
SELECT CC4.child_id, RAND() < 0.5, RAND() < 0.5, FLOOR(RAND() * 52) + 1, 4
FROM ClassChild AS CC4
WHERE CC4.class_id IN (
    SELECT C4.class_id
    FROM Classroom AS C4
    WHERE C4.license_number = 4
);

-- For License Number 5
-- Create Ledger entries for each class in License Number 5
INSERT INTO Ledger (child_id, confirm_status, payment_status, week_number, license_number)
SELECT CC5.child_id, RAND() < 0.5, RAND() < 0.5, FLOOR(RAND() * 52) + 1, 5
FROM ClassChild AS CC5
WHERE CC5.class_id IN (
    SELECT C5.class_id
    FROM Classroom AS C5
    WHERE C5.license_number = 5
);


-- Fee
INSERT INTO Fees (type, fee_per_week)
VALUES
('infant', 300),
('toddler', 275),
('twadler', 250),
('3 years old', 225),
('4 years old', 200);

UPDATE Child
SET type = 
    CASE
        WHEN type = 'Toddler' THEN 'toddler'
        WHEN type = 'Twaddler' THEN 'twaddler'
        WHEN type = '3 Years Old' THEN '3 years old'
        WHEN type = '4 Years Old' THEN '4 years old'
        ELSE type
    END
WHERE type IN ('Toddler', 'Twaddler', '3 Years Old', '4 Years Old');

UPDATE FacilityAdmin
SET license_number = facility_id
WHERE license_number IS NULL;
