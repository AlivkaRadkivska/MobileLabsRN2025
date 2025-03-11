import { Image, Text, View } from 'react-native';
import '../global.css';

import { Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <View className="flex-1">
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerTitle: () => (
              <Image
                className="h-16 w-32"
                resizeMode="contain"
                source={require('~/assets/ztu.png')}
              />
            ),
            headerRight: () => <Text className="font-bold">FirstMobileApp</Text>,
          }}
        />
      </Stack>
      <View>
        <Text className="text-center text-sm italic">Радківська Аліна Валеріївна, ВТ-21-1</Text>
      </View>
    </View>
  );
}
