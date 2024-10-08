import orders from "@/assets/myData/orders";
import OrderListItem from "@/src/components/OrderListItem";
import { Text, FlatList } from "react-native";

export default function OrdersScreen() {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
