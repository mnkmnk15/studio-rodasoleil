import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {syncToStripe} from './actions/syncToStripe'

export default defineConfig({
  name: 'default',
  title: 'RODASoleil',

  projectId: '7bepndor',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      // Добавляем действие синхронизации для продуктов
      if (context.schemaType === 'product') {
        return [...prev, syncToStripe]
      }
      return prev
    },
  },

  // CORS настройки для разрешения запросов с localhost
  cors: {
    allowOrigins: ['http://localhost:3000', 'http://localhost:3333'],
  },
})
