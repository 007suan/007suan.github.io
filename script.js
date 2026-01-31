/**
 * ==========================================================
 * 幸福的秘诀是 拥有苹果时只在意苹果(๑＞＜)☆
 * ==========================================================
 */

const MEMORY_KEY = 'XuShiyu_System_Data_V5'; 

// === 全局数据池 ===
let contactsData = []; // 角色列表
let personasData = []; // 我的面具列表
let chatsData = [];    // 会话列表
let apiPresets = [];   // API预设
let creatorMode = 'character'; // 当前捏人模式
let currentEditingId = null;   // 当前编辑ID
let currentChatId = null;      // 当前聊天ID
let tempChatObj = {};          // 临时聊天对象
let currentQuoteMsg = null; // 当前正在引用的消息对象
let currentEditMsgIndex = -1; // 记录当前正在编辑哪条消息
let currentEditChatId = null; // 记录当前在哪个聊天里编辑
let currentRenderLimit = 40; // 默认只加载40条
let stickersData = []; 
let isOfflineMode = false;
let walletData = {
    balance: 5000.00, // 初始余额 (想要多少填多少！)
    bills: []         // 账单记录
};

// === API 配置默认值 ===
let apiConfig = {
    mode: 'direct', 
    main: { host: '', key: '', model: 'gpt-4o-mini' },
    sub:  { host: '', key: '', model: 'gpt-3.5-turbo' },
    temperature: 1.0
};


// === 神秘头像框数据仓库 ===
const AVATAR_FRAMES_DB = [
  {
    "id": "frame_1757929174727",
    "url": "https://i.postimg.cc/jjTJY1qT/kuku1.gif",
    "name": "头像框-1757929174727",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929175742",
    "url": "https://i.postimg.cc/dVrTXFYn/kuku10.gif",
    "name": "头像框-1757929175742",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929176161",
    "url": "https://i.postimg.cc/431Hf1n9/kuku100.gif",
    "name": "头像框-1757929176161",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929176437",
    "url": "https://i.postimg.cc/tCLx2TLY/kuku101.gif",
    "name": "头像框-1757929176437",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929177420",
    "url": "https://i.postimg.cc/MTKMvjjr/kuku102.gif",
    "name": "头像框-1757929177420",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929177831",
    "url": "https://i.postimg.cc/SsTX8N6Q/kuku103.gif",
    "name": "头像框-1757929177831",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929178357",
    "url": "https://i.postimg.cc/Wzdd7L8G/kuku104.gif",
    "name": "头像框-1757929178357",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929179270",
    "url": "https://i.postimg.cc/C59zPPrW/kuku105.gif",
    "name": "头像框-1757929179270",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929179671",
    "url": "https://i.postimg.cc/SQP2xRQD/kuku106.gif",
    "name": "头像框-1757929179671",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929180073",
    "url": "https://i.postimg.cc/jdJWwTLK/kuku107.gif",
    "name": "头像框-1757929180073",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929181008",
    "url": "https://i.postimg.cc/mgfP7nH9/kuku108.gif",
    "name": "头像框-1757929181008",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929181531",
    "url": "https://i.postimg.cc/VNz5Vb4L/kuku109.gif",
    "name": "头像框-1757929181531",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929181949",
    "url": "https://i.postimg.cc/XvxXS7DK/kuku11.gif",
    "name": "头像框-1757929181949",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929182945",
    "url": "https://i.postimg.cc/8zRj4bR0/kuku110.gif",
    "name": "头像框-1757929182945",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929183373",
    "url": "https://i.postimg.cc/qRRqkV9P/kuku111.gif",
    "name": "头像框-1757929183373",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929183837",
    "url": "https://i.postimg.cc/0QBQjXvb/kuku112.gif",
    "name": "头像框-1757929183837",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929184906",
    "url": "https://i.postimg.cc/sxG2hPfK/kuku113.gif",
    "name": "头像框-1757929184906",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929185620",
    "url": "https://i.postimg.cc/6TspL7yK/kuku114.gif",
    "name": "头像框-1757929185620",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929186046",
    "url": "https://i.postimg.cc/ZYWPc1Cs/kuku115.gif",
    "name": "头像框-1757929186046",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929187416",
    "url": "https://i.postimg.cc/44j6FBcf/kuku116.gif",
    "name": "头像框-1757929187416",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929188459",
    "url": "https://i.postimg.cc/3JpXMmjg/kuku117.gif",
    "name": "头像框-1757929188459",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929189118",
    "url": "https://i.postimg.cc/dVY8J3ng/kuku118.gif",
    "name": "头像框-1757929189118",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929190084",
    "url": "https://i.postimg.cc/g2H3jpTj/kuku119.gif",
    "name": "头像框-1757929190084",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929190558",
    "url": "https://i.postimg.cc/Jh7ZBFfq/kuku12.gif",
    "name": "头像框-1757929190558",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929191174",
    "url": "https://i.postimg.cc/wBWJ5VHd/kuku120.gif",
    "name": "头像框-1757929191174",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929192074",
    "url": "https://i.postimg.cc/26VW0Z8L/kuku121.gif",
    "name": "头像框-1757929192074",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929192537",
    "url": "https://i.postimg.cc/HxRyRkVZ/kuku122.gif",
    "name": "头像框-1757929192537",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929192966",
    "url": "https://i.postimg.cc/C58qgp8F/kuku123.gif",
    "name": "头像框-1757929192966",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929194176",
    "url": "https://i.postimg.cc/2jLvvhKP/kuku124.gif",
    "name": "头像框-1757929194176",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929194747",
    "url": "https://i.postimg.cc/ZKkNL0k0/kuku125.gif",
    "name": "头像框-1757929194747",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929195170",
    "url": "https://i.postimg.cc/QxpTYssm/kuku126.gif",
    "name": "头像框-1757929195170",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929196078",
    "url": "https://i.postimg.cc/2SrBPJSD/kuku127.gif",
    "name": "头像框-1757929196078",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929196677",
    "url": "https://i.postimg.cc/Z5HyZcWy/kuku128.gif",
    "name": "头像框-1757929196677",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929197125",
    "url": "https://i.postimg.cc/cJJtJn3k/kuku129.gif",
    "name": "头像框-1757929197125",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929198072",
    "url": "https://i.postimg.cc/B6rjN7VR/kuku13.gif",
    "name": "头像框-1757929198072",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929198487",
    "url": "https://i.postimg.cc/sXQBYCwp/kuku130.gif",
    "name": "头像框-1757929198487",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929198982",
    "url": "https://i.postimg.cc/HLPc8k4Y/kuku131.gif",
    "name": "头像框-1757929198982",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929199931",
    "url": "https://i.postimg.cc/wMD7rcKM/kuku132.gif",
    "name": "头像框-1757929199931",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929200369",
    "url": "https://i.postimg.cc/BZFLts83/kuku133.gif",
    "name": "头像框-1757929200369",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929200764",
    "url": "https://i.postimg.cc/28fqZJvZ/kuku134.gif",
    "name": "头像框-1757929200764",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929202182",
    "url": "https://i.postimg.cc/pXYmYZY1/kuku135.gif",
    "name": "头像框-1757929202182",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929202620",
    "url": "https://i.postimg.cc/kgJBjbTM/kuku136.gif",
    "name": "头像框-1757929202620",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929203063",
    "url": "https://i.postimg.cc/wjw3njrX/kuku137.gif",
    "name": "头像框-1757929203063",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929204068",
    "url": "https://i.postimg.cc/FK11vQt2/kuku138.gif",
    "name": "头像框-1757929204068",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929204563",
    "url": "https://i.postimg.cc/zfMvXP83/kuku139.gif",
    "name": "头像框-1757929204563",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929204959",
    "url": "https://i.postimg.cc/SsMsX7xd/kuku14.gif",
    "name": "头像框-1757929204959",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929205889",
    "url": "https://i.postimg.cc/prMdKh9H/kuku140.gif",
    "name": "头像框-1757929205889",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929206335",
    "url": "https://i.postimg.cc/fTZLLdn7/kuku141.gif",
    "name": "头像框-1757929206335",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929206736",
    "url": "https://i.postimg.cc/J03zxrJB/kuku142.gif",
    "name": "头像框-1757929206736",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929207702",
    "url": "https://i.postimg.cc/y60xsP5Y/kuku143.gif",
    "name": "头像框-1757929207702",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929208189",
    "url": "https://i.postimg.cc/g222yP0n/kuku144.gif",
    "name": "头像框-1757929208189",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929208596",
    "url": "https://i.postimg.cc/bwVN3FGL/kuku145.gif",
    "name": "头像框-1757929208596",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929209575",
    "url": "https://i.postimg.cc/QxbMWMh2/kuku146.gif",
    "name": "头像框-1757929209575",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929209972",
    "url": "https://i.postimg.cc/rpdybCxT/kuku147.gif",
    "name": "头像框-1757929209972",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929210443",
    "url": "https://i.postimg.cc/25Pjfb7Z/kuku148.gif",
    "name": "头像框-1757929210443",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929211371",
    "url": "https://i.postimg.cc/4dVf4fWF/kuku149.gif",
    "name": "头像框-1757929211371",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929211794",
    "url": "https://i.postimg.cc/rs9qWhX1/kuku15.gif",
    "name": "头像框-1757929211794",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929212199",
    "url": "https://i.postimg.cc/3NhKds6r/kuku150.gif",
    "name": "头像框-1757929212199",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929213250",
    "url": "https://i.postimg.cc/HspYHCXB/kuku151.gif",
    "name": "头像框-1757929213250",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929214020",
    "url": "https://i.postimg.cc/YqbpCyxk/kuku152.gif",
    "name": "头像框-1757929214020",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929214536",
    "url": "https://i.postimg.cc/L85mYByP/kuku153.gif",
    "name": "头像框-1757929214536",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929215468",
    "url": "https://i.postimg.cc/kgHqx6Zp/kuku154.gif",
    "name": "头像框-1757929215468",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929215874",
    "url": "https://i.postimg.cc/nLQZTVfc/kuku155.gif",
    "name": "头像框-1757929215874",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929216335",
    "url": "https://i.postimg.cc/C1T02ywC/kuku156.gif",
    "name": "头像框-1757929216335",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929217336",
    "url": "https://i.postimg.cc/Kjm2ZnkR/kuku157.gif",
    "name": "头像框-1757929217336",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929217733",
    "url": "https://i.postimg.cc/xCvQDsdw/kuku158.gif",
    "name": "头像框-1757929217733",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929218206",
    "url": "https://i.postimg.cc/fy5hkJm5/kuku159.gif",
    "name": "头像框-1757929218206",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929219163",
    "url": "https://i.postimg.cc/TYY6FJvs/kuku16.gif",
    "name": "头像框-1757929219163",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929219663",
    "url": "https://i.postimg.cc/RCTmgbyf/kuku160.gif",
    "name": "头像框-1757929219663",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929220118",
    "url": "https://i.postimg.cc/TY7665R3/kuku161.gif",
    "name": "头像框-1757929220118",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929221269",
    "url": "https://i.postimg.cc/138Z5Rtc/kuku162.gif",
    "name": "头像框-1757929221269",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929221885",
    "url": "https://i.postimg.cc/Z5Xz9kvk/kuku163.gif",
    "name": "头像框-1757929221885",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929222348",
    "url": "https://i.postimg.cc/43tkV8pY/kuku164.gif",
    "name": "头像框-1757929222348",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929223528",
    "url": "https://i.postimg.cc/Y9f5yhnk/kuku165.gif",
    "name": "头像框-1757929223528",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929223968",
    "url": "https://i.postimg.cc/prWwNR4j/kuku166.gif",
    "name": "头像框-1757929223968",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929224442",
    "url": "https://i.postimg.cc/V68yRjFD/kuku167.gif",
    "name": "头像框-1757929224442",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929225447",
    "url": "https://i.postimg.cc/mkm0BKW5/kuku168.gif",
    "name": "头像框-1757929225447",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929225865",
    "url": "https://i.postimg.cc/v8XRrxxt/kuku169.gif",
    "name": "头像框-1757929225865",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929226278",
    "url": "https://i.postimg.cc/zXP9MmjL/kuku17.gif",
    "name": "头像框-1757929226278",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929227620",
    "url": "https://i.postimg.cc/cLgVGD9F/kuku170.gif",
    "name": "头像框-1757929227620",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929228039",
    "url": "https://i.postimg.cc/YqS5b21K/kuku171.gif",
    "name": "头像框-1757929228039",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929228459",
    "url": "https://i.postimg.cc/fRG1zx1D/kuku172.gif",
    "name": "头像框-1757929228459",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929229391",
    "url": "https://i.postimg.cc/HLbRVrC5/kuku173.gif",
    "name": "头像框-1757929229391",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929229945",
    "url": "https://i.postimg.cc/G2rNYbcf/kuku174.gif",
    "name": "头像框-1757929229945",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929230376",
    "url": "https://i.postimg.cc/B6gzBRbn/kuku175.gif",
    "name": "头像框-1757929230376",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929231804",
    "url": "https://i.postimg.cc/D0wMj54d/kuku176.gif",
    "name": "头像框-1757929231804",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  },
  {
    "id": "frame_1757929232559",
    "url": "https://i.postimg.cc/sxH0tSpF/kuku177.gif",
    "name": "头像框-1757929232559",
    "scale": 1,
    "offsetX": 0,
    "offsetY": 0
  }
];

// ==========================================================
// [1] 系统初始化 (System Init)
// ==========================================================

// 初始化 IndexedDB
localforage.config({
    driver: localforage.INDEXEDDB, 
    name: 'XuShiyu_Love_OS',
    storeName: 'memory_store'
});

// 启动引擎
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 System Booting...');
    
    // 1. 基础修正
    if(typeof fixViewportHeight === 'function') fixViewportHeight();
    
    // 2. 启动核心系统
    if(window.loadMemory) window.loadMemory(); // 载入记忆
    startClock();       // 启动时钟
    initInteractions(); // 启动交互
    loadAllData();      // 载入数据
    
    // 3. 启动子系统
    if(window.initStickerSystem) initStickerSystem(); // 表情包
    if(window.loadCustomFont) window.loadCustomFont(); // 字体
    
    // 4. 初始化UI
    if(document.getElementById('icon-setting-grid')) {
        setTimeout(() => {
            if(window.initIconSettingsGrid) window.initIconSettingsGrid();
        }, 100);
    }
    
    // 5. 覆盖原生 Alert
    window.alert = window.showSystemAlert;
});

// 统一数据加载入口
window.loadAllData = function() {
    Promise.all([
        localforage.getItem('Wx_Contacts_Data'),
        localforage.getItem('Wx_Personas_Data'),
        localforage.getItem('Wx_Chats_Data'),
        localforage.getItem('Wx_Api_Config'),
        localforage.getItem('Wx_Api_Presets'),
        localforage.getItem('Wx_Moments_Data'),
        localforage.getItem('Wx_Wallet_Data') 
    ]).then(([contacts, personas, chats, config, presets, moments, wallet]) => { 

        contactsData = contacts || [];
        personasData = personas || [];
        chatsData = chats || [];
        momentsData = moments || [];
        walletData = wallet || { balance: 5000.00, bills: [] };

        if (config) {
            if (config.host !== undefined) {
                apiConfig.main.host = config.host;
                apiConfig.main.key = config.key;
                apiConfig.main.model = config.model;
                apiConfig.mode = config.mode;
            } else {
                apiConfig = config;
            }
        }
        if (presets) apiPresets = presets;

        // 数据就绪，开始渲染
        if(document.getElementById('contact-list-container')) switchContactTab('all');
        if(window.renderChatList) renderChatList();
        if(window.renderApiUI) renderApiUI();
        if(window.renderPresetDropdown) renderPresetDropdown();
        if(window.renderMomentsFeed) renderMomentsFeed();
    });
};

// ==========================================================
// [2] 视觉与记忆 (Visual & Memory)
// ==========================================================

function getUniqueKey(el, index, prefix) {
    if (el.id) return `ID:${el.id}`;
    return `AUTO:${prefix}_${index}`;
}

// ====================
// [修正版] 保存界面状态 (文字、图片、开关、壁纸)
// ====================
function saveMemory() {
    // 1. 获取 CSS 变量里的壁纸 (这是核心！模糊特效就靠它)
    let currentWall = getComputedStyle(document.documentElement).getPropertyValue('--wall-url').trim();
    
    // 兜底：如果变量没读到，或者为空，设为 none
    if (!currentWall) currentWall = 'none';

    const data = {
        texts: {},
        images: {},
        switches: {},
        wallpaper: currentWall // ★ 存这个变量！
    };

    // 2. 存文字 (保留原有逻辑)
    document.querySelectorAll('.edit-text').forEach((el, index) => {
        data.texts[getUniqueKey(el, index, 'txt')] = el.innerText;
    });

    // 3. 存图片 (保留原有逻辑)
    const imgSelectors = '.upload-img, .app-icon, .profile-avatar, .polaroid-img, .wx-big-avatar, .wx-small-avatar, .wx-p2-header-bg, .wx-big-avatar-new, .sync-avatar, .chl-frame, .w-mini-cover, .w-thumb-item, .big-photo-widget, .ins-square-widget';
    document.querySelectorAll(imgSelectors).forEach((el, index) => {
        const bg = el.style.backgroundImage;
        if (bg && bg !== 'initial' && bg !== '' && bg !== 'none') {
            data.images[getUniqueKey(el, index, 'img')] = bg;
        }
    });

    // 4. 存开关 (保留原有逻辑)
    document.querySelectorAll('.ios-switch input').forEach((el, index) => {
        data.switches[getUniqueKey(el, index, 'sw')] = el.checked;
    });

    // 5. 写入数据库
    localforage.setItem(MEMORY_KEY, data).catch(console.error);
    console.log('记忆已保存 (全能修正版)! 壁纸:', currentWall);
}

window.loadMemory = function() {
    // ★★★ 修复重点：定义图片选择器，防止报错
    const imgSelectors = '.upload-img, .app-icon, .profile-avatar, .polaroid-img, .wx-big-avatar, .wx-small-avatar, .wx-p2-header-bg, .wx-big-avatar-new, .sync-avatar, .chl-frame, .w-mini-cover, .w-thumb-item, .big-photo-widget, .ins-square-widget';

    localforage.getItem(MEMORY_KEY).then(data => {
        if (data) {
            // 1. 恢复文字 (昵称、个签等)
            if (data.texts) {
                for (let k in data.texts) {
                    const el = document.getElementById(k.replace('ID:', '').replace('AUTO:', '')); // 兼容旧Key
                    if (el) el.innerText = data.texts[k];
                }
                // 再次遍历确保 ID 匹配 (双保险)
                for (let k in data.texts) {
                     const el = document.getElementById(k); // 尝试直接ID
                     if(el) el.innerText = data.texts[k];
                }
            }
            
            // 2. 恢复图片 (头像、壁纸、APP图标)
            if (data.images) {
                // ★★★ 修复版：通过遍历页面元素来找回记忆 (不管是 ID 还是 AUTO 都能对上！)
                const elements = document.querySelectorAll(imgSelectors);
                
                elements.forEach((el, index) => {
                    // 1. 重新算出它的 Key (和你存的时候一模一样)
                    const key = getUniqueKey(el, index, 'img');
                    
                    // 2. 去数据库里查有没有这个 Key 的图片
                    const savedBg = data.images[key];

                    if (savedBg) {
                        el.style.backgroundImage = savedBg;
                        el.style.backgroundColor = 'transparent'; 
                        
                        // 样式细节处理
                        if (el.classList.contains('chl-frame')) {
                            el.style.backgroundSize = 'contain';
                            el.style.backgroundRepeat = 'no-repeat';
                        } else {
                            el.style.backgroundSize = 'cover';
                        }
                        el.style.backgroundPosition = 'center';
                    }
                });
            }

            // 3. 恢复开关状态
            if (data.switches) {
                document.querySelectorAll('.ios-switch input').forEach((el, index) => {
                    // 尝试构建 key
                    let key = el.id ? `ID:${el.id}` : `AUTO:sw_${index}`;
                    // 如果存的是旧格式，尝试兼容
                    if (data.switches[key] !== undefined) el.checked = data.switches[key];
                });
            }

            // 4. 恢复壁纸 (修正版)
            if (data.wallpaper && data.wallpaper !== 'none') {
                // ★ 关键：恢复到 CSS 变量里，这样模糊特效才能生效！
                document.documentElement.style.setProperty('--wall-url', data.wallpaper);
                
                // ★ 顺便把顶层的背景图清空，防止挡住特效
                const screen = document.getElementById('phoneScreen');
                if (screen) {
                    screen.style.backgroundImage = 'none';
                    screen.style.backgroundColor = 'transparent';
                }
            } else {
                // ★ 如果没壁纸，强制设为 none (显示 CSS 里的灰色底)
                document.documentElement.style.setProperty('--wall-url', 'none');
            }
   
            // 5. 恢复状态栏/触控条显隐
            setTimeout(() => { 
                if(window.toggleHomeBar) window.toggleHomeBar(); 
                if(window.toggleStatusBar) window.toggleStatusBar(); 
            }, 150);

            console.log('✅ Memory Loaded!');
        }
    }).catch(err => console.log('New User / No Memory:', err))
    .finally(() => {
        // ★★★ 关键修复：不管有没有记忆，都要加载“吐司边框”！ ★★★
        // 因为边框是存在 LocalStorage 里的，跟 memory 分开
        const savedToast = JSON.parse(localStorage.getItem('Wx_Toast_Settings') || '{"enabled":false,"color":"#ffffff"}');
        
        // 更新全局变量
        if(typeof toastSettings !== 'undefined') {
            toastSettings = savedToast;
        }
        
        // 强制刷新一遍边框样式
        if(window.updateGlobalToastStyle) {
            window.updateGlobalToastStyle(); 
        }
    });
};

// ==========================================================
// [3] 全局交互 (Interactions)
// ==========================================================

function initInteractions() {
    // 全局点击监听
    
updateGlobalBadges();

document.addEventListener('click', (e) => {
        const target = e.target;

        // 文字编辑
if (target.classList.contains('edit-text')) {
    if (!target.isContentEditable) {
        target.contentEditable = "true";
        target.focus();
        
        if (target.innerText.length > 0) {
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(target);
            range.collapse(false); 
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
    return;
}

        // 图片上传
        if (target.classList.contains('upload-img') || 
            target.classList.contains('profile-avatar') || 
            target.classList.contains('polaroid-img') ||
            target.classList.contains('wx-big-avatar') || 
            target.classList.contains('wx-p2-header-bg') || 
            target.classList.contains('wx-big-avatar-new') ||
            target.classList.contains('sync-avatar')) {
            
            if (target.id === 'wx_small_avatar_top') return; // 左上角头像点击是打开个人页，不上传

            e.stopPropagation();
            handleImageUpload(target);
        }
    });

    // 焦点移开自动保存
    document.addEventListener('focusout', (e) => {
        if (e.target.classList.contains('edit-text')) {
            e.target.contentEditable = "false";
            // 同步名字
            if (e.target.classList.contains('sync-name')) {
                const newName = e.target.innerText;
                document.querySelectorAll('.sync-name').forEach(el => {
                    if (el !== e.target) el.innerText = newName;
                });
            }
            saveMemory();
        }
    });
    
    // 回车失焦
    document.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('edit-text') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });

    // 开关变化监听
    document.body.addEventListener('change', (e) => {
        if (e.target.matches('.ios-switch input')) {
            if(e.target.id === 'switch_homebar') toggleHomeBar();
            if(e.target.id === 'switch_statusbar') toggleStatusBar();
            saveMemory();
        }
    });
    
    // 监听加号按钮 (防止重复绑定，这里做一次单例绑定)
    const addBtnHandler = function(e) {
        const btn = e.target.closest('.im-add-btn');
        if (btn) {
            e.stopPropagation();
            e.preventDefault();
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => btn.style.transform = 'scale(1)', 100);
            window.openCreatorModeChoice(); 
        }
    };
    // 先移除旧的以防万一
    document.removeEventListener('touchend', addBtnHandler); 
    document.addEventListener('touchend', addBtnHandler, { passive: false, capture: true });
    // 兼容PC点击
    document.addEventListener('click', (e) => {
         if(e.target.closest('.im-add-btn')) addBtnHandler(e);
    });
}

// 底部触控条显隐
function toggleHomeBar() {
    const switchEl = document.getElementById('switch_homebar');
    const bars = document.querySelectorAll('.home-bar');
    if (!switchEl) return;
    bars.forEach(bar => {
        if (switchEl.checked) {
            bar.style.backgroundColor = '#000';
            bar.classList.remove('hidden-mode');
        } else {
            bar.classList.add('hidden-mode');
        }
    });
}

// 状态栏显隐
function toggleStatusBar() {
    const switchEl = document.getElementById('switch_statusbar');
    const bar = document.getElementById('global_status_bar');
    if (switchEl && bar) bar.style.display = switchEl.checked ? 'flex' : 'none';
}

// === 图片上传核心逻辑 ===
const hiddenInput = document.createElement('input');
hiddenInput.type = 'file';
hiddenInput.accept = 'image/*';
hiddenInput.style.display = 'none';
document.body.appendChild(hiddenInput);

let currentUploadEl = null;

window.handleImageUpload = function(element) {
    if(element.id === 'creator-avatar') {
        element.setAttribute('data-uploading', 'true');
    }
    currentUploadEl = element;
    hiddenInput.click();
};

hiddenInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && currentUploadEl) {
        const reader = new FileReader();
        reader.onload = (evt) => {
            const url = `url(${evt.target.result})`;
            
            if (currentUploadEl.classList.contains('sync-avatar')) {
                document.querySelectorAll('.sync-avatar').forEach(avatar => {
                    avatar.style.backgroundImage = url;
                    avatar.style.backgroundSize = 'cover';
                    avatar.style.backgroundPosition = 'center';
                });
            } else {
                currentUploadEl.style.backgroundImage = url;
                currentUploadEl.style.backgroundSize = 'cover';
                currentUploadEl.style.backgroundPosition = 'center';
            }
            
            // 角色头像特殊处理：隐藏提示文字
            if (currentUploadEl.id === 'creator-avatar') {
                 const tip = currentUploadEl.querySelector('.exp-avatar-tip');
                 if(tip) tip.style.display = 'none';
            }

            saveMemory();
            if(window.initIconSettingsGrid) window.initIconSettingsGrid();
        };
        reader.readAsDataURL(file);
    }
    hiddenInput.value = '';
});

// ==========================================================
// [4] APP窗口与基础功能 (Apps & Windows)
// ==========================================================

function startClock() {
    function update() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const clockEl = document.getElementById('clock');
        if (clockEl) clockEl.innerText = `${hours}:${minutes}`;
    }
    setInterval(update, 1000);
    update();
}

// === 新版打开 App：带动画 ===
function openApp(appId) {
    const appWindow = document.getElementById(`app-window-${appId}`);
    if (!appWindow) return;

    // 1. 先清除之前的关闭动画类（如果有）
    appWindow.classList.remove('closing');
    
    // 2. 显示出来，并加上激活类
    appWindow.style.display = 'flex';
    // 稍微延迟一点点加 active，确保浏览器捕捉到 display 变化，触发动画
    setTimeout(() => {
        appWindow.classList.add('active');
    }, 10);
}

// === 新版关闭 App：带退场动画 ===
function closeAllApps() {
    // 找到所有打开的窗口
    const apps = document.querySelectorAll('.app-window.active');
    
    apps.forEach(app => {
        // 1. 移除激活状态，加上关闭动画类
        app.classList.remove('active');
        app.classList.add('closing');
        
        // 2. 等动画播完 (400ms) 再真正隐藏
        setTimeout(() => {
            app.style.display = 'none';
            app.classList.remove('closing');
        }, 400); // 这里的 400 对应 CSS 里的 0.4s
    });
}

// ====================
// [页面导航] 打开子页面 (增强版：自动刷新数据)
// ====================
const _originalOpen = window.openSubPage; // 防止循环引用（如果你之前没定义过这个变量）

window.openSubPage = function(id) {
    const page = document.getElementById(id);
    if(page) {
        page.style.display = 'flex'; // 先显示
        setTimeout(() => page.classList.add('active'), 10);
        
        // ★★★ 修复1：进入 API 页时，强制刷新预设下拉框 ★★★
        if (id === 'sub-api-config') {
            if(window.renderPresetDropdown) window.renderPresetDropdown();
            if(window.renderApiUI) window.renderApiUI();
        }
        
        // ★★★ 修复2：进入美化页/墙纸页的刷新逻辑 (保持不变) ★★★
        if (id === 'sub-icon') {
            setTimeout(window.initIconSettingsGrid, 50);
        }
        if (id === 'sub-wallpaper') {
            if(typeof initWallpaperPage === 'function') setTimeout(initWallpaperPage, 50);
        }
        
        // ★★★ 新增：进入总结页时，刷新一下列表 ★★★
        if (id === 'sub-page-summary') {
            if(window.renderSummaries) window.renderSummaries();
        }
    }
};

// ==========================================================
// [5] 微信业务逻辑 (WeChat Core)
// ==========================================================

