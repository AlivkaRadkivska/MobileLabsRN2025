import { Stack, Link } from 'expo-router';
import { Button } from 'react-native';
import { Container } from '~/components/Container';
import Info from '~/components/Info';

export default function Home() {
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
