/**
 * FlatList supported types
 * {@link FlatList}
 */
// Generic item
type Item = {
  [name: string]: string;
};

export interface ItemData<T> {
  item: T;
}
