Here are **super short notes** you can remember easily 👇

---

# 🧠 GitHub Multiple Accounts – Quick Notes

## ✅ Best Method (SSH)

* Create **2 SSH keys** (work + personal)
* Add both to GitHub
* Configure `~/.ssh/config`
* Use different hosts:

  * `github-work`
  * `github-personal`

👉 **No switching needed ever** ✅

---

## 🔁 How to “switch”

* **SSH** → No switch, auto based on repo
* **HTTPS** → Logout + login again ❌ (avoid)

---

## 📌 Per Repo Setup

Set correct remote:

```bash
git remote set-url origin git@github-work:username/repo.git
```

or

```bash
git remote set-url origin git@github-personal:username/repo.git
```

---

## 👤 Set correct identity (important)

```bash
git config user.name "Your Name"
git config user.email "your-email"
```

---

## ⚠️ Common mistake

* Wrong account cached → ❌ permission denied
  👉 Fix:

```bash
git credential reject https://github.com
```

---

## 🧠 One-line memory trick

👉 **“SSH = no tension, HTTPS = login tension”**

---

If you want, I can give you a **ready-made config file** you just paste and done 👍
