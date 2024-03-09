
import { CustomPortableText } from '@/components/shared/CustomPortableText'

import TextFitScreen from './TextFitScreen'

interface HeaderProps {
  centered?: boolean
  description?: any[]
  title?: string
  subtitle?: string
}
export function Header(props: HeaderProps) {
  const { title, description, subtitle, centered = false } = props
  if (!description && !subtitle && !title) {
    return null
  }
  return (
    <div className={`w-full min-h-dvh py-20 px-6  justify-center flex flex-col items-center`}>
      {/* Title */}
      <div className="w-full h-full flex flex-col relative">
        {title && <TextFitScreen>{title}</TextFitScreen>}
        {subtitle && <TextFitScreen>{subtitle}</TextFitScreen>}
        <div className='w-full absolute -bottom-10  border border-stone-900' />
      </div>
    </div>
  )
}
