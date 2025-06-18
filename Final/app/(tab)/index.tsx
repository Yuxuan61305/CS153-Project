import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  Image,
} from 'react-native';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';

export default function App() {
  const [expenses, setExpenses] = useState([
    { id: '1', date: '2025-06-01', tag: 'Food', amount: '$15' },
    { id: '2', date: '2025-06-02', tag: 'Transport', amount: '$10' },
    { id: '3', date: '2025-06-03', tag: 'Clothes', amount: '$20' },
  ]);

  const [newDate, setNewDate] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const router = useRouter();

  const handleAddExpense = () => {
    if (newDate && newTag && newAmount) {
      const newExpense = {
        id: (expenses.length + 1).toString(),
        date: newDate,
        tag: newTag,
        amount: `$${newAmount}`,
      };
      setExpenses([...expenses, newExpense]);
      setNewDate('');
      setNewTag('');
      setNewAmount('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Monthly Expense Breakdown</Text>
      <View style={styles.pieChart}>
        <Image
          source={require('./PieChart.png')}
          style={styles.pieImage}
          resizeMode="contain"
        />
      </View>

      
      <Text style={styles.totalLabel}>
        Total Monthly Expenses: $
        <TextInput
          placeholder="..."
          style={styles.input}
          keyboardType="numeric"
        />
      </Text>

      
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Date</Text>
        <Text style={styles.headerText}>Tag</Text>
        <Text style={styles.headerText}>Amount</Text>
      </View>

      {expenses.map((item) => (
        <View key={item.id} style={styles.tableRow}>
          <Text style={styles.rowText}>{item.date}</Text>
          <Text style={styles.rowText}>{item.tag}</Text>
          <Text style={styles.rowText}>{item.amount}</Text>
        </View>
      ))}

      
      <View style={styles.buttonContainer}>
       <Button title="View More" onPress={() => router.push('(tab)/about')} />
      </View>


      
      <Text style={styles.title}>Add New Expense</Text>
      <View style={styles.inputHeaderRow}>
        <Text style={styles.inputHeaderText}>Date</Text>
        <Text style={styles.inputHeaderText}>Tag</Text>
        <Text style={styles.inputHeaderText}>Amount</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Date"
          value={newDate}
          onChangeText={setNewDate}
          style={styles.expenseInput}
        />
        <TextInput
          placeholder="Tag"
          value={newTag}
          onChangeText={setNewTag}
          style={styles.expenseInput}
        />
        <TextInput
          placeholder="Amount"
          value={newAmount}
          onChangeText={setNewAmount}
          style={styles.expenseInput}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Add Expense" onPress={handleAddExpense} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  pieChart: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    marginBottom: 0,
    marginTop: 0,
  },
  pieImage: {
    width: 300,
    height: 400,
    transform: [{ rotate: '0deg' }],
  },
  totalLabel: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderBottomWidth: 1,
    width: 80,
    fontSize: 16,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 4,
    marginBottom: 6,
    marginTop: 10,
  },
  headerText: {
    fontWeight: 'bold',
    width: '30%',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  rowText: {
    width: '30%',
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  expenseInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    borderRadius: 4,
    width: '30%',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 15,
    alignSelf: 'center',
    width: '60%',
  },
  inputHeaderRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 12,
  paddingBottom: 4,
  borderBottomWidth: 1,
  borderColor: '#ccc',
},
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
inputHeaderText: {
  fontWeight: 'bold',
  width: '30%',
  textAlign: 'center',
},
});