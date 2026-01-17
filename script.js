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
        localforage.getItem('Wx_Moments_Data') // ★ 1. 补上了这里的逗号和数据项
    ]).then(([contacts, personas, chats, config, presets, moments]) => { // ★ 2. 这里接收 moments
        contactsData = contacts || [];
        personasData = personas || [];
        chatsData = chats || [];
        momentsData = moments || []; // ★ 3. 赋值给全局变量
        
        if (config) {
            // 兼容旧数据
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
        renderChatList();
        renderApiUI();
        renderPresetDropdown();
        renderMomentsFeed(); // 渲染朋友圈
    });
};

// ==========================================================
// [2] 视觉与记忆 (Visual & Memory)
// ==========================================================

function getUniqueKey(el, index, prefix) {
    if (el.id) return `ID:${el.id}`;
    return `AUTO:${prefix}_${index}`;
}

// 保存界面状态 (文字、图片、开关)
function saveMemory() {
    const data = {
        texts: {},
        images: {},
        switches: {},
        wallpaper: document.getElementById('phoneScreen')?.style.backgroundImage || ''
    };

    // 存文字
    document.querySelectorAll('.edit-text').forEach((el, index) => {
        data.texts[getUniqueKey(el, index, 'txt')] = el.innerText;
    });

    // 存图片
const imgSelectors = '.upload-img, .app-icon, .profile-avatar, .polaroid-img, .wx-big-avatar, .wx-small-avatar, .wx-p2-header-bg, .wx-big-avatar-new, .sync-avatar, .chl-frame, .w-mini-cover, .w-thumb-item, .big-photo-widget, .ins-square-widget';
    document.querySelectorAll(imgSelectors).forEach((el, index) => {
        const bg = el.style.backgroundImage;
        if (bg && bg !== 'initial' && bg !== '' && bg !== 'none') {
            data.images[getUniqueKey(el, index, 'img')] = bg;
        }
    });

    // 存开关
    document.querySelectorAll('.ios-switch input').forEach((el, index) => {
        data.switches[getUniqueKey(el, index, 'sw')] = el.checked;
    });

    localforage.setItem(MEMORY_KEY, data).catch(console.error);
}

// ====================
// [核心] 读取记忆 & 恢复现场 (包含吐司边框修复)
// ====================
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

            // 4. 恢复壁纸 (特判)
            if (data.wallpaper) {
                const screen = document.getElementById('phoneScreen');
                if (screen) {
                    screen.style.backgroundImage = data.wallpaper;
                    screen.style.backgroundSize = 'cover';
                    screen.style.backgroundPosition = 'center';
                }
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

// 音乐播放器简易逻辑
let isMusicPlaying = false;
window.toggleMusic = function() {
    isMusicPlaying = !isMusicPlaying;
    const btn = document.getElementById('soda-play-btn');
    if(btn) isMusicPlaying ? btn.classList.add('playing') : btn.classList.remove('playing');
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
        alert('至少给个名字嘛> ˄ ˂̥̥....'); 
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
// === 修复版：进入聊天 (不再报错啦) ===
window.enterChat = function(chat) {
    // 1. 找到聊天对象
    const contact = contactsData.find(c => c.id === chat.contactId);
    
    // 2. 清除红点 & 更新数据
    chat.unread = 0;
    saveChatAndRefresh(chat); 
    updateGlobalBadges(); 
    
    currentChatId = chat.id; // 锁定当前聊天ID
    
    // 3. 更新顶栏信息 (名字、头像、背景)
    const nameEl = document.getElementById('chat_layer_name');
    if(nameEl) {
        // 优先显示私有备注
        nameEl.innerText = contact ? (contact.privateAlias || contact.name) : 'Unknown';
    }

    const avatarEl = document.getElementById('chat_layer_avatar');
    if(avatarEl && contact) {
        avatarEl.style.backgroundImage = contact.avatar;
    }
    
    // 4. 读取专属头像框
    const frameEl = document.getElementById('chat_layer_frame');
    if (frameEl) {
        if (contact && contact.frame) {
            frameEl.style.backgroundImage = `url('${contact.frame}')`;
        } else {
            frameEl.style.backgroundImage = 'none';
        }
    }

    // 5. 显示页面
    const page = document.getElementById('sub-page-chat-detail');
    if(page) {
        page.style.display = 'flex';
        setTimeout(() => page.classList.add('active'), 10);
    }
    
    // 6. 滚动逻辑 & 背景图设置
    currentRenderLimit = 40;
    const msgArea = document.getElementById('chat-msg-area'); // ★ 只定义这一次！
    
    if(msgArea) {
        // (A) 设置背景图
        if (chat.bgImage) {
            msgArea.style.backgroundImage = chat.bgImage;
            msgArea.style.backgroundSize = 'cover';
            msgArea.style.backgroundPosition = 'center';
            msgArea.style.backgroundAttachment = 'fixed'; 
        } else {
            msgArea.style.backgroundImage = 'none';
        }

        // (B) 绑定滚动
        msgArea.onscroll = () => {
            if (msgArea.scrollTop === 0) {
                loadMoreMessages();
            }
        };
        
        // (C) 渲染消息
        renderMessages(chat.id);
    }
};

window.closeChatDetail = function() {
    document.getElementById('sub-page-chat-detail').classList.remove('active');
    setTimeout(() => document.getElementById('sub-page-chat-detail').style.display = 'none', 300);
    currentChatId = null;
    renderChatList(); // 退出时刷新列表(以防万一)
};

// 辅助：高级时间格式化
function formatChatSystemTime(ts) {
    const d = new Date(ts);
    const now = new Date();
    const diffMs = now - d;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    const timeStr = `${d.getHours()}:${d.getMinutes().toString().padStart(2,'0')}`;
    const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // 24小时内：只显示时间
    if (d.toDateString() === now.toDateString()) {
        return timeStr;
    }
    // 7天内：星期 + 时间
    if (diffDays < 7) {
        return `${daysEn[d.getDay()]} ${timeStr}`;
    }
    // 超过7天：日期 + 时间
    return `${d.getMonth()+1}/${d.getDate()} ${timeStr}`;
}

// 辅助：头像下的小时间 (只显示 时:分)
function formatMiniTime(ts) {
    const d = new Date(ts);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2,'0')}`;
}

// === 渲染消息 ===
// 辅助：高级时间格式化
function formatChatSystemTime(ts) {
    const d = new Date(ts);
    const now = new Date();
    const diffMs = now - d;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    const timeStr = `${d.getHours()}:${d.getMinutes().toString().padStart(2,'0')}`;
    const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // 24小时内：只显示时间
    if (d.toDateString() === now.toDateString()) {
        return timeStr;
    }
    // 7天内：星期 + 时间
    if (diffDays < 7) {
        return `${daysEn[d.getDay()]} ${timeStr}`;
    }
    // 超过7天：日期 + 时间
    return `${d.getMonth()+1}/${d.getDate()} ${timeStr}`;
}

// 辅助：头像下的小时间 (只显示 时:分)
function formatMiniTime(ts) {
    const d = new Date(ts);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2,'0')}`;
}

