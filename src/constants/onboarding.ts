export type OnboardingSlide = {
  key: string;
  titleKey: string;
  descriptionKey: string;
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    key: '1',
    titleKey: 'onboarding:trackTitle',
    descriptionKey: 'onboarding:trackDescription',
  },
  {
    key: '2',
    titleKey: 'onboarding:historyTitle',
    descriptionKey: 'onboarding:historyDescription',
  },
  {
    key: '3',
    titleKey: 'onboarding:privacyTitle',
    descriptionKey: 'onboarding:privacyDescription',
  },
];
