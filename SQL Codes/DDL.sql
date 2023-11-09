CREATE DATABASE CMS; 
-- DROP DATABASE CMS;
use CMS;

CREATE TABLE SystemAdmin (
    name VARCHAR(255),
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255)
);

CREATE TABLE FacilityAdmin (
    facility_id INT UNIQUE AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    license_number INT
);
CREATE TABLE Facility (
    license_number INT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    facility_admin INT UNIQUE,
    FOREIGN KEY (facility_admin) REFERENCES FacilityAdmin(facility_id)
);
CREATE TABLE Teacher (
    teacher_id INT UNIQUE AUTO_INCREMENT,
    email VARCHAR(255),
    password VARCHAR(255),
    name VARCHAR(255),
    dob DATE,
    address VARCHAR(255),
    phone_number VARCHAR(15),
    hour_salary DECIMAL(10, 2),
    license_number INT,
    PRIMARY KEY (email, license_number),
    FOREIGN KEY (license_number) REFERENCES Facility(license_number)
);
CREATE TABLE Parent (
    parent_id INT UNIQUE AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    ph_number VARCHAR(15),
    address VARCHAR(255)
);
CREATE TABLE Child (
    child_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    dob DATE,
    allergies VARCHAR(255),
    parent_id INT,
    consent_Form BOOL,
    license_number INT,
    type VARCHAR(255),
    FOREIGN KEY (parent_id) REFERENCES Parent(parent_id),
    FOREIGN KEY (license_number) REFERENCES Facility(license_number)
);
CREATE TABLE Classroom (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255),
    capacity INT,
    license_number INT,
    FOREIGN KEY (license_number) REFERENCES Facility(license_number)
);
CREATE TABLE ClassTeacher (
    class_id INT,
    teacher_id INT,
    FOREIGN KEY (class_id) REFERENCES Classroom(class_id),
    FOREIGN KEY (teacher_id) REFERENCES Teacher(teacher_id)
);
CREATE TABLE ClassChild (
    class_id INT,
    child_id INT,
    FOREIGN KEY (class_id) REFERENCES Classroom(class_id),
    FOREIGN KEY (child_id) REFERENCES Child(child_id)
);
CREATE TABLE Attendance (
    week_number INT,
    day_number INT,
    in_time DATETIME,
    out_time DATETIME,
    teacher_id INT,
    child_id INT,
    FOREIGN KEY (teacher_id) REFERENCES Teacher(teacher_id),
    FOREIGN KEY (child_id) REFERENCES Child(child_id)
);
CREATE TABLE Fees (
    Type VARCHAR(255),
    fee_per_week DECIMAL(10, 2)
);
CREATE TABLE Ledger (
    child_id INT,
    confirm_status VARCHAR(255),
    payment_status VARCHAR(255),
    week_number INT,
    license_number INT,
    FOREIGN KEY (child_id) REFERENCES Child(child_id),
    FOREIGN KEY (license_number) REFERENCES Facility(license_number)
);




