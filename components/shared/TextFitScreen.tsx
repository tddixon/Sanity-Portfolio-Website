'use client'

import React, { ReactNode, useEffect, useRef } from 'react'

interface Props {
  height?: number
  children: ReactNode
}

export default function TextFitScreen({ height, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const resizeText = () => {
      const container = containerRef.current
      const text = textRef.current

      if (!container || !text) {
        return
      }

      const containerWidth = container.offsetWidth
      let min = 1
      let max = height || 2500

      while (min <= max) {
        const mid = Math.floor((min + max) / 2)
        if (text) text.style.fontSize = mid + 'px'

        if (text && text.offsetWidth <= containerWidth) {
          min = mid + 1
        } else {
          max = mid - 1
        }
      }

      if (text) text.style.fontSize = max + 'px'
    }

    const resizeHandler = () => {
      resizeText()
    }

    if (containerRef.current && textRef.current) {
      resizeText()
      window.addEventListener('resize', resizeHandler)
    }

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [height])

  return (
    <div
      className="flex w-full items-center justify-center overflow-hidden "
      style={{ height }}
      ref={containerRef}
    >
      <span
        className=" mx-auto whitespace-nowrap text-center tracking-tight font-basement-grotesque uppercase "
        ref={textRef}
      >
        {children}
      </span>
    </div>
  )
}
