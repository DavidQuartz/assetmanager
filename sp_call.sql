
DELIMITER $$
CREATE PROCEDURE add_employee_procedure (
	IN employeeNo varchar(128),  	
	IN password varchar(128),
	IN employeeName varchar(255),	
	IN employeeStreet varchar(255),	
	IN employeeCity varchar(255),	
	IN employeeZipCode varchar(255),	
	IN employeeFaxNo varchar(255), 
	IN employeeEmailAddress varchar(255),
	IN employeeWebAddress varchar(255),
	IN contactName varchar(255),
	IN contactTelNo varchar(128), 
	IN contactFaxNo varchar(128), 
	IN contactEmailAddress varchar(255), 
	IN departmentNo varchar(50),
	IN emp_created_at timestamp,
	IN emp_updated_at timestamp
)
BEGIN
    INSERT INTO employee (password, employeeNo, employeeName, employeeStreet, employeeCity, employeeZipCode, employeeFaxNo, employeeEmailAddress, employeeWebAddress, contactName, contactTelNo, contactFaxNo, contactEmailAddress, departmentNo, emp_created_at, emp_updated_at)
    VALUES (password, employeeNo, employeeName, employeeStreet, employeeCity, employeeZipCode, employeeFaxNo, employeeEmailAddress, employeeWebAddress, contactName, contactTelNo, contactFaxNo, contactEmailAddress, departmentNo, emp_created_at, emp_updated_at);
END $$

CREATE PROCEDURE add_service_agent_procedure (	
	IN agentNo varchar(128),  
	IN agentName varchar(255),	
	IN agentStreet varchar(255),	
	IN agentCity varchar(255),	
	IN agentZipCode varchar(255),	
	IN agentFaxNo varchar(255), 
	IN agentEmailAddress varchar(255),
	IN agentWebAddress varchar(255),
	IN agentTelNo varchar(128), 	
	IN sa_contactName varchar(255),
	IN sa_contactTelNo varchar(128), 	
	IN sa_contactFaxNo varchar(128), 
	IN sa_contactEmailAddress varchar(255), 
	IN sa_updated_at timestamp
)
BEGIN
    INSERT INTO service_agent (agentNo, agentName, agentStreet, agentCity, agentZipCode, agentFaxNo, agentEmailAddress, agentWebAddress, agentTelNo, sa_contactName, sa_contactTelNo, sa_contactTelNo, sa_contactFaxNo, sa_contactEmailAddress, sa_updated_at)
    VALUES (agentNo, agentName, agentStreet, agentCity, agentZipCode, agentFaxNo, agentEmailAddress, agentWebAddress, agentTelNo, sa_contactName, sa_contactTelNo, sa_contactTelNo, sa_contactFaxNo, sa_contactEmailAddress, sa_updated_at);
END $$

CREATE PROCEDURE add_asset_procedure (	
	IN assetNo varchar(128),  
	IN assetDescription varchar(255),
	IN dateAcquired varchar(50),
	IN purchasedPrice decimal(19, 2),
	IN currentValue decimal(19, 2),
	IN dateSold varchar(50),
	IN nextMaintenceDate varchar(50),
	IN employeeNo varchar(128), 	
	IN assetCategoryNo varchar(128), 
	IN statusNo varchar(128), 	
	IN asset_updated_at timestamp 
)
BEGIN
    INSERT INTO asset (assetNo, assetDescription, dateAcquired, purchasedPrice, currentValue, dateSold, nextMaintenceDate, employeeNo, assetCategoryNo, statusNo, asset_updated_at)
    VALUES (assetNo, assetDescription, dateAcquired, purchasedPrice, currentValue, dateSold, nextMaintenceDate, employeeNo, assetCategoryNo, statusNo, asset_updated_at);
END $$

CREATE PROCEDURE update_asset_procedure (	
	IN assetNo varchar(128),  
	IN assetDescription varchar(255),
	IN dateAcquired varchar(50),
	IN purchasedPrice decimal(19, 2),
	IN currentValue decimal(19, 2),
	IN dateSold varchar(50),
	IN nextMaintenceDate varchar(50),
	IN employeeNo varchar(128), 	
	IN assetCategoryNo varchar(128), 
	IN statusNo varchar(128), 	
	IN asset_updated_at timestamp 
)
BEGIN
    UPDATE asset set assetDescription=assetDescription, dateAcquired=dateAcquired, purchasedPrice=purchasedPrice, currentValue=currentValue, dateSold=dateSold, nextMaintenceDate=nextMaintenceDate, employeeNo=employeeNo, assetCategoryNo=assetCategoryNo, statusNo=statusNo, asset_updated_at=asset_updated_at WHERE assetNo=assetNo;
END $$

CREATE PROCEDURE delete_asset_procedure (	
	IN assetNo varchar(128)
)
BEGIN
    DELETE FROM asset WHERE assetNo=assetNo;
END $$

DELIMITER ;
