import { PropsWithChildren, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        className="flex-row items-center gap-1.5"
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          className={isOpen ? 'rotate-90 text-muted-foreground' : 'text-muted-foreground'}
        />
        <Text className="font-semibold text-foreground">{title}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View className="mt-1.5 ml-6">
          {children}
        </View>
      )}
    </View>
  );
}
