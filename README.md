# cloudflare-workers-verify
![](https://img.shields.io/github/license/Z4nzu/hackingtool)

**cloudflart workers verify**

基于cloudflare workers生成两个网页，一个用于生成一个六位的验证码，另一个用于验证，验证成功即可跳转至网页的下一个界面。<a href="httpa://generate.zhuoc.top">生成演示web</a> <a href="https://verify.zhuoc.link">验证演示web</a>

**deploy**

本项目需要部署两个workers，部署过程可以参考本人另外一个项目 <a href="https://github.com/zhuolhc/cloudflare-workers-GET-IP">GET IP</a>

把 <a href="https://github.com/zhuolhc/cloudflare-workers-verification-code-send-and-verify/blob/main/generate.js">generate</a> 和 <a href="https://github.com/zhuolhc/cloudflare-workers-verification-code-send-and-verify/blob/main/verify.js">verify</a> 分别部署在两个workers中，并且需要创建一个kv数据库，其中代码中的"yzm"就是需要与kv数据库的命名空间名称保持高度一致，可以自行修改，但是一定要一致，并且把这一个kv数据库分别绑定在两个workers中。部署成功后，可以把第一个网站的验证码输入到第二个部署的网站中，就会跳转至下一个页面，原代码中跳转到百度。（第一个页面为静态页面，是搜索不了的，实测点下面的新闻推荐就会到百度官方页面里，之后就能搜索了）。也同另一个项目可以解析DNS，添加触发器，加入子域名，方便访问。

**remind**

本项目存在瑕疵，在cloudflare workers工作台内的网页验证码可以完美适配第二个网站，但是拉出来的网页就不能。经过kv数据库内密钥持续刷新与实时验证码对比初步判断为缓存问题或写入出现的问题。欢迎指正。my email:a@zhuoc.link
 <h3>LICENSE</h3>
  本项目基于<a href="https://opensource.org/license/mit/">MIT</a>
