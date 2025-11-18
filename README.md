# RoDaSoleil - Sanity Studio

Headless CMS для управления контентом интернет-магазина RoDaSoleil.

**Project ID:** 7bepndor
**Dataset:** production
**Website:** https://www.rodasoleil.bg

## Технологии

- **Sanity Studio** - CMS интерфейс
- **TypeScript** - Типизация
- **Sanity Vision** - GROQ Query Explorer

## Схемы данных

### Product (Товар)
- Название, описание, цена
- Изображения (множественные)
- Категории и фильтры (gender, productType)
- Интеграция со Stripe (productId, priceId)
- Размеры и наличие

### Category (Категория)
- Название и описание
- Тип категории
- Порядок сортировки

### Banner (Баннер)
- Изображения для главной страницы
- Текст и ссылки

## Установка

```bash
npm install
```

## Запуск

```bash
# Development
npm run dev

# Production build
npm run build
```

## Деплой

Sanity Studio автоматически деплоится на `https://rodasoleil.sanity.studio` при пуше в репозиторий.

## Интеграция

Studio интегрирован с:
- Next.js магазином (rodasoleil-shop)
- Stripe для управления товарами
- Production dataset для реальных данных

## Контакты

- Website: [https://www.rodasoleil.bg](https://www.rodasoleil.bg)
- Sanity Project: [https://www.sanity.io/manage](https://www.sanity.io/manage)

---

**Версия:** 1.0.0
**Обновлено:** Ноябрь 2024
