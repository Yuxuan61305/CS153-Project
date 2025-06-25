import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddExpenseModal = ({ modalVisible, setModalVisible, onAddExpense }) => {
  
  const [newDate, setNewDate] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAdd = () => {
    if (!newDate || !newTag || !newAmount) {
      alert('Please fill all fields');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      date: newDate,
      tag: newTag,
      amount: `$${parseFloat(newAmount).toFixed(0)}`,
    };

    onAddExpense(newExpense);  // <-- Call the global addExpense function
    resetFields();
  };

  const resetFields = () => {
    setNewDate('');
    setNewTag('');
    setNewAmount('');
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={resetFields}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>New Expense</Text>

          {/* Date Picker */}
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

          {/* Tag */}
          <TextInput
            placeholder="Tag (e.g., Food)"
            value={newTag}
            onChangeText={setNewTag}
            style={styles.input}
          />

          {/* Amount */}
          <TextInput
            placeholder="Amount (e.g., 15)"
            value={newAmount}
            onChangeText={setNewAmount}
            keyboardType="numeric"
            style={styles.input}
          />

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={resetFields} />
            <Button title="Add" onPress={handleAdd} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddExpenseModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});
