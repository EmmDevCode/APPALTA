import { View, Text, StyleSheet, TouchableOpacity, FlatList, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

type Address = {
  id: string;
  name: string;
  address: string;
};

export default function Addresses() {
    const [addresses, setAddresses] = useState([
      { id: '1', name: 'Casa', address: 'Calle Falsa 123, Ciudad' },
      { id: '2', name: 'Trabajo', address: 'Avenida Siempreviva 742, Ciudad' },
    ]);
  
    const handleDelete = (id: string) => {
      setAddresses(prev => prev.filter(address => address.id !== id));
    };
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Link href="/profile/adresses/add" asChild>
            <TouchableOpacity style={styles.addButton}>
              <MaterialIcons name="add" size={24} color="#4CAF50" />
              <Text style={styles.addButtonText}>Agregar dirección</Text>
            </TouchableOpacity>
          </Link>
  
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.addressCard}>
                <Text style={styles.addressName}>{item.name}</Text>
                <Text style={styles.addressText}>{item.address}</Text>
                <View style={styles.actions}>
                  <Link href={`/profile/adresses/edit/${item.id}`} asChild>
                    <TouchableOpacity>
                      <MaterialIcons name="edit" size={20} color="#666" />
                    </TouchableOpacity>
                  </Link>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <MaterialIcons name="delete" size={20} color="#f44336" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    marginLeft: 10,
    color: '#4CAF50',
    fontSize: 16,
  },
  addressCard: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  addressName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  addressText: {
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 15,
  },
});