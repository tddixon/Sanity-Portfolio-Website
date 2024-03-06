import { CustomPortableText } from '@/components/shared/CustomPortableText'

import TextFitScreen from './TextFitScreen'

interface HeaderProps {
  centered?: boolean
  description?: any[]
  title?: string
}
export function Header(props: HeaderProps) {
  const { title, description, centered = false } = props
  if (!description && !title) {
    return null
  }
  return (
    <div className={`w-full flex flex-col items-center`}>
      {/* Title */}
      {title && <TextFitScreen>{title}</TextFitScreen>}
      {/* Description */}
      {description && (
        <div className="font-serif text-xl text-gray-600 md:text-2xl">
          <CustomPortableText value={description} />
        </div>
      )}
    </div>
  )
}
