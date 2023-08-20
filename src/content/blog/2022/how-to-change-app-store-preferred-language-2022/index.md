---
title: "How to change App Store preferred Language 2022"
desc: "Resolve your AppStore language issue on macOS! Despite numerous solutions, I discovered a simple fix for the problem. Change your VPN to UK location, log out of AppStore, force close it, and open again. After logging in, AppStore will switch to English."
date: 2022-01-21
tags: [ apple, macos, appstore, vpn ]
---

My wife has issue with AppStore on MacBook, her account, and iPhone was set up in English but for some reason AppStore
on macOS have been in Spanish.

{% image "./appstore-esp.png", "App Store in Spanish", [700] %}

In internet, you can find numerous instructions how to change language of your account and AppStore. Some of them live
on Apple Support pages, but no one solution works for me, and according to google requests, looks like I’m not the only
one who has this issue.

As AppleCare+ holder I decided to ask Apple advisors about my issue by email first, with no good answer 🙁

Later I try to contact Apple Support via chat, and there are a couple of funny stories… So far, I would like to say,
Apple Advisors are the most friendly and skilled support ever! But even they, couldn’t help me 🙁

First I got connected to Super Advisor who tried to help me, but the chat looks like freez.. Or he made it looks like
freeze :/

Anyway, second time I got connection with very friendly guy who try to debug a problem and ask me to try alternatives.

No one of their solutions don’t want to solve my issue, we have tried to remove VPNs, remove LittleSnitch Firewall,
reset settings, check Apple ID, brake SMC settings 🙂 Nothing helps, and he decides to schedule a phone call with super
Advisor 🙂

Long story short… after all manipulations I made, and taking short coffee break, I found a simple solution!

The App Store on macOS its an webpage AppView, and language of AppStore based on geoIP location, so if you based in
Spain like I am and you log in to appStore, the language will be set to Spanish.

Even your account set up to English, so based on my discovery I set my VPN to UK location, logout from AppStore, force
close it, and open again, first it was in Spanish again, but after I login to my Apple ID, AppStore become to English!!!

{% image "./appstore-eng.png", "App Store in English", [700] %}

Later I turn VPN off and restart my mac to see if AppStore change language, but its not, from now my AppStore are always
in English.

This is it, solution was super simple, but nobody, even Apple Support have no idea about this glitch.

{% signature %}