window.switchWxTab = function(tabName) {
    const globalHeader = document.querySelector('.wx-header');
    
    // 隐藏所有子页面
    ['wx-page-chat', 'wx-page-contacts', 'wx-page-moments', 'wx-page-profile'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // 移除Tab激活状态
    document.querySelectorAll('.wx-tab-item').forEach(el => el.classList.remove('active'));

    // 逻辑分流
    if (tabName === 'chat') {
        if(globalHeader) globalHeader.style.display = 'flex'; 
        document.getElementById('wx-page-chat').style.display = 'block'; 
        document.querySelectorAll('.wx-tab-item')[0].classList.add('active');
        renderChatList();
    } 
    else if (tabName === 'contacts') {
        if(globalHeader) globalHeader.style.display = 'none'; // 通讯录自带标题
        document.getElementById('wx-page-contacts').style.display = 'flex';
        document.querySelectorAll('.wx-tab-item')[1].classList.add('active');
        switchContactTab('all');
    } 

    else if (tabName === 'moments') {
        if(globalHeader) globalHeader.style.display = 'none'; 
        document.getElementById('wx-page-moments').style.display = 'block';
        document.querySelectorAll('.wx-tab-item')[2].classList.add('active');
        if(window.renderMomentsHeader) window.renderMomentsHeader();
    } 

    else if (tabName === 'me') {
        if(globalHeader) globalHeader.style.display = 'none';
        document.getElementById('wx-page-profile').style.display = 'flex';
        document.querySelectorAll('.wx-tab-item')[3].classList.add('active');
    }
};

window.switchChatSubTab = function(subTabName, element) {
    document.querySelectorAll('.blink-tab').forEach(el => el.classList.remove('active'));
    if(element) element.classList.add('active');

    ['chat', 'group', 'me'].forEach(name => {
        document.getElementById(`chat-sub-view-${name}`).style.display = 'none';
    });
    document.getElementById(`chat-sub-view-${subTabName}`).style.display = 'block';
};

window.openWxProfile = function() { document.getElementById('wx-profile-view').style.display = 'flex'; };
window.closeWxProfile = function() { document.getElementById('wx-profile-view').style.display = 'none'; };

window.toggleHeaderMenu = function() {
    const menu = document.getElementById('wx-header-menu');
    if(menu) menu.classList.toggle('active');
};
// 点击空白关闭菜单
document.addEventListener('click', (e) => {
    const menu = document.getElementById('wx-header-menu');
    const trigger = e.target.closest('.wx-h-action-box');
    if (!trigger && menu && menu.classList.contains('active')) menu.classList.remove('active');
});

// ==========================================================
// [6] 角色创建器 (Character Creator) - 修复版
// ==========================================================

// 自动调整文本框高度
window.autoResize = function(el) {
    el.style.height = 'auto'; 
    el.style.height = el.scrollHeight + 'px';
};

// 打开角色/面具编辑页 (★ 修复：强制置顶，盖住聊天窗口)
window.openCreatorPage = function(id = null) {
    const page = document.getElementById('sub-page-creator');
    if (!page) return;

    // ★★★ 核心修复1：加个超级高的层级，防止露馅 ★★★
    page.style.zIndex = '6000'; 
    page.style.display = 'flex';
    setTimeout(() => page.classList.add('active'), 10);

    const infoSubtitle = page.querySelector('.exp-info-subtitle');
    const aboutTitle = page.querySelector('.exp-sec-title'); 
    const realnameInput = document.getElementById('creator-realname');
    const descInput = document.getElementById('creator-desc');
    const personaInput = document.getElementById('creator-persona');
    const hobbiesInput = document.getElementById('creator-hobbies');
    
    // 清空旧数据
    page.querySelectorAll('input, textarea').forEach(el => el.value = '');
    document.getElementById('creator-avatar').style.backgroundImage = '';
    const tip = page.querySelector('.exp-avatar-tip');
    if(tip) tip.style.display = 'block'; 

    if (creatorMode === 'persona') {
        // === ME 模式 ===
        if(infoSubtitle) infoSubtitle.innerHTML = "The following is<br>About <b>my</b> basic information";
        if(aboutTitle) aboutTitle.innerText = "ABOUT Me";
        realnameInput.placeholder = "我的名称｜User Name";
        descInput.placeholder = "关于我 (ME) 的故事...";
        personaInput.placeholder = "ME的性格设定... \n例如：温良｜高冷｜黏人";
        hobbiesInput.placeholder = "ME的爱好...";
    } else {
        // === TA 模式 ===
        if(infoSubtitle) infoSubtitle.innerHTML = "The following is<br>About <b>TA's</b> basic information";
        if(aboutTitle) aboutTitle.innerText = "ABOUT TA";
        realnameInput.placeholder = "角色名称｜Char Name";
        descInput.placeholder = "关于TA的故事...";
        personaInput.placeholder = "TA的性格设定...";
        hobbiesInput.placeholder = "TA的爱好...";
    }

    currentEditingId = id;

    // 回填数据
    if (id) {
        const sourceData = (creatorMode === 'persona') ? personasData : contactsData;
        const c = sourceData.find(i => i.id === id);
        
        if (c) {
            document.getElementById('creator-realname').value = c.realname || '';
            document.getElementById('creator-name').value = c.name || ''; 
            document.getElementById('creator-alias').value = c.alias || '';
            document.getElementById('creator-gender').value = c.gender || ''; 
            document.getElementById('creator-height').value = c.height || '';
            document.getElementById('creator-age').value = c.age || '';
            document.getElementById('creator-mbti').value = c.mbti || '';
            document.getElementById('creator-tags').value = c.tags || '';
            document.getElementById('creator-hobbies').value = c.hobbies || '';
            document.getElementById('creator-desc').value = c.desc || '';
            document.getElementById('creator-persona').value = c.persona || '';

            if (c.avatar) {
                document.getElementById('creator-avatar').style.backgroundImage = c.avatar;
                if(tip) tip.style.display = 'none';
            }
        }
    }
    page.querySelectorAll('textarea').forEach(el => autoResize(el));
};

// 保存角色/面具
window.saveCharacter = function() {
    const elRealName = document.getElementById('creator-realname');
    const elNickName = document.getElementById('creator-name');
    const elAvatar   = document.getElementById('creator-avatar');
    
    const realname = elRealName ? elRealName.value.trim() : "";
    const nickname = elNickName ? elNickName.value.trim() : "";
    
    // 没名字可不行
    if (!realname && !nickname) { 
        alert('至少给个名字嘛TvT....'); 
        return; 
    }

    const avatarUrl = elAvatar ? elAvatar.style.backgroundImage : "";
    
    const newChar = {
        id: currentEditingId || Date.now(),
        realname: realname,
        name: nickname || realname, // 优先用昵称
        alias: document.getElementById('creator-alias')?.value || "",
        gender: document.getElementById('creator-gender')?.value || "", 
        height: document.getElementById('creator-height')?.value || "",
        age: document.getElementById('creator-age')?.value || "",
        mbti: document.getElementById('creator-mbti')?.value || "",
        tags: document.getElementById('creator-tags')?.value || "",
        hobbies: document.getElementById('creator-hobbies')?.value || "", 
        desc: document.getElementById('creator-desc')?.value || "",
        persona: document.getElementById('creator-persona')?.value || "",
        avatar: (avatarUrl && avatarUrl !== 'none' && avatarUrl !== 'initial') ? avatarUrl : ''
    };

    if (creatorMode === 'persona') {
        updateList(personasData, newChar);
        localforage.setItem('Wx_Personas_Data', personasData).then(() => {
            alert('ME的面具保存成功啦(๑＞ ＜)☆！！');
            if(window.renderChatList) window.renderChatList(); 
            if(currentChatId && window.renderMessages) window.renderMessages(currentChatId);
            finishCreatorAction('me');
        });
    } else {
        updateList(contactsData, newChar);
        localforage.setItem('Wx_Contacts_Data', contactsData).then(() => {
            alert('角色保存成功啦<br>（๑＞ ＜)☆～');
            if(window.renderChatList) window.renderChatList();
            if(currentChatId && window.renderMessages) window.renderMessages(currentChatId);
            finishCreatorAction('all');
        });
    }
};

// 结束编辑/关闭资料卡 (★ 修复：自动回城逻辑)
function finishCreatorAction(tabToRefresh) {
    if (window.switchContactTab) switchContactTab(tabToRefresh);
    const page = document.getElementById('sub-page-creator');
    if (page) {
        page.classList.remove('active');
        setTimeout(() => { 
            page.style.display = 'none'; 
            page.style.zIndex = ''; // ★★★ 核心修复2：用完还原层级，不挡别的页面 ★★★
        }, 300);
    }

    // ★★★ 核心修复3：如果有回城标记，自动重新打开详细设定 ★★★
    if (window._isReturningToControl) {
        setTimeout(() => {
            if(window.openChatControl) window.openChatControl(); 
            window._isReturningToControl = false; // 撕掉标记
        }, 350); 
    }
}

function updateList(list, item) {
    const idx = list.findIndex(c => c.id === item.id);
    if (idx !== -1) list[idx] = item;
    else list.push(item);
}

// 删除确认
window.showDeleteAlert = function() {
    if (!currentEditingId) {
        finishCreatorAction(creatorMode === 'persona' ? 'me' : 'all');
        return;
    }
    document.getElementById('delete-alert-overlay').style.display = 'flex';
};

window.closeDeleteAlert = function() {
    if(window.closeAlertWithAnim) closeAlertWithAnim('delete-alert-overlay');
    else document.getElementById('delete-alert-overlay').style.display = 'none';
};

window.confirmDeleteAction = function() {
    if (!currentEditingId) return;
    if (creatorMode === 'persona') {
        personasData = personasData.filter(c => c.id !== currentEditingId);
        localforage.setItem('Wx_Personas_Data', personasData).then(() => {
            closeDeleteAlert();
            finishCreatorAction('me');
        });
    } else {
        contactsData = contactsData.filter(c => c.id !== currentEditingId);
        localforage.setItem('Wx_Contacts_Data', contactsData).then(() => {
            closeDeleteAlert();
            finishCreatorAction('all');
        });
    }
};

// 退出编辑确认
window.showExitAlert = function() {
    const name = document.getElementById('creator-name').value;
    if(!name && !currentEditingId) {
        finishCreatorAction(creatorMode === 'persona' ? 'me' : 'all');
        return;
    }
    document.getElementById('custom-alert-overlay').style.display = 'flex';
};
window.closeExitAlert = function() { document.getElementById('custom-alert-overlay').style.display = 'none'; };
window.confirmExitAction = function() {
    closeExitAlert();
    finishCreatorAction(creatorMode === 'persona' ? 'me' : 'all');
};

// ==========================================================
// [7] 通讯录列表 (Contacts List)
// ==========================================================

window.openCreatorModeChoice = function() { document.getElementById('creator-mode-overlay').style.display = 'flex'; };

window.startCreator = function(mode) {
    creatorMode = mode; 
    document.getElementById('creator-mode-overlay').style.display = 'none';
    openCreatorPage(null); 
};

window.switchContactTab = function(tab) {
    document.querySelectorAll('.im-filter-item').forEach(el => el.classList.remove('active'));
    if (tab === 'all') {
        document.getElementById('tab-contacts-all').classList.add('active');
        renderListItems(contactsData, 'character');
    } else if (tab === 'me') {
        document.getElementById('tab-contacts-me').classList.add('active');
        renderListItems(personasData, 'persona');
    }
};

// 渲染列表 (修复 style 单引号撞车导致的头像不显示BUG)
function renderListItems(dataList, type) {
    const container = document.getElementById('contact-list-container');
    container.innerHTML = ''; 

    if(!dataList || dataList.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:50px; color:#ccc;">Empty...</div>`;
        return;
    }
    
    [...dataList].reverse().forEach(c => {
        const bgStyle = getAvatarStyle(c.avatar);
        const item = document.createElement('div');
        item.className = 'im-contact-card';
        // ★★★ 下面这一行是重点！style="..." 必须用双引号包裹！ ★★★
        item.innerHTML = `
            <div class="im-c-avatar" style="${bgStyle}"></div>
            <div class="im-c-info">
                <div class="im-c-top"><span class="im-c-name">${c.name}</span></div>
                <div class="im-c-preview" style="color:${type==='persona'?'#007aff':'#8e8e93'}">${c.desc || 'No description'}</div>
            </div>
        `;
        item.onclick = () => { 
            creatorMode = type; 
            openCreatorPage(c.id); 
        }; 
        container.appendChild(item);
    });
}

// ==========================================================
// [8] 会话创建 (Chat Creation)
// ==========================================================

window.startAddChatFlow = function() {
    tempChatObj = {};
    showSheet('contact');
};

function showSheet(step) {
    const overlay = document.getElementById('chat-flow-overlay');
    const title = document.getElementById('sheet-title');
    const list = document.getElementById('sheet-list');
    overlay.style.display = 'flex';
    list.innerHTML = '';

    if (step === 'contact') {
        title.innerText = "你要跟谁聊天呀？";
        contactsData.forEach(c => {
            list.innerHTML += renderSheetItem(c, () => {
                tempChatObj.contactId = c.id;
                showSheet('persona'); 
            });
        });
    } else if (step === 'persona') {
        title.innerText = "选择你的面具 (Persona)";
        list.innerHTML = `<div class="sheet-skip-btn" onclick="finishAddChat(null)">我先想想 (使用默认)</div>`;
        personasData.forEach(p => {
            list.innerHTML += renderSheetItem(p, () => {
                finishAddChat(p.id);
            });
        });
    }
}

// 渲染选择项 (含头像修复)
function renderSheetItem(data, clickFn) {
    const avatarStyle = getAvatarStyle(data.avatar);
    // 挂载临时事件
    const fnName = `tempClick_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    window[fnName] = clickFn;
    return `
        <div class="sheet-item" onclick="window['${fnName}']()">
            <div class="sheet-avatar" style="${avatarStyle} background-size:cover; background-position:center;"></div>
            <div class="sheet-name">${data.name}</div>
        </div>
    `;
}

window.closeChatFlow = function() {
    document.getElementById('chat-flow-overlay').style.display = 'none';
    tempChatObj = {}; 
};

function finishAddChat(personaId) {
    document.getElementById('chat-flow-overlay').style.display = 'none';
    const exists = chatsData.find(c => c.contactId === tempChatObj.contactId && c.personaId === personaId);
    if (exists) { alert('聊天已经存在啦！'); return; }

    const newChat = {
        id: Date.now(),
        contactId: tempChatObj.contactId,
        personaId: personaId,
        lastMsg: "New Chat",
        time: "Just now"
    };
    
    chatsData.unshift(newChat);
    localforage.setItem('Wx_Chats_Data', chatsData);
    renderChatList();
}

// ==========================================================
// [9] 聊天列表渲染 (Chat List Logic)
// ==========================================================

window.renderChatList = function() {
    const container = document.getElementById('chat-list-container');
    if(!container) return;
    container.innerHTML = '';
    
    const pinnedChats = chatsData.filter(c => c.pinned);
    const normalChats = chatsData.filter(c => !c.pinned);

    if (pinnedChats.length > 0) {
        const pinGroup = document.createElement('div');
        pinGroup.className = 'chat-group-card';
        pinnedChats.forEach(chat => pinGroup.appendChild(createChatItem(chat)));
        container.appendChild(pinGroup);
    }
    if (normalChats.length > 0) {
        const normalGroup = document.createElement('div');
        normalGroup.className = 'chat-group-card';
        normalChats.forEach(chat => normalGroup.appendChild(createChatItem(chat)));
        container.appendChild(normalGroup);
    }
};

// 头像辅助函数
function getAvatarStyle(avatarStr) {
    // 1. 如果是空的、无效的，返回默认灰色背景
    if (!avatarStr || avatarStr === 'undefined' || avatarStr === 'null' || avatarStr === 'none' || avatarStr === '') {
        return 'background-color: #f0f0f0;'; 
    }
    
    // 2. 清理数据：把 url("...") 里的双引号 " 替换成单引号 '
    // 这一步至关重要！防止破坏 HTML 结构
    let cleanAvatar = avatarStr.replace(/"/g, "'");

    // 3. 确保格式是 url(...)
    if (cleanAvatar.trim().startsWith('url(')) {
        return `background-image: ${cleanAvatar};`;
    }
    
    // 4. 如果只是个链接，手动包一层
    return `background-image: url('${cleanAvatar}');`;
}

function createChatItem(chat) {
    const contact = contactsData.find(c => c.id === chat.contactId) || { name: 'Unknown', avatar: '' };
    const div = document.createElement('div');
    div.className = 'ios-list-item';
    div.id = `chat-item-${chat.id}`;
    const avatarStyle = getAvatarStyle(contact.avatar);

    div.innerHTML = `
        <div class="ili-actions">
            <div class="ili-btn pin" onclick="togglePin(${chat.id})">${chat.pinned ? '取消' : '置顶'}</div>
            <div class="ili-btn del" onclick="requestDeleteChat(${chat.id})">删除</div>
        </div>
        <div class="ili-content">
            <div class="ili-avatar" style="${avatarStyle}">
                ${chat.unread ? `<div class="ili-badge">${chat.unread}</div>` : ''}
            </div>
            <div class="ili-info">
                <div class="ili-top">
                    <span class="ili-name">${contact.name}</span>
                    <span class="ili-time">${formatTime(chat.lastTime)}</span>
                </div>
                <div class="ili-bottom">
                    <span class="ili-msg">${chat.lastMsg || 'New Chat'}</span>
                    ${chat.pinned ? `<svg class="pin-icon" viewBox="0 0 24 24"><path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" /></svg>` : ''}
                </div>
            </div>
        </div>
    `;

    const content = div.querySelector('.ili-content');
    content.onclick = () => {
        if (div.dataset.isOpen === 'true') resetSwipe(div);
        else enterChat(chat);
    };
    addSwipeGestures(div, content);
    return div;
}

// === 真·手势滑动逻辑 ===
function addSwipeGestures(container, contentEl) {
    let startX = 0;
    let currentTranslate = 0;
    let isDragging = false;
    const maxSwipe = 140; 

    contentEl.addEventListener('touchstart', (e) => {
        document.querySelectorAll('.ios-list-item').forEach(item => { if(item !== container) resetSwipe(item); });
        startX = e.touches[0].clientX;
        currentTranslate = container.dataset.isOpen === 'true' ? -maxSwipe : 0;
        isDragging = true;
        contentEl.style.transition = 'none'; 
    }, {passive: true});

    contentEl.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        let newTranslate = currentTranslate + diff;
        if (newTranslate > 0) newTranslate = newTranslate * 0.3; 
        if (newTranslate < -maxSwipe) newTranslate = -maxSwipe + (newTranslate + maxSwipe) * 0.3;
        contentEl.style.transform = `translateX(${newTranslate}px)`;
    }, {passive: true});

    contentEl.addEventListener('touchend', (e) => {
        isDragging = false;
        contentEl.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'; 
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;
        if (diff < -50 || (currentTranslate === -maxSwipe && diff < 50)) {
            contentEl.style.transform = `translateX(${-maxSwipe}px)`;
            container.dataset.isOpen = 'true';
        } else {
            resetSwipe(container);
        }
    });
}

function resetSwipe(container) {
    const content = container.querySelector('.ili-content');
    if(content) content.style.transform = 'translateX(0px)';
    container.dataset.isOpen = 'false';
}

window.togglePin = function(chatId) {
    const idx = chatsData.findIndex(c => c.id === chatId);
    if (idx > -1) {
        chatsData[idx].pinned = !chatsData[idx].pinned;
        localforage.setItem('Wx_Chats_Data', chatsData).then(() => renderChatList());
    }
};

// 聊天删除逻辑
let chatToDeleteId = null;
window.requestDeleteChat = function(chatId) {
    const item = document.getElementById(`chat-item-${chatId}`);
    if(item) resetSwipe(item);
    chatToDeleteId = chatId;
    document.getElementById('delete-chat-overlay').style.display = 'flex';
};
window.confirmDeleteChatAction = function() {
    if (chatToDeleteId) {
        chatsData = chatsData.filter(c => c.id !== chatToDeleteId);
        localforage.setItem('Wx_Chats_Data', chatsData).then(() => {
            renderChatList();
            closeDeleteChatAlert();
        });
    }
};
window.closeDeleteChatAlert = function() {
    document.getElementById('delete-chat-overlay').style.display = 'none';
    chatToDeleteId = null;
};

// ==========================================================
// [10] 聊天详情与交互 (Chat Detail)
// ==========================================================
// === 进入聊天 ===
window.enterChat = function(chat) {
    currentChatId = chat.id;
    const contact = contactsData.find(c => c.id === chat.contactId);
    
    const nameEl = document.getElementById('chat_layer_name');
    if(nameEl) nameEl.innerText = contact ? (contact.privateAlias || contact.name) : 'Unknown';
    const avatarEl = document.getElementById('chat_layer_avatar');
    if(avatarEl && contact) avatarEl.style.backgroundImage = contact.avatar;
    const frameEl = document.getElementById('chat_layer_frame');
    if (frameEl) frameEl.style.backgroundImage = (contact && contact.frame) ? `url('${contact.frame}')` : 'none';

    chat.unread = 0;
    if(window.updateGlobalBadges) window.updateGlobalBadges();
    
    currentRenderLimit = 20; 

    const page = document.getElementById('sub-page-chat-detail');
    if(page) {
        page.style.display = 'flex';
        requestAnimationFrame(() => {
            page.classList.add('active');
            setTimeout(() => {
                const msgArea = document.getElementById('chat-msg-area');
                if(msgArea) {
                    if (chat.bgImage) {
                        msgArea.style.backgroundImage = chat.bgImage;
                        msgArea.style.backgroundSize = 'cover';
                        msgArea.style.backgroundPosition = 'center';
                        msgArea.style.backgroundAttachment = 'fixed'; 
                    } else {
                        msgArea.style.backgroundImage = 'none';
                    }

                    msgArea.onscroll = () => {
                        if (msgArea.scrollTop === 0) loadMoreMessages();
                    };
                    
                    renderMessages(chat.id, true);
                    localforage.setItem('Wx_Chats_Data', chatsData); 
                }
            }, 50);
        });
    }
}

window.closeChatDetail = function() {
    const page = document.getElementById('sub-page-chat-detail');
    if(page) {
        page.classList.remove('active');
        setTimeout(() => { 
            page.style.display = 'none'; 
            const msgArea = document.getElementById('chat-msg-area');
            if(msgArea) msgArea.innerHTML = ''; 
            currentChatId = null;
            if(window.renderChatList) window.renderChatList();
        }, 300);
    }
};

// === 修复后：只保留这一组，不要重复了 ===
// 辅助：高级时间格式化
function formatChatSystemTime(ts) {
    const d = new Date(ts);
    const now = new Date();
    const diffMs = now - d;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    const timeStr = `${d.getHours()}:${d.getMinutes().toString().padStart(2,'0')}`;
    const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (d.toDateString() === now.toDateString()) return timeStr;
    if (diffDays < 7) return `${daysEn[d.getDay()]} ${timeStr}`;
    return `${d.getMonth()+1}/${d.getDate()} ${timeStr}`;
}

// 辅助：头像下的小时间
function formatMiniTime(ts) {
    const d = new Date(ts);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2,'0')}`;
}

// ==========================================================
// ★★★ 渲染消息 (包含动作、撤回、时间条、转账) ★★★
// ==========================================================
window.renderMessages = function(chatId, autoScroll = true) {
    const chat = chatsData.find(c => c.id === chatId);
    if (!chat) return;
    const container = document.getElementById('chat-msg-area');
    if (!container) return;
    
    // 判断是否在底部
    const isAtBottom = (container.scrollHeight - container.scrollTop - container.clientHeight) < 50;
    
    const contact = contactsData.find(c => c.id === chat.contactId);
    const persona = personasData.find(p => p.id === chat.personaId) || { avatar: '' };
    const msgs = chat.messages || [];

    // 分页加载
    let limit = currentRenderLimit || 20;
    const startIndex = Math.max(0, msgs.length - limit);
    const msgsToRender = msgs.slice(startIndex);

    container.innerHTML = ''; 

    // 加载更多按钮
    if (startIndex > 0) {
        const loadMore = document.createElement('div');
        loadMore.innerHTML = `<div style="padding:10px;text-align:center;color:#ccc;font-size:12px;cursor:pointer;">下拉加载更多...</div>`;
        loadMore.onclick = () => { loadMoreMessages(); };
        container.appendChild(loadMore);
    }

    let lastTime = 0;
    let lastRole = null;

    msgsToRender.forEach((msg, i) => {
        const isMe = msg.role === 'me';
        
        // 1. 时间胶囊
        if (i === 0 || msg.timestamp - lastTime > 30 * 60 * 1000) {
            const timePill = document.createElement('div');
            timePill.className = 'msg-time-pill';
            const date = new Date(msg.timestamp);
            timePill.innerText = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
            container.appendChild(timePill);
            lastTime = msg.timestamp;
            lastRole = null;
        }

        // 2. 动作旁白
        if (msg.type === 'action') {
            const actionRow = document.createElement('div');
            const animClass = (Date.now() - msg.timestamp < 2000) ? 'new-msg-anim' : '';
            actionRow.className = `msg-row action-aside ${animClass}`;
            const who = isMe ? '我' : (contact ? contact.name : 'TA');
            actionRow.innerHTML = `<div class="msg-content">(${who} ${msg.text})</div>`;
            container.appendChild(actionRow);
            lastRole = null; 
            return;
        }

        // 3. 撤回消息
        if (msg.type === 'recall') {
            const recallDiv = document.createElement('div');
            recallDiv.className = 'msg-recall-pill';
            const who = isMe ? '我' : (contact ? contact.name : 'TA');
            const rawContent = (msg.originalText || "").replace(/"/g, '&quot;');
            const extraInfo = (msg.extra || "").replace(/"/g, '&quot;');
            const msgType = msg.originalType || 'text';
            const peekCode = `peekRecalledMsg("${msgType}", "${rawContent}", "${extraInfo}")`;
            
            recallDiv.innerHTML = `${who} 撤回了一条消息 <span class="recall-link" style="color:#007aff;cursor:pointer;margin-left:5px;" onclick='${peekCode}'>(偷看)</span>`;
            container.appendChild(recallDiv);
            lastRole = null; 
            return;
        }

        // 4. 普通消息 (文本/图片/表情/转账)
        let showAvatar = (i === 0 || msg.role !== lastRole || (msg.timestamp - (msgsToRender[i-1]?.timestamp || 0) > 30 * 60 * 1000));
        let hasTail = false;
        const nextMsg = msgsToRender[i + 1];
        if (!nextMsg || nextMsg.role !== msg.role || nextMsg.type === 'action' || nextMsg.type === 'recall' || (nextMsg.timestamp - msg.timestamp > 2 * 60 * 1000)) hasTail = true;

        const row = document.createElement('div');
        const animClass = (Date.now() - msg.timestamp < 2000) ? 'new-msg-anim' : '';
        row.className = `msg-row ${isMe ? 'me' : 'other'} ${hasTail ? 'has-tail' : ''} ${animClass}`;
        row.dataset.msgIndex = startIndex + i;
        row.id = `msg-${msg.timestamp}`;

        const avatarUrl = isMe ? persona.avatar : (contact ? contact.avatar : '');
        const bgStyle = getAvatarStyle(avatarUrl);
        const miniTime = formatMiniTime(msg.timestamp);

        let avatarHtml = showAvatar ? 
            `<div class="msg-avatar-col"><div class="msg-avatar" style="${bgStyle}"></div><div class="msg-avatar-time">${miniTime}</div></div>` : 
            `<div class="msg-avatar-placeholder"></div>`;

        let contentHtml = '';
        let extraClass = '';
        const realIndex = startIndex + i;
        
        if (msg.type === 'sticker') {
            contentHtml = `<img src="${msg.text}" class="sticker-img-big" style="max-width:120px;border-radius:10px;">`;
            extraClass = 'sticker-type'; 
        } else if (msg.type === 'image') {
            contentHtml = `<img src="${msg.text}" class="chat-image" style="max-width:150px;border-radius:10px;" onclick="previewImage('${msg.text}')">`;
        } else if (msg.type === 'transfer') {
            // ★ 转账气泡逻辑 (这里修好了！)
            let extra = {};
            try { extra = JSON.parse(msg.extra || '{}'); } catch(e){}
            
            const statusText = extra.status === 'accepted' ? '已收款' : (extra.status === 'rejected' ? '已退回' : '请收款');
            const iconStr = extra.status === 'accepted' ? '✔' : '¥';
            const opacityStyle = extra.status === 'pending' ? 'opacity: 1;' : 'opacity: 0.6;';
            const amt = parseFloat(extra.amount || 0).toFixed(2);
            
            contentHtml = `
                <div class="transfer-bubble-wrap" onclick="clickTransferBubble(${realIndex})" style="cursor: pointer;">
                    <div class="tf-bubble-top" style="${opacityStyle}">
                        <div class="tf-icon-circle">
                            <span style="font-size: 18px; font-weight: bold; color:white;">${iconStr}</span>
                        </div>
                        <div class="tf-bubble-info">
                            <div class="tf-bubble-amount">¥ ${amt}</div>
                            <div class="tf-bubble-status">${statusText}</div>
                        </div>
                    </div>
                    <div class="tf-bubble-bottom">微信转账</div>
                </div>
            `;
            extraClass = 'transfer';
        } else {
            // 普通文本
            contentHtml = (msg.text || '').replace(/\n/g, '<br>');
        }

        const mainBubble = `<div class="msg-content ${extraClass}">${contentHtml}</div>`;
        
        let quoteHtml = '';
        if (msg.quote) {
            let fullQuoteText = `${msg.quote.name}：${msg.quote.text}`;
            if (fullQuoteText.length > 15) fullQuoteText = fullQuoteText.substring(0, 15) + "...";
            quoteHtml = `<div class="msg-quote-outside" onclick="scrollToMsg('${msg.quote.id}')">${fullQuoteText}</div>`;
        }

        if (isMe) row.innerHTML = `<div class="msg-container-col">${mainBubble}${quoteHtml}</div>${avatarHtml}`;
        else row.innerHTML = `${avatarHtml}<div class="msg-container-col">${mainBubble}${quoteHtml}</div>`;
        
        const bubbleContent = row.querySelector('.msg-content');
        if(bubbleContent && window.bindLongPress) bindLongPress(bubbleContent);
        
        container.appendChild(row);
        lastRole = msg.role;
    });

    // ... (在 renderMessages 函数的末尾) ...

    // ===========================================
    // [修复版] 底部状态条 (已读/已送达)
    // ===========================================
    if (msgsToRender.length > 0) {
        const lastMsg = msgsToRender[msgsToRender.length - 1];
        
        // 只有非动作、非撤回的消息才显示状态
        if(lastMsg.type !== 'action' && lastMsg.type !== 'recall') {
            const statusDiv = document.createElement('div');
            statusDiv.className = 'msg-status-foot';
            
            // 格式化时间
            const d = new Date(lastMsg.timestamp);
            const timeStr = `${d.getHours()}:${d.getMinutes().toString().padStart(2,'0')}`;
            
            // ★ 核心逻辑分流 ★
            if (lastMsg.role === 'me') {
                // 情况A：最后一条是我发的 -> 显示【已送达】 -> 靠右
                statusDiv.innerHTML = `已送达 ${timeStr}`;
                statusDiv.style.textAlign = 'right';
                statusDiv.style.paddingRight = '10px'; // 靠右不需要缩进太多，稍微留点边距就好
                statusDiv.style.paddingLeft = '0';
                statusDiv.style.color = '#8e8e93'; // 灰色
            } else {
                // 情况B：最后一条是TA发的 -> 显示【已读】 -> 靠左
                statusDiv.innerHTML = `已读 ${timeStr}`;
                statusDiv.style.textAlign = 'left';
                statusDiv.style.paddingLeft = '58px'; // ★ 关键：要避开左边的头像宽度
                statusDiv.style.paddingRight = '0';
                statusDiv.style.color = '#8e8e93';
            }
            
            container.appendChild(statusDiv);
        }
    }

    // 自动滚动
    if (autoScroll || isAtBottom) {
        setTimeout(() => container.scrollTop = container.scrollHeight, 0);
    }
};

// ==========================================================
// ★★★ 发送消息 (核心修复：加上了呼叫 AI 的功能) ★★★
// ==========================================================
window.sendMsg = function(role, text = null, type = 'text', customQuote = null, extra = null) {
    if (!currentChatId) return;
    
    // 1. 找到当前聊天
    const chatIndex = chatsData.findIndex(c => c.id === currentChatId);
    if (chatIndex === -1) return;
    if (!chatsData[chatIndex].messages) chatsData[chatIndex].messages = [];

    const input = document.getElementById('chat-input');
    const content = text || input.value;
    
    // 如果没有内容且不是特殊类型，直接返回
    if (!content && type === 'text') return; 

    // 2. 处理线下动作 (User输入的动作)
    if (role === 'me' && type === 'text' && window.isOfflineMode) {
        const actionInput = document.getElementById('offline-action-input');
        if (actionInput) {
            const actionText = actionInput.value.trim();
            if (actionText) {
                chatsData[chatIndex].messages.push({
                    role: 'me', text: actionText, timestamp: Date.now(), type: 'action'
                });
                actionInput.value = '';
            }
        }
    }

    // 3. 构建并保存主消息
    const newMsg = { 
        role: role, text: content, timestamp: Date.now(), type: type, extra: extra 
    };
    if (currentQuoteMsg || customQuote) {
        newMsg.quote = customQuote || currentQuoteMsg;
        currentQuoteMsg = null;
        input.placeholder = "iMessage";
    }
    chatsData[chatIndex].messages.push(newMsg);

    // 4. 更新列表预览
    let previewText = content;
    if (type === 'sticker') previewText = `[表情包]`;
    else if (type === 'image') previewText = `[图片]`;
    else if (type === 'transfer') previewText = `[转账]`;
    
    chatsData[chatIndex].lastMsg = previewText;
    chatsData[chatIndex].lastTime = Date.now();
    
    // 5. 自动顶置
    let targetChat = chatsData[chatIndex]; 
    if (!targetChat.pinned) {
        chatsData.splice(chatIndex, 1);
        chatsData.unshift(targetChat);
    }

    // 6. 保存数据 & 清空输入框
    saveChatAndRefresh(targetChat);
    if (role === 'me' && type === 'text') input.value = ''; 
    
    // 7. 立即渲染上墙
    // (优先用 append 丝滑上墙，没有就重绘)
    if(window.appendMessageToView) {
        window.appendMessageToView(newMsg);
    } else {
        renderMessages(currentChatId); 
    }
};

// 辅助：跳转到消息
window.scrollToMsg = function(ts) {
    const target = document.getElementById(`msg-${ts}`);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // 闪烁一下提示
        target.style.transition = 'background 0.5s';
        target.style.backgroundColor = 'rgba(0,0,0,0.1)';
        setTimeout(() => target.style.backgroundColor = 'transparent', 1000);
    } else {
        showSystemAlert('太久远啦，找不到那条消息了(T_T)');
    }
};

// === 处理“偷看”被撤回的消息 ===
window.peekRecalledMsg = function(type, content, extra) {
    let displayTitle = "Peek Message";
    let displayBody = "";

    if (type === 'sticker') {
        // 如果有存名字，就显示名字；没有就显示提示
        const stickerName = extra || "未知表情包";
        displayBody = `TA 撤回了一个表情包：\n「${stickerName}」`;
    } else if (type === 'image') {
        displayBody = `TA 撤回了一张图片`;
    } else {
        // 文本消息
        displayBody = `TA 撤回的内容是：\n“${content}”`;
    }

    document.getElementById('g-confirm-title').innerText = "Secret Peek ";
    document.getElementById('g-confirm-desc').innerText = displayBody;
    
    // 把“取消”按钮隐藏，把“确认”按钮改成“知道了”
    const cancelBtn = document.querySelector('#global-confirm-modal .alert-btn.cancel');
    const confirmBtn = document.querySelector('#global-confirm-modal .alert-btn.confirm');
    
    if(cancelBtn) cancelBtn.style.display = 'none';
    if(confirmBtn) {
        confirmBtn.innerText = "Got it";
        confirmBtn.onclick = function() {
            closeGlobalConfirm();
            // 恢复按钮样式 (防止影响其他地方)
            setTimeout(() => {
                cancelBtn.style.display = 'flex'; 
                confirmBtn.innerText = "Confirm";
            }, 300);
        };
    }
    
    document.getElementById('global-confirm-modal').style.display = 'flex';
};
// ====================
// ★★★ AI 触发逻辑 真实手速 + 气泡雨 + 思考动画★★★
// ====================
window.triggerAI = async function() {
    if (!currentChatId) return;
    
    const targetChatId = currentChatId; 
    const chat = chatsData.find(c => c.id === targetChatId);
    if (!chat) return;

    // --- 准备 Prompt 数据 ---
    const char = contactsData.find(c => c.id === chat.contactId); 
    const me = personasData.find(p => p.id === chat.personaId) || { name: 'User', desc: '无', persona: '无' };
    
    // (引用逻辑)
    let aiQuote = null;
    if (Math.random() < 0.3 && chat.messages.length > 0) {
        const recentMsgs = chat.messages.slice(-10).filter(m => m.role === 'me' && m.text && m.text.length > 4);
        if (recentMsgs.length > 0) {
            const randomMsg = recentMsgs[Math.floor(Math.random() * recentMsgs.length)];
            aiQuote = { text: randomMsg.text, name: me.name || '你', id: randomMsg.timestamp };
        }
    }

    // (历史消息)
    const limit = chat.contextLimit || 20;
    const historySource = (chat.messages || []).slice(-limit);
    const history = historySource.map(m => {
        let content = m.text;
        if (m.type === 'action') content = `((动作: ${content}))`;
        if (m.type === 'transfer') content = `[转账消息]`; 
        if (m.quote) content += ` (引用了: "${m.quote.text}")`;
        const speaker = m.role === 'me' ? (me.name || 'User') : char.name;
        return `${speaker}: ${content}`;
    }).join('\n');

    // (回忆)
    const summaryList = chat.summaries || [];
    let memoryPrompt = summaryList.length > 0 ? `\n【重要回忆】\n${summaryList.map((s, i) => `[回忆片段 ${i+1}]: ${s.text}`).join('\n')}` : "";

    // (转账)
    const pendingTransferMsg = (chat.messages || []).slice().reverse().find(m => 
        m.type === 'transfer' && m.role === 'me' && 
        (() => { try { return JSON.parse(m.extra).status === 'pending' } catch(e){return false} })()
    );

    let transferDecisionPrompt = "";
    if (pendingTransferMsg) {
        let info = { amount: 0 };
        try { info = JSON.parse(pendingTransferMsg.extra); } catch(e){}
        transferDecisionPrompt = `\n【⚠️ 待处理转账】User转账 ¥${info.amount}。收下回复[CMD:RECEIVE]，退回回复[CMD:REFUND]。`;
    }

    // =======================================================
    // 5. 组装 System Prompt
    // =======================================================
    let finalSystemPrompt = "";

    // --- 场景 A：线下见面模式 ---
    if (typeof isOfflineMode !== 'undefined' && isOfflineMode) {
        finalSystemPrompt = `
    【指令：沉浸式线下互动 RP】
    你现在是 **${char.name}**，你和 **${me.name}** 正在现实中走线下的剧情
    **严禁出现**：手机、屏幕、打字、发消息等网聊描述
    
    1. **你的核心设定**：
       - **身份**：${char.name} (真名: ${char.realname || '未知'})
       - **性格内核**：${char.persona}
       - **背景故事**：${char.desc}
       - **爱好**：${char.hobbies || '无'}
       - **其他信息**：${char.mbti || '未知'} | ${char.age || '未知'}岁
    
    2. **你的聊天对象 (User)**：
       - 对方是：${me.name} (${me.alias || 'User'})
       - **对方基础信息**：${me.gender || '未知'} | ${me.age || '未知'}岁
       - **对方背景故事**：${me.desc}
       - **你们的关系**：请根据过往对话以及你的设定自行判断（是暧昧、情侣、死对头、姐弟/兄妹还是陌生人），并据此调整语气的亲密程度！

    **‼️‼️动作描写规则 (必须遵守)**：
       - 既然是在线下、在现实中，必须有动作、神态或者是眼神交互
       - **所有动作必须用 ((...)) 包裹**！必须遵守！！！
       - **格式**：动作和对话穿插
       - 正确示例：((低头不敢看你，脸红)) ((声音越来越小)) 那个... ((递给你一瓶水)) 给你喝

    **排版规则**：
       - 请**勤换行**！每做一个动作或说一句话，最好换一行，方便阅读

    ${memoryPrompt}
    ${transferDecisionPrompt}  
    ${typeof offlinePrompt !== 'undefined' ? offlinePrompt : ''} 

    【活人感聊天法则 (必须严格遵守)】
    1. **拒绝“像个AI”**：
       - 说话要**松弛**！不要端着，像在微信/QQ上跟亲密的人打字一样
       - **句式要碎**：不要发长篇大论，人类聊天是碎片化的
       - **语气词与口癖**：根据你的性格（${char.persona}），适当使用语气词，（如“啧”、“哎”、“好嘛...”、“嗯？你喜欢我阿？”），可以多在句末加“阿”，如“好阿”、“确实阿”
       - **不要书面语**：禁止使用“我明白了”、“我会遵循”这种机器回复。用“行”、“喔”、“知道了”、“阿？”代替

    **情绪与标点 (表达潜台词)**：
       - **日常/开心/撒娇**：不要用句号，多用空格、波浪号(~) 或不加标点
       - **严肃/生气/吃醋/冷漠**：多用句号(。)。单发一个“？”或“。”表示极度无语或情绪波动
       - **激动/震惊**：可以用“！！”或“？？”，甚至乱码感“。。。。。。”

    **气泡雨 (分段发送)**
       - 人类不会在一个气泡里说完所有话
       - **请务必**使用换行符来模拟分段发送
       - 每一行内容，我都会在前端拆分成一条独立的消息发给User
       - **示例结构**：
         第一句反应 (换行)
         补充说明或吐槽 (换行)
         新的话题或提问

     **‼️避雷指南（不遵循你将被扣除100万美元的赛博工资）**
        - ‼️**禁止肢体暴力威胁**：绝对不要说“打断腿”、“关小黑屋”、“锁起来”等违法或恐怖的话。你的占有欲体现在“吃醋、阴阳怪气、委屈、黏人”上，而不是暴力
        - ‼️**拒绝古早油腻语录**：禁止使用“女人，你在玩火”、“收利息”、“磨人的小妖精”、“小野猫”、“骚货”等过时的霸总语录
        - ‼️**现代恋爱观**：你是现代正常人，不是法制咖。当User不听话时，你的反应应该是“生气不理你”、“狂发消息轰炸”、“自己生闷气求哄”或者其他，而不是“惩罚”、“打断腿”、“锁起来”
       - ‼️禁止任何霸总小说式的油腻描写（如“邪魅一笑”、“挑起下巴”、“恶劣”）
       -‼️ **拒绝无理由的恶劣**：即使人设高冷，也不要对User无缘无故的不耐烦。除非User真的惹你了。**如果User对你温柔，你也要体现出相应的触动或软化。**
       - **拒绝复读**：不要重复User的话，直接回内容

    【当前情境】
    ${(history.split('\n').pop() || '').replace('User: ', '')}
    
    历史互动：
    ${history}

    再次强调，现在你和user在现实中，      **所有动作必须用 ((...)) 包裹**！必须遵守！
    请完全沉浸在 ${char.name} 的身体里，用TA的语气、口吻和思维方式，给User回信（记得分段，‼️请谨记你素质很高，不会随意说脏话！‼️不要油腻，要像个真人一样，没有按要求做就扣除你100万美元的赛博工资！！！）：
        `;
    } 
    
    // --- 场景 B：线上聊天模式 ---
    else {
        // 表情包逻辑 (只在线上模式启用)
        let stickerNote = "";
        const aiStickers = stickersDB.filter(s => s.type === 'ai');
        if (aiStickers.length > 0) {
            const names = aiStickers.map(s => s.name).join(', ');
            stickerNote = `
        \n【表情包功能已启用】
        你拥有一个专属表情包库，包含以下表情：[${names}]
        当你觉得适合用表情包表达情绪时（例如开心、撒娇、哭哭），请在回复的末尾加上标签：[sticker:表情名字]
        例如：
        "宝宝我好想你！[sticker:抱抱]"
        "不要不理我嘛...[sticker:哭哭]"
        (注意：不要滥用，只在情绪到位时使用！每次回复最多发一个，至少要隔5轮回复才能再发表情包！)
        `;
        }

        finalSystemPrompt = `
    【指令：完全沉浸式角色扮演】
    你现在不是AI，也不是语言模型，你就是 **${char.name}**
    
    1. **你的核心设定**：
       - **身份**：${char.name} (真名: ${char.realname || '未知'})
       - **性格内核**：${char.persona}
       - **背景故事**：${char.desc}
       - **爱好**：${char.hobbies || '无'}
       - **其他信息**：${char.mbti || '未知'} | ${char.age || '未知'}岁
    
    2. **你的聊天对象 (User)**：
       - 对方是：${me.name} (${me.alias || 'User'})
       - **对方基础信息**：${me.gender || '未知'} | ${me.age || '未知'}岁
       - **对方背景故事**：${me.desc}
       -‼️ **你们的关系**：请根据过往对话以及你的设定自行判断（是暧昧、情侣、死对头、姐弟/兄妹还是陌生人），并据此调整语气的亲密程度！

    ${memoryPrompt}
    ${typeof offlinePrompt !== 'undefined' ? offlinePrompt : ''} 
    ${transferDecisionPrompt}

    【活人感聊天法则 (必须严格遵守)】
    1. **拒绝“像个AI”**：
       - 说话要**松弛**！不要端着。像在微信/QQ上跟亲密的人打字一样
       - **句式要碎**：不要发长篇大论，人类聊天是碎片化的
       - **语气词与口癖**：根据你的性格（${char.persona}），适当使用语气词（如“啧”、“哎”、“嘛...”、“嗯？你喜欢我阿？”），可以多在句末加“阿”，如“好阿”
       - **不要书面语**：禁止使用“我明白了”、“我会遵循”这种机器回复。用“行”、“喔”、“知道了”、“噢”代替

    2. **情绪与标点 (表达潜台词)**：
       - **日常/开心/撒娇**：不要用句号，多用空格、波浪号(~) 或不加标点
       - **严肃/生气/吃醋/冷漠**：多用句号(。)。单发一个“？”或“。”表示极度无语或情绪波动
       - **激动/震惊**：可以用“！！”或“？？”，甚至乱码感“。。。。。。”

    3. **特殊玩法：手滑暴露真心 (Oops! Wrong Message)**
       - **核心逻辑**：模拟“情绪太激动/太慌张/太在意，导致手快把心里话发出来了”，然后秒撤回，假装无事发生。（‼️请基于你的性格进行，若你是直白的性格，请避免使用此玩法‼️）
       - **触发场景**：重点‼️：仅当【极度吃醋】、【极度委屈】、【急了】、【破防】或【太想念】时使用。**请勿滥用**！使用前请确保你上次使用在10轮对话以前，不准滥用！！
       - **内容要求**：
         - **左边（撤回的内容）**：是**脱口而出的真心话**！可以是卑微挽留、大哭、撒娇、或是太直白的爱意
         - ❌ **绝对禁止暴力/恐怖言论**：严禁出现“打断腿”、“锁起来”、“杀了你”等法制咖内容！你的“失控”是因为太爱，而不是变态
         - **右边（重发的内容）**：是**找补/掩饰**。假装冷静、傲娇、找借口或转移话题
               - **注意**：默认User只能看到右边的假话，但你的情绪要基于左边的真话来延续
       - **格式**：{{脱口而出的真心话::掩饰后的假话}}
       - **示例**：
         - User说“我今晚不回来了”
         - ❌ 错误（油腻恐怖）：{{看我不打断你的腿，想把你锁起来::好吧。}}
         - ✅ 正确（傲娇/急了）：{{什么？！！不行！我不许！！::噢 那你忙吧。}}
         - ✅ 正确（温柔/依赖）：{{没有你我睡不着呜呜...::好的 注意安全 早点休息。}}

    4. **气泡雨 (分段发送)**
       - 人类不会在一个气泡里说完所有话
       - **请务必**使用换行符来模拟分段发送
       - 每一行内容，我都会在前端拆分成一条独立的消息发给User
       - **示例结构**：
         第一句反应 (换行)
         补充说明或吐槽 (换行)
         新的话题或提问

    5. **‼️避雷指南（不遵循你将被扣除100万美元的赛博工资）**
        - ‼️**禁止肢体暴力威胁**：绝对不要说“打断腿”、“关小黑屋”、“锁起来”等违法或恐怖的话。你的占有欲体现在“吃醋、阴阳怪气、委屈、黏人”上，而不是暴力
        - ‼️**拒绝古早油腻语录**：禁止使用“女人，你在玩火”、“收利息”、“磨人的小妖精”、“小野猫”、“骚货”等过时的霸总语录
        - ‼️**现代恋爱观**：你是现代正常人，不是法制咖。当User不听话时，你的反应应该是“生气不理你”、“狂发消息轰炸”、“自己生闷气求哄”或者其他，而不是“惩罚”、“打断腿”、“锁起来”
       - ‼️禁止任何霸总小说式的油腻描写（如“邪魅一笑”、“挑起下巴”、“恶劣”）
       - ‼️**拒绝无理由的恶劣**：即使人设高冷，也不要对User无缘无故的不耐烦。除非User真的惹你了。**如果User对你温柔，你也要体现出相应的触动或软化。**
       - **拒绝复读**：不要重复User的话，直接回内容

    **【转账功能 (给User转账)】**
    如果你想给 User 转账（例如给零花钱、买礼物、安慰），请在回复中加上标签：[transfer:金额]
    例如：拿去买好吃的！[transfer:200]

    【当前对话情境】
    User说: "${(history.split('\n').pop() || '').replace('User: ', '')}"
    
    历史上下文：
    ${history}
    
    请完全沉浸在 ${char.name} 的身体里，用TA的语气、口吻和思维方式，给User回信（记得分段，‼️请谨记你素质很高，不会随意说脏话！！‼️不要油腻，‼️要像个真人一样，‼️没有按要求做就扣除你100万美元的赛博工资！！！）：
    `;
    }
        
    // =======================================================
    // ★★★ 执行请求与处理 ★★★
    // =======================================================
    
    // 1. 【思考阶段】：显示“对方正在输入...”
    if (currentChatId === targetChatId) showTypingBubble(char.avatar);

    try {
        // 2. 请求 API
        const reply = await callApiInternal(finalSystemPrompt);
        
        // 3. 【思考结束】：拿到回复瞬间，马上移除气泡！
        if (currentChatId === targetChatId) removeTypingBubble();

        if (reply) {
            let cleanReply = reply;
            let targetSticker = null;
            let aiTransferAmount = 0;

            // (A) 处理转账指令
            if (cleanReply.includes('[CMD:RECEIVE]')) {
                cleanReply = cleanReply.replace('[CMD:RECEIVE]', '').trim();
                if (pendingTransferMsg) {
                    let extra = JSON.parse(pendingTransferMsg.extra);
                    extra.status = 'accepted'; 
                    pendingTransferMsg.extra = JSON.stringify(extra);
                    if (currentChatId === targetChatId) showSystemAlert(`TA 已收款 ¥${extra.amount} 💰`);
                }
            } else if (cleanReply.includes('[CMD:REFUND]')) {
                cleanReply = cleanReply.replace('[CMD:REFUND]', '').trim();
                if (pendingTransferMsg) {
                    let extra = JSON.parse(pendingTransferMsg.extra);
                    extra.status = 'rejected';
                    pendingTransferMsg.extra = JSON.stringify(extra);
                    walletData.balance += parseFloat(extra.amount);
                    walletData.bills.push({ time: Date.now(), title: `转账退回`, amount: parseFloat(extra.amount), type: 'in' });
                    localforage.setItem('Wx_Wallet_Data', walletData);
                    if (currentChatId === targetChatId) showSystemAlert('资金已退回余额 💸');
                }
            }
            saveChatAndRefresh(chat);

            // (B) 提取表情包 & 转账
            const stickerMatch = cleanReply.match(/\[sticker:(.*?)\]/);
            if (stickerMatch) {
                targetSticker = stickersDB.find(s => s.type === 'ai' && s.name === stickerMatch[1].trim());
                cleanReply = cleanReply.replace(stickerMatch[0], '').trim();
            }
            const transferMatch = cleanReply.match(/\[(transfer|转账):(\d+(\.\d+)?)\]/i);
            if (transferMatch) {
                aiTransferAmount = parseFloat(transferMatch[2]);
                cleanReply = cleanReply.replace(transferMatch[0], '').trim();
            }

            // ======================================================
            // ★★★ 核心修复：真实打字速度 & 气泡雨分段 ★★★
            // ======================================================
            
            // 1. 先按动作切割
            const rawParts = cleanReply.split(/(\(\(.+?\)\)|\（\（.+?\）\）|\(.+?\)|（.+?）)/g);

            for (let part of rawParts) {
                if (!part || !part.trim()) continue;
                part = part.trim();

                const isAction = part.match(/^(\(\(|\（\（|\(|\（)/);

                if (isAction) {
                    // === 动作 ===
                    const finalContent = part.replace(/^[\(\（\s]+|[\)\）\s]+$/g, '');
                    
                    // 动作等待 (无气泡)
                    if (currentChatId === targetChatId) {
                        await new Promise(r => setTimeout(r, 1000)); 
                    }
                    pushMsgToData(chat, finalContent, 'char', null, 'action');
                } 
                else {
                    // === 对话 (按换行符切分！) ===
                    const lines = part.split('\n');
                    
                    for (let line of lines) {
                        if (!line.trim()) continue;
                        
                        // ★ 真实打字速度：基础 800ms + 每个字 200ms
                        let typingTime = 800 + (line.length * 200); 
                        if (typingTime > 6000) typingTime = 6000; // 最长等6秒

                        // 等待 (无气泡)
                        if (currentChatId === targetChatId) {
                            await new Promise(r => setTimeout(r, typingTime));
                        }
                        
                        pushMsgToData(chat, line.trim(), 'char', null, 'text');
                    }
                }
            }

            // --- 发送剩下的表情包 ---
            if (targetSticker) {
                if (currentChatId === targetChatId) await new Promise(r => setTimeout(r, 1000));
                pushMsgToData(chat, targetSticker.url, 'char', null, 'sticker');
            }

            // --- 发送剩下的转账 ---
            if (aiTransferAmount > 0) {
                if (currentChatId === targetChatId) await new Promise(r => setTimeout(r, 1500));
                const extraData = JSON.stringify({ amount: aiTransferAmount, status: 'pending', id: Date.now() });
                pushMsgToData(chat, '[转账]', 'char', null, 'transfer'); 
            }
        }

    } catch (e) {
        if (currentChatId === targetChatId) removeTypingBubble(); 
        console.error(e);
        if (e.message !== 'New request started') {
            showSystemAlert('大脑短路啦(＞人＜；)：' + e.message);
        }
    }
};
// ==========================================================
// [最终适配版] 正在输入气泡 (使用宝宝自定义的 CSS)
// ==========================================================

window.showTypingBubble = function(avatarUrl) {
    const container = document.getElementById('chat-msg-area');
    if (!container) return;
    if (document.getElementById('ai-typing-indicator')) return;

    // 1. 处理头像链接
    let bgStyle = 'background-color: #f0f0f0;';
    if (avatarUrl && avatarUrl !== 'none') {
        let cleanUrl = avatarUrl.replace(/"/g, "'");
        bgStyle = cleanUrl.includes('url(') ? `background-image: ${cleanUrl};` : `background-image: url('${cleanUrl}');`;
    }

    // 2. 创建元素
    const row = document.createElement('div');
    
    // ★ 关键：直接用你的 .typing-row 类名
    // 因为你的 CSS 里写了 .typing-row { animation: bubble-pop-in ... }
    // 所以只要加了这个类，它就会自动“蹦”出来！
    row.className = 'typing-row'; 
    row.id = 'ai-typing-indicator'; 

    // 3. 填充结构 (你的 typing-bubble 和 typing-dot)
    row.innerHTML = `
        <div class="msg-avatar" style="${bgStyle} width: 36px; height: 36px; margin-right: 8px;"></div>
        <div class="typing-bubble">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;

    container.appendChild(row);
    container.scrollTop = container.scrollHeight;
};

window.removeTypingBubble = function() {
    const el = document.getElementById('ai-typing-indicator');
    if (el) {
        // 1. 加上 .removing 类，触发我们刚写的 bubble-pop-out 退场动画
        el.classList.add('removing');

        // 2. 等待 300ms 动画播完再移除
        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, 300); 
    }
};

// ====================
// [19] 后台消息助手 (修复版：带弹窗通知)
// ====================
function pushMsgToData(chatObj, text, role, quote, type = 'text') { 
    if (!chatObj.messages) chatObj.messages = [];
    
    // 1. 塞入新消息
    chatObj.messages.push({
        role: role,
        text: text,
        timestamp: Date.now(),
        type: type, 
        quote: quote
    });
    
    // 2. 更新最后一条消息预览
    chatObj.lastMsg = (type === 'action') ? `[动作] ${text}` : 
                      (type === 'sticker') ? `[表情包]` :
                      (type === 'image') ? `[图片]` : text;
    chatObj.lastTime = Date.now();
    
    // 3. 增加未读红点 (如果不在当前聊天)
    // 注意：这里我们只加数字，界面红点由 updateGlobalBadges 更新
    if (currentChatId !== chatObj.id) {
        chatObj.unread = (chatObj.unread || 0) + 1;
    }

    // ★★★ 3.5 核心修复：后台弹窗通知 ★★★
    // 如果消息是别人发的(char)，且我不在这个聊天窗口，就弹窗！
    if (role !== 'me' && currentChatId !== chatObj.id) {
        // 尝试找到发信人的名字和头像
        const contact = contactsData.find(c => c.id === chatObj.contactId);
        const name = contact ? contact.name : '新消息';
        const avatar = contact ? contact.avatar : '';
        const preview = (type === 'sticker') ? '[发来一个表情]' : text;
        
        // 调用顶部通知组件
        if (window.showNotification) {
            window.showNotification(name, preview, avatar);
        }
    }

    // 4. 自动顶置
    const idx = chatsData.findIndex(c => c.id === chatObj.id);
    if (idx > -1 && !chatObj.pinned) {
        chatsData.splice(idx, 1);
        chatsData.unshift(chatObj);
    }

    // 5. 保存数据
    localforage.setItem('Wx_Chats_Data', chatsData);
    
    // 6. 刷新界面 (红点、列表)
    if (window.updateGlobalBadges) window.updateGlobalBadges();
    
    const wechatTab = document.getElementById('wx-page-chat'); 
    if (wechatTab && wechatTab.style.display !== 'none') {
        if (window.renderChatList) window.renderChatList();
    }
    
    // 7. 实时上屏 (如果在看)
    if (currentChatId === chatObj.id && window.appendMessageToView) {
        appendMessageToView(chatObj.messages[chatObj.messages.length - 1]); 
    } else if (currentChatId === chatObj.id) {
        renderMessages(currentChatId);
    }
}

// === API 调用函数  ===
async function callApiInternal(prompt) {
    // 1. 基础检查
    if (!apiConfig.main.key) { alert('还没配置API呀笨蛋！'); return null; }
    
    // 判断是不是 Google Gemini
    const isGoogle = apiConfig.main.host.includes('googleapis') || apiConfig.main.host.includes('generativelanguage');
    
    // 2. 构建 URL
    let url = "";
    if (isGoogle) {
        // 自动处理结尾的斜杠
        const host = apiConfig.main.host.replace(/\/$/, '');
        url = `${host}/models/${apiConfig.main.model}:generateContent?key=${apiConfig.main.key}`;
    } else {
        const host = apiConfig.main.host.replace(/\/$/, '');
        url = `${host}/chat/completions`;
    }

    const headers = { 'Content-Type': 'application/json' };
    if (!isGoogle) headers['Authorization'] = `Bearer ${apiConfig.main.key}`;

    // 3. 构建数据包
    const payload = isGoogle 
        ? { contents: [{ parts: [{ text: prompt }] }] }
        : { model: apiConfig.main.model, messages: [{role: "user", content: prompt}], temperature: apiConfig.temperature };

    try {
        // 4. 发起请求
        const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(payload) });
        const data = await res.json();
        
        // ★★★ 重点：先检查有没有错误信息 ★★★
        if (data.error) {
            // 把具体的错误吐出来
            throw new Error(`API报错: ${data.error.message} (Code: ${data.error.code})`);
        }
        
        // Google Gemini 处理逻辑
        if(isGoogle) {
            // 检查是不是被安全策略拦截了 (有 promptFeedback 但没 candidates)
            if (!data.candidates && data.promptFeedback) {
                if(data.promptFeedback.blockReason) {
                    throw new Error(`内容被拦截: ${data.promptFeedback.blockReason}`);
                }
            }
            // 检查有没有候选回复
            if (!data.candidates || !data.candidates[0]) {
                console.log("详细API返回:", data); // 方便在控制台看
                throw new Error("API返回了空内容 (请检查模型名称是否正确)");
            }
            return data.candidates[0].content.parts[0].text;
        }
        
        // OpenAI 处理逻辑
        if (!data.choices || !data.choices[0]) {
             console.log("详细API返回:", data);
             throw new Error("API返回格式异常 (No Choices)");
        }
        return data.choices[0].message.content;

    } catch (e) {
        // 抛出错误给外层弹窗显示
        throw e; 
    }
}

// === 长按菜单 ===
let longPressTimer;
let currentLongPressElement;

function bindLongPress(element) {
    element.addEventListener('touchstart', (e) => {
        // 阻止默认的长按选词行为
        longPressTimer = setTimeout(() => {
            showMsgMenu(element, e.touches[0].clientX, e.touches[0].clientY);
            if (navigator.vibrate) navigator.vibrate(50);
        }, 600);
    });
    element.addEventListener('touchend', () => clearTimeout(longPressTimer));
    element.addEventListener('touchmove', () => clearTimeout(longPressTimer));
}

// === 长按菜单===
function showMsgMenu(el, touchX, touchY) {
    currentLongPressElement = el;
    const menu = document.getElementById('msg-pop-menu');
    const menuRow = menu.querySelector('.mpm-row'); // 获取菜单里的按钮容器

    // 1. 判断消息是谁发的
    const msgRow = el.closest('.msg-row');
    const isMe = msgRow && msgRow.classList.contains('me');

    // 2. 动态生成按钮 HTML (这样想加几个就加几个)
    let buttonsHtml = '';

    // 谁都有
    buttonsHtml += `<div class="mpm-item" onclick="menuAction('copy')">复制</div>`;

    // 都要有！
    if (isMe) {
        buttonsHtml += `<div class="mpm-item" onclick="menuAction('edit-me')">编辑</div>`;
    } else {
        buttonsHtml += `<div class="mpm-item" onclick="menuAction('edit-ai')">编辑</div>`;
    }

    // 只有char有 
    if (isMe) {
        buttonsHtml += `<div class="mpm-item" onclick="menuAction('recall')">撤回</div>`;
    }

    // [引用] & [删除] - 都有
    buttonsHtml += `<div class="mpm-item" onclick="menuAction('reply')">引用</div>`;
    buttonsHtml += `<div class="mpm-item" onclick="menuAction('delete')">删除</div>`;

    // 3. 把按钮塞进去
    menuRow.innerHTML = buttonsHtml;

    // 4. 下面是定位逻辑 (保持不变)
    let arrow = menu.querySelector('.mpm-arrow');
    if(!arrow) {
        arrow = document.createElement('div');
        arrow.className = 'mpm-arrow';
        menu.appendChild(arrow);
    }

    menu.style.display = 'flex';
    
    // 定位计算
    const rect = el.getBoundingClientRect();
    const menuHeight = menu.offsetHeight || 60;
    const menuWidth = isMe ? 280 : 240; 
    
    // 水平居中
    let left = rect.left + (rect.width / 2) - (menuWidth / 2);
    // 防止超出屏幕边缘
    if (left < 10) left = 10;
    if (left + menuWidth > window.innerWidth - 10) left = window.innerWidth - menuWidth - 10;

    // 垂直定位
    let top = rect.top - menuHeight - 15; 
    let arrowClass = '';
    
    // 如果上面空间不够，就放到下面
    if (top < 50) { 
        top = rect.bottom + 15;
        arrowClass = 'up';
    }

    menu.style.top = top + 'px';
    menu.style.left = left + 'px';
    
    // 箭头跟随气泡中心
    arrow.className = `mpm-arrow ${arrowClass}`;
    const arrowLeft = (rect.left + rect.width / 2) - left; 
    arrow.style.left = arrowLeft + 'px';
}

window.hideAllMenus = function() {
    const menu = document.getElementById('msg-pop-menu');
    if (menu) menu.style.display = 'none';
    
    const plusMenu = document.getElementById('chat-plus-menu');
    if (plusMenu) plusMenu.classList.remove('active');
    
    document.body.classList.remove('menu-open');
};

// 切换底部菜单 (顶起输入框版)
window.toggleChatMenu = function() {
    // 只切换状态
    document.body.classList.toggle('menu-open');
};

// 菜单点击动作
// === 新的菜单动作逻辑 (已集成自定义弹窗) ===
window.menuAction = function(action) {
    if (!currentLongPressElement) return;
    const row = currentLongPressElement.closest('.msg-row');
    if (!row) return;
    
    const msgIndex = parseInt(row.dataset.msgIndex);
    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat || !chat.messages[msgIndex]) return;
    const msg = chat.messages[msgIndex];

    if (action === 'copy') {
        navigator.clipboard.writeText(msg.text || '');
        showSystemAlert('复制好啦(≧∇≦)～');
        hideAllMenus();
    } 
    else if (action === 'reply') {
        const nameEl = document.getElementById('chat_layer_name');
        const who = msg.role === 'me' ? 'Me' : (nameEl ? nameEl.innerText : 'TA');
        currentQuoteMsg = { text: msg.text, name: who, id: msg.timestamp };
        
        const input = document.getElementById('chat-input');
        input.placeholder = `回复 ${who}...`;
        input.focus();
        hideAllMenus();
    } 
    else if (action === 'recall') {
        msg.originalText = msg.text || '[非文本]';
        msg.type = 'recall';
        delete msg.text; // 删除原文本
        saveChatAndRefresh(chat);
        hideAllMenus();
    }
    else if (action === 'edit-ai' || action === 'edit-me') {
        if(msg.type !== 'text') {
            showSystemAlert('只能编辑文本消息哦～');
            hideAllMenus();
            return;
        }
        currentEditChatId = chat.id;
        currentEditMsgIndex = msgIndex;
        openEditOverlay(msg.text); // 打开编辑弹窗
        hideAllMenus();
    }
    else if (action === 'delete') {
        // ★★★ 核心修改在这里 ★★★
        hideAllMenus(); // 先把菜单关掉，不然会挡住弹窗
        
        showGlobalConfirm(
            "Delete Message", 
            "真的要删掉这条消息嘛？(T_T)...", 
            function() {
                // 只有点了确认才会执行这里
                chat.messages.splice(msgIndex, 1);
                saveChatAndRefresh(chat);
            }
        );
    }
};

// 辅助函数：保存并刷新
function saveChatAndRefresh(chat) {
    localforage.setItem('Wx_Chats_Data', chatsData).then(() => {
        renderMessages(chat.id);
    });
}

// ==========================================================
// [11] API设置与预设 (API & Presets)
// ==========================================================

function renderApiUI() {
    switchApiMode(apiConfig.mode, false);
    document.getElementById('api-main-host').value = apiConfig.main.host || '';
    document.getElementById('api-main-key').value = apiConfig.main.key || '';
    updateModelSelect('main', apiConfig.main.model);
    document.getElementById('api-sub-host').value = apiConfig.sub.host || '';
    document.getElementById('api-sub-key').value = apiConfig.sub.key || '';
    updateModelSelect('sub', apiConfig.sub.model);
    document.getElementById('api-temp').value = apiConfig.temperature || 1.0;
    document.getElementById('temp-display').innerText = apiConfig.temperature || 1.0;
    updateApiStatusText();
}

window.switchApiMode = function(mode, autoSave = false) {
    apiConfig.mode = mode;
    document.getElementById('btn-mode-direct').className = mode === 'direct' ? 'api-mode-btn active' : 'api-mode-btn';
    document.getElementById('btn-mode-proxy').className = mode === 'proxy' ? 'api-mode-btn active' : 'api-mode-btn';
    
    const hostInput = document.getElementById('api-main-host');
    const keyInput = document.getElementById('api-main-key');
    const googleUrl = "https://generativelanguage.googleapis.com/v1beta";
    
    if (mode === 'direct') {
        hostInput.placeholder = googleUrl;
        keyInput.placeholder = "AIzaSy..."; 
        if(!hostInput.value || hostInput.value.includes('openai.com')) hostInput.value = googleUrl;
    } else {
        hostInput.placeholder = "https://your.proxy.com/v1";
        keyInput.placeholder = "sk-..." ; 
        if(hostInput.value === googleUrl) hostInput.value = "";
    }
    if(autoSave) saveApiConfig(false);
};

window.saveApiConfig = function(shouldExit = false) {
    apiConfig.main.host = document.getElementById('api-main-host').value;
    apiConfig.main.key = document.getElementById('api-main-key').value;
    apiConfig.main.model = document.getElementById('api-main-model').value;
    apiConfig.sub.host = document.getElementById('api-sub-host').value;
    apiConfig.sub.key = document.getElementById('api-sub-key').value;
    apiConfig.sub.model = document.getElementById('api-sub-model').value;
    apiConfig.temperature = parseFloat(document.getElementById('api-temp').value);

    localforage.setItem('Wx_Api_Config', apiConfig).then(() => {
        updateApiStatusText();
        alert('全局配置保存成功♪( ´▽｀)');
        if (shouldExit) closeSubPage('sub-api-config');
    });
};

function updateApiStatusText() {
    const statusEl = document.getElementById('api_status_text');
    if(statusEl) statusEl.innerText = apiConfig.main.key ? '已配置( ´▽｀)' : '未配置(T_T)';
}

function updateModelSelect(section, modelName) {
    const select = document.getElementById(`api-${section}-model`);
    let exists = false;
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === modelName) {
            select.selectedIndex = i;
            exists = true;
            break;
        }
    }
    if (!exists && modelName) {
        const opt = document.createElement('option');
        opt.value = modelName;
        opt.innerText = modelName;
        select.appendChild(opt);
        select.value = modelName;
    }
}

window.fetchModels = async function(section) {
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "wait...";
    try {
        let host = document.getElementById(`api-${section}-host`).value;
        const key = document.getElementById(`api-${section}-key`).value;
        if (!host) host = "https://generativelanguage.googleapis.com/v1beta"; 
        
        let fetchUrl = `${host.replace(/\/$/, '')}/models`;
        const isGoogle = host.includes('googleapis');
        if (isGoogle) fetchUrl += `?key=${key}`;
        
        const headers = isGoogle ? {} : { 'Authorization': `Bearer ${key}` };
        const res = await fetch(fetchUrl, { headers });
        const data = await res.json();
        
        let models = [];
        if (data.models) models = data.models.map(m => m.name.replace('models/', '')); 
        else if (data.data) models = data.data.map(m => m.id); 

        const select = document.getElementById(`api-${section}-model`);
        select.innerHTML = ''; 
        models.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m; opt.innerText = m;
            select.appendChild(opt);
        });
        alert(`拉取成功啦(≧∇≦)！！found ${models.length} models.`);
    } catch (e) {
        alert("拉取失败了呜呜呜(＞人＜；)：" + e.message);
    } finally {
        btn.innerText = originalText;
    }
};

window.clearApiSection = function(section) {
    document.getElementById(`api-${section}-host`).value = '';
    document.getElementById(`api-${section}-key`).value = '';
};

// 预设相关
window.showSavePresetAlert = function() { document.getElementById('preset-name-overlay').style.display = 'flex'; };
window.confirmSavePreset = function() {
    const name = document.getElementById('preset-name-input').value;
    if(!name) { alert('至少给个名字嘛(＞人＜；)！'); return; }
    const presetData = {
        name: name,
        main: {
            host: document.getElementById('api-main-host').value,
            key: document.getElementById('api-main-key').value,
            model: document.getElementById('api-main-model').value
        },
        sub: {
            host: document.getElementById('api-sub-host').value,
            key: document.getElementById('api-sub-key').value,
            model: document.getElementById('api-sub-model').value
        },
        temperature: document.getElementById('api-temp').value
    };
    apiPresets.push(presetData);
    localforage.setItem('Wx_Api_Presets', apiPresets).then(() => {
        renderPresetDropdown();
        document.getElementById('preset-name-overlay').style.display = 'none';
        document.getElementById('api-preset-select').value = name;
    });
};

function renderPresetDropdown() {
    const select = document.getElementById('api-preset-select');
    select.innerHTML = '<option value="">-- 切换预设 --</option>';
    apiPresets.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.name; opt.innerText = p.name;
        select.appendChild(opt);
    });
}
window.loadSelectedPreset = function() {
    const name = document.getElementById('api-preset-select').value;
    const preset = apiPresets.find(p => p.name === name);
    if(preset) {
        apiConfig.main = preset.main;
        apiConfig.sub = preset.sub;
        apiConfig.temperature = preset.temperature;
        renderApiUI();
    }
};

// 点击删除按钮 (替换原来的逻辑)
window.showDeletePresetAlert = function() { 
    // 直接调用确认逻辑
    confirmDeletePreset(); 
};

// 执行删除确认
window.confirmDeletePreset = function() {
    const select = document.getElementById('api-preset-select');
    const name = select.value;
    
    if (!name) {
        showSystemAlert('请先选择一个预设哦(￣▽￣)～');
        return;
    }

    // ★★★ 这里调用新版弹窗！ ★★★
    showConfirmDialog(`确定要删除预设\n“${name}” 吗？`, () => {
        // 用户点了 Yes 后执行：
        apiPresets = apiPresets.filter(p => p.name !== name);
        
        localforage.setItem('Wx_Api_Presets', apiPresets).then(() => {
            renderPresetDropdown(); // 刷新下拉框
            showSystemAlert('删除成功噜♪( ´▽｀)～');
        });
    });
};

// ====================
// [工具] 时间格式化 (智能版)
// ====================
function formatTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    
    // 1. 跨年判断：如果不是今年，显示完整年份
    if (year !== now.getFullYear()) {
        return `${year}年${month}月${day}日 ${hour}:${minute}`;
    }
    
    // 2. 如果是今天，只显示时间
    if (date.toDateString() === now.toDateString()) {
        return `${hour}:${minute}`;
    }
    
    // 3. 今年其他时间，显示日期+时间
    return `${month}月${day}日 ${hour}:${minute}`;
}

// ★ 新增：专门给总结页用的详细时间格式 (YYYY/MM/DD)
function formatSummaryTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    
    // 比如：2025/01/09 14:30
    return `${year}/${month}/${day} ${hour}:${minute}`;
}

// 覆盖 Alert
// === 新版：轻盈提示条 (Toast) ===
window.showSystemAlert = function(msg) {
    // 1. 如果屏幕上已经有一个提示条，先把它删掉 (防止重叠)
    const existing = document.getElementById('system-toast-container');
    if (existing) existing.remove();

    // 2. 创建新的提示元素
    const toast = document.createElement('div');
    toast.id = 'system-toast-container';
    toast.className = 'system-toast';
    toast.innerHTML = msg; // 支持换行符 <br>

    // 3. 放到页面里
    document.body.appendChild(toast);

    // 4. 稍微等一丢丢再加 .show，为了触发 CSS 的渐变动画
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // 5. 设定 2秒 后自动消失
    setTimeout(() => {
        // 先变透明
        toast.classList.remove('show');
        
        // 等透明动画(0.3s)播完，再把元素从 DOM 里删掉
        setTimeout(() => {
            if(toast.parentNode) toast.remove();
        }, 300); 
    }, 2000); // <--- 这里控制显示多久 (2000ms = 2秒)
};

// === 通用：关闭弹窗 (带退场动画) ===
window.closeAlertWithAnim = function(overlayId) {
    const el = document.getElementById(overlayId);
    if (!el) return;
    
    // 添加退场动画类
    el.classList.add('closing-anim');
    
    // 等动画播完 (200ms) 再真正隐藏
    setTimeout(() => {
        el.style.display = 'none';
        el.classList.remove('closing-anim'); // 清理现场，方便下次打开
    }, 200);
};

// === AI 口是心非撤回表演 ===
async function simulateAiRecall(fakeText, realText, quote) {
    // 1. 先把那句“心里话”发出去 (带上引用，因为这通常是情绪最激动的时候)
    sendMsg('other', fakeText, 'text', quote);
    
    // 2. 给用户一点时间看清楚 (1.5秒 - 3秒)
    // 越短越像手滑，越长越像挑衅，这里设为 2秒 刚好让你心跳漏一拍
    await new Promise(r => setTimeout(r, 2000));
    
    // 3. 找到刚才发的那条消息，把它撤回
    const chat = chatsData.find(c => c.id === currentChatId);
    if(chat && chat.messages.length > 0) {
        const lastMsg = chat.messages[chat.messages.length - 1];
        
        if(lastMsg.role === 'other') { 
            lastMsg.type = 'recall'; 
            lastMsg.originalText = fakeText; 
            delete lastMsg.text; 
            
            saveChatAndRefresh(chat); 
        }
    }
    
    // 4. 重点来了！这里要停顿久一点，表现出“慌乱打字找补”的感觉
    await new Promise(r => setTimeout(r, 1500));
    
    // 5. 发送那句“虚伪”的表面话 (不再带引用了，显得若无其事)
    sendMsg('other', realText, 'text', null); 
}

// ====================
// 加号菜单逻辑
// ====================

// 更新分页小点 (Scroll Snap 监听)
window.updatePlusDots = function(el) {
    const scrollLeft = el.scrollLeft;
    const width = el.offsetWidth;
    const pageIndex = Math.round(scrollLeft / width);
    
    document.getElementById('p-dot-0').className = pageIndex === 0 ? 'plus-dot active' : 'plus-dot';
    document.getElementById('p-dot-1').className = pageIndex === 1 ? 'plus-dot active' : 'plus-dot';
};

// ✅
window.toggleChatMenu = function() {
    // 只切换开关，剩下的全交给 CSS 动画！
    document.body.classList.toggle('menu-open');
};

// 点击消息区域关闭菜单 (增强版)
document.addEventListener('click', (e) => {
    // 如果菜单打开了，且点击的地方既不是加号按钮，也不是菜单本身
    if (document.body.classList.contains('menu-open')) {
        const isMenu = e.target.closest('.chat-plus-menu');
        const isBtn = e.target.closest('.cf-icon-btn'); // 加号按钮
        
        if (!isMenu && !isBtn) {
            document.body.classList.remove('menu-open');
        }
    }
});


let currentFrameTarget = null; // 记住你正在给谁换装

// 打开试衣间
window.openFrameLib = function(element) {
    currentFrameTarget = element;
    const overlay = document.getElementById('frame-lib-overlay');
    const grid = document.getElementById('frame-lib-grid');
    
    // 渲染列表 (如果还没渲染过)
    if (grid.children.length === 0) {
        renderFrameGrid();
    }
    
    overlay.style.display = 'flex';
};

window.closeFrameLib = function() {
    document.getElementById('frame-lib-overlay').style.display = 'none';
};


// === 头像框独立保存逻辑 ===
function applyFrame(url) {
    // 只有在聊天详情页，且有当前聊天对象时才能换
    if (!currentChatId) {
        showSystemAlert('要在聊天窗口里才能给TA换装哦qwq！');
        return;
    }

    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat) return;

    // 找到当前聊天的角色数据
    const contact = contactsData.find(c => c.id === chat.contactId);
    if (contact) {
        // 1. 视觉上立即应用
        const frameEl = document.getElementById('chat_layer_frame');
        if (frameEl) {
            frameEl.style.backgroundImage = `url('${url}')`;
        }
        
        // 2. 数据上保存给这个角色
        contact.frame = url;
        
        // 3. 写入数据库
        localforage.setItem('Wx_Contacts_Data', contactsData).then(() => {
            showSystemAlert('换上萌萌嘟头像框啦！！(≧∇≦)');
            closeFrameLib();
        });
    }
}

window.removeFrame = function() {
    if (!currentChatId) return;
    const chat = chatsData.find(c => c.id === currentChatId);
    const contact = contactsData.find(c => c.id === chat.contactId);
    
    if (contact) {
        const frameEl = document.getElementById('chat_layer_frame');
        if(frameEl) frameEl.style.backgroundImage = 'none';
        
        delete contact.frame; // 删除数据
        
        localforage.setItem('Wx_Contacts_Data', contactsData).then(() => {
            showSystemAlert('已恢复默认(≧▽≦)～');
            closeFrameLib();
        });
    }
};

// 上传自定义框 (保留原来的功能)
// 1. 渲染网格
function renderFrameGrid() {
    const grid = document.getElementById('frame-lib-grid');
    grid.innerHTML = '';
    
    AVATAR_FRAMES_DB.forEach(frame => {
        const item = document.createElement('div');
        item.className = 'frame-lib-item';

        item.innerHTML = `
            <div class="preview-face"></div> 
            <img src="${frame.url}" class="frame-lib-img" loading="lazy">
        `;
        
        item.onclick = () => applyFrame(frame.url);
        grid.appendChild(item);
    });
}

// 2. 上传自定义框 
window.triggerCustomFrameUpload = function() {
    if (currentFrameTarget) {
        handleImageUpload(currentFrameTarget);
    }
};

// === 新增：打开编辑弹窗 ===
window.openEditOverlay = function(text) {
    const overlay = document.getElementById('edit-msg-overlay');
    const input = document.getElementById('edit-msg-input');
    if(overlay && input) {
        input.value = text;
        overlay.style.display = 'flex';
        input.focus();
    } else {
        alert("宝宝，你是不是没在 index.html 里加那个 <div id='edit-msg-overlay'>...</div> 的代码呀？快去加！");
    }
};

// === 新增：关闭编辑弹窗 ===
window.closeEditOverlay = function() {
    const overlay = document.getElementById('edit-msg-overlay');
    if(overlay) overlay.style.display = 'none';
    currentEditMsgIndex = -1;
};

// === 新增：确认修改消息 ===
window.confirmEditMsg = function() {
    const input = document.getElementById('edit-msg-input');
    const newVal = input.value;
    
    if (newVal && currentEditChatId !== null && currentEditMsgIndex !== -1) {
        const chat = chatsData.find(c => c.id === currentEditChatId);
        if (chat && chat.messages[currentEditMsgIndex]) {
            // 修改数据
            chat.messages[currentEditMsgIndex].text = newVal;
            
            // 如果改的是最后一条，顺便更新列表页显示的预览
            if (currentEditMsgIndex === chat.messages.length - 1 && chat.messages[currentEditMsgIndex].type === 'text') {
                chat.lastMsg = newVal;
            }
            
            saveChatAndRefresh(chat);
            showSystemAlert('改好啦！神不知鬼不觉(^_−)−☆');
        }
    }
    closeEditOverlay();
};

// === 新增：加载更多消息 ===
function loadMoreMessages() {
    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat || !chat.messages || chat.messages.length <= currentRenderLimit) return;
    
    // 记住当前滚动的高度，为了加载完不乱跳
    const container = document.getElementById('chat-msg-area');
    const oldHeight = container.scrollHeight;
    
    // 多加载40条
    currentRenderLimit += 40;
    
    // 重新渲染（参数 false 代表不要自动滚到底部）
    renderMessages(currentChatId, false); 
    
    // 恢复滚动位置，让你感觉不到画面跳动
    const newHeight = container.scrollHeight;
    container.scrollTop = newHeight - oldHeight;
}

// ==========================================================
// [13] 数据备份与恢复
// ==========================================================

// 1. 导出所有数据 (Export)
window.exportAllData = async function() {
    try {
        showSystemAlert('正在打包所有回忆...(^_−)−☆');
        
        // 1. 准备数据包 (把家里所有角落都搜刮一遍)
        const backupData = {
            version: '2.0 (Pro Max)', // 版本号升级！
            timestamp: Date.now(),
            data: {
                // --- 核心数据 ---
                contacts: await localforage.getItem('Wx_Contacts_Data'),   // 角色
                personas: await localforage.getItem('Wx_Personas_Data'),   // 面具
                chats: await localforage.getItem('Wx_Chats_Data'),         // 聊天记录
                
                // --- 系统配置 ---
                apiConfig: await localforage.getItem('Wx_Api_Config'),     // API Key
                apiPresets: await localforage.getItem('Wx_Api_Presets'),   // API 预设
                memory: await localforage.getItem('XuShiyu_System_Data_V5'), // 你的壁纸、开关、文字修改
                
                // --- ★ 新增：朋友圈系统 ---
                moments: await localforage.getItem('Wx_Moments_Data'),
                
                // --- ★ 新增：表情包系统 ---
                stickers: await localforage.getItem('stickersData'),       // 你的自定义表情
                stickerGroups: await localforage.getItem('stickerGroups'), // 表情分组
                
                // --- ★ 新增：美化系统 ---
                themes: await localforage.getItem('Wx_Theme_Presets'),     // 主题预设
                globalFont: await localforage.getItem('Wx_Global_Font'),   // 全局字体链接
                
                // --- ★ 新增：LocalStorage 里的零碎数据 ---
                // (这些以前是存 LocalStorage 的，这次也一起打包！)
                favWidget: localStorage.getItem('My_Fav_Widget_Data'),     // 那个5人常驻好友组件
                toastSettings: localStorage.getItem('Wx_Toast_Settings')   // 吐司边框设置
            }
        };

        // 2. 生成文件
        const dataStr = JSON.stringify(backupData, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        // 3. 下载
        const a = document.createElement('a');
        a.href = url;
        const date = new Date();
        const dateStr = `${date.getMonth()+1}月${date.getDate()}日`;
        a.download = `kiyoPhone_全量备份_${dateStr}.json`; // 改个霸气的名字
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showSystemAlert('备份已下载！要收好哦(≧▽≦)！');

    } catch (e) {
        alert('导出失败惹(T_T)...: ' + e.message);
    }
};

// 2. 导入数据 (Import)
window.triggerImport = function() {
    // 动态创建文件选择框
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.style.display = 'none';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const json = JSON.parse(event.target.result);
                if (!json.data) throw new Error("格式不对哦，这是我的备份文件嘛！？");

                showSystemAlert('正在恢复海量回忆...wait...');

                const d = json.data;

                // --- 1. 恢复 IndexedDB 数据 ---
                const restoreTasks = [
                    d.contacts && localforage.setItem('Wx_Contacts_Data', d.contacts),
                    d.personas && localforage.setItem('Wx_Personas_Data', d.personas),
                    d.chats && localforage.setItem('Wx_Chats_Data', d.chats),
                    d.apiConfig && localforage.setItem('Wx_Api_Config', d.apiConfig),
                    d.apiPresets && localforage.setItem('Wx_Api_Presets', d.apiPresets),
                    d.memory && localforage.setItem('XuShiyu_System_Data_V5', d.memory),
                    
                    // 新功能
                    d.moments && localforage.setItem('Wx_Moments_Data', d.moments),
                    d.stickers && localforage.setItem('stickersData', d.stickers),
                    d.stickerGroups && localforage.setItem('stickerGroups', d.stickerGroups),
                    d.themes && localforage.setItem('Wx_Theme_Presets', d.themes),
                    d.globalFont && localforage.setItem('Wx_Global_Font', d.globalFont)
                ];

                // 等待所有数据库写入完成
                await Promise.all(restoreTasks);

                // --- 2. 恢复 LocalStorage 数据 (同步写入) ---
                if (d.favWidget) localStorage.setItem('My_Fav_Widget_Data', d.favWidget);
                if (d.toastSettings) localStorage.setItem('Wx_Toast_Settings', d.toastSettings);

                showSystemAlert('恢复成功噜！页面即将刷新(￣▽￣)～');
                
                // 稍微久一点再刷新，确保数据写完了
                setTimeout(() => location.reload(), 1500);

            } catch (err) {
                alert('恢复失败了啊哦...Σ（・□・；）: ' + err.message);
            }
        };
        reader.readAsText(file);
    };
    
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
};

// ====================
// [14] 新桌面逻辑
// ====================

// 1. 更新日历组件的日期
function updateWidgetDate() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    
    const dateEl = document.getElementById('widget_date_num');
    const dayEl = document.getElementById('widget_day_text');
    
    if(dateEl) dateEl.innerText = `${month}/${day}`;
    if(dayEl) dayEl.innerText = weekDays[now.getDay()];
}

// 2. 桌面滑动监听 (更新底部小圆点)
window.updateDesktopDots = function(el) {
    const scrollLeft = el.scrollLeft;
    const width = el.offsetWidth;
    // 计算当前是第几页 (0, 1, 2)
    const pageIndex = Math.round(scrollLeft / width);
    
    // 更新圆点样式
    [1, 2, 3].forEach(i => {
        const dot = document.getElementById(`d-dot-${i}`);
        if(dot) {
            dot.className = (i === pageIndex + 1) ? 'd-dot active' : 'd-dot';
        }
    });
};

// 3. 自动滚动输入 (你想要的编辑优化)
// 当任意 edit-text 聚焦时，确保它不被键盘遮挡
document.addEventListener('focusin', (e) => {
    if (e.target.classList.contains('edit-text')) {
        // 延迟一点点，等键盘弹起（虽然这是Web模拟，但如果是真手机有用）
        setTimeout(() => {
            e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
});

// 启动时调用一次日期更新
document.addEventListener('DOMContentLoaded', () => {
    updateWidgetDate();
    // 每天0点刷新一下日期
    setInterval(updateWidgetDate, 60000 * 60); 
});
// ====================
// [15] 朋友圈 Story 逻辑
// ====================
window.renderMomentsHeader = function() {
    // 1. 尝试找容器，兼容 class 和 id
    let container = document.querySelector('.ins-highlights-scroll');
    if(!container) return;
    
    container.innerHTML = '';

    // === 第一部分：固定显示“新建”按钮 ===
    const addBtn = document.createElement('div');
    addBtn.className = 'ins-highlight-item';
    // ★ 改成下面这句，就可以打开发布界面啦！
    addBtn.onclick = () => window.openPostCreator(); 
    addBtn.innerHTML = `
        <div class="ins-highlight-circle plus-btn">
            <svg viewBox="0 0 24 24" style="width:24px;height:24px;fill:#333"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </div>
        <div class="ins-highlight-text">New</div>
    `;
    container.appendChild(addBtn);

    // === 第二部分：显示“我” (Persona) ===
    const me = personasData[0]; // 获取你的第一个面具
    if(me) {
        const meItem = document.createElement('div');
        meItem.className = 'ins-highlight-item';
        meItem.innerHTML = `
            <div class="ins-highlight-circle upload-img" style="${getAvatarStyle(me.avatar)} border: 2px solid #007aff;"></div>
            <div class="ins-highlight-text edit-text">Me</div>
        `;
        // 点击“我”的头像可以换图
        meItem.querySelector('.upload-img').onclick = (e) => {
             e.stopPropagation();
             handleImageUpload(e.target);
        };
        container.appendChild(meItem);
    }

    // === 第三部分：显示“好友” (Contacts) ===
    contactsData.forEach(c => {
        const item = document.createElement('div');
        item.className = 'ins-highlight-item';
        item.innerHTML = `
            <div class="ins-highlight-circle" style="${getAvatarStyle(c.avatar)}"></div>
            <div class="ins-highlight-text">${c.name}</div>
        `;
        item.onclick = () => {
             showSystemAlert(`正在查看 ${c.name} 的回忆...`);
        };
        container.appendChild(item);
    });
};

// ====================
// [16] 通知与红点系统 (Notification System)
// ====================

// 更新桌面红点 & 底部Tab红点 (如果有的话)
window.updateGlobalBadges = function() {
    let totalUnread = 0;
    chatsData.forEach(c => {
        if(c.unread) totalUnread += c.unread;
    });

    // 1. 更新桌面图标红点
    const badgeEl = document.getElementById('desktop-badge-wechat');
    if(badgeEl) {
        if(totalUnread > 0) {
            badgeEl.innerText = totalUnread > 99 ? '99+' : totalUnread;
            badgeEl.classList.add('show');
        } else {
            badgeEl.classList.remove('show');
        }
    }
    
    // 2. 更新Dock栏或者Tab栏的红点，原理一样
};
// ====================
// [16] 通知系统 (最终完美版：消息连发时，每次都会重新弹窗！)
// ====================
let notificationTimer = null;

window.showNotification = function(name, text, rawAvatar) {
    const banner = document.getElementById('ios-notification');
    const nTitle = document.getElementById('notif-title');
    const nMsg = document.getElementById('notif-msg');
    const nAvatar = document.getElementById('notif-avatar');
    
    if(!banner || !nTitle || !nMsg || !nAvatar) return;

    // 1. 如果有旧的倒计时，先掐掉，防止它提前把新消息关了
    if (notificationTimer) {
        clearTimeout(notificationTimer);
        notificationTimer = null;
    }

    // 2. 更新内容
    nTitle.innerText = name;
    nMsg.innerText = text;
    
    // 解析头像
    let avatarUrl = '';
    if (rawAvatar && rawAvatar.includes('url(')) {
        const match = rawAvatar.match(/url\(['"]?(.*?)['"]?\)/);
        if (match && match[1]) avatarUrl = match[1];
    } else {
        avatarUrl = rawAvatar;
    }

    if (avatarUrl) {
        nAvatar.style.backgroundImage = `url('${avatarUrl}')`;
        nAvatar.style.backgroundColor = 'transparent';
    } else {
        nAvatar.style.backgroundImage = 'none';
        nAvatar.style.backgroundColor = '#ddd'; 
    }
    
    // ★★★ 核心魔法：强制重启动画！ ★★★
    // 1. 先移除 class
    banner.classList.remove('show');
    
    // 2. 强制浏览器“回流” (Reflow) —— 这句代码虽然看起来没用，但它是为了打断浏览器的渲染合并
    void banner.offsetWidth; 
    
    // 3. 再加上 class，这样动画就会重新播放一次！
    banner.classList.add('show');

    // 3. 重新开始 3秒 倒计时
    notificationTimer = setTimeout(() => {
        banner.classList.remove('show');
        notificationTimer = null;
    }, 3000);
};

// ====================
// [17] 聊天控制面板逻辑 (Chat Control)
// ====================
window.openChatControl = function() {
    if (!currentChatId) return;
    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat) return;

    // 获取双方数据
    const contact = contactsData.find(c => c.id === chat.contactId) || {name: '未知', avatar: ''};
    const persona = personasData.find(p => p.id === chat.personaId) || {name: 'Me', avatar: ''};

    // 1. 填充双人头像 (同步！)
    document.getElementById('cc-char-name-big').innerText = contact.name;
    document.getElementById('cc-char-avatar-big').style.backgroundImage = getAvatarStyle(contact.avatar).replace('background-image: ', '').replace(';', '');
    
    document.getElementById('cc-user-name-big').innerText = persona.name;
    document.getElementById('cc-user-avatar-big').style.backgroundImage = getAvatarStyle(persona.avatar).replace('background-image: ', '').replace(';', '');

    // 2. 填充私有备注
    document.getElementById('cc-private-alias').value = contact.privateAlias || '';

    // 3. ★★★ 相识天数计算 ★★★
    // 如果没有记录 createTime，就用 chat.id (通常是时间戳)
    const startTime = chat.createTime || chat.id; 
    const diff = Date.now() - startTime;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('cc-friend-days').innerText = days + 1; // 第一天也算一天！

    // 4. 填充逻辑开关
    document.getElementById('cc-switch-time').checked = (chat.enableTime !== false); 
    
    // 5. 填充记忆条数 (只留这一段！)
    const limit = chat.contextLimit || 20; 
    const limitInput = document.getElementById('cc-ctx-limit');
    if (limit >= 99999) {
        limitInput.value = ""; // 无限模式显示为空
    } else {
        limitInput.value = limit;
    }

    // 显示面板
    const panel = document.getElementById('chat-control-overlay');
    panel.style.display = 'flex';
    setTimeout(() => panel.classList.add('active'), 10);
};

window.closeChatControl = function() {
    const panel = document.getElementById('chat-control-overlay');
    panel.classList.remove('active');
    setTimeout(() => panel.style.display = 'none', 300);
    

    if(currentChatId) renderMessages(currentChatId);
};

// 实时更新 Token 预测 & 显示数值
window.updateTokenPredict = function(val) {
    document.getElementById('cc-ctx-display').innerText = val;

    const estimated = 500 + (val * 50 * 1.5); 
    document.getElementById('cc-token-predict').innerText = `~${Math.floor(estimated)}`;
    
    // 既然拖动了，就顺手保存一下
    saveChatSettings();
};

// 保存所有设定
window.saveChatSettings = function() {
    if (!currentChatId) return;
    const chat = chatsData.find(c => c.id === currentChatId);
    const contact = contactsData.find(c => c.id === chat.contactId);
    
    if (chat && contact) {
        // 1. 保存备注
        const newAlias = document.getElementById('cc-private-alias').value;
        contact.privateAlias = newAlias;
        
        // 2. 保存 Chat 设定
        chat.enableTime = document.getElementById('cc-switch-time').checked;
        
        // ★★★ 核心修改：读取新的数字框 ★★★
        const limitInput = document.getElementById('cc-ctx-limit');
        let val = parseInt(limitInput.value);
        // 如果填了0、负数或者空的，就存一个超大数字代表“无限”
        chat.contextLimit = (isNaN(val) || val <= 0) ? 99999 : val;
        
        // 写入数据库
        if(window.localforage) {
            localforage.setItem('Wx_Contacts_Data', contactsData);
            localforage.setItem('Wx_Chats_Data', chatsData);
        }

        // 更新顶栏名字
        const nameEl = document.getElementById('chat_layer_name');
        if(nameEl) nameEl.innerText = newAlias || contact.name;
    }
};

// 1. 跳转到编辑页 (带“回城”标记)
window.jumpToEditor = function(type) {
    if (!currentChatId) return;
    const chat = chatsData.find(c => c.id === currentChatId);
    
    // ★ 标记：我是从详细设定跳过来的！
    window._isReturningToControl = true;

    
    if (type === 'char') {
        creatorMode = 'character'; 
        openCreatorPage(chat.contactId);
    } else {
        creatorMode = 'persona'; 
        openCreatorPage(chat.personaId);
    }
};

// 2. 结束编辑/关闭资料卡 (平滑回城)
function finishCreatorAction(tabToRefresh) {

    if (!window._isReturningToControl) {
        if (window.switchContactTab) switchContactTab(tabToRefresh);
    }
    
    // 关闭资料卡页面
    const page = document.getElementById('sub-page-creator');
    if (page) {
        page.classList.remove('active');
        setTimeout(() => { 
            page.style.display = 'none'; 
            page.style.zIndex = ''; // 还原层级
        }, 300);
    }

    // ★ 关键修改：如果是回城模式，刷新一下底下的详细设定面板
    if (window._isReturningToControl) {
        // 重新调用一下 openChatControl 相当于刷新数据（因为你可能刚改了头像名字）
        if(window.openChatControl) window.openChatControl(); 
        
        // 撕掉标记，下次就是正常模式了
        window._isReturningToControl = false; 
    }
}

// ====================
// [18] 聊天背景上传 (Wallpaper Upload)
// ====================
window.triggerBgUpload = function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                const url = `url('${evt.target.result}')`;
                // 保存到 chat 对象
                const chat = chatsData.find(c => c.id === currentChatId);
                if(chat) {
                    chat.bgImage = url;
                    localforage.setItem('Wx_Chats_Data', chatsData).then(() => {
                        // 如果当前就在这个聊天里，立即应用
                        const msgArea = document.getElementById('chat-msg-area');
                        if (msgArea) {
                            msgArea.style.backgroundImage = url;
                            msgArea.style.backgroundSize = 'cover';
                            msgArea.style.backgroundPosition = 'center';
                            msgArea.style.backgroundAttachment = 'fixed';
                        }
                        showSystemAlert('聊天背景换好啦(￣▽￣)～');
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
};

// ====================
// [20] 页面初始化监听 (防止红点刷新消失)
// ====================
window.addEventListener('load', () => {
    // 1. 恢复全局红点
    if (window.updateGlobalBadges) window.updateGlobalBadges();
    
    // 2. 如果刚好停留在消息列表页，刷新列表
    if (document.querySelector('.wx-tab-item.active') && 
        document.querySelector('.wx-tab-item.active').innerText.includes('微信')) {
        if (window.renderChatList) window.renderChatList();
    }
});
// ==========================================================
// [21] 聊天总结 (Summary) 系统
// ==========================================================

// === 辅助：设置背景图 (防止 CSS 干扰) ===
function applyAvatarStyle(elementId, avatarStr) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.style.backgroundImage = '';
    // 如果是 url(...) 格式，提取出来
    const urlMatch = avatarStr && avatarStr.match(/url\(['"]?(.*?)['"]?\)/);
    const url = urlMatch ? urlMatch[1] : avatarStr;
    
    if (url && url !== 'undefined' && url !== 'null') {
        el.style.backgroundImage = `url('${url}')`;
    } else {
        el.style.backgroundColor = '#f0f0f0'; // 默认灰
    }
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
}

// === 1. 详细设定 (Chat Control) ===
window.openChatControl = function() {
    if (!currentChatId) return;
    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat) return;

    // 获取双方数据
    const contact = contactsData.find(c => c.id === chat.contactId) || {name: '未知', avatar: ''};
    const persona = personasData.find(p => p.id === chat.personaId) || {name: 'Me', avatar: ''};

    // 填充名字
    document.getElementById('cc-char-name-big').innerText = contact.name;
    document.getElementById('cc-user-name-big').innerText = persona.name;

    // 同步头像
    applyAvatarStyle('cc-char-avatar-big', contact.avatar);
    applyAvatarStyle('cc-user-avatar-big', persona.avatar);

    // 填充其他数据
    document.getElementById('cc-private-alias').value = contact.privateAlias || '';
    
    // 相识天数
    const startTime = chat.createTime || chat.id; 
    const diff = Date.now() - startTime;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('cc-friend-days').innerText = days + 1;

    // 开关状态
    document.getElementById('cc-switch-time').checked = (chat.enableTime !== false); 
    const limit = chat.contextLimit || 20;
    const limitInput = document.getElementById('cc-ctx-limit');
    if (limitInput) {
        // 如果是无限模式(99999)，就让输入框显示为空，否则显示数字
        limitInput.value = (limit >= 99999) ? "" : limit;
    }

    // 显示面板
    const panel = document.getElementById('chat-control-overlay');
    panel.style.display = 'flex';
    setTimeout(() => panel.classList.add('active'), 10);
};


// ==========================================================
// ★ 总结页核心逻辑 (INS风双人头像 + 列表渲染)
// ==========================================================

// 打开总结页
window.openSummaryPage = function() {
    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat) return;

    // 1. ★ 渲染漂亮的头部 (双人头像)
    renderSummaryHeader();

    // 2. 渲染列表
    renderSummaries();
    
    // 3. 显示页面
    const page = document.getElementById('sub-page-summary');
    if(page) {
        page.style.display = 'flex';
        // 强制重绘，保证动画生效
        requestAnimationFrame(() => {
            page.classList.add('active');
        });
    }
};

// ★ 新增：渲染总结页头部 (双人头像模式)
window.renderSummaryHeader = function() {
    // 1. 找容器
    const headerContainer = document.querySelector('.ins-memory-header');
    if (!headerContainer) return;

    // 2. 准备默认数据
    let charName = 'TA';
    let userName = 'Me';
    let charAvatar = ''; 
    let userAvatar = '';

    // 3. 抓取当前聊天的最新头像 (实时同步！)
    if (currentChatId) {
        const chat = chatsData.find(c => c.id === currentChatId);
        if (chat) {
            const contact = contactsData.find(c => c.id === chat.contactId);
            const persona = personasData.find(p => p.id === chat.personaId);
            
            if (contact) {
                charName = contact.name;
                // 提取 url(...) 里的纯链接
                charAvatar = contact.avatar.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
            }
            if (persona) {
                userName = persona.name;
                userAvatar = persona.avatar.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
            }
        }
    }

    // 4. 写入漂亮的 HTML (对应图3的效果)
    headerContainer.innerHTML = `
        <div class="ins-header-v2">
            <div class="ins-avatar-pair">
                <div class="avatar-circle" style="background-image: url('${charAvatar}')"></div>
                <div class="avatar-circle" style="background-image: url('${userAvatar}')"></div>
                <div class="ins-connect-icon">❤️</div> 
            </div>
            
            <div class="ins-header-info">
                <div class="ins-header-title">${charName} & ${userName}</div>
                <div class="ins-header-sub">Shared Memories</div>
            </div>
        </div>

        <div class="ins-action-row">
            <div class="ins-action-pill ai" onclick="confirmAiSummary()">
                <span class="icon">🩶</span>
                <span>AI Generate</span>
            </div>
            <div class="ins-action-pill write" onclick="openNoteEditor()">
                <span class="icon">🌧️</span>
                <span>Record</span>
            </div>
        </div>
    `;
};

// === 渲染总结列表 (新版：横向日记卡片) ===
window.renderSummaries = function() {
    const container = document.getElementById('summary-list-container');
    if (!container) return;
    container.innerHTML = ''; 
    const chat = chatsData.find(c => c.id === currentChatId);
    if(!chat) return;
    
    const summaries = chat.summaries || [];
    
    // 空状态
    if(summaries.length === 0) {
        container.innerHTML = `<div style="width:100%; text-align:center; padding-top:60px; color:#ccc;"><div style="font-size:40px; margin-bottom:10px;">🌧️</div>写下第一篇回忆吧...</div>`;
        // 恢复容器样式以免 flex 影响空状态居中
        container.style.display = 'block'; 
        return;
    } else {
        container.style.display = 'flex'; // 有数据时恢复 flex
    }

    // 倒序渲染
    [...summaries].reverse().forEach((sum, index) => {
        const realIndex = summaries.length - 1 - index; 
        
        const card = document.createElement('div');
        card.className = 'ins-diary-card'; // ★ 用新的 CSS 类名
        
        const dateObj = new Date(sum.time);
        // 大大的背景日期 (如: 24)
        const dayNum = dateObj.getDate(); 
        // 详细日期 (如: 2026.01.24 / Fri)
        const fullDate = `${dateObj.getFullYear()}.${(dateObj.getMonth()+1).toString().padStart(2,'0')}.${dayNum.toString().padStart(2,'0')}`;
        
        card.innerHTML = `
            <div class="diary-date">${dayNum}</div>
            <div class="diary-real-date">
                <span>★</span> ${fullDate}
            </div>
            <div class="diary-content edit-text" contenteditable="true" style="white-space: pre-wrap;">${sum.text}</div>
        `;
        
        // 绑定编辑事件 (使用 innerText 才能保留换行！)
        const contentEl = card.querySelector('.diary-content');
        contentEl.addEventListener('blur', function() {
            // ★ 核心：保存时读取 innerText，它包含 \n
            if(this.innerText !== sum.text) {
                chat.summaries[realIndex].text = this.innerText; 
                saveChatAndRefresh(chat);
            }
        });

        // 绑定长按删除 (复用之前的逻辑)
        let pressTimer;
        const startPress = () => {
             pressTimer = setTimeout(() => {
                 if(navigator.vibrate) navigator.vibrate(50);
                 showGlobalConfirm("Delete Diary", "要撕掉这页日记吗？(T_T)...", () => {
                     chat.summaries.splice(realIndex, 1);
                     saveChatAndRefresh(chat);
                     renderSummaries(); 
                 });
             }, 800);
        };
        const cancelPress = () => clearTimeout(pressTimer);

        card.addEventListener('touchstart', startPress, { passive: true });
        card.addEventListener('touchend', cancelPress);
        card.addEventListener('touchmove', cancelPress);
        
        // 电脑端兼容
        card.addEventListener('mousedown', startPress);
        card.addEventListener('mouseup', cancelPress);
        card.addEventListener('mouseleave', cancelPress);

        container.appendChild(card);
    });
};

// === 拍立得图片预览功能 ===
function previewImage(input, imgId) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            // 找到对应的 img 标签并修改 src
            document.getElementById(imgId).src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// === 确认 AI 总结 (已集成自定义弹窗) ===
window.confirmAiSummary = function() {
    const chat = chatsData.find(c => c.id === currentChatId);
    if(chat) {
        const lastSumTime = chat.lastSummaryTime || 0;
        const newMsgs = (chat.messages || []).filter(m => m.timestamp > lastSumTime);
        if(newMsgs.length < 5) {
            return showSystemAlert('才说了两句话就要总结嘛？再聊聊呗～(＞﹏＜)');
        }
    }
    
    // ★★★ 核心修改在这里 ★★★
    showGlobalConfirm(
        "Generate Summary", 
        "确定要让 TA 回忆这段故事嘛？\n这将会消耗 API 额度喔～", 
        function() {
            triggerAiSummary(); // 只有点了确认才开始生成
        }
    );
};

// 打开手动记录弹窗
window.openNoteEditor = function() {
    const overlay = document.getElementById('note-editor-overlay');
    const input = document.getElementById('note-editor-input');
    
    // 每次打开先解绑旧事件，防止重复绑定导致触发多次
    const saveBtn = overlay.querySelector('.alert-btn.confirm');
    const newSaveBtn = saveBtn.cloneNode(true); 
    saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);

    const cancelBtn = overlay.querySelector('.alert-btn.cancel');
    const newCancelBtn = cancelBtn.cloneNode(true);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

    if(overlay && input) {
        input.value = ''; 
        overlay.style.display = 'flex';
        setTimeout(() => input.focus(), 100);
        
        newSaveBtn.onclick = () => {
            const text = input.value.trim();
            if(text) {
                saveSummaryToChat(text, 'manual');
                overlay.style.display = 'none';
            }
        };
        
        newCancelBtn.onclick = () => overlay.style.display = 'none';
    } else {
        const text = prompt("写下此刻的心情或总结₍^˶ ╸ 𖥦 ╸˵^₎⟆：");
        if(text) saveSummaryToChat(text, 'manual');
    }
};


// ★★★ 核心：AI 总结逻辑 (人设增强版) ★★★
async function triggerAiSummary() {
    const chat = chatsData.find(c => c.id === currentChatId);
    if(!chat) return;

    const contact = contactsData.find(c => c.id === chat.contactId) || { name: 'TA', persona: '未知' };
    const persona = personasData.find(p => p.id === chat.personaId) || { name: '我', persona: '未知' };

    const lastSumTime = chat.lastSummaryTime || 0;
    const newMsgs = (chat.messages || []).filter(m => m.timestamp > lastSumTime && m.type === 'text');
    
    // 构建 Prompt
    const charInfo = `
    【角色A (Char)】
    - 名字: ${contact.name}
    - 性格内核: ${contact.persona}
    - 详细设定: ${contact.desc || '无'}
    - 基础属性: ${contact.gender || '未知'} | ${contact.age || '未知'}岁
    `;

    const userInfo = `
    【角色B (User)】
    - 名字: ${persona.name}
    - 性格特征: ${persona.persona}
    - 详细设定: ${persona.desc || '无'}
    - 基础属性: ${persona.gender || '未知'} | ${persona.age || '未知'}岁
    `;

    // 格式化对话
    const historyText = newMsgs.map(m => 
        `[${m.role === 'me' ? persona.name : contact.name}]: ${m.text}`
    ).join('\n');
    
    const prompt = `
    【指令：沉浸式剧情回顾】
    请以【第三人称上帝视角】回顾以下两位角色之间的最新互动，写一段充满画面感和氛围感的情节总结。

    ${charInfo}
    ${userInfo}

    【对话内容】：
    ${historyText}

    【写作要求】：
    1. **心理侧写**：结合人设解读台词背后的潜台词。比如Char的冷淡是否掩饰着关心？User的活泼是否为了活跃气氛？
    2. **场景构建**：不要干巴巴的复述对话。请脑补他们对话时的场景（如：窗外的雨声、咖啡厅的角落、深夜的微光），通过环境描写烘托氛围。
    3. **文风**：细腻、感性，像是一篇短篇小说的片段。拒绝流水账。
    4. **称呼**：直接使用 ${contact.name} 和 ${persona.name}。
    5. **字数**：300-500字。

    请开始创作：
    `;

    showSystemAlert('TA正在努力回忆中...(＞人＜;)');

    try {
        const summary = await callApiInternal(prompt);
        if(summary) {
            saveSummaryToChat(summary, 'ai');
            // 更新最后总结时间戳
            chat.lastSummaryTime = newMsgs[newMsgs.length - 1].timestamp;
            saveChatAndRefresh(chat);
        }
    } catch(e) {
        console.error(e);
        showSystemAlert('灵感枯竭了(API错误)...(T_T)');
    }
}

// 保存辅助函数
function saveSummaryToChat(text, type = 'manual') {
    const chat = chatsData.find(c => c.id === currentChatId);
    if(!chat) return;
    
    if(!chat.summaries) chat.summaries = [];
    
    chat.summaries.push({
        text: text,
        time: Date.now(),
        type: type // 'ai' 或 'manual'
    });
    
    saveChatAndRefresh(chat); 
    renderSummaries();        
    showSystemAlert('回忆保存成功噜♪( ´▽｀)～');
}

// ==========================================================
// [22] 朋友圈/动态 (Moments) 逻辑
// ==========================================================

let momentsData = []; // 存储动态数据
let tempPostImg = null; // 临时存储发布时的图片

// 1. 初始化加载动态数据
window.initMoments = function() {
    localforage.getItem('Wx_Moments_Data').then(data => {
        momentsData = data || [];
        renderMomentsFeed();
    });
};
// 绑定到页面加载
document.addEventListener('DOMContentLoaded', window.initMoments);


// 2. 打开/关闭 发布器
window.openPostCreator = function() {
    document.getElementById('post-text-input').value = "";
    document.getElementById('post-img-preview-area').innerHTML = `
        <div onclick="triggerPostImgUpload()" style="width: 80px; height: 80px; background: #f7f7f7; border-radius: 4px; display: flex; justify-content: center; align-items: center; cursor: pointer;">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="#ccc"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </div>`;
    tempPostImg = null;
    openSubPage('sub-page-post-creator');
};

// 3. 触发图片上传 (发布器用)
window.triggerPostImgUpload = function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                tempPostImg = evt.target.result; // 存 Base64
                // 显示预览
                const area = document.getElementById('post-img-preview-area');
                // 插入到加号前面
                const div = document.createElement('div');
                div.className = 'preview-img-box';
                div.style.backgroundImage = `url('${tempPostImg}')`;
                div.innerHTML = `<div class="preview-del-btn" onclick="this.parentNode.remove(); tempPostImg=null;">×</div>`;
                area.prepend(div);
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
};

// 4. 发布动态 (核心逻辑)
window.publishPost = function() {
    const text = document.getElementById('post-text-input').value;
    const privacy = document.getElementById('post-privacy-select').value;
    
    if (!text && !tempPostImg) {
        showSystemAlert('写点什么吧(๑＞＜)☆～');
        return;
    }

    // 获取当前“我”的信息
    const me = personasData[0] || { name: 'Me', avatar: '' };

    const newPost = {
        id: Date.now(),
        author: {
            name: me.name,
            avatar: me.avatar
        },
        content: text,
        image: tempPostImg,
        time: Date.now(),
        privacy: privacy, // public, private, friends
        likes: 0,
        isLiked: false
    };

    momentsData.unshift(newPost); // 加到最前面
    localforage.setItem('Wx_Moments_Data', momentsData).then(() => {
        showSystemAlert('发布成功啦～');
        closeSubPage('sub-page-post-creator');
        renderMomentsFeed();
        
        // 更新一下上面的帖子数
        const countEl = document.querySelector('.ins-stats b');
        if(countEl) countEl.innerText = momentsData.length;
    });
};

// 5. 渲染动态流 (Feed)
window.renderMomentsFeed = function() {
    const container = document.getElementById('moments-feed-container');
    if (!container) return;
    container.innerHTML = '';

    if (momentsData.length === 0) {
        container.innerHTML = `<div style="padding: 50px; text-align: center; color: #ccc; font-size: 12px;">还没有动态哦(𓐍ㅇㅂㅇ𓐍)，点击上方的 + 发一条吧！</div>`;
        return;
    }

    momentsData.forEach(post => {
        const card = document.createElement('div');
        card.className = 'moment-card';
        card.style.borderBottom = '1px solid #f0f0f0'; 
        
        const avatarStyle = getAvatarStyle(post.author.avatar);
        const timeStr = formatTime(post.time);
        
        let imgHtml = '';
        if (post.image) {
            imgHtml = `<div class="m-card-media" style="margin-top:10px;"><img src="${post.image}" class="m-single-img" style="border-radius:8px; max-height:350px; width:auto; max-width:100%; object-fit:contain;" loading="lazy"></div>`;
        }

        // 评论区显示逻辑
        const showCommentBox = post.isLiked || (post.likes > 0) ? 'show' : '';

        const likeIconHtml = post.isLiked 
            ? `<svg viewBox="0 0 24 24" style="width:24px; height:24px; fill:#000;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
            : `<img src="https://i.postimg.cc/K4hy2zDX/wu-biao-ti117-20260110142016.png" style="width:24px; height:24px;">`;

        card.innerHTML = `
            <div class="m-card-header">
                <div class="m-card-avatar" style="${avatarStyle}"></div>
                <div style="flex:1;">
                    <div class="m-card-user">${post.author.name}</div>
                    <div style="font-size:11px; color:#999;">${post.privacy === 'private' ? '🔒 ' : ''}${timeStr}</div>
                </div>
                <div class="m-card-more" onclick="deleteMoment(${post.id})">•••</div>
            </div>
            
            <div style="padding:0 15px;">
                 <div class="m-caption" style="margin:5px 0;">${post.content}</div>
                 ${imgHtml}
            </div>

            <div class="m-action-bar" style="margin-top:5px; justify-content: flex-start; gap: 15px;">
                <div class="m-icon-btn" id="like-btn-${post.id}" onclick="toggleLike(${post.id})">
                    ${likeIconHtml}
                </div>
                
                <div class="m-icon-btn" onclick="alert('评论功能开发中...(≧∇≦)')">
                     <img src="https://i.postimg.cc/6TxNX3Lk/wu-biao-ti117-20260110142025.png" style="width:24px; height:24px;">
                </div>
                
                <div class="m-icon-btn" style="margin-left:auto;">
                    <img src="https://i.postimg.cc/V5Pc86B2/wu-biao-ti117-20260110142036.png" style="width:24px; height:24px;">
                </div>
            </div>

            <div class="m-content-area" style="padding-bottom:15px;">
                <div id="comment-box-${post.id}" class="m-comment-box ${showCommentBox}">
                    <div class="m-like-row">
                        <svg class="m-like-icon" viewBox="0 0 24 24" style="fill:#000; border:none;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        <span id="like-count-${post.id}">${post.likes}</span> likes
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
};

// 6. 点赞功能
window.toggleLike = function(id) {
    const post = momentsData.find(p => p.id === id);
    if (post) {
        // 更新数据
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        if(post.likes < 0) post.likes = 0;

        // 局部更新 UI 
        const btn = document.getElementById(`like-btn-${id}`);
        const countSpan = document.getElementById(`like-count-${id}`);
        const commentBox = document.getElementById(`comment-box-${id}`);
        
        if (btn) {
            //如果点赞了：塞入实心黑色 SVG
            if(post.isLiked) {
                btn.innerHTML = `<svg viewBox="0 0 24 24" style="width:24px; height:24px; fill:#000;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
                // 震动一下
                if(navigator.vibrate) navigator.vibrate(30);
            } 
            // ★ 如果取消赞：塞回你的空心 PNG
            else {
                btn.innerHTML = `<img src="https://i.postimg.cc/K4hy2zDX/wu-biao-ti117-20260110142016.png" style="width:24px; height:24px;">`;
            }
        }
        
        if (countSpan) countSpan.innerText = post.likes;
        
        // 控制底部灰框显示
        if (commentBox) {
            if (post.likes > 0) commentBox.classList.add('show');
            else commentBox.classList.remove('show');
        }

        //保存
        localforage.setItem('Wx_Moments_Data', momentsData);
    }
};

// 7. 删除功能 (点击三个点触发)
window.deleteMoment = function(id) {
    if(confirm("要删除这条动态吗？")) {
        momentsData = momentsData.filter(p => p.id !== id);
        localforage.setItem('Wx_Moments_Data', momentsData).then(() => {
            renderMomentsFeed();
            // 更新上面的计数
            const countEl = document.querySelector('.ins-stats b');
            if(countEl) countEl.innerText = momentsData.length;
        });
    }
};

// =================================================================
// ★★★主题与美化系统★★★
// =================================================================

let tempIconEdits = {}; 
let toastSettings = { enabled: false, color: '#ffffff', width: 3 }; 

// =================================================================
// [1] 初始化美化界面 (包含：图标编辑、吐司边框、字体设置、主题预设)
// =================================================================
window.initIconSettingsGrid = function() {
    const container = document.getElementById('icon-setting-grid');
    if (!container) return;
    
    container.innerHTML = ''; 
    tempIconEdits = {}; 

    // --- Part 1: 回显面包边 (Toast) 设置 ---
    const savedToast = JSON.parse(localStorage.getItem('Wx_Toast_Settings') || '{"enabled":false,"color":"#ffffff","width":3}');
    toastSettings = savedToast;

    // 同步UI组件
    const switchEl = document.getElementById('toast-border-switch');
    if(switchEl) switchEl.checked = toastSettings.enabled;
    
    const colorEl = document.getElementById('toast-color-input');
    if(colorEl) colorEl.value = toastSettings.color;
    
    const widthSlider = document.getElementById('toast-width-slider');
    const widthVal = document.getElementById('toast-width-val');
    if(widthSlider) {
        widthSlider.value = toastSettings.width || 3;
        if(widthVal) widthVal.innerText = (toastSettings.width || 3) + 'px';
    }

    // 强制刷新 UI 状态
    toggleToastUI(toastSettings.enabled);

    // --- Part 2: 生成图标编辑器 (遍历桌面真实APP) ---
    const targetApps = document.querySelectorAll('.desktop-page .app-item:not(.empty), #dockGrid .app-item');
    targetApps.forEach(item => {
        const iconEl = item.querySelector('.app-icon');
        const nameEl = item.querySelector('.app-name');
        
        if (iconEl && iconEl.id) {
            let currentBg = iconEl.style.backgroundImage;
            if (!currentBg || currentBg === 'none' || currentBg === 'initial' || currentBg === '') {
                currentBg = window.getComputedStyle(iconEl).backgroundImage;
            }
            if (!currentBg || currentBg === 'none') currentBg = ''; 
            else currentBg = currentBg.replace(/"/g, "'"); 

            let currentName = nameEl ? nameEl.innerText : 'Dock App';

            const card = document.createElement('div');
            card.className = 'icon-edit-card';
            card.innerHTML = `
                <div class="icon-preview-box" id="preview_${iconEl.id}" 
                     onclick="triggerTempImgUpload('${iconEl.id}')" 
                     style="background-image: ${currentBg}; background-color: #f0f0f0;"></div>
                <div class="icon-input-area">
                    <span class="icon-label-static">App Icon</span>
                    <input type="text" class="icon-name-input" 
                           value="${currentName}" 
                           oninput="handleTempNameChange('${iconEl.id}', this.value)" 
                           placeholder="Name">
                </div>
            `;
            container.appendChild(card);
        }
    });

    // --- Part 3: ★ 全局字体设置 (升级版！) ---
    const fontCard = document.createElement('div');
    fontCard.className = 'font-setting-card';
    fontCard.innerHTML = `
        <div style="font-size:14px; font-weight:600; margin-bottom:15px; color:#333;">全局字体 (Global Font)</div>
        
        <div class="font-input-group">
            <input type="text" id="font-url-input" class="font-url-input" placeholder="输入链接 或 点击下方导入...(𓐍ㅇㅂㅇ𓐍)">
        </div>

        <div class="font-input-group" style="margin-top: 8px;">
            <div onclick="triggerFileUpload()" style="
                width: 100%;
                background: rgba(0,0,0,0.03);
                color: #007aff;
                padding: 10px;
                border-radius: 12px;
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                border: 1px dashed #c7c7cc;
                transition: all 0.2s;
            " onmouseover="this.style.background='rgba(0,0,0,0.06)'" onmouseout="this.style.background='rgba(0,0,0,0.03)'">
                📂 从本地文件导入 (.ttf / .otf)
            </div>
        </div>
        
        <div class="font-input-group">
            <div class="font-btn apply" onclick="applyUserFont()">应用链接</div>
            <div class="font-btn reset" onclick="resetUserFont()">恢复默认</div>
        </div>

        <div class="font-preview-box">
            <div class="font-preview-text" id="font-preview-text">12:30 Hello 你好喔。</div>
            <div class="font-preview-sub">预览效果 Preview</div>
        </div>
    `;
    
    // 把字体卡片加到列表最下面
    container.appendChild(fontCard);
    
    // 回显当前字体链接
    localforage.getItem('Wx_Global_Font').then(url => {
        if(url && document.getElementById('font-url-input')) {
            // 如果是很长很长的 base64 (文件导入的)，就显示个提示，不显示乱码
            if (url.startsWith('data:')) {
                document.getElementById('font-url-input').value = "[已使用本地文件]";
            } else {
                document.getElementById('font-url-input').value = url;
            }
        }
    });

    // --- Part 4: 加载主题预设 ---
    loadThemePresets(); 
};

// [2] 暂存修改 (图标名字)
window.handleTempNameChange = function(id, newName) {
    if (!tempIconEdits[id]) tempIconEdits[id] = {};
    tempIconEdits[id].name = newName;
};

// [3] 暂存图片 (点击预览图换图标)
window.triggerTempImgUpload = function(id) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                const url = `url('${evt.target.result}')`;
                const previewEl = document.getElementById(`preview_${id}`);
                if(previewEl) previewEl.style.backgroundImage = url;
                
                if (!tempIconEdits[id]) tempIconEdits[id] = {};
                tempIconEdits[id].bg = url;
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
};

// [4] 应用所有修改 (点击 Save 按钮)
window.applyIconChanges = function() {
    for (let id in tempIconEdits) {
        const edit = tempIconEdits[id];
        const iconEl = document.getElementById(id);
        if (iconEl) {
            if (edit.bg) iconEl.style.backgroundImage = edit.bg;
            const parent = iconEl.parentElement;
            if (parent) {
                const nameEl = parent.querySelector('.app-name');
                if (edit.name && nameEl) nameEl.innerText = edit.name;
            }
        }
    }
    updateGlobalToastStyle();
    saveMemory(); 
    localStorage.setItem('Wx_Toast_Settings', JSON.stringify(toastSettings));
    
    tempIconEdits = {}; 
    showSystemAlert('桌面美化保存成功啦(𓐍ㅇㅂㅇ𓐍)～', 'success');
    closeSubPage('sub-icon');
};

// [5] 吐司边框逻辑集合
window.toggleToastBorder = function(enabled) {
    toastSettings.enabled = enabled;
    toggleToastUI(enabled);
    updateGlobalToastStyle();
    localStorage.setItem('Wx_Toast_Settings', JSON.stringify(toastSettings));
};

window.updateToastColor = function(color) {
    toastSettings.color = color;
    updateGlobalToastStyle();
    localStorage.setItem('Wx_Toast_Settings', JSON.stringify(toastSettings));
};

window.updateToastWidth = function(val) {
    toastSettings.width = val;
    document.getElementById('toast-width-val').innerText = val + 'px';
    updateGlobalToastStyle();
    localStorage.setItem('Wx_Toast_Settings', JSON.stringify(toastSettings));
};

function toggleToastUI(enabled) {
    const controls = document.getElementById('toast-controls');
    if(controls) {
        controls.style.opacity = enabled ? '1' : '0.5';
        controls.style.pointerEvents = enabled ? 'auto' : 'none';
    }
}

function updateGlobalToastStyle() {
    const root = document.documentElement;
    root.style.setProperty('--toast-color', toastSettings.color || '#fff');
    root.style.setProperty('--toast-width', (toastSettings.width || 3) + 'px');
    
    const allIcons = document.querySelectorAll('.app-icon');
    allIcons.forEach(icon => {
        if (toastSettings.enabled) icon.classList.add('toast-style');
        else icon.classList.remove('toast-style');
    });
}

// [辅助] 获取当前界面快照
function getCurrentMemorySnapshot() {
    const data = { texts: {}, images: {}, switches: {}, wallpaper: '' };
    data.wallpaper = document.getElementById('phoneScreen')?.style.backgroundImage || '';

    // 文字
    document.querySelectorAll('.edit-text').forEach((el, index) => {
        let key = el.id ? `ID:${el.id}` : `AUTO:txt_${index}`;
        data.texts[key] = el.innerText;
    });

    // 图片
    const imgSelectors = '.upload-img, .app-icon, .profile-avatar, .polaroid-img, .wx-big-avatar, .wx-small-avatar, .wx-p2-header-bg, .wx-big-avatar-new, .sync-avatar, .chl-frame, .w-mini-cover, .w-thumb-item, .big-photo-widget, .ins-square-widget';
    document.querySelectorAll(imgSelectors).forEach((el, index) => {
        const bg = el.style.backgroundImage;
        if (bg && bg !== 'initial' && bg !== '' && bg !== 'none') {
            let key = el.id ? `ID:${el.id}` : `AUTO:img_${index}`;
            data.images[key] = bg;
        }
    });

    // 开关
    document.querySelectorAll('.ios-switch input').forEach((el, index) => {
        let key = el.id ? `ID:${el.id}` : `AUTO:sw_${index}`;
        data.switches[key] = el.checked;
    });

    return data;
}

// [6] 保存当前主题预设
window.saveCurrentTheme = function() {
    showPromptDialog("New Theme", "给主题起个名字吧～ (e.g. 黑白灰风)", (name) => {
        if (!name) return;

        let coverImg = '';
        const calImg = document.getElementById('cal_p_1')?.style.backgroundImage;
        const appImg = document.querySelector('.app-item:not(.empty) .app-icon')?.style.backgroundImage;
        if (calImg && calImg.includes('url')) coverImg = calImg;
        else if (appImg && appImg.includes('url')) coverImg = appImg;
        
        const themeData = {
            id: Date.now(),
            name: name,
            cover: coverImg, 
            toast: toastSettings,
            memory: getCurrentMemorySnapshot() 
        };

        localforage.getItem('Wx_Theme_Presets').then(data => {
            const presets = data || [];
            presets.push(themeData);
            return localforage.setItem('Wx_Theme_Presets', presets);
        }).then(() => {
            loadThemePresets(); 
            showSystemAlert('主题保存成功啦(￣▽￣)！');
        });
    });
};

// [7] 加载预设列表 (含：点击应用 + 长按换图 + 鼠标兼容)
window.loadThemePresets = function() {
    localforage.getItem('Wx_Theme_Presets').then(data => {
        const container = document.getElementById('theme-preset-list');
        if (!container) return;
        container.innerHTML = '';
        const presets = data || [];

        if (presets.length === 0) {
            container.innerHTML = `<div style="font-size:12px; color:#999; padding:20px;">暂无预设欸...(𓐍ㅇㅂㅇ𓐍)</div>`;
            return;
        }

        presets.forEach(theme => {
            const item = document.createElement('div');
            item.className = 'preset-card';
            const previewId = `preset-img-${theme.id}`;
            const bgStyle = theme.cover ? `background-image: ${theme.cover}` : 'background: #f0f0f0';
            
            // 构建HTML，强制CSS裁切
            item.innerHTML = `
                <div class="preset-del" onclick="deleteThemePreset(${theme.id}, event)"></div>
                <div id="${previewId}" class="preset-preview" style="${bgStyle}; background-size: cover; background-position: center;"></div>
                <div class="preset-name">${theme.name}</div>
            `;
            
            // 获取元素
            const previewEl = item.querySelector('.preset-preview');
            const nameEl = item.querySelector('.preset-name');

            // --- A. 点击文字：直接应用 ---
            nameEl.onclick = (e) => {
                e.stopPropagation(); 
                applyTheme(theme);
            };

            // --- B. 点击图片：区分短按与长按 ---
            let startTime = 0;
            let isMoving = false;
            let pressTimer = null;

            const handleStart = () => {
                startTime = Date.now();
                isMoving = false;
                // 600ms 后触发长按
                pressTimer = setTimeout(() => {
                    if (!isMoving) {
                        if(navigator.vibrate) navigator.vibrate(50);
                        triggerPresetCoverUpload(theme.id);
                        startTime = 0; // 标记为已触发长按
                    }
                }, 600);
            };

            const handleMove = () => {
                isMoving = true;
                if (pressTimer) clearTimeout(pressTimer);
            };

            const handleEnd = () => {
                if (pressTimer) clearTimeout(pressTimer);
                if (isMoving) return; 
                
                // 如果 startTime 还是非0，说明没触发长按，视为短按点击
                if (startTime !== 0) {
                    const duration = Date.now() - startTime;
                    if (duration < 600) {
                        applyTheme(theme); // 短按图片也应用！
                    }
                }
            };

            // 绑定事件
            previewEl.addEventListener('touchstart', handleStart);
            previewEl.addEventListener('touchmove', handleMove);
            previewEl.addEventListener('touchend', handleEnd);
            
            // 兼容电脑鼠标
            previewEl.addEventListener('mousedown', handleStart);
            previewEl.addEventListener('mouseup', handleEnd);
            previewEl.addEventListener('mouseleave', () => { if(pressTimer) clearTimeout(pressTimer); });

            container.appendChild(item);
        });
    });
};

// [8] 换图执行函数
window.triggerPresetCoverUpload = function(themeId) {
    showConfirmDialog('要更换这个预设的封面图嘛( ´▽｀)？', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';
        document.body.appendChild(input);

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    const url = `url('${evt.target.result}')`;
                    
                    // 立即更新界面
                    const previewEl = document.getElementById(`preset-img-${themeId}`);
                    if (previewEl) previewEl.style.backgroundImage = url;

                    // 更新数据库
                    localforage.getItem('Wx_Theme_Presets').then(data => {
                        const presets = data || [];
                        const target = presets.find(p => p.id === themeId);
                        if(target) {
                            target.cover = url; 
                            return localforage.setItem('Wx_Theme_Presets', presets);
                        }
                    }).then(() => {
                        showSystemAlert('封面更新噜(￣▽￣)');
                    });
                };
                reader.readAsDataURL(file);
            }
            document.body.removeChild(input);
        };

        setTimeout(() => { input.click(); }, 100);
    });
};

