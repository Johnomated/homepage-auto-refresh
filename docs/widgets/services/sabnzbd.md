---
title: SABnzbd
description: SABnzbd Widget Configuration
---

Learn more about [SABnzbd](https://github.com/sabnzbd/sabnzbd).

Find your API key under `Config > General`.

Allowed fields: `["rate", "queue", "timeleft"]`.

```yaml
widget:
  type: sabnzbd
  url: http://sabnzbd.host.or.ip
  key: apikeyapikeyapikeyapikeyapikey
  refreshInterval: 5000 # optional, defaults to 30000 ms (30 s), minimum is 1000 ms
  enableQueue: true # optional, defaults to false, does not interfere with default queue block
  limit: 10 # optional, max number of queue progress bars to display, defaults to 5
```
