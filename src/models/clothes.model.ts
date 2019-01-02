export interface ClothesInterface {
    id: string;
    description: string;
    brand: string;
    store: string;
    size: string;    
    category: string;
    colour: string;
    state: string;
    img: string;
    imgdetail: string;
}

export class Clothes implements ClothesInterface {
    private _id = '';
    private _description = '';
    private _brand = '';
    private _store = '';
    private _size = '';
    private _category = '';
    private _colour = '';
    private _state = '';
    private _img = '';
    private _imgdetail = '';


    get id(): string { return this._id; }
    set id(id: string) { this._id = (id != null) ? id : ""; }

    get description(): string { return this._description; }
    set description(description: string) { this._description = (description != null) ? description : ""; }

    get brand(): string { return this._brand; }
    set brand(brand: string) { this._brand = (brand != null) ? brand : ""; }

    get store(): string { return this._store; }
    set store(store: string) { this._store = (store != null) ? store : ""; }

    get size(): string { return this._size; }
    set size(size: string) { this._size = (size != null) ? size : ""; }

    get category(): string { return this._category; }
    set category(category: string) { this._category = (category != null) ? category : ""; }

    get colour(): string { return this._colour; }
    set colour(colour: string) { this._colour = (colour != null) ? colour : ""; }

    get state(): string { return this._state; }
    set state(state: string) { this._state = (state != null) ? state : ""; }

    get img(): string { return this._img; }
    set img(img: string) { this._img = (img != null) ? img : ""; }

    get imgdetail(): string { return this._imgdetail; }
    set imgdetail(imgdetail: string) { this._imgdetail = (imgdetail != null) ? imgdetail : ""; }

    constructor(
        id?: string,
        description?: string,
        brand?: string,
        store?: string,
        size?: string,
        category?: string,
        colour?: string,
        state?: string,
        img?: string,
        imgdetail?: string,
    ){
        this.id = id;
        this.description = description;
        this.brand = brand;
        this.store = store;
        this.size = size;
        this.category = category;
        this.colour = colour;
        this.state = state;
        this.img = img;
        this.imgdetail = imgdetail;
    }

}
