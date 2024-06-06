import { Hono } from 'hono'
import { renderer } from './renderer'

type Bindings = {
  dataTest: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

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
            <p>Geneate a link and set the expiry time for the message</p>
            <div class="controls">
              <button>Generate</button>
              <select name="expiry" id="expiry">
                <option value="3600">1 hour</option>
                <option value="86400">1 day</option>
                <option value="604800">1 week</option>
                <option value="2628000">1 month</option>
              </select>
            </div>
          </form>
        </body>
      </html>
    )
  })

//deal with a url that has the content in the path
app.get('/:content', async (c) => {
    const data = c.req.path
    const [id, key] = data.split('#')
    const idString = id.replace(/\//g, '')
    const message = await c.env.dataTest.get(idString)

    return c.render(
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
          <div class="msg-container">
          <textarea id="encryptedmsg">{message}</textarea>
          <button id="newsecret">New Secret</button>
          </div>
          
        </body>
      </html>
    )
  })

app.post('/post', async (c) => {
    const body = await c.req.json()
    const id = crypto.getRandomValues(new Uint8Array(12))
    //make the id a base64 string
    let idString = btoa(String.fromCharCode(...id))
    //remove any slashes from the id
    idString = idString.replace(/\//g, '_')
    await c.env.dataTest.put(idString,`${body.message}, ${body.iv}`, {expirationTtl: Number(body.expiry)})
    return c.json({ id: idString
    })
  })


export default app