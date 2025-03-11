import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Button } from '~/components/Button';

export default function Profile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');

  return (
    <ScrollView className="flex-1">
      <Text className="text-center text-xl font-semibold">Реєстрація</Text>

      <View className="p-2">
        <Text className="text-sm">Електронна пошта</Text>
        <TextInput
          inputMode="email"
          className="border border-gray-300"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>

      <View className="p-2">
        <Text className="text-sm">Пароль</Text>
        <TextInput
          secureTextEntry={true}
          className="border border-gray-300"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>

      <View className="p-2">
        <Text className="text-sm">Пароль (ще раз)</Text>
        <TextInput
          secureTextEntry={true}
          className="border border-gray-300"
          onChangeText={(text) => setPasswordConfirmation(text)}
          value={passwordConfirmation}
        />
      </View>

      <View className="mt-3 p-2">
        <Text className="text-sm">Прізвище</Text>
        <TextInput
          className="border border-gray-300"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
      </View>
      <View className="p-2">
        <Text className="text-sm">Ім'я</Text>
        <TextInput
          className="border border-gray-300"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
      </View>

      <Button
        title="Зареєструватися"
        className="m-2 bg-blue-400 p-2"
        onPress={() => {
          console.log(
            `Email: ${email}, Password: ${password}, Password Confirmation: ${passwordConfirmation}, Last Name: ${lastName}, First Name: ${firstName}`
          );

          setEmail('');
          setPassword('');
          setPasswordConfirmation('');
          setLastName('');
          setFirstName('');
        }}>
        Зареєструватися
      </Button>
    </ScrollView>
  );
}
