import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSubscriptionStore } from '@/store/subscriptionStore';
import { useEffect } from 'react';

export default function StatisticsScreen() {
  const { loadSubscriptions, getSubscriptionsByCategory, getTotalMonthly } = useSubscriptionStore();
  const categories = getSubscriptionsByCategory();
  const totalMonthly = getTotalMonthly();

  useEffect(() => {
    loadSubscriptions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Subscription Statistics</Text>
        
        <View style={styles.chartContainer}>
          <View style={styles.donutChart}>
            {categories.map((category, index) => {
              const rotation = index * (360 / categories.length);
              return (
                <View
                  key={category.name}
                  style={[
                    styles.donutSegment,
                    {
                      backgroundColor: category.color,
                      transform: [
                        { rotate: `${rotation}deg` },
                        { scale: category.percentage / 100 }
                      ],
                    },
                  ]}
                />
              );
            })}
            <View style={styles.donutHole}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>${totalMonthly.toFixed(2)}</Text>
              <Text style={styles.totalPeriod}>per month</Text>
            </View>
          </View>
        </View>

        <View style={styles.legendContainer}>
          {categories.map(category => (
            <View key={category.name} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: category.color }]} />
              <View style={styles.legendText}>
                <Text style={styles.legendName}>
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </Text>
                <Text style={styles.legendPercentage}>{category.percentage}%</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Most Expensive</Text>
            <Text style={styles.statValue}>
              {categories.length > 0 ? categories[0].name : 'N/A'}
            </Text>
            <Text style={styles.statAmount}>
              {categories.length > 0 ? `${categories[0].percentage}%` : '$0.00/mo'}
            </Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Annual Total</Text>
            <Text style={styles.statValue}>Projected</Text>
            <Text style={styles.statAmount}>${(totalMonthly * 12).toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c1c1e',
    padding: 20,
  },
  chartContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  donutChart: {
    width: 200,
    height: 200,
    position: 'relative',
  },
  donutSegment: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    opacity: 0.8,
  },
  donutHole: {
    position: 'absolute',
    top: '25%',
    left: '25%',
    width: '50%',
    height: '50%',
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 14,
    color: '#8e8e93',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c1c1e',
  },
  totalPeriod: {
    fontSize: 12,
    color: '#8e8e93',
  },
  legendContainer: {
    padding: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendName: {
    fontSize: 16,
    color: '#1c1c1e',
  },
  legendPercentage: {
    fontSize: 16,
    color: '#8e8e93',
  },
  statsContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent:  'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statLabel: {
    fontSize: 14,
    color: '#8e8e93',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
    marginVertical: 4,
  },
  statAmount: {
    fontSize: 16,
    color: '#007AFF',
  },
});