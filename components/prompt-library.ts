export const situations = [
  {
    id: 'first-hello',
    label: 'First hello',
    description: 'Easy questions for starting a conversation.',
    prompts: [
      'What brought you to this event?',
      'What has been your favorite part so far?',
      'How do you know the host?',
      'What is one small thing that made you smile today?',
      'Is there anything here you have been curious to try?',
    ],
  },
  {
    id: 'find-common-ground',
    label: 'Find common ground',
    description: 'A little more to explore together.',
    prompts: [
      'What is something you could talk about for hours?',
      'What is a place you would happily visit again?',
      'What song always puts you in a good mood?',
      'What is a hobby you would like to learn?',
      'What is your ideal way to spend a free afternoon?',
    ],
  },
  {
    id: 'say-hello-again',
    label: 'Say hello again',
    description: 'Reconnect without making it a big moment.',
    prompts: [
      'Want to say hello again at the next break?',
      'What was the highlight of your day?',
      'Did anything surprise you at this event?',
      'What would you like to do after the event?',
      'What should we talk about next?',
    ],
  },
] as const;

export type SituationId = (typeof situations)[number]['id'];

export function nextPromptIndex(current: number, count: number, random: () => number = Math.random): number {
  if (count <= 1) return 0;
  const offset = 1 + Math.min(count - 2, Math.floor(random() * (count - 1)));
  return (current + offset) % count;
}
