import React, { useState, useEffect } from "react"
import firestore from "@react-native-firebase/firestore"
import { FlatList } from "react-native"

import { styles } from "./styles"
import { Product, ProductProps } from "../Product"

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([])

  useEffect(() => {
    firestore()
      .collection("products")
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as ProductProps[]
        setProducts(data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  )
}
