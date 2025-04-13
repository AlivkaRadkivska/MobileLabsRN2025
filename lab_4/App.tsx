import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Reminder } from 'types';
import Task from 'components/Task';
import { deleteNotification, registerOneSignal, sendNotification } from 'oneSignal';
import './global.css';

export default function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    registerOneSignal();
  }, []);

  const addReminder = async () => {
    if (!name || !description || Number(date) < Date.now()) return;

    const oneSignalData = await sendNotification(name, description, date);

    const newReminder: Reminder = {
      id: oneSignalData.id,
      name,
      description,
      date,
    };
    setReminders((prev) => [...prev, newReminder]);

    setName('');
    setDescription('');
    setDate(new Date());
  };

  const removeReminder = async (id: string) => {
    const oneSignalData = await deleteNotification(id);
    if (oneSignalData.success) {
      setReminders(reminders.filter((reminder) => reminder.id !== id));
    }
  };

  return (
    <View className="flex-1 gap-4 p-8">
      <Text className="text-center text-2xl font-bold">To-Do Reminder</Text>
      <TextInput
        className="rounded-lg border border-gray-400 p-2 text-lg"
        placeholder="Назва"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="rounded-lg border border-gray-400 p-2 text-lg"
        placeholder="Опис"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          className="rounded-lg border border-gray-400 p-2 text-lg"
          value={`Обрати час: ${date.toLocaleString()}`}
          editable={false}
        />
      </TouchableOpacity>

      <DatePicker
        modal
        open={showDatePicker}
        date={date}
        onConfirm={(date) => {
          setShowDatePicker(false);
          setDate(date);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
      />

      <Button title="Додати нагадування" onPress={addReminder} />

      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Task {...item} removeReminder={removeReminder.bind(null, item.id)} />
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}
