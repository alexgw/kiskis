console.log('client.ts')


const form = document.querySelector('form')

const encryptedMessage = document.getElementById('encryptedmsg')
const newSecret = document.getElementById('newsecret')

//catch the form submit event

form?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(form)
  processForm(formData)
 
    
})

async function processForm(form: FormData) {

    const expiry = form.get('expiry')

    console.log("EXPIRY: ", expiry)
    
    const formMessage = form ? form.get('message') : ''
      console.log("FORM MESSAGE: ", formMessage)
      const messagecontent = formMessage ? formMessage.toString() : 'no message'

      generateKey().then(({generatedKey, base64Key}) => {
        return encryptMessage(messagecontent, generatedKey).then(encrypted => ({encrypted, base64Key}));
    }).then(({encrypted, base64Key}) => {
        // push the message and iv to the KV store by making a fetch request to /post then the message id and key to the url
        return fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: encrypted.encryptedString,
                iv: btoa(String.fromCharCode(...new Uint8Array(encrypted.iv))),
                expiry: expiry
            })
        }).then(response => response.json())
        .then(data => ({data, base64Key}));
    }).then(({data, base64Key}) => {
        window.history.pushState({}, '', `${data.id}#${base64Key}`)
        writeClipboardText(window.location.href)
        const popover = document.getElementById('mypopover')
        popover?.showPopover()
        setTimeout(() => {
            popover?.hidePopover()
        }, 2000)

    })


}

async function writeClipboardText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error.message);
    }
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


function base64ToArrayBuffer(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}


function decryptMessage(encryptedString: string, key: CryptoKey, iv: Uint8Array) {
    //encode the encrypted string to a Uint8Arra
    const encryptedBuffer = base64ToArrayBuffer(encryptedString);
    const encryptedArray = new Uint8Array(encryptedBuffer);
    const decrypted = window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        encryptedArray
    )
    return decrypted;
}

async function receiveMessage() {
    console.log('receive message')
    let key64 = window.location.hash;
    key64 = key64.replace('#', '');
    console.log("KEY: ", key64)
    //convert key from base64 back to cryptokey
    const keyBuffer = atob(key64);
    const keyArray = new Uint8Array(keyBuffer.length);
    for (let i = 0; i < keyBuffer.length; i++) {
        keyArray[i] = keyBuffer.charCodeAt(i);
    }
    const key = await window.crypto.subtle.importKey(
        'raw',
        keyArray,
        'AES-GCM',
        true,
        ['encrypt', 'decrypt']
    )


    const encrypted = encryptedMessage?.textContent

    //splt the message and the iv in encrypted by the comma
    const [message, iv64] = encrypted.split(',');
    console.log("MESSAGE: ", message)
    console.log("IV: ", iv64)

    //convert iv from base64 back to Uint8Array
    const ivBuffer = atob(iv64);
    const ivArray = new Uint8Array(ivBuffer.length);
    for (let i = 0; i < ivBuffer.length; i++) {
        ivArray[i] = ivBuffer.charCodeAt(i);
    }
    const iv = ivArray;

    var decrypted = await decryptMessage(message, key, iv)
    var decryptedString = new TextDecoder().decode(decrypted);
    console.log(decryptedString)
    encryptedMessage.textContent = decryptedString;

}

if (encryptedMessage) {
    receiveMessage();
    newSecret?.addEventListener('click', () => {
        window.location.href = '/';
    })
}








