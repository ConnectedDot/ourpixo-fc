import { motion } from 'framer-motion';
import type {DriveFolder} from '../lib/drive';
import {ArrowRightIcon,FolderIcon} from './icons';

export default function FolderGrid({folders,onSelect}:{folders:DriveFolder[];onSelect:(folder:DriveFolder)=>void}){
 return <div data-tour="folders" className="folder-grid">{folders.map((folder,i)=><motion.button key={folder.id} initial={{opacity:0,y:22,scale:.985}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true,margin:'-30px'}} transition={{delay:Math.min(i*.035,.25),duration:.5,ease:[.22,1,.36,1]}} whileHover={{y:-7}} whileTap={{scale:.985}} onClick={()=>onSelect(folder)} className="folder-card">
   <span className="folder-art" aria-hidden="true"><i className="folder-sheet folder-sheet-one"/><i className="folder-sheet folder-sheet-two"/><i className="folder-body"><FolderIcon className="h-6 w-6"/></i></span>
   <span className="folder-type">Collection</span>
   <div className="folder-copy"><h3>{folder.name}</h3><p>Open album <i/></p></div>
   <span className="folder-open"><ArrowRightIcon className="h-5 w-5"/></span>
 </motion.button>)}</div>
}
