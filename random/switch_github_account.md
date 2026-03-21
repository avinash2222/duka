# GitHub Accounts (What Actually Worked)

This project now uses the **simple reliable setup**:
- HTTPS remotes
- Git Credential Manager
- Per-repo Git identity

## 1) One-time global setup

```bash
git config --global credential.helper manager
```

## 2) Personal repo (`E:/DUKA`)

```bash
git -C E:/DUKA remote set-url origin https://github.com/avinash2222/duka.git
git -C E:/DUKA config user.name "avinash2222"
git -C E:/DUKA config user.email "avinashcat.singh2222@gmail.com"
```

## 3) Work repo (`D:/ClinAi/vendorselection-frontend`)

```bash
git -C D:/ClinAi/vendorselection-frontend remote set-url origin https://github.com/Clin-AI/vendorselection-frontend.git
git -C D:/ClinAi/vendorselection-frontend config user.name "avinashClinAI"
git -C D:/ClinAi/vendorselection-frontend config user.email "avinash@optiflux.in"
```

## 4) Daily usage

```bash
git push
```

On first push, sign in with the matching GitHub account in the browser prompt.

## 5) If you get "permission denied"

Usually means wrong cached GitHub account/token.

Quick checks:
```bash
git -C E:/DUKA remote -v
git -C D:/ClinAi/vendorselection-frontend remote -v
git credential-manager github list
```

If needed, re-login:
```bash
git credential-manager github login --username avinash2222 --device
git credential-manager github login --username avinashClinAI --device
```
