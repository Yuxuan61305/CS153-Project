import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import CustomPieChart from '@/components/CustomPieChart';
import AddExpenseModal from '@/components/AddExpenseModal';
import { useExpenses } from '@/app/(tab)/context';



export default function App() {
  const [expenses, setExpenses] = useState([
    { id: '1', date: '2025-06-01', tag: 'Name', amount: '$15' },
    { id: '2', date: '2025-06-02', tag: 'Transport', amount: '$10' },
    { id: '3', date: '2025-06-03', tag: 'Clothes', amount: '$20' },
  ]);

  const { addExpense } = useExpenses()

   const series = [
    { name: 'Yellow', population: 400, color: '#fbd203', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Orange', population: 321, color: '#ffb300', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Dark Orange', population: 185, color: '#ff9100', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Red', population: 123, color: '#ff6c00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];
  
  const [modalVisible, setModalVisible] = useState(false)
  const router = useRouter();


  const UpdateList = (useExpenses: any) => {
    setExpenses((prevExpenses) => {
      const updated = [useExpenses, ...prevExpenses];
      if (updated.length > 3) {
        updated.pop(); 
      }
      return updated;
    });
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>

      <AddExpenseModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onAddExpense={addExpense}
      />
      <Text style={styles.title}>Monthly Expense Breakdown</Text>
      
       <CustomPieChart title="" data={series} />

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


      <View style={styles.buttonContainer}>
        <Button title="Add Expense" onPress={()=>setModalVisible(true)} />
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  }

});