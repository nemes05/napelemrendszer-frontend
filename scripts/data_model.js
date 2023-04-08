export class Part {
    partID = null;
    partName = null;
    price = null;
    partPerBox = null;

    constructor(partID, partName, price, partPerBox) {
        this.partID = partID;
        this.partName = partName;
        this.price = price;
        this.partPerBox = partPerBox;
    }
}

export class Project {
    project_address = null;
    description = null;
    
    constructor(project_address, description){
        this.project_address = project_address;
        this.description = description;
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