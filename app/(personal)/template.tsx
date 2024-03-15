import { ReactNode, useEffect } from "react";

import PageTransition from "@/components/shared/pageTransition";
import { loadSettings } from "@/sanity/loader/loadQuery";
import { SettingsPayload } from "@/types";

interface TemplateProps {
  children: ReactNode;
}




export default async function Template(props: TemplateProps) {
  const initial = await loadSettings()
  const { children } = props

  return (
    <PageTransition data={initial.data} >
      {children}
    </PageTransition>
  )
}



