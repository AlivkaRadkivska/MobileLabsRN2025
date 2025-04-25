import { Link } from 'expo-router';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { rootPath } from '~/const';

export default function Folder({
  fullPath,
  name,
  refresh,
}: {
  fullPath: string;
  name: string;
  refresh: () => void;
}) {
  const handleDelete = async () => {
    Alert.alert(
      `Delete folder ${name}`,
      undefined,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await FileSystem.deleteAsync(`${rootPath}${fullPath}`, { idempotent: true });
            refresh();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Link href={{ pathname: '/explorer/[path]', params: { path: fullPath } }} asChild>
      <TouchableOpacity className="flex-row justify-between p-1">
        <View className="flex-row items-center gap-2">
          <FontAwesome name="folder" size={44} color="orange" />
          <Text>{name}</Text>
        </View>
        <TouchableOpacity onPress={handleDelete}>
          <FontAwesome name="trash" size={34} color="red" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
}
