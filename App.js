import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet,View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
      const subscription = Notifications.addNotificationReceivedListener((notificaton) => {
        console.log(notificaton);
        console.log('NOTIFICATION HANDLER');
        const username = notificaton.request.content.data.username;
        console.log(username);
      });
      return () => subscription.remove();
    }, []);
  function notificationHandler(){
    Notifications.scheduleNotificationAsync({
      content:{
        title: 'My local notification',
        body: 'My first local notification',
        data: {username: 'SAI'}
      },
      trigger: {
        second: 5,
      }
    });
  }
  return (
    <View style={styles.container}>
    <Button title="Send Notification" onPress={notificationHandler}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
