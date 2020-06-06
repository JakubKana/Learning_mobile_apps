import { Product } from "../../models/product";

export type State = {
  availableProducts: Array<Product>;
  userProducts: Array<Product>;
};
