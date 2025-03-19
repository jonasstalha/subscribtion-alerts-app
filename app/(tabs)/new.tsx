import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { CreditCard, Calendar, Clock, Tag } from 'lucide-react-native';
import { useSubscriptionStore } from '@/store/subscriptionStore';

const popularServices = [
  { name: 'Netflix', price: 15.99, icon: '📺', category: 'streaming' },
  { name: 'Spotify', price: 9.99, icon: '🎵', category: 'music' },
  { name: 'Disney+', price: 7.99, icon: '🎬', category: 'streaming' },
  { name: 'Apple TV+', price: 6.99, icon: '🍎', category: 'streaming' },
];

export default function NewSubscriptionScreen() {
  const addSubscription = useSubscriptionStore((state) => state.addSubscription);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [category, setCategory] = useState('streaming');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name || !price) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      await addSubscription({
        name,
        price: parseFloat(price),
        billingCycle: billingCycle as 'monthly' | 'yearly' | 'quarterly',
        category,
      });
      router.back();
    } catch (err) {
      setError('Failed to add subscription');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Subscription</Text>
          <Pressable onPress={() => router.back()} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.quickAdd}>
          <Text style={styles.sectionTitle}>Quick Add</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.serviceList}>
            {popularServices.map((service) => (
              <Pressable
                key={service.name}
                style={styles.serviceItem}
                onPress={() => {
                  setName(service.name);
                  setPrice(service.price.toString());
                  setCategory(service.category);
                }}>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.servicePrice}>${service.price}/mo</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Tag size={20} color="#007AFF" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Service Name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setError(null);
              }}
              placeholderTextColor="#8e8e93"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <CreditCard size={20} color="#007AFF" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={price}
              onChangeText={(text) => {
                setPrice(text.replace(/[^0-9.]/g, ''));
                setError(null);
              }}
              keyboardType="decimal-pad"
              placeholderTextColor="#8e8e93"
            />
          </View>

          <Text style={styles.sectionTitle}>Billing Cycle</Text>
          <View style={styles.cycleContainer}>
            {['monthly', 'yearly', 'quarterly'].map((cycle) => (
              <Pressable
                key={cycle}
                style={[
                  styles.cycleOption,
                  billingCycle === cycle && styles.cycleOptionSelected,
                ]}
                onPress={() => setBillingCycle(cycle)}>
                <Text
                  style={[
                    styles.cycleText,
                    billingCycle === cycle && styles.cycleTextSelected,
                  ]}>
                  {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoryContainer}>
            {['streaming', 'music', 'cloud', 'other'].map((cat) => (
              <Pressable
                key={cat}
                style={[
                  styles.categoryOption,
                  category === cat && styles.categoryOptionSelected,
                ]}
                onPress={() => setCategory(cat)}>
                <Text
                  style={[
                    styles.categoryText,
                    category === cat && styles.categoryTextSelected,
                  ]}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Add Subscription</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c1c1e',
  },
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: '#FFE5E5',
    padding: 12,
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
  },
  quickAdd: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 12,
  },
  serviceList: {
    flexDirection: 'row',
  },
  serviceItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minWidth: 100,
  },
  serviceIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 14,
    color: '#007AFF',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputIcon: {
    padding: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#1c1c1e',
  },
  cycleContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  cycleOption: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cycleOptionSelected: {
    backgroundColor: '#007AFF',
  },
  cycleText: {
    color: '#1c1c1e',
    fontSize: 14,
    fontWeight: '500',
  },
  cycleTextSelected: {
    color: '#fff',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  categoryOption: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    minWidth: '45%',
    alignItems: 'center',
  },
  categoryOptionSelected: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    color: '#1c1c1e',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});