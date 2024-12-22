import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function ScrollSection({ children }: { children: React.ReactNode }) {
  // Ref and inView for intersection observer
  const [ref, inView] = useInView({
    triggerOnce: false, // Trigger the animation multiple times as we scroll
    threshold: 0.2, // Activate when 20% of the element is visible
  });

  return (
    <motion.div
      ref={ref} // Attach intersection observer ref
      className="w-full min-h-screen flex justify-center items-center"
      initial={{ opacity: 0, y: 100 }} // Starting state
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.1, y: 100 }} // Animate inView and scroll out
      transition={{ type: 'spring', stiffness: 100, duration: 1.5 }} // Smooth transition
    >
      {children}
    </motion.div>
  );
}
export default ScrollSection;
