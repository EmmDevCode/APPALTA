import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const supportOptions = [
  { title: "Centro de ayuda", icon: "help-outline" }, // Nombre corregido
  { title: "Contáctanos", icon: "email" },           // Nombre válido
  { title: "Términos y condiciones", icon: "description" }, // Nombre válido
  { title: "Política de privacidad", icon: "privacy-tip" }, // Nombre válido
];

export default function Support() {
  return (
    <View style={styles.container}>
      {supportOptions.map((option, index) => (
        <TouchableOpacity key={index} style={styles.option}>
          <MaterialIcons 
            name={option.icon as any} // TypeScript workaround
            size={24} 
            color="#4CAF50" 
          />
          <Text style={styles.optionText}>{option.title}</Text>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
});