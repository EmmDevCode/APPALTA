import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Espacio reservado para el mapa */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Mapa de Google aparecerá aquí</Text>
      </View>
      
      {/* Contenido adicional debajo del mapa */}
      <View style={styles.content}>
        <Text style={styles.title}>¡Bienvenido de vuelta!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapPlaceholder: {
    height: '50%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#666',
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});