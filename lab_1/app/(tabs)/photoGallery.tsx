import { FlatList, Image, StyleSheet, View } from 'react-native';

const data = new Array(16).fill(null).map((_, i) => `https://picsum.photos/seed/${i}/300/400`);

export default function PhotoGallery() {
  return (
    <View className="w-full">
      <FlatList
        data={data}
        numColumns={2}
        columnWrapperClassName="justify-center"
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View className="m-2 h-32 w-[45%]">
            <Image className="h-32 rounded-sm" style={styles.shadow} source={{ uri: item }} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});
