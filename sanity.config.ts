'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {codeInput} from '@sanity/code-input' // Add this import
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
// import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

import { categoryType } from './sanity/schemaTypes/categoryType'
import { blockContentType } from './sanity/schemaTypes/blockContentType'
import { productType } from './sanity/schemaTypes/productType'
import { orderType } from './sanity/schemaTypes/orderType'
import { salesTypes } from './sanity/schemaTypes/salesTypes'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    types: [categoryType, blockContentType, productType, orderType, salesTypes],
  },
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    // Presentation tool for creating custom presentations
    presentationTool({
      previewUrl:{
        preview:"/",
        previewMode:{
          enable:"/draft-mode/enable",
        }
      }
    }),
    codeInput()
  ],
})