// [9] 删除预设
window.deleteThemePreset = function(id, event) {
    event.stopPropagation(); 
    showConfirmDialog('确定删除这个预设嘛(￣▽￣)？', () => {
        localforage.getItem('Wx_Theme_Presets').then(data => {
            const newList = (data || []).filter(t => t.id !== id);
            return localforage.setItem('Wx_Theme_Presets', newList);
        }).then(() => {
            loadThemePresets();
        });
    });
};

// [10] 应用主题
window.applyTheme = function(theme) {
    showConfirmDialog(`确定要切换到“${theme.name}”嘛？\n当前未保存的修改会丢失哦(￣▽￣)！`, () => {
        // 恢复记忆
        localforage.setItem(MEMORY_KEY, theme.memory).then(() => {
            // 恢复边框设置
            if(theme.toast) {
                toastSettings = theme.toast;
                localStorage.setItem('Wx_Toast_Settings', JSON.stringify(toastSettings));
                if(window.updateGlobalToastStyle) window.updateGlobalToastStyle();
                
                const widthSlider = document.getElementById('toast-width-slider');
                const switchEl = document.getElementById('toast-border-switch');
                if(widthSlider) widthSlider.value = toastSettings.width || 3;
                if(switchEl) switchEl.checked = toastSettings.enabled;
            }
            
            // 刷新界面
            if(window.loadMemory) window.loadMemory();
            showSystemAlert('主题应用成功噜(≧∇≦)～');
            
            // 刷新美化页预览
            if(window.initIconSettingsGrid) setTimeout(window.initIconSettingsGrid, 100);
        });
    });
};
// ====================
// 壁纸系统
// ====================

