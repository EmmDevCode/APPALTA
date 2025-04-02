import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Perfil', 
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="edit" 
        options={{ 
          title: 'Editar Perfil',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="adresses" 
        options={{ 
          title: 'Direcciones', 
          headerShown: true 
        }} 
      />
      {/* Pantallas de payment */}
      <Stack.Screen 
        name="Payment/index"  // Cambiado a "payment/index"
        options={{ 
          title: 'Métodos de Pago',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="Payment/AddCardScreen" 
        options={{ 
          title: 'Agregar Tarjeta',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="Support" 
        options={{ 
          title: 'Soporte', 
          headerShown: true 
        }} 
      />
    </Stack>
  );
}