import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {syncToStripe} from './actions/syncToStripe'
import {ruKZLocale} from '@sanity/locale-ru-kz'

export default defineConfig({
  name: 'default',
  title: 'RODASoleil',

  projectId: '7bepndor',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), ruKZLocale()],

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

  // CORS настройки для разрешения запросов с production и localhost
  cors: {
    allowOrigins: [
      'http://localhost:3000',
      'http://localhost:3333',
      'https://rodasoleil.bg',
      'https://www.rodasoleil.bg'
    ],
  },
})