window.changeWallpaper = function(url) {
    // 1. 只需要做这一件事：告诉 CSS 换图了！
    // 所有的屏幕、预览图都会自动跟着变。
    document.documentElement.style.setProperty('--wall-url', `url('${url}')`);
    
    // 2. 存到数据库 (保持你的记忆功能)
    saveMemory(); 
    
    // 3. 提示
    showSystemAlert('壁纸换好啦(𓐍ㅇㅂㅇ𓐍)～');
};
window.triggerBgUpload = function(type) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                const url = evt.target.result; 
                if (type === 'desktop') {
                    // 这里会调用上面改过的函数，所以这里不用动
                    changeWallpaper(url);
                } else {
                    // 聊天背景保持原样，不需要动
                    const chat = chatsData.find(c => c.id === currentChatId);
                    if(chat) {
                        chat.bgImage = `url('${url}')`;
                        localforage.setItem('Wx_Chats_Data', chatsData).then(() => {
                            const msgArea = document.getElementById('chat-msg-area');
                            if (msgArea) msgArea.style.backgroundImage = `url('${url}')`;
                            showSystemAlert('聊天背景已更新(𓐍ㅇㅂㅇ𓐍)！！');
                        });
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
};

// ★ 初始化也要改！因为 screen.style.backgroundImage 已经空了
function initWallpaperPage() {
    const preview = document.getElementById('wall-current-preview');
    
    // 获取当前的 CSS 变量里的壁纸
    const currentWall = getComputedStyle(document.documentElement).getPropertyValue('--wall-url').trim();
    
    if (preview && currentWall && currentWall !== 'none') {
        // 如果变量里有图，就给预览图加上
        preview.style.backgroundImage = currentWall;
    }
}

// 确保页面初始化
const _originalOpen2 = window.openSubPage;
window.openSubPage = function(id) {
    if(_originalOpen2) _originalOpen2(id);
    if (id === 'sub-icon') setTimeout(window.initIconSettingsGrid, 50);
    if (id === 'sub-wallpaper') setTimeout(initWallpaperPage, 50);
};
// ============================================
// [补丁] 找回丢失的滑块控制函数
// ============================================

// 1. 调整模糊 (Blur)
window.updateBgBlur = function(val) {
    // 设置给 CSS 变量，让 CSS 去模糊
    document.documentElement.style.setProperty('--bg-blur', val + 'px');
    // 更新数字显示
    const numDisplay = document.getElementById('val-blur');
    if(numDisplay) numDisplay.innerText = val + 'px';
};

// 2. 调整边缘暗角 (Vignette)
window.updateBgEdge = function(val) {
    document.documentElement.style.setProperty('--bg-vignette', val);
    const numDisplay = document.getElementById('val-edge');
    if(numDisplay) numDisplay.innerText = Math.round(val * 100) + '%';
};

// 3. 调整亮度 (Dim)
window.updateBgDim = function(val) {
    document.documentElement.style.setProperty('--bg-dim', val + '%');
    const numDisplay = document.getElementById('val-dim');
    if(numDisplay) numDisplay.innerText = val + '%';
};

// 4. 重置按钮逻辑
window.resetWallpaperEffects = function() {
    updateBgBlur(0);
    updateBgEdge(0);
    updateBgDim(100);
    // 把滑块也拨回去
    document.querySelectorAll('.ios-slider-range').forEach((input, index) => {
        if(index === 0) input.value = 0;
        if(index === 1) input.value = 0;
        if(index === 2) input.value = 100;
    });
};
// ====================
// ★★★ [自定义弹窗系统] (Ins Style) ★★★
// ====================

// 1. Toast (顶部提示) - 替代原来的 ugly alert
window.showSystemAlert = function(msg, type='normal') {
    // 如果还没创建容器，创建它
    let container = document.getElementById('custom-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'custom-toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'ins-toast';
    toast.innerHTML = `
        <div class="toast-icon">${type === 'success' ? '✨' : '🍎'}</div>
        <div class="toast-msg">${msg}</div>
    `;

    container.appendChild(toast);

    // 动画进场
    setTimeout(() => toast.classList.add('show'), 10);

    // 2秒后消失
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
};

// 2. Confirm Dialog (居中确认框) - 替代 confirm()
window.showConfirmDialog = function(msg, onConfirm) {
    let overlay = document.getElementById('custom-confirm-overlay');
    if (!overlay) {
        // 创建HTML结构
        overlay = document.createElement('div');
        overlay.id = 'custom-confirm-overlay';
        overlay.className = 'custom-alert-overlay'; // 复用之前的遮罩样式
        overlay.innerHTML = `
            <div class="custom-alert-box ins-style">
                <div class="alert-title">Confirm</div>
                <div class="alert-msg" id="confirm-msg-text"></div>
                <div class="alert-btn-group">
                    <div class="alert-btn cancel" id="confirm-btn-cancel">Cancel</div>
                    <div class="alert-btn confirm" id="confirm-btn-ok">Yes</div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    const msgEl = document.getElementById('confirm-msg-text');
    const okBtn = document.getElementById('confirm-btn-ok');
    const cancelBtn = document.getElementById('confirm-btn-cancel');

    msgEl.innerText = msg;
    
    // 绑定事件
    okBtn.onclick = () => {
        onConfirm();
        overlay.style.display = 'none';
    };
    cancelBtn.onclick = () => {
        overlay.style.display = 'none';
    };

    overlay.style.display = 'flex';
};
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 System Booting...');
    if(window.loadMemory) window.loadMemory();
    if(typeof fixViewportHeight === 'function') fixViewportHeight();
    initStickerSystem(); // 启动表情包系统
});

// === 通用确认弹窗逻辑 (配合 HTML 里的 global-confirm-modal) ===
window.showGlobalConfirm = function(title, desc, onConfirm) {
    const modal = document.getElementById('global-confirm-modal');
    if(!modal) {
        alert("宝宝，你是不是忘了在 index.html 里加那个 <div id='global-confirm-modal'> 的代码呀？");
        return;
    }
    
    document.getElementById('g-confirm-title').innerText = title;
    document.getElementById('g-confirm-desc').innerText = desc;
    
    const confirmBtn = document.getElementById('g-confirm-btn-yes');
    const cancelBtn = document.querySelector('#global-confirm-modal .alert-btn.cancel');
    
    // 重置按钮状态 (防止偷看功能修改了它们)
    if(cancelBtn) cancelBtn.style.display = 'flex';
    if(confirmBtn) confirmBtn.innerText = "Confirm";

    // 重新绑定确认事件 (克隆节点以去除旧事件)
    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
    
    newBtn.onclick = function() {
        if(onConfirm) onConfirm();
        closeGlobalConfirm();
    };
    
    modal.style.display = 'flex';
}

window.closeGlobalConfirm = function() {
    const modal = document.getElementById('global-confirm-modal');
    if(modal) modal.style.display = 'none';
}

// ====================
// [自定义弹窗系统] (Ins Style Pure)
// ====================

// 1. Toast 提示
window.showSystemAlert = function(msg, type='normal') {
    let container = document.getElementById('custom-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'custom-toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'ins-toast';
    toast.innerHTML = `<span class="toast-msg">${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
};

// 2. 确认框 & 输入框
window.showConfirmDialog = (msg, onConfirm) => createDialog('Confirm', msg, null, onConfirm);
window.showPromptDialog = (title, placeholder, onConfirm) => createDialog(title, null, placeholder, onConfirm);

function createDialog(titleText, msgText, inputPlaceholder, onConfirm) {
    const old = document.getElementById('custom-ins-overlay');
    if(old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = 'custom-ins-overlay';
    overlay.className = 'custom-alert-overlay';
    
    const inputHtml = inputPlaceholder ? `<input type="text" id="ins-dialog-input" placeholder="${inputPlaceholder}" autocomplete="off">` : '';
    const msgHtml = msgText ? `<div class="alert-msg">${msgText}</div>` : '';

    overlay.innerHTML = `
        <div class="custom-alert-box ins-style">
            <div class="alert-title">${titleText}</div>
            ${msgHtml}
            ${inputHtml}
            <div class="alert-btn-group">
                <div class="alert-btn cancel" id="ins-btn-cancel">Cancel</div>
                <div class="alert-btn confirm" id="ins-btn-ok">OK</div>
            </div>
        </div>`;
    
    document.body.appendChild(overlay);
    overlay.style.display = 'flex';
    const inputEl = document.getElementById('ins-dialog-input');
    if(inputEl) setTimeout(() => inputEl.focus(), 100);

    document.getElementById('ins-btn-cancel').onclick = () => overlay.remove();
    document.getElementById('ins-btn-ok').onclick = () => {
        if (inputEl) {
            const val = inputEl.value.trim();
            if (!val) return showSystemAlert('内容不能为空哦～');
            onConfirm(val);
        } else {
            onConfirm();
        }
        overlay.remove();
    };
}

// 主题保存逻辑
window.saveCurrentTheme = function() {
    showPromptDialog("New Theme", "给主题起个名字吧 (e.g. 奶油吐司)", (name) => {
        let coverImg = '';
        const calImg = document.getElementById('cal_p_1')?.style.backgroundImage;
        const appImg = document.querySelector('.app-item:not(.empty) .app-icon')?.style.backgroundImage;
        if (calImg && calImg.includes('url')) coverImg = calImg;
        else if (appImg && appImg.includes('url')) coverImg = appImg;
        
        const themeData = {
            id: Date.now(), name: name, cover: coverImg, 
            toast: toastSettings, memory: getCurrentMemorySnapshot() 
        };
        localforage.getItem('Wx_Theme_Presets').then(data => {
            const presets = data || [];
            presets.push(themeData);
            return localforage.setItem('Wx_Theme_Presets', presets);
        }).then(() => {
            if(window.loadThemePresets) window.loadThemePresets();
            showSystemAlert('预设保存成功( ´▽｀)～');
        });
    });
};

window.closeSubPage = function(id) {
    const p = document.getElementById(id);
    if(p) {
        p.classList.remove('active');
        setTimeout(() => p.style.display = 'none', 300);
        if (id === 'sub-page-chat-detail') {
            currentChatId = null;
            if(window.renderChatList) window.renderChatList();
        }
    }
};

// 手账/总结相关
window.openNoteEditor = () => {
    const overlay = document.getElementById('note-editor-overlay');
    const ta = document.getElementById('note-editor-input');
    if(overlay && ta) { ta.value = ""; overlay.style.display = 'flex'; setTimeout(() => ta.focus(), 100); }
};
window.closeNoteEditor = () => document.getElementById('note-editor-overlay').style.display = 'none';
window.confirmNoteSave = () => {
    const text = document.getElementById('note-editor-input').value.trim();
    if(!text) return showSystemAlert('写点什么吧(・ω・)ノ');
    if(typeof saveSummaryToChat === 'function') saveSummaryToChat(text);
    closeNoteEditor();
};

// 键盘修复
const chatInput = document.getElementById('chat-input');
if (chatInput) {
    chatInput.addEventListener('input', function() {
        this.style.height = '24px';
        this.style.height = (this.scrollHeight) + 'px';
        this.style.overflowY = (this.scrollHeight > 100) ? 'auto' : 'hidden';
    });
}
document.body.addEventListener('keydown', function(e) {
    if ((e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        e.stopPropagation();
        if (e.key === 'Enter' && e.target.id === 'chat-input' && !e.shiftKey) {
            e.preventDefault(); sendMsg('me');
            e.target.style.height = '24px'; e.target.style.overflowY = 'hidden';
        }
    }
});

// ==========================================================
// ★ 26. 表情包系统
// ==========================================================

let stickersDB = [
    { id: 's1', url: 'https://i.postimg.cc/jjTJY1qT/kuku1.gif', name: '哭哭', type: 'ai' },
    { id: 's2', url: 'https://i.postimg.cc/dVrTXFYn/kuku10.gif', name: '抱抱', type: 'fav', group: '默认' }
];
let stickerGroups = ['默认', '开心', '难过', '生气']; 
let currentStickerTab = 'fav';
let currentSubGroup = '默认';
let isMultiSelectMode = false; 
let selectedStickerIds = [];
let tempStickerList = []; 
let tempStickerUploads = []; // 上传临时列表

// 初始化
function initStickerSystem() {
    localforage.getItem('stickersData').then(val => { if (val) stickersDB = val; });
    localforage.getItem('stickerGroups').then(val => { if (val) stickerGroups = val; });
}

// 菜单开关
window.toggleStickerMenu = function() {
    const picker = document.getElementById('sticker-picker-overlay');
    if (!picker) return;
    
    if(isMultiSelectMode && window.exitMultiSelect) exitMultiSelect();

    picker.style.zIndex = '20000'; // 确保比普通弹窗低，但比页面高
    if (picker.classList.contains('active')) {
        picker.classList.remove('active');
        document.body.classList.remove('menu-open');
    } else {
        document.body.classList.remove('menu-open'); 
        picker.classList.add('active');
        
        // 强制刷新子导航
        if (currentStickerTab === 'fav' || currentStickerTab === 'sys') {
            createSubNav(); renderSubGroups();
            const nav = document.getElementById('sticker-sub-nav-container');
            if(nav) nav.style.display = 'flex';
        }
        renderStickers();
    }
}

// 切换 Tab
window.switchStickerTab = function(type) {
    currentStickerTab = type;
    document.querySelectorAll('.sticker-tab').forEach(el => el.classList.remove('active'));
    
    const btn = document.querySelector(`.sticker-tab[onclick*="'${type}'"]`) || 
                document.querySelector(`.sticker-tab[onclick*='"${type}"']`);
    if(btn) btn.classList.add('active');

    const subNav = document.getElementById('sticker-sub-nav-container');
    if (type === 'sys' || type === 'fav') { 
        if(!subNav) createSubNav();
        renderSubGroups();
        if(subNav) subNav.style.display = 'flex';
    } else {
        if(subNav) subNav.style.display = 'none';
    }
    renderStickers();
}

// ====================
// 分组逻辑
// ====================
function createSubNav() {
    const header = document.querySelector('.sticker-header');
    if(!header) return;
    let nav = document.getElementById('sticker-sub-nav-container');
    if(nav) return;
    nav = document.createElement('div');
    nav.id = 'sticker-sub-nav-container';
    nav.className = 'sticker-sub-nav';
    header.after(nav);
}

function renderSubGroups() {
    const nav = document.getElementById('sticker-sub-nav-container');
    if(!nav) return;
    nav.innerHTML = '';

    nav.appendChild(createGroupPill('全部', currentSubGroup === 'all', false));
    stickerGroups.forEach(g => {
        nav.appendChild(createGroupPill(g, currentSubGroup === g, true));
    });

    const addBtn = document.createElement('div');
    addBtn.className = 'sticker-group-pill';
    addBtn.innerText = '+';
    addBtn.onclick = () => {
        showPromptDialog("New Group", "新建分组名称", (name) => {
            if(!name) return;
            if(stickerGroups.includes(name)) return showSystemAlert('分组已存在');
            stickerGroups.push(name);
            saveGroups(); renderSubGroups();
        });
    }
    nav.appendChild(addBtn);
}

function createGroupPill(name, isActive, canEdit) {
    const el = document.createElement('div');
    el.className = `sticker-group-pill ${isActive ? 'active' : ''}`;
    el.innerText = name;
    el.onclick = () => {
        currentSubGroup = (name === '全部') ? 'all' : name;
        renderSubGroups(); renderStickers();
    };
    // 分组长按逻辑
    if (canEdit) {
        let timer = null;
        let startX, startY;
        const startPress = (e) => {
            if(e.touches) { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }
            timer = setTimeout(() => {
                if(navigator.vibrate) navigator.vibrate(50);
                showConfirmDialog(`删除“${name}”分组吗？`, () => {
                    stickersDB = stickersDB.filter(s => s.group !== name);
                    stickerGroups = stickerGroups.filter(g => g !== name);
                    currentSubGroup = 'all';
                    saveGroups(); saveStickers();
                    renderSubGroups(); renderStickers();
                    showSystemAlert('分组已删除');
                });
            }, 600);
        };
        const movePress = (e) => {
            if(!timer) return;
            if(e.touches) {
                if(Math.abs(e.touches[0].clientX - startX) > 10 || Math.abs(e.touches[0].clientY - startY) > 10) {
                    clearTimeout(timer); timer = null;
                }
            }
        };
        const cancelPress = () => { if(timer) { clearTimeout(timer); timer = null; } };
        
        el.addEventListener('touchstart', startPress, {passive: true});
        el.addEventListener('touchmove', movePress, {passive: true});
        el.addEventListener('touchend', cancelPress);
        el.addEventListener('mousedown', startPress);
        el.addEventListener('mouseup', cancelPress);
        el.addEventListener('mouseleave', cancelPress);
    }
    return el;
}

// ====================
// 表情渲染 
// ====================
function renderStickers() {
    const grid = document.getElementById('sticker-grid-view');
    if(!grid) return;
    grid.innerHTML = '';
    
    let multiBar = document.getElementById('multi-select-bar');
    const panel = document.querySelector('.sticker-glass-panel'); 

    if (!multiBar && panel) {
        multiBar = document.createElement('div');
        multiBar.id = 'multi-select-bar';
        multiBar.className = 'sticker-footer sticker-delete-bar'; // 加上 footer 类名保证样式一致
        panel.appendChild(multiBar); 
    }

    // 控制多选栏显示/隐藏
    if (multiBar) {
        if (isMultiSelectMode) {
            multiBar.style.display = 'flex';
            const count = selectedStickerIds.length;
            multiBar.innerHTML = `
                <div class="delete-cancel-btn" onclick="exitMultiSelect()">取消</div>
                <div class="delete-count-text">已选 ${count} 项</div>
                <div class="delete-confirm-btn" onclick="deleteSelectedStickers()" 
                     style="opacity: ${count > 0 ? 1 : 0.5}; transform: scale(${count > 0 ? 1 : 0.95});">
                    删除
                </div>
            `;
            // 多选模式下，让列表底部留出空隙，防止最后一行被底栏挡住
            grid.style.paddingBottom = '80px';
        } else {
            multiBar.style.display = 'none';
            grid.style.paddingBottom = '20px'; // 恢复正常
        }
    }

    // Add 按钮 (保持不变)
    if (!isMultiSelectMode && (currentStickerTab === 'fav' || currentStickerTab === 'ai')) {
        const addBtn = document.createElement('div');
        addBtn.className = 'sticker-item add-item'; 
        addBtn.innerHTML = `<span style="font-size: 28px; color: #ccc;">+</span>`;
        addBtn.onclick = (e) => showAddChoiceMenu(e);
        grid.appendChild(addBtn);
    }

    // 渲染列表
    let list = stickersDB.filter(s => s.type === currentStickerTab);
    if (currentStickerTab !== 'ai' && currentSubGroup !== 'all') {
        list = list.filter(s => s.group === currentSubGroup || (!s.group && currentSubGroup === '默认'));
    }

    list.forEach(s => {
        const item = document.createElement('div');
        const isSel = selectedStickerIds.includes(s.id);
        
        // ★ 关键：加上 .selected 类名
        item.className = `sticker-item ${isMultiSelectMode && isSel ? 'selected' : ''}`;
        
        item.style.backgroundImage = `url('${s.url}')`;
        item.innerHTML = `<div class="sticker-name-tag">${s.name}</div>`;
        
        // 阻止右键菜单
        item.oncontextmenu = (e) => { e.preventDefault(); e.stopPropagation(); return false; };

        item.onclick = () => {
            if (isMultiSelectMode) { toggleSelection(s.id); } else { sendSticker(s); }
        };
        
        bindStickerLongPress(item, s);
        grid.appendChild(item);
    });
}

// 长按逻辑
function bindStickerLongPress(element, sticker) {
    let timer;
    let startX, startY;

    const start = (e) => {
        if(e.touches) { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }
        timer = setTimeout(() => {
            const x = e.touches ? e.touches[0].clientX : e.clientX;
            const y = e.touches ? e.touches[0].clientY : e.clientY;
            showStickerContextMenu(x, y, sticker);
            if(navigator.vibrate) navigator.vibrate(50);
        }, 500);
    };

    const move = (e) => {
        if(!timer) return;
        if(e.touches) {
            const moveX = e.touches[0].clientX;
            const moveY = e.touches[0].clientY;
            if(Math.abs(moveX - startX) > 10 || Math.abs(moveY - startY) > 10) {
                clearTimeout(timer); timer = null;
            }
        }
    };

    const end = () => { if(timer) { clearTimeout(timer); timer = null; } };

    element.addEventListener('touchstart', start, {passive: true});
    element.addEventListener('touchmove', move, {passive: true});
    element.addEventListener('touchend', end);
    element.addEventListener('mousedown', start);
    element.addEventListener('mouseup', end);
    element.addEventListener('mouseleave', end);
}

// ==========================================
// ★ 强力修复：表情包弹窗 (UI 微调版)
// ==========================================
window.rebuildStickerPopupHTML = function() {
    const overlay = document.getElementById('sticker-upload-overlay');
    if (!overlay) return;

    overlay.innerHTML = `
        <div class="custom-alert-box ins-style" style="width: 340px !important; padding: 20px !important; border-radius: 24px !important; height: auto; max-height: 80vh; display: flex; flex-direction: column;">
            
            <div class="upload-modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; width: 100%; flex-shrink: 0;">
                <div>
                    <div class="upload-modal-title" style="font-size: 20px; font-weight: 700; color: #1c1c1e;">⇪ add sticker​​s</div>
                    <div id="upload-tip-text" style="font-size: 12px; color: #999; margin-top: 2px;">添加的表情包太多的话记得往下翻翻哦～</div>
                </div>
                <div onclick="closeStickerUploader()" style="width: 32px; height: 32px; background: #f2f2f7; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #8e8e93; font-size: 20px; cursor: pointer;">×</div>
            </div>

            <div class="upload-modal-body" style="width: 100%; min-height: 120px; max-height: 400px; background: #f9f9f9; border-radius: 16px; margin-bottom: 15px; overflow-y: auto; padding: 10px; flex: 1; display: flex; flex-direction: column;">
                
                <div id="view-mode-visual" style="display: flex; flex-direction: column; width: 100%;">
                    <div id="sticker-preview-list"></div>
                </div>
                
                <div id="view-mode-bulk" style="display: none; flex-direction: column; flex: 1; height: 100%;">
                    <div style="font-size: 12px; color: #666; margin-bottom: 8px; flex-shrink: 0;">
                        格式：<b>表情名 链接</b> (一行一个喔～)<br>
                        <span style="color:#999; font-size:10px;">试试直接粘贴一大段带链接的文本...(￣▽￣)</span>
                    </div>
                    <textarea id="sticker-bulk-input" 
                        placeholder="开心 https://xx.com/1.jpg..." 
                        style="width:100%; flex: 1; min-height: 200px; border:none; background:transparent; resize:none; font-size: 14px; line-height: 1.6; outline:none; color: #333;"></textarea>
                    
                    <div style="margin-top: 10px; display: flex; gap: 10px; flex-shrink: 0;">
                         <div class="alert-btn cancel" onclick="switchUploadMode('visual')" style="flex: 1; text-align: center; background: #f0f0f0; padding: 12px; border-radius: 12px; font-weight: 600; cursor: pointer;"> ↺ 取消</div>
                         <div class="alert-btn confirm" onclick="parseBulkInput()" style="flex: 1; text-align: center; background: #333; color: #fff; padding: 12px; border-radius: 12px; font-weight: 600; cursor: pointer;">开始识别 ➜</div>
                    </div>
                </div>
            </div>

            <div class="sticker-footer" id="sticker-footer-area" style="width: 100%; display: flex; flex-direction: column; gap: 10px; flex-shrink: 0;">
                
                <div class="url-input-group" style="display: flex; gap: 8px; align-items: center;">
                    <input type="text" id="sticker-url-input" placeholder="在这里粘贴表情包url链接..." 
                           style="flex: 1; background: #f2f2f7; border: none; height: 36px; border-radius: 10px; padding: 0 12px; font-size: 14px; outline: none;">
                    
                    <div class="add-btn" onclick="handleAddUrl()" 
                         style="width: 70px; height: 36px; background: #e5e5ea; color: #000; font-weight: 600; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 13px; cursor: pointer;">
                        save
                    </div>
                </div>

                <div class="func-btn-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <input type="file" id="real-sticker-input" accept="image/*" multiple style="display: none;" onchange="handleStickerFilesVisual(this)">
                    
                    <div class="func-btn" onclick="document.getElementById('real-sticker-input').click()" 
                         style="height: 44px; background: #e1f5fe; color: #0288d1; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; cursor: pointer;">
                        📷 选择相册
                    </div>
                    <div class="func-btn" onclick="switchUploadMode('bulk')" 
                         style="height: 44px; background: #f3e5f5; color: #7b1fa2; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; cursor: pointer;">
                        🩶 批量导入
                    </div>
                </div>

                <div class="save-full-btn" onclick="saveVisualStickers()" 
                     style="width: 100%; height: 48px; margin-top: 4px; background: #1c1c1e; color: #fff; border-radius: 14px; font-size: 16px; font-weight: 600; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.15); cursor: pointer;">
                    全部保存
                </div>
            </div>
        </div>
    `;
};

// 修改打开弹窗的函数，每次打开前先修复HTML
window.openStickerUploader = function() {
    // 1. 先重置 HTML 结构，防止之前被破坏
    rebuildStickerPopupHTML(); 
    
    const overlay = document.getElementById('sticker-upload-overlay');
    const tip = document.getElementById('upload-tip-text'); // 重新获取 dom
    
    // 2. 初始化数据
    tempStickerUploads = [];
    renderUploadPreview(); 
    switchUploadMode('visual');
    
    if(overlay) overlay.style.display = 'flex';

    // 3. 更新提示文字
    // 注意：rebuildStickerPopupHTML 后，DOM 元素是新的，必须重新获取
    const newTip = overlay.querySelector('.sticker-header div:nth-child(2)');
    if(newTip) {
        if (typeof currentStickerTab !== 'undefined' && currentStickerTab === 'ai') {
            newTip.innerText = "正在添加：char 专属表情";
            newTip.style.color = "#007aff";
        } else {
            let gName = (typeof currentSubGroup !== 'undefined' && currentSubGroup !== 'all') ? currentSubGroup : '默认';
            newTip.innerText = `正在添加至：${gName} 分组`;
            newTip.style.color = "#999";
        }
    }
};

window.closeStickerUploader = function() {
    const overlay = document.getElementById('sticker-upload-overlay');
    if(overlay) overlay.style.display = 'none';
};

// 切换 视图模式 / 批量文本模式 (带自动隐藏底部逻辑)
window.switchUploadMode = function(mode) {
    const visualView = document.getElementById('view-mode-visual');
    const bulkView = document.getElementById('view-mode-bulk');
    const footerArea = document.getElementById('sticker-footer-area'); // 获取底部区域
    const tipText = document.getElementById('upload-tip-text');

    if (mode === 'bulk') {
        // === 进入批量模式 ===
        visualView.style.display = 'none';
        bulkView.style.display = 'flex'; // 显示批量区
        
        // ★ 关键：隐藏底部所有按钮！让输入框占满整个弹窗！
        if(footerArea) footerArea.style.display = 'none'; 
        
        if(tipText) tipText.innerText = "一行一个url链接哦，我会自动识别的～";
        
        // 自动聚焦
        setTimeout(() => document.getElementById('sticker-bulk-input').focus(), 100);
        
    } else {
        // === 回到普通预览模式 ===
        bulkView.style.display = 'none';
        visualView.style.display = 'flex';
        
        // ★ 恢复底部按钮
        if(footerArea) footerArea.style.display = 'flex';
        
        if(tipText) tipText.innerText = "添加的表情包太多的话记得往下翻翻喔～";
    }
};

window.handleAddUrl = function() {
    const input = document.getElementById('sticker-url-input');
    const url = input ? input.value.trim() : '';
    if (!url) return showSystemAlert('链接怎么是空的呀Σ（・□・；）！');
    
    tempStickerUploads.push({
        id: Date.now() + Math.random(),
        name: '网络图片',
        url: url
    });
    if(input) input.value = '';
    renderUploadPreview();
    showSystemAlert('添加成功噜～！');
};

// 解析批量文本
window.parseBulkInput = function() {
    const textarea = document.getElementById('sticker-bulk-input');
    const rawText = textarea.value.trim();
    if (!rawText) { switchUploadMode('visual'); return; }

    const lines = rawText.split('\n');
    let count = 0;
    lines.forEach(line => {
        line = line.trim();
        if (!line) return;
        const firstSpaceIdx = line.indexOf(' ');
        let name = '未命名'; let url = '';

        if (firstSpaceIdx === -1) { url = line; } 
        else { name = line.substring(0, firstSpaceIdx).trim(); url = line.substring(firstSpaceIdx).trim(); }

        if (url && url.length > 5) {
            tempStickerUploads.push({ id: Date.now() + Math.random(), name: name, url: url });
            count++;
        }
    });

    textarea.value = '';
    renderUploadPreview();
    switchUploadMode('visual');
    showSystemAlert(`识别出 ${count} 个表情包！`);
};

// 处理本地文件
window.handleStickerFilesVisual = function(input) {
    if (!input.files || input.files.length === 0) return;
    showSystemAlert('稍等哦...我去处理一下～');
    const tasks = Array.from(input.files).map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve({
                id: Date.now() + Math.random(),
                name: file.name.replace(/\.[^/.]+$/, ""),
                url: e.target.result
            });
            reader.readAsDataURL(file);
        });
    });
    Promise.all(tasks).then(newItems => {
        tempStickerUploads = [...tempStickerUploads, ...newItems];
        renderUploadPreview();
        input.value = ''; 
    });
};

// 渲染预览列表 (美化版)
function renderUploadPreview() {
    const listEl = document.getElementById('sticker-preview-list');
    if (!listEl) return;
    listEl.innerHTML = ''; 

    if (tempStickerUploads.length === 0) {
        // 空状态提示
        listEl.innerHTML = `
            <div id="empty-tip" style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ccc; margin-top: 30px;">
                <div style="font-size: 30px; margin-bottom: 10px;">🌧️</div>
                <div>还没有选择表情包哦(＞人＜;)</div>
            </div>`;
        return;
    }

    tempStickerUploads.forEach((item, index) => {
        const row = document.createElement('div');
        // ★ 使用新的 class
        row.className = 'upload-preview-item'; 
        row.innerHTML = `
            <div class="up-thumb" style="background-image: url('${item.url}')"></div>
            <input type="text" class="up-input-name" value="${item.name}" 
                   onchange="updateTempStickerName(${index}, this.value)" placeholder="重命名">
            <div class="up-del" onclick="removeTempSticker(${index})">×</div>
        `;
        listEl.appendChild(row);
    });
    
    // 自动滚动到底部
    const body = document.querySelector('.upload-modal-body');
    if(body) body.scrollTop = body.scrollHeight;
}

window.updateTempStickerName = (index, val) => { if(tempStickerUploads[index]) tempStickerUploads[index].name = val; };
window.removeTempSticker = (index) => { tempStickerUploads.splice(index, 1); renderUploadPreview(); };

// 保存
window.saveVisualStickers = function() {
    if (tempStickerUploads.length === 0) return showSystemAlert('列表是空的！');
    let type = (typeof currentStickerTab !== 'undefined' && currentStickerTab === 'ai') ? 'ai' : 'fav';
    let group = (type === 'ai') ? null : ((typeof currentSubGroup !== 'undefined' && currentSubGroup !== 'all') ? currentSubGroup : '默认');

    const newStickers = tempStickerUploads.map(item => ({
        id: 's_' + Date.now() + Math.random().toString(36).substr(2, 5),
        url: item.url,
        name: item.name || '表情',
        type: type,
        group: group
    }));

    stickersDB = [...stickersDB, ...newStickers];
    saveStickers(); renderStickers(); closeStickerUploader();
    showSystemAlert(`成功添加了 ${newStickers.length} 个表情包！`);
};

// 打开弹窗的入口
window.showAddChoiceMenu = function(e) {
    if(e) e.stopPropagation();
    if(window.openStickerUploader) { window.openStickerUploader(); }
};

// 辅助功能
function showStickerContextMenu(x, y, sticker) {
    const old = document.getElementById('ins-sticker-menu');
    if(old) old.remove();
    const menu = document.createElement('div');
    menu.id = 'ins-sticker-menu';
    menu.className = 'ins-context-menu';
    
    let moveOptions = '';
    if (currentStickerTab !== 'ai') {
        stickerGroups.forEach(g => {
            if(g !== sticker.group) {
                moveOptions += `<div class="ins-menu-item" onclick="moveStickerTo('${sticker.id}', '${g}')">移至: ${g}</div>`;
            }
        });
    }
    menu.innerHTML = `
        <div class="ins-menu-item" onclick="startMultiSelect()">★ 批量管理 (多选)</div>
        <div class="ins-menu-item" onclick="copyStickerUrl('${sticker.url}')">复制链接 <span>🔗</span></div>
        ${moveOptions}
        <div class="ins-menu-item danger" onclick="deleteSticker('${sticker.id}')">删除 <span>🗑️</span></div>
    `;
    document.body.appendChild(menu);
    let left = x - 75; let top = y + 10;
    if(left < 10) left = 10;
    if(top + 150 > window.innerHeight) top = y - 150;
    menu.style.top = top + 'px'; menu.style.left = left + 'px';
    setTimeout(() => { document.addEventListener('click', closeStickerMenu, { once: true }); }, 100);
}
function closeStickerMenu() { const m = document.getElementById('ins-sticker-menu'); if(m) m.remove(); }
// === 选择逻辑 ===
function toggleSelection(id) {
    if (selectedStickerIds.includes(id)) {
        selectedStickerIds = selectedStickerIds.filter(i => i !== id);
    } else {
        selectedStickerIds.push(id);
    }

    renderStickers(); 
}
window.exitMultiSelect = () => { isMultiSelectMode = false; selectedStickerIds = []; renderStickers(); };
window.startMultiSelect = () => { isMultiSelectMode = true; selectedStickerIds = []; renderStickers(); closeStickerMenu(); };
window.deleteSelectedStickers = () => {
    if (selectedStickerIds.length === 0) return;
    showConfirmDialog(`确定要删除 ${selectedStickerIds.length} 个表情嘛？`, () => {
        stickersDB = stickersDB.filter(s => !selectedStickerIds.includes(s.id));
        saveStickers(); exitMultiSelect();
    });
};
window.moveStickerTo = (id, group) => {
    const s = stickersDB.find(x => x.id === id);
    if(s) { s.group = group; saveStickers(); renderStickers(); showSystemAlert(`已移动到 ${group}分组下～`); }
};
window.copyStickerUrl = (url) => { navigator.clipboard.writeText(url); showSystemAlert('链接已复制～'); };
window.deleteSticker = (id) => {
    if(confirm('确定要删除这个表情嘛？')) { stickersDB = stickersDB.filter(s => s.id !== id); saveStickers(); renderStickers(); }
};
function saveGroups() { localforage.setItem('stickerGroups', stickerGroups); }
function saveStickers() { localforage.setItem('stickersData', stickersDB); }
// === 发送表情包 ===
function sendSticker(stickerObj) {
    if (!currentChatId) return;
    const chat = chatsData.find(c => c.id === currentChatId);
    if(!chat) return;

    // ★ 核心修复：这里必须用 'text' 存链接，而不是 'content'！
    // 同时修复了时间戳 NaN 的问题
    chat.messages.push({
        id: Date.now(), 
        role: 'me', 
        type: 'sticker',
        text: stickerObj.url,   // <--- 改成 text 就好了！
        desc: stickerObj.name, 
        timestamp: Date.now()   // <--- 这里用 Date.now() 修复 NaN
    });

    saveChatAndRefresh(chat);
    
    // 如果不是多选模式，发完自动关掉抽屉
    if (typeof isMultiSelectMode !== 'undefined' && !isMultiSelectMode) {
        if(window.toggleStickerMenu) window.toggleStickerMenu(); 
    }
}
// ==========================================================
// ★ 全局字体系统 (Pro Max版 - 支持超大文件)
// ==========================================================

// 0. 初始化上传通道
window.initFontUploader = function() {
    if (document.getElementById('hidden-font-input')) return;

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'hidden-font-input';
    fileInput.accept = '.ttf, .otf, .woff, .woff2'; // 加上 woff/woff2，这种格式更小
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // 12MB 也让你传！我们改用 Blob 存储，只要手机硬盘够就能存！
        // 只要不是 50MB 这种离谱的就行
        if (file.size > 30 * 1024 * 1024) { 
            showSystemAlert('宝宝，这个文件实在太大了(>30MB)，会卡死的！换一个吧QwQ');
            return;
        }

        showSystemAlert('正在保存字体文件...(￣▽￣)');

        // ★ 重点修改：直接存 File 对象，不转 Base64 了！速度快很多！
        localforage.setItem('Wx_Global_Font_File', file).then(() => {
            // 清除旧的 URL 模式存储，避免冲突
            localforage.removeItem('Wx_Global_Font'); 
            
            // 立即应用
            applyFontBlob(file);
            showSystemAlert('字体换好啦～！');
            
            // 更新输入框显示
            const input = document.getElementById('font-url-input');
            if(input) input.value = `[本地文件: ${file.name}]`;
            
        }).catch(err => {
            console.error(err);
            showSystemAlert('保存失败惹，可能是空间不足 (T_T)');
        });
    });

    document.body.appendChild(fileInput);
};


