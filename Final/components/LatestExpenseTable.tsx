import { useExpenses } from '@/app/(tab)/context';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Icon mapping
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

const LatestExpensesTable = () => {
  const { expenses } = useExpenses();

  const latestThree = expenses.slice(0, 3);
  const missingCount = 3 - latestThree.length;

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, styles.dateCol]}>Date</Text>
        <Text style={[styles.headerText, styles.tagCol]}>Tag</Text>
        <Text style={[styles.headerText, styles.amountCol]}>Amount</Text>
      </View>

      {/* Existing expense rows */}
      {latestThree.map((item) => {
        const iconData = categoryIcons[item.tag] || { name: 'pricetag-outline', color: '#555' };

        return (
          <View key={item.id} style={styles.tableRow}>
            <Text style={[styles.rowText, styles.dateCol]}>{item.date}</Text>

            <View style={[styles.rowText, styles.tagCol, styles.tagRow]}>
              <Text>{item.tag}</Text>
              <Ionicons
                name={iconData.name}
                size={16}
                color={iconData.color}
                style={{ marginLeft: 5 }}
              />
            </View>

            <Text style={[styles.rowText, styles.amountCol]}>{item.amount}</Text>
          </View>
        );
      })}

      {/* Add "None" rows if less than 3 expenses */}
      {missingCount > 0 &&
        Array.from({ length: missingCount }).map((_, index) => (
          <View key={`none-${index}`} style={styles.tableRow}>
            <Text style={[styles.rowText, styles.dateCol]}>None</Text>
            <Text style={[styles.rowText, styles.tagCol]}>None</Text>
            <Text style={[styles.rowText, styles.amountCol]}>None</Text>
          </View>
        ))}
    </View>
  );
};

export default LatestExpensesTable;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rowText: {
    textAlign: 'center',
  },
  dateCol: {
    flex: 1,
  },
  tagCol: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountCol: {
    flex: 1,
  },
});
