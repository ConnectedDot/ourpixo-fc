import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const KEY='ourpixo-tour-v2';
const steps=[
  {selector:'[data-tour="search"]',title:'Find moments fast',body:'Search photos in the album you are viewing. On mobile, Search also lives in the bottom navigation.'},
  {selector:'[data-tour="folders"]',title:'Move through albums',body:'Open years, months and weekly folders naturally. Your current album is now reflected in the shareable URL.'},
  {selector:'[data-tour="share-folder"]',title:'Share the exact folder',body:'Copy or share this album link. Anyone opening it lands directly in the same folder—even after refresh.'},
  {selector:'[data-tour="gallery"]',title:'Open, swipe and save',body:'Tap a photo for the immersive viewer. Use arrows or swipe, then download or share the photo page.'},
];
export default function OnboardingTour(){
 const [open,setOpen]=useState(()=>localStorage.getItem(KEY)!=='done'); const [step,setStep]=useState(0); const [rect,setRect]=useState<DOMRect|null>(null); const current=steps[step];
 const close=()=>{localStorage.setItem(KEY,'done');setOpen(false)};
 useEffect(()=>{if(!open)return; const update=()=>{const el=document.querySelector(current.selector); if(el){el.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>setRect(el.getBoundingClientRect()),350)}else setRect(null)};update();window.addEventListener('resize',update);return()=>window.removeEventListener('resize',update)},[open,step,current.selector]);
 const cardStyle=useMemo(()=>{if(!rect)return {left:'50%',top:'50%',transform:'translate(-50%,-50%)'} as const; const w=Math.min(360,window.innerWidth-32); let left=Math.max(16,Math.min(rect.left,w?window.innerWidth-w-16:16)); let top=rect.bottom+18; if(top+240>window.innerHeight) top=Math.max(16,rect.top-250); return {left,top,width:w} as const},[rect]);
 return <AnimatePresence>{open&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[300]">
   <div className="absolute inset-0 bg-[#03045e]/72 backdrop-blur-[2px]"/>
   {rect&&<motion.div layout className="pointer-events-none fixed rounded-[1.4rem] ring-4 ring-[#48cae4] shadow-[0_0_0_9999px_rgba(3,4,94,.15),0_0_50px_rgba(72,202,228,.55)]" style={{left:rect.left-7,top:rect.top-7,width:rect.width+14,height:rect.height+14}}/>}
   <motion.div key={step} initial={{opacity:0,y:10,scale:.98}} animate={{opacity:1,y:0,scale:1}} className="fixed rounded-[1.6rem] border border-white/70 bg-white p-5 shadow-2xl" style={cardStyle}>
    <div className="mb-4 flex items-center justify-between"><span className="text-[10px] font-extrabold uppercase tracking-[.24em] text-[#0077b6]">Quick tour · {step+1}/{steps.length}</span><button onClick={close} className="text-xs font-bold text-slate-400 hover:text-[#03045e]">Skip</button></div>
    <h3 className="text-xl font-extrabold tracking-tight text-[#03045e]">{current.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{current.body}</p>
    <div className="mt-5 flex gap-2">{step>0&&<button onClick={()=>setStep(s=>s-1)} className="h-11 flex-1 rounded-full bg-slate-100 text-sm font-bold text-slate-700">Back</button>}<button onClick={()=>step===steps.length-1?close():setStep(s=>s+1)} className="h-11 flex-[1.35] rounded-full bg-[#03045e] text-sm font-bold text-white shadow-lg shadow-[#03045e]/20">{step===steps.length-1?'Start exploring':'Next'}</button></div>
   </motion.div>
 </motion.div>}</AnimatePresence>;
}
