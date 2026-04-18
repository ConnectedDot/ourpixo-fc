import { useState } from "react";
import type { DriveFile } from "../lib/drive";
import { motion } from "framer-motion";

export default function GalleryImage({
  file,
  onClick,
}: {
  file: DriveFile;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl cursor-pointer group bg-slate-100 border border-slate-200/50"
    >
      <img
        src={file.thumb}
        alt={file.name}
        onLoad={() => setLoaded(true)}
        className={`w-full transition-all duration-1000 ease-in-out group-hover:scale-110 ${
          loaded ? "opacity-100 blur-0" : "opacity-0 blur-xl"
        }`}
        loading="lazy"
      />
      
      {/* Premium Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2"
        >
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </div>
            <p className="text-white text-[11px] font-bold truncate tracking-wide">
                View Full Quality
            </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

