import React from "react";
import { FlatList, Platform, Button, Alert, View, Text, StyleSheet } from "react-native";

import { ProductItem } from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AdminNavigatorStackParamList } from "../shop/types";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { CustomHeaderButton } from "../../components/UI/HeaderButton";
import { Base } from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/products";
import { StackNavigationProp } from "@react-navigation/stack";

type AdminStackNavigationProp = StackNavigationProp<AdminNavigatorStackParamList, "UserProducts">;

interface UserProductsScreenProps {
  navigation: AdminStackNavigationProp;
}

const UserProductsScreen = (props: UserProductsScreenProps) => {
  const userProducts = useSelector((state: RootState) => state.products.userProducts);
  const dispatch = useDispatch();
  const editProductHandler = (id: string) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };
  const deleteHandler = (id: string) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      {
        text: "No",
        style: "default",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found, maybe start creating some?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}>
          <Button
            color={Base.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button color={Base.primary} title="Delete" onPress={() => deleteHandler(itemData.item.id)} />
        </ProductItem>
      )}
    />
  );
};

export const screenOptions = (navData: { navigation: any }) => {
  return {
    headerTitle: "Your Products",
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
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { UserProductsScreen };
