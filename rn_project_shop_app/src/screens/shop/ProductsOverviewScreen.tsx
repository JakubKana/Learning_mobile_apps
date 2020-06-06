import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { State } from "../../store/reducers/types";

interface ProductsOverviewScreenProps {}

type RootState = { products: State };

const ProductsOverviewScreen = (_props: ProductsOverviewScreenProps) => {
  const products = useSelector((state: RootState) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => <Text>{itemData.item.title}</Text>}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

export { ProductsOverviewScreen };
