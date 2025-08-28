import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5 bg-background dark:bg-background">
        <Text className="text-xl font-bold text-foreground dark:text-foreground">
          This screen does not exist.
        </Text>
        <Link href="/" className="mt-4 py-3">
          <Text className="text-primary dark:text-primary font-semibold">
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}
