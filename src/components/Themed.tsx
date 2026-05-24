// components/Themed.tsx
import React from 'react';
import { Text, TextProps, View, ViewProps } from 'react-native';
import { useTheme } from './ThemeProvider';

export function ThemedView(props: ViewProps) {
  const { themeColors } = useTheme();
  return (
    <View
      {...props}
      style={[{ backgroundColor: themeColors.background }, props.style]}
    />
  );
}

export function ThemedText(props: TextProps & { type?: 'title' | 'small' | 'default' }) {
  const { themeColors } = useTheme();
  const { type = 'default', style, ...otherProps } = props;

  let fontSize = 16;
  let fontWeight: '400' | '600' | '700' = '400';

  if (type === 'title') {
    fontSize = 24;
    fontWeight = '700';
  } else if (type === 'small') {
    fontSize = 14;
  }

  return (
    <Text
      {...otherProps}
      style={[
        {
          color: themeColors.text,
          fontSize,
          fontWeight,
        },
        style,
      ]}
    />
  );
}