import { FlatList, Text, View } from 'react-native';
import { useStore } from '~/context/StoreContext';

export default function Tasks() {
  const { tasks } = useStore();

  return (
    <View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View className="flex-row p-1">
            <Text className="text-lg">{item.isCompleted ? '✅' : '❌'}</Text>
            <Text className="text-lg">{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
