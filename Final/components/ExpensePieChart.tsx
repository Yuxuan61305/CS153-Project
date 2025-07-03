import { useExpenses } from '@/app/(tab)/context';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const trackedTags = ['Transportation', 'Food & Drink', 'Housing', 'Personal Care'];
const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth * 0.9;
const colors = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2'];

const ExpensePieChart = () => {
  const { expenses } = useExpenses();

  const summary = trackedTags.map((tag) => {
    const total = expenses
      .filter((item) => item.tag?.trim().toLowerCase() === tag.toLowerCase())
      .reduce((sum, item) => {
        const cleaned = item.amount?.replace(/[^0-9.-]+/g, '');
        const value = parseFloat(cleaned);
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
    return { name: tag, total };
  }).filter(item => item.total > 0);

  const totalAmount = summary.reduce((sum, item) => sum + item.total, 0);

  const pieData = summary.map((item, index) => {
    const percentage = (item.total / totalAmount) * 100;
    return {
      name: item.name,
      percentage: percentage.toFixed(1),
      population: item.total,
      color: colors[index % colors.length],
      legendFontColor: '#333',
      legendFontSize: 14,
    };
  });

  return (
    <View style={styles.container}>
      
      <View style={styles.chartWrapper}>
        <PieChart
          data={pieData}
          width={chartWidth}
          height={220}
          chartConfig={{
            color: () => `rgba(0, 0, 0, 1)`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0" 
          hasLegend={false}
          absolute
        />
      </View>

      
      <View style={styles.legendContainer}>
        {pieData.map((slice, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorDot, { backgroundColor: slice.color }]} />
            <Text style={styles.legendText}>
              {`${slice.percentage}% ${slice.name}`}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  chartWrapper: {
    width: chartWidth,
    marginLeft: (screenWidth - chartWidth) / 0.22, 
  },
  legendContainer: {
    marginTop: 16,
    width: '90%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ExpensePieChart;