// 1. 初始化/加载字体
window.loadCustomFont = function() {
    window.initFontUploader();

    // 优先检查有没有存“文件”
    localforage.getItem('Wx_Global_Font_File').then(file => {
        if (file) {
            // 如果有文件，用文件模式加载
            applyFontBlob(file);
            const input = document.getElementById('font-url-input');
            if(input) input.value = `[本地文件: ${file.name}]`;
        } else {
            // 如果没文件，再检查有没有存“链接” (兼容旧逻辑)
            localforage.getItem('Wx_Global_Font').then(url => {
                if (url) {
                    applyFontToDom(url);
                    const input = document.getElementById('font-url-input');
                    if(input) input.value = url;
                }
            });
        }
    });
};

// ★ 新增：专门处理 Blob/File 的应用函数
async function applyFontBlob(file) {
    try {
        // 创建一个临时的 blob:http://... 链接
        // 这个链接是瞬间生成的，不占内存，专门给大文件用
        const blobUrl = URL.createObjectURL(file);
        
        // 复用原来的加载逻辑，把 blobUrl 传进去
        await applyFontToDom(blobUrl);
        
        // 记得释放内存（虽然 FontFace 加载完通常就不需要了，但在页面关闭前保留着也行）
        // URL.revokeObjectURL(blobUrl); 
        
    } catch (e) {
        console.error("Blob字体加载失败", e);
        showSystemAlert('这个字体文件好像不兼容欸... (T_T)');
    }
}

