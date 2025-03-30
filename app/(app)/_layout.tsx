import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="home" 
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}