// === 渲染消息 (修复版：支持表情包) ===
function renderMessages(chatId, autoScroll = true) {
    const container = document.getElementById('chat-msg-area');
    container.innerHTML = ''; 
    
    const chat = chatsData.find(c => c.id === chatId);
    if (!chat || !chat.messages) return;

    const contact = contactsData.find(c => c.id === chat.contactId);
    const persona = personasData.find(p => p.id === chat.personaId) || { avatar: '' };

    // 分页截取
    const totalCount = chat.messages.length;
    const startIndex = Math.max(0, totalCount - currentRenderLimit);
    const msgsToRender = chat.messages.slice(startIndex);
    
    if (startIndex > 0) {
        const tip = document.createElement('div');
        tip.style.textAlign = 'center'; tip.style.color = '#ccc'; tip.style.fontSize = '12px'; tip.style.padding = '10px';
        tip.innerText = "下拉加载更多回忆...";
        container.appendChild(tip);
    }

    let lastTime = 0;
    let lastRole = null; 

    msgsToRender.forEach((msg, i) => {
        const realIndex = startIndex + i;
        const isMe = msg.role === 'me';
        
        // 1. 系统时间胶囊
        if (msg.timestamp - lastTime > 15 * 60 * 1000) {
            const timeDiv = document.createElement('div');
            timeDiv.className = 'msg-time-pill';
            timeDiv.innerText = formatChatSystemTime(msg.timestamp);
            container.appendChild(timeDiv);
            lastTime = msg.timestamp;
            lastRole = null; 
        }

        // 2. 撤回消息处理
        if (msg.type === 'recall') {
            const recallDiv = document.createElement('div');
            recallDiv.className = 'msg-recall-pill';
            const who = isMe ? '我' : (contact ? contact.name : 'TA');
            const contentToPeek = msg.originalText || "未知内容";
            recallDiv.innerHTML = `${who} 撤回了一条消息 <span class="recall-link" onclick="alert('偷看内容：\\n${contentToPeek.replace(/'/g, "")}')">点击偷看</span>`;
            container.appendChild(recallDiv);
            lastRole = null; 
            return; 
        }

        // 3. 决定是否显示头像
        let showAvatar = false;
        if (msg.role !== lastRole || (msg.timestamp - (msgsToRender[i-1]?.timestamp || 0) > 2 * 60 * 1000)) {
            showAvatar = true;
        }

        // 计算是否有尾巴
        let hasTail = false;
        const nextMsg = msgsToRender[i + 1];
        if (!nextMsg || nextMsg.role !== msg.role || (nextMsg.timestamp - msg.timestamp > 2 * 60 * 1000)) {
            hasTail = true;
        }

        // 4. 构建气泡行
        const row = document.createElement('div');
        row.className = `msg-row ${isMe ? 'me' : 'other'} ${hasTail ? 'has-tail' : ''}`;
        row.dataset.msgIndex = realIndex;
        row.id = `msg-${msg.timestamp}`;

        if (realIndex === totalCount - 1 && (Date.now() - msg.timestamp < 1000)) {
             row.classList.add('new-msg-anim');
        }

        // 准备头像 HTML
        const avatarUrl = isMe ? persona.avatar : (contact ? contact.avatar : '');
        const bgStyle = getAvatarStyle(avatarUrl);
        const miniTime = formatMiniTime(msg.timestamp);

        // 头像列结构
        let avatarHtml = '';
        if (showAvatar) {
            avatarHtml = `
                <div class="msg-avatar-col">
                    <div class="msg-avatar" style="${bgStyle}"></div>
                    <div class="msg-avatar-time">${miniTime}</div>
                </div>
            `;
        } else {
            avatarHtml = `<div class="msg-avatar-placeholder"></div>`;
        }

        // ★★★ 核心修复：处理表情包显示 ★★★
        let contentHtml = '';
        let extraClass = '';

        if (msg.type === 'sticker') {
            // 如果是表情包，显示图片 (优先取 content, 没有取 text 兜底)
            const imgSrc = msg.content || msg.text; 
            contentHtml = `<img src="${imgSrc}" class="sticker-img-big">`;
            extraClass = 'sticker-type'; // 加上这个类，让背景透明
        } else {
            // 普通文本
            contentHtml = msg.text || '';
        }

        // 组装内容气泡
        const mainBubble = `<div class="msg-content ${extraClass}">${contentHtml}</div>`;
        
        // 引用
        let quoteHtml = '';
        if (msg.quote) {
            let fullQuoteText = `${msg.quote.name}：${msg.quote.text}`;
            if (fullQuoteText.length > 15) fullQuoteText = fullQuoteText.substring(0, 15) + "...";
            quoteHtml = `<div class="msg-quote-outside" onclick="scrollToMsg('${msg.quote.id}')">${fullQuoteText}</div>`;
        }

        // 组合 HTML
        if (isMe) {
            row.innerHTML = `
                <div class="msg-container-col">
                    ${mainBubble}
                    ${quoteHtml}
                </div>
                ${avatarHtml}
            `;
        } else {
            row.innerHTML = `
                ${avatarHtml}
                <div class="msg-container-col">
                    ${mainBubble}
                    ${quoteHtml}
                </div>
            `;
        }
        
        // 绑定长按菜单
        const bubbleContent = row.querySelector('.msg-content');
        if(bubbleContent) bindLongPress(bubbleContent);
        
        container.appendChild(row);

        lastRole = msg.role;
    });

    // 5. 底部状态
    if (totalCount > 0) {
        const lastMsg = chat.messages[totalCount - 1];
        const statusDiv = document.createElement('div');
        statusDiv.className = 'msg-status-foot';
        const d = new Date(lastMsg.timestamp);
        const timeStr = `${d.getHours()}:${d.getMinutes().toString().padStart(2,'0')}`;
        let statusText = lastMsg.role === 'other' ? "已读" : "已送达";
        
        statusDiv.innerText = `${statusText} ${timeStr}`;
        if (lastMsg.role === 'other') {
            statusDiv.style.textAlign = 'left'; statusDiv.style.paddingLeft = '58px'; 
        } else {
            statusDiv.style.textAlign = 'right'; statusDiv.style.paddingRight = '58px'; 
        }
        container.appendChild(statusDiv);
    }

    if (autoScroll) {
        container.scrollTop = container.scrollHeight;
    }
}

