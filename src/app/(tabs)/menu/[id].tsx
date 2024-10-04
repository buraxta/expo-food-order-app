import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/myData/products";
import Colors from "@/src/constants/Colors";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Button from "@/src/components/Button";

const ProductDetailsScreen = () => {
  const [pressed, setPressed] = useState("");
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id === Number(id));

  const addToCard = () => {
    console.warn("Add to cart");
  };

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
                pressed === "S" ? { backgroundColor: "gainsboro" } : {},
              ]}
              onPress={() => setPressed("S")}
            >
              <Text style={{ fontSize: 20, fontWeight: "500" }}>S</Text>
            </Pressable>
            <Pressable
              style={[
                styles.sizeButton,
                pressed === "M" ? { backgroundColor: "gainsboro" } : {},
              ]}
              onPress={() => setPressed("M")}
            >
              <Text style={{ fontSize: 20, fontWeight: "500" }}>M</Text>
            </Pressable>
            <Pressable
              style={[
                styles.sizeButton,
                pressed === "L" ? { backgroundColor: "gainsboro" } : {},
              ]}
              onPress={() => setPressed("L")}
            >
              <Text style={{ fontSize: 20, fontWeight: "500" }}>L</Text>
            </Pressable>
            <Pressable
              style={[
                styles.sizeButton,
                pressed === "XL" ? { backgroundColor: "gainsboro" } : {},
              ]}
              onPress={() => setPressed("XL")}
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
