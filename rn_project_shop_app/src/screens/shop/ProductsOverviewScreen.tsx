import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { ProductItem } from "../../components/shop/ProductItem";
import { NavigationStackProp } from "react-navigation-stack";
import { KEYS } from "../../navigation/NavigationKeys";
import { RootState } from "./types";

interface ProductsOverviewScreenProps {
  navigation: NavigationStackProp;
}

const ProductsOverviewScreen = (props: ProductsOverviewScreenProps) => {
  const products = useSelector((state: RootState) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onAddToCart={() => {}}
          onViewDetail={() => {
            props.navigation.navigate({
              routeName: KEYS.ProductDetail,
              params: { productId: itemData.item.id, productTitle: itemData.item.title },
            });
          }}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

export { ProductsOverviewScreen };
