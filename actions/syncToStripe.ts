import {DocumentActionComponent} from 'sanity'

// API URL для синхронизации товаров со Stripe
const SYNC_API_URL = 'https://www.rodasoleil.bg/api/sync-stripe'

export const syncToStripe: DocumentActionComponent = (props) => {
  const {id, type, draft, published} = props

  // Показываем действие только для типа 'product'
  if (type !== 'product') {
    return null
  }

  return {
    label: 'Sync to Stripe',
    icon: () => '🔄',
    onHandle: async () => {
      try {
        const productId = draft?._id || published?._id || id

        const response = await fetch(SYNC_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: productId,
          }),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Failed to sync product to Stripe')
        }

        // Показываем результат
        if (result.results && result.results[0]) {
          const syncResult = result.results[0]
          if (syncResult.success) {
            alert(`✅ Product synced successfully!\n\nStripe Product ID: ${syncResult.stripeProductId}`)
          } else {
            throw new Error(syncResult.error || 'Sync failed')
          }
        }

        props.onComplete()
      } catch (error: any) {
        console.error('Error syncing to Stripe:', error)
        alert(`❌ Failed to sync product to Stripe:\n\n${error.message || 'Unknown error'}`)
      }
    },
  }
}
