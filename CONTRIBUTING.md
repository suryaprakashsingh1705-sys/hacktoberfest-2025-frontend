
<h1 align="center">🌆 Open Code Chicago – Contribution Guidelines</h1>

</p>

<h4 align="center">
  <em>“Open Source is a city built by everyone.”</em><br>
  Welcome to the Open Code Chicago community — where collaboration meets creativity 💫
</h4>

<p align="center">
  <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWpvZjRiZnR2NXVwYWRmcDJpejgzczY2ZmxkdjlvZHdvMnN2NDY0YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6MboVtJAyDHitKQo/giphy.gif" width="60%">
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

---

## Before You Start

- Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) 
- Check out the [Usage Guide](./docs/usage.md) to run the project locally 
- Look at [open issues](https://github.com/OpenCodeChicago/hacktoberfest-2025-frontend/issues) to see where you can help
- Review our [Project Board](https://github.com/orgs/OpenCodeChicago/projects/2) to see **available tasks**  
  - Comment on the task you’d like to work on so a maintainer can assign it to you  
  - This helps avoid duplicate work and keeps efforts coordinated
 
---

## How to Contribute

#### 1️⃣ Fork the Repository
Click **Fork** at the top-right of the repo.

#### 2️⃣ Pick a task
[Project Board](https://github.com/orgs/OpenCodeChicago/projects/2), comment to claim it before starting work

#### 3️⃣ Clone Your Fork
```bash
git clone https://github.com/<your-username>/hacktoberfest-2025-frontend.git
cd hacktoberfest-2025-frontend
```
#### 4️⃣ Create a Branch
```bash
git checkout -b feature/amazing-feature
```
  > Use clear, descriptive branch names.

#### 5️⃣ Make Changes

- Follow project structure & coding style
- Keep changes focused
- Run `npm run lint` & `npm run prettier` before committing

#### 6️⃣ Commit Your Work
```bash
git add .
git commit -m "Fix: navbar transparency on mobile"
```
#### 6️⃣ Push to Your Fork
```bash
git push origin feature/amazing-feature
```
#### 7️⃣ Open a Pull Request (PR)

- Base branch: main
- Describe changes clearly
- Reference related issues (Closes #123)
- Keep PRs concise for easy review ✅

---

## Backend & Environment Variables

- The backend API is available at:  
  `https://corexshoptest.onrender.com/api`
- The frontend uses the environment variable `VITE_API_URL` to connect to the backend.
- Before running the project, copy `.env.example` to `.env`:
  ```bash
  cp .env.example .env
  ```
- You can then use `import.meta.env.VITE_API_URL` in your code to access the API URL.

---

## Tips & Best Practices

- Check your environment setup before running the project
- Please **do not install or commit new packages** without first discussing in an issue or PR.
- If you believe a new dependency is required:
  1. Open or comment on an issue explaining why it’s needed.  
  2. Wait for maintainer approval before adding it. 
- Keep the repo clean. Do not commit:
    - `node_modules`
    - `package.json`
    - `package-lock.json`
- Follow project structure. Organize components, pages, and assets properly
- Document your code clearly
- Sync with main repo frequently to avoid merge conflicts:
```bash
git fetch upstream
git merge upstream/main
```
- Test your changes locally before submitting a PR
- Verify API endpoints if data isn’t loading
- Ask questions early in Discussions or Discord

---

## Get Recognized with the All-Contributors Bot
We use the [All Contributors Bot](https://allcontributors.org/docs/en/bot/usage) to recognize and celebrate all types of contributions. 

**How to add yourself:**
1. After your Pull Request is merged, comment on the PR or in a new issue with:
   ```
   @all-contributors please add @your-github-username for code, doc, ideas
   ```
   - Replace `@your-github-username` with your GitHub handle.
   - List your contribution types (e.g., `code`, `doc`, `ideas`, `bug`, `review`).
   - [See all contribution types here.](https://allcontributors.org/docs/en/emoji-key)

2. The bot will create a Pull Request to add you to the contributors table in the README.
3. A maintainer will review and merge the bot’s PR.

**Example:**
```
@all-contributors please add @Alexandrbig1 for code, doc, maintenance, projectManagement
``` 

If you have questions, ask in your PR or open an issue!

---

## 💖 Contributor Appreciation

A big thank you to all contributors! 🚀

<a href="https://github.com/opencodechicago/hacktoberfest-2025-frontend/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=opencodechicago/hacktoberfest-2025-frontend" />
</a>

---

## Issues
- Use issues to report bugs, request features, or ask questions  
- Before opening a new issue, check if it already exists  
- Apply labels when possible (`bug`, `enhancement`, `good first issue`)  

---

## Getting Help
If you’re stuck or unsure:
- Ask in our [GitHub Discussions](https://github.com/orgs/OpenCodeChicago/discussions/2)  
- Join our [Discord](https://discord.gg/t6MGsCqdFX)  
- Or email us at [info@opencodechicago.org](mailto:info@opencodechicago.org)  

---

## ⭐ Support the Project

If you find this project helpful or enjoy contributing, please consider giving us a ⭐ on GitHub!  
Starring the repo helps increase its visibility, attracts more contributors, and makes your contributions more visible and valuable for your portfolio or employer.

---

Every contribution matters — big or small. ❤️  
Thank you for helping make Open Code Chicago better!

<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXl1MTJ1aGNxOXl3NzQxdjl4dzRyZW5tcWN6Z3B2djR4cGM5NHhpcyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fWfowxJtHySJ0SGCgN/giphy.gif" width="48%" >
</p>

