# 🎮 AY Roleplay — Loading Screen

<p align="center">
  <strong>A modern & fully customizable loading screen for FiveM / ESX Legacy servers.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/FiveM-Loading%20Screen-red?style=for-the-badge&logo=rockstargames" alt="FiveM">
  <img src="https://img.shields.io/badge/ESX-Legacy-blue?style=for-the-badge" alt="ESX Legacy">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</p>

---

## ✨ Preview

<p align="center">
  <img src="screenshots/preview-1.png" alt="AY Roleplay Loading Screen" width="49%">
  <img src="screenshots/preview-2.png" alt="AY Roleplay Loading Screen" width="49%">
</p>

---

## 🚀 Features

- 🎨 **Modern Dark UI**
- ⚡ **Real-time FiveM Loading Progress**
- 🖼️ **Animated Background Slideshow**
- 🎵 **Built-in Music Player**
- ⏯️ **Play / Pause Controls**
- ⏮️ **Previous / Next Track**
- 🏠 **Home Section**
- ℹ️ **About Section**
- 🖼️ **Gallery Section**
- 👥 **Staff Section**
- 🔗 **Social Media Links**
- 💡 **Rotating Loading Tips**
- 📱 **Responsive Design**
- 🎯 **Easy to Customize**
- 🧩 **FiveM / ESX Legacy Ready**
- 🔥 **Lightweight & Performance Friendly**

---

## 📦 Installation

### 1️⃣ Download

Download or clone the repository and place the entire `ay_loadingscreen` folder inside your FiveM server's `resources` directory.

```text
resources/
└── ay_loadingscreen/
```

### 2️⃣ Add to `server.cfg`

Add the following line near the top of your `server.cfg`:

```cfg
ensure ay_loadingscreen
```

### 3️⃣ Restart Your Server

Restart your FiveM server and the loading screen will automatically appear when players connect.

---

## 📁 Project Structure

```text
ay_loadingscreen/
│
├── 📄 fxmanifest.lua
├── 📄 README.md
│
└── 📂 html/
    │
    ├── 📄 index.html
    │
    ├── 📂 css/
    │   └── 🎨 style.css
    │
    ├── 📂 js/
    │   └── ⚙️ script.js
    │
    ├── 📂 img/
    │   ├── 🖼️ char1.jpg
    │   ├── 🖼️ char2.jpg
    │   ├── 🖼️ char3.jpg
    │   └── 🖼️ char4.jpg
    │
    └── 📂 audio/
        └── 🎵 ambient-chill.mp3
```

---

## 🎨 Customization

### 🏷️ Server Name & Tagline

Open:

```text
html/index.html
```

Edit the following elements:

```text
brand-name
hero-title
hero-tagline
```

You can use them to customize your server name, slogan and description.

---

### 🔗 Social Links

Inside `index.html`, find:

```html
<div class="social-row">
```

Update the `href` values with your own social media links.

Example:

```html
<a href="https://discord.gg/yourserver">
```

---

### ℹ️ About Section

Customize the server description and features inside:

```html
#panel-about
```

You can add information such as:

- 🌐 Server information
- 🎮 Game modes
- 🏙️ Roleplay features
- ⭐ Server highlights
- 📢 Important announcements

---

### 👥 Staff Section

Staff members can be edited inside:

```html
#panel-staff
```

Each staff card can be customized with:

- 👤 Name
- 🛡️ Role
- 🎨 Icon
- 📝 Description

You can also duplicate or remove cards depending on your staff team.

---

### 🖼️ Gallery

Gallery images are located inside:

```text
html/img/
```

Replace the default images with your own screenshots or artwork.

Gallery captions can be changed inside each:

```html
<span>Gallery Caption</span>
```

---

## 🎵 Music Player

The loading screen includes a built-in music player.

Add your `.mp3` files to:

```text
html/audio/
```

Then add the files to the `files {}` section inside:

```text
fxmanifest.lua
```

Example:

```lua
files {
    'html/index.html',
    'html/css/style.css',
    'html/js/script.js',

    'html/audio/ambient-chill.mp3'
}
```

Additional tracks can be added to the playlist logic inside:

```text
html/js/script.js
```

The **Previous / Next** buttons are already prepared for playlist support.

---

## 📊 Loading Progress

The progress bar uses FiveM's real:

```lua
loadProgress
```

event.

This means the loading progress reflects the actual resource streaming progress while the player is connecting to the server.

### 🌐 Browser Preview

When opening `index.html` directly in a normal browser, FiveM's `loadProgress` event is unavailable.

In that case, a small demo animation is automatically used so you can preview the loading screen outside FiveM.

---

## 🎨 Styling & Theme

All visual styling is handled inside:

```text
html/css/style.css
```

Main theme variables are defined inside:

```css
:root {
    /* Theme variables */
}
```

This makes it easy to completely retheme the loading screen without editing the entire stylesheet.

---

## 🌐 External Resources

This project uses:

- 🔤 **Google Fonts**
- ⭐ **Font Awesome**

Both resources are loaded through their official CDNs.

FiveM's loading-screen browser has internet access, so they work directly in-game.

> 💡 If you want a completely offline loading screen, you can download and bundle the required font files locally.

---

## ⚙️ Requirements

- 🎮 FiveM Server
- 🧩 ESX Legacy or compatible framework
- 🌐 Modern FiveM Client

### 📌 Dependencies

**No additional dependencies are required.**

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| 🌐 HTML5 | Page Structure |
| 🎨 CSS3 | UI & Animations |
| ⚙️ JavaScript | Interactions & Logic |
| 🎮 FiveM NUI | Loading Screen Integration |
| ⭐ Font Awesome | Icons |
| 🔤 Google Fonts | Typography |

---

## 📸 Screenshots

<p align="center">
  <img src="screenshots/preview-1.png" alt="AY Roleplay Home" width="85%">
</p>

<p align="center">
  <img src="screenshots/preview-2.png" alt="AY Roleplay Interface" width="85%">
</p>

---

## 💡 Why AY Roleplay Loading Screen?

AY Roleplay Loading Screen was designed to give FiveM servers a more professional first impression while keeping the codebase simple and easy to customize.

Whether you're running a:

- 🏙️ Roleplay Server
- 🚓 Police / Emergency Server
- 🏎️ Racing Server
- 🎮 Freeroam Server
- 🌐 Custom FiveM Project

You can quickly adapt the loading screen to your own server.

---

## 🤝 Contributing

Feel free to fork the project and customize it for your own FiveM server.

Pull requests, improvements and suggestions are welcome! ❤️

---

## ⭐ Support the Project

If you found **AY Roleplay Loading Screen** useful:

⭐ Give the repository a star  
🍴 Fork the project  
📢 Share it with the FiveM community

---

<div align="center">

# 🎮 AY Roleplay

### Modern • Clean • Customizable

Made for the **FiveM Community** ❤️

</div>