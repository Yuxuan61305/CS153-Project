import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { useExpenses } from '@/app/(tab)/context';
import AddExpenseModal from '@/components/AddExpenseModal';
import { default as ExpensePieChart } from '@/components/ExpensePieChart';
import LatestExpensesTable from '@/components/LatestExpenseTable';
import Icon from 'react-native-vector-icons/Ionicons';




export default function App() {
  const { addExpense } = useExpenses()


  const [modalVisible, setModalVisible] = useState(false)
  const router = useRouter();


  return (
    <View>
      <AddExpenseModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onAddExpense={addExpense}
      />


     <View>
        <ExpensePieChart />
      </View>
      <View>
        <LatestExpensesTable />
      </View>


      <View style={styles.buttonContainer}>
        <Button title="View More" onPress={() => router.push('(tab)/about')} />
      </View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.plusButton} onPress={() => setModalVisible(true)}>
          <Icon name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>


    </View>
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
    alignItems:'center',
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
  },
   plusButton: {
    backgroundColor: '#2196F3',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

});