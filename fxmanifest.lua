fx_version 'cerulean'
game 'gta5'

author 'AY Team'
description 'AY ROLEPLAY — custom loadscreen'
version '1.0.0'

-- FiveM loadscreens are just a webpage, this points at the built React app
loadscreen 'dist/index.html'
loadscreen_cursor 'yes'

files {
    'dist/index.html',
    'dist/assets/*.js',
    'dist/assets/*.css',
    'dist/music/*.mp3',
    'dist/wallpaper.jpg',
}