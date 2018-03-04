import React from 'react';
import { View, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import Title from './Title';
import AppText from './AppText';
import * as globalStyles from '../styles/global';

// Set the status bar for iOS to light
StatusBar.setBarStyle('light-content');

const IntroScreen = ({ push }) => (
  <View style={[globalStyles.COMMON_STYLES.pageContainer,styles.container]}>
    <TouchableOpacity
      onPress={() => push('onboarding')}
    >
      <Title>React Native News Reader</Title>
      <AppText>Start Reading</AppText>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default IntroScreen;
