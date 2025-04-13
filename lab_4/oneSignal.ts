import { LogLevel, OneSignal } from 'react-native-onesignal';
import Constants from 'expo-constants';

const baseUrl = 'https://api.onesignal.com/notifications';
const headers = {
  Accept: 'application/json',
  Authorization: `Key ${process.env.EXPO_PUBLIC_ONESIGNAL_API_KEY}`,
  'Content-Type': 'application/json',
};
const oneSignalAppId: string = Constants.expoConfig?.extra?.oneSignalAppId;
const userName = 'vt211_rav';

export function registerOneSignal() {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize(oneSignalAppId);

  OneSignal.Notifications.requestPermission(true);

  OneSignal.login(userName);
  OneSignal.User.pushSubscription.optIn();

  OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
    event.preventDefault();
    event.notification.display();
  });
}

export async function sendNotification(title: string, message: string, date: Date) {
  const notification = {
    app_id: oneSignalAppId,
    contents: { en: `${title}\n${message}` },
    include_aliases: {
      external_id: [userName],
    },
    target_channel: 'push',
    send_after: date,
  };

  const req = await fetch(`${baseUrl}?c=push`, {
    method: 'POST',
    headers,
    body: JSON.stringify(notification),
  });
  return req.json();
}

export async function deleteNotification(notificationId: string) {
  const req = await fetch(`${baseUrl}/${notificationId}?app_id=${oneSignalAppId}`, {
    method: 'DELETE',
    headers,
  });
  return req.json();
}
