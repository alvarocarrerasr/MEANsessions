CREATE TABLE Users (
    id INT AUTO_INCREMENT,
    username VARCHAR(30) UNIQUE,
    password VARCHAR(300),
    PRIMARY KEY(id)
);

CREATE TABLE Permissions (
    permissionName VARCHAR(30),
    PRIMARY KEY(permissionName)
);

CREATE TABLE Groups (
    id INT AUTO_INCREMENT,
    groupName VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE GroupPermissions (
    permissionName VARCHAR(30),
    groupId INT,
    PRIMARY KEY (permissionName, groupId),
    FOREIGN KEY(permissionName) REFERENCES Permissions (permissionName),
    FOREIGN KEY (groupId) REFERENCES Groups (id)
);

CREATE TABLE GroupMembers(
    groupId INT,
    member INT,
    PRIMARY KEY(groupId, member),
    FOREIGN KEY (groupId) REFERENCES Groups (id),
    FOREIGN KEY (member) REFERENCES Users (id) 
)