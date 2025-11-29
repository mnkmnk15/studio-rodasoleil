import { defineType, defineField } from 'sanity';

export const orderType = defineType({
  name: 'order',
  title: 'Заказы',
  type: 'document',
  fields: [
    defineField({
      name: 'orderId',
      title: 'ID Заказа',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Дата создания',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'customerInfo',
      title: 'Данные клиента',
      type: 'object',
      fields: [
        { name: 'firstName', title: 'Имя', type: 'string' },
        { name: 'lastName', title: 'Фамилия', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'phone', title: 'Телефон', type: 'string' },
      ],
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Способ оплаты',
      type: 'string',
      options: {
        list: [
          { title: 'Карта', value: 'card' },
          { title: 'Наложенный платёж', value: 'cash_on_delivery' },
        ],
      },
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Статус оплаты',
      type: 'string',
      options: {
        list: [
          { title: '⏳ Ожидание', value: 'pending' },
          { title: '✅ Оплачен', value: 'paid' },
          { title: '❌ Ошибка', value: 'failed' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'stripeSessionId',
      title: 'Stripe Session ID',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'deliveryMethod',
      title: 'Доставка',
      type: 'string',
      options: {
        list: [
          { title: 'Econt офис', value: 'econt_office' },
          { title: 'Econt адрес', value: 'econt_address' },
          { title: 'Самовывоз Бургас', value: 'pickup_burgas' },
        ],
      },
    }),
    defineField({
      name: 'deliveryDetails',
      title: 'Детали доставки',
      type: 'object',
      fields: [
        { name: 'econtOfficeId', title: 'ID офиса', type: 'number' },
        { name: 'econtOfficeCode', title: 'Код офиса', type: 'string' },
        { name: 'econtOfficeName', title: 'Офис', type: 'string' },
        { name: 'city', title: 'Город', type: 'string' },
        { name: 'cityId', title: 'ID города', type: 'number' },
        { name: 'postalCode', title: 'Почтовый индекс', type: 'string' },
        { name: 'address', title: 'Адрес', type: 'text' },
      ],
    }),
    defineField({
      name: 'deliveryPrice',
      title: 'Цена доставки (EUR)',
      type: 'number',
    }),
    defineField({
      name: 'items',
      title: 'Товары',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'productId',
            title: 'Товар',
            type: 'reference',
            to: [{ type: 'product' }],
            weak: true, // Слабая ссылка - товар МОЖНО удалить из каталога независимо от заказов
          },
          { name: 'productName', title: 'Название', type: 'string' }, // Дублируем название - будет видно даже если товар удален
          { name: 'price', title: 'Цена', type: 'number' },
          { name: 'quantity', title: 'Количество', type: 'number' },
          { name: 'size', title: 'Размер', type: 'string' },
          { name: 'color', title: 'Цвет', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'promoCode',
      title: 'Промокод',
      type: 'string',
    }),
    defineField({
      name: 'discount',
      title: 'Скидка (EUR)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'subtotal',
      title: 'Промежуточная сумма (EUR)',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'total',
      title: 'Общая сумма (EUR)',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'orderStatus',
      title: 'Статус заказа',
      type: 'string',
      options: {
        list: [
          { title: '🆕 Новый', value: 'new' },
          { title: '⚙️ В обработке', value: 'processing' },
          { title: '📦 Отправлен', value: 'shipped' },
          { title: '✅ Доставлен', value: 'delivered' },
          { title: '❌ Отменён', value: 'cancelled' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'customerNotes',
      title: 'Заметки клиента',
      type: 'text',
    }),
    defineField({
      name: 'internalNotes',
      title: 'Внутренние заметки',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      orderId: 'orderId',
      customerName: 'customerInfo.firstName',
      total: 'total',
      status: 'orderStatus',
    },
    prepare({ orderId, customerName, total, status }) {
      const emoji = { new: '🆕', processing: '⚙️', shipped: '📦', delivered: '✅', cancelled: '❌' }[status] || '📋';
      return {
        title: `${emoji} ${orderId}`,
        subtitle: `${customerName} · €${total?.toFixed(2)}`,
      };
    },
  },
});
