import { StyleSheet } from "react-native";
import { width } from "../../utils/device";

const OnboardingScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  slide: {
    width: width,
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
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 40,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
  },
  skipText: {
    fontSize: 16,
  },
});

export default OnboardingScreenStyle;
