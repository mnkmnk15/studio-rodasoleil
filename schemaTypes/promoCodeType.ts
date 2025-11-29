import { defineType, defineField } from 'sanity';

export const promoCodeType = defineType({
  name: 'promoCode',
  title: 'Промокоды',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Код',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((code) => {
          if (!code) return true;
          if (!/^[A-Z0-9]+$/.test(code)) {
            return 'Только заглавные буквы и цифры (A-Z, 0-9)';
          }
          return true;
        }),
      description: 'Промокод (только заглавные буквы и цифры, например: SALE2024)',
    }),
    defineField({
      name: 'discountType',
      title: 'Тип скидки',
      type: 'string',
      options: {
        list: [
          { title: '📊 Процент (10%, 20%)', value: 'percentage' },
          { title: '💵 Фиксированная сумма (-5€, -10€)', value: 'fixed' },
          { title: '🚚 Бесплатная доставка', value: 'free_shipping' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discountValue',
      title: 'Значение',
      type: 'number',
      description: 'Для процента: 10 = 10%, для фиксированной суммы: 5 = 5€',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const discountType = (context.document as any)?.discountType;
          if (discountType === 'free_shipping') return true;
          if (!value || value <= 0) return 'Значение должно быть положительным числом';
          if (discountType === 'percentage' && value > 100) {
            return 'Процент не может быть больше 100%';
          }
          return true;
        }),
      hidden: ({ document }) => document?.discountType === 'free_shipping',
    }),
    defineField({
      name: 'active',
      title: 'Активен',
      type: 'boolean',
      initialValue: true,
      description: 'Деактивируйте промокод, чтобы остановить его использование',
    }),
    defineField({
      name: 'validFrom',
      title: 'Действителен с',
      type: 'datetime',
      description: 'Опционально: Дата с которой промокод активен',
    }),
    defineField({
      name: 'validUntil',
      title: 'Действителен до',
      type: 'datetime',
      description: 'Опционально: Дата до которой промокод активен',
    }),
    defineField({
      name: 'usageLimit',
      title: 'Лимит использований',
      type: 'number',
      description: 'Опционально: Максимальное количество использований промокода',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (value === undefined || value === null) return true;
          if (value < 1) return 'Лимит должен быть не менее 1';
          return true;
        }),
    }),
    defineField({
      name: 'usageCount',
      title: 'Использован раз',
      type: 'number',
      initialValue: 0,
      readOnly: true,
      description: 'Автоматически увеличивается при каждом использовании',
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      description: 'Внутреннее описание для чего этот промокод',
    }),
  ],
  preview: {
    select: {
      code: 'code',
      discountType: 'discountType',
      discountValue: 'discountValue',
      active: 'active',
      usageCount: 'usageCount',
      usageLimit: 'usageLimit',
    },
    prepare({ code, discountType, discountValue, active, usageCount, usageLimit }) {
      let discountText = '';
      if (discountType === 'percentage') {
        discountText = `-${discountValue}%`;
      } else if (discountType === 'fixed') {
        discountText = `-€${discountValue}`;
      } else if (discountType === 'free_shipping') {
        discountText = '🚚 Бесплатная доставка';
      }

      const statusEmoji = active ? '✅' : '❌';
      const usageText = usageLimit ? `${usageCount}/${usageLimit}` : `${usageCount}`;

      return {
        title: `${statusEmoji} ${code}`,
        subtitle: `${discountText} · Использован: ${usageText}`,
      };
    },
  },
});
