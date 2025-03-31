import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard, Alert, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

type UserProfile = {
    name: string;
    lastName: string;
    email: string;
    phone: string;
  };
  
  type UserAvatar = {
    uri: string;
  };
  
  type FormField = {
    label: string;
    field: keyof UserProfile;
    props?: Partial<React.ComponentProps<typeof TextInput>>;
  };
  
  export default function EditProfile() {
    // Obtener parámetros
    const params = useLocalSearchParams<{
      name?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      avatar?: string;
    }>();
  
    // Estados
    const [userProfile, setUserProfile] = useState<UserProfile>({
      name: params.name || '',
      lastName: params.lastName || '',
      email: params.email || '',
      phone: params.phone || ''
    });
  
    const [userAvatar, setUserAvatar] = useState<UserAvatar>({
      uri: params.avatar || 'https://i.imgur.com/Tch14LV.jpg'
    });
  
    const [isSaving, setIsSaving] = useState(false);
  
    // Campos del formulario con tipado explícito
    const formFields: FormField[] = [
      { label: 'Nombre', field: 'name' },
      { label: 'Apellido', field: 'lastName' },
      { 
        label: 'Correo', 
        field: 'email', 
        props: { 
          keyboardType: 'email-address',
          autoCapitalize: 'none'
        } 
      },
      { 
        label: 'Teléfono', 
        field: 'phone', 
        props: { 
          keyboardType: 'phone-pad' 
        } 
      }
    ];
  
    const handleSave = async () => {
      Keyboard.dismiss();
      setIsSaving(true);
  
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        Alert.alert('¡Éxito!', 'Perfil actualizado');
        router.back();
      } catch (error) {
        Alert.alert('Error', 'No se pudo guardar');
      } finally {
        setIsSaving(false);
      }
    };
  
    const handleChange = (field: keyof UserProfile, value: string) => {
      setUserProfile(prev => ({
        ...prev,
        [field]: value
      }));
    };
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView 
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Sección Avatar */}
          <View style={styles.avatarSection}>
            <Image 
              source={userAvatar} 
              style={styles.avatar}
              defaultSource={{ uri: 'https://i.imgur.com/Tch14LV.jpg' }}
            />
            <TouchableOpacity style={styles.changePhotoButton}>
              <MaterialIcons name="photo-camera" size={24} color="#4CAF50" />
              <Text style={styles.changePhotoText}>Cambiar foto</Text>
            </TouchableOpacity>
          </View>
  
          {/* Formulario */}
          <View style={styles.formSection}>
            {formFields.map(({ label, field, props = {} }) => (
              <View key={field} style={styles.inputGroup}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                  style={styles.input}
                  value={userProfile[field]}
                  onChangeText={(text) => handleChange(field, text)}
                  placeholder={`Ingresa tu ${label.toLowerCase()}`}
                  returnKeyType="next"
                  {...props}
                />
              </View>
            ))}
          </View>
  
          {/* Botón de Guardar */}
          <TouchableOpacity 
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]} 
            onPress={handleSave}
            disabled={isSaving}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
  
  // Estilos (igual que antes)
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    avatarSection: {
      alignItems: 'center',
      marginVertical: 20,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 2,
      borderColor: '#4CAF50',
    },
    changePhotoButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    changePhotoText: {
      color: '#4CAF50',
      marginLeft: 8,
      fontSize: 16,
    },
    formSection: {
      marginBottom: 20,
    },
    inputGroup: {
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: '#333',
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: '#f9f9f9',
    },
    saveButton: {
      backgroundColor: '#4CAF50',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 10,
    },
    saveButtonDisabled: {
      opacity: 0.6,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });