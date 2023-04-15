export class Part {
    partID = null;
    partName = null;
    price = null;
    partPerBox = null;
    availablePieces = null;
    missingQuantity = null;

    constructor(partID, partName, price, partPerBox, availablePieces, missingQuantity) {
        this.partID = partID;
        this.partName = partName;
        this.price = price;
        this.partPerBox = partPerBox;
        this.availablePieces = availablePieces;
        this.missingQuantity = missingQuantity;
    }
}

export class Project {
    project_address = null;
    description = null;
    orderDate = null;
    workingTime = null;
    laborFee = null;
    materialCost = null;
    price = null;
    stateName = null;
    stateID = null;
    projectID = null;

    constructor(project_address, description, orderDate, workingTime, laborFee, stateID, stateName, projectID, price, materialCost) {
        this.project_address = project_address;
        this.description = description;
        this.orderDate = orderDate;
        this.workingTime = workingTime;
        this.laborFee = laborFee;
        this.materialCost = materialCost;
        this.price = price;
        this.stateName = stateName;
        this.stateID = stateID;
        this.projectID = projectID;
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

export class Draft {
    part = new Part();
    reguiredQuantity = null;

    constructor(part, reguiredQuantity) {
        this.part = part;
        this.reguiredQuantity = reguiredQuantity;
    }
}
