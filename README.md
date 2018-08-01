# Filego - A decentralized storage platform

* ``Version: 1.0``
* ``Author: Eximua Labs``
* ``Email: xieyang@dodora.cn``
* ``Date: July 22, 2018``

## 摘要

Filego 是一个去中心化云存储平台，我们通过 IPFS 技术连接世界范围内的空闲存储设备，同时利用区块链为设备提供方（以下简称矿工）、用户和开发者提供经济价值。

使用 Filego 能使存储系统在没有中介的情况下运行。与传统云存储厂商相比，我们通过智能合约保障存储交易，提供稳定、安全且便宜的硬盘空间租赁方案，保证每一个人都能买得起。并且，没有任何一方能审查 Filego 上的内容，Filego 将真正做到**自己的数据归自己**。

无论是个人还是企业，都可以以矿工或用户的身份加入 Filego 的生态圈，生态圈内的所有交易都使用 FiCoin（Filego的数字货币，简称 FIC）。

Filego 是由 ``File`` 和 ``Ego`` 两个单词组成的合成词，``Ego`` 的中文翻译是 ``自我意识``，我们的目标是让存储在 Filego 之上的文件拥有充分的 ``自我意识``，从而确保文件的自主权。

长期目标是希望能够成为下一代互联网存储的基础设施。

## 项目背景

传统云存储厂商（七牛云、百度云盘等）都是大型第三方机构，这种系统易受各种安全威胁，如中间人攻击、应用程序漏洞等。此外，由于托管在第三方服务器上，一旦受到攻击，容易暴露消费者隐私和企业私密数据。而且，大多存储服务依赖于相同的基础设施，一旦发生故障，往往波及范围广。另外一个潜在的威胁是监管，第三方服务往往会在上传时审查你的内容并过滤掉一些他们认为的“非法内容”，从而对用户、企业和社会的权益造成侵犯。

与之相比，去中心化存储平台则具有很大优势。首先，数据安全使用客户端加密来保证，数据完整性使用可检索证明来维护。同时，P2P（Peer-to-Peer）的冗余存储特性，可以大大降低基础设施故障带来的文件丢失问题。去中心化存储平台是每个人都可以参与的自由存储市场，也将降低普通用户的存储成本。使用IPFS的版本控制系统（Version Control），可以记录文件的每一个版本，并且可让多节点使用保存不同版本的文件。

本文详述了包含去中心化存储和加密货币一套系统的实现方案。

## 基本架构

Filego 包含三方面的基础架构，分别是矿机服务（服务矿工和开发者）、客户端（服务普通用户和开发者）以及加密货币（FiCoin）。

### 矿机服务

矿机服务主要给矿工和开发者使用，目标是零成本启动成为 Filego 网络中的一个节点，并能为用户提供租赁服务。

此外，为开发者提供服务的相关软件开发包（SDK, Software Development Kit）也包含在这其中。

FiCoin 的部分组件也会在服务端中有所体现，如``文件可检索证明``、``网络稳定性证明``等。

### 客户端

客户端主要给普通用户和开发者使用，主要目标是使用户能方便的管理自己的文件，包括但不限于存储、上传、下载和分享。次要目标是使开发者能利用应用程序编程接口（API, Application Programming Interface）方便的集成自己的服务。

FiCoin 的部分组件也会在客户端中有所体现，如``区块浏览器``等，在下文皆有介绍。

### FiCoin 加密货币

FiCoin 加密货币将作为 Filego 网络内的交易货币。矿工提供设备并被系统证明可用后将会获得相应的 FiCoin 作为奖励；用户可使用法币或 FiCoin 来支付在去中心化网络中储存加密文件的费用，若支付法币则兑换成当前 FiCoin 的价格，然后系统再使用 FiCoin 执行交易，交易完成后 FiCoin 将选择网络最稳定的一个矿工进行记账，并让前 101 个矿工进行记账确认。为了避免存储能力过于中心化的问题，这 101 个矿工是根据矿工存储容量的大小按比例计算而选择的，不是每次都是前 101 位。这意味着，即使你只存储了 10MB 的文件但是存储可用性达到100%，也能进入这 101 个确认节点。

FiCoin 的简称是 FIC。

### 为什么 Filego 需要加密货币

为什么需要加密货币则需要从“加密货币”的本质说起。ICO（首次代币发行）这种创新的方式，让每一家中小企业或个人都拥有了在市场上募集资本的权利，这种权利不再归属于已经成熟并且拥有稳定现金流的公司。通过加密货币这种成本稍低的方式，可以很快的帮助一个初创项目获得起始资本从而快速推动产品发展，这种方式比现今流行的种子轮、天使轮、A轮更加有效。但是，我们应该避免市面上的空气币。如果你是因为加密货币背后的产品、技术、团队和愿景而投资，那么你就不是被割的韭菜或投机者，而是真正的**价值投资者**。

小米上市时，圈内人盛传“小米的股票值得长期持有”。那么 Filego 也希望某一天圈内的人也能说“ FiCoin 值得长期持有”，此时，对Filego 、矿工和用户是一个三方共赢的局面。

