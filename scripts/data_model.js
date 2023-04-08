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
    address = null;
    description = null;
    
    constructor(address, description){
        this.address = address;
        this.description = description;
    }
}

export class Customer {
    name = null;
    SSN = null;
    home_address = null;
    phone_number = null;
    email = null;

    constructor(name, SSN, home_address, phone_number, email) {
        this.name = name;
        this.SSN = SSN;
        this.home_address = home_address;
        this.phone_number = phone_number;
        this.email = email
    }
}