import { router, Stack } from "expo-router";

export default function AddressLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="index" options={{headerShown: false}}/>

      <Stack.Screen 
        name="add" 
        options={{ 
          title: 'Agregar',
          headerTitleAlign: 'center'
        }} 
      />
      <Stack.Screen 
        name="edit/[id]" 
        options={{ 
          title: 'Editar',  
          headerTitleAlign: 'center'
        }} 
      />
    </Stack>
  );
}