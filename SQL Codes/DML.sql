use CMS;
-- INSERT INTO SystemAdmin (name, email, password)
-- VALUES ('Krishna', 'krishna323@gmail.com', '123');

SELECT password FROM SystemAdmin WHERE email = 'afa';

-- DELETE FROM SystemAdmin WHERE id = 3;

INSERT INTO FacilityAdmin (name, email, password, license_number)
VALUES
    ('FacilityAdmin1', 'FA1@cms.in',123, 1),
    ('FacilityAdmin2', 'FA2@cms.in',123, 2),
    ('FacilityAdmin3', 'FA3@cms.in',123, 3);
    
INSERT INTO Child (name, dob, allergies, parent_id, consent_Form, license_number)
VALUES ('John Doe', '2020-05-15', 'None', 1, 1, 12345);
