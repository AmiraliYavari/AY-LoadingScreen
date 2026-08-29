# AY LoadingScreen

<div align="center">

**لودینگ‌اسکرین سینمایی برای سرورهای FiveM / ESX Legacy — تم قرمز-مشکی، پنل داسیه، نوار لودینگ اختصاصی و موزیک‌پلیر.**

![React](https://img.shields.io/badge/React-18-149eca?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)
![FiveM](https://img.shields.io/badge/FiveM-NUI%20Loadscreen-d61f26)
![ESX](https://img.shields.io/badge/Framework-ESX%20Legacy-1c1412)
![License](https://img.shields.io/badge/license-MIT-948d84)

</div>

<br/>

<p align="center">
  <img src=".github/screenshots/about.jpg" width="49%" alt="AY LoadingScreen — تب درباره شهر" />
  <img src=".github/screenshots/team.jpg" width="49%" alt="AY LoadingScreen — تب تیم مدیریتی" />
</p>

---

## ✦ درباره پروژه

**AY LoadingScreen** یه لودینگ‌اسکرین کامل و آماده برای FiveM هست که با **React + Vite** ساخته شده، نه با HTML/CSS/JS خام —
یعنی کامپوننت‌بندی تمیز، استیت واقعی برای تب‌ها و پیشرفت لودینگ، و یه build سریع که خروجی‌ش دقیقاً همونیه که فایوم نشون می‌ده.

حال و هوای طراحی: یه **پرونده‌ی محرمانه‌ی شهرداری** روی یه پس‌زمینه‌ی شب‌رنگ GTA — نوار لودینگ به شکل نوار پلیس/نوار زرد-مشکی،
تب‌های «درباره شهر» و «تیم مدیریتی»، و جزئیات کوچیک (استمپ CASE #, گرین فیلم، اشعه‌ی نور، اخگرهای شناور) که حس سینمایی بهش می‌ده.

## ✦ امکانات

- 🎬 **طراحی سینمایی RTL** — تایپوگرافی Anton + Rajdhani/Vazirmatn، گرین فیلم، اشعه‌ی نور متحرک و اخگرهای شناور در پس‌زمینه
- 📊 **نوار لودینگ واقعی فایوم** — به رویداد واقعی `loadProgress` که خود گیم می‌فرسته گوش می‌ده (نه یه انیمیشن فیک ثابت)
- 🗂️ **پنل داسیه‌ی دو-تبی** — «درباره شهر» (متن + قوانین) و «تیم مدیریتی» (کارت‌های استاف با استمپ پرونده)
- 🎵 **موزیک‌پلیر با autoplay ایمن** — اگه اتوپلی بلاک بشه، خودش fallback می‌کنه به دکمه‌ی پخش دستی؛ کنترل ولوم داره
- 🧩 **همه‌چیز از یک فایل تنظیم می‌شه** — اسم سرور، متن، قوانین، اعضای تیم و پیام‌های لودینگ همه تو `src/data.js`
- ⚡️ **بیلد استاندارد Vite** — خروجی نهایی چند فایل استاتیک ساده‌ست، دقیقاً چیزی که NUI فایوم نیاز داره
- ♿️ **`prefers-reduced-motion` رعایت شده** — انیمیشن‌ها برای کاربرهایی که حساسیت به حرکت دارن غیرفعال می‌شن

## ✦ ساختار پروژه

```
ay-loadingscreen/
├─ src/
│  ├─ App.jsx           چیدمان اصلی — هیرو (سمت راست) + پنل داسیه (سمت چپ)
│  ├─ LoadingBar.jsx     نوار لودینگ + مارکر متحرک + پیام‌های وضعیت
│  ├─ MusicPlayer.jsx    پلیر موزیک با autoplay ایمن و کنترل ولوم
│  ├─ Team.jsx           گرید کارت‌های تیم مدیریتی
│  ├─ data.js            ← تمام محتوای قابل‌ویرایش (اسم سرور، قوانین، تیم، پیام‌ها)
│  └─ index.css          همه‌ی استایل‌ها (توکن‌های رنگ بالای فایل، بخش به بخش کامنت‌گذاری شده)
├─ public/
│  ├─ wallpaper.jpg      تصویر پس‌زمینه
│  └─ music/theme.mp3    موزیک تم
├─ fxmanifest.lua        مانیفست ریسورس فایوم
├─ dist/                 خروجی build — همینه که تو فایوم لود می‌شه
└─ .github/screenshots/  تصاویر همین README
```

## ✦ اجرا و توسعه (پیش‌نمایش لوکال)

پروژه هم با `bun` سازگاره (فایل `bun.lock` موجوده) و هم با `npm`:

```bash
# با bun
bun install
bun run dev

# یا با npm
npm install
npm run dev
```

با اجرای `dev`، پیش‌نمایش تو مرورگر باز می‌شه و نوار لودینگ با یه شبیه‌سازِ فیک حرکت می‌کنه (چون بیرون از بازی، رویداد واقعی `loadProgress` وجود نداره).

## ✦ ساخت خروجی نهایی

```bash
bun run build   # یا: npm run build
```

این دستور پوشه‌ی `dist/` رو می‌سازه — همون فایل‌هایی که فایوم واقعاً نمایش می‌ده.
توجه: `base: './'` تو `vite.config.js` از قبل تنظیم شده، چون NUI فایوم مسیرهای absolute (`/assets/...`) رو 404 می‌کنه؛ همه‌چی باید relative باشه (`./assets/...`).

## ✦ نصب روی سرور FiveM

1. کل پوشه‌ی پروژه (حداقل `dist/` + `fxmanifest.lua`) رو بریز تو:
   ```
   resources/[loadscreen]/ay-loadingscreen/
   ```
2. تو `server.cfg` اضافه کن:
   ```
   ensure ay-loadingscreen
   ```
3. همین. فایوم خودش مقدار `loadscreen 'dist/index.html'` رو از `fxmanifest.lua` می‌خونه و صفحه رو نشون می‌ده.

## ✦ شخصی‌سازی سریع

همه‌چیز از `src/data.js` کنترل می‌شه — نیازی به دست‌زدن به کامپوننت‌ها نیست:

| چی می‌خوای تغییر بدی؟ | کجا؟ |
|---|---|
| اسم سرور / تگ‌لاین / کد بالای هیرو | `SERVER` در `src/data.js` |
| متن «درباره شهر» | `ABOUT_TEXT` در `src/data.js` |
| قوانین پایه | `RULES` در `src/data.js` |
| اعضای تیم مدیریتی | `TEAM` در `src/data.js` |
| پیام‌های متغیر کنار نوار لودینگ | `LOADING_STATUSES` در `src/data.js` |
| موزیک تم | فایل `public/music/theme.mp3` رو جایگزین کن (نام فایل فرقی نداره، فقط `MusicPlayer.jsx → TRACK_SRC` رو هم‌نام کن) |
| پس‌زمینه | فایل `public/wallpaper.jpg` رو جایگزین کن |
| پالت رنگ | بلاک `:root` بالای `src/index.css` — همه‌ی رنگ‌های سایت از همون چند متغیر مشتق می‌شن |

**عکس واقعی به‌جای حروف اینیشیال تیم:** تو `src/data.js` به هر آبجکت `TEAM` یه فیلد `photo: '/team/xxx.png'` اضافه کن، عکس رو تو `public/team/` بذار، و تو `Team.jsx` به‌جای `<span>{m.initials}</span>` بنویس `<img src={m.photo} alt={m.name} />`.

**لوگو به‌جای عنوان استنسیلی:** تو `App.jsx` داخل `<h1 className="hero__title">`، به‌جای رندر حروف، یه `<img src="/logo.png" className="hero__logo" />` بذار (لوگو رو تو `public/` قرار بده).

## ✦ نکته‌ی مهم درباره‌ی درصد واقعی لودینگ

`LoadingBar.jsx` به رویداد واقعی فایوم گوش می‌ده:

```js
window.addEventListener('message', (e) => {
  if (e.data.eventName === 'loadProgress') {
    // e.data.loadFraction → عددی بین 0 و 1
  }
})
```

یه شبیه‌ساز فیک هم داخلشه که فقط بیرون از بازی (تو مرورگر) نوار رو حرکت می‌ده تا پیش‌نمایش خالی نباشه؛ داخل بازی خودش override می‌شه چون فایوم رویداد واقعی رو می‌فرسته.

## ✦ پشته‌ی فنی

React 18 · Vite 5 · CSS خالص (بدون فریم‌ورک استایل) · بدون هیچ وابستگی اضافه‌ی runtime

## ✦ مجوز

آزاد برای استفاده و شخصی‌سازی روی سرور خودت. اگه بازنشرش کردی، ذکر منبع لطف بزرگیه ولی اجباری نیست.