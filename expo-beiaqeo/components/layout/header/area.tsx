import { IconCheck, IconChevronDown, IconChevronUp } from '@tabler/icons-react-native';
import React, { useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

const CONTEXTS = [
  { id: '1', name: 'Trabajo' },
  { id: '2', name: 'Personal' },
  { id: '3', name: 'Proyecto A' },
  { id: '4', name: 'Proyecto B' },
];

export default function Area() {
  const [selectedContext, setSelectedContext] = useState(CONTEXTS[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleContextSelect = (context: typeof CONTEXTS[0]) => {
    setSelectedContext(context);
    setShowDropdown(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowDropdown(true)}
        className="flex-row items-center bg-gray-100 px-3 py-2 rounded-lg"
      >
        <Text className="text-gray-800 mr-2 min-w-20">{selectedContext.name}</Text>
        {showDropdown ? (
          <IconChevronUp size={16} color="#6B7280" />
        ) : (
          <IconChevronDown size={16} color="#6B7280" />
        )}
      </TouchableOpacity>
      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/20"
          activeOpacity={1}
          onPress={() => setShowDropdown(false)}
        >
          <View className="absolute top-16 left-4 right-4 bg-card rounded-lg shadow-lg">
            <FlatList
              data={CONTEXTS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleContextSelect(item)}
                  className="px-4 py-3 border-b border-gray-100 last:border-b-0 flex-row items-center justify-between"
                >
                  <Text className={`${item.id === selectedContext.id
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-800'
                    }`}>
                    {item.name}
                  </Text>
                  {item.id === selectedContext.id && (
                    <IconCheck size={16} color="#2563EB" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  )
}