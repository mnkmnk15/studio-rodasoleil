import { defineType, defineField } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'object',
      fields: [
        { name: 'bg', title: 'Bulgarian', type: 'string' },
        { name: 'ru', title: 'Russian', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'object',
      description: 'Brief description for product cards (1-2 sentences, max 150 characters)',
      fields: [
        {
          name: 'bg',
          title: 'Bulgarian',
          type: 'string',
          validation: (Rule) => Rule.max(150).warning('Keep it under 150 characters for best display')
        },
        {
          name: 'ru',
          title: 'Russian',
          type: 'string',
          validation: (Rule) => Rule.max(150).warning('Keep it under 150 characters for best display')
        },
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule) => Rule.max(150).warning('Keep it under 150 characters for best display')
        },
      ],
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'object',
      description: 'Detailed description for product page',
      fields: [
        { name: 'bg', title: 'Bulgarian', type: 'text' },
        { name: 'ru', title: 'Russian', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description (Legacy)',
      type: 'object',
      description: 'Legacy field - use Short Description and Full Description instead',
      fields: [
        { name: 'bg', title: 'Bulgarian', type: 'text' },
        { name: 'ru', title: 'Russian', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
      ],
      hidden: true,
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'price',
      title: 'Price (EUR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare at Price (EUR)',
      type: 'number',
      description: 'Original price for sale items',
    }),
    defineField({
      name: 'stripeProductId',
      title: 'Stripe Product ID',
      type: 'string',
      description: 'Auto-generated Stripe product ID',
      readOnly: true,
      hidden: ({ document }) => !document?.stripeProductId,
    }),
    defineField({
      name: 'stripePriceId',
      title: 'Stripe Price ID',
      type: 'string',
      description: 'Auto-generated Stripe price ID',
      readOnly: true,
      hidden: ({ document }) => !document?.stripePriceId,
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'bestseller',
      title: 'Bestseller',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'newArrival',
      title: 'New Arrival',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category (Legacy)',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Legacy category field - use Gender and Product Type instead',
    }),
    defineField({
      name: 'gender',
      title: 'Gender/Age Category',
      type: 'string',
      options: {
        list: [
          { title: 'Women', value: 'women' },
          { title: 'Men', value: 'mens' },
          { title: 'Kids', value: 'kids' },
        ],
      },
      description: 'Main category by gender/age group',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'Swimwear', value: 'swimwear' },
          { title: 'Beachwear', value: 'beachwear' },
          { title: 'Pants & Skirts', value: 'pants-skirts' },
          { title: 'Robes & Tunics', value: 'robes-tunics' },
          { title: 'T-Shirts & Shorts', value: 't-shirts-shorts' },
          { title: 'Sleeveless', value: 'sleeveless' },
          { title: 'Long Sleeve', value: 'long-sleeve' },
          { title: 'Zippers', value: 'zippers' },
          { title: 'Accessories', value: 'accessories' },
          { title: 'Other', value: 'other' },
        ],
      },
      description: 'Type of product',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes (Adults)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'XS', value: 'xs' },
          { title: 'S', value: 's' },
          { title: 'M', value: 'm' },
          { title: 'L', value: 'l' },
          { title: 'XL', value: 'xl' },
          { title: 'XXL', value: 'xxl' },
        ],
      },
      hidden: ({ document }) => document?.gender === 'kids',
      description: 'For women and men products',
    }),
    defineField({
      name: 'kidsSizes',
      title: 'Available Sizes (Kids) - Legacy',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '104 см', value: '104' },
          { title: '110 см', value: '110' },
          { title: '116 см', value: '116' },
          { title: '122 см', value: '122' },
          { title: '128 см', value: '128' },
          { title: '134 см', value: '134' },
          { title: '140 см', value: '140' },
          { title: '146 см', value: '146' },
          { title: '152 см', value: '152' },
        ],
      },
      hidden: true, // Скрыто - используйте kidsSizePrices вместо этого
      description: 'Legacy field - use kidsSizePrices instead',
    }),
    defineField({
      name: 'kidsSizePrices',
      title: 'Kids Sizes with Prices',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'kidsSizePrice',
          title: 'Size Price',
          fields: [
            {
              name: 'size',
              title: 'Size (Height in cm)',
              type: 'string',
              options: {
                list: [
                  { title: '104 см', value: '104' },
                  { title: '110 см', value: '110' },
                  { title: '116 см', value: '116' },
                  { title: '122 см', value: '122' },
                  { title: '128 см', value: '128' },
                  { title: '134 см', value: '134' },
                  { title: '140 см', value: '140' },
                  { title: '146 см', value: '146' },
                  { title: '152 см', value: '152' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Price (EUR)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'stripePriceId',
              title: 'Stripe Price ID',
              type: 'string',
              description: 'Auto-generated Stripe price ID for this size',
              readOnly: true,
            },
          ],
          preview: {
            select: {
              size: 'size',
              price: 'price',
            },
            prepare({ size, price }) {
              return {
                title: `${size} см`,
                subtitle: price ? `€${price}` : 'No price set',
              };
            },
          },
        },
      ],
      hidden: ({ document }) => document?.gender !== 'kids',
      description: 'Height-based sizes for kids products with individual prices (in cm)',
    }),
    defineField({
      name: 'colors',
      title: 'Available Colors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Color Name', type: 'string' },
            { name: 'hex', title: 'Hex Code', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Product Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'bg', title: 'Bulgarian', type: 'string' },
            { name: 'ru', title: 'Russian', type: 'string' },
            { name: 'en', title: 'English', type: 'string' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      media: 'images.0',
      price: 'price',
      gender: 'gender',
      productType: 'productType',
      kidsSizePrices: 'kidsSizePrices',
    },
    prepare(selection) {
      const { title, media, price, gender, productType, kidsSizePrices } = selection;
      let priceDisplay = `€${price}`;

      // Для детских товаров показываем диапазон цен
      if (gender === 'kids' && kidsSizePrices && kidsSizePrices.length > 0) {
        const prices = kidsSizePrices.map((sp: { price: number }) => sp.price).filter(Boolean);
        if (prices.length > 0) {
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          priceDisplay = minPrice === maxPrice ? `€${minPrice}` : `€${minPrice}-€${maxPrice}`;
        }
      }

      return {
        title,
        subtitle: `${priceDisplay} · ${gender} · ${productType}`,
        media,
      };
    },
  },
});
