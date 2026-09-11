# AY Roleplay — Loading Screen

A custom loading screen for FiveM / ESX Legacy servers.

## Install

1. Copy the whole `ay_loadingscreen` folder into your server's `resources` directory.
2. Add this line to your `server.cfg`, near the top (before other resources start):
   ```
   ensure ay_loadingscreen
   ```
3. Restart your server.

## What's inside

- `html/index.html` — structure: top nav (Home / About / Gallery / Staff), the progress bar, and the music player.
- `html/css/style.css` — all visual styling. Colors are defined once at the top of the file under `:root` if you want to retheme it.
- `html/js/script.js` — slideshow timing, tab switching, the tip rotator, the progress bar listener, and the music player.
- `html/img/char1.jpg` – `char4.jpg` — the four background/gallery artworks.
- `html/audio/ambient-chill.mp3` — the background track.

## Customizing

- **Server name / tagline**: edit the `brand-name`, `hero-title` and `hero-tagline` text in `index.html`.
- **Social links**: update the four `href` values inside `<div class="social-row">`.
- **About text / features**: edit the `#panel-about` section.
- **Staff list**: edit the cards inside `#panel-staff` — swap the icon class, name and role for each real staff member.
- **Gallery captions**: edit the `<span>` text inside each `.gallery-item`.
- **Music**: drop additional `.mp3` files into `html/audio/`, add them to the `files {}` list in `fxmanifest.lua`, and extend the small track list logic in `script.js` (the prev/next buttons are already wired up for a playlist — they just need an array of track sources).
- **Progress bar**: it listens for the real `loadProgress` event FiveM sends while resources stream in, so it always reflects actual load state in-game. A short demo animation only runs when previewing `index.html` in a normal browser (no FiveM client present).

## Notes

- The loading screen loads Google Fonts and Font Awesome from their CDNs — FiveM's loading-screen browser has internet access, so this works in-game without bundling the font files locally.
- All corners use a 3px border radius by design, matching the requested look.
