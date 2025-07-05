import {StyleSheet} from 'react-native';

export const ButtonDimensions = StyleSheet.create({
  S:{ height: 30, width: "30%"},
  M:{ height: 40, width: "50%"},
  L: { height: 40, width: "100%" },
})


const ButtonStyle = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius:8,
  },
  text: {
    textAlign: 'center',
  },
  content: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconWrapper: {
    marginRight: 6,
  },
});

export default ButtonStyle;