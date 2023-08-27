// 验证码生成网页
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 删除之前的验证码
  await deletePreviousCodeFromKV();

  // 生成验证码逻辑
  const code = generateCode();
  
  // 存储验证码到 KV
  await saveCodeToKV(code);
  
  // 构建 HTML 响应
  const htmlResponse = generateHTML(code);

  //const cacheHeaders = {
  //'Content-Type': 'text/html',
  //'Cache-Control': 'max-age=60' // 设置缓存一分钟
  //};
  //这里就是可能能解决问题的地方
  
  return new Response(htmlResponse, {
    headers: { 'Content-Type': 'text/html' },
    status: 200
  });
}

async function deletePreviousCodeFromKV() {
  // 使用 Cloudflare Workers KV API 删除之前生成的验证码。
  await yzm.delete('verificationCode');
}

function generateCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  
  return code;
}

async function saveCodeToKV(code) {
  // 使用 Cloudflare Workers KV API 将验证码存储到 KV
  await yzm.put('verificationCode', code);
}

function generateHTML(code) {
  // 构建 HTML 内容
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>验证码生成</title>
      </head>
      <body>
        <h1>生成的验证码：</h1>
        <p>${code}</p>
      </body>
    </html>
  `;
}
