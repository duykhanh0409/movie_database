import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChipProps {
  label: string;
}

export function Chip({ label }: ChipProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ffffff50',
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
});
