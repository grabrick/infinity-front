export const topToBottom = {
  hidden: {
    y: -20,
    opacity: 0,
  },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.15 },
  }),
};

export const bottomToTop = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.15 },
  }),
};

export const isVisible = {
  hidden: {
    opacity: 0,
  },
  visible: (custom: number) => ({
    opacity: 1,
    transition: { delay: custom * 0.15 },
  }),
}

export const blinkAnimation = {
  initial: { opacity: 1 },
  blink: {
    opacity: [1, 0, 1],
    transition: { duration: 0.5, repeat: Infinity },
  },
};