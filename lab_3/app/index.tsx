import { Link } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { LongPressGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';

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
            <LongPressGestureHandler
              minDurationMs={3000}
              onEnded={() => {
                setScore((prev) => prev + 3);
              }}>
              <View className="h-[150px] w-[150px] rounded bg-red-800" />
            </LongPressGestureHandler>
          </TapGestureHandler>
        </TapGestureHandler>
      </View>
    </View>
  );
}
