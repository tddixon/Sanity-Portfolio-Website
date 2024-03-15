import { ReactNode, useEffect } from "react";
import { SettingsPayload } from "@/types";
import { loadSettings } from "@/sanity/loader/loadQuery";
import PageTransition from "@/components/shared/pageTransition";

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



