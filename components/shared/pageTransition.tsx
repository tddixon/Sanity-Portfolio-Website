'use client'
import { resolveHref } from "@/sanity/lib/utils";
import { SettingsPayload } from "@/types";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, Variants, useAnimate, usePresence } from "framer-motion";

interface TransitionProps {
  data: SettingsPayload;
  children: ReactNode;
}

export default function PageTransition(props: TransitionProps) {
  const [scope, animate] = useAnimate();
  const { data, children } = props;
  const pathName = usePathname();



  useEffect(() => {

    const overlay = scope.current.querySelectorAll('.overlay')
    const title = scope.current.querySelectorAll('.title')
    const content = scope.current.querySelectorAll('.content')
    const body = document.body

    const sequence: any[] = [
      [
        overlay,
        {
          top: '0%'

        }, {
        }

      ],
      [
        title,
        {
          opacity: [0, 0.5, 1]
        }, {
          duration: 1
        }
      ],
      [
        overlay,
        {
          top: '-100%'
        }, {
        }

      ],
      [
        content,
        {
          y: ['10%', "0%"],
          opacity: [0, 1],
        }, {
        }
      ],
    ]

    const animation = animate(sequence)



    animation.play();
    animation.then(() => {
      animation.cancel()
    })



  }, [pathName, loading, scope, animate]); // useEffect runs whenever pathName changes



  return (
    <div ref={scope} className="overflow-hidden">
      <AnimatePresence
        mode="wait"
        key={pathName}
        onExitComplete={() => window.scrollTo(0, 0)}
      >

        <div className='overlay min-h-[100vh] top-[100%] fixed w-full flex items-center justify-center z-20 bg-black text-white'>
          {data.menuItems?.map((menuItem, index) => {
            const href = resolveHref(menuItem?._type, menuItem?.slug);
            if (href === pathName) {
              return (
                <p className="text-4xl xl:text-8xl uppercase title" key={index}>
                  {menuItem.pageTitle}
                </p>
              );
            }
            return null; // Render nothing if href doesn't match
          })}
        </div>
        <div className="opacity-0 content">
          {children}
        </div>
      </AnimatePresence>
    </div >
  );
}

