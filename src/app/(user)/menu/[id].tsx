import { useProduct } from "@/src/api/products";
import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);
  const { addItem } = useCart();
  const [selectedSize, setSetselectedSize] = useState<PizzaSize>("M");
  const router = useRouter();

  const addToCard = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <View>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
        />

        <View>
          <Text>Select Size</Text>
          <View style={styles.sizeContainer}>
            <Pressable
              style={[
                styles.sizeButton,
                selectedSize === "S" ? { backgroundColor: "gainsboro" } : {},
              ]}
              onPress={() => setSetselectedSize("S")}
            >
              <Text style={{ fontSize: 20, fontWeight: "500" }}>S</Text>
            </Pressable>
            <Pressable
              style={[
                styles.sizeButton,
                selectedSize === "M" ? { backgroundColor: "gainsboro" } : {},
              ]}
              onPress={() => setSetselectedSize("M")}
            >
              <Text style={{ fontSize: 20, fontWeight: "500" }}>M</Text>
            </Pressable>
            <Pressable
              style={[
                styles.sizeButton,
                selectedSize === "L" ? { backgroundColor: "gainsboro" } : {},
              ]}
              onPress={() => setSetselectedSize("L")}
            >
              <Text style={{ fontSize: 20, fontWeight: "500" }}>L</Text>
            </Pressable>
            <Pressable
              style={[
                styles.sizeButton,
                selectedSize === "XL" ? { backgroundColor: "gainsboro" } : {},
              ]}
              onPress={() => setSetselectedSize("XL")}
            >
              <Text style={{ fontSize: 20, fontWeight: "500" }}>XL</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: "auto",
        }}
      >
        <Text style={styles.priceText}>Price: ${product?.price}</Text>
        <Button text="Add to Cart" onPress={addToCard} />
      </View>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  sizeButton: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  addToCartButton: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    color: "white",
  },
});
