---
title: How to block visitors by country with the NGINX GeoIP Module (Debian/Ubuntu)
desc: Block visitors by country using NGINX and the GeoIP module. Install the module and database, configure the nginx.conf file, and test the configuration before restarting nginx. Instructions with examples provided.
date: 2019-04-14
tags: [nginx, geoip, debian, ubuntu, linux]
---

In the last time, I see a lot of attack from botnet with IPs from eastern europe. Several of my projects
aren’t concerned about visitors from those countries, so we just block all of them 🙂

## How block visitors by Country?

This tutorial explains how to use the GeoIP module with NGINX to block visitors by country. This is made possible by the
GeoIP database which maps users’ IP addresses to countries. NGINX must be version 1.9.11 or higher, and installed the
[HttpGeoipModule](http://nginx.org/en/docs/http/ngx_http_geoip_module.html) to use the GeoIP database.

Actually, it’s pretty easy with the latest Nginx release. I use nginx v1.15.5, which I think the last stable one 🙂

## Let’s start. Install GeoIP module and database.

We need install 3 packages using this command

```shell
apt-get install nginx-module-geoip geoip-database libgeoip1
```

Perhaps the last one package(libgeoip1) you already have on your server 🙂

After that we have to include new module and rules to file

```
/etc/nginx/nginx.conf
```

Add before *http {}* block open:

```ini
[...]
    # Load GeoIP module
    load_module "modules/ngx_http_geoip_module.so";
[...]
```

Place next block in the *http {}* block, before any *include* lines:

```ini
[...]
    # ISO codes here https://dev.maxmind.com/geoip/legacy/codes/iso3166/
    geoip_country /usr/share/GeoIP/GeoIP.dat;
    map $geoip_country_code $allowed_country {
        default yes;
        RU no;
        UA no;
        BY no;
    }
[...]
```

Now, this actually doesn’t block any country, it just sets the *$allowed_country* variable. To actually block countries,
you must open your vhost configuration and place the following code in the *server {}* container (this can go inside and
also outside any *location {}* block):

```ini
[...]
    if ($allowed_country = no) {
        return 444;
    }
[...]
```

Definitely, you can have a bit more complicated config structure, but this is just example how it’s work.

We return **Error 444 connections closed without response.**

A non-standard status code used to instruct nginx to close the connection without sending a response to the client, most
commonly used to deny malicious or malformed requests.

This status code is not seen by the client, it only appears in nginx log files. More information
on [nginx documentation](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#return).

## Test NGINX configuration file

Run command

```shell
nginx -t
```

You have to see this respond

```shell
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

If your configuration pass the test, restart nginx using *systemctl*

```shell
systemctl restart nginx
```

Admire your great work ? and test how it’s work with VPN service.

{% signature %}
