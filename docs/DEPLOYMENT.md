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

---

## Деплой через CLI в рабочий Vercel (Test_site / juno-v2)

Чтобы команда **`npx vercel --prod`** из этой папки деплоила в **Test_site → juno-v2** (juno-v2.vercel.app), а не в личный аккаунт (jolksnis-ui's projects / juno-main):

1. **Выйти из личного аккаунта и войти в рабочий** (если Test_site — в рабочем аккаунте):
   ```bash
   npx vercel logout
   npx vercel login
   ```
   Укажи **рабочий email**, у которого есть доступ к команде **Test_site**.

2. **Привязать папку к проекту juno-v2 в Test_site:**
   ```bash
   npx vercel link
   ```
   - **Set up and deploy?** — подтверди (Y).
   - **Which scope do you want to deploy to?** — выбери **Test_site**.
   - **Link to existing project?** — **Y**.
   - **What's the name of your existing project?** — введи **juno-v2**.

3. После этого **`npx vercel --prod`** будет деплоить в **juno-v2.vercel.app** (Test_site).

**Если не переключать аккаунт:** можно не использовать CLI для продакшена, а только пушить в GitHub: подключи в Vercel проект **Test_site → juno-v2** к репо **jolksnis-ui/Juno-V2**, ветка **staging** — тогда каждый `git push juno-v2 staging` будет автоматически деплоить на juno-v2.vercel.app без `vercel --prod`.
