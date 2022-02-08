import React, { useEffect, useState } from "react"
import storage from "@react-native-firebase/storage"
import { FlatList } from "react-native"

import { Container, PhotoInfo } from "./styles"
import { Header } from "../../components/Header"
import { Photo } from "../../components/Photo"
import { File, FileProps } from "../../components/File"

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([])
  const [photoSelected, setPhotoSelected] = useState("")

  useEffect(() => {
    fetchPhotos()
  }, [])

  async function fetchPhotos() {
    storage()
      .ref("/images")
      .list()
      .then((result) => {
        const files: FileProps[] = []
        result.items.forEach((file) => {
          files.push({
            name: file.name,
            path: file.fullPath,
          })
        })
        setPhotos(files)
      })
      .catch((err) => console.error(err))
  }

  async function handleShowImage(path: string) {
    try {
      const urlImage = await storage().ref(path).getDownloadURL()

      setPhotoSelected(urlImage)
    } catch (err) {
      console.error(err)
    }
  }
  async function handleDeleteImage(path: string) {
    try {
      await storage().ref(path).delete()
      fetchPhotos()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={photoSelected} />

      <PhotoInfo>Informações da foto</PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => handleDeleteImage(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", padding: 24 }}
      />
    </Container>
  )
}
