import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface ScoreIndicatorProps {
  score: number;
  size?: number;
}

export function ScoreIndicator({ score, size = 50 }: ScoreIndicatorProps) {
  const percentage = Math.round(score * 10);

  const color = '#21d07a';
  const trackColor = '#204529';
  const backgroundColor = '#042541';

  const strokeWidth = size * 0.08;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const containerSize = size + 10;

  return (
    <View style={[styles.container, { width: containerSize, height: containerSize, borderRadius: containerSize / 2, backgroundColor }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Circle
          stroke={trackColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={[styles.scoreText, { fontSize: size * 0.28 }]}>
          {percentage}
          <Text style={[styles.percentSign, { fontSize: size * 0.12 }]}>%</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  percentSign: {
    color: '#fff',
    fontWeight: 'bold',
    position: 'absolute',
    top: 2,
  },
});
