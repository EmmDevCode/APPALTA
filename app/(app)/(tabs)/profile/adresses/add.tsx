import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function AddAddress() {
  const [form, setForm] = useState({
    name: '',
    address: ''
  });

  const handleSave = () => {
    // Aquí iría la llamada al backend
    const newAddress = {
      id: Date.now().toString(),
      ...form
    };
    
    // Simulación: agregar a la lista
    router.setParams({
      newAddress: JSON.stringify(newAddress)
    });
    
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={(text) => setForm({...form, name: text})}
          onSubmitEditing={Keyboard.dismiss} // Cierra al presionar "enter"
        />

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={form.address}
          onChangeText={(text) => setForm({...form, address: text})}
          multiline
          blurOnSubmit={true}
        />

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

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