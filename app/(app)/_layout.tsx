import { Tabs } from 'expo-router';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <Tabs screenOptions={{ 
    tabBarActiveTintColor: '#4CAF50', 
    headerShown:false
    }}>
      <Tabs.Screen
        name="(tabs)/home"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(tabs)/services"
        options={{
          title: 'Servicios',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="th-list" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(tabs)/profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}