export interface ClothesInterface {
    id: string;
    description: string;
    brand: string;
    store: string;
    size: string;    
    category: string;
    colour: string;
    colourBadge: string;
    state: string;
    img: string;
}

export class Clothes implements ClothesInterface {
    private _id = '';
    private _description = '';
    private _brand = '';
    private _store = '';
    private _size = '';
    private _category = '';
    private _colour = '';
    private _colourBadge = '';
    private _state = '';
    private _img = '';

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
    
    get colourBadge(): string { return this._colourBadge; }
    set colourBadge(colourBadge: string) { 
      
        switch(this.colour){
          case 'white':
          this._colourBadge = 'snow';
          break;

          case 'red':
          this._colourBadge = 'darkred';
          break;

          case 'blue':
          this._colourBadge = 'navy';
          break;

          case 'brown':
          this._colourBadge = 'saddlebrown';
          break;
          
          default:
          this._colourBadge = this.colour;
          break;
        }
    }

    constructor(
        id?: string,
        description?: string,
        brand?: string,
        store?: string,
        size?: string,
        category?: string,
        colour?: string,
        colourBadge?: string,
        state?: string,
        img?: string,
    ){
        this.id = id;
        this.description = description;
        this.brand = brand;
        this.store = store;
        this.size = size;
        this.category = category;
        this.colour = colour;
        this.colourBadge = colourBadge;
        this.state = state;
        this.img = img;
    }

}
