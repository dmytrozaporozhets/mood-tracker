import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useStore } from '../../store/StoreProvider';
import { observer } from 'mobx-react-lite';

type Props = {
  label: string;
  value: string;
};

const UserInfoRow: React.FC<Props> = observer(({ label, value }) => {
  const { themeStore } = useStore();
  const { colors } = themeStore.theme;

  return (
    <Text style={[styles.infoText, { color: colors.placeholder }]}>
      {label}:{' '}
      <Text style={{ color: colors.text }}>{value}</Text>
    </Text>
  );
})

const styles = StyleSheet.create({
  infoText: {
    fontSize: 14,
    marginTop: 6,
  },
});

export default React.memo(UserInfoRow);
