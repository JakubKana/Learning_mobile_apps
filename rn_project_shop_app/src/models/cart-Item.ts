class CartItem {
  private _quantity: number;
  private _title: string;
  private _price: number;
  private _sum: number;
  private _pushToken: string;

  constructor(quantity: number, price: number, title: string, pushToken: string, sum: number) {
    this._quantity = quantity;
    this._title = title;
    this._price = price;
    this._sum = sum;
    this._pushToken = pushToken;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public get title(): string {
    return this._title;
  }
  public get sum(): number {
    return this._sum;
  }

  public get price(): number {
    return this._price;
  }

  public get pushToken(): string {
    return this._pushToken;
  }
}

export { CartItem };
