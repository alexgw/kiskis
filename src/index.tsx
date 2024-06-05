import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.get('*', renderer)

app.get('/', (c) => {
    return c.html(
      <html>
        <head>
          {import.meta.env.PROD ? (
            <script type='module' src='/static/client.js'></script>
          ) : (
            <script type='module' src='/src/client.ts'></script>
          )}
          <link rel='stylesheet' href='/static/style.css' />
        </head>
        <body>
          <h1>😘😘</h1>
          <p>A client side encrypted pastebin - keep it secret keep it safe</p>
          <form>
          <textarea name="message" id="message"></textarea>
          
          <button>Generate</button>

          </form>

        <div id="output">
            <p>Message</p>
            <p id="message-out"></p>
            <p>Key</p>
            <p id="key"></p>
            <p>IV</p>
            <p id="iv"></p>
            <p>Encrypted Message</p>
            <p id="result"></p>
        </div>

     
        </body>
      </html>
    )
  })

//deal with a url that has the content in the path
app.get('/:content', async (c) => {
    const data = c.req.path
    return c.render(<p>{data}</p>)
  })

export default app