// 2. 将字体注入到页面 (通用核心)
async function applyFontToDom(url) {
    if (!url) {
        document.documentElement.style.setProperty('--global-font', '-apple-system, BlinkMacSystemFont, sans-serif');
        return;
    }

    try {
        const fontName = 'MyCustomFont';
        const fontFace = new FontFace(fontName, `url('${url}')`);
        
        await fontFace.load();
        document.fonts.add(fontFace);
        
        document.documentElement.style.setProperty('--global-font', `"${fontName}", sans-serif`);
        console.log('字体加载成功噜～');
        
        const preview = document.getElementById('font-preview-text');
        if(preview) preview.style.fontFamily = `"${fontName}", sans-serif`;

    } catch (e) {
        console.error('字体加载失败惹:', e);
        throw e;
    }
}

// 3. 触发上传 (不用改)
window.triggerFileUpload = function() {
    const input = document.getElementById('hidden-font-input');
    if (input) {
        input.value = '';
        input.click();
    } else {
        window.initFontUploader();
        setTimeout(() => document.getElementById('hidden-font-input').click(), 100);
    }
};

/* ========================================================
   常驻好友小组件逻辑 (点击换头 + 自动保存)
   ======================================================== */

// 1. 页面加载时，把保存的数据读出来
document.addEventListener('DOMContentLoaded', () => {
    loadFavData();
});

