# Download Manager

This is a very simple program made specifically for downloading anime from the Internet.

Basically, the app will first check if there are any pending downloads in the pendingDownloads.json (if it doesn't exists, it will create it). After that, if there are no pending downloads, the app will ask the user to start loading the URLs.

---

The main structure consists of 2 types:

**Interface Series**: This is a season of an anime. This interface contains the name that all the files will have, the directory for downloading the files, and of course, the files.

**Interface File**: This is 1 chapter of an anime. This contains a custom index (for example if this is the episode 0, or 10.5), a custom name (if this is a special episode, for example), and the URL to download it.

---

## Installation

Install the dependencies with:

```bash
  npm install
```

And after that:

```bash
  npm run initialize
```

---

## Usage

Run this command to start the app:

```bash
  npm start
```

Or

```bash
  yarn start
```

---

## Things to add in the future

1. Get the subtitles from an MKV video file, and export them as a sepparate file (either SRT or any other format).

2. If the subtitle file exported was different from SRT format, transiple it to SRT.
