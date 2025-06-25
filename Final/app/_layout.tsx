import { Stack } from 'expo-router';
import { ExpenseProvider } from '@/app/(tab)/context';  

export default function RootLayout() {
  return (
    <ExpenseProvider>
      <Stack />
    </ExpenseProvider>
  );
}
