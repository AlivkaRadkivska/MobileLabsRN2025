import { Stack, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Container } from '~/components/Container';

const ROOT_DIR = FileSystem.documentDirectory;

export default function Details() {
  const { path } = useLocalSearchParams();
  const currentPath = `${ROOT_DIR}AppData${path}`;

  return (
    <>
      <Stack.Screen options={{ title: path.toString() }} />
      <Container>
        <Text>{currentPath}</Text>
      </Container>
    </>
  );
}
