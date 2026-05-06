# Solo Features

This repository is shared by all developers. Each developer works on their own branch and opens a pull request when their feature is ready. Do not commit directly to `main`.

---

## Git workflow

### 1. Initialize the repo (new local repo only)

```bash
git init
```

### 2. Add files and commit

```bash
git add */filename
git commit -m "Description"
```

### 3. Inspect history

```bash
git log
git show [hash]
```

### 4. Push your branch

```bash
git push [target repo] [source branch]
```

### 5. Clone an existing repo

```bash
git clone [Repo URL]
```

### 6. Create a feature branch

Branch names should include developer and feature, for example:

```bash
git checkout -b ttw-login/ttw-signup
```

### 7. Make changes, commit, and push

```bash
git add [files]
git commit -m "Description"
git push origin [branch name]
```

---

## How to work in this repo

1. Clone the repository:

```bash
git clone https://github.com/<org>/solo-feat.git
dot solo-feat
```

2. Create your branch:

```bash
git checkout -b ttw-login/ttw-signup
```

3. Build your feature:

Each feature is a single self-contained HTML file. Create it inside the folder that matches your assigned task.

4. Commit and push your branch:

```bash
git add [your file]
git commit -m "feat: add login form"
git push origin ttw-login/ttw-signup
```

5. Open a pull request:

* Base branch: `main`
* Title: `[feat] <your-name> — <feature-name>`
* Description: what you built and what you tested
* Request a review from at least one teammate

---

## Rules

* **Never commit to `main` directly.** All changes go through a PR.
* **One feature per branch.** Keep branches small and focused.
* **Your file, your responsibility.** Name your file with your own name so there are no merge conflicts.
* **NEVER MERGE PR TO MAIN BRANCH**.
