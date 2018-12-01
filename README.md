<h1 align="center">
  <a href="https://filego.io"><img width="550" src="https://usercontents.authing.cn/filego/cdn/images/filego_blue.svg" alt="filego svg logo" /></a>
</h1>

<h3 align="center">Filego - A decentralized cloud storage platform.</h3>

Filego 是一个使用 [IPFS](https://ipfs.io), [Authing](https://authing.cn) 和 [Solid](https://solid.inrupt.com) 技术开发的在线网盘。

IPFS 是一个分布式、点对点的文件传输协议（在 Filego 中作为文件传输的基础设施），Authing 是一个身份认证云，Solid 是万维网之父启动的去中心化社交网络项目（在 Filego 中作为计算平台）。

用户将使用 Authing 登录 Filego，同时会拥有 Web ID（在 Solid 网络中的唯一凭证），用户上传文件后获取的 Hash 值将加密存储在 RDF（Solid 的数据存储规范） 中。RDF 是一个语义计算框架，他将数据以三元组的形式存储在 XML 中，方便将所有数据组成一个巨大的知识图谱。

用户上传文件后，Filego 可以根据用户上传的文件名和文件内容自动将文件保存到属于同一个类别的目录下。

## Filego 想解决的核心问题

1. 现在很多去中心化的软件不兼容 HTTP 协议，需要下载浏览器或其他插件，这点对普通用户很不友好，Filego 从一开始就运行在 HTTP 协议上；
2. 人们需要更好用的网盘工具，不仅要快、大，还要能自动分类你的文件，这样人们就不需要浪费大量时间在整理文件上；
3. 私人文件，尤其是图片，一定是大于人们在社交网络上分享的文件，手机和电脑的硬盘终究是有限的，而 Filego 理论上能构建一个无限大的存储空间；
4. Solid 以及 IPFS 的大众化问题和生态问题，亟待解决。

## Value

做技术驱动的大众产品。