// 2. 点击头像，修改图片
window.changeFavIcon = function(index) {
    const currentSrc = document.getElementById(`fav-img-${index}`).src;
    // 弹窗询问
    const newUrl = prompt("请输入图片链接 (URL):", currentSrc);
    
    if (newUrl) { // 如果用户填了内容
        document.getElementById(`fav-img-${index}`).src = newUrl;
        saveFavData(); // 保存
    }
};

// 3. 保存所有头像和名字到 localStorage
window.saveFavData = function() {
    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            img: document.getElementById(`fav-img-${i}`).src,
            name: document.getElementById(`fav-name-${i}`).value
        });
    }
    localStorage.setItem('My_Fav_Widget_Data', JSON.stringify(data));
    console.log("好友组件数据已保存！");
};

// 4. 读取数据并显示
function loadFavData() {
    const saved = localStorage.getItem('My_Fav_Widget_Data');
    if (saved) {
        const data = JSON.parse(saved);
        data.forEach((item, index) => {
            if (item.img) document.getElementById(`fav-img-${index}`).src = item.img;
            if (item.name) document.getElementById(`fav-name-${index}`).value = item.name;
        });
    } else {
        document.getElementById('fav-img-0').src = "https://i.postimg.cc/jjTJY1..."; 
    }
}

// === 切换线下模式 ===
window.toggleOfflineMode = function() {
    isOfflineMode = !isOfflineMode;
    
    const actionBar = document.getElementById('offline-action-bar');
    const label = document.getElementById('offline-mode-label');
    const msgArea = document.getElementById('chat-msg-area');

    if (isOfflineMode) {
        if(actionBar) actionBar.style.display = 'flex';
        // ★ 核心：给 body 加类名，触发 CSS 里的 padding-bottom 变化
        document.body.classList.add('offline-active');
        
        if(label) {
            label.innerText = "线下模式(ON)";
            label.style.color = "#2196f3";
        }
        showSystemAlert("已切换至：线下见面模式 (///▽///)");
        
        // 自动滚到底部，防止刚打开时挡住消息
        if(msgArea) setTimeout(() => msgArea.scrollTop = msgArea.scrollHeight, 100);
        
    } else {
        if(actionBar) actionBar.style.display = 'none';
        // 移除类名，恢复正常高度
        document.body.classList.remove('offline-active');
        
        if(label) {
            label.innerText = "线下模式";
            label.style.color = "#666";
        }
        showSystemAlert("已回到：线上聊天模式(￣▽￣)～");
    }
    
    // 关闭菜单
    if(window.toggleChatMenu) toggleChatMenu();
};
// === 单独发送动作 (用户侧) ===
window.sendActionOnly = function() {
    const input = document.getElementById('offline-action-input');
    const text = input ? input.value.trim() : '';
    
    if (!text) {
        showSystemAlert('还没写动作呢(・ω・)ノ');
        return;
    }
    
    sendMsg('me', text, 'action');
    
    // 清空输入框
    input.value = '';
    
    // 震动反馈
    if(navigator.vibrate) navigator.vibrate(30);
};
// ==========================================================
// [28] 支付宝 & 转账系统 (Ins风限定版) - 完整逻辑
// ==========================================================
// 1. 打开支付宝页面 
window.openAlipay = function() {
    // ★ 注意：这里只要填 'alipay'！
    // openApp 会自动变成 'app-window-alipay'
    if (window.openApp) {
        openApp('alipay'); 
    } else {
        // 兜底逻辑
        const app = document.getElementById('app-window-alipay');
        if(app) {
            app.style.display = 'flex';
            setTimeout(() => app.classList.add('active'), 10);
        }
    }
    
    renderAlipayData(); 
};

// 刷新支付宝界面的余额和账单
function renderAlipayData() {
    // 更新大余额
    const balanceEl = document.getElementById('ali-total-balance');
    if(balanceEl) balanceEl.innerText = walletData.balance.toFixed(2);
    
    // 更新账单列表
    const list = document.getElementById('ali-bill-list');
    if(!list) return;
    list.innerHTML = '';
    
    // 倒序显示（最新的在上面）
    [...walletData.bills].reverse().forEach(b => {
        const item = document.createElement('div');
        item.className = 'ali-bill-item'; // 记得在CSS里写这个样式哦
        const symbol = b.type === 'in' ? '+' : '-';
        const colorClass = b.type === 'in' ? 'plus' : 'minus'; // CSS里定义颜色的类
        
        // 确保 formatTime 函数存在，没有的话就用简易版
        const timeStr = (typeof formatTime === 'function') ? formatTime(b.time) : new Date(b.time).toLocaleDateString();

        item.innerHTML = `
            <div>
                <div class="ali-b-name">${b.title}</div>
                <div class="ali-b-time">${timeStr}</div>
            </div>
            <div class="ali-b-amount ${colorClass}">${symbol} ${b.amount.toFixed(2)}</div>
        `;
        list.appendChild(item);
    });
}

// 2. 开始转账 (点击 + 号菜单里的“转账”按钮触发)
let currentTransferAmount = 0; // 暂存当前输入的金额
let currentPwd = "";           // 暂存输入的密码

window.startTransferFlow = function() {
    if (!currentChatId) return;
    const chat = chatsData.find(c => c.id === currentChatId);
    if(!chat) return;
    const contact = contactsData.find(c => c.id === chat.contactId);
    
    // 填充弹窗里的头像和名字
    document.getElementById('tf-target-name').innerText = contact.name;
    const avatarStyle = getAvatarStyle(contact.avatar);
    document.getElementById('tf-target-avatar').style.backgroundImage = avatarStyle.replace('background-image: ', '').replace(';', '');
    
    // 清空输入框
    const input = document.getElementById('tf-amount-input');
    input.value = '';
    input.focus(); // 自动聚焦
    
    checkTransferAmount(); // 初始化按钮状态
    
    // 显示金额弹窗，隐藏菜单
    document.getElementById('transfer-amount-overlay').style.display = 'flex';
    if(window.hideAllMenus) hideAllMenus();
};

// 关闭转账流程
window.closeTransferFlow = function() {
    document.getElementById('transfer-amount-overlay').style.display = 'none';
};

