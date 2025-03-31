import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

export default function Services() {
  const services = [
    { id: 1, name: "Servicio 1" },
    { id: 2, name: "Servicio 2" },
    { id: 3, name: "Servicio 3" },
    { id: 4, name: "Servicio 4" },
    { id: 5, name: "Servicio 5" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nuestros Servicios</Text>
      
      {services.map((service) => (
        <TouchableOpacity key={service.id} style={styles.serviceCard}>
          <Text style={styles.serviceText}>{service.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  serviceText: {
    fontSize: 16,
  },
});