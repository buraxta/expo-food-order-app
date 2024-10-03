import { Image, StyleSheet } from "react-native";
import { Text, View } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import products from "@/assets/myData/products";
const product = products[0];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  price: {
    // fontSize: 20,
    fontWeight: "bold",
    // marginVertical: 10,
    color: Colors.light.tint,
  },
});
