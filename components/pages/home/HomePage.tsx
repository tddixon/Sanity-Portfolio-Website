import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

// import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { HeroParallax } from '@/components/ui/section-parallax'
import { resolveHref } from '@/sanity/lib/utils'
import project from '@/sanity/schemas/documents/project'
import { products } from '@/static/data'
import type { HomePagePayload } from '@/types'
import TextReveal from '@/components/ui/text-reveal'
import { CustomPortableText } from '@/components/shared/CustomPortableText'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export default function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], title = '', subtitle = '' } = data ?? {}

  return (
    <div className="space-y-20">
      {/* Header */}
      {title && <Header title={title} subtitle={subtitle} />}

      <div className='min-h-dvh w-full flex items-center justify-center px-6  mx-auto'>
        <CustomPortableText
          paragraphClasses='text-2xl md:text-4xl leading-relaxed'
          value={overview} />
      </div>
      <div>
        <HeroParallax products={products} />
      </div>
    </div>
  )
};

