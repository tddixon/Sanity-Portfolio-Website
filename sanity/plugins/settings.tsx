/**
 * This plugin contains all the logic for setting up the singletons
 */

import { type DocumentDefinition } from 'sanity'
import { type StructureResolver } from 'sanity/structure'

export const singletonPlugin = (types: string[]) => {
  return {
    name: 'singletonPlugin',
    document: {
      // Hide 'Singletons (such as Home)' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter(
            (templateItem) => !types.includes(templateItem.templateId),
          )
        }

        return prev
      },
      // Removes the "duplicate" action on the Singletons (such as Home)
      actions: (prev, { schemaType }) => {
        if (types.includes(schemaType)) {
          return prev.filter(({ action }) => action !== 'duplicate')
        }

        return prev
      },
    },
  }
}



export const pageStructure = (
  typeDefArray: DocumentDefinition[],
): StructureResolver => {
  return (S) => {
    const singletonItems = typeDefArray.map((typeDef) => {
      return S.listItem()
        .id(`singleton-${typeDef.name}`)
        .title(`${typeDef.title}`)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name),
        );
    });

    const pageItems = S.listItem()
      .id('page-pages')
      .title('Pages')
      .child(S.documentTypeList('page'));

    const contentListItems = [
      // S.listItem()
      //   .id('content-about')
      //   .title('About')
      //   .child(S.documentTypeList('content').title("About")),
      S.listItem()
        .id('content-post-list')
        .title('Blog Articles')
        .child(S.documentTypeList('article').title("Articles")),
      S.listItem()
        .id('content-project-list')
        .title('Project Cases')
        .child(S.documentTypeList('project').title("Projects")),
    ];

    return S.list().title('Website').items([
      ...singletonItems,
      S.divider(),
      pageItems,
      S.divider(),
      ...contentListItems,
    ]);
  };
};

