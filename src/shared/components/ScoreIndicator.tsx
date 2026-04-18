import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScoreIndicatorProps {
  score: number; // 0 to 10
  size?: number;
}

export function ScoreIndicator({ score, size = 50 }: ScoreIndicatorProps) {
  const percentage = Math.round(score * 10);
  
  let color = '#21d07a'; // Green for high scores
  if (percentage < 70) color = '#d2d531'; // Yellow for medium
  if (percentage < 40) color = '#db2360'; // Red for low

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <View style={[styles.progressRing, { 
        width: size, 
        height: size, 
        borderRadius: size / 2,
        borderColor: color,
        borderWidth: size * 0.08
      }]}>
        <View style={styles.innerCircle}>
          <Text style={[styles.scoreText, { fontSize: size * 0.3 }]}>
            {percentage}<Text style={styles.percentSign}>%</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#081c22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRing: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  percentSign: {
    fontSize: 10,
    position: 'absolute',
    top: 0,
  },
});
