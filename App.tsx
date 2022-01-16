// Navigation dependencies...
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

// Stack Screen dependencies
import UI from "./app/ui";
import { AppProvider } from "./app/provider";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={UI}
            options={{ title: "Welcome" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
