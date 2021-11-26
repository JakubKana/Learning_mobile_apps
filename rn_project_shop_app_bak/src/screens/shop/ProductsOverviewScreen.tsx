import React, { useState, useEffect, useCallback } from "react";
import { FlatList, Platform, Button, ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ProductItem } from "../../components/shop/ProductItem";
import { RootState, ProductsNavigatorStackParamList } from "./types";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import { Base } from "../../constants/Colors";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { CustomHeaderButton } from "../../components/UI/HeaderButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";

type ProductsOverviewScreenNavigationProp = StackNavigationProp<ProductsNavigatorStackParamList, "ProductsOverview">;

type ProductsOverviewDrawerNavigationProp = DrawerNavigationProp<ProductsNavigatorStackParamList, "ProductsOverview">;

type ProductsOverviewScreenRouteProp = RouteProp<ProductsNavigatorStackParamList, "ProductsOverview">;

interface ProductsOverviewScreenProps {
  navigation: ProductsOverviewScreenNavigationProp;
  route: ProductsOverviewScreenRouteProp;
}

const ProductsOverviewScreen = (props: ProductsOverviewScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const products = useSelector((state: RootState) => state.products.availableProducts);

  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsRefreshing]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      loadProducts();
      // clean up function
      return () => {
        unsubscribe();
      };
    });
  }, [loadProducts, props.navigation]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id: string, title: string) => {
    props.navigation.navigate("ProductDetail", { productId: id, productTitle: title });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
        <Button title="Try again!" onPress={loadProducts} color={Base.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Base.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}>
          <Button
            color={Base.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Base.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export const screenOptions = (navData: { navigation: ProductsOverviewDrawerNavigationProp }) => {
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
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export { ProductsOverviewScreen };
