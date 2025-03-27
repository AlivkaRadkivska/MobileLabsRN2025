import { FlatList, Text, View } from 'react-native';

export default function Tasks() {
  const tasks = [
    {
      id: 1,
      title: 'Завдання 1',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Завдання 2',
      isCompleted: true,
    },
    {
      id: 3,
      title: 'Завдання 3',
      isCompleted: false,
    },
  ];

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
