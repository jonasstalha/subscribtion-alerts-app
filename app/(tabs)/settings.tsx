import { View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Shield, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={20} color="#007AFF" />
            <Text style={styles.settingLabel}>Payment Reminders</Text>
          </View>
          <Switch value={true} />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={20} color="#007AFF" />
            <Text style={styles.settingLabel}>Trial Expiration</Text>
          </View>
          <Switch value={true} />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={20} color="#007AFF" />
            <Text style={styles.settingLabel}>Price Changes</Text>
          </View>
          <Switch value={true} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Shield size={20} color="#FF9500" />
            <Text style={styles.settingLabel}>Privacy Settings</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <HelpCircle size={20} color="#34C759" />
            <Text style={styles.settingLabel}>Help Center</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.logoutButton}>
          <LogOut size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1c1c1e',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#1c1c1e',
    marginLeft: 12,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});