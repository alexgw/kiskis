# Keep it secret, Keep it safe (KISKIS)

A serverless implementation of [0Bin](https://github.com/Tygs/0bin) a client side encrypted pastebin. Based originally on implementation of the [zerobin](https://github.com/sebsauvage/ZeroBin/) project, created by sebsauvage, under the [WTFPL licence](http://en.wikipedia.org/wiki/WTFPL).

This particular implementation uses Cloudflare Pages and Hono to host the bin. 

For development:

```txt
npm install
npm run dev
```

```txt
npm run deploy
```
To Do:

- expiration times connect to KV
- popover/alert on success and clipboard success