# Iron City RP — Loading Screen (React + Bun)

یه لودینگ‌اسکرین برای FiveM / ESX Legacy با تم قرمز-مشکی (اکشن/گنگ).

## ساختار
```
src/
  App.jsx        صفحه اصلی — چیدمان هیرو + پنل داسیه (درباره/تیم)
  LoadingBar.jsx نوار لودینگ سفارشی (تیکه‌ی امضادار طراحی)
  Team.jsx       کارت‌های تیم مدیریتی
  data.js        اسم سرور، متن درباره، قوانین، اعضای تیم ← اینجا رو ویرایش کن
  index.css      کل استایل‌ها (توکن رنگ بالای فایل)
fxmanifest.lua    مانیفست ریسورس فایوم (بعد از build آماده‌ست)
```

## اجرا و توسعه (لوکال)
```bash
bun install
bun run dev       # پیش‌نمایش تو مرورگر با دیتای فیک برای نوار لودینگ
```

## ساخت خروجی نهایی
```bash
bun run build
```
این دستور پوشه‌ی `dist/` رو می‌سازه — همونی که فایوم واقعاً نشون می‌ده.
(توجه: `base: './'` تو `vite.config.js` از قبل تنظیم شده، چون فایوم مسیرهای absolute رو لود نمی‌کنه.)

## نصب روی سرور FiveM
1. کل پوشه‌ی پروژه (یا حداقل `dist/` + `fxmanifest.lua`) رو بریز تو `resources/[loadscreen]/iron-city-loading/`
2. تو `server.cfg` اضافه کن:
   ```
   ensure iron-city-loading
   ```
3. همین — فایوم خودش `loadscreen 'dist/index.html'` رو از `fxmanifest.lua` می‌خونه.

## شخصی‌سازی سریع
- **اسم/تگ‌لاین سرور و متن درباره:** `src/data.js`
- **اعضای تیم:** آرایه‌ی `TEAM` تو `src/data.js` — الان `initials` جای عکس نشون داده می‌شه؛
  اگه لوگو/عکس واقعی داری، تو `src/data.js` یه فیلد `photo: '/team/xxx.png'` اضافه کن،
  عکس رو بذار تو `public/team/`، و تو `Team.jsx` به‌جای `<span>{m.initials}</span>` بنویس:
  `<img src={m.photo} alt={m.name} />`
- **لوگوی سرور به‌جای متن استنسیل:** تو `App.jsx` داخل `<h1 className="hero__title">`
  به‌جای رندر کردن حروف، یه `<img src="/logo.png" className="hero__logo" />` بذار
  (لوگو رو تو `public/` قرار بده)
- **رنگ‌بندی:** بالای `src/index.css`، بلاک `:root` — همه‌چی از اونجا مشتق می‌شه
- **پیام‌های لودینگ:** آرایه‌ی `LOADING_STATUSES` تو `src/data.js`

## نکته‌ی مهم درباره‌ی درصد واقعی لودینگ
`LoadingBar.jsx` به پیام واقعی فایوم گوش می‌ده:
```js
window.addEventListener('message', (e) => {
  if (e.data.eventName === 'loadProgress') { ... e.data.loadFraction }
})
```
یه شبیه‌ساز فیک هم داخلشه که فقط تو مرورگر (بیرون از بازی) نوار رو حرکت می‌ده تا پیش‌نمایش خالی نباشه؛
داخل بازی خودش override می‌شه چون فایوم رویداد واقعی رو می‌فرسته.
