import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, TextInput, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Container } from '~/components/Container';
import { useEffect, useState } from 'react';
import Folder from '~/components/Folder';
import { rootPath } from '~/const';
import TextFile from '~/components/TextFile';

function isFolder(name: string) {
  return !name.endsWith('.txt');
}

export default function Explorer() {
  const { path } = useLocalSearchParams();
  const [items, setItems] = useState<string[]>([]);
  const [createInput, setCreateInput] = useState<string>('');
  const currentPath = `${rootPath}${path}`;

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
    if (isFolder(name)) {
      await createFile(name);
    } else {
      await createDirectory(name);
    }
  };

  const sortedItems = items.sort((a, b) => {
    const aIsFile = !isFolder(a);
    const bIsFile = !isFolder(b);
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
            placeholder="Create file or folder"
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
            <>
              {isFolder(item) ? (
                <Folder fullPath={`${path}${item}/`} name={item} refresh={loadStructure} />
              ) : (
                <TextFile fullPath={`${path}${item}/`} name={item} refresh={loadStructure} />
              )}
            </>
          )}
        />
      </Container>
    </>
  );
}
