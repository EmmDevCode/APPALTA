import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const addresses = [
  { id: '1', name: 'Casa', address: 'Calle Falsa 123, Ciudad' },
  { id: '2', name: 'Trabajo', address: 'Avenida Siempreviva 742, Ciudad' },
];

export default function Addresses() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton}>
        <MaterialIcons name="add" size={24} color="#4CAF50" />
        <Text style={styles.addButtonText}>Agregar dirección</Text>
      </TouchableOpacity>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.addressCard}>
            <Text style={styles.addressName}>{item.name}</Text>
            <Text style={styles.addressText}>{item.address}</Text>
            <View style={styles.actions}>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="delete" size={20} color="#f44336" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
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