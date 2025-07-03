import { useExpenses } from '@/app/(tab)/context';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ExpenseTable = () => {
  const { expenses, deleteExpense } = useExpenses();

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Date</Text>
        <Text style={styles.headerText}>Tag</Text>
        <Text style={styles.headerText}>Amount</Text>
        <Text style = {styles.headerText}>Discription</Text>
        <Text style={styles.headerText}>Action</Text>
      </View>

      {expenses.map((item) => (
        <View key={item.id} style={styles.tableRow}>
          <Text style={styles.rowText}>{item.date}</Text>
          <Text style={styles.rowText}>{item.tag}</Text>
          <Text style={styles.rowText}>${item.amount}</Text>
          <Text style = {styles.rowText}>{item.discription}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteExpense(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
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
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
