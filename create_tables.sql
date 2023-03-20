
CREATE TABLE department (
	departmentName varchar(255) NOT NULL,
	departmentNo varchar(128) NOT NULL,
	dep_created_at timestamp NOT NULL,
	dep_updated_at timestamp NOT NULL, PRIMARY KEY (departmentNo)
);
CREATE TABLE employee (
	password varchar(128) NOT NULL,
	employeeNo varchar(128) NOT NULL,  
	employeeName varchar(255) NOT NULL,	employeeStreet varchar(255) NULL,	
	employeeCity varchar(255) NULL,	employeeZipCode varchar(255) NULL,	
	employeeFaxNo varchar(255) NULL, employeeEmailAddress varchar(255) NULL,
	employeeWebAddress varchar(255) NULL,
	contactName varchar(255) NULL,
	contactTelNo varchar(128) NOT NULL, 
	contactFaxNo varchar(128) NOT NULL, 
	contactEmailAddress varchar(255) NULL, 
	departmentNo varchar(50) NOT NULL,
	emp_created_at timestamp NOT NULL,
	emp_updated_at timestamp NOT NULL, PRIMARY KEY (employeeNo), 
	CONSTRAINT FK_departmentNo FOREIGN KEY (departmentNo) REFERENCES department (departmentNo) ON DELETE CASCADE
);
CREATE TABLE service_agent (
	agentNo varchar(128) NOT NULL,  
	agentName varchar(255) NOT NULL,	agentStreet varchar(255) NULL,	
	agentCity varchar(255) NULL,	agentZipCode varchar(255) NULL,	
	agentFaxNo varchar(255) NULL, agentEmailAddress varchar(255) NULL,
	agentWebAddress varchar(255) NULL,
	agentTelNo varchar(128) NULL, 	
	sa_contactName varchar(255) NULL,
	sa_contactTelNo varchar(128) NOT NULL, 	
	sa_contactFaxNo varchar(128) NOT NULL, 
	sa_contactEmailAddress varchar(255) NULL, 
	sa_created_at timestamp NOT NULL,
	sa_updated_at timestamp NOT NULL, PRIMARY KEY (agentNo)
);
CREATE TABLE asset_status (
	statusName varchar(255) NOT NULL,
	statusNo varchar(50) NULL,
	as_created_at timestamp NOT NULL,
	as_updated_at timestamp NOT NULL, PRIMARY KEY (statusNo)
);
CREATE TABLE asset_category (
	assetDescription varchar(255) NOT NULL,
	assetCategoryNo varchar(50) NULL,
	asset_status_created_at timestamp NOT NULL,
	asset_status_updated_at timestamp NOT NULL, PRIMARY KEY (assetCategoryNo)
);
CREATE TABLE asset (
	assetNo varchar(128) NOT NULL,  
	assetDescription varchar(255) NOT NULL,
	dateAcquired varchar(50) NULL,
	purchasedPrice decimal(19, 2) DEFAULT NULL,
	currentValue decimal(19, 2) DEFAULT NULL,
	dateSold varchar(50) NULL,
	nextMaintenceDate varchar(50) NULL,
	employeeNo varchar(128) NOT NULL, 	
	assetCategoryNo varchar(128) NOT NULL, 
	statusNo varchar(128) NOT NULL, 	
	asset_created_at timestamp NOT NULL,
	asset_updated_at timestamp NOT NULL, PRIMARY KEY (assetNo), 
	CONSTRAINT FK_assetCategoryNo FOREIGN KEY (assetCategoryNo) REFERENCES asset_category (assetCategoryNo) ON DELETE CASCADE,
	CONSTRAINT FK_employeeNo FOREIGN KEY (employeeNo) REFERENCES employee (employeeNo) ON DELETE CASCADE,
	CONSTRAINT FK_statusNo FOREIGN KEY (statusNo) REFERENCES asset_status (statusNo) ON DELETE CASCADE
);
CREATE TABLE valuation (
	valuationNo varchar(128) NOT NULL,  
	valuationDate varchar(50) NULL,
	valuationCost decimal(19, 2) DEFAULT NULL,
	assetNo varchar(128) NOT NULL,
	employeeNo varchar(128) NOT NULL, 	
	val_created_at timestamp NOT NULL,
	val_updated_at timestamp NOT NULL, PRIMARY KEY (valuationNo), 
	CONSTRAINT  FOREIGN KEY (assetNo) REFERENCES asset (assetNo) ON DELETE CASCADE,
	CONSTRAINT FK_val_employeeNo FOREIGN KEY (employeeNo) REFERENCES employee (employeeNo) ON DELETE CASCADE
);
CREATE TABLE maintenance (
	maintenanceNo varchar(128) NOT NULL,  
	maintenanceDescription varchar(255) NOT NULL,
	maintenanceDate varchar(50) NULL,
	maintenanceCost decimal(19, 2) DEFAULT NULL,
	assetNo varchar(128) NOT NULL,
	employeeNo varchar(128) NOT NULL, 	
	agentNo varchar(128) NOT NULL, 
	ma_created_at timestamp NOT NULL,
	ma_updated_at timestamp NOT NULL, PRIMARY KEY (maintenanceNo), 
	CONSTRAINT FK_main_assetNo FOREIGN KEY (assetNo) REFERENCES asset (assetNo) ON DELETE CASCADE,
	CONSTRAINT FK_main_employeeNo FOREIGN KEY (employeeNo) REFERENCES employee (employeeNo) ON DELETE CASCADE,
	CONSTRAINT FK_main_agentNo FOREIGN KEY (agentNo) REFERENCES service_agent (agentNo) ON DELETE CASCADE
);

CREATE TABLE audit_log (
	old longtext NULL,
	new longtext NULL,
	as_updated_at timestamp NOT NULL
)
