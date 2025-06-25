import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useExpenses } from '@/app/(tab)/index';

const ExpenseTable = () => {
  const { expenses } = useExpenses();

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Date</Text>
        <Text style={styles.headerText}>Tag</Text>
        <Text style={styles.headerText}>Amount</Text>
      </View>

      {/* Table Rows */}
      {expenses.map((item) => (
        <View key={item.id} style={styles.tableRow}>
          <Text style={styles.rowText}>{item.date}</Text>
          <Text style={styles.rowText}>{item.tag}</Text>
          <Text style={styles.rowText}>{item.amount}</Text>
        </View>
      ))}
    </View>
  );
};

export default ExpenseTable;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
  },
});
