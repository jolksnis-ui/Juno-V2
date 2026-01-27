# Деплой на Vercel

## Production из ветки `staging`

Production-деплой идёт **только из ветки `staging`**.

### Настройка в Vercel Dashboard

1. Откройте [vercel.com](https://vercel.com) → ваш проект **juno**
2. **Settings** → **Git**
3. В блоке **Production Branch** выберите `staging` (вместо `main`)
4. Сохраните

После этого:

- **Production** (основной домен) — деплоится при `git push` в `staging`
- **Preview** — отдельные превью при пушах в другие ветки и при Pull Request’ах

### Проверка

- В **Deployments** production-деплои должны быть с ветки `staging`
- В **Settings → Git** в **Production Branch** должно быть `staging`
