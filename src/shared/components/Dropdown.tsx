import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '@/shared/components/ui/icon-symbol';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
}

export function Dropdown({ label, options, selectedValue, onSelect }: DropdownProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={() => setExpanded(!expanded)} 
        activeOpacity={0.7}
      >
        <Text style={styles.headerText}>{label}</Text>
        <IconSymbol name={expanded ? "chevron.up" : "chevron.down"} size={28} color="#000" />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.optionsList}>
          {options.map((option) => {
            const isSelected = selectedValue === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={[styles.optionItem, isSelected ? styles.optionSelected : styles.optionUnselected]}
                onPress={() => {
                  onSelect(option.value);
                  setExpanded(false);
                }}
                activeOpacity={0.8}
              >
                <Text style={[styles.optionText, isSelected ? styles.optionTextSelected : styles.optionTextUnselected]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 4,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  optionsList: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 6,
  },
  optionSelected: {
    backgroundColor: '#00B4E4',
  },
  optionUnselected: {
    backgroundColor: '#F7F7F7',
  },
  optionText: {
    // common styles if any
  },
  optionTextSelected: {
    fontWeight: '400',
    fontSize: 14,
    color: '#ffffff',
  },
  optionTextUnselected: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000000',
  },
});
