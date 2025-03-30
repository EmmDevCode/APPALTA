import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';

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
    if (code !== '123456') { // Código de prueba
      Alert.alert('Error', 'Código incorrecto');
      return;
    }
    router.replace('/(app)/home'); // Redirige al home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifica tu correo</Text>

      {!isEmailSent ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="tu@correo.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={[styles.button, !email.includes('@') && styles.buttonDisabled]}
            onPress={handleSendCode}
            disabled={isLoading || !email.includes('@')}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Enviando código...' : 'Continuar'}
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
    marginBottom: 40,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
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
  },
  codeInput: {
    height: 56,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 8,
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
});