console.log('client.ts')


const form = document.querySelector('form')
const messageOut = document.getElementById('message-out') ? document.getElementById('message-out') : 'no message'
const key = document.getElementById('key')
const iv = document.getElementById('iv')
const result = document.getElementById('result')


//catch the form submit event

form?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(form)
  processForm(formData)
 
    
})

async function processForm(form: FormData) {
    
    const formMessage = form ? form.get('message') : ''
      console.log("FORM MESSAGE: ", formMessage)
      const messagecontent = formMessage ? formMessage.toString() : 'no message'
      console.log(messageOut)
        messageOut.textContent = messagecontent;
        generateKey().then(({generatedKey, base64Key}) => {
            key.textContent = base64Key;
            return encryptMessage(messagecontent, generatedKey);
        }).then((encrypted) => {
            iv.textContent = btoa(String.fromCharCode(...new Uint8Array(encrypted.iv)));
            result.textContent = encrypted.encryptedString;
            // push the message and iv to the KV store
            const url = new URL(window.location.href);
            const key = url.hash.substring(1);
            const data = {
                message: messagecontent,
                iv: encrypted.iv
            }
            
            //push the key to the url
            window.history.pushState({}, '', `#${key.textContent}`)
        })
}

async function generateKey() {
    const generatedKey = await window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    )
        const rawKey = await window.crypto.subtle.exportKey('raw', generatedKey);
        const base64Key = btoa(String.fromCharCode(...new Uint8Array(rawKey)));
        console.log(base64Key);
        return {generatedKey, base64Key};
}

async function encryptMessage(message: string, key: CryptoKey) {
    const encoded = new TextEncoder().encode(message);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        encoded
    )
    const encryptedArray = new Uint8Array(encrypted);
    const encryptedString = btoa(String.fromCharCode(...encryptedArray));
    return {encryptedString, iv}
}









