import React from 'react';
import { View, Text } from 'react-native';
import { infoRowStyles } from '../styles/molecules/InfoRow.styles';

interface InfoRowProps {
  label: string;
  value: string;
  selectable?: boolean;
}

export const InfoRow: React.FC<InfoRowProps> = React.memo(({ label, value, selectable = false }) => (
  <View style={infoRowStyles.container}>
    <Text style={infoRowStyles.label}>{label}</Text>
    <Text style={infoRowStyles.value} selectable={selectable}>
      {value}
    </Text>
  </View>
));

InfoRow.displayName = 'InfoRow';