在文件共享系统中，一些自私的节点只获取资源而不贡献资源或服务。节点为了达到自身利益最大化，会全力索取资源和服务，同时尽量减少资源的贡献。如果节点完全凭借自身意愿决定是否进行资源共享，会导致搭便车、公共悲剧等一系列问题。为此需要一种奖惩机制。

这就是 Filego 需要加密货币的原因。

## 应用层设计

Filego 是一个基于 IPFS 构建的分布式去中心化存储网络，其主要用来传输数据、验证身份和文件完整性、履行智能合约。每一个节点都是匿名自治的，利用这个特性，用户可以不经过第三方平台实现文件管理。以下内容描述了实现这么一个网络所涉及到的工具和组件。

IPFS是一个分布式文件系统，它综合了以前的对等系统的成功想法，包括DHT，BitTorrent，Git和SFS。 IPFS的贡献是简化，发展和将成熟的技术连接成一个单一的内聚系统，大于其部分的总和。 IPFS提供了编写和部署应用程序的新平台，以及一个新的分发系统版本化大数据。 IPFS甚至可以演进网络本身。

Filego 要求一旦完成合约，矿工每隔一段时间需要提供一份“存储证明”以证明用户的数据还在他们的设备中。

### Filego Hub

Filego Hub 可以直达 Filego 生态内的所有产品，其中包括：云盘客户端、钱包客户端、区块浏览器和监控浏览器。

### 身份认证

在 Filego 生态内有两种用户身份：矿工和用户（开发者也算用户），一个账户可以同时成为两种身份。用户在 Filego Hub 完成注册后，可以进行文件的管理、上传、下载、移动、分享等操作。矿工通过启动 Filego Hub 可以管理自己的节点、钱包、查看区块和全网节点运行状态，这些信息都是公开的。

用户注册完成后，会取得自己的私钥和公钥，其中公钥是用户的 FiCoin 钱包地址，私钥需要用户保存在安全的地方，Filego 不会存储。注册成为 Filego 的用户是中心化的管理方式，这是为了提升身份认证的效率、速度和安全性，Filego 除了保存用户的基本账户信息外不会保存其它任何信息。Filego 结合 HTTPS, JWT, MD5, 非对称加密和 Salt 等多种方式保证用户的信息安全，并对服务器读写权限严格控制。

### 云盘客户端

云盘客户端是为普通用户开发的类百度云盘客户端，在此客户端内，用户可以安全的连接到 P2P 网络中，并将自己的文件托管给网络最稳定、价格最合适的节点，用户可以自由选择。

用户上传的文件默认是不对外公开的，如想公开，则可以选择共享文件。共享文件后会生成一个唯一的文件 URL，然后可以将此 URL 发给其他人。

在客户端内还可以查看文件版本，在 Filego 网络内用户可跟踪所有文件的修改／删除记录。

### 钱包客户端

钱包客户端可以浏览自己的交易记录、余额，也可以进行转账和利用二维码收取 FIC。

### 区块浏览器

区块浏览器可以查看最新的区块、交易记录、FIC 与人民币、比特币的汇率以及所有在线的P2P节点。

### 监控浏览器

监控浏览器可以监控所有在线节点、网络状况、每个节点存储的文件大小以及节点评分。

### 开发者 SDK

开发者 SDK 是保证开发者可快速将 Filego 集成到自己产品的工具。使用开发者 SDK，可实现高可用、易拓展、低成本、一站式的对象存储和融合优质节点和可监控的CDN服务。

除了集成基础应用到开发者的应用之外，Filego 的 SDK 也允许开发者就地启动一个 Filego 节点，该节点能够立即加入 Filego 网络并成为矿工。

### 数据安全

用户上传文件后会返回一串 HASH 值，该 HASH 值经过二次加密，只能由用户本身看到，不会公布到全网。若想公布到全网，需要用户选择共享文件。

## FiCoin 加密货币

FiCoin 是流通在 Filego 生态圈内的加密数字货币，FiCoin 使用 M-of-N 多重签名方法来减少类比特币数字货币的复杂性。FiCoin 的智能合约包含两个概念：1、基础智能合约；2、可用性证明。智能合约声明了是哪个矿机存储了文件、文件的大小以及文件 hash 值。可用性证明用来验证矿机的带宽稳定性和存储可用性（证明文件还存在矿机上）。

FiCoin 像其他加密货币一样包含了自下而上的五个层次模型：数据层、网络层、共识层、激励层和应用层。

### 交易（数据层）

一次交易包含以下字段：

| 字段名称 | 字段描述 |
| ------ | ------ |
| Version | 协议版本号 |
| Arbitrary Data  | 任意数据，如描述元数据或其它数据 |
| Miner Fee | 给矿工的奖励 |
| Input | 收入 |
| Outputs | 支出（可选） |
| File Contract | 文件存储合约（可选） |
| Storge Proof | 存储可用性合约（可选） |
| Signatures | 非对称加密私钥生成的签名 |

