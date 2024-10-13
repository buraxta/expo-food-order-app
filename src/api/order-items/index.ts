import { supabase } from "@/src/lib/supabase";
import { InsertTables } from "./../../types";
import { useMutation } from "@tanstack/react-query";

export const useInsertOrderItems = () => {
  return useMutation({
    async mutationFn(items: InsertTables<"order_item">[]) {
      const { error, data: newProduct } = await supabase
        .from("order_item")
        .insert(items)
        .select();
      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
  });
};
