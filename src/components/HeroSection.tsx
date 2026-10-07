import {motion} from 'framer-motion';
import {SearchIcon} from './icons';
import ThemeToggle from './ThemeToggle';
export default function Hero({query,onSearch,onOpenSearch,dark,onToggleTheme}:{query:string;onSearch:(q:string)=>void;onOpenSearch:()=>void;dark:boolean;onToggleTheme:()=>void}){
 return <header className="site-header">
  <div className="hero-media" aria-hidden="true"><img src="/FC-BG.jpg"/><div className="hero-shade"/></div>
  <div className="shell header-row"><div className="brand"><span className="brand-mark"><img src="/rccg.png" alt="RCCG"/></span><div><strong>Faith City</strong><span>Living Photo Archive</span></div></div><div className="header-actions"><button onClick={onOpenSearch} className="icon-button mobile-search-trigger" aria-label="Search"><SearchIcon className="h-5 w-5"/></button><ThemeToggle dark={dark} onToggle={onToggleTheme}/></div></div>
  <div className="shell hero-layout"><motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.7,ease:[.22,1,.36,1]}} className="hero-copy"><span className="eyebrow"><i/> RCCG Faith City · Media</span><h1>Moments<br/><em>worth keeping.</em></h1><p>A living visual archive of worship, fellowship and life at Faith City.</p><label data-tour="search" className="desktop-search"><SearchIcon className="h-5 w-5"/><input value={query} onChange={e=>onSearch(e.target.value)} placeholder="Search photos or albums in this view"/><kbd>⌘ K</kbd></label></motion.div>
   <motion.div initial={{opacity:0,scale:.97,y:18}} animate={{opacity:1,scale:1,y:0}} transition={{delay:.12,duration:.8,ease:[.22,1,.36,1]}} className="hero-frame"><div className="hero-frame-image"><img src="/FC-BG.jpg" alt="Faith City archive"/></div><div className="hero-frame-caption"><span>Faith City</span><strong>Stories in every frame</strong><i>Digital archive · 2026</i></div></motion.div>
  </div>
 </header>
}