### P2P 网络

Filego 运行在去中心化的P2P网络上，意味着 Filego 具有自动组网功能。这组网络主要用来数据传播和数据验证。

### 挖矿过程

FiCoin 区块的生成过程不受限制，每当用户发起“上传”和“下载”请求时，都会生成一个新的节点。主链每添加一个节点，都会向全网进行广播，使得每台参与 FiCoin 交易的计算机都有一份拷贝，以高度冗余的交易信息存储，使信息遗失、篡改的可能性变得微乎其微。

举个例子，当用户想要“上传”一个文件时，相当于发起了一个新的``交易请求``，此时信息被广播到 P2P 网络中。每个人对交易的有效性进行验证后才能根据这条交易记录生成新区块。为了避免虚假交易或重复交易，使这一区块被信任，需要对交易信息进行签名认证。认证之后需要决定由谁来记账，记账者的选择会影响到整个系统的安全性和可靠性。为了解决比特币挖矿过于浪费资源的问题，FiCoin 使用 ``Proof of Storage``，简称 ``PoST``（和PoS区分）。

在选择完记账者后，FiCoin 将会把一部分代币分发给记账者，同时也会惩罚不遵守规则的节点。

### Proof of Storage（共识算法）

Proof of Storage（PoST） 可以理解成存储可用性证明机制。所谓存储可用性证明机制，是指矿工存储用户文件的文件后，会在交易中记录这个文件的hash值，节点之间会定时要求矿工传输某条交易记录上存在的文件，节点收到文件后会计算其hash值与交易记录中的对比。

#### 具体算法

矿工通过提供原始文件的一部分和该部分的hash值。这个信息足以证明文件仍在矿工的设备上，因为该hash已经提交到区块链，每个人都可以验证这个hash的合法性。每一次验证存储时都会使用一个随机的文件部分，

如果矿工能够持续提供一个随机的文件部分，那么他们就有很大的可能性拥有所有文件。如果一个矿工仅仅存储了一个文件 的 50%，那么在进行共识算法的时候他就不能保证可用性达到 50% 以上。

#### 防攻击机制

如果一个攻击者能够掌握全网 50% 的计算量，那么 50% 的区块就能被控制住。但是，剩下的50%还是自由的，所以攻击者在某些存储证明上还是会被认定为失败，最终攻击者还是会有一半的可用性是失败的。

为了防御此类攻击，节点之间可以加大进行存储验证的频率，用户一旦丢失了文件，矿工须向用户支付高额的赔偿费，一般为丢失文件大小的4倍个 FiCoin。

### 激励办法

Filego 在一个去中心化网络上运行云存储。矿工可以使用上文提到的 ``Arbitrary Data`` 字段在全网广播他们在网络中的身份，普通用户可以通过此字段了解矿工的身份。了解身份之后，用户可以选择与他们信任的矿工进行交易。

#### 矿工利益

一份智能合约的签订需要矿工和用户双方共同同意。

合约条款给了矿工一定程度的自由性，他们可以提供低价格的存储价格和较低额度的文件丢失赔付价格；也可以提供高价格的存储和较高的赔付，市场大到一定程度时会释放存储潜力。

矿工的设备比较一旦受到攻击，可能会影响存储可用性证明机制，因此矿工有责任预防此类攻击。

#### 用户利益

用户上传的每一个文件都会被分成 n 份分发加密存储到 m 台设备上（n 和 m 由文件大小和全网主机状态决定）。这给予了文件相当大的可用性。如果用户需要下载的一个文件被分成了 10 份，那么系统会选择最稳定且离用户最近的 10 台设备下载该文件。同时，下载是多线程的，可以增大带宽。

### FiCoin 创始团队激励

FiCoin 有一个基金账户 ``FiFunds``，用来存放给予创始团队的数字货币。生成一个区块并达成合约时，将会有 0.001% 的交易额被划分给 ``FiFunds`` 基金。FiCoin创始团队（以第一版的所有开发者为界限）占有 ``FiFunds`` 100% 的权益。

``FiFunds`` 中的货币只能与其它账户进行交易，不能用来挖矿或者签订合约。

### FiCoin 发行量

FiCoin 的发行量是无上限的。

### 完整的 Filego 运行流程图

![flowchart](https://usercontents.authing.cn/filego/cdn/flowchart/v1/filego-flowchart.jpg)

## 总结

Filego 是一个使用区块链和 IPFS 搭建而成的去中心化文件存储网络，在矿工接受了合约后必须不间断的向网络内所有节点发送存储可用性证明（Proofs of Storage, PoST），而用户需要为上传／下载和存储时使用的带宽和硬盘支付FiCoin，其中的 0.001% 会划分给 FiFunds基金，剩下的划分给存储矿工和记账矿工。

得益于 IPFS 的出色工作，使 Filego 网络内的文件永不丢失，永远在线。

我们相信 Filego 能成为互联网去中心化存储的基础设施，也相信我们能带领 Web 走向永恒。