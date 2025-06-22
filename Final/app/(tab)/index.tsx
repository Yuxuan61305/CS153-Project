import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  Modal,
  Alert,
  Pressable,
  TouchableOpacity
} from 'react-native';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { normalizeColor } from 'react-native-reanimated/lib/typescript/Colors';

export default function App() {
  const [expenses, setExpenses] = useState([
    { id: '1', date: '2025-06-01', tag: 'Name', amount: '$15' },
    { id: '2', date: '2025-06-02', tag: 'Transport', amount: '$10' },
    { id: '3', date: '2025-06-03', tag: 'Clothes', amount: '$20' },
  ]);

  const [newDate, setNewDate] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false)
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddExpense = () => {
    setModalVisible(true);
  };

  const UpdateList = (newExpense) => {
    setExpenses((prevExpenses) => {
      const updated = [newExpense, ...prevExpenses];
      if (updated.length > 3) {
        updated.pop(); 
      }
      return updated;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>New Expense</Text>

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
              <Text>{newDate || 'Select Date'}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={newDate ? new Date(newDate) : new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    const formatted = selectedDate.toISOString().split('T')[0];
                    setNewDate(formatted);
                  }
                }}
              />
            )}
            <TextInput
              placeholder="Tag (e.g. Food)"
              value={newTag}
              onChangeText={setNewTag}
              style={styles.input}
            />
            <TextInput
              placeholder="Amount (e.g. 15)"
              value={newAmount}
              onChangeText={setNewAmount}
              keyboardType="numeric"
              style={styles.input}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button
                title="Add"
                onPress={() => {
                  if (!newDate || !newTag || !newAmount) {
                    alert("Please fill all fields correctly.");
                    return;
                  }

                  const newExpense = {
                    id: Date.now().toString(),
                    date: newDate,
                    tag: newTag,
                    amount: `$${parseFloat(newAmount).toFixed(0)}`
                  };
                  
                  UpdateList(newExpense);

                  setNewDate('');
                  setNewTag('');
                  setNewAmount('');
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
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