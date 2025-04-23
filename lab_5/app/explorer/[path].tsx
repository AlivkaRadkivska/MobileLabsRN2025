import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, TextInput, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Container } from '~/components/Container';
import { useEffect, useState } from 'react';

const ROOT_DIR = FileSystem.documentDirectory;

export default function Explorer() {
  const { path } = useLocalSearchParams();
  const [items, setItems] = useState<string[]>([]);
  const [createInput, setCreateInput] = useState<string>('');
  const currentPath = `${ROOT_DIR}AppData${path}`;

  useEffect(() => {
    loadStructure();
  }, []);

  const loadStructure = async () => {
    const dirStructure = await FileSystem.readDirectoryAsync(currentPath);
    setItems(dirStructure);
  };

  const createDirectory = async (name: string) => {
    const newPath = `${currentPath}/${name}`;
    await FileSystem.makeDirectoryAsync(newPath, { intermediates: true });
    loadStructure();
  };

  const createFile = async (name: string) => {
    const newPath = `${currentPath}/${name}`;
    await FileSystem.writeAsStringAsync(newPath, '');
    loadStructure();
  };

  const onSubmitCreate = async (name: string) => {
    if (name.endsWith('.txt')) {
      await createFile(name);
    } else {
      await createDirectory(name);
    }
  };

  const sortedItems = items.toSorted((a, b) => {
    const aIsFile = a.endsWith('.txt');
    const bIsFile = b.endsWith('.txt');
    if (aIsFile && !bIsFile) return 1;
    if (!aIsFile && bIsFile) return -1;
    return a.localeCompare(b);
  });
  return (
    <>
      <Stack.Screen options={{ title: path.toString() }} />
      <Container>
        <View>
          <TextInput
            className="rounded-md border-2 border-gray-300 p-2"
            value={createInput}
            onChangeText={setCreateInput}
            onSubmitEditing={() => {
              onSubmitCreate(createInput);
              setCreateInput('');
            }}
          />
        </View>
        <FlatList
          data={sortedItems}
          renderItem={({ item }) => (
            <Link href={{ pathname: '/explorer/[path]', params: { path: `${path}${item}/` } }}>
              {item}
            </Link>
          )}
        />
      </Container>
    </>
  );
}
