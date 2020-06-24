import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CustomHeaderButton } from "../components/CustomHeaderButton";
import { isAndroid } from "../lib/platform";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { KEYS } from "../navigation/NavigationKeys";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/types";
import { Place } from "../models/place";
import { PlaceItem } from "../components/PlaceItem";
import * as placesActions from "../store/actions/places";

interface PlacesListScreenProps {
  navigation: StackNavigationProp;
}

const PlacesListScreen = (props: PlacesListScreenProps) => {
  const places: Place[] = useSelector((state: RootState) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
          image={itemData.item.imageUri}
          onSelect={() => {
            props.navigation.navigate(KEYS.PlaceDetail, {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
          title={itemData.item.title}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = (navData: { navigation: StackNavigationProp }) => {
  return {
    headerTitle: "All Places",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add Place"
          iconName={isAndroid() ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate(KEYS.NewPlace);
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export { PlacesListScreen };
