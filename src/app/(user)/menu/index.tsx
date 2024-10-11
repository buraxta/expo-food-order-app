import { FlatList, View } from "react-native";
import products from "@assets/myData/products";
import ProductListItem from "@components/ProductListItem";
import { Stack } from "expo-router";

export default function MenuScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: "User Menu" }} />

      <FlatList
        data={products}
        renderItem={({ item }) => {
          return <ProductListItem product={item} />;
        }}
        numColumns={2}
        contentContainerStyle={{
          padding: 10,
          gap: 10,
        }}
        columnWrapperStyle={{
          gap: 10,
        }}
      />
    </View>
  );
}