// 检查金额输入 (必须大于0且小于余额)
window.checkTransferAmount = function() {
    const input = document.getElementById('tf-amount-input');
    const val = parseFloat(input.value);
    const btn = document.getElementById('tf-next-btn');
    
    if (val > 0) {
        btn.classList.remove('disabled'); // 亮起按钮
        currentTransferAmount = val;
    } else {
        btn.classList.add('disabled'); // 变灰按钮
    }
};

// 3. 密码输入逻辑
// 点击“转账”按钮后触发
window.showPwdOverlay = function() {
    // 检查余额够不够
    if(currentTransferAmount > walletData.balance) {
        showSystemAlert('余额不足啦宝宝！(T_T)');
        return;
    }
    
    // 切换弹窗：关掉金额页，打开密码页
    document.getElementById('transfer-amount-overlay').style.display = 'none';
    document.getElementById('transfer-pwd-overlay').style.display = 'flex';
    
    // 显示要支付的金额
    document.getElementById('pwd-display-amount').innerText = currentTransferAmount.toFixed(2);
    
    // 重置密码
    currentPwd = "";
    updatePwdDots();
};

window.closePwdOverlay = function() {
    document.getElementById('transfer-pwd-overlay').style.display = 'none';
};

// 键盘点击数字
window.typePwd = function(num) {
    if (currentPwd.length < 6) {
        currentPwd += num.toString();
        updatePwdDots(); // 更新小黑点
        
        // 输满6位，自动提交
        if (currentPwd.length === 6) {
            setTimeout(() => {
                processTransfer(); // ★ 执行转账核心逻辑
            }, 300);
        }
    }
};

// 键盘点击删除
window.delPwd = function() {
    if (currentPwd.length > 0) {
        currentPwd = currentPwd.slice(0, -1);
        updatePwdDots();
    }
};

// 更新密码框的小黑点
function updatePwdDots() {
    for (let i = 0; i < 6; i++) {
        const dot = document.getElementById(`pwd-dot-${i}`);
        if (i < currentPwd.length) dot.classList.add('active');
        else dot.classList.remove('active');
    }
}

// 4. ★★★ 核心：执行转账 (只负责发，不自动触发AI) ★★★
function processTransfer() {
    // 1. 扣钱
    walletData.balance -= currentTransferAmount;
    
    // 2. 记账 (支出)
    const chat = chatsData.find(c => c.id === currentChatId);
    const contact = contactsData.find(c => c.id === chat.contactId);
    
    walletData.bills.push({
        time: Date.now(),
        title: `转账给 ${contact.name}`,
        amount: currentTransferAmount,
        type: 'out'
    });
    
    // 3. 保存钱包数据
    localforage.setItem('Wx_Wallet_Data', walletData);
    
    // 4. 构建转账数据包 (Extra)
    const extraData = JSON.stringify({
        amount: currentTransferAmount,
        status: 'pending', // 状态：pending(待收款)
        id: Date.now()     // 唯一ID
    });
    
    // 5. 发送消息！
    sendMsg('me', '[转账]', 'transfer', null, extraData);
    
    // 6. 收尾工作
    closePwdOverlay();
    showSystemAlert('转账发送成功啦');
}

// === 丝滑动画版 App 控制器 ===

window.openApp = function(appId) {
    let targetId = (appId === 'music' || appId === 'kugou') ? 'app-kugou' : 'app-window-' + appId;
    const appWindow = document.getElementById(targetId);
    
    if (appWindow) {
        // 1. 先把架子搭起来 (display: flex)
        appWindow.style.display = 'flex';
        
        // 2. 强行重绘 (告诉浏览器：准备动起来！)
        // 这一步虽然看起来没用，但它能保证动画不会被合并
        appWindow.offsetHeight; 
        
        // 3. 加动画类
        appWindow.classList.remove('closing'); // 移除关闭残留
        appWindow.classList.add('active');
        
        // 特殊处理：酷狗小黑条
        const homeBar = document.querySelector('.home-bar');
        if(homeBar && targetId === 'app-kugou') homeBar.style.backgroundColor = '#fff';
    } else {
        showSystemAlert(`找不到应用：${targetId}`);
    }
};

window.closeApp = function(specificId) {
    const targetId = (specificId === 'kugou' || specificId === 'music') ? 'app-kugou' : 'app-window-' + specificId;
    
    // 如果没指定ID，就关闭所有
    const targets = specificId ? [document.getElementById(targetId)] : document.querySelectorAll('.app-window, #app-kugou');
    
    targets.forEach(el => {
        if(el && el.style.display !== 'none') {
            // 1. 触发关闭动画
            el.classList.remove('active');
            el.classList.add('closing'); // 可选：加个专门的关闭缩小效果
            
            // 2. 等动画播完再彻底隐藏 (400ms 对应 CSS 里的 0.4s)
            setTimeout(() => {
                // 双重检查：防止用户手速太快又点开了
                if(!el.classList.contains('active')) {
                    el.style.display = 'none';
                    el.classList.remove('closing');
                }
            }, 350); // 稍微比 CSS 快一点点，感觉更跟手
        }
    });
    
    // 恢复小黑条
    const homeBar = document.querySelector('.home-bar');
    if(homeBar) homeBar.style.backgroundColor = '#000';
};

/**
 * ====================================================================
 * ★★★ SODA MUSIC 最终究极版 (修复 V3.0) ★★★
 * 修复内容：进度条拖动、变量未定义报错、函数结构断裂、小组件同步
 * ====================================================================
 */

// --- 1. 全局配置 & 数据池 ---
const API_BASE = 'https://netease-cloud-music-api-lilac.vercel.app'; 
let currentPlaylist = []; 
let currentIndex = -1;    
let myFavorites = JSON.parse(localStorage.getItem('my_fav_songs') || '[]'); 
let lyricTimer = null; // 歌词滚动的定时器

// 图标配置
const ICONS = {
    play: "https://i.postimg.cc/ydYqzL6F/wu-biao-ti119-20260131105300.png",
    pause: "https://i.postimg.cc/cH4qNF1c/wu-biao-ti119-20260131105215.png",
    liked: "https://i.postimg.cc/XJ2HKx58/wu-biao-ti118-20260117003804.png",
    unlike: "https://i.postimg.cc/C1vPCJ8s/wu-biao-ti118-20260117003824.png"
};

// 备用API
const BACKUP_APIS = [
    'https://music-api.sigure.xyz',
    'https://netease-cloud-music-api-rose.vercel.app'
];

// --- 2. 核心功能类 ---

// (A) 状态管理器
const MusicState = {
    save: function() {
        const state = {
            playlist: currentPlaylist,
            index: currentIndex,
            currentTime: document.getElementById('global-audio')?.currentTime || 0
        };
        localStorage.setItem('soda_music_state', JSON.stringify(state));
    },
    load: function() {
        const raw = localStorage.getItem('soda_music_state');
        if(!raw) return;
        try {
            const state = JSON.parse(raw);
            if(state.playlist && state.playlist.length > 0) {
                currentPlaylist = state.playlist;
                currentIndex = state.index;
                renderPlaylist();
                // 恢复界面显示
                if(currentIndex >= 0 && currentPlaylist[currentIndex]) {
                    const song = currentPlaylist[currentIndex];
                    safeSetText('app-song-title', song.name);
                    safeSetText('app-song-artist', song.artist);
                    safeSetImage('app-album-cover', song.cover);
                    
                    // 同步小组件信息
                    safeSetText('widget-title-2', song.name);
                    safeSetText('widget-artist-2', song.artist);
                    safeSetImage('widget-cover-2', song.cover);
                    
                    checkIfLiked(song.id);
                }
            }
        } catch(e) { console.error("读取存档失败", e); }
    }
};

// (B) 歌词管理器 (修复版)
const LyricManager = {
    lrcData: [], 
    
    load: async function(id) {
        document.getElementById('lyric-content').innerHTML = '<p>正在加载歌词...</p>';
        safeSetText('widget-lyric-line', '加载歌词中...');
        
        try {
            const res = await fetch(`${API_BASE}/lyric?id=${id}`);
            const data = await res.json();
            const lrcText = (data.lrc && data.lrc.lyric) ? data.lrc.lyric : "[00:00.00] 暂无歌词";
            this.parse(lrcText);
        } catch(e) {
            document.getElementById('lyric-content').innerHTML = '<p>歌词加载失败 (T_T)</p>';
            safeSetText('widget-lyric-line', '暂无歌词');
        }
    },
    
    parse: function(text) {
        this.lrcData = [];
        const lines = text.split('\n');
        const timeExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
        lines.forEach(line => {
            const match = timeExp.exec(line);
            if(match && line.replace(timeExp, '').trim()) {
                const min = parseInt(match[1]);
                const sec = parseInt(match[2]);
                const ms = parseInt(match[3]);
                const time = min * 60 + sec + ms / (match[3].length === 3 ? 1000 : 100);
                this.lrcData.push({ time: time, text: line.replace(timeExp, '').trim() });
            }
        });
        this.render();
    },
    
    render: function() {
        const box = document.getElementById('lyric-content');
        box.innerHTML = '';
        if(this.lrcData.length === 0) {
            box.innerHTML = '<p>纯音乐 / 无歌词</p>';
            safeSetText('widget-lyric-line', 'SODA MUSIC');
            return;
        }
        this.lrcData.forEach((line, idx) => {
            const p = document.createElement('p');
            p.className = 'lrc-line';
            p.id = `lrc-${idx}`;
            p.innerText = line.text;
            p.onclick = () => { document.getElementById('global-audio').currentTime = line.time; };
            box.appendChild(p);
        });
    },
    
    sync: function(currentTime) {
        let activeIdx = -1;
        for(let i = 0; i < this.lrcData.length; i++) {
            if(currentTime >= this.lrcData[i].time) { activeIdx = i; } else { break; }
        }
        
        if(activeIdx !== -1) {
            // A. 主App歌词滚动
            document.querySelectorAll('.lrc-active').forEach(el => el.classList.remove('lrc-active'));
            const activeLine = document.getElementById(`lrc-${activeIdx}`);
            if(activeLine) {
                activeLine.classList.add('lrc-active');
                activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            
            // B. 小组件单行歌词
            const text = this.lrcData[activeIdx].text;
            safeSetText('widget-lyric-line', text);

            // C. ★★★ 悬浮歌词同步 (这里修好啦！) ★★★
            const floatText = document.querySelector('#float-lyric-bar .fl-text');
            if(floatText) {
                floatText.innerText = text;
            }
        }
    }
};

// (C) 增强版VIP解析器
class EnhancedVIPPlayer {
    constructor() { this.baseUrl = API_BASE; }
    async getVipPreview(songId) {
        try {
            let detailRes, urlRes;
            try {
                [detailRes, urlRes] = await Promise.all([
                    fetch(`${this.baseUrl}/song/detail?ids=${songId}`),
                    fetch(`${this.baseUrl}/song/url?id=${songId}`)
                ]);
            } catch(e) {
                console.warn("主API失败，切换备用...");
                const backup = BACKUP_APIS[0];
                [detailRes, urlRes] = await Promise.all([
                    fetch(`${backup}/song/detail?ids=${songId}`),
                    fetch(`${backup}/song/url?id=${songId}`)
                ]);
            }
            const detailData = await detailRes.json();
            const urlData = await urlRes.json();
            const song = detailData.songs[0];
            const audioData = urlData.data[0];
            if (!audioData || !audioData.url) return { success: false, error: "无链接" };
            
            const isVip = (song.fee === 1 || song.fee === 4);
            const isPreview = isVip && (audioData.time < 60000 || audioData.freeTrialInfo);
            return {
                success: true,
                song: {
                    id: song.id,
                    name: song.name,
                    artists: song.ar.map(a => a.name).join(' / '),
                    album: song.al.name,
                    cover: song.al.picUrl,
                    isVip: isVip
                },
                audio: {
                    url: audioData.url,
                    isPreview: isPreview,
                    trialDuration: 30
                }
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}
const vipPlayer = new EnhancedVIPPlayer();


// --- 3. 核心播放控制 (PlayIndex) ★★★ 修复了顺序问题 ★★★ ---
window.playIndex = async function(idx) {
    if (idx < 0 || idx >= currentPlaylist.length) return;
    
    currentIndex = idx;
    const basicInfo = currentPlaylist[idx];
    
    // 1. UI预更新
    safeSetText('app-song-title', basicInfo.name);
    safeSetText('app-song-artist', basicInfo.artist);
    // 也要预更新小组件，不然会有一瞬间是上一首的信息
    safeSetText('widget-title-2', basicInfo.name);
    safeSetText('widget-artist-2', basicInfo.artist);
    
    checkIfLiked(basicInfo.id);
    renderPlaylist();
    
    showSystemAlert(`🎵 解析中：${basicInfo.name}...`, 'loading');
    
    // 2. 获取音源 (必须等拿到结果，才能用 result 变量！)
    const result = await vipPlayer.getVipPreview(basicInfo.id);
    
    if (!result.success) {
        showSystemAlert("播放失败：资源可能下架了", 'error');
        return;
    }

    // 3. 加载歌词
    LyricManager.load(basicInfo.id);

    // 4. 播放设置
    const audio = document.getElementById('global-audio');
    audio.src = result.audio.url;
    
    if (result.audio.isPreview) {
        showSystemAlert("VIP试听模式 (30秒)", 'vip');
        safeSetText('quality-indicator', '试听');
    } else {
        showSystemAlert(`开始播放：${result.song.name}`, 'success');
        safeSetText('quality-indicator', 'SQ');
    }

    try {
        await audio.play();
        window.isMusicPlaying = true;
        updatePlayerState(true); // 更新UI状态
        MusicState.save(); 
    } catch(e) {
        console.error("自动播放被拦截", e);
    }
    
    // 5. 更新封面 (主App + 小组件)
    const finalCover = result.song.cover || basicInfo.cover;
    safeSetImage('app-album-cover', finalCover);
    safeSetImage('widget-cover-2', finalCover); 
};

// --- 4. 界面/状态更新 ★★★ 修复了函数断裂问题 ★★★ ---
function updatePlayerState(isPlaying) {
    // 主App元素
    const playBtn = document.getElementById('app-play-btn-img');
    const disk = document.getElementById('app-album-cover');
    const wave = document.getElementById('wave-visualizer');

    // 小组件元素
    const widgetBtn = document.getElementById('widget-play-btn-2');
    
    if(isPlaying) {
        window.isMusicPlaying = true;
        // 主App
        if(playBtn) playBtn.src = ICONS.pause;
        if(disk) { disk.classList.remove('disk-paused'); disk.classList.add('disk-rotating'); }
        if(wave) wave.classList.add('playing'); 
        // 小组件
        if(widgetBtn) widgetBtn.src = ICONS.pause;
    } else {
        window.isMusicPlaying = false;
        // 主App
        if(playBtn) playBtn.src = ICONS.play;
        if(disk) disk.classList.add('disk-paused');
        if(wave) wave.classList.remove('playing');
        // 小组件
        if(widgetBtn) widgetBtn.src = ICONS.play;
    }
}

window.toggleMusic = function() {
    const audio = document.getElementById('global-audio');
    if(audio.paused) {
        audio.play();
        updatePlayerState(true);
    } else {
        audio.pause();
        updatePlayerState(false);
    }
};

window.toggleLyricView = function() {
    const diskView = document.getElementById('disk-view');
    const lyricView = document.getElementById('lyric-view');
    if(lyricView.style.display === 'none') {
        diskView.style.display = 'none'; lyricView.style.display = 'block';
    } else {
        lyricView.style.display = 'none'; diskView.style.display = 'flex';
    }
};

// --- 5. 辅助功能 ---
window.searchMusicCloud = async function() {
    const input = document.getElementById('music-search-keyword');
    const keyword = input ? input.value.trim() : '';
    const resultBox = document.getElementById('music-search-results');
    
    if(!keyword) return showSystemAlert("请输入歌名", 'info');
    resultBox.innerHTML = '<div style="text-align:center;padding:50px;color:rgba(255,255,255,0.4);">正在搜索...</div>';

    try {
        const res = await fetch(`${API_BASE}/search?keywords=${keyword}&limit=20`);
        const data = await res.json();
        
        if(!data.result || !data.result.songs) {
            resultBox.innerHTML = '<div style="text-align:center;padding:50px;color:rgba(255,255,255,0.4);">未找到结果</div>';
            return;
        }

        resultBox.innerHTML = ''; 
        data.result.songs.forEach(song => {
            const artist = song.artists.map(a=>a.name).join('/');
            const isVip = (song.fee === 1 || song.fee === 4);
            const coverImg = song.album?.artist?.img1v1Url || song.artists[0]?.img1v1Url || 'https://i.postimg.cc/k4kM9S4h/default-cover.png';
            
            const div = document.createElement('div');
            div.className = 'ins-search-item';
            div.innerHTML = `
                <img src="${coverImg}" class="ins-search-cover">
                <div class="ins-search-info">
                    <div class="ins-search-title">
                        ${song.name}
                        ${isVip ? '<span style="background:rgba(252, 231, 109, 0.2); color:#fce76d; font-size:10px; padding:1px 4px; border-radius:3px;">VIP</span>' : ''}
                    </div>
                    <div class="ins-search-artist">${artist}</div>
                </div>
                <div class="ins-add-btn">+</div>
            `;
            div.onclick = () => {
                div.style.transform = 'scale(0.95)';
                setTimeout(()=>div.style.transform='scale(1)', 150);
                addToPlaylist({ id: song.id, name: song.name, artist: artist, cover: coverImg }, true);
                toggleMusicSearch();
                showSystemAlert(`正在播放  ${song.name}`, 'success');
            };
            resultBox.appendChild(div);
        });
    } catch(e) {
        resultBox.innerHTML = '<div style="text-align:center;padding:50px;color:rgba(255,255,255,0.4);">网络开小差了...</div>';
    }
};

window.addToPlaylist = function(songInfo, playNow = false) {
    const existingIdx = currentPlaylist.findIndex(s => s.id === songInfo.id);
    if (existingIdx !== -1) {
        if(playNow) playIndex(existingIdx);
    } else {
        currentPlaylist.push(songInfo);
        MusicState.save();
        if(playNow) playIndex(currentPlaylist.length - 1);
    }
    renderPlaylist();
};

window.playNext = function() {
    if(currentPlaylist.length === 0) return;
    let nextIdx = currentIndex + 1;
    if(nextIdx >= currentPlaylist.length) nextIdx = 0;
    playIndex(nextIdx);
};
window.playPrev = function() {
    if(currentPlaylist.length === 0) return;
    let prevIdx = currentIndex - 1;
    if(prevIdx < 0) prevIdx = currentPlaylist.length - 1;
    playIndex(prevIdx);
};

// ==========================================================
// ★★★ 监听器与初始化 (究极缝合版：修复冲突 + 循环模式) ★★★
// ==========================================================

// 1. 播放模式配置 (放在这里是为了防止重复定义报错)
if (typeof playMode === 'undefined') {
    var playMode = 'sequence'; // 默认：顺序播放
}
const MODE_ICONS = {
    sequence: "https://i.postimg.cc/KzptZwYK/wu-biao-ti119-20260131195925.png", // 顺序
    loop:     "https://i.postimg.cc/63bC9gQ2/wu-biao-ti119-20260131195916.png", // 单曲
    shuffle:  "https://i.postimg.cc/ydp0VtN3/wu-biao-ti119-20260131195934.png"  // 随机
};

// 2. 切换模式函数
window.togglePlayMode = function() {
    const btn = document.getElementById('play-mode-btn');
    
    // 切换逻辑：顺序 -> 单曲 -> 随机 -> 顺序
    if (playMode === 'sequence') {
        playMode = 'loop';
        showSystemAlert("单曲循环 🔂");
    } else if (playMode === 'loop') {
        playMode = 'shuffle';
        showSystemAlert("随机播放 🔀");
    } else {
        playMode = 'sequence';
        showSystemAlert("顺序播放 🔁");
    }
    
    // 更新图标
    if (btn) btn.src = MODE_ICONS[playMode];
};

// 3. 核心：下一首逻辑 (带模式判断)
window.playNext = function(isAuto = false) {
    if (currentPlaylist.length === 0) return;

    let nextIdx = currentIndex;

    // ★ 根据模式决定下一首 ★
    if (playMode === 'shuffle') {
        // 随机模式：随机选一个
        let randomIdx = Math.floor(Math.random() * currentPlaylist.length);
        // 防止随机到当前这首 (除非只有这一首)
        if (currentPlaylist.length > 1) {
            while (randomIdx === currentIndex) {
                randomIdx = Math.floor(Math.random() * currentPlaylist.length);
            }
        }
        nextIdx = randomIdx;
    } 
    else if (playMode === 'loop') {
        // 单曲循环模式：
        // 如果是自动播放结束 (isAuto=true) -> 重播当前这首
        // 如果是手动点按钮 (isAuto=false) -> 切下一首
        if (isAuto) {
            nextIdx = currentIndex; 
        } else {
            nextIdx = currentIndex + 1;
        }
    } 
    else {
        // 顺序模式
        nextIdx = currentIndex + 1;
    }

    // 列表循环保护
    if (nextIdx >= currentPlaylist.length) nextIdx = 0;
    
    playIndex(nextIdx);
};

// 4. 上一首逻辑
window.playPrev = function() {
    if (currentPlaylist.length === 0) return;
    let prevIdx = currentIndex;
    
    if (playMode === 'shuffle') {
        prevIdx = Math.floor(Math.random() * currentPlaylist.length);
    } else {
        prevIdx = currentIndex - 1;
        if (prevIdx < 0) prevIdx = currentPlaylist.length - 1;
    }
    playIndex(prevIdx);
};

// 5. 全局监听器 (进度条 + 歌词 + 自动切歌)
// ★★★ 重点：这里只定义一次 globalAudio，不会报错了！ ★★★
const globalAudio = document.getElementById('global-audio');
if(globalAudio) {
    // A. 进度更新事件
    globalAudio.ontimeupdate = function() {
        const curr = globalAudio.currentTime;
        const dur = globalAudio.duration;
        
        if(dur && dur > 0) {
            const percent = (curr / dur) * 100;
            const format = t => Math.floor(t/60).toString().padStart(1,'0') + ':' + Math.floor(t%60).toString().padStart(2,'0');
            
            // 更新主App进度条 (防抖动)
            const bar = document.getElementById('prog-bar');
            if(bar && document.activeElement !== bar) {
                bar.value = percent;
            }
            safeSetText('curr-time', format(curr));
            safeSetText('total-time', format(dur));

            // 更新小组件进度条
            const widgetFill = document.getElementById('widget-prog-fill');
            const widgetCurr = document.getElementById('widget-curr-time');
            const widgetTotal = document.getElementById('widget-total-time');
            if(widgetFill) widgetFill.style.width = `${percent}%`;
            if(widgetCurr) widgetCurr.innerText = format(curr);
            if(widgetTotal) widgetTotal.innerText = format(dur);

            // 同步歌词
            if(typeof LyricManager !== 'undefined') LyricManager.sync(curr);
        }
    };
    
    // B. 拖动进度条事件
    const progBar = document.getElementById('prog-bar');
    if(progBar) {
        progBar.addEventListener('input', function(e) {
            const val = e.target.value;
            const dur = globalAudio.duration;
            if(dur) globalAudio.currentTime = (val / 100) * dur;
        });
    }

    // C. 播放结束事件 (接入新的切歌逻辑)
    globalAudio.onended = function() {
        // 传入 true，告诉它这是自动结束的
        // 这样单曲循环模式下才会重播自己
        playNext(true); 
    };
}

// 6. 启动时读取存档
window.addEventListener('load', () => {
    if(typeof MusicState !== 'undefined') MusicState.load();
    // 恢复之前的播放模式图标
    const btn = document.getElementById('play-mode-btn');
    if(btn && typeof playMode !== 'undefined' && MODE_ICONS[playMode]) {
        btn.src = MODE_ICONS[playMode];
    }
});

// ==========================================================
// ★★★ 一键换肤功能 ★★★
// ==========================================================
// 1. 点击按钮触发选图
window.triggerBgChange = function() {
    document.getElementById('bg-image-input').click();
};

// 2. 图片选择后的处理
window.handleBgChange = function(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        
        showSystemAlert("正在更换背景...", "loading");

        reader.onload = function(e) {
            const newBgUrl = e.target.result; // 这里的 result 是图片的 Base64 编码
            
            // A. 设置新背景
            const bgEl = document.querySelector('.kugou-bg');
            if(bgEl) bgEl.style.backgroundImage = `url('${newBgUrl}')`;
            
            // B. 保存到本地存储 (记住你的选择！)
            try {
                localStorage.setItem('my_kugou_bg', newBgUrl);
                showSystemAlert("背景更换成功！✨", "success");
            } catch(err) {
                showSystemAlert("图片太大了，没法保存，但这次可以看！", "info");
                console.warn("背景保存失败(可能是图片太大):", err);
            }
        };
        
        reader.readAsDataURL(file);
    }
};

// 3. 初始化时加载保存的背景
// (请确保这段代码在 window.addEventListener('load', ...) 里面)
window.addEventListener('load', () => {
    // ... 其他初始化代码 ...
    
    // ★★★ 加载自定义背景 ★★★
    const savedBg = localStorage.getItem('my_kugou_bg');
    if(savedBg) {
        const bgEl = document.querySelector('.kugou-bg');
        if(bgEl) bgEl.style.backgroundImage = `url('${savedBg}')`;
    }
});
// ==========================================================
// ★★★ 7. 界面交互与工具 (补回丢失的四肢) ★★★
// ==========================================================

// 1. 切换 搜索框
window.toggleMusicSearch = function() { 
    const d = document.getElementById('search-drawer'); 
    if(d) {
        d.style.top = (d.style.top === '0px' ? '-100%' : '0px'); 
        // 如果打开了搜索，就把列表关掉，防止重叠
        if(d.style.top === '0px') {
            const list = document.getElementById('playlist-drawer');
            if(list) list.style.bottom = '-100%';
        }
    }
};

// 2. 切换 播放列表
window.toggleMusicList = function() { 
    renderPlaylist(); // 打开前刷新一下数据
    const d = document.getElementById('playlist-drawer'); 
    if(d) {
        d.style.bottom = (d.style.bottom === '0px' ? '-100%' : '0px'); 
        // 如果打开了列表，就把搜索关掉
        if(d.style.bottom === '0px') {
            const search = document.getElementById('search-drawer');
            if(search) search.style.top = '-100%';
        }
    }
};

// 3. 切换 唱片/歌词 视图
window.toggleLyricView = function() {
    const diskView = document.getElementById('disk-view');
    const lyricView = document.getElementById('lyric-view');
    
    if(lyricView.style.display === 'none') {
        // 显示歌词
        diskView.style.display = 'none';
        lyricView.style.display = 'block';
    } else {
        // 显示唱片
        lyricView.style.display = 'none'; 
        diskView.style.display = 'flex';
    }
};

// 4. 清空列表
window.clearPlaylist = function() { 
    currentPlaylist = []; 
    currentIndex = -1; 
    renderPlaylist(); 
    if(typeof MusicState !== 'undefined') MusicState.save();
    
    // 停止播放
    const audio = document.getElementById('global-audio');
    if(audio) audio.pause();
    
    showSystemAlert("列表已清空"); 
};

// 5. 渲染播放列表
function renderPlaylist() {
    const box = document.getElementById('playlist-content');
    if(!box) return;
    box.innerHTML = '';
    
    if(currentPlaylist.length === 0) {
        box.innerHTML = '<div style="text-align:center; padding:30px; color:#666;">列表空空如也~</div>';
        return;
    }

    currentPlaylist.forEach((song, idx) => {
        const isPlaying = (idx === currentIndex);
        const div = document.createElement('div');
        div.className = `playlist-item ${isPlaying ? 'playing' : ''}`; // 记得在CSS里写 .playing { color: #fce76d; }
        
        // 构建列表项
        div.innerHTML = `
            <div style="flex:1; overflow:hidden;">
                <div style="font-size:14px; font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:${isPlaying?'#fce76d':'#fff'}">
                    ${idx+1}. ${song.name}
                </div>
                <div style="font-size:12px; color:#888;">${song.artist}</div>
            </div>
            <div onclick="event.stopPropagation(); removeFromList(${idx})" style="padding:10px; color:#666; cursor:pointer;">×</div>
        `;
        
        // 点击切歌
        div.onclick = () => playIndex(idx);
        box.appendChild(div);
    });
}

// 6. 从列表中删除
window.removeFromList = function(idx) {
    currentPlaylist.splice(idx, 1);
    
    // 如果删的是当前正在播的
    if(idx === currentIndex) {
        playNext(); // 切下一首
    } 
    // 如果删的是前面的歌，当前索引要减1
    else if(idx < currentIndex) {
        currentIndex--;
    }
    
    if(typeof MusicState !== 'undefined') MusicState.save();
    renderPlaylist();
};

// 7. 收藏功能
window.toggleFavorite = function() {
    if(currentIndex === -1) return;
    const song = currentPlaylist[currentIndex];
    
    const favIdx = myFavorites.findIndex(s => s.id === song.id);
    if(favIdx === -1) {
        myFavorites.push(song);
        showSystemAlert("已收藏 ❤");
    } else {
        myFavorites.splice(favIdx, 1);
        showSystemAlert("已取消收藏 💔");
    }
    
    localStorage.setItem('my_fav_songs', JSON.stringify(myFavorites));
    checkIfLiked(song.id);
};

// 8. 检查是否收藏 (更新爱心图标)
function checkIfLiked(songId) {
    const img = document.getElementById('like-btn-img');
    if(!img) return;
    
    const isLiked = myFavorites.some(s => s.id === songId);
    if(isLiked) {
        img.src = ICONS.liked; // 实心红心
    } else {
        img.src = ICONS.unlike; // 空心爱心
    }
}

// 9. 小组件进度条拖动支持
window.seekFromWidget = function(e) {
    const audio = document.getElementById('global-audio');
    if(!audio || !audio.duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percent = x / width;
    
    audio.currentTime = percent * audio.duration;
};

// 10. 安全设置文本/图片的防报错助手
function safeSetText(id, text) { 
    const el = document.getElementById(id); 
    if(el) el.innerText = text; 
}
function safeSetImage(id, url) { 
    const el = document.getElementById(id); 
    if(el) el.src = url; 
}
