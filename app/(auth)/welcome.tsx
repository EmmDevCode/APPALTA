import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [callingCode] = useState(['52']); // Código fijo para México

  const handleContinue = async () => {
    Keyboard.dismiss(); // Cierra el teclado al continuar
    const fullPhone = `+52${phone}`;
    setIsLoading(true);
    try {
      const destination = `+${callingCode}${phone}`;
      router.navigate({
        pathname: '/(auth)/verify',
        params: { phone: destination },
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar el código. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image 
          source={require('../assets/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Bienvenido a PALTA</Text>

        {/* Campo de teléfono */}
        <View style={styles.phoneInputContainer}>
          <View style={styles.countryCodeButton}>
            <Text style={{ fontSize: 20 }}>🇲🇽</Text>
            <Text style={styles.countryCodeText}>+52</Text>
          </View>
          
          <TextInput
            style={styles.phoneInput}
            placeholder="Ingresa tu teléfono"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            blurOnSubmit={true}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, !phone && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={isLoading || !phone}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Enviando código...' : 'Continuar'}
          </Text>
        </TouchableOpacity>

        {/* Separador */}
        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>o</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Botones sociales */}
        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: '#4285F4' }]}
          onPress={() => console.log('Google pressed')}
        >
          <FontAwesome name="google" size={24} color="#fff" />
          <Text style={styles.socialButtonText}>Continuar con Google</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: '#000' }]}
          onPress={() => console.log('Apple pressed')}
        >
          <AntDesign name="apple1" size={24} color="#fff" />
          <Text style={[styles.socialButtonText, { color: '#fff' }]}>Continuar con Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: '#f0f0f0' }]}
          onPress={() => router.navigate('/(auth)/email-auth')}
        >
          <MaterialIcons name="email" size={24} color="#333" />
          <Text style={[styles.socialButtonText, { color: '#333' }]}>Continuar con Correo</Text>
        </TouchableOpacity>

        {/* Términos y condiciones */}
        <Text style={styles.footerText}>
          Al continuar, aceptas nuestros{' '}
          <Text style={styles.linkText}>Términos</Text> y{' '}
          <Text style={styles.linkText}>Privacidad</Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#000',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#fff',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1e1e1e',
    borderRightWidth: 1,
    borderRightColor: '#333'
  },
  countryCodeText: {
    fontWeight: '600',
    color: '#fff',
  },
  phoneInput: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#000',
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
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },
  separatorText: {
    marginHorizontal: 12,
    color: '#999',
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  socialButtonText: {
    marginLeft: 12,
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#999',
    fontSize: 14,
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});