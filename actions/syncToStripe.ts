import { DocumentActionComponent } from 'sanity';

export const syncToStripe: DocumentActionComponent = (props) => {
  const { id, type, draft, published } = props;

  // Показываем действие только для типа 'product'
  if (type !== 'product') {
    return null;
  }

  return {
    label: 'Sync to Stripe',
    icon: () => '🔄',
    onHandle: async () => {
      try {
        // Используем URL вашего API endpoint
        const apiUrl = process.env.SANITY_STUDIO_API_URL || 'http://localhost:3000';

        const response = await fetch(`${apiUrl}/api/sync-stripe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: draft?._id || published?._id || id,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to sync product to Stripe');
        }

        const result = await response.json();

        // Показываем уведомление об успехе
        props.onComplete();
      } catch (error) {
        console.error('Error syncing to Stripe:', error);
        alert('Failed to sync product to Stripe. Check console for details.');
      }
    },
  };
};
