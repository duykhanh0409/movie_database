import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';

interface ErrorStateProps {
  error: Error | null;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Oops!</ThemedText>
      <ThemedText style={styles.message}>
        {error?.message || 'Something went wrong.'}
      </ThemedText>
      <Button title="Try Again" onPress={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  message: {
    marginTop: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
});
