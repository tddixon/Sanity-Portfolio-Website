'use client'

import { cn } from "@/lib/utils";
import { animate, motion, scroll } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react"


export default function P({ children, className }: { className?: string, children: ReactNode }) {
  const blockRef = useRef<HTMLParagraphElement | any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('splitting').then((Splitting) => {
        Splitting.default({ target: blockRef.current, by: 'chars' });
      });
    }




    const char = blockRef.current.querySelectorAll('.char')


    scroll((progress) => {

    })
  }, [blockRef]);

  return (
    <motion.p ref={blockRef} className={cn("p-block ", className)}>
      {children}
    </motion.p>
  )
}