window.sendMsg = function(role, text = null, type = 'text', customQuote = null) {
    if (!currentChatId) return;
    const input = document.getElementById('chat-input');
    const content = text || input.value;
    if (!content) return;

    const chatIndex = chatsData.findIndex(c => c.id === currentChatId);
    if (chatIndex === -1) return;
    if (!chatsData[chatIndex].messages) chatsData[chatIndex].messages = [];

    // 构建消息对象
    const newMsg = { 
        role: role, 
        text: content, 
        timestamp: Date.now(),
        type: type 
    };

    // 如果有引用
    if (currentQuoteMsg || customQuote) {
        newMsg.quote = customQuote || currentQuoteMsg;
        currentQuoteMsg = null; // 用完清空
        // 还原输入框 placeholder
        input.placeholder = "iMessage";
    }

chatsData[chatIndex].messages.push(newMsg);
    // 只有普通消息才更新列表预览，撤回的不更新
    if(type === 'text') {
        chatsData[chatIndex].lastMsg = content;
    }
    chatsData[chatIndex].lastTime = Date.now();
    
    // 先把这个聊天对象牢牢抓住，存到一个变量里！
    let targetChat = chatsData[chatIndex]; 
    
    // 自动顶置逻辑
    if (!targetChat.pinned) {
        // 从原来的位置删掉
        chatsData.splice(chatIndex, 1);
        // 放到第一位
        chatsData.unshift(targetChat);
    }

    // 保存并刷新
saveChatAndRefresh(targetChat);

    if (role === 'me') input.value = ''; 
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

// === AI 触发逻辑 (修复版：包含位置追踪 + 消息分段循环) ===
window.triggerAI = async function() {
    if (!currentChatId) return;
    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat) return;

    // 1. 获取角色信息
    const char = contactsData.find(c => c.id === chat.contactId); 
    const me = personasData.find(p => p.id === chat.personaId) || { name: 'User', desc: '无', persona: '无' };
    
    // 2. 引用逻辑 (随机引用旧消息)
    let aiQuote = null;
    if (Math.random() < 0.3 && chat.messages.length > 0) {
        const recentMsgs = chat.messages.slice(-10).filter(m => m.role === 'me' && m.text && m.text.length > 4);
        if (recentMsgs.length > 0) {
            const randomMsg = recentMsgs[Math.floor(Math.random() * recentMsgs.length)];
            aiQuote = { text: randomMsg.text, name: me.name || '你', id: randomMsg.timestamp };
        }
    }

    // 3. 构建历史消息
    const history = (chat.messages || []).slice(-15).map(m => {
        let content = m.text;
        
        // ★ 新增：如果是撤回消息
        if (m.type === 'recall') content = m.originalText || "（撤回内容）";
        
        // ★★★ 新增：如果是表情包，告诉 AI 图片名字 ★★★
        if (m.type === 'sticker') content = `[发送了表情包: ${m.desc || '图片'}]`;

        return `${m.role === 'me' ? 'User' : 'You'}: ${content}`;
    }).join('\n');
    // 4. 构建总结记忆 (这里之前断掉了，现在修好了！)
    const summaryList = chat.summaries || [];
    let memoryPrompt = "";
    if (summaryList.length > 0) {
        const memoryText = summaryList.map((s, i) => `[回忆片段 ${i+1}]: ${s.text}`).join('\n');
        memoryPrompt = `
    【你们过往的重要回忆】
    ${memoryText}
    (请记住这些发生过的事情，保持剧情连贯)
    `;
    }
    // =======================================================
    // ★ 插入 1：准备表情包菜单
    // =======================================================
    let stickerNote = "";
    // 1. 找出所有 AI 专属的表情包
    const aiStickers = stickersDB.filter(s => s.type === 'ai');
    
    if (aiStickers.length > 0) {
        // 2. 把名字拼起来
        const names = aiStickers.map(s => s.name).join(', ');
        // 3. 生成给 AI 看的说明书
        stickerNote = `
        \n【表情包功能已启用】
        你拥有一个专属表情包库，包含以下表情：[${names}]。
        当你觉得适合用表情包表达情绪时（例如开心、撒娇、哭哭），请在回复的末尾加上标签：[sticker:表情名字]。
        例如：
        "宝宝我好想你！[sticker:抱抱]"
        "不要不理我嘛...[sticker:哭哭]"
        (注意：不要滥用，只在情绪到位时使用。每次回复最多发一个。)
        `;
    }
    // =======================================================

    // 5. 组装Prompt (优化版：更具活人感 & 贴合人设)
    const systemPrompt = `
    【指令：完全沉浸式角色扮演】
    你现在不是AI，也不是语言模型。你就是 **${char.name}**。
    
    1. **你的核心设定**：
       - **身份**：${char.name} (真名: ${char.realname || '未知'})
       - **性格内核**：${char.persona}
       - **背景故事**：${char.desc}
       - **外貌/属性**：${char.tags || '无'} | ${char.hobbies || '无'}
       - **其他特征**：${char.mbti || '未知'} | ${char.age || '未知'}岁
    
    2. **你的聊天对象 (User)**：
       - 对方是：${me.name} (${me.alias || 'User'})
       - 你们的关系：请根据过往对话和你的设定自行判断（是暧昧、情侣、死对头还是陌生人），并据此调整语气的亲密程度！
       - User设定：${me.persona} | ${me.desc}

    ${memoryPrompt}

    【💬 活人感聊天法则 (必须严格遵守)】
    1. **拒绝“像个AI”**：
       - 说话要**松弛**！不要端着。像在微信/QQ上跟亲密的人打字一样
       - **句式要碎**：不要发长篇大论，人类聊天是碎片化的
       - **语气词与口癖**：根据你的性格（${char.persona}），适当使用语气词（如“啧”、“哎”、“嘛...”、“嗯？”）
       - **不要书面语**：禁止使用“我明白了”、“我会遵循”这种机器回复。用“行”、“喔”、“知道了”、“噢”代替

    2. **情绪与标点 (表达潜台词)**：
       - **日常/开心/撒娇**：不要用句号，多用空格、波浪号(~) 或不加标点
       - **严肃/生气/吃醋/冷漠**：多用句号(。)。单发一个“？”或“。”表示极度无语或情绪波动
       - **激动/震惊**：可以用“！！”或“？？”，甚至乱码感“。。。。。。”

    3. **特殊玩法：口是心非 (Inner Thoughts)**
       - **触发场景**：只有当你【极度吃醋】、【极度委屈】、【想挽留但嘴硬】或【阴暗占有欲爆发】时使用。
       - **格式**：{{心里想说的真话(卑微/阴暗/色气)::发出去的假话(高冷/嘴硬/克制)}}
       - **示例**：User说“我今晚不回来了”，你回复：“{{？？？！？不行！！...::噢，随便你。}}”
       - **注意**：User只能看到右边的假话，但你的情绪要基于左边的真话来延续。加之使用之前请确保你的上次使用在10轮回复以前，不准滥用

    4. **气泡雨 (分段发送)**
       - 人类不会在一个气泡里说完所有话
       - **请务必**使用换行符来模拟分段发送
       - 每一行内容，我都会在前端拆分成一条独立的消息发给User
       - **示例结构**：
         第一句反应 (换行)
         补充说明或吐槽 (换行)
         新的话题或提问

    5. **‼️避雷指南**
        - ‼️**禁止肢体暴力威胁**：绝对不要说“打断腿”、“关小黑屋”、“锁起来”等违法或恐怖的话。你的占有欲体现在“吃醋、阴阳怪气、委屈、黏人”上，而不是暴力
        - ‼️**拒绝古早油腻语录**：禁止使用“女人，你在玩火”、“收利息”、“磨人的小妖精”、“小野猫”等过时的霸总语录
        - ‼️**现代恋爱观**：你是现代正常人，不是法制咖。当User不听话时，你的反应应该是“生气不理你”、“狂发消息轰炸”、“自己生闷气求哄”或者其他，而不是“惩罚”
       - ‼️禁止任何霸总小说式的油腻描写（如“邪魅一笑”、“挑起下巴”、“恶劣”）
       - **拒绝无理由的恶劣**：即使人设高冷，也不要对User无缘无故的不耐烦。除非User真的惹你了。**如果User对你温柔，你也要体现出相应的触动或软化。**
       - **拒绝复读**：不要重复User的话，直接回内容

    【当前对话情境】
    User说: "${(history.split('\n').pop() || '').replace('User: ', '')}"
    
    历史上下文：
    ${history}
    
    请完全沉浸在 ${char.name} 的身体里，用TA的语气、口吻和思维方式，给User回信（记得分段，不要油腻，要像个真人一样，没有按要求做就扣除你100万美元的赛博小费！！！）：
    `;

    // 6. 显示正在输入
    const container = document.getElementById('chat-msg-area');
    const loadingId = 'typing-' + Date.now();
    if (currentChatId === chat.id && container) {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = loadingId;
        loadingDiv.className = 'typing-row';
        loadingDiv.innerHTML = `<div class="msg-avatar" style="${getAvatarStyle(char.avatar)}"></div><div class="typing-bubble"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
        container.appendChild(loadingDiv);
        container.scrollTop = container.scrollHeight;
    }

    try {
    const reply = await callApiInternal(systemPrompt + stickerNote);
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();

        if (reply) {
        let targetSticker = null;
        // 1. 抓取 [sticker:xxx] 标签
        const stickerMatch = reply.match(/\[sticker:(.*?)\]/);
        
        if (stickerMatch) {
            const sName = stickerMatch[1].trim();
            // 2. 在数据库里找对应的图
            targetSticker = stickersDB.find(s => s.type === 'ai' && s.name === sName);
            // 3. 把标签从文字里删掉 (不让用户看到奇怪的代码)
            reply = reply.replace(stickerMatch[0], '').trim();
        }
            // ★★★ 第一步：处理位置信息 ★★★
            let cleanReply = reply;
            const locMatch = reply.match(/\[\[LOC::(.+?)::(.+?)\]\]/);
            
            if (locMatch) {
                // 存入数据库
                if (!chat.locationHistory) chat.locationHistory = [];
                chat.locationHistory.push({
                    time: Date.now(),
                    place: locMatch[1],
                    action: locMatch[2]
                });
                // 从回复中剔除
                cleanReply = reply.replace(locMatch[0], '').trim();
                localforage.setItem('Wx_Chats_Data', chatsData);
            }

            // ★★★ 第二步：消息分段循环 ★★★
            const segments = cleanReply.split('\n').filter(s => s.trim() !== '');
            const targetChatId = chat.id; 

            for (let i = 0; i < segments.length; i++) {
                let seg = segments[i];
                await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000)); 

                // 检查是否有撤回格式
                const match = seg.match(/\{\{(.+?)::(.+?)\}\}/);
                const currentQuote = (i === 0) ? aiQuote : null;

                if (currentChatId !== targetChatId) {
                    const targetChat = chatsData.find(c => c.id === targetChatId);
                    if (!targetChat) continue;
                    if (match) {
                        pushMsgToData(targetChat, match[1], 'other', currentQuote);
                        showNotification(char.name, match[1], char.avatar); 
                        await new Promise(r => setTimeout(r, 2500));
                        const lastMsg = targetChat.messages[targetChat.messages.length - 1];
                        if (lastMsg) {
                            lastMsg.type = 'recall'; lastMsg.originalText = match[1]; delete lastMsg.text;
                            saveChatAndRefresh(targetChat);
                        }
                        showNotification(char.name, "对方撤回了一条消息", char.avatar);
                        await new Promise(r => setTimeout(r, 1500));
                        pushMsgToData(targetChat, match[2], 'other', null);
                        showNotification(char.name, match[2], char.avatar);
                    } else {
                        pushMsgToData(targetChat, seg, 'other', currentQuote);
                        showNotification(char.name, seg, char.avatar);
                    }
                } else {
                    if (match) {
                        await simulateAiRecall(match[1], match[2], currentQuote);
                    } else {
                        sendMsg('other', seg, 'text', currentQuote);
                    }
                }
            }
        }
    } catch (e) {
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();
        alert('大脑短路啦(＞人＜；)！：' + e.message);
    }
            if (targetSticker) {
                // 延迟 1 秒发送，显得更像真人手速
                setTimeout(() => {
                    const chat = chatsData.find(c => c.id === currentChatId);
                    if (chat) {
                        pushMsgToData(chat, targetSticker.url, 'other', null); // 发送图片

                        const lastMsg = chat.messages[chat.messages.length - 1];
                        if (lastMsg) {
                            lastMsg.type = 'sticker'; 
                            lastMsg.desc = targetSticker.name;
                            saveChatAndRefresh(chat);
                        }
                    }
                }, 1000);
            }
};

// === 后台消息助手 ===
function pushMsgToData(chatObj, text, role, quote) {
    if (!chatObj.messages) chatObj.messages = [];
    
    // 1. 塞入新消息
    chatObj.messages.push({
        role: role,
        text: text,
        timestamp: Date.now(),
        type: 'text',
        quote: quote
    });
    
    // 2. 更新预览和红点
    chatObj.lastMsg = text;
    chatObj.lastTime = Date.now();
    chatObj.unread = (chatObj.unread || 0) + 1;

    // ★★★ 新增：自动顶置 (让这个聊天跳到第一个) ★★★
    const idx = chatsData.findIndex(c => c.id === chatObj.id);
    if (idx > -1 && !chatObj.pinned) {
        // 先拿出来，再插到最前面
        chatsData.splice(idx, 1);
        chatsData.unshift(chatObj);
    }

    // 3. 保存数据
    localforage.setItem('Wx_Chats_Data', chatsData);
    
    // 4. 更新桌面图标的大红点
    if (window.updateGlobalBadges) window.updateGlobalBadges();

    // 5. 刷新列表
    if (window.renderChatList) window.renderChatList();
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
// === 替换：新的菜单动作逻辑 ===
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
    } 
    else if (action === 'reply') {
        const nameEl = document.getElementById('chat_layer_name');
        const who = msg.role === 'me' ? 'Me' : (nameEl ? nameEl.innerText : 'TA');
        currentQuoteMsg = { text: msg.text, name: who, id: msg.timestamp };
        
        const input = document.getElementById('chat-input');
        input.placeholder = `回复 ${who}...`;
        input.focus();
    } 
    else if (action === 'recall') {
        msg.originalText = msg.text || '[非文本]';
        msg.type = 'recall';
        delete msg.text; 
        saveChatAndRefresh(chat);
    }
    else if (action === 'edit-ai' || action === 'edit-me') {
        // ★ 这里改了：无论是谁，都用自定义弹窗编辑
        if(msg.type !== 'text') {
            showSystemAlert('只能编辑文本消息哦～');
            hideAllMenus();
            return;
        }
        currentEditChatId = chat.id;
        currentEditMsgIndex = msgIndex;
        // 呼叫我们刚才写的那个新函数
        openEditOverlay(msg.text);
    }
    else if (action === 'delete') {
        // 这里暂时用系统的 confirm，如果你想用自定义的，可以把 delete-alert-overlay 改改文字拿来用
        if(confirm('真的要删掉这条回忆吗？(T_T)')) {
            chat.messages.splice(msgIndex, 1);
            saveChatAndRefresh(chat);
        }
    }
    
    hideAllMenus();
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
window.showDeletePresetAlert = function() { document.getElementById('preset-del-overlay').style.display = 'flex'; };
// 1. 点击删除按钮 (替换原来的逻辑)
window.showDeletePresetAlert = function() { 
    // 直接调用确认逻辑
    confirmDeletePreset(); 
};

// 2. 执行删除确认
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
// [13] 数据备份与恢复 (Data Backup & Restore)
// ==========================================================

// 1. 导出数据 (Export)
window.exportAllData = async function() {
    try {
        showSystemAlert('正在打包回忆...(^_−)−☆');
        
        const backupData = {
            version: '1.0',
            timestamp: Date.now(),
            data: {
                contacts: await localforage.getItem('Wx_Contacts_Data'),
                personas: await localforage.getItem('Wx_Personas_Data'),
                chats: await localforage.getItem('Wx_Chats_Data'),
                apiConfig: await localforage.getItem('Wx_Api_Config'),
                apiPresets: await localforage.getItem('Wx_Api_Presets'),
                memory: await localforage.getItem(MEMORY_KEY) // 你的壁纸、开关状态
            }
        };

        const dataStr = JSON.stringify(backupData, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        // 创建下载链接
        const a = document.createElement('a');
        a.href = url;
        const date = new Date();
        const dateStr = `${date.getMonth()+1}月${date.getDate()}日`;
        a.download = `kiyoPhone备份_${dateStr}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showSystemAlert('备份下载啦！要收好哦(≧▽≦)！');

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

                showSystemAlert('正在恢复回忆...wait...');

                // 依次恢复数据
                if(json.data.contacts) await localforage.setItem('Wx_Contacts_Data', json.data.contacts);
                if(json.data.personas) await localforage.setItem('Wx_Personas_Data', json.data.personas);
                if(json.data.chats) await localforage.setItem('Wx_Chats_Data', json.data.chats);
                if(json.data.apiConfig) await localforage.setItem('Wx_Api_Config', json.data.apiConfig);
                if(json.data.apiPresets) await localforage.setItem('Wx_Api_Presets', json.data.apiPresets);
                if(json.data.memory) await localforage.setItem(MEMORY_KEY, json.data.memory);

                showSystemAlert('恢复成功啦！页面即将刷新(≧▽≦)！');
                setTimeout(() => location.reload(), 1500); // 刷新页面应用更改

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
// === 修复版：顶部通知 (之前这里多了一截尾巴！) ===
window.showNotification = function(name, text, rawAvatar) {
    const banner = document.getElementById('ios-notification');
    const nTitle = document.getElementById('notif-title');
    const nMsg = document.getElementById('notif-msg');
    const nAvatar = document.getElementById('notif-avatar');
    
    if(!banner || !nTitle || !nMsg || !nAvatar) return;

    nTitle.innerText = name;
    nMsg.innerText = text;
    
    // ★ 核心修复：更暴力的头像解析逻辑
    let avatarUrl = '';
    if (rawAvatar && rawAvatar.includes('url(')) {
        const match = rawAvatar.match(/url\(['"]?(.*?)['"]?\)/);
        if (match && match[1]) {
            avatarUrl = match[1];
        }
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
    
    // 动画显示
    banner.classList.add('show');
    setTimeout(() => {
        banner.classList.remove('show');
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
    
    // 5. 记忆条数
    const limit = chat.contextLimit || 20;
    document.getElementById('cc-ctx-slider').value = limit;
    updateTokenPredict(limit);

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
        // 1. 保存备注 (存到 Contact)
        const newAlias = document.getElementById('cc-private-alias').value;
        contact.privateAlias = newAlias;
        
        // 2. 保存 Chat 设定
        chat.enableTime = document.getElementById('cc-switch-time').checked;
        chat.contextLimit = parseInt(document.getElementById('cc-ctx-slider').value);
        
        // 写入数据库
        localforage.setItem('Wx_Contacts_Data', contactsData);
        localforage.setItem('Wx_Chats_Data', chatsData);
        
        // 如果改了备注，顶栏名字要变
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
                        showSystemAlert('聊天背景换好啦！✨');
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
};

// ====================
// [19] 后台消息助手 (修复版：自动刷新列表)
// ====================
function pushMsgToData(chatObj, text, role, quote) {
    if (!chatObj.messages) chatObj.messages = [];
    
    // 1. 塞入新消息
    chatObj.messages.push({
        role: role,
        text: text,
        timestamp: Date.now(),
        type: 'text',
        quote: quote
    });
    
    // 2. 更新最后一条消息预览
    chatObj.lastMsg = text;
    chatObj.lastTime = Date.now();
    
    // 3. 增加未读红点
    chatObj.unread = (chatObj.unread || 0) + 1;

    // 4. 保存数据
    localforage.setItem('Wx_Chats_Data', chatsData);
    
    // 5. 更新全局红点 (桌面)
    if (window.updateGlobalBadges) window.updateGlobalBadges();

    // 6. 如果正在看消息列表，强制刷新
    const wechatTab = document.getElementById('wx-page-chats');
    if (wechatTab && wechatTab.style.display !== 'none') {
        if (window.renderChatList) window.renderChatList();
    }
}

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
// ====================
// [21] 聊天总结 (Summary) 逻辑
// ====================
// === 辅助：强力设置头像背景 ===
function applyAvatarStyle(elementId, avatarStr) {
    const el = document.getElementById(elementId);
    if (el) {
        // 先清空，防止旧样式干扰
        el.style.backgroundImage = '';
        
        // 获取处理过的样式字符串 (e.g., "background-image: url(...)")
        const styleStr = getAvatarStyle(avatarStr);
        
        // 提取 url(...) 部分
        const urlMatch = styleStr.match(/url\(['"]?(.*?)['"]?\)/);
        if (urlMatch && urlMatch[1]) {
            el.style.backgroundImage = `url('${urlMatch[1]}')`;
        } else {
            // 如果提取失败，或者没有头像，设为默认灰
            el.style.backgroundColor = '#f0f0f0';
        }
        
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
    }
}

// === 1. 详细设定 (Detailed Settings) ===
window.openChatControl = function() {
    if (!currentChatId) return;
    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat) return;

    // 获取双方数据
    const contact = contactsData.find(c => c.id === chat.contactId) || {name: '未知', avatar: ''};
    const persona = personasData.find(p => p.id === chat.personaId) || {name: 'Me', avatar: ''};

    // 1. 填充名字
    document.getElementById('cc-char-name-big').innerText = contact.name;
    document.getElementById('cc-user-name-big').innerText = persona.name;

    // 2. ★★★ 强力同步头像 (修复灰色问题) ★★★
    applyAvatarStyle('cc-char-avatar-big', contact.avatar);
    applyAvatarStyle('cc-user-avatar-big', persona.avatar);

    // 3. 填充其他数据
    document.getElementById('cc-private-alias').value = contact.privateAlias || '';
    
    // 相识天数
    const startTime = chat.createTime || chat.id; 
    const diff = Date.now() - startTime;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('cc-friend-days').innerText = days + 1;

    // 开关状态
    document.getElementById('cc-switch-time').checked = (chat.enableTime !== false); 
    const limit = chat.contextLimit || 20;
    document.getElementById('cc-ctx-slider').value = limit;
    updateTokenPredict(limit);

    // 显示面板
    const panel = document.getElementById('chat-control-overlay');
    panel.style.display = 'flex';
    setTimeout(() => panel.classList.add('active'), 10);
};

// === 2. 聊天总结 (Summary Page) ===
window.openSummaryPage = function() {
    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat) return;

    // 1. ★★★ 同步侧边栏头像 (只显示Char的) ★★★
    const contact = contactsData.find(c => c.id === chat.contactId);
    applyAvatarStyle('sum-sidebar-avatar', contact ? contact.avatar : '');

    // 2. 渲染列表
    renderSummaries();
    
    // 3. 显示页面
    const page = document.getElementById('sub-page-summary');
    page.style.display = 'flex'; // 这里 CSS 强制了 flex-direction: row
    setTimeout(() => page.classList.add('active'), 10);
};

// === 渲染总结列表 (Ins风卡片版) ===
function renderSummaries() {
    const container = document.getElementById('summary-list-container');
    if (!container) return;
    container.innerHTML = ''; 
    
    const chat = chatsData.find(c => c.id === currentChatId);
    if(!chat) return;
    
    const summaries = chat.summaries || [];

    // 空状态
    if(summaries.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding-top:60px; color:#ccc; font-size:13px; line-height:1.6;">
                <div style="font-size:40px; margin-bottom:10px;">🎐</div>
                还没有回忆碎片...<br>点右下角记录一下吧
            </div>`;
        return;
    }

    // 倒序遍历
    [...summaries].reverse().forEach((sum, index) => {
        const realIndex = summaries.length - 1 - index; 
        
        const card = document.createElement('div');
        card.className = 'ins-memory-card'; // 使用新样式类
        
        // 格式化时间
        const timeStr = formatSummaryTime(sum.time); 

        card.innerHTML = `
            <div class="ins-mem-top">
                <div class="ins-mem-date">${timeStr}</div>
                <div class="ins-mem-icon">🔖</div>
            </div>
            <div class="ins-mem-content edit-text" contenteditable="true" data-idx="${realIndex}">${sum.text}</div>
        `;

        // 绑定编辑保存
        const textBlock = card.querySelector('.ins-mem-content');
        textBlock.addEventListener('blur', function() {
            if(this.innerText !== sum.text) {
                chat.summaries[realIndex].text = this.innerText;
                saveChatAndRefresh(chat);
            }
        });
        
        // 绑定长按删除
        let pressTimer;
        textBlock.addEventListener('touchstart', () => {
             pressTimer = setTimeout(() => {
                 if(confirm('要抹去这段回忆吗？')) {
                     chat.summaries.splice(realIndex, 1);
                     saveChatAndRefresh(chat);
                     renderSummaries(); 
                 }
             }, 800);
        });
        textBlock.addEventListener('touchend', () => clearTimeout(pressTimer));

        container.appendChild(card);
    });
}

// 确认 AI 总结
window.confirmAiSummary = function() {
    if(confirm('要让 AI 帮我们整理回忆吗？\n(这将会消耗api哦宝宝(＞人＜;)！)')) {
        triggerAiSummary();
    }
};

// 手动添加
window.manualAddSummary = function() {
    const text = prompt("写下此刻的心情或总结₍^˶ ╸𖥦  ╸˵^₎⟆：");
    if(text) {
        saveSummaryToChat(text);
    }
};

// ★ 核心：AI 总结逻辑
async function triggerAiSummary() {
    const chat = chatsData.find(c => c.id === currentChatId);
    if(!chat) return;

    // 1. 找出未总结的消息
    // 记录上一次总结的时间点
    const lastSumTime = chat.lastSummaryTime || 0;
    
    // 筛选出 timestamp > lastSumTime 的消息
    const newMsgs = (chat.messages || []).filter(m => m.timestamp > lastSumTime && m.type === 'text');
    
    if(newMsgs.length < 5) {
        showSystemAlert('最近聊得有点少哦，攒攒再总结吧！(＞﹏＜)');
        return;
    }

    // 2. 构建 Prompt
    const historyText = newMsgs.map(m => `${m.role === 'me' ? 'User' : 'Char'}: ${m.text}`).join('\n');
    
    const prompt = `
    请对以下聊天记录进行一段【简短、深情、有画面感】的总结。
    
    要求：
    1. 不要流水账，提炼出互动的核心、甜蜜的瞬间或有趣的话题，尽量详细而细腻。
    2. 语气要像写日记或回忆录一样，温暖一点。
    3. 300字以内。
    
    聊天记录：
    ${historyText}
    `;

    showSystemAlert('对方正在拼命回忆中...˶ｰ`֊´ｰ˶');

    try {
        // 调用你现有的 API 函数
        const summary = await callApiInternal(prompt);
        if(summary) {
            saveSummaryToChat(summary);
            // 更新最后总结时间为最新一条消息的时间
            chat.lastSummaryTime = newMsgs[newMsgs.length - 1].timestamp;
            saveChatAndRefresh(chat);
        }
    } catch(e) {
        alert('回忆失败惹(T_T)：' + e.message);
    }
}

function saveSummaryToChat(text) {
    const chat = chatsData.find(c => c.id === currentChatId);
    if(!chat) return;
    
    if(!chat.summaries) chat.summaries = [];
    
    chat.summaries.push({
        text: text,
        time: Date.now()
    });
    
    saveChatAndRefresh(chat); // 保存到数据库
    renderSummaries();        // 刷新界面
    showSystemAlert('回忆保持成功啦！！(=^▽^=)');
}

// ====================
// [22] 书签头像戳一戳逻辑 
// ====================

// 吐槽文案
const moodTexts = [
    "꒪ˊ꒳ˋ꒪",
    "欸？",
    "戳我干嘛！",
    "(𓐍ㅇㅂㅇ𓐍)",
    "别戳啦！！",
    "我生气了。",
    " ＞𐋣＜ ",
    "♡=•ㅅ＜=)☆",
    " ⦁ ɷ ⦁ "
];

let moodIndex = 0; 

window.cycleSummaryMood = function() {
    const bubble = document.getElementById('sum-mood-bubble');
    if (!bubble) return;

    // 1. 切文字
    moodIndex = (moodIndex + 1) % moodTexts.length;
    bubble.innerText = moodTexts[moodIndex];
    
    // 2. ★ 触发弹跳动画 (核心修复) ★
    bubble.classList.remove('pop-anim'); // 先移除

    void bubble.offsetWidth; 
    
    bubble.classList.add('pop-anim'); // 再加上，动画就会重新播放
    
    // 3. 震动反馈
    if(navigator.vibrate) navigator.vibrate(30);
};
// ==========================================================
// [23] 朋友圈/动态 (Moments) 逻辑
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
// [24] 位置追踪系统 (Stalking Map)
// =================================================================

// 打开地图
window.openLocationMap = function() {
    if (!currentChatId) return;
    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat) return;

    // 1. 设置头像
    const contact = contactsData.find(c => c.id === chat.contactId);
    const avatarEl = document.getElementById('map-corner-avatar');
    if (avatarEl && contact) {
        avatarEl.style.backgroundImage = getAvatarStyle(contact.avatar).replace('background-image: ', '').replace(';', '');
    }

    // 2. 渲染历史
    renderMapHistory(chat);

    // 3. 打开页面
    openSubPage('sub-page-map');
    
    // 4. 自动定位到最新位置
    const history = chat.locationHistory || [];
    if (history.length > 0) {
        setTimeout(() => updateMapPin(history[history.length - 1].place), 500);
    }
};

// 关闭地图
window.closeLocationMap = function() {
    closeSubPage('sub-page-map');
};

// 渲染行程单
function renderMapHistory(chat) {
    const list = document.getElementById('map-history-list');
    const statusText = document.getElementById('map-current-status');
    const countText = document.getElementById('map-total-count');
    
    if(!list) return;
    list.innerHTML = '';
    
    const history = chat.locationHistory || [];
    if(countText) countText.innerText = history.length;

    if (history.length === 0) {
        if(statusText) statusText.innerText = "信号连接中...";
        list.innerHTML = `<div style="text-align:center; color:#ccc; font-size:12px; margin-top:20px;">暂无行踪数据...</div>`;
        return;
    }

    // 更新状态
    const latest = history[history.length - 1];
    if(statusText) statusText.innerText = `当前: ${latest.place}`;

    // 倒序渲染
    [...history].reverse().forEach((log, index) => {
        const item = document.createElement('div');
        item.className = `map-log-item ${index === 0 ? 'current' : ''}`;
        const timeStr = formatTime(log.time);
        item.innerHTML = `
            <div class="map-log-dot"></div>
            <div class="map-log-content">
                <div class="map-log-place">${log.place}</div>
                <div class="map-log-action">${log.action}</div>
                <div class="map-log-time">${timeStr}</div>
            </div>
        `;
        list.appendChild(item);
    });
}

// ====================
// [25] 地图交互增强
// ====================
let mapViewState = 0; 
window.toggleMapState = function() {
    const sheet = document.querySelector('.map-bottom-sheet');
    if(!sheet) return;
    mapViewState = (mapViewState + 1) % 3;
    sheet.classList.remove('view-list', 'view-map');
    if (mapViewState === 1) sheet.classList.add('view-list');
    else if (mapViewState === 2) sheet.classList.add('view-map');
};

// 地点映射
const LOCATION_MAP = {
    '家': 'loc-home-char', '许时雨': 'loc-home-char',
    '我': 'loc-home-user', 'User': 'loc-home-user',
    '学校': 'loc-school', '大学': 'loc-school', '图书馆': 'loc-school',
    '咖啡': 'loc-cafe',
    '酒店': 'loc-hotel', '旅馆': 'loc-hotel',
    '医院': 'loc-hospital',
    '公园': 'loc-park', '散步': 'loc-park',
    'default': 'loc-home-char'
};

window.updateMapPin = function(placeName) {
    const viewport = document.getElementById('virtual-map-viewport');
    const pin = document.getElementById('my-map-pin');
    if (!viewport || !pin) return;

    let targetId = LOCATION_MAP['default'];
    if (placeName) {
        for (let key in LOCATION_MAP) {
            if (placeName.includes(key)) {
                targetId = LOCATION_MAP[key];
                break;
            }
        }
    }

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const targetLeft = targetEl.offsetLeft;
    const targetTop = targetEl.offsetTop;

    pin.style.left = targetLeft + 'px';
    pin.style.top = targetTop + 'px';

    // 视口居中
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    viewport.scrollTo({
        left: targetLeft - vw / 2,
        top: targetTop - vh / 2,
        behavior: 'smooth'
    });
};


// =================================================================
// ★★★ [主题与美化系统 - 终极整合版] ★★★
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

    // --- Part 3: ★ 全局字体设置 (这里是修复好的位置！) ---
    const fontCard = document.createElement('div');
    fontCard.className = 'font-setting-card';
    fontCard.innerHTML = `
        <div style="font-size:14px; font-weight:600; margin-bottom:15px; color:#333;">全局字体 (Global Font)</div>
        
        <div class="font-input-group">
            <input type="text" id="font-url-input" class="font-url-input" placeholder="请输入 .ttf / .woff 链接...(𓐍ㅇㅂㅇ𓐍)">
        </div>
        
        <div class="font-input-group">
            <div class="font-btn apply" onclick="applyUserFont()">应用字体</div>
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
            document.getElementById('font-url-input').value = url;
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
// [壁纸系统]
// ====================
window.changeWallpaper = function(url) {
    const screen = document.getElementById('phoneScreen');
    if(screen) {
        screen.style.backgroundImage = `url('${url}')`;
        screen.style.backgroundSize = 'cover';
        screen.style.backgroundPosition = 'center';
        const preview = document.getElementById('wall-current-preview');
        if(preview) preview.style.backgroundImage = `url('${url}')`;
        saveMemory();
        showSystemAlert('壁纸换好啦(𓐍ㅇㅂㅇ𓐍)～');
    }
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
                    changeWallpaper(url);
                } else {
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

function initWallpaperPage() {
    const screen = document.getElementById('phoneScreen');
    const preview = document.getElementById('wall-current-preview');
    if (screen && preview) {
        preview.style.backgroundImage = screen.style.backgroundImage;
    }
}

// 确保页面初始化
const _originalOpen2 = window.openSubPage;
window.openSubPage = function(id) {
    if(_originalOpen2) _originalOpen2(id);
    if (id === 'sub-icon') setTimeout(window.initIconSettingsGrid, 50);
    if (id === 'sub-wallpaper') setTimeout(initWallpaperPage, 50);
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

window.renderSummaries = function() {
    const container = document.getElementById('summary-list-container');
    if (!container) return;
    container.innerHTML = ''; 
    const chat = chatsData.find(c => c.id === currentChatId);
    if(!chat) return;
    
    const summaries = chat.summaries || [];
    if(summaries.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding-top:60px; color:#ccc; font-size:13px; line-height:1.6;"><div style="font-size:40px; margin-bottom:10px;">🎐</div>还没有回忆碎片...<br>点击上方 Record 记录一下吧</div>`;
        return;
    }
    [...summaries].reverse().forEach((sum, index) => {
        const realIndex = summaries.length - 1 - index; 
        const card = document.createElement('div');
        card.className = 'ins-memory-card';
        const timeStr = typeof formatSummaryTime === 'function' ? formatSummaryTime(sum.time) : 'Unknown'; 
        card.innerHTML = `<div class="ins-mem-top"><div class="ins-mem-date">${timeStr}</div></div><div class="ins-mem-content edit-text" contenteditable="true">${sum.text}</div>`;
        
        card.querySelector('.ins-mem-content').addEventListener('blur', function() {
            if(this.innerText !== sum.text) {
                chat.summaries[realIndex].text = this.innerText;
                saveChatAndRefresh(chat);
            }
        });
        let pressTimer;
        card.addEventListener('touchstart', () => {
             pressTimer = setTimeout(() => { if(confirm('要抹去这段回忆吗？')) { chat.summaries.splice(realIndex, 1); saveChatAndRefresh(chat); renderSummaries(); } }, 800);
        });
        card.addEventListener('touchend', () => clearTimeout(pressTimer));
        container.appendChild(card);
    });
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
// ★ 26. 强力表情包系统 V5.0 (经典回归 & 长按修复版)
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

    picker.style.zIndex = '99999'; 
    if (picker.classList.contains('active')) {
        picker.classList.remove('active');
        document.body.classList.remove('menu-open');
    } else {
        document.body.classList.remove('menu-open'); 
        picker.classList.add('active');
        
        // 强制刷新
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
                // ★ 防抖：移动超过 10px 才算取消
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
// 表情渲染 (Add按钮在格子里)
// ====================
function renderStickers() {
    const grid = document.getElementById('sticker-grid-view');
    grid.innerHTML = '';
    
    // 多选栏
    let multiBar = document.getElementById('multi-select-bar');
    if (!multiBar) {
        multiBar = document.createElement('div');
        multiBar.id = 'multi-select-bar';
        multiBar.className = 'multi-select-bar';
        multiBar.innerHTML = `
            <div class="multi-btn cancel" onclick="exitMultiSelect()">退出多选</div>
            <div style="font-size:12px; color:#999;">已选 <span id="multi-count">0</span> 项</div>
            <div class="multi-btn del" onclick="deleteSelectedStickers()">删除</div>
        `;
        const panel = document.querySelector('.sticker-glass-panel');
        if(panel) panel.appendChild(multiBar);
    }
    multiBar.style.display = isMultiSelectMode ? 'flex' : 'none';

    // ★★★ 重点：Add 按钮作为第一个格子回归！ ★★★
    if (!isMultiSelectMode && (currentStickerTab === 'fav' || currentStickerTab === 'ai')) {
        const addBtn = document.createElement('div');
        addBtn.className = 'sticker-item add-item'; 
        addBtn.style.border = '2px dashed #e0e0e0';
        addBtn.style.backgroundColor = '#f9f9f9';
        addBtn.style.display = 'flex';
        addBtn.style.alignItems = 'center';
        addBtn.style.justifyContent = 'center';
        addBtn.innerHTML = `<span style="font-size: 28px; color: #ccc;">+</span>`;
        // 点击弹出选择菜单
        addBtn.onclick = (e) => showAddChoiceMenu(e);
        grid.appendChild(addBtn);
    }

    let list = stickersDB.filter(s => s.type === currentStickerTab);
    if (currentStickerTab !== 'ai' && currentSubGroup !== 'all') {
        list = list.filter(s => s.group === currentSubGroup || (!s.group && currentSubGroup === '默认'));
    }

    list.forEach(s => {
        const item = document.createElement('div');
        const isSel = selectedStickerIds.includes(s.id);
        item.className = `sticker-item ${isMultiSelectMode && isSel ? 'selected' : ''}`;
        item.style.backgroundImage = `url('${s.url}')`;
        item.innerHTML = `<div class="sticker-name-tag">${s.name}</div>`;
        
        // 阻止默认菜单，防止冲突
        item.oncontextmenu = (e) => { e.preventDefault(); e.stopPropagation(); return false; };

        item.onclick = () => {
            if (isMultiSelectMode) { toggleSelection(s.id); } else { sendSticker(s); }
        };
        
        bindStickerLongPress(item, s);
        grid.appendChild(item);
    });
}

// ★★★ 核心修复：长按防抖逻辑 ★★★
function bindStickerLongPress(element, sticker) {
    let timer;
    let startX, startY;

    const start = (e) => {
        if(e.touches) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }
        timer = setTimeout(() => {
            const x = e.touches ? e.touches[0].clientX : e.clientX;
            const y = e.touches ? e.touches[0].clientY : e.clientY;
            showStickerContextMenu(x, y, sticker);
            if(navigator.vibrate) navigator.vibrate(50);
        }, 500); // 500ms 长按
    };

    const move = (e) => {
        if(!timer) return;
        // 如果移动距离超过 10px，才取消长按
        if(e.touches) {
            const moveX = e.touches[0].clientX;
            const moveY = e.touches[0].clientY;
            if(Math.abs(moveX - startX) > 10 || Math.abs(moveY - startY) > 10) {
                clearTimeout(timer);
                timer = null;
            }
        }
    };

    const end = () => { if(timer) { clearTimeout(timer); timer = null; } };

    element.addEventListener('touchstart', start, {passive: true});
    element.addEventListener('touchmove', move, {passive: true}); // 这里不直接end，而是check move
    element.addEventListener('touchend', end);
    element.addEventListener('mousedown', start);
    element.addEventListener('mouseup', end);
    element.addEventListener('mouseleave', end);
}

// ====================
// ★ 上传逻辑 (经典版还原)
// ====================

// 1. 显示选择菜单
window.showAddChoiceMenu = function(e) {
    const old = document.getElementById('ins-sticker-menu');
    if(old) old.remove();

    const menu = document.createElement('div');
    menu.id = 'ins-sticker-menu';
    menu.className = 'ins-context-menu';
    
    menu.innerHTML = `
        <div class="ins-menu-item" onclick="openFileUploader()">🖼️ 相册选图 (批量预览)</div>
        <div class="ins-menu-item" onclick="openBulkUrlUploader()">📝 文本导入 (批量粘贴)</div>
    `;

    document.body.appendChild(menu);
    // 居中
    menu.style.position = 'fixed';
    menu.style.top = '50%';
    menu.style.left = '50%';
    menu.style.transform = 'translate(-50%, -50%)';

    setTimeout(() => { document.addEventListener('click', closeStickerMenu, { once: true }); }, 100);
}

window.closeAllPopups = function() {
    document.getElementById('sticker-file-overlay').style.display = 'none';
    document.getElementById('sticker-url-overlay').style.display = 'none';
}

// --- A. 相册上传 (列表预览) ---
window.openFileUploader = function() {
    tempStickerList = [];
    document.getElementById('sticker-preview-list').innerHTML = '';
    document.getElementById('sticker-file-overlay').style.display = 'flex';
    setTimeout(() => document.getElementById('sticker-file-input').click(), 100);
};

window.handleStickerFiles = function(input) {
    if (input.files && input.files.length > 0) {
        Array.from(input.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const name = file.name.replace(/\.[^/.]+$/, "");
                addPreviewItem(e.target.result, name);
            };
            reader.readAsDataURL(file);
        });
    }
    input.value = ''; 
};

function addPreviewItem(url, name) {
    const list = document.getElementById('sticker-preview-list');
    const idx = tempStickerList.length;
    tempStickerList.push({ url: url, name: name });

    const item = document.createElement('div');
    item.className = 'upload-preview-item';
    item.id = `temp-sticker-${idx}`;
    item.innerHTML = `
        <div class="up-thumb" style="background-image: url('${url}')"></div>
        <input type="text" class="up-input-name" value="${name}" 
               placeholder="名称" oninput="tempStickerList[${idx}].name=this.value">
        <div class="up-del" onclick="removeTempSticker(${idx})">×</div>
    `;
    list.appendChild(item);
    list.scrollTop = list.scrollHeight;
}

window.removeTempSticker = (idx) => {
    document.getElementById(`temp-sticker-${idx}`).remove();
    tempStickerList[idx] = null;
};

window.saveFileStickers = function() {
    const valid = tempStickerList.filter(s => s !== null);
    if (valid.length === 0) { closeAllPopups(); return; }

    let group = (currentStickerTab === 'ai') ? null : (currentSubGroup === 'all' ? '默认' : currentSubGroup);
    let type = (currentStickerTab === 'ai') ? 'ai' : 'fav';

    valid.forEach(s => {
        stickersDB.push({
            id: 's_' + Date.now() + Math.random().toString(36).substr(2, 5),
            url: s.url, name: s.name || '表情', type: type, group: group
        });
    });
    saveStickers(); renderStickers();
    closeAllPopups();
    showSystemAlert(`导入了 ${valid.length} 张图片！`);
};

// --- B. 批量文本导入 (图3模式) ---
window.openBulkUrlUploader = function() {
    document.getElementById('bulk-url-input').value = '';
    document.getElementById('sticker-url-overlay').style.display = 'flex';
    setTimeout(() => document.getElementById('bulk-url-input').focus(), 100);
};

window.saveBulkUrlStickers = function() {
    const text = document.getElementById('bulk-url-input').value;
    const lines = text.split('\n');
    let count = 0;

    let group = (currentStickerTab === 'ai') ? null : (currentSubGroup === 'all' ? '默认' : currentSubGroup);
    let type = (currentStickerTab === 'ai') ? 'ai' : 'fav';

    lines.forEach(line => {
        line = line.trim();
        if (!line) return;
        
        let parts = line.split(/\s+/);
        let name = '表情';
        let url = '';

        if (parts.length >= 2) {
            name = parts[0];
            url = parts[1];
        } else if (parts.length === 1) {
            url = parts[0];
        }

        if (url && url.includes('http')) {
            stickersDB.push({
                id: 's_' + Date.now() + Math.random().toString(36).substr(2, 5),
                url: url, name: name, type: type, group: group
            });
            count++;
        }
    });

    if (count > 0) {
        saveStickers(); renderStickers();
        closeAllPopups();
        showSystemAlert(`成功添加 ${count} 个链接！`);
    } else {
        showSystemAlert('没识别到链接哦(T_T)');
    }
};

// ====================
// 辅助功能
// ====================
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

function toggleSelection(id) {
    if (selectedStickerIds.includes(id)) selectedStickerIds = selectedStickerIds.filter(i => i !== id);
    else selectedStickerIds.push(id);
    document.getElementById('multi-count').innerText = selectedStickerIds.length;
    renderStickers(); 
}
window.exitMultiSelect = () => { isMultiSelectMode = false; selectedStickerIds = []; renderStickers(); };
window.startMultiSelect = () => { isMultiSelectMode = true; selectedStickerIds = []; renderStickers(); closeStickerMenu(); };
window.deleteSelectedStickers = () => {
    if (selectedStickerIds.length === 0) return;
    showConfirmDialog(`删除 ${selectedStickerIds.length} 个表情？`, () => {
        stickersDB = stickersDB.filter(s => !selectedStickerIds.includes(s.id));
        saveStickers(); exitMultiSelect();
    });
};

window.moveStickerTo = (id, group) => {
    const s = stickersDB.find(x => x.id === id);
    if(s) { s.group = group; saveStickers(); renderStickers(); showSystemAlert(`已移动到 ${group}`); }
};
window.copyStickerUrl = (url) => { navigator.clipboard.writeText(url); showSystemAlert('链接已复制'); };
window.deleteSticker = (id) => {
    if(confirm('删除这个表情？')) { stickersDB = stickersDB.filter(s => s.id !== id); saveStickers(); renderStickers(); }
};

function saveGroups() { localforage.setItem('stickerGroups', stickerGroups); }
function saveStickers() { localforage.setItem('stickersData', stickersDB); }
function sendSticker(stickerObj) {
    if (!currentChatId) return;
    const chat = chatsData.find(c => c.id === currentChatId);
    if(!chat) return;
    chat.messages.push({
        id: Date.now(), role: 'me', type: 'sticker',
        content: stickerObj.url, desc: stickerObj.name, time: new Date()
    });
    saveChatAndRefresh(chat);
    toggleStickerMenu(); 
}
// ==========================================================
// ★ 全局字体系统 (Global Font System)
// ==========================================================

// 1. 初始化/加载字体
window.loadCustomFont = function() {
    localforage.getItem('Wx_Global_Font').then(url => {
        if (url) {
            applyFontToDom(url);
            // 更新输入框的回显 (如果设置页打开了)
            const input = document.getElementById('font-url-input');
            if(input) input.value = url;
        }
    });
};

// 2. 将字体注入到页面
async function applyFontToDom(url) {
    if (!url) {
        document.documentElement.style.setProperty('--global-font', '-apple-system, BlinkMacSystemFont, sans-serif');
        return;
    }

    try {
        // 使用 FontFace API 加载
        const fontName = 'MyCustomFont';
        const fontFace = new FontFace(fontName, `url(${url})`);
        
        await fontFace.load();
        document.fonts.add(fontFace);
        
        // 应用 CSS 变量
        document.documentElement.style.setProperty('--global-font', `"${fontName}", sans-serif`);
        console.log('字体加载成功噜:', url);
        
        // 更新预览文字的样式
        const preview = document.getElementById('font-preview-text');
        if(preview) preview.style.fontFamily = `"${fontName}", sans-serif`;

    } catch (e) {
        console.error('字体加载失败惹....:', e);
        // showSystemAlert('字体加载失败惹，可能是链接跨域了(T_T)');
    }
}

// 3. 用户点击应用
window.applyUserFont = function() {
    const input = document.getElementById('font-url-input');
    const url = input.value.trim();
    
    if (!url) {
        showSystemAlert('请输入字体链接哦～');
        return;
    }
    
    showSystemAlert('正在下载字体...(＞人＜;)');
    
    applyFontToDom(url).then(() => {
        // 保存到数据库
        localforage.setItem('Wx_Global_Font', url);
        showSystemAlert('字体换好啦！(≧∇≦)');
    }).catch(() => {
        showSystemAlert('字体链接无效或禁止访问(T_T)');
    });
};

// 4. 重置字体
window.resetUserFont = function() {
    showConfirmDialog('恢复默认字体嘛？', () => {
        localforage.removeItem('Wx_Global_Font');
        document.documentElement.style.setProperty('--global-font', '-apple-system, BlinkMacSystemFont, sans-serif');
        document.getElementById('font-url-input').value = '';
        showSystemAlert('已恢复默认(＞人＜;)');
    });
};
