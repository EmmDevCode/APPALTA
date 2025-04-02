import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function AddCardScreen() {
  router.push('/profile/Payment') // <-- Añade esta línea
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const handleSubmit = () => {
    // Validar y enviar a tu backend
    console.log('Tarjeta agregada:', cardData);
    // Navegar de vuelta
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Número de tarjeta"
        keyboardType="numeric"
        style={styles.input}
        value={cardData.number}
        onChangeText={(text) => setCardData({...cardData, number: text})}
      />
      <TextInput
        placeholder="MM/AA"
        style={styles.input}
        value={cardData.expiry}
        onChangeText={(text) => setCardData({...cardData, expiry: text})}
      />
      <TextInput
        placeholder="CVC"
        keyboardType="numeric"
        style={styles.input}
        value={cardData.cvc}
        onChangeText={(text) => setCardData({...cardData, cvc: text})}
      />
      <TextInput
        placeholder="Nombre en la tarjeta"
        style={styles.input}
        value={cardData.name}
        onChangeText={(text) => setCardData({...cardData, name: text})}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>Guardar Tarjeta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});