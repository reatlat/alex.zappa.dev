---
title: How remove .DS_Store files from a Git repository?
desc: Learn how to remove .DS_Store files from your Mac OS X repository. Use commands to find and remove the files. Update .gitignore for future prevention. Check gitignore.io for more configurations.
date: 2019-04-10
tags: [git, DS_Store, macOS]
---

Mac OS X users can include system .DS_Store files to repository accidentally.

First, you can check how much .DS_Srore files you have on your work directory. Use fallow command:

```shell
find .* -name ".DS_Store" -type f
```

To remove all .DS_Store files from git you can use fallowing command:

```shell
find .* -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
```

## Update .gitignore file

Add to the file `.gitignore`, which can be found at the top level of your repository (or created if it isn’t there already).

You can do this easily with this command in the top directory:

```shell
echo "# Apple macOS\n.DS_Store\n.DS_Store?\n*/.DS_Store" >> .gitignore
```

Then add and commit your new `.gitignore` file

```shell
git add .gitignore && git commit -m '.DS_Store banished!'
```

## Avoid this issue in future

```shell
echo "# Apple macOS\n.DS_Store\n.DS_Store?\n*/.DS_Store" >> ~/.gitignore_global
```

Set the global git configuration

```shell
git config --global core.excludesfile ~/.gitignore_global
```

Admire your great work?

Also, check [gitignore.io](https://www.toptal.com/developers/gitignore/) where you can configure your own `.gitignore` file by few clicks.

{% signature %}
