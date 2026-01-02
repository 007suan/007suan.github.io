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
    loadMemory();       // 载入视觉记忆 (壁纸、开关)
    startClock();       // 启动时钟
    initInteractions(); // 启动全局交互
    loadAllData();      // 载入核心数据
    
    // 初始化设置页图标
    if(document.getElementById('icon-setting-grid')) initIconSettingsGrid();
    
    // 覆盖原生 Alert
    window.alert = window.showSystemAlert;
});

// 统一数据加载入口
window.loadAllData = function() {
    Promise.all([
        localforage.getItem('Wx_Contacts_Data'),
        localforage.getItem('Wx_Personas_Data'),
        localforage.getItem('Wx_Chats_Data'),
        localforage.getItem('Wx_Api_Config'),
        localforage.getItem('Wx_Api_Presets')
    ]).then(([contacts, personas, chats, config, presets]) => {
        contactsData = contacts || [];
        personasData = personas || [];
        chatsData = chats || [];
        
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
const imgSelectors = '.upload-img, .app-icon, .profile-avatar, .polaroid-img, .wx-big-avatar, .wx-small-avatar, .wx-p2-header-bg, .wx-big-avatar-new, .sync-avatar, .chl-frame';
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

// 恢复界面状态
function loadMemory() {
    // ★★★ 修复重点：把这行定义加回来！之前就是缺了它导致报错的！ ★★★
    const imgSelectors = '.upload-img, .app-icon, .profile-avatar, .polaroid-img, .wx-big-avatar, .wx-small-avatar, .wx-p2-header-bg, .wx-big-avatar-new, .sync-avatar, .chl-frame';

    localforage.getItem(MEMORY_KEY).then(data => {
        if (!data) return;

        // 恢复文字
        if (data.texts) {
            document.querySelectorAll('.edit-text').forEach((el, index) => {
                const key = getUniqueKey(el, index, 'txt');
                if (data.texts[key]) el.innerText = data.texts[key];
            });
        }

        // 恢复图片
        document.querySelectorAll(imgSelectors).forEach((el, index) => {
            const key = getUniqueKey(el, index, 'img');
            if (data.images[key]) {
                el.style.backgroundImage = data.images[key];
                el.style.backgroundColor = 'transparent'; 
                
                // ★★★ 重点：区分对待头像框！ ★★★
                if (el.classList.contains('chl-frame')) {
                    el.style.backgroundSize = 'contain';
                    el.style.backgroundRepeat = 'no-repeat';
                } else {
                    el.style.backgroundSize = 'cover';
                }
                
                el.style.backgroundPosition = 'center';
            }
        });

        // 同步头像逻辑
        const masterAvatar = document.getElementById('wx_p2_big_avatar');
        if (masterAvatar && masterAvatar.style.backgroundImage) {
            const masterBg = masterAvatar.style.backgroundImage;
            if (masterBg && masterBg !== 'none' && masterBg !== 'initial') {
                document.querySelectorAll('.sync-avatar').forEach(avatar => {
                    avatar.style.backgroundImage = masterBg;
                });
            }
        }

        // 恢复开关
        if (data.switches) {
            document.querySelectorAll('.ios-switch input').forEach((el, index) => {
                const key = getUniqueKey(el, index, 'sw');
                if (data.switches[key] !== undefined) el.checked = data.switches[key];
            });
        }

        // 恢复壁纸
        if (data.wallpaper) {
            const screen = document.getElementById('phoneScreen');
            if (screen) {
                screen.style.backgroundImage = data.wallpaper;
                screen.style.backgroundSize = 'cover';
            }
        }
        
        // 这里的 timeout 确保开关状态应用到 UI
        setTimeout(() => { toggleHomeBar(); toggleStatusBar(); }, 150);
    });
}

// ==========================================================
// [3] 全局交互 (Interactions)
// ==========================================================

function initInteractions() {
    // 全局点击监听
    document.addEventListener('click', (e) => {
        const target = e.target;

        // 文字编辑
        if (target.classList.contains('edit-text')) {
            if (!target.isContentEditable) {
                target.contentEditable = "true";
                target.focus();
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

window.openApp = function(appName) {
    const win = document.getElementById('app-window-' + appName);
    if (win) {
        win.style.display = 'flex';
        if (appName === 'settings') initIconSettingsGrid();
    }
};

window.closeAllApps = function() {
    document.querySelectorAll('.app-window, .sub-page-root').forEach(win => win.style.display = 'none');
    if (document.getElementById('wx-profile-view')) {
        document.getElementById('wx-profile-view').style.display = 'none';
    }
    document.querySelectorAll('.sub-page').forEach(p => p.classList.remove('active'));
};

window.openSubPage = function(id) {
    const p = document.getElementById(id);
    if(p) p.classList.add('active');
};
window.closeSubPage = function(id) {
    const p = document.getElementById(id);
    if(p) {
        p.classList.remove('active');
        if(p.classList.contains('sub-page-root')) {
            p.style.display = 'none';
        }
    }
};

// 桌面图标设置逻辑
window.initIconSettingsGrid = function() {
    const container = document.getElementById('icon-setting-grid');
    if (!container) return;
    container.innerHTML = ''; 
    document.querySelectorAll('#desktopGrid .app-item .app-icon').forEach((icon, i) => {
        createIconSlot(container, icon, `App ${i+1}`);
    });
    document.querySelectorAll('#dockGrid .app-item .app-icon').forEach((icon, i) => {
        createIconSlot(container, icon, `Dock ${i+1}`);
    });
};

function createIconSlot(container, targetRealIcon, labelText) {
    const slot = document.createElement('div');
    slot.className = 'icon-slot'; 
    slot.style.display = 'flex';
    slot.style.flexDirection = 'column';
    slot.style.alignItems = 'center';
    const preview = document.createElement('div');
    preview.style.width = '45px';
    preview.style.height = '45px';
    preview.style.borderRadius = '10px';
    preview.style.backgroundColor = '#ddd';
    preview.style.marginBottom = '5px';
    preview.style.backgroundSize = 'cover';
    preview.style.backgroundPosition = 'center';
    preview.style.cursor = 'pointer';
    if (targetRealIcon.style.backgroundImage) {
        preview.style.backgroundImage = targetRealIcon.style.backgroundImage;
    }
    preview.onclick = () => { handleImageUpload(targetRealIcon); };
    const txt = document.createElement('span');
    txt.innerText = labelText;
    txt.style.fontSize = '12px';
    txt.style.color = '#888';
    slot.appendChild(preview);
    slot.appendChild(txt);
    container.appendChild(slot);
}

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
        if(globalHeader) globalHeader.style.display = 'flex';
        document.getElementById('wx-page-moments').style.display = 'block';
        document.querySelectorAll('.wx-tab-item')[2].classList.add('active');
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
// [6] 角色创建器 (Character Creator)
// ==========================================================

// 自动调整文本框高度
window.autoResize = function(el) {
    el.style.height = 'auto'; 
    el.style.height = el.scrollHeight + 'px';
};

// 打开角色/面具编辑页
window.openCreatorPage = function(id = null) {
    const page = document.getElementById('sub-page-creator');
    if (!page) return;

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
            document.getElementById('creator-name').value = c.name || ''; // 如果HTML里是 creator-name
            document.getElementById('creator-alias').value = c.alias || '';
            document.getElementById('creator-gender').value = c.gender || ''; // ★ 新增性别回填
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
// === 逻辑修正：彻底解绑，独立保存 ===
window.saveCharacter = function() {
    const elRealName = document.getElementById('creator-realname');
    const elNickName = document.getElementById('creator-name');
    const elAvatar   = document.getElementById('creator-avatar');
    
    const realname = elRealName ? elRealName.value.trim() : "";
    const nickname = elNickName ? elNickName.value.trim() : "";
    
    // 没名字可不行，我会生气的
    if (!realname && !nickname) { 
        alert('至少给个名字嘛> ˄ ˂̥̥....'); 
        return; 
    }

    // 获取头像 URL (只取当前捏人界面的图)
    const avatarUrl = elAvatar ? elAvatar.style.backgroundImage : "";
    
    const newChar = {
        id: currentEditingId || Date.now(),
        realname: realname,
        name: nickname || realname, // 优先用昵称
        alias: document.getElementById('creator-alias')?.value || "",
        gender: document.getElementById('creator-gender')?.value || "", // ★ 新增性别保存
        height: document.getElementById('creator-height')?.value || "",
        age: document.getElementById('creator-age')?.value || "",
        mbti: document.getElementById('creator-mbti')?.value || "",
        tags: document.getElementById('creator-tags')?.value || "",
        hobbies: document.getElementById('creator-hobbies')?.value || "", // 变成 textarea 了也能取到 value，不用改
        desc: document.getElementById('creator-desc')?.value || "",
        persona: document.getElementById('creator-persona')?.value || "",
        avatar: (avatarUrl && avatarUrl !== 'none' && avatarUrl !== 'initial') ? avatarUrl : ''
    };


    if (creatorMode === 'persona') {
        // === 如果你在编辑“我” (ME) 的面具 ===
        // 只保存数据到 personasData，绝对不去碰设置页的头像！
        updateList(personasData, newChar);
        
        localforage.setItem('Wx_Personas_Data', personasData).then(() => {
            alert('ME的面具保存成功啦(๑＞ ＜)☆！！');
            // 刷新聊天列表，确保消息框里的头像更新
            if(window.renderChatList) window.renderChatList(); 
            // 如果当前正好在聊天的详情页，且用的是这个面具，也顺手刷新一下消息记录
            if(currentChatId && window.renderMessages) window.renderMessages(currentChatId);
            
            finishCreatorAction('me');
        });

    } else {
        // === 如果你在编辑“TA” (Character) ===
        updateList(contactsData, newChar);
        
        localforage.setItem('Wx_Contacts_Data', contactsData).then(() => {
            alert('角色保存成功啦（๑＞ ＜)☆～');
            // 刷新列表，让那个方框头像变过来
            if(window.renderChatList) window.renderChatList();
            // 刷新消息详情页的头像
            if(currentChatId && window.renderMessages) window.renderMessages(currentChatId);
            
            finishCreatorAction('all');
        });
    }
};

function finishCreatorAction(tabToRefresh) {
    if (window.switchContactTab) switchContactTab(tabToRefresh);
    const page = document.getElementById('sub-page-creator');
    if (page) {
        page.classList.remove('active');
        setTimeout(() => { page.style.display = 'none'; }, 300);
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
    closeAlertWithAnim('delete-alert-overlay');
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

window.enterChat = function(chat) {
    currentChatId = chat.id;
    const contact = contactsData.find(c => c.id === chat.contactId);
    
    // === 更新新版顶栏的信息 ===
    // 1. 名字
    const nameEl = document.getElementById('chat_layer_name');
    if(nameEl) nameEl.innerText = contact ? contact.name : 'Unknown';
    
    // 2. 头像 (新加的逻辑，自动把角色的头像同步到顶栏左边)
    const avatarEl = document.getElementById('chat_layer_avatar');
    if(avatarEl && contact) {
        avatarEl.style.backgroundImage = contact.avatar;
    }

    // 显示页面
    document.getElementById('sub-page-chat-detail').style.display = 'flex';
    setTimeout(() => document.getElementById('sub-page-chat-detail').classList.add('active'), 10);
    renderMessages(chat.id);
};

window.closeChatDetail = function() {
    document.getElementById('sub-page-chat-detail').classList.remove('active');
    setTimeout(() => document.getElementById('sub-page-chat-detail').style.display = 'none', 300);
    currentChatId = null;
    renderChatList(); // 退出时刷新列表(以防万一)
};

// 渲染消息 (最终版：含动画、状态、引用)
function renderMessages(chatId) {
    const container = document.getElementById('chat-msg-area');
    // 注意：全量刷新会导致旧消息也闪烁，完美方案是Diff更新，但为了简单，我们只给最后一条加动画
    container.innerHTML = ''; 
    
    const chat = chatsData.find(c => c.id === chatId);
    if (!chat || !chat.messages) return;

    const contact = contactsData.find(c => c.id === chat.contactId);
    const persona = personasData.find(p => p.id === chat.personaId) || { avatar: '' };

    let lastTime = 0;
    const totalMsgs = chat.messages.length;

    chat.messages.forEach((msg, index) => {
        // 1. 时间胶囊
        if (msg.timestamp - lastTime > 5 * 60 * 1000) {
            const timeDiv = document.createElement('div');
            timeDiv.className = 'msg-time-pill';
            timeDiv.innerText = formatDetailTime(msg.timestamp);
            container.appendChild(timeDiv);
            lastTime = msg.timestamp;
        }

        const isMe = msg.role === 'me';
        const nextMsg = chat.messages[index + 1];

        // 2. 撤回消息
        if (msg.type === 'recall') {
            const recallDiv = document.createElement('div');
            recallDiv.className = 'msg-recall-pill';
            const who = isMe ? '我' : (contact ? contact.name : 'TA');
            const contentToPeek = msg.originalText || "未知内容";
            recallDiv.innerHTML = `${who} 撤回了一条消息 <span class="recall-link" onclick="alert('偷看内容：\\n${contentToPeek}')">点击偷看</span>`;
            container.appendChild(recallDiv);
            return; 
        }

        // 3. 智能尾巴
        let hasTail = false;
        if (!nextMsg || isMe !== (nextMsg.role === 'me') || (nextMsg.timestamp - msg.timestamp > 2 * 60 * 1000)) {
            hasTail = true;
        }

        // 4. 构建气泡
        const row = document.createElement('div');
        row.className = `msg-row ${isMe ? 'me' : 'other'} ${hasTail ? 'has-tail' : ''}`;
        row.dataset.msgIndex = index; 
        row.id = `msg-${msg.timestamp}`;

        // ★★★ 动画逻辑：如果是最后一条，且是刚发的(1秒内)，加动画 ★★★
        if (index === totalMsgs - 1 && (Date.now() - msg.timestamp < 1000)) {
             row.classList.add('new-msg-anim');
        }

        const avatarUrl = isMe ? persona.avatar : (contact ? contact.avatar : '');
        const bgStyle = getAvatarStyle(avatarUrl);
        const mainBubble = `<div class="msg-content">${msg.text}</div>`;
        
        // 引用块
        let quoteHtml = '';
        if (msg.quote) {
            let fullQuoteText = `${msg.quote.name}：${msg.quote.text}`;
            if (fullQuoteText.length > 15) fullQuoteText = fullQuoteText.substring(0, 15) + "...";
            
            quoteHtml = `
                <div class="msg-quote-outside" onclick="scrollToMsg('${msg.quote.id}')">
                    ${fullQuoteText}
                </div>
            `;
        }

        row.innerHTML = `
            ${!isMe ? `<div class="msg-avatar" style="${bgStyle}"></div>` : ''}
            <div class="msg-container-col">
                ${mainBubble}
                ${quoteHtml}
            </div>
            ${isMe ? `<div class="msg-avatar" style="${bgStyle}"></div>` : ''}
        `;
        
        const bubbleContent = row.querySelector('.msg-content');
        if(bubbleContent) bindLongPress(bubbleContent);
        
        container.appendChild(row);
    });

    // 5. 底部状态 (已送达 / 已读)
    if (totalMsgs > 0) {
        const lastMsg = chat.messages[totalMsgs - 1];
        const statusDiv = document.createElement('div');
        statusDiv.className = 'msg-status-foot';
        
        const d = new Date(lastMsg.timestamp);
        const timeStr = `${d.getHours()}:${d.getMinutes().toString().padStart(2,'0')}`;
        
        let statusText = "已送达";
        if (lastMsg.role === 'other') statusText = "已读";
        
        statusDiv.innerText = `${statusText} ${timeStr}`;
        
        if (lastMsg.role === 'other') {
            statusDiv.style.textAlign = 'left';
            statusDiv.style.paddingLeft = '58px'; 
        } else {
            statusDiv.style.textAlign = 'right';
            statusDiv.style.paddingRight = '18px'; 
        }
        
        container.appendChild(statusDiv);
    }

    // 丝滑滚动
    container.scrollTop = container.scrollHeight;
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
    
    // 自动顶置
    if (!chatsData[chatIndex].pinned) {
        const item = chatsData.splice(chatIndex, 1)[0];
        chatsData.unshift(item);
    }

    saveChatAndRefresh(chatsData[chatIndex]);

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

// === AI 逻辑 (拟人化 + 正在输入 + 气泡雨 + 引用 + 撤回) ===
window.triggerAI = async function() {
    if (!currentChatId) return;
    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat) return;

    // 1. 获取角色和“我”的信息
    const char = contactsData.find(c => c.id === chat.contactId);
    const me = personasData.find(p => p.id === chat.personaId) || { name: 'User' };
    
    // === 补回来的部分：决定是否引用你 (20%概率) ===
    let aiQuote = null;
    // 只有当有消息记录时才引用
    if (Math.random() < 0.2 && chat.messages.length > 0) {
        // 找到你发的最后一条消息
        const lastUserMsg = chat.messages.slice().reverse().find(m => m.role === 'me');
        if (lastUserMsg) {
            aiQuote = {
                text: lastUserMsg.text,
                name: me.name || '你',
                id: lastUserMsg.timestamp
            };
        }
    }

    // 2. 构建历史记录 (让AI偷看撤回的消息)
    const history = (chat.messages || []).slice(-15).map(m => {
        let content = m.text;
        let prefix = '';
        
        // ★★★ 关键点：如果消息被撤回了，强行把原话塞给AI ★★★
        if (m.type === 'recall') {
            content = m.originalText || "（内容丢失）";
            prefix = ' (user表面上撤回了这条消息，但其实是想说): ';
        }
        
        return `${m.role === 'me' ? '我' : '你'}${prefix}: ${content}`;
    }).join('\n');
    
    // 3. ★★★ 注入灵魂的 System Prompt (修改版) ★★★
    const systemPrompt = `
    你现在进行一场Cosplay扮演。
    
    【你的角色信息】
    - 姓名：${char.name} (真名: ${char.realname || '未知'})
    - 别名/昵称：${char.alias || '无'}
    - 性别：${char.gender || '未知'}
    - 年龄：${char.age || '未知'}
    - 身高：${char.height || '未知'}
    - MBTI：${char.mbti || '未知'}
    - 标签：${char.tags || '无'}
    - 爱好/其他设定：${char.hobbies || '无'}
    - 核心背景故事：${char.desc}
    - 性格/语气/说话方式：${char.persona}
    
    【对话者信息 (User)】
    - 姓名：${me.name} (真名: ${me.realname || '未知'})
    - 别名/昵称：${me.alias || '无'}
    - 性别：${me.gender || '未知'}
    - 年龄：${me.age || '未知'}
    - 爱好/设定：${me.hobbies || '无'}
    - User背景/简介：${me.desc}
    - User性格：${me.persona}

    【重要：模仿真实人类的聊天习惯】
    1. **拒绝翻译腔**：说话要口语化，不要像写作文。
    2. **标点符号**：
       - 线上聊天**尽量减少**在句尾加句号“。”的次数（除非你想表达生气、冷漠、阴阳怪气或者难过，比如“哦。”“哄哄我。”）。
       - 情绪激动时可以使用“！！！”或“？？？”、“。。。。”“！？！！？”或等等多个符号的组合，但请以人设为准。
       - 此时此刻，你就是个拿着手机打字的活人。
    3. **气泡雨（分段发送）**：
       - 现实中人们不会在一个气泡里发一大段话。
       - **请务必**用换行符分隔你的不同念头。
       - 例如：
         “笑死我了”
         “你猜我刚才看见谁了”
         “竟然是那个谁！”
       - 我会根据你的换行，把你回复的内容拆成多条消息发送。
    4. **回复长度**：短小精悍为主，偶尔可以长，但尽量多分段。
    5. ★★★【核心玩法：口是心非与撤回】★★★
       - 你是一个有血有肉的人，不是机器人。
       - **请根据你的性格设定 (${char.persona}) 来决定是否使用撤回功能**：
         > 如果你是【傲娇/腹黑/占有欲强/病娇】的角色：请在感到吃醋、在意、或者不想承认自己感情时，**适度**使用撤回格式。
         > 如果你是【直球/阳光/温柔/成熟】的角色：请**尽量少用**或者**不用**撤回，直接表达你的想法，除非你真的遇到了极度想要掩饰的尴尬瞬间。
       - **不要滥用！不要每一句都撤回！** 只有当“内心阴暗/真实的想法”与“必须维持的表面礼貌”发生**强烈冲突**时才使用。
       - **格式规则**：{{内心真实想法(会被撤回)::表面伪装回复(最终保留)}}
       - **错误示范** (不要这样)：{{你好::你好}} (毫无意义的撤回)
       - **正确示范**：
         User: "今晚我要加班，不陪你了。"
         You (傲娇男友): "{{你是想死吗？又要丢下我！::噢，知道了，那你忙吧。}}"
       
    历史记录：
    ${history}
    
    请以${char.name}的口吻回复：
    `;
    

    // 4. 显示“正在输入”动画
    const container = document.getElementById('chat-msg-area');
    const loadingId = 'typing-' + Date.now();
    const loadingDiv = document.createElement('div');
    loadingDiv.id = loadingId;
    loadingDiv.className = 'typing-row';
    const avatarUrl = char ? char.avatar : '';
    const bgStyle = getAvatarStyle(avatarUrl);
    
    loadingDiv.innerHTML = `
        <div class="msg-avatar" style="${bgStyle}"></div>
        <div class="typing-bubble">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    container.appendChild(loadingDiv);
    container.scrollTop = container.scrollHeight; 

    try {
        // 5. 调用 API
        const reply = await callApiInternal(systemPrompt);
        
        // 6. 移除“正在输入”
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();

        if (reply) {
            // 7. 气泡雨处理 (按换行符拆分)
            const segments = reply.split('\n').filter(s => s.trim() !== '');
            
            for (let i = 0; i < segments.length; i++) {
                let seg = segments[i];

                // 间隔稍微长一点，显得在打字思考
                await new Promise(r => setTimeout(r, 800)); 
                
                // 只有第一条消息带引用 (如果刚才决定了要引用的话)
                const currentQuote = (i === 0) ? aiQuote : null;
                
                // ★★★ 新逻辑：检测“口是心非”格式 {{心里话::表面话}} ★★★
                // 正则表达式：匹配 {{...::...}}
                const match = seg.match(/\{\{(.+?)::(.+?)\}\}/);

                if (match) {
                    // 捕获到了！AI想要表演撤回！
                    const innerThought = match[1]; // 心里话 (比如：把腿打断)
                    const outerText = match[2];    // 表面话 (比如：注意安全)
                    
                    // 执行撤回表演：先发“心里话” -> 撤回 -> 再发“表面话”
                    await simulateAiRecall(innerThought, outerText, currentQuote);
                    
                } else {
                    // 没有触发撤回，正常发送
                    sendMsg('other', seg, 'text', currentQuote);
                }
            }
        }
    } catch (e) {
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();
        alert('断网啦？连不上大脑了qwq: ' + e.message);
    }
};

// === 修复后的 API 调用函数 (带错误侦测) ===
async function callApiInternal(prompt) {
    // 1. 基础检查
    if (!apiConfig.main.key) { alert('没配置API Key呀笨蛋！'); return null; }
    
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
        // e.preventDefault(); // 注：如果不想影响滚动，这里慎用 preventDefault
        longPressTimer = setTimeout(() => {
            showMsgMenu(element, e.touches[0].clientX, e.touches[0].clientY);
            if (navigator.vibrate) navigator.vibrate(50);
        }, 600);
    });
    element.addEventListener('touchend', () => clearTimeout(longPressTimer));
    element.addEventListener('touchmove', () => clearTimeout(longPressTimer));
}

// 显示长按菜单 (修复版)
function showMsgMenu(el, touchX, touchY) {
    currentLongPressElement = el;
    const menu = document.getElementById('msg-pop-menu');
    
    // 确保箭头存在
    let arrow = menu.querySelector('.mpm-arrow');
    if(!arrow) {
        arrow = document.createElement('div');
        arrow.className = 'mpm-arrow';
        menu.appendChild(arrow);
    }

    // 判断是“我”还是“他”，修改菜单项
    const msgRow = el.closest('.msg-row');
    const recallBtn = document.getElementById('menu-btn-recall');
    
    // 必须确保 index.html 里那个撤回按钮有 id="menu-btn-recall"
    if (recallBtn) {
        if (msgRow && msgRow.classList.contains('me')) {
            // 如果是我的消息，显示“撤回”
            recallBtn.innerText = '撤回';
            recallBtn.setAttribute('onclick', "menuAction('recall')");
        } else {
            // 如果是对方(AI)的消息，显示“编辑”
            recallBtn.innerText = '编辑';
            recallBtn.setAttribute('onclick', "menuAction('edit-ai')");
        }
    }

    menu.style.display = 'flex';
    
    // 定位计算
    const rect = el.getBoundingClientRect();
    const menuHeight = menu.offsetHeight || 60;
    const menuWidth = 260; 
    
    // 水平居中
    let left = rect.left + (rect.width / 2) - (menuWidth / 2);
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
    
    arrow.className = `mpm-arrow ${arrowClass}`;
    // 箭头跟随气泡中心
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
        showSystemAlert('复制好啦～(^_−)−☆');
    } 
    else if (action === 'reply') {
        // === 引用功能 ===
        const nameEl = document.getElementById('chat_layer_name');
        const who = msg.role === 'me' ? 'Me' : (nameEl ? nameEl.innerText : 'TA');
        
        currentQuoteMsg = {
            text: msg.text,
            name: who,
            id: msg.timestamp
        };
        const input = document.getElementById('chat-input');
        input.placeholder = `回复 ${who}: ${msg.text.substring(0, 10)}...`;
        input.focus();
    } 
    else if (action === 'recall') {
        // === 撤回功能 (User) ===
        msg.originalText = msg.text || '[非文本]';
        msg.type = 'recall';
        delete msg.text; 
        saveChatAndRefresh(chat);
    }
    else if (action === 'edit-ai') {
        // === 编辑AI消息功能 ===
        if(msg.type !== 'text') {
            showSystemAlert('只能编辑文本消息哦> ˄ ˂̥̥');
            hideAllMenus();
            return;
        }
        const newText = prompt("在这编辑TA的消息...:", msg.text);
        if (newText !== null && newText.trim() !== '' && newText !== msg.text) {
            msg.text = newText;
            saveChatAndRefresh(chat);
            showSystemAlert('保存成功啦(≧∇≦)！！');
        }
    }
    else if (action === 'delete') {
        // === 删除功能 ===
        if(confirm('确定要删除这条消息嘛？删了就找不回了哦Σ（・□・；）！！')) {
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
window.confirmDeletePreset = function() {
    const name = document.getElementById('api-preset-select').value;
    apiPresets = apiPresets.filter(p => p.name !== name);
    localforage.setItem('Wx_Api_Presets', apiPresets).then(() => {
        renderPresetDropdown();
        document.getElementById('preset-del-overlay').style.display = 'none';
    });
};

// ==========================================================
// [12] 工具函数 (Utilities)
// ==========================================================

function formatTime(ts) {
    if (!ts) return 'Just now';
    const d = new Date(ts);
    const now = new Date();
    if (d.toDateString() === now.toDateString()) {
        return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
    }
    return `${d.getMonth()+1}/${d.getDate()}`;
}

function formatDetailTime(ts) {
    const d = new Date(ts);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2,'0')}`;
}

// 覆盖 Alert
window.showSystemAlert = function(msg) {
    const el = document.getElementById('system-alert-overlay');
    const msgEl = document.getElementById('system-alert-msg');
    if (!el || !msgEl) { console.warn("Index.html missing alert overlay"); return; }
    msgEl.innerHTML = msg; 
    el.style.display = 'flex';
};
window.closeSystemAlert = function() { document.getElementById('system-alert-overlay').style.display = 'none'; };

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

// 应用选中的框
function applyFrame(url) {
    if (currentFrameTarget) {
        currentFrameTarget.style.backgroundImage = `url('${url}')`;
        currentFrameTarget.style.backgroundSize = 'contain';
        currentFrameTarget.style.backgroundRepeat = 'no-repeat';
        
        // 如果有默认边框，去掉它
        currentFrameTarget.style.border = 'none';
        
        // 自动保存
        saveMemory(); // 复用你现有的保存机制
        
        // 提示一下
        showSystemAlert('换装成功！美美哒(≧∇≦)');
        closeFrameLib();
    }
}

// 移除框
window.removeFrame = function() {
    if (currentFrameTarget) {
        currentFrameTarget.style.backgroundImage = 'none';
        saveMemory();
        closeFrameLib();
    }
};

// 上传自定义框 (保留原来的功能)
// 1. 渲染网格 (升级版：加了预览底图)
function renderFrameGrid() {
    const grid = document.getElementById('frame-lib-grid');
    grid.innerHTML = '';
    
    AVATAR_FRAMES_DB.forEach(frame => {
        const item = document.createElement('div');
        item.className = 'frame-lib-item';
        
        // ★ 重点：加了一个 "preview-face" (假人头)，方便你看效果
        item.innerHTML = `
            <div class="preview-face"></div> 
            <img src="${frame.url}" class="frame-lib-img" loading="lazy">
        `;
        
        item.onclick = () => applyFrame(frame.url);
        grid.appendChild(item);
    });
}

// 2. 上传自定义框 (修正版：不自动关闭)
window.triggerCustomFrameUpload = function() {
    if (currentFrameTarget) {
        handleImageUpload(currentFrameTarget);
        // closeFrameLib();  <--这一行被我删掉了！现在选完图，库还在！
    }
};


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
