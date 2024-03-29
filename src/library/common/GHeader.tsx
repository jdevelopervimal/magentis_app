import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@react-native-material/core';

export default function GHeader({ScreenTitle = ''}) {
  return (
    <View style={styles.container}>
      <Text variant="h4">{ScreenTitle}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
