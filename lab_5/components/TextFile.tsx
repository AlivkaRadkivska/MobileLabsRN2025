import { Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { rootPath } from '~/const';
import { useEffect, useState } from 'react';
import bytes from 'bytes';

export default function TextFile({
  fullPath,
  name,
  refresh,
}: {
  fullPath: string;
  name: string;
  refresh: () => void;
}) {
  const [stats, setStats] = useState<{
    size: string;
    lastModified: string;
  }>();

  useEffect(() => {
    (async () => {
      const fileInfo = await FileSystem.getInfoAsync(`${rootPath}${fullPath}`);
      if (fileInfo.exists) {
        const { size, modificationTime } = fileInfo;
        setStats({
          size: bytes.format(size) ?? '0',
          lastModified: new Date(modificationTime).toLocaleString(),
        });
      }
    })();
  }, []);

  const handleDelete = async () => {
    await FileSystem.deleteAsync(`${rootPath}${fullPath}`, { idempotent: true });
    refresh();
  };

  return (
    <TouchableOpacity className="flex-row justify-between p-1">
      <View className="flex-row items-center gap-2">
        <FontAwesome name="file-o" size={44} color="gray" />
        <View>
          <Text>{name}</Text>
          {stats && (
            <View>
              <Text className="text-xs">Size: {stats.size}</Text>
              <Text className="text-xs">Last modified: {stats.lastModified}</Text>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <FontAwesome name="trash" size={34} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
