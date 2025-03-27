import { Link } from 'expo-router';
import { View } from 'react-native';

export default function Home() {
  return (
    <View>
      <View>
        <Link className="z-50 text-center text-2xl font-bold text-blue-500 underline" href="/tasks">
          Завдання
        </Link>
      </View>
      <View className="items-center justify-center">
        <View className="h-[150px] w-[150px] rounded bg-red-800" />
      </View>
    </View>
  );
}
