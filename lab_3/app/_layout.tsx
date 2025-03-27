import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

import { Stack } from 'expo-router';
import { StoreProvider } from '~/context/StoreContext';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <StoreProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="tasks" options={{ headerTitle: 'Завдання' }} />
        </Stack>
      </StoreProvider>
    </GestureHandlerRootView>
  );
}
