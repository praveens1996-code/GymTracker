# Gym Tracker
Do you go to the gym and are tired of manually keep track of exercizes, sets and weight? With Gym Tracker you no longer need to carry a piece of paper and a pen around, even your phone if you have an Apple Watch:
- Create any number of workouts with fully customizable exercizes
- Archive workouts you no longer use
- Quickly start any non-archived workout
- Let the app guide you through exercizes and rests with timers and notifications
- Easily change the weight at the end of a set
- Crash safe: don't worry if something bad happens during a workout, your progress is saved and you can resume as soon as you reopen the app

At the end your workout is automatically saved inside the Health app, if you're using an Apple Watch with detailed heart rate and calories.

Backup and restore your workouts using iCloud Drive or export and share them with your friends. Backups and exported workout are in XML format and easily accessible from inside the iCloud Drive folder and app, you can manually edit them and import them again, before import data is validated against this [XSD grammar](https://github.com/piscoTech/GymTracker/blob/master/Gym%20Tracker%20Core/workout.xsd).

[![Download on the AppStore](https://marcoboschi.altervista.org/img/app_store_en.svg)](https://itunes.apple.com/us/app/gym-tracker-gym-workout-tracker/id1224155362?ls=1&mt=8)

## Project Setup
The framework `MBLibrary` referenced by this project is available [here](https://github.com/piscoTech/MBLibrary), version currently in use is [1.9.1](https://github.com/piscoTech/MBLibrary/releases/tag/v1.9.1(22)).

## Customization
General behaviour of the app can be configured via global and static variables:
- File `Main iOS & watchOS.swift`:
  * `healthReadData` and `healthWriteData`: The list of data types to be read and written to Health.
- Class `GTRest`:
  * `maxRest`: Max rest period allowed in seconds, make sure it's a multiple of 30 seconds, or whatever you set in `restStep`.

## Personal web tracker
The repository also includes a personal workout tracker in [`index.html`](index.html), with [`sw.js`](sw.js) to cache the page for offline launches. Deploy the repository root as a static site with Cloudflare Pages: leave the build command blank and set the output directory to `.`. Open the published HTTPS URL once while online so the browser can cache it, then bookmark that URL and reopen it when needed. It has no build step, API, database, or external dependencies.

The five-day programme (Saturday through Wednesday) and its instructions are embedded as the starter routine. The suggested remaining workouts are editable. Change workout days, names, exercises, sets, rep targets, and notes in **Settings → Your weekly routine**; those changes are stored in the browser and do not require a code edit or site redeploy. Completed workouts keep a snapshot of the routine used at the time.

Workout entries, routine changes, and measurements are saved in that browser's local storage for the Cloudflare Pages site origin; they are not uploaded or synchronized. Browser storage belongs to the exact site URL and browser, so choose the URL you plan to bookmark and keep using it. Use **Settings → Export data** for a JSON backup, then **Import a backup** on another device or URL to restore it. Keep exported backups somewhere safe; clearing browser data also clears locally saved entries. The web tracker is separate from the existing iOS/watchOS app and does not read or modify its data.
