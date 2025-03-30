import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

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
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
    lineHeight: 24,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#007AFF',
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
    backgroundColor: '#007AFF',
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
    color: '#666',
    fontSize: 14,
  },
  linkText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});