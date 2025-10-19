
<h1 align="center">🌆 Open Code Chicago – Contribution Guidelines</h1>
<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="90%" height="150px">
</p>

<h4 align="center">
  <em>“Open Source is a city built by everyone.”</em><br>
  Welcome to the Open Code Chicago community — where collaboration meets creativity 💫
</h4>

<p align="center">
  <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWpvZjRiZnR2NXVwYWRmcDJpejgzczY2ZmxkdjlvZHdvMnN2NDY0YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6MboVtJAyDHitKQo/giphy.gif" width="100%">
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">
</p>

<p align="center">
  <a href="https://github.com/OpenCodeChicago/hacktoberfest-2025-frontend/issues">
    <img src="https://img.shields.io/badge/Contributions-Welcome-blue?style=for-the-badge&logo=github" />
  </a>
  <a href="https://discord.gg/t6MGsCqdFX">
    <img src="https://img.shields.io/badge/Join%20Us-Discord-purple?style=for-the-badge&logo=discord" />
  </a>
  <a href="https://github.com/OpenCodeChicago/hacktoberfest-2025-frontend/stargazers">
    <img src="https://img.shields.io/github/stars/OpenCodeChicago/hacktoberfest-2025-frontend?style=for-the-badge&color=yellow" />
  </a>
 <a href="#contributors">
  <img src="https://img.shields.io/github/all-contributors/OpenCodeChicago/hacktoberfest-2025-frontend?color=023e8a&style=for-the-badge" alt="All Contributors"/>
</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ashghazali/neon-lines/main/line1.gif" width="100%">
</p>

---

## 🧭 Before You Start

- 📜 Read our [**Code of Conduct**](./CODE_OF_CONDUCT.md)  
- ⚙️ Review the [**Usage Guide**](./docs/usage.md) to run the project locally  
- 🧩 Explore [**Open Issues**](https://github.com/OpenCodeChicago/hacktoberfest-2025-frontend/issues)  
- 📋 Check the [**Project Board**](https://github.com/orgs/OpenCodeChicago/projects/2)  
> 💡 Comment on a task to get assigned — avoids duplicate work and keeps contributions coordinated  

<p align="center">
  <img src="https://raw.githubusercontent.com/ashghazali/neon-lines/main/line2.gif" width="100%">
</p>

## 🚀 How to Contribute

Follow these **7 steps**:

### 1️⃣ Fork the Repository
Click **Fork** at the top-right of the repo.

### 2️⃣ Clone Your Fork
```bash
git clone https://github.com/<your-username>/hacktoberfest-2025-frontend.git
cd hacktoberfest-2025-frontend
```
### 3️⃣ Create a Branch
```bash
git checkout -b feature/amazing-feature
```
  >🔖 Use clear, descriptive branch names.
### 4️⃣ Make Changes

-Follow project structure & coding style

-Keep changes focused

-Run npm run lint & npm run prettier before committing

#### 5️⃣ Commit Your Work
```bash
git add .
git commit -m "Fix: navbar transparency on mobile"
```
### 6️⃣ Push to Your Fork
```bash
git push origin feature/amazing-feature
```
### 7️⃣ Open a Pull Request

-Base branch: main

-Describe changes clearly

-Reference related issues (Closes #123)

-Keep PRs concise for easy review ✅

<p align="center"> <img src="https://raw.githubusercontent.com/ashghazali/neon-lines/main/line3.gif" width="100%"> </p>

###   ⚙️ Backend & Environment Setup
 **API Base URL:**  
[https://corexshoptest.onrender.com/api](https://corexshoptest.onrender.com/api)
Steps:
1. Copy .env.example → .env:
   ```bash
   cp .env.example .env
   ```
2. Set API URL in .env:
     ```bash
     
   VITE_API_URL=https://corexshoptest.onrender.com/api
   ```
3. Access it in code:
    ```bash

    import.meta.env.VITE_API_URL
   ```
4  Verify setup:
   ```bash

npm run dev
 ```
<p align="center"> <img src="https://raw.githubusercontent.com/ashghazali/neon-lines/main/line4.gif" width="100%"> </p>

### ⚡ Tips & Best Practices

- ✅ Check your environment setup before running the project

- 🧹 Keep the repo clean; do not commit node_modules

- 🧩 Follow project structure; organize components, pages, and assets properly

- 📝 Document your code clearly

- 🔄 Sync with main repo frequently to avoid merge conflicts:
```bash
git fetch upstream
git merge upstream/main
```

- 🧪 Test your changes locally before submitting a PR

- 🌐 Verify API endpoints if data isn’t loading

- 💬 Ask questions early in Discussions or Discord
  
### 💖 Contributor Appreciation

A big thank you to all contributors! 🚀

<p align="center"> <a href="https://github.com/OpenCodeChicago/hacktoberfest-2025-frontend/graphs/contributors"> <img src="https://contrib.rocks/image?repo=OpenCodeChicago/hacktoberfest-2025-frontend" /> </a> </p>

### 💬 Getting Help

- If you’re stuck or unsure:

  -Ask in our GitHub Discussions

  -Join our Discord

  -Or email us at info@opencodechicago.org

### ⭐ Support the Project

If you find this project helpful or enjoy contributing, please consider giving us a ⭐ on GitHub!
Starring the repo helps increase visibility, attracts contributors, and makes your contributions more valuable for your portfolio or employer.

Every contribution matters — big or small. ❤️
Thank you for helping make Open Code Chicago better!

<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXl1MTJ1aGNxOXl3NzQxdjl4dzRyZW5tcWN6Z3B2djR4cGM5NHhpcyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fWfowxJtHySJ0SGCgN/giphy.gif" width="70%" height="250px">
</p>

