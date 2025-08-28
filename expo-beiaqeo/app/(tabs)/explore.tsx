import { Image } from 'expo-image';
import { Platform, ScrollView, View, Text } from 'react-native';

import { Collapsible } from '@/components/ui/Collapsible';
import { ExternalLink } from '@/components/ui/ExternalLink';

export default function TabTwoScreen() {
  return (
    <ScrollView className="flex-1 bg-background p-4">
      <View className="flex-row items-center gap-2 mb-4">
        <Text className="text-2xl font-bold text-foreground">Explore</Text>
      </View>

      <Text className="text-foreground mb-4">
        This app includes example code to help you get started.
      </Text>

      <Collapsible title="File-based routing">
        <Text className="text-foreground">
          This app has two screens:{' '}
          <Text className="font-semibold">app/(tabs)/index.tsx</Text> and{' '}
          <Text className="font-semibold">app/(tabs)/explore.tsx</Text>
        </Text>
        <Text className="text-foreground">
          The layout file in{' '}
          <Text className="font-semibold">app/(tabs)/_layout.tsx</Text>{' '}
          sets up the tab navigator.
        </Text>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <Text className="text-primary">Learn more</Text>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Android, iOS, and web support">
        <Text className="text-foreground">
          You can open this project on Android, iOS, and the web. To open the
          web version, press <Text className="font-semibold">w</Text> in the
          terminal running this project.
        </Text>
      </Collapsible>

      <Collapsible title="Images">
        <Text className="text-foreground">
          For static images, you can use the{' '}
          <Text className="font-semibold">@2x</Text> and{' '}
          <Text className="font-semibold">@3x</Text> suffixes to provide files
          for different screen densities.
        </Text>
        <Image
          source={require('@/assets/images/react-logo.png')}
          className="self-center my-2 w-24 h-24"
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <Text className="text-primary">Learn more</Text>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Custom fonts">
        <Text className="text-foreground">
          Open <Text className="font-semibold">app/_layout.tsx</Text> to see how
          to load <Text className="font-spaceMono">custom fonts such as this one.</Text>
        </Text>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <Text className="text-primary">Learn more</Text>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Light and dark mode components">
        <Text className="text-foreground">
          This template has light and dark mode support. The{' '}
          <Text className="font-semibold">useColorScheme()</Text> hook lets you
          inspect what the users current color scheme is, and so you can adjust
          UI colors accordingly.
        </Text>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <Text className="text-primary">Learn more</Text>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Animations">
        <Text className="text-foreground">
          This template includes an example of an animated component. The{' '}
          <Text className="font-semibold">components/HelloWave.tsx</Text>{' '}
          component uses the powerful{' '}
          <Text className="font-semibold">react-native-reanimated</Text>{' '}
          library to create a waving hand animation.
        </Text>
        {Platform.select({
          ios: (
            <Text className="text-foreground">
              The{' '}
              <Text className="font-semibold">
                components/ParallaxScrollView.tsx
              </Text>{' '}
              component provides a parallax effect for the header image.
            </Text>
          ),
        })}
      </Collapsible>
    </ScrollView>
  );
}
