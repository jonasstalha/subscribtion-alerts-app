import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Clock, CreditCard, TriangleAlert as AlertTriangle } from 'lucide-react-native';

const notifications = [
  {
    id: '1',
    type: 'payment',
    title: 'Netflix Payment Due',
    message: 'Your Netflix subscription ($15.99) is due in 2 days',
    time: '2 days',
    icon: CreditCard,
    color: '#007AFF',
  },
  {
    id: '2',
    type: 'trial',
    title: 'Trial Ending Soon',
    message: 'Your Apple TV+ trial ends in 3 days',
    time: '3 days',
    icon: Clock,
    color: '#FF9500',
  },
  {
    id: '3',
    type: 'alert',
    title: 'Price Increase',
    message: 'Spotify Premium price will increase by $1 next month',
    time: '5 days',
    icon: AlertTriangle,
    color: '#FF3B30',
  },
];

export default function NotificationsScreen() {
  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
        <item.icon size={24} color={item.color} />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{notifications.length}</Text>
        </View>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c1c1e',
    flex: 1,
  },
  badge: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    padding: 20,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#8e8e93',
  },
});