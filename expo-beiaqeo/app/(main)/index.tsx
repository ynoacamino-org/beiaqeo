import { useTheme } from '@react-navigation/native';
import { IconCheck, IconClock, IconMapPin } from '@tabler/icons-react-native';
import React from 'react';
import { Text, View } from 'react-native';

const WEEK_DAYS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'];


export default function HomeScreen() {
  const {colors} = useTheme();
  return (
    <View className="flex-1 justify-start items-center px-6 gap-6">
      <View className="bg-green-100/70 px-6 py-10 rounded-xl w-full flex flex-col items-center justify-center gap-6">
        <View className="rounded-full bg-green-700 aspect-square p-9">
          <IconMapPin color={'#ffffff'} size={36} />
        </View>
        <View className='flex flex-col gap-2'>
          <Text className="text-center text-xl font-semibold">
            Presente en Zona
          </Text>
          <Text className="text-center text-foreground text-lg opacity-60">
            Citesoft
          </Text>
        </View>
        <View className="text-center items-center flex-row flex gap-1">
          <IconClock color={colors.text} size={24} />
          <Text className="text-xl text-foreground" style={{color: colors.text, fontFamily: 'RobotoMonoMedium'}}>
            15:04 min
          </Text>
        </View>
      </View>
      <View className="px-6 pt-5 pb-6 rounded-xl w-full border-2 border-gray-200 flex flex-col items-center justify-center gap-6">
        <Text className="text-start text-lg font-bold w-full">
          Esta Semana
        </Text>
        <View className='flex flex-row w-full justify-between'>
          {WEEK_DAYS.map((day) => (
            <View key={day} className="flex flex-col items-center justify-center gap-2">
              <View className="rounded-full bg-green-700 aspect-square p-2">
                <IconCheck color={'#ffffff'} size={20} />
              </View>
              <Text className="text-foreground text-sm opacity-60" style={{color: colors.text}}>{day}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
