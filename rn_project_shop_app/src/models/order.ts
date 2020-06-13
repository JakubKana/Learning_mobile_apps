import { CartItem } from "../screens/shop/CartScreen";

class Order {
  private _id: string;
  private _items: CartItem[];
  private _totalAmount: number;
  private _date: Date;

  constructor(id: string, items: CartItem[], totalAmount: number, date: Date) {
    this._id = id;
    this._items = items;
    this._totalAmount = totalAmount;
    this._date = date;
  }

  public get id(): string {
    return this._id;
  }

  public get items(): CartItem[] {
    return this._items;
  }
  public get date(): Date {
    return this._date;
  }

  public get totalAmount(): number {
    return this._totalAmount;
  }
}

export { Order };
