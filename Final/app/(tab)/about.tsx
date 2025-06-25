import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useExpenses } from '@/app/(tab)/context';

const about = () => {
  console.log('Expenses context:', useExpenses());
  const { expenses } = useExpenses();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.text}><Text style={styles.label}>Date:</Text> {item.date}</Text>
      <Text style={styles.text}><Text style={styles.label}>Tag:</Text> {item.tag}</Text>
      <Text style={styles.text}><Text style={styles.label}>Amount:</Text> {item.amount}</Text>

      {item.imageUrl && (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {expenses.length === 0 ? (
        <Text style={styles.emptyText}>No expenses recorded yet.</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default about;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  text: {
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  image: {
    width: '100%',
    height: 150,
    marginTop: 10,
    borderRadius: 5,
  },
});
