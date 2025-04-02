import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';

export default function ProfileScreen() {
  // 1. Estado local para simulación (luego reemplazar por backend)
  const [user, setUser] = useState({
    name: 'Usuario',
    lastName: 'Apellido',
    avatar: { uri: 'https://i.imgur.com/Tch14LV.jpg' }
  });

  return (
    <View style={styles.container}>
      {/* 2. Header con datos del usuario */}
      <View style={styles.profileHeader}>
        <Image 
          source={user.avatar} 
          style={styles.avatar}
          defaultSource={{ uri: 'https://i.imgur.com/Tch14LV.jpg' }}
        />
        <Text style={styles.userName}>
          {user.name} {user.lastName}
        </Text>
      </View>
      
      {/* 3. Enlace a edición con parámetros actuales */}
      <Link 
        href={{
          pathname: "/profile/edit",
          params: {
            name: user.name,
            lastName: user.lastName,
            avatar: user.avatar.uri
          }
        }} 
        asChild
      >
        <TouchableOpacity style={styles.option}>
          <Text>Editar Perfil</Text>
        </TouchableOpacity>
      </Link>
      
      {/* 4. Otras opciones */}
      <Link href="/profile/adresses" asChild>
        <TouchableOpacity style={styles.option}>
          <Text>Direcciones</Text>
        </TouchableOpacity>
      </Link>
      
      <Link href="/profile/Payment" asChild>
        <TouchableOpacity style={styles.option}>
          <Text>Métodos de Pago</Text>
        </TouchableOpacity>
      </Link>
      
      <Link href="/profile/Support" asChild>
        <TouchableOpacity style={styles.option}>
          <Text>Soporte</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

// Estilos (consistentes con tu diseño)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});