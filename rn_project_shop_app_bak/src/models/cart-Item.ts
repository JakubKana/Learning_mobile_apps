class CartItem {
  private _quantity: number;
  private _title: string;
  private _price: number;
  private _sum: number;

  constructor(quantity: number, price: number, title: string, sum: number) {
    this._quantity = quantity;
    this._title = title;
    this._price = price;
    this._sum = sum;
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
}

export { CartItem };
