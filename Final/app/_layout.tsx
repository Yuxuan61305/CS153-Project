import { ExpenseProvider } from '@/app/(tab)/context';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ExpenseProvider>
     <Stack>
      <Stack.Screen name = "(tab)" options={{headerShown:false}} />
     </Stack>
    </ExpenseProvider>
  );
}
