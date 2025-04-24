import { Stack, Link } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { useEffect } from 'react';
import { Button } from 'react-native';
import { Container } from '~/components/Container';
import Info from '~/components/Info';
import { rootPath } from '~/const';

export default function Home() {
  useEffect(() => {
    (async () => {
      const dirInfo = await FileSystem.getInfoAsync(rootPath);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(rootPath, { intermediates: true });
      }
    })();
  }, []);
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Info />
        <Link
          href={{
            pathname: '/explorer/[path]',
            params: {
              path: '/',
            },
          }}
          asChild>
          <Button title="Open root" />
        </Link>
      </Container>
    </>
  );
}
