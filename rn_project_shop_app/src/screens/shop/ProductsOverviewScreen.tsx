import React from "react";
import { FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ProductItem } from "../../components/shop/ProductItem";
import { NavigationStackProp } from "react-navigation-stack";
import { KEYS } from "../../navigation/NavigationKeys";
import { RootState } from "./types";
import * as cartActions from "../../store/actions/cart";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { CustomHeaderButton } from "../../components/UI/HeaderButton";

interface ProductsOverviewScreenProps {
  navigation: NavigationStackProp;
}

const ProductsOverviewScreen = (props: ProductsOverviewScreenProps) => {
  const products = useSelector((state: RootState) => state.products.availableProducts);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
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

ProductsOverviewScreen.navigationOptions = (navData: { navigation: any }) => {
  return {
    headerTitle: "All Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate(KEYS.Cart);
          }}
        />
      </HeaderButtons>
    ),
  };
};

export { ProductsOverviewScreen };
