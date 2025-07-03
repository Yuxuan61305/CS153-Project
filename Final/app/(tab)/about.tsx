import { useExpenses } from '@/app/(tab)/context';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const categoryIcons = {
  'Food & Drink': { name: 'fast-food-outline', color: '#FF9800' },
  'Transportation': { name: 'car-outline', color: '#03A9F4' },
  'Housing': { name: 'home-outline', color: '#2196F3' },
  'Health & Fitness': { name: 'barbell-outline', color: '#8BC34A' },
  'Entertainment': { name: 'film-outline', color: '#FF5722' },
  'Shopping': { name: 'cart-outline', color: '#9C27B0' },
  'Education': { name: 'school-outline', color: '#F44336' },
  'Personal Care': { name: 'happy-outline', color: '#FFC107' },
  'Travel': { name: 'airplane-outline', color: '#00BCD4' },
  'Insurance': { name: 'shield-checkmark-outline', color: '#607D8B' },
  'Miscellaneous': { name: 'ellipsis-horizontal-outline', color: '#9E9E9E' },
};

const About = () => {
  const { expenses, deleteExpense } = useExpenses();

  const renderItem = ({ item }) => {
    const iconData = categoryIcons[item.tag] || { name: 'pricetag-outline', color: '#555' };

    return (
      <View style={styles.card}>
        <Text style={styles.text}>
          <Text style={styles.label}>Date:</Text> {item.date}
        </Text>

        <View style={styles.tagRow}>
          <Text style={styles.text}>
            <Text style={styles.label}>Tag:</Text> {item.tag}
          </Text>
          <Ionicons
            name={iconData.name}
            size={20}
            color={iconData.color}
            style={{ marginRight: 5 }}
          />
        </View>

        <Text style={styles.text}>
          <Text style={styles.label}>Amount:</Text> {item.amount}
        </Text>

        <Text style={styles.text}>
          <Text style={styles.label}>Description:</Text> {item.description && item.description.trim() !== '' ? item.description : 'None'}
        </Text>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteExpense(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {expenses.length === 0 ? (
        <Text style={styles.emptyText}>No expenses recorded yet.</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  text: {
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
