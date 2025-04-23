import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import bytes from 'bytes';

export default function Info() {
  const [totalDeviceSpace, setTotalDeviceSpace] = useState(0);
  const [availableDeviceSpace, setAvailableDeviceSpace] = useState(0);

  const usedDeviceSpace = totalDeviceSpace - availableDeviceSpace;

  const getDeviceSpace = async () => {
    setTotalDeviceSpace(await FileSystem.getTotalDiskCapacityAsync());
    setAvailableDeviceSpace(await FileSystem.getFreeDiskStorageAsync());
  };

  useEffect(() => {
    getDeviceSpace();
  }, []);

  return (
    <View className="flex-1">
      <Text className="text-lg">Total space: {bytes.format(totalDeviceSpace)}</Text>
      <Text className="text-lg">Available space: {bytes.format(availableDeviceSpace)}</Text>
      <Text className="text-lg">Used space: {bytes.format(usedDeviceSpace)}</Text>
    </View>
  );
}
