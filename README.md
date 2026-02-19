📘 DSA Revision Tracker

A simple local web app to track solved LeetCode problems and automatically schedule revision reminders using spaced repetition (3, 7, and 14 days).

🚀 Why This Exists

When solving DSA problems, most people forget them within days.

This tracker ensures:

You revisit problems at strategic intervals.

You build long-term memory.

Easy problems become automatic.

🧠 How It Works

When you add a problem:

The app automatically schedules revision reminders for:

✅ 3 Days Later

✅ 7 Days Later

✅ 14 Days Later

On those days:

The problem appears under "Due Today"

You click Mark Done after re-solving it

Progress is saved locally

All data is stored in your browser using localStorage.

No backend required.

📂 Project Structure
progress-tracker/
│
├── index.html
├── script.js
└── README.md

⚙️ Installation & Usage
1️⃣ Download or Clone
git clone <your-repo-url>


Or just download the folder.

2️⃣ Run Locally

Simply open:

index.html


In your browser.

No server required.

💾 Data Storage

Uses browser localStorage

Data persists even after closing the browser

Clearing browser storage will erase data

📌 Features

Add solved problems

Auto schedule revision dates

Track due revisions

Mark revisions as completed

Persistent storage

Minimal dark UI

🔮 Future Improvements (Optional Upgrades)

Difficulty tagging (Easy / Medium / Hard)

Notes section per problem

Progress analytics dashboard

Streak tracking

Calendar view

Push notifications

PWA support

Google Sheets sync

LeetCode API integration

React version

🎯 Purpose

This tool is built to enforce:

Discipline > Motivation

Spaced repetition ensures problems move from:
Short-term memory → Long-term recall

👨‍💻 Author

Vignesh
Built for structured DSA mastery.