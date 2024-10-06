import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/myData/products";
import Colors from "@/src/constants/Colors";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { FontAwesome } from "@expo/vector-icons";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id === Number(id));
  const { addItem } = useCart();
  const [selectedSize, setSetselectedSize] = useState<PizzaSize>("M");
  const router = useRouter();

  const addToCard = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create/?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <View>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
        />
      </View>

      <Text style={styles.priceText}>Title: {product?.name}</Text>
      <Text style={styles.priceText}>Price: ${product?.price}</Text>
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
