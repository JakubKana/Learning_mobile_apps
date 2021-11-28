class Product {
  private _id: string;
  private _ownerId: string;
  private _title: string;
  private _imageUrl: string;
  private _description: string;
  private _price: number;
  private _ownerPushToken: string;

  constructor(
    id: string,
    ownerId: string,
    ownerPushToken: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number,
  ) {
    this._id = id;
    this._ownerId = ownerId;
    this._title = title;
    this._imageUrl = imageUrl;
    this._description = description;
    this._price = price;
    this._ownerPushToken = ownerPushToken;
  }

  public get id(): string {
    return this._id;
  }

  public get ownerId(): string {
    return this._ownerId;
  }

  public get title(): string {
    return this._title;
  }

  public get imageUrl(): string {
    return this._imageUrl;
  }

  public get description(): string {
    return this._description;
  }

  public get price(): number {
    return this._price;
  }
  public get ownerPushToken(): string {
    return this._ownerPushToken;
  }
}

export { Product };
