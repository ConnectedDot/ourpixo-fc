import { MoonIcon, SunIcon } from './icons';
export default function ThemeToggle({dark,onToggle}:{dark:boolean;onToggle:()=>void}){return <button onClick={onToggle} aria-label="Toggle colour theme" className="icon-button">{dark?<SunIcon className="h-5 w-5"/>:<MoonIcon className="h-5 w-5"/>}</button>}
