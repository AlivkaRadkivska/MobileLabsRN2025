import { Text, TouchableOpacity, View } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Reminder } from 'types';

export default function Task({
  name,
  description,
  date,
  removeReminder,
}: Reminder & {
  removeReminder: () => void;
}) {
  return (
    <View className="mb-3 flex-row items-center justify-between rounded-lg border border-gray-300 p-4">
      <View className="flex-1">
        <Text className="text-lg font-bold">{name}</Text>
        <Text>{description}</Text>
        <Text className="text-sm text-slate-600">{date.toLocaleString()}</Text>
      </View>
      <TouchableOpacity onPress={removeReminder}>
        <EvilIcons
          name="trash"
          className="rounded-lg bg-red-600 pb-3 pt-1"
          size={35}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}
