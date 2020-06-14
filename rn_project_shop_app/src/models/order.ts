import { CartItem } from "../screens/shop/CartScreen";
import moment from "moment";

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

  get readableDate() {
    // return this._date.toLocaleDateString("en-EN", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    // });
    return moment(this.date).format("MMMM Do YYYY, hh:mm");
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
