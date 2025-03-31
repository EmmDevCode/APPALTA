import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Perfil' }} />
      <Stack.Screen name="edit" options={{ title: 'Editar Perfil' }} />
      <Stack.Screen name="addresses" options={{ title: 'Direcciones' }} />
      <Stack.Screen name="paymentMethods" options={{ title: 'Métodos de Pago' }} />
      <Stack.Screen name="support" options={{ title: 'Soporte' }} />
    </Stack>
  );
}