import { Link } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';

export default function Home() {
  const [score, setScore] = useState(0);

  return (
    <View>
      <View>
        <Link className="z-50 text-center text-2xl font-bold text-blue-500 underline" href="/tasks">
          Завдання {score}
        </Link>
      </View>
      <View className="items-center justify-center">
        <TapGestureHandler
          onEnded={() => {
            setScore((prev) => prev + 1);
          }}>
          <TapGestureHandler
            numberOfTaps={2}
            onEnded={() => {
              setScore((prev) => prev + 2);
            }}>
            <View className="h-[150px] w-[150px] rounded bg-red-800" />
          </TapGestureHandler>
        </TapGestureHandler>
      </View>
    </View>
  );
}
