// vite.config.ts
import pages from "file:///Users/alex/development/sites/serverless/cloudflare/kiskis/node_modules/@hono/vite-cloudflare-pages/dist/index.js";
import adapter from "file:///Users/alex/development/sites/serverless/cloudflare/kiskis/node_modules/@hono/vite-dev-server/dist/adapter/cloudflare.js";
import devServer from "file:///Users/alex/development/sites/serverless/cloudflare/kiskis/node_modules/@hono/vite-dev-server/dist/index.js";
import { defineConfig } from "file:///Users/alex/development/sites/serverless/cloudflare/kiskis/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      build: {
        rollupOptions: {
          input: "./src/client.ts",
          output: {
            entryFileNames: "static/client.js"
          }
        }
      }
    };
  } else {
    return {
      plugins: [
        pages(),
        devServer({
          entry: "src/index.tsx",
          adapter
        })
      ]
    };
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWxleC9kZXZlbG9wbWVudC9zaXRlcy9zZXJ2ZXJsZXNzL2Nsb3VkZmxhcmUva2lza2lzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYWxleC9kZXZlbG9wbWVudC9zaXRlcy9zZXJ2ZXJsZXNzL2Nsb3VkZmxhcmUva2lza2lzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hbGV4L2RldmVsb3BtZW50L3NpdGVzL3NlcnZlcmxlc3MvY2xvdWRmbGFyZS9raXNraXMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGFnZXMgZnJvbSAnQGhvbm8vdml0ZS1jbG91ZGZsYXJlLXBhZ2VzJ1xuaW1wb3J0IGFkYXB0ZXIgZnJvbSAnQGhvbm8vdml0ZS1kZXYtc2VydmVyL2Nsb3VkZmxhcmUnXG5pbXBvcnQgZGV2U2VydmVyIGZyb20gJ0Bob25vL3ZpdGUtZGV2LXNlcnZlcidcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgaWYgKG1vZGUgPT09ICdjbGllbnQnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJ1aWxkOiB7XG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICBpbnB1dDogJy4vc3JjL2NsaWVudC50cycsXG4gICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ3N0YXRpYy9jbGllbnQuanMnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGx1Z2luczogW1xuICAgICAgICBwYWdlcygpLFxuICAgICAgICBkZXZTZXJ2ZXIoe1xuICAgICAgICAgIGVudHJ5OiAnc3JjL2luZGV4LnRzeCcsXG4gICAgICAgICAgYWRhcHRlcixcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH1cbiAgfVxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQWdXLE9BQU8sV0FBVztBQUNsWCxPQUFPLGFBQWE7QUFDcEIsT0FBTyxlQUFlO0FBQ3RCLFNBQVMsb0JBQW9CO0FBRTdCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLE1BQUksU0FBUyxVQUFVO0FBQ3JCLFdBQU87QUFBQSxNQUNMLE9BQU87QUFBQSxRQUNMLGVBQWU7QUFBQSxVQUNiLE9BQU87QUFBQSxVQUNQLFFBQVE7QUFBQSxZQUNOLGdCQUFnQjtBQUFBLFVBQ2xCO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRixPQUFPO0FBQ0wsV0FBTztBQUFBLE1BQ0wsU0FBUztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFVBQ1IsT0FBTztBQUFBLFVBQ1A7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
