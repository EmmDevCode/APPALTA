import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";

export default function EditAddress() {
  const params = useLocalSearchParams();
  const [address, setAddress] = useState({
    id: params.id as string,
    name: params.name as string || '',
    address: params.address as string || ''
  });

  const handleSave = () => {
    // Aquí iría la llamada al backend
    router.setParams({
      updatedAddress: JSON.stringify(address)
    });
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={address.name}
          onChangeText={(text) => setAddress({...address, name: text})}
        />

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={address.address}
          onChangeText={(text) => setAddress({...address, address: text})}
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Reutiliza los mismos estilos de add.tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
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