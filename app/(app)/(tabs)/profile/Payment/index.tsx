import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";

type PaymentMethod = {
  id: string;
  type: 'card' | 'paypal' | 'cash';
  details: {
    last4?: string;
    email?: string;
  };
  isDefault?: boolean;
};

export default function PaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'card', details: { last4: '4242' }, isDefault: true },
    { id: '2', type: 'paypal', details: { email: 'usuario@example.com' } },
    { id: '3', type: 'cash', details: {} }
  ]);

  const connectPayPal = async () => {
    Alert.alert(
      'Conectar PayPal',
      'Serás redirigido a PayPal para autorizar el pago',
      [
        {
          text: 'Continuar',
          onPress: () => console.log('Iniciando flujo de PayPal...'),
        },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const handleAddCard = () => {
    router.push('/profile/Payment/AddCardScreen'); // Ruta corregida
  };

  const setAsDefault = (id: string) => {
    setMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const deleteMethod = (id: string) => {
    Alert.alert(
      'Eliminar método',
      '¿Estás seguro de eliminar este método de pago?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => setMethods(prev => prev.filter(m => m.id !== id))
        }
      ]
    );
  };

  const renderPaymentIcon = (type: string) => {
    switch(type) {
      case 'card': return <FontAwesome name="credit-card" size={24} color="#4CAF50" />;
      case 'paypal': return <FontAwesome name="paypal" size={24} color="#003087" />;
      case 'cash': return <Ionicons name="cash-outline" size={24} color="#8BC34A" />;
      default: return null;
    }
  };

  const getPaymentDescription = (method: PaymentMethod) => {
    switch(method.type) {
      case 'card': return `Tarjeta •••• ${method.details.last4}`;
      case 'paypal': return `PayPal: ${method.details.email}`;
      case 'cash': return 'Efectivo al recibir';
      default: return '';
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
        <MaterialIcons name="add" size={24} color="#4CAF50" />
        <Text style={styles.addButtonText}>Agregar método de pago</Text>
      </TouchableOpacity>

      <FlatList
        data={methods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {renderPaymentIcon(item.type)}
            
            <View style={styles.detailsContainer}>
              <Text style={styles.cardText}>
                {getPaymentDescription(item)}
              </Text>
              {item.isDefault && <Text style={styles.defaultBadge}>Predeterminado</Text>}
            </View>

            <View style={styles.actions}>
              {!item.isDefault && (
                <TouchableOpacity onPress={() => setAsDefault(item.id)}>
                  <MaterialIcons name="star-outline" size={20} color="#FFC107" />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => deleteMethod(item.id)}>
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
  detailsContainer: {
    flex: 1,
  },
  cardText: {
    fontSize: 16,
  },
  defaultBadge: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
  },
});