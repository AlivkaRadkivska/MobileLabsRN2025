import { FlatList, Image, Text, View } from 'react-native';

const data = new Array(15).fill(null).map((_, i) => ({
  id: i,
  title: `Новина ${i + 1}`,
  description: `Опис новини ${i + 1}`,
  image: `https://picsum.photos/seed/${i}/80/80`,
  date: new Date().toLocaleString(),
}));

export default function Home() {
  return (
    <View className="flex-1">
      <FlatList
        data={data}
        ListHeaderComponent={<Text className="text-center text-xl font-semibold">Новини</Text>}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex flex-row gap-2 p-2">
            <Image className="h-20 w-20 rounded-sm" source={{ uri: item.image }} />
            <View>
              <Text className="font-bold">{item.title}</Text>
              <Text className="text-sm text-gray-500">{item.date}</Text>
              <Text className="text-sm">{item.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
