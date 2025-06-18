import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

// Helper to generate dummy records
const generateRandomExpenses = () => {
  const months = ['2025-06', '2025-05', '2025-04'];
  const tags = ['Food', 'Transport', 'Clothes', 'Books', 'Health'];

  return months.map((month) => {
    const entries = Array.from({ length: 5 }, (_, i) => {
      const date = `${month}-${String(i + 1).padStart(2, '0')}`;
      const tag = tags[Math.floor(Math.random() * tags.length)];
      const amount = `$${(Math.random() * 40 + 5).toFixed(0)}`;
      return { date, tag, amount };
    });

    return { month, entries };
  });
};

export default function ViewMoreScreen() {
  const groupedExpenses = generateRandomExpenses();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {groupedExpenses.map(({ month, entries }) => (
        <View key={month} style={styles.section}>
          <Text style={styles.monthLabel}>{month}</Text>

          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Date</Text>
            <Text style={styles.headerText}>Tag</Text>
            <Text style={styles.headerText}>Amount</Text>
          </View>

          {entries.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.rowText}>{item.date}</Text>
              <Text style={styles.rowText}>{item.tag}</Text>
              <Text style={styles.rowText}>{item.amount}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  monthLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 6,
    marginBottom: 6,
  },
  headerText: {
    width: '30%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  rowText: {
    width: '30%',
    textAlign: 'center',
  },
});
