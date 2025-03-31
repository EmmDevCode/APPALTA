import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function EmailAuthScreen() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email.includes('@')) {
      Alert.alert('Error', 'Ingresa un correo válido');
      return;
    }
    setIsLoading(true);
    // Simulación de envío
    setTimeout(() => {
      setIsEmailSent(true);
      setIsLoading(false);
      Alert.alert('Éxito', 'Código enviado a tu correo');
    }, 1500);
  };

  const handleVerifyCode = async () => {
    if (code !== '123456') {
      Alert.alert('Error', 'Código incorrecto');
      return;
    }
    router.replace('/(app)/home');
  };

  return (
    <View style={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <MaterialIcons name="arrow-back" size={24} color="#4CAF50" />
      </TouchableOpacity>

      {/* Contenido principal (más arriba) */}
      <View style={styles.content}>
        <Text style={styles.title}>Verifica tu correo</Text>

        {!isEmailSent ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="tu@correo.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={[styles.button, (!email.includes('@') || isLoading) && styles.buttonDisabled]}
              onPress={handleSendCode}
              disabled={!email.includes('@') || isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Enviando...' : 'Siguiente'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>
              Código enviado a: <Text style={styles.highlight}>{email}</Text>
            </Text>
            <TextInput
              style={styles.codeInput}
              placeholder="Código de 6 dígitos"
              placeholderTextColor="#999"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
            />
            <TouchableOpacity
              style={[styles.button, code.length !== 6 && styles.buttonDisabled]}
              onPress={handleVerifyCode}
              disabled={code.length !== 6}
            >
              <Text style={styles.buttonText}>Verificar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 60, // Espacio superior para el botón de regreso
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start', // Alinea el contenido arriba
    marginTop: 40, // Mueve todo más arriba
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#4CAF50', // Verde
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#1e1e1e',
    marginBottom: 24,
    color: '#fff',
  },
  codeInput: {
    height: 56,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#1e1e1e',
    marginBottom: 24,
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});