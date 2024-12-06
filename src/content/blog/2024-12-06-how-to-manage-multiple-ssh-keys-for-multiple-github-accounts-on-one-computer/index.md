---
title: "How to Manage Multiple SSH Keys for Multiple GitHub Accounts on One Computer"
desc: "Learn how to set up and manage multiple SSH keys on a single computer to seamlessly work with multiple GitHub accounts. Step-by-step guide for developers."
tags: [git, ssh, github]
---

Recently [my son](https://zapparov.dev) asked me how to manage multiple SSH keys for multiple GitHub accounts on one computer. He starts his journey as computer science student and he need to work with multiple GitHub accounts for his projects.

My first attempt was to find an article or ready solution to point him to. But I couldn't find a good one. So I decided to write this article to help him and other developers who’re facing the same issue.

<img src="laptop-keys.png" alt="How to Manage Multiple SSH Keys for Multiple GitHub Accounts on One Computer" eleventy:widths="400">

## Step-by-Step guide

### 1. Generate Two SSH Keys

If you haven’t already, [generate two SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) for each GitHub account:

```bash
ssh-keygen -t ed25519 -C "personal_email_account@example.com" -f ~/.ssh/id_ed25519_personal
ssh-keygen -t ed25519 -C "student_email_account@example.com" -f ~/.ssh/id_ed25519_edu
```

- The `-f` flag specifies the filename for the keys (e.g., id_ed25519_personal and id_ed25519_edu).

> ***If you are using a legacy system that doesn't support the Ed25519 algorithm, use:***
>
> ```bash
> ssh-keygen -t rsa -b 4096 -C "personal_email_account@example.com" -f ~/.ssh/id_rsa_personal
> ssh-keygen -t rsa -b 4096 -C "student_email_account@example.com" -f ~/.ssh/id_rsa_edu
> ```

### 2. Add Keys to the SSH Agent

Add both keys to your SSH agent:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_personal
ssh-add ~/.ssh/id_ed25519_edu
```

### 3. Update the SSH Config File

Edit (or create) your ~/.ssh/config file to define configurations for each GitHub account.

```bash
# GitHub Personal Account
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_personal

# GitHub Education Account
Host github.edu
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_edu
```

### 4. Use Configured Hosts in Git URLs

When cloning or working with Git repositories, use the corresponding host name defined in the SSH config:

For Personal account:

```bash
git clone git@github.com:username/repo.git
```

For Education account:

```bash
git clone git@github.edu:username/repo.git
```

### 5. Test Your Configuration

Verify the setup by testing the SSH connection for each account:

```bash
ssh -T github.com
ssh -T github.edu
```

If the setup is correct, GitHub will identify each account and display a success message.

## Tips

If you already cloned repositories using the default git@github.com format, update the origin remote URL to use the appropriate host:

```bash
git remote set-url origin git@github.edu:username/repo.git
```

Make sure the SSH public keys (id_ed25519_personal.pub and id_ed25519_edu.pub) are added to the respective GitHub accounts in their settings.

## Setup Git Global Configuration

To avoid conflicts, set up a global Git configuration for each account:

```bash
git config --global user.name "Personal Name"
git config --global user.email "personal_email_account@example.com"
```

then you need to update the global configuration for the second account:

```bash
touch ~/.gitconfig_edu
echo "[user]" >> ~/.gitconfig_edu
echo "  name = Student Name" >> ~/.gitconfig_edu
echo "  email = student_email_account@example.com" >> ~/.gitconfig_edu
```

and then you need update the global configuration file `~/.gitconfig` to include the second configuration file:

```bash
echo "[includeIf \"gitdir:~/path/to/your/education/**\"]" >> ~/.gitconfig_edu
echo "  path = ~/.gitconfig_edu" >> ~/.gitconfig_edu
```

> ***Note: for Windows users ruleset `includeIf` could be different.***
>
> ```bash
> echo "[includeIf \"gitdir/i:C:/path/to/your/education/**\"]" >> ~/.gitconfig_edu
> ```

This setup allows you to:

- Use the correct name and email for each account.
- Automatically switch between configurations based on the repository path.
- Keep your global configuration clean and organized.

### How it works

When you run a Git command in a repository located in the `~/path/to/your/education/` directory, Git will use the configuration from the `~/.gitconfig_edu` file.

In all other cases, Git will use the default global configuration.

### Testing the Configuration

To confirm the correct profile is being applied in a specific directory:

```bash
git config --get user.name
git config --get user.email
```

> ***Important notes:***
>
> - The included files (e.g., `~/.gitconfig_edu`) must be valid Git configuration files.
> - Make sure to replace `~/path/to/your/education/**` with the actual path to your education repositories.
> - If a directory doesn’t match any includeIf condition, the global configuration will be used.

That’s it! You’ve successfully set up and managed multiple SSH keys for multiple GitHub accounts on one computer.
