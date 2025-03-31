import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function VerifyScreen() {
  const { phone, email } = useLocalSearchParams<{
    phone?: string;
    email?: string;
  }>();

  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (code.length !== 6) {
      Alert.alert('Error', 'El código debe tener 6 dígitos');
      return;
    }

    setIsLoading(true);
    try {
      // Simulación - En producción aquí verificarías con tu backend
      if (code !== '123456') throw new Error('Código incorrecto');
      
      router.replace('/(app)/home');
    } catch (error) {
      Alert.alert('Error', 'Código inválido. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <View style={styles.container}>
        {/* Botón de regreso ahora dentro del View principal */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
  
        <Text style={styles.title}>Verifica tu {phone ? 'teléfono' : 'correo'}</Text>
      <Text style={styles.subtitle}>
        Enviamos un código a: {'\n'}
        <Text style={styles.highlight}>{phone || email}</Text>
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Código de 6 dígitos"
        placeholderTextColor="#999"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        maxLength={6}
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleVerify}
        disabled={isLoading || code.length !== 6}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Verificando...' : 'Continuar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.resendLink}
        onPress={() => Alert.alert('Éxito', 'Código reenviado')}
      >
        <Text style={styles.resendText}>¿No recibiste el código? <Text style={styles.linkText}>Reenviar</Text></Text>
      </TouchableOpacity>
    </View>

  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#000',
    justifyContent: 'center',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#fff',
    lineHeight: 24,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 8, // Para mejor visualización del código
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  resendLink: {
    alignItems: 'center',
  },
  resendText: {
    color: '#fff',
    fontSize: 14,
  },
  linkText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
});