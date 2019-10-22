export const slideInOut = (() => {
  const easing = [0.175, 0.85, 0.42, 0.96]
  return {
    exit: { y: 100, opacity: 0, transition: { duration: 1, ease: easing } },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: easing,
      },
    },
  }
})()
