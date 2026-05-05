# Solo Features

This repository is shared by all developers. Each developer works on their
own branch and opens a pull request when their feature is ready. Do not
commit directly to `main`.

---

## How to work in this repo

### 1. Clone the repository (first time only)

```bash
git clone https://github.com/<org>/solo-feat.git
cd solo-feat
```

### 2. Create your branch

Branch names follow this pattern: `feat/<your-name>/<feature-name>`

```bash
git checkout -b feat/alice/login-form
```

### 3. Build your feature

Each feature is a single self-contained HTML file.
Create it inside the folder that matches your assigned task:

```
solo-feat/
├── 01-login-form/
│   └── alice.html
├── 02-signup-form/
│   └── bob.html
└── ...
```

### 4. Commit and push your branch

```bash
git add .
git commit -m "feat: login form with inline validation"
git push origin feat/alice/login-form
```

### 5. Open a pull request

* Base branch: `main`
* Title: `[feat] <your-name> — <feature-name>`
* Description: what you built and what you tested
* Request a review from at least one teammate

### 6. Review a teammate's PR

Every developer must review at least one PR per sprint.
Leave at least two meaningful comments — not just approvals.

---

## Rules

* **Never commit to `main` directly.** All changes go through a PR.
* **One feature per branch.** Keep branches small and focused.
* **Your file, your responsibility.** Name your file with your own name
  so there are no merge conflicts with teammates working on the same task.
* **PR must be approved before merge.** At least one teammate approval
  and a green CI check are required.
