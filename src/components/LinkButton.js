import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './Button';

const LinkButton = ({ style, children, ...rest }) => (
  <Button
    {...rest}
    style={[styles.button, style]}
  >
    {children}
  </Button>
);

const styles = StyleSheet.create({
  button: {
    borderWidth: 0
  }
});

export default LinkButton;
