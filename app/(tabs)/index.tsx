import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, TrendingUp, Clock, Trash2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSubscriptionStore } from '@/store/subscriptionStore';
import { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { subscriptions, loadSubscriptions, getTotalMonthly, removeSubscription } = useSubscriptionStore();

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const totalMonthly = getTotalMonthly();
  const sortedSubscriptions = [...subscriptions].sort(
    (a, b) => parseISO(a.nextPayment).getTime() - parseISO(b.nextPayment).getTime()
  );
  const nextPayment = sortedSubscriptions[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, User!</Text>
          <Text style={styles.date}>{format(new Date(), 'MMMM yyyy')}</Text>
        </View>

        <LinearGradient
          colors={['#007AFF', '#00C6FF']}
          style={styles.monthlyOverview}>
          <Text style={styles.monthlyTitle}>Monthly Subscriptions</Text>
          <Text style={styles.monthlyAmount}>${totalMonthly.toFixed(2)}</Text>
          <View style={styles.monthlyStats}>
            <View style={styles.statItem}>
              <TrendingUp size={20} color="#fff" />
              <Text style={styles.statText}>Active subscriptions: {subscriptions.length}</Text>
            </View>
          </View>
        </LinearGradient>

        {nextPayment && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Next Payment</Text>
            <View style={styles.paymentCard}>
              <View style={styles.paymentInfo}>
                <Text style={styles.serviceName}>{nextPayment.name}</Text>
                <Text style={styles.paymentDate}>
                  Due {format(parseISO(nextPayment.nextPayment), 'MMM dd, yyyy')}
                </Text>
              </View>
              <Text style={styles.paymentAmount}>${nextPayment.price}</Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Subscriptions</Text>
          {subscriptions.map((subscription) => (
            <View key={subscription.id} style={styles.subscriptionCard}>
              <View style={styles.subscriptionInfo}>
                <Text style={styles.subscriptionName}>{subscription.name}</Text>
                <Text style={styles.subscriptionCycle}>
                  ${subscription.price} / {subscription.billingCycle}
                </Text>
              </View>
              <View style={styles.subscriptionActions}>
                <Text style={styles.subscriptionCategory}>
                  {subscription.category.charAt(0).toUpperCase() + subscription.category.slice(1)}
                </Text>
                <Pressable
                  onPress={() => removeSubscription(subscription.id)}
                  style={styles.deleteButton}>
                  <Trash2 size={20} color="#FF3B30" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        <Pressable style={styles.addButton} onPress={() => router.push('/new')}>
          <Plus size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add New Subscription</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c1c1e',
  },
  date: {
    fontSize: 16,
    color: '#8e8e93',
    marginTop: 4,
  },
  monthlyOverview: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  monthlyTitle: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
  },
  monthlyAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  monthlyStats: {
    flexDirection: 'row',
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 12,
  },
  paymentCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  paymentInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  paymentDate: {
    fontSize: 14,
    color: '#8e8e93',
    marginTop: 4,
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  subscriptionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  subscriptionCycle: {
    fontSize: 14,
    color: '#8e8e93',
    marginTop: 4,
  },
  subscriptionActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subscriptionCategory: {
    fontSize: 14,
    color: '#007AFF',
    marginRight: 12,
  },
  deleteButton: {
    padding: 8,
  },
  addButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});