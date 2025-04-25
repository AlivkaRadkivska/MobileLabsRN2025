import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState<{
    size: string;
    lastModified: string;
  }>();
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    if (!isEditing) {
      setFileContent('');
      return;
    }
    (async () => {
      const content = await FileSystem.readAsStringAsync(`${rootPath}${fullPath}`);
      setFileContent(content);
    })();
  }, [isEditing]);

  useEffect(() => {
    if (isEditing) return;
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
  }, [isEditing]);

  const handleUpdate = async () => {
    await FileSystem.writeAsStringAsync(`${rootPath}${fullPath}`, fileContent);
  };

  const handleDelete = async () => {
    Alert.alert(
      `Delete file ${name}`,
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
    <>
      <TouchableOpacity
        className="flex-row justify-between p-1"
        onPress={() => setIsEditing((prev) => !prev)}>
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
      {isEditing && (
        <View>
          <TextInput
            className="rounded-md border-2 border-gray-300 p-2"
            placeholder="Enter file content"
            value={fileContent}
            onChangeText={setFileContent}
            onSubmitEditing={() => {
              handleUpdate();
              setFileContent('');
              setIsEditing(false);
            }}
          />
        </View>
      )}
    </>
  );
}
