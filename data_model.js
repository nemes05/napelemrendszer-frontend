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

    /*set partID(id) {
        this.#partID = id;
    }

    set partName(name) {
        this.#partName = name;
    }

    set price(pr) {
        this.#price = pr;
    }

    set partPerBox(part) {
        this.#partPerBox = part;
    }*/
}