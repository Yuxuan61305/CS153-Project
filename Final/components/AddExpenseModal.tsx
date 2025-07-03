import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Category list
const expenseCategories = [
  'Food & Drink',
  'Transportation',
  'Housing',
  'Health & Fitness',
  'Entertainment',
  'Shopping',
  'Education',
  'Personal Care',
  'Travel',
  'Insurance',
  'Miscellaneous',
];

// Category icons and colors
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

const AddExpenseModal = ({ modalVisible, setModalVisible, onAddExpense }) => {
  const [newDate, setNewDate] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);

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
      description: newDescription,
    };

    onAddExpense(newExpense);
    resetFields();
  };

  const resetFields = () => {
    setNewDate('');
    setNewTag('');
    setNewAmount('');
    setNewDescription('');
    setShowCategoryList(false);
    setModalVisible(false);
  };

  const handleSelectCategory = (category) => {
    setNewTag(category);
    setShowCategoryList(false);
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

          {/* Category Picker */}
          <TouchableOpacity
            onPress={() => setShowCategoryList(!showCategoryList)}
            style={styles.input}
          >
            <Text>{newTag || 'Select Tag'}</Text>
          </TouchableOpacity>

          {showCategoryList && (
            <ScrollView style={styles.categoryList}>
              {expenseCategories.map((category) => {
                const iconData = categoryIcons[category] || { name: 'pricetag-outline', color: '#555' };
                return (
                  <TouchableOpacity
                    key={category}
                    onPress={() => handleSelectCategory(category)}
                    style={styles.categoryItem}
                  >
                    <View style={styles.categoryRow}>
                      <Ionicons
                        name={iconData.name}
                        size={18}
                        color={iconData.color}
                        style={{ marginRight: 8 }}
                      />
                      <Text>{category}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

          {/* Amount */}
          <TextInput
            placeholder="Amount (e.g., 15)"
            value={newAmount}
            onChangeText={setNewAmount}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor={'black'}
          />

          {/* Description */}
          <TextInput
            placeholder="Description (e.g., McDonald's)"
            value={newDescription}
            onChangeText={setNewDescription}
            style={styles.input}
            placeholderTextColor={'black'}
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
    maxHeight: '90%',
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
    backgroundColor:'transparent',
  },
  categoryList: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  categoryItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});
