import React, { useState } from "react"
import auth from "@react-native-firebase/auth"

import { Container, Account, Title, Subtitle } from "./styles"
import { ButtonText } from "../../components/ButtonText"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { Alert } from "react-native"

export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleCreateUser() {
    try {
      await auth().createUserWithEmailAndPassword(email, password)
      Alert.alert("Usuário criado com sucesso!")
    } catch (err) {
      console.error(err)
    }
  }

  async function handleSignInWithEmailAndPassword() {
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password)
      console.log(user)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUser} />
      </Account>
    </Container>
  )
}
