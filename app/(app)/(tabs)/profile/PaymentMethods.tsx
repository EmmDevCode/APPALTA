import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const paymentMethods = [
  { id: '1', type: 'card', last4: '4242' },
  { id: '2', type: 'paypal', email: 'user@example.com' },
];

export default function PaymentMethods() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton}>
        <MaterialIcons name="add" size={24} color="#4CAF50" />
        <Text style={styles.addButtonText}>Agregar método de pago</Text>
      </TouchableOpacity>

      <FlatList
        data={paymentMethods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.type === 'card' ? (
              <>
                <FontAwesome name="credit-card" size={24} color="#4CAF50" />
                <Text style={styles.cardText}>Terminada en •••• {item.last4}</Text>
              </>
            ) : (
              <>
                <FontAwesome name="paypal" size={24} color="#003087" />
                <Text style={styles.cardText}>{item.email}</Text>
              </>
            )}
            <TouchableOpacity>
              <MaterialIcons name="delete" size={20} color="#f44336" />
            </TouchableOpacity>
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    gap: 15,
  },
  cardText: {
    flex: 1,
  },
});