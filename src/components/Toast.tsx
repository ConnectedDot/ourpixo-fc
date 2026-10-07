import { AnimatePresence, motion } from 'framer-motion';
export default function Toast({message}: {message: string | null}) {
  return <AnimatePresence>{message && <motion.div initial={{opacity:0,y:18,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10,scale:.98}} className="fixed bottom-24 left-1/2 z-[250] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/60 bg-[#03045e]/95 px-5 py-3 text-sm font-semibold text-white shadow-2xl backdrop-blur-xl md:bottom-8">{message}</motion.div>}</AnimatePresence>;
}
