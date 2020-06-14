import React from "react";
import { FlatList, Platform, Button, Alert } from "react-native";

import { ProductItem } from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../shop/types";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { CustomHeaderButton } from "../../components/UI/HeaderButton";
import { NavigationDrawerProp } from "react-navigation-drawer";
import { Base } from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/products";
import { KEYS } from "../../navigation/NavigationKeys";

interface UserProductsScreenProps {
  navigation: NavigationDrawerProp;
}

const UserProductsScreen = (props: UserProductsScreenProps) => {
  const userProducts = useSelector((state: RootState) => state.products.userProducts);
  const dispatch = useDispatch();
  const editProductHandler = (id: string) => {
    props.navigation.navigate(KEYS.EditProduct, { productId: id });
  };
  const deleteHandler = id => {
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

UserProductsScreen.navigationOptions = (navData: { navigation: any }) => {
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
            navData.navigation.navigate(KEYS.EditProduct);
          }}
        />
      </HeaderButtons>
    ),
  };
};

export { UserProductsScreen };
