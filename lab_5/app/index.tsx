import { Stack, Link } from 'expo-router';
import { Button } from 'react-native';
import { Container } from '~/components/Container';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Link href={{ pathname: '/folder', params: { path: '/' } }} asChild>
          <Button title="Open root" />
        </Link>
      </Container>
    </>
  );
}
