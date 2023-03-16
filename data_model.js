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