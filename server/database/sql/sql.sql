CREATE TABLE Users (
    id INT AUTO_INCREMENT,
    username VARCHAR(30),
    password VARCHAR(300),
    PRIMARY KEY(id)
);

CREATE TABLE Permissions (
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    action VARCHAR(30)
    PRIMARY KEY(id)
);

CREATE TABLE Roles (
    id INT AUTO_INCREMENT,
    rolName VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE RolPermissions(
    rolId INT AUTO_INCREMENT,
    permissionID INT,
    PRIMARY KEY(rolId, permissionID),
    FOREIGN KEY (rolId) REFERENCES Roles (id),
    FOREIGN KEY (permissionID) REFERENCES Permissions(id)
);