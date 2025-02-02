import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet,View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

// Refere to this documentation to understand the notification feautre and how to implement it in the React native applications.
//https://docs.expo.dev/versions/latest/sdk/notifications/#addnotificationreceivedlistenerlistener
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    //Enabling the notifications
      const subscription1 = Notifications.addNotificationReceivedListener((notificaton) => {
        console.log(notificaton);
        console.log('NOTIFICATION HANDLER');
        const username = notificaton.request.content.data.username;
        console.log(username);
      });

      //Handling the notifications with the response
      const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('NOTIFICATION RESPONSE RECIEVED');
        console.log(response);
        const username = response.request.content.data.username;
        console.log(username);
      });
      return () => {
        subscription1.remove();
        subscription2.remove();
      }
    }, []);
  function notificationHandler(){
    Notifications.scheduleNotificationAsync({
      content:{
        title: 'My local notification',
        body: 'My first local notification',
        data: {username: 'SAI'}
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
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
