export class Part {
    partID = null;
    partName = null;
    price = null;
    partPerBox = null;
    availablePieces = null;

    constructor(partID, partName, price, partPerBox, availablePieces) {
        this.partID = partID;
        this.partName = partName;
        this.price = price;
        this.partPerBox = partPerBox;
        this.availablePieces = this.availablePieces;
    }
}

export class Project {
    project_address = null;
    description = null;
    orderDate = null;
    workingTime = null;
    laborFee = null;
    stateID = null;
    stateName = null;
    
    constructor(project_address, description, orderDate, workingTime, laborFee, stateID, stateName){
        this.project_address = project_address;
        this.description = description;
        this.orderDate = orderDate;
        this.workingTime = workingTime;
        this.laborFee = laborFee;
        this.stateName = stateName;
        this.stateID = stateID;
    }
}

export class Customer {
    name = null;
    customerSSN = null;
    address = null;
    phone = null;
    email = null;

    constructor(name, customerSSN, address, phone, email) {
        this.name = name;
        this.customerSSN = customerSSN;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }
}