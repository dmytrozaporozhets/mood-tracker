import { StyleSheet } from "react-native";
import { Colors } from "../../styling";
import { width } from "../../utils/device";

const OnboardingScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutrals.white,
    justifyContent: 'center',
  },
  slide: {
    width:width,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.blueness[400],
    marginHorizontal: 40,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: Colors.neutrals.white,
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
  },
  skipText: {
    color: Colors.greyness[600],
    fontSize: 14,
  },
});

export default OnboardingScreenStyle;