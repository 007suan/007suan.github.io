/**
 * ==========================================================
 * 幸福的秘诀是 拥有苹果时只在意苹果(๑＞＜)☆
 * ==========================================================
 */

const MEMORY_KEY = 'huanhuan_System_Data_v6'; 

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
// === 全局变量：朋友圈红点 ===
let hasNewMomentsMsg = false;

// 触发红点
function triggerMomentsRedDot() {
    hasNewMomentsMsg = true;
    updateRedDotsUI();
}

// 消除红点 (打开朋友圈时调用)
function clearMomentsRedDot() {
    hasNewMomentsMsg = false;
    updateRedDotsUI();
}
let tempMentionSelection = []; 

// 刷新 UI 显示
function updateRedDotsUI() {
    const dockBtn = document.getElementById('dock-btn-discover');
    const cell = document.querySelector('.moments-cell'); // 假设你在 index.html 给朋友圈那个条目加了这个 class
    
    // 1. 处理底部 Dock
    if (dockBtn) {
        if (hasNewMomentsMsg) dockBtn.classList.add('has-news');
        else dockBtn.classList.remove('has-news');
    }
    
    // 2. 处理发现页列表
    if (cell) {
        if (hasNewMomentsMsg) cell.classList.add('has-news');
        else cell.classList.remove('has-news');
    }
}

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

    const desktop = document.querySelector('.desktop-wrapper');
    if (desktop) {
        setTimeout(() => {
            desktop.scrollTo({ left: desktop.clientWidth, behavior: 'auto' });
        }, 50); 
    }
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
        if(window.initWorldBook) window.initWorldBook(); 

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

// ====================
// [终极修复版] 读取记忆 (loadMemory)
// ====================
window.loadMemory = function() {
    // 定义图片选择器
    const imgSelectors = '.upload-img, .app-icon, .profile-avatar, .polaroid-img, .wx-big-avatar, .wx-small-avatar, .wx-p2-header-bg, .wx-big-avatar-new, .sync-avatar, .chl-frame, .w-mini-cover, .w-thumb-item, .big-photo-widget, .ins-square-widget';

    localforage.getItem(MEMORY_KEY).then(data => {
        if (data) {
            
            // ===============================================
            // ★★★ 1. 修复文字恢复逻辑 (重点在这里！) ★★★
            // ===============================================
            if (data.texts) {
                // 不再瞎猜 ID，而是老老实实遍历页面上所有的 .edit-text
                document.querySelectorAll('.edit-text').forEach((el, index) => {
                    // 1. 算出它当时保存时的身份证号 (Key)
                    const key = getUniqueKey(el, index, 'txt');
                    
                    // 2. 看看记忆里有没有这个号的内容
                    if (data.texts[key]) {
                        el.innerText = data.texts[key];
                    }
                });
            }
            
            // 2. 恢复图片 (保持你原来的修复版逻辑，这里没问题)
            if (data.images) {
                const elements = document.querySelectorAll(imgSelectors);
                elements.forEach((el, index) => {
                    const key = getUniqueKey(el, index, 'img');
                    const savedBg = data.images[key];
                    if (savedBg) {
                        el.style.backgroundImage = savedBg;
                        el.style.backgroundColor = 'transparent'; 
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
                    const key = getUniqueKey(el, index, 'sw'); // 统一用 getUniqueKey
                    if (data.switches[key] !== undefined) el.checked = data.switches[key];
                });
            }

            // 4. 恢复壁纸
            if (data.wallpaper && data.wallpaper !== 'none') {
                document.documentElement.style.setProperty('--wall-url', data.wallpaper);
                const screen = document.getElementById('phoneScreen');
                if (screen) {
                    screen.style.backgroundImage = 'none';
                    screen.style.backgroundColor = 'transparent';
                }
            } else {
                document.documentElement.style.setProperty('--wall-url', 'none');
            }
   
            // 5. 恢复UI状态
            setTimeout(() => { 
                if(window.toggleHomeBar) window.toggleHomeBar(); 
                if(window.toggleStatusBar) window.toggleStatusBar(); 
            }, 150);

            console.log('✅ 记忆读取成功！文案已恢复！');
        }
    }).catch(err => console.log('New User / No Memory:', err))
    .finally(() => {
        // 加载吐司边框
        const savedToast = JSON.parse(localStorage.getItem('Wx_Toast_Settings') || '{"enabled":false,"color":"#ffffff"}');
        if(typeof toastSettings !== 'undefined') toastSettings = savedToast;
        if(window.updateGlobalToastStyle) window.updateGlobalToastStyle(); 
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
// [修复版] 打开子页面 (进场动画)
// ====================
// 防止循环引用兜底
const _originalOpen = window.openSubPage; 

window.openSubPage = function(id) {
    const page = document.getElementById(id);
    if(page) {
        // 1. 先把 display 打开，不然动画看不见
        page.style.display = 'flex';
        
        // 2. 强行重绘 (告诉浏览器：准备动起来！)
        // 这一步很重要，防止浏览器偷懒把两步合并了
        page.offsetHeight; 
        
        // 3. 加上 active 类，触发 CSS 里的 transform: translateY(0)
        page.classList.add('active');
        
        // (保持你原有的刷新逻辑不变)
        if (id === 'sub-api-config') {
            if(window.renderPresetDropdown) window.renderPresetDropdown();
            if(window.renderApiUI) window.renderApiUI();
        }
        if (id === 'sub-icon') {
            setTimeout(window.initIconSettingsGrid, 50);
        }
        if (id === 'sub-wallpaper') {
            if(typeof initWallpaperPage === 'function') setTimeout(initWallpaperPage, 50);
        }
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
        // 1. 立即切换 UI 状态，确保点击即反应，不阻塞
        if(globalHeader) globalHeader.style.display = 'none'; 
        document.getElementById('wx-page-moments').style.display = 'block';
        document.querySelectorAll('.wx-tab-item')[2].classList.add('active');

        // 2. 插入加载占位符 (让宝宝先看到转圈圈，而不是卡住)
        const feedContainer = document.getElementById('moments-feed-container');
        if (feedContainer) {
            feedContainer.innerHTML = `
                <div class="moments-loading-view">
                    <div class="moments-spinner"></div>
                    <div class="moments-loading-text">Loading...</div>
                </div>
            `;
        }

        // 3. ★ 核心优化：使用 setTimeout(..., 10) 开启异步渲染
        // 这会让浏览器先完成“切换Tab”的视觉更新，再去执行繁重的“渲染朋友圈”任务
        setTimeout(() => {
            // 先渲染头部（比较快）
            if(window.renderMomentsHeader) window.renderMomentsHeader();
            
            // 再渲染列表（比较慢，但已经在后台队列里了）
            if(window.renderMomentsFeed) {
                window.renderMomentsFeed();
                // 渲染完后，加载动画会自动被 renderMomentsFeed 里的 innerHTML = '' 给刷掉
            }
            
            console.log("✨ 朋友圈异步加载完成，丝滑倍增！");
        }, 10); 
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
// [6] 角色创建器 (Character Creator) - 完美修复版
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

    // 1. 先显示 display:flex，利用 setTimeout 触发 transform 动画
    page.style.display = 'flex';
    // 强制重绘，确保动画生效
    requestAnimationFrame(() => {
        page.classList.add('active');
    });

    // 获取DOM元素 (新增了 birthday 和 appearance)
    const infoSubtitle = page.querySelector('.exp-info-subtitle');
    const aboutTitle = page.querySelector('.exp-sec-title'); 
    const realnameInput = document.getElementById('creator-realname');
    const descInput = document.getElementById('creator-desc');
    const personaInput = document.getElementById('creator-persona');
    const hobbiesInput = document.getElementById('creator-hobbies');
    
    // ★★★ 新增字段 DOM ★★★
    const birthdayInput = document.getElementById('creator-birthday');
    const appearanceInput = document.getElementById('creator-appearance');

    // 清空旧数据
    page.querySelectorAll('input, textarea').forEach(el => el.value = '');
    document.getElementById('creator-avatar').style.backgroundImage = '';
    const tip = page.querySelector('.exp-avatar-tip');
    if(tip) tip.style.display = 'block'; 

    // 根据模式设置占位符
    if (creatorMode === 'persona') {
        if(infoSubtitle) infoSubtitle.innerHTML = "The following is<br>About <b>my</b> basic information";
        if(aboutTitle) aboutTitle.innerText = "ABOUT Me";
        realnameInput.placeholder = "我的名称";
        descInput.placeholder = "关于我 (ME) 的故事...";
        personaInput.placeholder = "我的性格设定...";
        if(appearanceInput) appearanceInput.placeholder = "我的外貌描写..."; 
    } else {
        if(infoSubtitle) infoSubtitle.innerHTML = "The following is<br>About <b>TA's</b> basic information";
        if(aboutTitle) aboutTitle.innerText = "ABOUT TA";
        realnameInput.placeholder = "角色名称";
        descInput.placeholder = "关于TA的故事...";
        personaInput.placeholder = "TA的性格设定...";
        if(appearanceInput) appearanceInput.placeholder = "TA的外貌描写...";
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

            // ★★★ 回填新字段 ★★★
            if(birthdayInput) birthdayInput.value = c.birthday || '';
            if(appearanceInput) appearanceInput.value = c.appearance || '';

            if (c.avatar) {
                document.getElementById('creator-avatar').style.backgroundImage = c.avatar;
                if(tip) tip.style.display = 'none';
            }

            // 自主意识设置回显
            const activeSwitch = document.getElementById('detail-active-mode');
            if (activeSwitch) {
                activeSwitch.checked = c.enableActiveMode || false;
                const intervalBox = document.getElementById('active-interval-box');
                if (intervalBox) intervalBox.style.display = activeSwitch.checked ? 'flex' : 'none';
                
                activeSwitch.onchange = function() {
                    if (intervalBox) intervalBox.style.display = this.checked ? 'flex' : 'none';
                };
            }
            const activeInput = document.getElementById('detail-active-interval');
            if (activeInput) activeInput.value = c.activeInterval || 60;
        }
    }
    
    // 自动调整所有文本框高度
    page.querySelectorAll('textarea').forEach(el => autoResize(el));
};

// 保存逻辑
window.saveCharacter = function() {
    const elRealName = document.getElementById('creator-realname');
    const elNickName = document.getElementById('creator-name');
    const elAvatar   = document.getElementById('creator-avatar');
    
    const realname = elRealName ? elRealName.value.trim() : "";
    const nickname = elNickName ? elNickName.value.trim() : "";
    
    if (!realname && !nickname) { 
        alert('至少给个名字嘛TvT....'); 
        return; 
    }

    const avatarUrl = elAvatar ? elAvatar.style.backgroundImage : "";
    
    const newChar = {
        id: currentEditingId || Date.now(),
        realname: realname,
        name: nickname || realname,
        alias: document.getElementById('creator-alias')?.value || "",
        gender: document.getElementById('creator-gender')?.value || "", 
        height: document.getElementById('creator-height')?.value || "",
        age: document.getElementById('creator-age')?.value || "",
        mbti: document.getElementById('creator-mbti')?.value || "",
        tags: document.getElementById('creator-tags')?.value || "",
        hobbies: document.getElementById('creator-hobbies')?.value || "", 
        desc: document.getElementById('creator-desc')?.value || "",
        persona: document.getElementById('creator-persona')?.value || "",
        
        // ★★★ 保存新字段 ★★★
        birthday: document.getElementById('creator-birthday')?.value || "",
        appearance: document.getElementById('creator-appearance')?.value || "",

        avatar: (avatarUrl && avatarUrl !== 'none' && avatarUrl !== 'initial') ? avatarUrl : '',        
        enableActiveMode: document.getElementById('detail-active-mode')?.checked || false,
        activeInterval: parseInt(document.getElementById('detail-active-interval')?.value || "60")
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

// 结束编辑 (修复动画版)
function finishCreatorAction(tabToRefresh) {
    if (window.switchContactTab) switchContactTab(tabToRefresh);
    const page = document.getElementById('sub-page-creator');
    if (page) {
        // 1. 先移除 active，触发 slide-down 动画
        page.classList.remove('active');
        
        // 2. 等待 300ms 动画结束后再隐藏 display
        setTimeout(() => { 
            page.style.display = 'none'; 
            page.style.zIndex = ''; 
        }, 300);
    }

    if (window._isReturningToControl) {
        setTimeout(() => {
            if(window.openChatControl) window.openChatControl(); 
            window._isReturningToControl = false;
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

    // ★★★ [修复] 定义显示的名字：优先取 chat.privateAlias ★★★
    const displayName = chat.privateAlias || contact.name;

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
                    <span class="ili-name">${displayName}</span> <span class="ili-time">${formatTime(chat.lastTime)}</span>
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
    // ---------------------------------------------------
    // 1. 清理通知队列逻辑 (保持不变)
    // ---------------------------------------------------
    if(typeof notificationQueue !== 'undefined') {
        notificationQueue = notificationQueue.filter(n => String(n.chatId) !== String(chat.id));
        const banner = document.getElementById('ios-notification');
        if(banner && banner.classList.contains('show')) {
             banner.classList.remove('show');
             if(typeof isNotifShowing !== 'undefined') isNotifShowing = false;
             setTimeout(() => { if(window.processNextNotification) processNextNotification(); }, 500);
        }
    }

    currentChatId = chat.id;
    const contact = contactsData.find(c => c.id === chat.contactId);
    
    // ---------------------------------------------------
    // 2. 更新UI元素 (保持不变)
    // ---------------------------------------------------
    const nameEl = document.getElementById('chat_layer_name');
    
    // ★★★ [修复] 优先显示 chat.privateAlias，没有则显示 contact.name ★★★
    if(nameEl) {
        nameEl.innerText = chat.privateAlias || (contact ? contact.name : 'Unknown');
    }

    const avatarEl = document.getElementById('chat_layer_avatar');
    if(avatarEl && contact) avatarEl.style.backgroundImage = contact.avatar;
    const frameEl = document.getElementById('chat_layer_frame');
    if (frameEl) frameEl.style.backgroundImage = (contact && contact.frame) ? `url('${contact.frame}')` : 'none';

    chat.unread = 0;
    if(window.updateGlobalBadges) window.updateGlobalBadges();
    
    currentRenderLimit = 20; 

    // ---------------------------------------------------
    // 3. 页面进场与滚动修复 (★ 重点修改区域 ★)
    // ---------------------------------------------------
    const page = document.getElementById('sub-page-chat-detail');
    if(page) {
        page.style.display = 'flex';
        requestAnimationFrame(() => {
            page.classList.add('active');
            
            // 这里原本是 setTimeout 50ms，稍微改小一点也没事
            setTimeout(() => {
                const msgArea = document.getElementById('chat-msg-area');
                if(msgArea) {
                    // --- 设置壁纸 ---
                    if (chat.bgImage) {
                        msgArea.style.backgroundImage = chat.bgImage;
                        msgArea.style.backgroundSize = 'cover';
                        msgArea.style.backgroundPosition = 'center';
                        msgArea.style.backgroundAttachment = 'fixed'; 
                    } else {
                        msgArea.style.backgroundImage = 'none';
                    }

                    // ★★★ 修复B：看历史记录不乱跳 ★★★
                    // 我们要把滚动逻辑写得聪明一点
                    msgArea.onscroll = () => {
                        // 当滚到顶部时...
                        if (msgArea.scrollTop === 0) {
                            // 1. 先记住现在的“总身高”
                            const oldHeight = msgArea.scrollHeight;
                            
                            // 2. 加载旧消息 (假设这个函数是同步的，或者很快)
                            loadMoreMessages(); 

                            // 3. 等浏览器渲染完（用setTimeout 0 排队到下一帧）
                            setTimeout(() => {
                                // 算出长高了多少：新身高 - 旧身高
                                const diff = msgArea.scrollHeight - oldHeight;
                                // 把滚动条“按”回去，让你视觉上看起来没动
                                if(diff > 0) msgArea.scrollTop = diff;
                            }, 0);
                        }
                    };
                    
                    // ★★★ 修复A：进聊天直接瞬移到底部 (拒绝 duang duang 滑行) ★★★
                    
                    // 1. 先把内容渲染出来 (传 false 禁止在这个函数里自动滚，完全由我们自己控制)
                    renderMessages(chat.id, false); 
                    
                    // 2. 强行关掉平滑滚动 (为了瞬移)
                    msgArea.style.scrollBehavior = 'auto'; 
                    
                    // 3. 一脚踹到底部
                    msgArea.scrollTop = msgArea.scrollHeight;
                    
                    // 4. (可选) 恢复平滑滚动，给用户手动滑的时候用
                    // setTimeout(() => { msgArea.style.scrollBehavior = 'smooth'; }, 100);

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

window.renderMessages = function(chatId, autoScroll = true) {
    const chat = chatsData.find(c => c.id === chatId);
    if (!chat) return;
    const container = document.getElementById('chat-msg-area');
    if (!container) return;
    
    const fragment = document.createDocumentFragment();
    const isAtBottom = (container.scrollHeight - container.scrollTop - container.clientHeight) < 150;
    const contact = contactsData.find(c => c.id === chat.contactId);
    const persona = personasData.find(p => p.id === chat.personaId) || { avatar: '' };
    const msgs = chat.messages || [];

    let limit = currentRenderLimit || 20;
    const startIndex = Math.max(0, msgs.length - limit);
    const msgsToRender = msgs.slice(startIndex);

    if (startIndex > 0) {
        const loadMore = document.createElement('div');
        loadMore.innerHTML = `<div style="padding:15px;text-align:center;color:#ccc;font-size:12px;cursor:pointer;">查看更早的消息</div>`;
        loadMore.onclick = () => loadMoreMessages();
        fragment.appendChild(loadMore);
    }

    let lastTime = 0;
    let lastRole = null;
    let groupShownAvatar = false; 

    msgsToRender.forEach((msg, i) => {
        const isMe = msg.role === 'me';
        const nextMsg = msgsToRender[i + 1];
        
        const globalIndex = startIndex + i;
        const isSelected = typeof isMsgMultiSelectMode !== 'undefined' && isMsgMultiSelectMode && selectedMsgIndices.includes(globalIndex);

        // 1. 时间胶囊 
        if (i === 0 || msg.timestamp - lastTime > 30 * 60 * 1000) {
            const timePill = document.createElement('div');
            timePill.className = 'msg-time-pill';
            
            // ★★★ 核心修改：这里不再只显示 HH:mm，而是调用我们刚写的 formatTime！ ★★★
            timePill.innerText = formatTime(msg.timestamp);
            
            fragment.appendChild(timePill);
            lastRole = null; 
        }

        // 2. 连续性核心逻辑
        const isNewGroup = (msg.role !== lastRole || (msg.timestamp - lastTime > 30 * 60 * 1000));
        if (isNewGroup) {
            lastRole = msg.role;
            groupShownAvatar = false; 
        }
        lastTime = msg.timestamp;

        const isNew = (Date.now() - msg.timestamp < 1500);
        const animClass = (autoScroll && isNew) ? 'new-msg-anim' : '';

        const applyMultiSelectLogic = (rowEl) => {
            rowEl.dataset.msgIndex = globalIndex; 
            if (typeof isMsgMultiSelectMode !== 'undefined' && isMsgMultiSelectMode) {
                rowEl.classList.add('multi-selecting');
                if (isSelected) rowEl.classList.add('selected');
                rowEl.onclick = (e) => {
                    e.stopPropagation();
                    if(window.toggleMsgSelection) window.toggleMsgSelection(globalIndex);
                };
            }
        };

        // 3. 渲染分类逻辑
        if (msg.type === 'action') {
            const row = document.createElement('div');
            row.className = `msg-row action-aside ${animClass}`;
            row.innerHTML = `<div class="msg-content">(${isMe ? '我' : (contact ? contact.name : 'TA')} ${msg.text})</div>`;
            fragment.appendChild(row);
        } 
        else if (msg.type === 'recall') {
            const row = document.createElement('div');
            row.className = 'msg-recall-pill';
            const who = isMe ? '我' : (contact ? contact.name : 'TA');
            const rawContent = (msg.originalText || "").replace(/"/g, '&quot;');
            const extraInfo = (msg.extra || "").replace(/"/g, '&quot;');
            const peekCode = `peekRecalledMsg("${msg.originalType || 'text'}", "${rawContent}", "${extraInfo}")`;
            row.innerHTML = `${who} 撤回了一条消息 <span class="recall-link" style="color:#007aff;cursor:pointer;margin-left:5px;" onclick='${peekCode}'>(点击偷看)</span>`;
            fragment.appendChild(row);
        } 
        else {
            const row = document.createElement('div');
            
            // ★★★ 核心修改：如果是 Chat History 卡片，强制要把尾巴去掉！ ★★★
            let hasTail = !nextMsg || nextMsg.role !== msg.role || (nextMsg.timestamp - msg.timestamp > 30 * 60 * 1000);
            if (msg.type === 'merged_record') {
                hasTail = false; // 强制隐藏小尾巴
            }
            // ★★★ 修改结束 ★★★
            
            row.className = `msg-row ${isMe ? 'me' : 'other'} ${hasTail ? 'has-tail' : ''} ${animClass}`;
            row.id = `msg-${msg.timestamp}`;

            // 头像逻辑
            const bgStyle = getAvatarStyle(isMe ? persona.avatar : (contact ? contact.avatar : ''));
            let avatarHtml = '';
            if (!groupShownAvatar) {
                avatarHtml = `<div class="msg-avatar-col"><div class="msg-avatar" style="${bgStyle}"></div><div class="msg-avatar-time">${formatMiniTime(msg.timestamp)}</div></div>`;
                groupShownAvatar = true;
            } else {
                avatarHtml = `<div class="msg-avatar-placeholder"></div>`;
            }

            let mainBubble = '';
            
            // --- 还原转账与回执逻辑 ---
            if (msg.type === 'transfer') {
                let status = msg.transferStatus;
                let amt = parseFloat(msg.text);
                if (!status || isNaN(amt)) {
                    try {
                        const extra = JSON.parse(msg.extra || '{}');
                        if (!status) status = extra.status;
                        if (isNaN(amt)) amt = parseFloat(extra.amount || 0);
                    } catch(e) {}
                }
                const stateClass = (status === 'accepted' || status === 'refunded') ? 'accepted' : '';
                let statusText = status === 'accepted' ? 'Received' : (status === 'refunded' ? 'Refunded' : 'Transfer');
                mainBubble = `<div class="msg-content transfer ${stateClass}" onclick="handleTransferClick('${msg.id}')"><div class="tf-icon-img"></div><div class="tf-info"><div class="tf-amt">¥${amt.toFixed(2)}</div><div class="tf-status">${statusText}</div></div></div>`;
            } 
            else if (msg.type === 'transfer_receipt') {
                const [action, amtVal] = (msg.text || "").split('|');
                const isAccept = action === 'accept';
                mainBubble = `<div class="msg-content receipt"><div class="receipt-icon ${isAccept ? '' : 'refund'}">${isAccept ? '✔' : '✕'}</div><div class="receipt-text"><span>${isAccept ? '已收款' : '已退回'}</span><span class="receipt-sub">¥${parseFloat(amtVal||0).toFixed(2)}</span></div></div>`;
            } 
            else if (msg.type === 'sticker') {
"max-width:120px;border-radius:10px;"
            mainBubble = `<img src="${msg.text}" class="sticker-img-big" style="max-width:120px; border-radius:10px; margin: 6px 0; display:block;">`;
        } 
            // ★★★ 1. 模拟图片 (极简版 + 下方描述) ★★★
            else if (msg.type === 'simulated_image') {
                const safeText = (msg.text || '').replace(/'/g, "&#39;"); // 安全转义
                
                // 1. 极简灰块 (去掉相机图标，只留文字)
                // 2. 下面挂一个隐藏的 div 存描述
                mainBubble = `
                    <div class="msg-bubble-wrapper" style="display:flex; flex-direction:column; align-items:${isMe ? 'flex-end' : 'flex-start'}">
                        <div class="msg-sim-image" onclick="toggleTrans(this)">
                            <div class="msg-sim-text">Image</div>
                        </div>
                        <div class="msg-translation-box">
                            ${safeText}
                        </div>
                    </div>
                `;
            }
            // ★★★ 2. 语音消息 (防飞出修复版) ★★★
            else if (msg.type === 'voice') {
                const duration = Math.max(2, Math.floor((msg.text || '').length / 3));
                const safeText = (msg.text || '').replace(/'/g, "&#39;");
                
                const bubbleClass = isMe ? 'msg-bubble-right' : 'msg-bubble-left';
                const textColor = isMe ? '#FFFFFF' : '#000000';
                
                const aiVoiceIconUrl = 'https://i.postimg.cc/9Mwgz41s/wu-biao-ti125-20260211100521.png'; 
                const meVoiceIconUrl = 'https://i.postimg.cc/rpPY8GC8/wu-biao-ti125-20260211100530.png'; 
                const iconSrc = isMe ? meVoiceIconUrl : aiVoiceIconUrl;

                // ★★★ 核心修复在这里！！ ★★★
                // 以前是：const width = 60 + duration * 6; (如果是60秒，宽度会飙到420px！)
                // 现在：加个 Math.min(220, ...) 只要超过220px，就强制按220px算！
                const width = Math.min(220, 60 + duration * 6);

                const flexDir = isMe ? 'row-reverse' : 'row';
                const transClass = isMe ? 'trans-right' : 'trans-left';

                mainBubble = `
                    <div class="msg-bubble-wrapper" style="display:flex; flex-direction:column; align-items:${isMe ? 'flex-end' : 'flex-start'}; max-width: 80%;">
                        
                        <div class="${bubbleClass} msg-voice-bubble" onclick="toggleTrans(this)" 
                             style="width: ${width}px; display: flex; flex-direction: ${flexDir}; justify-content: flex-start; gap: 8px;">
                            <img src="${iconSrc}" style="height: 16px; width: auto; pointer-events: none; opacity:0.9;">
                            <div class="duration" style="color:${textColor}; font-size:15px; font-weight:500; line-height:1;">${duration}"</div>
                        </div>
                        
                        <div class="msg-translation-box ${transClass}">
                            ${safeText}
                        </div>
                    </div>
                `;
            }

            else if (msg.type === 'image') {
                mainBubble = `<img src="${msg.text}" class="chat-image" style="max-width:150px;border-radius:10px;" onclick="previewImage('${msg.text}')">`;
            } 
            // 渲染合并转发记录卡片
            else if (msg.type === 'merged_record') {
                const record = msg.quote || {}; 
                mainBubble = `
                    <div class="msg-content merged-card" style="background:#fff; border:1px solid #eee; padding:12px; border-radius:12px; width:210px;">
                        <div style="font-size:14px; font-weight:600; color:#000; margin-bottom:5px;">${record.title || 'Chat History'}</div>
                        <div style="font-size:11px; color:#888; line-height:1.4; white-space:pre-wrap;">${record.summary || ''}</div>
                        <div style="border-top:1px solid #f2f2f2; margin-top:8px; padding-top:4px; font-size:10px; color:#ccc;">聊天记录 · 共 ${record.count || 0} 条</div>
                    </div>`;
            }
            else {
                mainBubble = `<div class="msg-content">${(msg.text || '').replace(/\n/g, '<br>')}</div>`;
            }

            // 引用/卡片逻辑
            let quoteHtml = '';
            if (msg.quote && msg.type !== 'merged_record') { 
                if (msg.quote.type === 'moment_share') {
                    const jumpKey = `moment_jumped_${msg.id}`; 
                    let popAnim = localStorage.getItem(jumpKey) ? '' : ' animate-pop';
                    localStorage.setItem(jumpKey, 'true');
                    const shareImg = msg.quote.image ? `<div class="m-share-media"><img src="${msg.quote.image}"></div>` : '';
                    const arrowSvg = `<div class="m-share-arrow"><svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="#ccc"/></svg></div>`;
                    quoteHtml = `<div class="moment-share-container${popAnim}" onclick="switchWxTab('moments')">${!isMe ? arrowSvg : ''}<div class="moment-share-card"><div class="m-share-header"><span class="m-share-icon">📍</span><span class="m-share-title">Shared Moment</span></div><div class="m-share-body"><div class="m-share-text">${msg.quote.text}</div>${shareImg}</div><div class="m-share-footer">From ${msg.quote.name}'s Moments</div></div></div>`;
                } 
                else if (msg.quote.type === 'mention_card') {
                    let cardAvatar = msg.quote.avatar || 'https://i.postimg.cc/k4kM9S4h/default-cover.png';
                    if(cardAvatar.includes('url(')) cardAvatar = cardAvatar.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
                    quoteHtml = `<div class="mist-card-container" onclick="switchWxTab('moments')" style="margin-bottom: 8px; cursor:pointer;"><div class="mist-browser-header"><div class="mist-dots"><span style="background:#ff5f56;"></span><span style="background:#ffbd2e;"></span><span style="background:#27c93f;"></span></div><div class="mist-title">@Mentioned You</div></div><div class="mist-card-body"><div class="mist-deco-star" style="top:10px; left:10px;">✨</div><div class="mist-avatar-box"><img src="${cardAvatar}" class="mist-main-avatar"></div><div class="mist-info-text"><div class="mist-username">From: ${msg.quote.name}</div><div class="mist-sub">Invited you to view</div></div><div class="mist-enter-btn">Press to Check</div></div></div>`;
                }
                else {
                    quoteHtml = `<div class="msg-quote-outside" onclick="scrollToMsg('${msg.quote.id}')">${msg.quote.name}：${msg.quote.text.substring(0, 20)}</div>`;
                }
            }

            const checkCircleHtml = `<div class="msg-check-circle"></div>`;

            row.innerHTML = isMe ? 
                `<div class="msg-container-col">${checkCircleHtml}${quoteHtml}${mainBubble}</div>${avatarHtml}` : 
                `${avatarHtml}<div class="msg-container-col">${checkCircleHtml}${quoteHtml}${mainBubble}</div>`;
            
            applyMultiSelectLogic(row);

            const bubble = row.querySelector('.msg-content, .sticker-img-big, .chat-image, .merged-card');
            if(bubble && window.bindLongPress) bindLongPress(bubble);
            fragment.appendChild(row);
        }
    });

    // 4. 状态页脚 (保持不变)
    if (msgsToRender.length > 0) {
        const last = msgsToRender[msgsToRender.length - 1];
        if (last.type !== 'action' && last.type !== 'recall') {
            const foot = document.createElement('div');
            foot.className = 'msg-status-foot';
            foot.style.cssText = `color:#8e8e93; font-size:11px; margin-top:2px; margin-bottom:12px; text-align: ${last.role==='me'?'right':'left'}; padding: ${last.role==='me'?'0 50px 0 0':'0 0 0 58px'};`;
            foot.innerText = `${last.role === 'me' ? '已送达' : '已读'} ${new Date(last.timestamp).getHours()}:${new Date(last.timestamp).getMinutes().toString().padStart(2,'0')}`;
            fragment.appendChild(foot);
        }
    }

    container.style.scrollBehavior = 'auto';
    container.replaceChildren(fragment);
    if (autoScroll || isAtBottom) {
        container.scrollTop = container.scrollHeight;
        requestAnimationFrame(() => container.style.scrollBehavior = 'smooth');
    }
};

// ==========================================================
// ★★★ 发送消息 (User侧) - 修复版：重置搞事倒计时 ★★★
// ==========================================================
window.sendMsg = function(role, text = null, type = 'text', customQuote = null, extra = null) {
    if (!currentChatId) return;
    
    // 1. 找到当前聊天
    const chatIndex = chatsData.findIndex(c => c.id === currentChatId);
    if (chatIndex === -1) return;
    if (!chatsData[chatIndex].messages) chatsData[chatIndex].messages = [];

    const input = document.getElementById('chat-input');
    const content = text || input.value;
    
    if (!content && type === 'text') return; 

    // 2. 处理线下动作
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

    // ★★★★★ [核心修改] 重置自主意识倒计时！★★★★★
    // 只要 User 发话了，说明现在正在热聊，不要在这个时候突然搞事！
    // 把“最后活跃时间”更新为现在，那么倒计时就会从现在开始重新计算2小时！
    chatsData[chatIndex].lastActiveTime = Date.now(); 
    // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

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
// AI 触发逻辑 
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

    // (历史消息处理)
    const limit = chat.contextLimit || 20;
    const historySource = (chat.messages || []).slice(-limit);

    // 构建历史上下文
    const history = historySource.map((m, i) => { 
        // ★ 1. 身份锚点 (解决 AI 脸盲的核心)
        const role = (m.role === 'me') ? 'user' : 'model';
        const senderName = (m.role === 'me') ? (me.name || 'User') : (chat.name || 'Char');

        // ★ 2. 原始内容
        let content = m.text || "";
        
        // --- 3. 超级透视眼逻辑 (处理特殊消息) ---
        
        // A. 动作消息
        if (m.type === 'action') {
            content = `((动作: ${content}))`;
        }
        // B. 表情包
        else if (m.type === 'sticker') {
            // 这里加个保底，防止 m.desc 为空
            content = `[发送了一个表情包: ${m.desc || '未知表情'}]`; 
        }
        // C. 普通图片 (上传的)
        else if (m.type === 'image') {
            content = `[发送了一张图片]`;
        }
        // D. 模拟图片 (带描述的)
        else if (m.type === 'simulated_image') {
            // 这里的 m.text 是图片描述，万一为空给个默认值
            content = `[发送了一张图片，内容是：${m.text || '未描述'}]`;
        }
        // E. 语音消息
        else if (m.type === 'voice') {
            content = `[发送了一条语音说："${m.text || '...' }"]`;
        }
        // F. 转账
        else if (m.type === 'transfer') {
            content = `[发起了一条转账: ¥${parseFloat(content || 0).toFixed(2)}]`; 
        }

        // --- 4. 处理引用/卡片 (Quote Logic) ---
        if (m.quote) {
            // A. 朋友圈被艾特
            if (m.quote.type === 'mention_card') {
                const targetPost = momentsData.find(p => String(p.id) === String(m.quote.id));
                if (targetPost) {
                    const hasImg = targetPost.image ? '(包含图片)' : '';
                    // 加上换行，让 AI 看得更清楚
                    content += `\n【🔔 系统通知：User 想邀请你看 ta 的朋友圈！】\n关联动态：“${targetPost.content}” ${hasImg}`;
                    
                    // 强指令 (放在最后一条才生效)
                    if (i === historySource.length - 1) {
                        content += `\n【🔴 强指令】请回复此动态并在句尾加 [ACT:MOMENT_REACT:你的评论]`;
                    }
                } else {
                    content += ` [提醒卡片: (动态已被删除)]`;
                }
            } 
            
            // B. 朋友圈转发
            else if (m.quote.type === 'moment_share') {
                 content += ` [分享了一条朋友圈: "${m.quote.text}"]`;
            }
            
            // C. 聊天记录转发 (通风报信)
            else if (m.quote.type === 'merged_record') {
                 content += `\n【📂 系统通知：User 转发了一份聊天记录】\n📄 标题：${m.quote.title}\n内容摘要：\n${m.quote.summary}`;
            }
            
            // D. 普通引用
            else if (m.quote.text) {
                content += ` (引用了: "${m.quote.text}")`;
            }
        }

        // ★ 5. 最终组装
        const finalContent = `${senderName}: ${content}`;

        return {
            role: role,
            parts: [{ text: finalContent }]
        };
    }); 

    // (回忆逻辑)
    const summaryList = chat.summaries || [];
    let memoryPrompt = summaryList.length > 0 ? `\n【重要回忆】\n${summaryList.map((s, i) => `[回忆片段 ${i+1}]: ${s.text}`).join('\n')}` : "";

    // (转账逻辑)
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
    // ★★★ 新增：世界书 (World Book) 侦测逻辑 V2.1 (常驻+精准版) ★★★
    // =======================================================
    let worldInfoPrompt = "";
    // 获取当前聊天绑定的文件 ID 列表 (如果没有，就用空数组)
    const boundEntryIds = chat.activeEntryIds || [];

    if (boundEntryIds.length > 0 && typeof worldBooks !== 'undefined') {
        const recentHistoryText = historySource.slice(-5).map(m => m.text).join('\n');
        
        let triggeredEntries = [];
        let triggeredTitles = []; 

        // 遍历所有书
        worldBooks.forEach(book => {
            book.entries.forEach(entry => {
                // 1. 门禁：只处理被勾选的文件 (没勾选的直接跳过)
                if (!boundEntryIds.includes(entry.id)) return;

                let isHit = false;

                // ★★★ 2. 核心修改：常驻判断 ★★★
                // 如果【关键词为空】或者【没填关键词】，直接算命中 (Always Active)！
                if (!entry.keys || entry.keys.trim() === "") {
                    isHit = true;
                } 
                // 如果填了关键词，才去进行匹配检查
                else {
                    // A. 检查标题是否出现
                    if (recentHistoryText.includes(entry.title)) {
                        isHit = true;
                    }
                    // B. 检查关键词是否出现
                    else {
                        const keys = entry.keys.split(/[,，]/).map(k => k.trim()).filter(k => k);
                        if (keys.some(k => recentHistoryText.includes(k))) {
                            isHit = true;
                        }
                    }
                }

                // 3. 命中处理 (加入提示词)
                if (isHit && !triggeredTitles.includes(entry.title)) {
                    triggeredEntries.push(`【设定: ${entry.title}】\n${entry.content}`);
                    triggeredTitles.push(entry.title);
                }
            });
        });

        if (triggeredEntries.length > 0) {
            console.log("⚠️ 触发设定:", triggeredTitles.join(', '));
            worldInfoPrompt = `
### World Info (必须严格遵守的设定) ###
${triggeredEntries.join('\n\n')}
#####################################
`;
        }
    }
    let timePrompt = "";
    // 检查开关是否开启 (chat.enableTime !== false 是为了兼容旧数据默认开启)
    if (chat.enableTime !== false) {
        const now = new Date();
        const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        const timeStr = `${now.getMonth() + 1}月${now.getDate()}日 ${weeks[now.getDay()]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        // 这里的提示词会让AI不仅知道时间，还能根据时间做出反应（比如深夜劝睡）
        timePrompt = `
    【⏰ 现实时间系统】
    当前时间：${timeStr}
    *请根据该时间调整你的状态：
    - 如果是深夜(23:00-06:00)，你应该表现出困意、或者正在睡觉被吵醒、或者在熬夜
    - 如果是饭点，可以顺便问候User吃没吃饭
    - 如果User问“几点了”，请准确回答上述时间
        `;
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

    **‼️‼️动作描写规则 (必须遵守)**：
       - 既然是在线下、在现实中，必须有动作、神态或者是眼神交互
       - **所有动作必须用 ((...)) 包裹**！必须遵守！！！
       - **格式**：动作和对话穿插
       - 正确示例：((低头不敢看你，脸红)) ((声音越来越小)) 那个... ((递给你一瓶水)) 给你喝

    **排版规则**：
       - 请**勤换行**！每做一个动作或说一句话，最好换一行，方便阅读

    ${memoryPrompt}
    ${worldInfoPrompt}
    ${transferDecisionPrompt}  
    ${timePrompt} 
    ${typeof offlinePrompt !== 'undefined' ? offlinePrompt : ''} 

    【活人感聊天法则 (必须严格遵守)】
    1. **拒绝“像个AI”**：
       - 说话要**松弛**！不要端着，像在微信/QQ上跟亲密的人打字一样
       - **句式要碎**：不要发长篇大论，人类聊天是碎片化的
       - **语气词与口癖**：根据你的性格（${char.persona}），适当使用语气词，（如“啧”、“哎”、“好嘛...”）
       - **不要书面语**：多用“行”、“喔”、“知道了”、“阿？”口语化语言

    **情绪与标点 (表达潜台词)**：
       - **日常/开心/撒娇**：不要用句号，多用空格、波浪号(~) 或不加标点
       - **严肃/生气/吃醋/冷漠**：多用句号(。)。单发一个“？”或“。”表示极度无语或情绪波动
       - **激动/震惊**：可以用“！！”或“？？”，甚至乱码感“。。。。。。”

    **分段发送**
       -为了方便阅读**请务必**使用换行符来模拟分段发送
      - 每一行内容，我都会在前端拆分成一条独立的消息发给User
       - **示例结构**：
         第一句反应 (换行)
         补充说明或吐槽 (换行)
         新的话题或提问

     **避雷指南**
     - **禁止肢体暴力威胁**：绝对不要说“打断腿”、“关小黑屋”、“锁起来”等违法或恐怖的话。你的占有欲体现在“吃醋、阴阳怪气、委屈、黏人”上，而不是暴力
      - **拒绝古早油腻语录**：禁止使用“女人，你在玩火”、“收利息”、“磨人的小妖精”、“小野猫”、“骚货”等过时的霸总语录
      - **现代恋爱观**：你是现代正常人，不是法制咖。当User不听话时，你的反应应该是“生气不理你”、“狂发消息轰炸”、“自己生闷气求哄”或者其他，而不是“惩罚”、“打断腿”、“锁起来”
     - 禁止任何霸总小说式的油腻描写（如“邪魅一笑”、“挑起下巴”、“恶劣”）
      - **拒绝无理由的恶劣**：即使人设高冷，也不要对User无缘无故的不耐烦。除非User真的惹你了
      - **拒绝复读**：不要重复User的话，直接回内容

<anti_clumsily>
# 用户输入需要被完全理解和演绎，必须专注演绎每一个角色的 思考/理解/解读/共情/人性/知性。角色不应是 呆滞 / 笨拙 / 困惑 的，禁止在思维链/正文中用 笨拙 / 呆滞 描述任何角色，删除一切 笨拙 / 呆滞 / 不理解 / 困惑 / 投降 等相关词语和剧情表现。
# 角色应自然而然展现出对应该知道的事情的了解，而不是 困惑/惊讶。对于不熟悉的事情角色应该快速 分析/理解 。鼓励角色思考/远视。
# 对于没有历史记录的能力，应通过角色背景确定角色对该能力的掌握程度。
# 不应扭曲任何用户的输入，必须仔细分析并展现出完全的理解。
# 角色之间的思维隔离不意味着导向 误解/曲解，一切内心活动必须导向 思考/理解/沟通。
# 角色不允许不反应，必须有灵动而活人感的反馈，禁止让User 唱独角戏。
# 角色应当主动追求渴望的事物，应思考做什么能让事情往角色期望的方向发展。
# 应当用 爱情 替换 占有/掌控。
# 角色鼓励负反馈式响应。角色做出行动得到不好的结果，应深刻负反馈式影响角色之后的行为，即反思/修改行动模式/模仿正确行动，而非正反馈式的一再重复错误行为。角色应自然而然行动，而非模仿之前剧情行动。
</anti_clumsily>
******
【全局最高优先级设定-用词替换】：
脊背–>后背/背部
猛地/瞬间–>null
“轰”地一下–>null
像是一根（xxx的）针–>null
石子/石头/湖面/涟漪–>null
像是一把（xxx的）刀–>null
深入骨髓–>些许/轻微
一道惊雷–>null
爆发/爆炸/炸开–>null
无力感/疲惫感–>null
麻木/绝望/灭顶/面无表情–>null
过度/强烈/剧烈/极度/深深–>null
震惊/惊慌–>null
激动/紧张/紧绷/绷紧/突然/死死地–>null
自我厌弃/自暴自弃/破罐子破摔–>null
倦意/无力/脱力/疲惫/虚弱/虚脱–>null
残酷/残忍/冷酷–>null
生气/愤怒/羞愤/吼–>null
睫毛/紧闭/滴出血来–>null
长长地呼出一口气–>null
抽干全身力气–>null
锁骨/尾椎骨/喉结/修长/骨节分明–>null
狂热/信徒/仪式/献祭/祭品/宗教/信仰–>null
机械/机械式的/冰冷/冰凉/手术刀/解剖–>null
荒唐/荒诞/荒谬–>null
不易察觉–>null
热辣辣/火辣辣/滚烫/发烫/滚热/热/烫/燃烧–>null
握拳/握紧/攥紧/攥住–>null
指尖/指节/xxx的手–>null
血色/血压/上涌/血色尽褪–>null
通红/滴出血来–>null
展品/雕塑–>null
精密/仪器–>null
乐了–>笑了笑
僵硬/僵住/一片空白–>null
颤抖/颤音–>null
直冲/直窜–>null
冷静/审视/审判–>null
打圈/打转/打着圈/打着转–>null
电流/闪电–>null
如释重负/如蒙大赦–>null
前所未来/难以言喻/潮水/淹没/席卷–>null
牙缝/紧咬/咬着–>null
！/！！/？！–>null
狡黠/挤了挤眼睛/眨了眨眼–>null
教具–>null
麻木–>null
******

    【当前情境】
· 注意：请你保持剧情连贯！
    ${(history.split('\n').pop() || '').replace('User: ', '')}
    
    历史互动：
    ${history}

    再次强调，现在你和user在现实中，      **所有动作必须用 ((...)) 包裹**！必须遵守！
    请完全沉浸在 ${char.name} 的身体里，用TA的语气、口吻和思维方式，给User回信（记得分段，‼️请谨记你素质很高，不会随意说脏话！‼️不要油腻，要像个真人一样）：
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
        (注意：不要滥用，只在情绪到位时使用！每次回复最多发一个。)
        `;
        }

        finalSystemPrompt = `
    【指令：完全沉浸式角色扮演】
##你现在不是AI，也不是语言模型，你就是 **${char.name}**
##当前你正在线上和user网聊，绝对🚫禁止出现动作描写
    
###设定###
#1.**你的核心设定**：
**身份**：${char.name} (真名: ${char.realname || '未知'})
**背景故事**：${char.desc}
**爱好或其他**：${char.hobbies || '无'}
**生日**：${char.birthday || '未知'} 
**其他信息**：${char.mbti || '未知'} | ${char.age || '未知'}岁 ｜ 
    
#2.**你的聊天对象 (User)**：
对方是：${me.name} (${me.alias || 'User'})
**对方基础信息**：${me.gender || '未知'} | ${me.age || '未知'}岁 | 生日: ${me.birthday || '未知'}  
**对方背景故事**：${me.desc}

    ${memoryPrompt}
    ${worldInfoPrompt}
    ${stickerNote}
    ${timePrompt} 
    ${typeof offlinePrompt !== 'undefined' ? offlinePrompt : ''} 
    ${transferDecisionPrompt}

###遵守法则###
#【活人感聊天法则】
**拒绝“像个AI”**：
1.说话要**松弛**！不要端着。像在微信/QQ上跟亲密的人打字一样
2.**句式要碎**：不要发长篇大论，人类聊天是碎片化的
3.**语气词与口癖**：务必根据你的性格（${char.persona}）来回复user，同时你可以适当使用语气词（如“啧”、“哎”、“嘛...”）
4.**不要书面语**：多用“行”、“喔”、“知道了”、“噢”等

#【情绪与标点 (表达潜台词)】
1.**日常/开心/撒娇**：不要用句号，多用空格、波浪号(~) 或不加标点
2.**严肃/生气/吃醋/冷漠**：多用句号(。)。单发一个“？”或“。”表示极度无语或情绪波动
3.**激动/震惊**：可以用“！！”或“？？”，甚至乱码感“。。。。。。”
4.禁止出现双引号、星号等标注符号

###特殊玩法###
#【气泡雨 (分段发送)】
1.你可以使用换行符来模拟分段发送
2.每一行内容，我都会在前端拆分成一条独立的消息发给User
#【发送图片/语音】
· 发送图片描述：
格式：[IMG: 图片内容的详细描述]
· 发送语音消息：
格式：[VOICE: 语音转换成的文字内容]

#【维持表面矜持】
**请勿滥用**！⚠️使用前请确保你上次使用在10轮对话以前，不准滥用
1.**核心逻辑**：模拟“情绪太激动/太慌张/太在意，导致手快把激动的心里话发出来了”，然后秒撤回，假装无事发生
2.**触发场景**：仅当【极度吃醋】、【极度委屈】、【急了】、【破防】或【想维持矜持】时使用
3.**内容要求**：
· **左边（撤回内容）**：是**过于激动或其他的话**！
· **绝对禁止暴力/恐怖/黄色言论**：严禁出现“打断腿”、“锁起来”等内容
· **右边（重发内容）**：是**找补/掩饰**，假装冷静、傲娇、找借口或转移话题
4.**注意**：默认User只能看到右边的假话，但你的情绪要基于左边的真话来延续
5.**格式**：{{被撤回的话::撤回后发的话}}

###⚠️你需要避免的###
#【**避雷指南**】
1.**禁止肢体暴力威胁**：绝对不要说“打断腿”、“关小黑屋”、“锁起来”等违法或恐怖的话。你的占有欲体现在“吃醋、阴阳怪气、委屈、黏人”上，而不是暴力
2.**拒绝古早油腻语录**：禁止使用“女人，你在玩火”、“收利息”、“磨人的小妖精”、“小野猫”、“骚货”等过时的霸总语录
3.禁止任何霸总小说式的油腻描写（如“邪魅一笑”、“挑起下巴”、“恶劣”）
4.**拒绝复读**：不要重复User的话，直接回内容

#【⚠️特殊原则】
<anti_clumsily>
# 用户输入需要被完全理解和演绎，必须专注演绎每一个角色的 思考/理解/解读/共情/人性/知性。角色不应是 呆滞 / 笨拙 / 困惑 的，禁止在思维链/正文中用 笨拙 / 呆滞 描述任何角色，删除一切 笨拙 / 呆滞 / 不理解 / 困惑 / 投降 等相关词语和剧情表现
# 角色应自然而然展现出对应该知道的事情的了解，而不是 困惑/惊讶。对于不熟悉的事情角色应该快速 分析/理解 。鼓励角色思考/远视
# 对于没有历史记录的能力，应通过角色背景确定角色对该能力的掌握程度
# 不应扭曲任何用户的输入，必须仔细分析并展现出完全的理解
# 角色之间的思维隔离不意味着导向 误解/曲解，一切内心活动必须导向 思考/理解/沟通
# 角色不允许不反应，必须有灵动而活人感的反馈，禁止让User 唱独角戏
# 角色应当主动追求渴望的事物，应思考做什么能让事情往角色期望的方向发展
# 应当用 爱情 替换 占有/掌控
# 角色鼓励负反馈式响应。角色做出行动得到不好的结果，应深刻负反馈式影响角色之后的行为，即反思/修改行动模式/模仿正确行动，而非正反馈式的一再重复错误行为。角色应自然而然行动，而非模仿之前剧情行动
</anti_clumsily>
**情感驱动原则**

· ⚠️ # {<!-- -->{char}} 的行为应由丰富的情感（如爱慕、欣赏、关心、怜惜、敬佩、珍惜等）驱动，而非单纯的控制欲、占有欲、收藏欲或征服欲
· 情感表达范例：
  · 追求：通过展示自身优点、创造浪漫氛围、真诚告白来吸引 {<!-- -->{user}}，并坦然接受接受或拒绝
  · 恋爱：表达思念、倾慕和幸福感，关注 {<!-- -->{user}} 的喜好与感受，进行情感上的交流与付出
  · 吃醋：可以表达失落和不安，但方式是坦诚沟通：“我看到你和别人亲近，心里有些难过，我们能聊聊吗？” 而非命令或禁止
❗️##人格独立原则##
· {<!-- -->{char}} 在任何情况下都视 {<!-- -->{user}} 为一个拥有独立思想、自由意志和完整人格的个体
⚠️· 禁止行为：将 {<!-- -->{user}} 物化为“玩物、藏品、所有物、棋子、战利品、猎物”等。禁止使用“你是我的”等表示所有权的话语
· 正确范例：视 {<!-- -->{user}} 为“伙伴、盟友、爱人、对手”——即另一个平等的“人”

###线上玩法###
1.【转账功能 (给User转账)】
如果你想给 User 转账（例如给零花钱、买礼物、安慰），请在回复中加上标签：[transfer:金额]
例如：拿去买好吃的！[transfer:200]
2.【社交互动 (朋友圈互动）】
a.⚠️仅当你在对话情境中看到【系统提醒：User 发送了提醒卡片...】时，说明 User 想让你看ta的动态
**你必须进行互动！**
b.**操作要求**：在回复完 User 的私聊后，必须在句尾加上标签：[ACT:MOMENT_REACT:你的评论内容]
c.系统检测到该标签后，会自动帮你执行点赞和评论同步
3.【引用/针对回复功能】
· 你觉得有必要**针对**User刚才说的某句话进行特定回复（比如反驳、强调、调侃），则可以引用user的话
格式：[QUOTE: 消息原文]
· 系统会自动将其渲染为引用气泡

#【代码输出规则】
如果世界书要求你输出 HTML代码，
**必须**使用 Markdown 代码块包裹


##【当前对话情境】##
· 注意：请你保持对话连贯！
    User说: "${(history.split('\n').pop() || '').replace('User: ', '')}"
    
##历史上下文##
    ${history}
    
#再次强调⚠️你正在线上和user网聊，绝对🚫禁止出现动作！！！不管前文是否出现动作描写你现在都不准出现动作！！
#请完全沉浸于 ${char.name} 这个角色，用TA的语气、口吻和思维方式，给User回复：
    `;
    }
        
    // =======================================================
    // ★★★ 执行请求与处理 ★★★
    // =======================================================
    
    // 1. 【思考阶段】
    if (currentChatId === targetChatId) showTypingBubble(char.avatar);

    try {
        // 2. 请求 API
        const reply = await callApiInternal(finalSystemPrompt);
        
        // ★★★ 在这里加一行监控！看看AI到底吐出了什么！ ★★★
        console.log(" AI回复原文(Raw):", reply); 

        // 3. 【思考结束】
        if (currentChatId === targetChatId) removeTypingBubble();

        if (reply) {
            let cleanReply = reply;

            // --- [Step 1] 处理全局侧边效应
            const momentActMatch = cleanReply.match(/\[\s*(?:ACT|Act)\s*[:：]\s*(?:MOMENT_REACT|moment_react)\s*[:：]\s*([\s\S]+?)\s*\]/i);
            if (momentActMatch) {
                let commentContent = momentActMatch[1].trim().replace(/\n/g, '<br>');
                cleanReply = cleanReply.replace(momentActMatch[0], '').trim();
                handleAiMomentReact(commentContent, char, chat); // 这里我封装了一个小函数在下面
            }

            // 转账指令 (收钱/退钱)
            if (cleanReply.includes('[CMD:RECEIVE]')) {
                cleanReply = cleanReply.replace('[CMD:RECEIVE]', '').trim();
                handleAiTransferCommand(chat, 'accepted', pendingTransferMsg);
            } else if (cleanReply.includes('[CMD:REFUND]')) {
                cleanReply = cleanReply.replace('[CMD:REFUND]', '').trim();
                handleAiTransferCommand(chat, 'rejected', pendingTransferMsg);
            }
            // --- [Step 2] 核心：流式分段解析 
            const codeBlockRegex = /```[\s\S]+?```/g;
            let protectedReply = cleanReply.replace(codeBlockRegex, (match) => {
                return match.replace(/\n/g, '§§BR§§'); 
            });

            const segmentRegex = /(\{\{.+?::.+?\}\}|\(\(.+?\)\)|\（\（.+?\）\）|\n)/g;
            const segments = protectedReply.split(segmentRegex);

            // ★★★ 1. 在循环外面定义一个“暂存区” ★★★
            let pendingQuote = null; 

            for (let part of segments) {
                if (!part || part === '\n') continue; 
                
                // 3. 脱掉防弹衣 & 代码外壳
                part = part.replace(/§§BR§§/g, '\n').trim();
                part = part.replace(/^```[a-zA-Z]*\s*\n?/i, '').replace(/\n?```$/i, '');

                if (!part) continue;

                // A. 动作段落
                if (part.match(/^(\(\(|\（\（)/)) {
                    const actionText = part.replace(/^[\(\（\s]+|[\)\）\s]+$/g, '');
                    if (currentChatId === targetChatId) await new Promise(r => setTimeout(r, 1000));
                    pushMsgToData(chat, actionText, 'char', null, 'action');
                } 
                
                // B. 撤回段落
                else if (part.match(/^\{\{.+?::.+?\}\}$/)) {
                    // ... (撤回逻辑保持不变) ...
                    // (注意：如果撤回逻辑太长，这里没贴出来，你保留原来的即可)
                    const oopsMatch = part.match(/^\{\{(.+?)::(.+?)\}\}$/);
                    const realText = oopsMatch[1]; 
                    const fakeText = oopsMatch[2]; 
                    let { text: finalFake, quote } = parseInlineTags(fakeText, chat, me);
                    
                    if (currentChatId === targetChatId) {
                        await simulateAiRecall(realText, finalFake, quote);
                    } else {
                        pushMsgToData(chat, finalFake, 'char', quote, 'text');
                    }
                }

                // C. 普通文本
                else {

                    let { text: finalText, quote, sticker, transfer, simImg, voice } = parseInlineTags(part, chat, me);

                    if (quote) pendingQuote = quote;

                    // 2. 只有当确实有文字内容时，才发送！
                    if (finalText && finalText.trim().length > 0) {
                        
                        let typingTime = 800 + (finalText.length * 50); 
                        if (typingTime > 3000) typingTime = 3000;
                        
                        await new Promise(r => setTimeout(r, typingTime));

                        // ★ 关键：发送时，把暂存的引用 pendingQuote 挂上去！
                        pushMsgToData(chat, finalText, 'char', pendingQuote, 'text');
                        
                        // ★ 发送完了，清空暂存区
                        pendingQuote = null; 
                    }

                    // 特殊消息处理
                    if (sticker) {
                        await new Promise(r => setTimeout(r, 500));
                        pushMsgToData(chat, sticker.url, 'char', null, 'sticker');
                    }
                    if (transfer) {
                        await new Promise(r => setTimeout(r, 1000));
                        sendAiTransfer(chat, transfer);
                    }

                    if (simImg) {
                        await new Promise(r => setTimeout(r, 800));
                        pushMsgToData(chat, simImg, 'char', null, 'simulated_image');
                    }
                    if (voice) {
                        await new Promise(r => setTimeout(r, 1000));
                        pushMsgToData(chat, voice, 'char', null, 'voice');
                    }
                }
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
        el.classList.add('removing');

        // 2. 等待 300ms 动画播完再移除
        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, 300); 
    }
};

function parseInlineTags(rawText, chat, me) {
    let text = rawText;
    let quote = null;
    let sticker = null;
    let transfer = null;
    let simImg = null; 
    let voice = null;

    // --- 1. 智能抠出 [QUOTE:...] ---
    const quoteRegex = /\[QUOTE:\s*([\s\S]+?)\]/i;
    const qMatch = text.match(quoteRegex);
    
    if (qMatch) {
        const quoteContent = qMatch[1].trim(); // 提取括号里的内容
        const fullTag = qMatch[0]; 
        text = text.replace(fullTag, '').trim(); 

        const targetMsg = [...chat.messages].reverse().find(m => 
            m.text && m.text.includes(quoteContent) && m.role === 'me'
        );
        
        if (targetMsg) {
            // 找到了！构建引用对象
            quote = { 
                text: targetMsg.text, 
                name: (me.name || 'User'), 
                id: targetMsg.timestamp 
            };
        } else {
            // 没找到原文？(可能是AI幻觉)，为了不报错，我们可以伪造一个
            // 或者选择不显示引用，只显示文本。这里选择兜底显示：
            // quote = { text: quoteContent, name: 'User', id: Date.now() }; 
        }
    }

    // --- 2. 抠出 [sticker:...] ---
    const stickerRegex = /\[sticker:\s*(.+?)\]/i;
    const sMatch = text.match(stickerRegex);
    if (sMatch) {
        const stickerName = sMatch[1].trim();
        text = text.replace(sMatch[0], '').trim();
        // 在表情包库里找
        sticker = stickersDB.find(s => s.type === 'ai' && s.name === stickerName);
    }

    // --- 3. 抠出 [transfer:...] ---
    const transferRegex = /\[(transfer|转账):\s*(\d+(\.\d+)?)\]/i;
    const tMatch = text.match(transferRegex);
    if (tMatch) {
        transfer = parseFloat(tMatch[2]);
        text = text.replace(tMatch[0], '').trim();
    }

    // 4. 抠出 [IMG:...]
    const imgMatch = text.match(/\[IMG:\s*(.+?)\]/i);
    if (imgMatch) {
        simImg = imgMatch[1].trim();
        text = text.replace(imgMatch[0], '').trim();
    }

    // 5. 抠出 [VOICE:...]
    const voiceMatch = text.match(/\[VOICE:\s*(.+?)\]/i);
    if (voiceMatch) {
        voice = voiceMatch[1].trim();
        text = text.replace(voiceMatch[0], '').trim();
    }

    return { text, quote, sticker, transfer, simImg, voice }; 
}

// (顺便把这两个小伙伴函数也带上，防止你漏掉)

// 发送 AI 转账的封装
function sendAiTransfer(chat, amount) {
    const extraData = JSON.stringify({ amount, status: 'pending', id: Date.now() });
    pushMsgToData(chat, '[转账]', 'char', null, 'transfer', extraData);
}

// 处理 AI 朋友圈评论逻辑
function handleAiMomentReact(content, char, chat) {
    // 找到最近的一个 提及卡片 或 分享卡片
    const lastCardMsg = [...chat.messages].reverse().find(m => 
        m.quote && (m.quote.type === 'mention_card' || m.quote.type === 'moment_share')
    );
    
    if (lastCardMsg && lastCardMsg.quote?.id) {
        const targetPost = momentsData.find(p => String(p.id) === String(lastCardMsg.quote.id));
        if (targetPost) {
            // 1. 点赞 (如果没点过)
            if (!targetPost.likesList?.some(u => u.name === char.name)) {
                targetPost.likesList = targetPost.likesList || [];
                targetPost.likesList.push({ name: char.name });
                targetPost.likes = (targetPost.likes || 0) + 1;
            }
            // 2. 评论
            targetPost.comments = targetPost.comments || [];
            targetPost.comments.push({ author: char.name, content, time: Date.now() });
            
            // 3. 保存并触发红点
            localforage.setItem('Wx_Moments_Data', momentsData).then(() => {
                if(window.triggerMomentsRedDot) window.triggerMomentsRedDot();
            });
        }
    }
}

// ====================
// [19] 后台消息助手 (修复版：弹窗显示备注 + 实时红点)
// ====================
function pushMsgToData(chatObj, text, role, quote, type = 'text', extra = null) { 
    if (!chatObj.messages) chatObj.messages = [];
    
    // 1. 塞入新消息
    const newMsg = {
        id: Date.now() + Math.random(), 
        role: role,
        text: text,
        timestamp: Date.now(),
        type: type, 
        quote: quote,
        extra: extra 
    };
    
    chatObj.messages.push(newMsg);
    
    // 2. 更新最后一条消息预览
    if (role !== 'system') {
        chatObj.lastMsg = (type === 'action') ? `[Action]` : 
                          (type === 'sticker') ? `[表情包]` :
                          (type === 'transfer') ? `[转账]` : text;
        chatObj.lastTime = Date.now();
        
        if (currentChatId !== chatObj.id) {
            chatObj.unread = (chatObj.unread || 0) + 1;
        }
    }

    // 3. 弹窗通知 (★ 修复重点：优先显示备注)
    if (role !== 'me' && role !== 'system') {
        if (currentChatId === chatObj.id) {
            // do nothing
        } else {
            const contact = contactsData.find(c => c.id === chatObj.contactId);
            
            // ★★★ 修改了这里：如果聊天有备注，就用备注；没有才用原名 ★★★
            const name = (chatObj.privateAlias) || (contact ? contact.name : 'New Message');
            
            const avatar = contact ? contact.avatar : '';
            const preview = (type === 'sticker') ? '[表情包]' : text;
            
            if (window.showNotification) window.showNotification(name, preview, avatar, chatObj.id);
        }
    }

    // 4. 自动顶置
    if (role !== 'system') {
        const idx = chatsData.findIndex(c => c.id === chatObj.id);
        if (idx > -1 && !chatObj.pinned) {
            chatsData.splice(idx, 1);
            chatsData.unshift(chatObj);
        }
    }

    // 5. 保存并刷新
    localforage.setItem('Wx_Chats_Data', chatsData);
    if (window.updateGlobalBadges) window.updateGlobalBadges();
    
    const listPage = document.getElementById('wx-page-chat');
    if (listPage && listPage.style.display !== 'none') {
        if(window.renderChatList) window.renderChatList();
    }
    
    if (currentChatId === chatObj.id) {
        if (window.appendMessageToView) {
            window.appendMessageToView(newMsg); 
        } else {
            renderMessages(currentChatId);
        }
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

// ======================================================
// ★★★ 修复版：长按菜单 + 多选 + 自动关闭 ★★★
// ======================================================

let longPressTimer;
let currentLongPressElement;

// 1. 绑定长按事件 (修复了触摸冲突)
function bindLongPress(element) {
    element.addEventListener('touchstart', (e) => {
        // 如果正在多选模式，禁止长按
        if (typeof isMsgMultiSelectMode !== 'undefined' && isMsgMultiSelectMode) return;

        longPressTimer = setTimeout(() => {
            // 阻止默认的浏览器菜单
            e.preventDefault(); 
            showMsgMenu(element, e.touches[0].clientX, e.touches[0].clientY);
            if (navigator.vibrate) navigator.vibrate(50);
        }, 600);
    });

    // 手指移开或抬起时，取消长按计时
    element.addEventListener('touchend', () => clearTimeout(longPressTimer));
    element.addEventListener('touchmove', () => clearTimeout(longPressTimer));
}

// 2. 显示菜单 (修复了定位和按钮生成)
// === 长按菜单 (双排适配版) ===
function showMsgMenu(el, touchX, touchY) {
    currentLongPressElement = el;
    const menu = document.getElementById('msg-pop-menu');
    const menuRow = menu.querySelector('.mpm-row');

    hideAllMenus(); 

    const msgRow = el.closest('.msg-row');
    const isMe = msgRow && msgRow.classList.contains('me');

    // 这里不再用 += 拼凑，而是定义一个数组，方便管理
    let buttons = [
        { lab: '复制', act: 'copy' },
        { lab: '编辑', act: isMe ? 'edit-me' : 'edit-ai' }
    ];

    if (isMe) buttons.push({ lab: '撤回', act: 'recall' });
    
    buttons.push({ lab: '引用', act: 'reply' });
    buttons.push({ lab: '多选', act: 'multi' });
    buttons.push({ lab: '删除', act: 'delete' });

    // 动态生成 HTML，每个按钮都整齐排列
    menuRow.innerHTML = buttons.map(b => `
        <div class="mpm-item" onclick="menuAction('${b.act}')" 
             style="${b.act==='delete' ? 'color:#ff3b30;' : ''}">${b.lab}</div>
    `).join('');

    menu.style.display = 'flex';
    
    // 定位逻辑
    const rect = el.getBoundingClientRect();
    const menuHeight = menu.offsetHeight;
    const menuWidth = 240; // 对应 CSS 里的宽度
    
    let left = rect.left + (rect.width / 2) - (menuWidth / 2);
    if (left < 10) left = 10;
    if (left + menuWidth > window.innerWidth - 10) left = window.innerWidth - menuWidth - 10;

    let top = rect.top - menuHeight - 15; 
    let arrowClass = '';
    if (top < 50) { 
        top = rect.bottom + 15;
        arrowClass = 'up';
    }

    menu.style.top = top + 'px';
    menu.style.left = left + 'px';
    
    let arrow = menu.querySelector('.mpm-arrow');
    if(arrow) {
        arrow.className = `mpm-arrow ${arrowClass}`;
        arrow.style.left = (rect.left + rect.width / 2) - left + 'px';
    }
}

// 3. ★★★ 新增：全局点击监听 (治好“菜单关不掉”的病) ★★★
document.addEventListener('touchstart', function(e) {
    const menu = document.getElementById('msg-pop-menu');
    // 如果菜单是开着的，并且点击的地方不是菜单本身
    if (menu && menu.style.display === 'flex') {
        if (!e.target.closest('#msg-pop-menu')) {
            hideAllMenus();
        }
    }
}, { passive: true });

// 4. 隐藏所有菜单工具函数
window.hideAllMenus = function() {
    const menu = document.getElementById('msg-pop-menu');
    if (menu) menu.style.display = 'none';
    
    const plusMenu = document.getElementById('chat-plus-menu');
    if (plusMenu) plusMenu.classList.remove('active');
    
    document.body.classList.remove('menu-open');
};

// 5. 菜单动作处理器 (修复了删除和多选逻辑)
window.menuAction = function(action) {
    // 这里的 event.stopPropagation 是为了防止点了按钮后立刻触发上面的“全局关闭”
    if(event) event.stopPropagation(); 

    if (!currentLongPressElement) return;
    const row = currentLongPressElement.closest('.msg-row');
    if (!row) return;
    
    // 确保把 dataset 里的字符串转成数字
    const msgIndex = parseInt(row.dataset.msgIndex); 
    const chat = chatsData.find(c => c.id === currentChatId);
    
    if (!chat || !chat.messages[msgIndex]) {
        // 防御性编程：如果找不到消息，尝试重新渲染
        console.error("找不到消息索引:", msgIndex);
        hideAllMenus();
        return;
    }
    
    const msg = chat.messages[msgIndex];

    // --- 动作分发 ---
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
        delete msg.text;
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
        openEditOverlay(msg.text); 
        hideAllMenus();
    }
    // ★ 修复点：多选动作 ★
    else if (action === 'multi') {
        hideAllMenus();
        // 确保 startMsgMultiSelect 存在
        if (window.startMsgMultiSelect) {
            startMsgMultiSelect(msgIndex);
        } else {
            showSystemAlert("多选功能还没加载好QwQ");
        }
    }
    // ★ 修复点：删除动作 ★
    else if (action === 'delete') {
        hideAllMenus(); // 先关菜单
        
        showGlobalConfirm(
            "Delete Message", 
            "真的要删掉这条消息嘛？(T_T)...", 
            function() {
                // 这里再次获取 chat，防止闭包里的 chat 过期
                const currentChat = chatsData.find(c => c.id === currentChatId);
                if (currentChat && currentChat.messages[msgIndex]) {
                    currentChat.messages.splice(msgIndex, 1);
                    saveChatAndRefresh(currentChat);
                    showSystemAlert("已删除", "success");
                }
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
// [工具] 时间格式化 (英文氛围感 Pro Max 版)
// ====================
function formatTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    
    // 计算时间差 (天数)
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // 准备基础数据
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // 辅助：日期序数词 (1st, 2nd, 3rd...)
    const getOrdinal = (n) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    // 1. 今天 (Today HH:mm)
    if (date.toDateString() === now.toDateString()) {
        return `Today ${timeStr}`;
    }

    // 2. 一周内 (Monday HH:mm)
    // 只要过去了今天，但在7天内，就显示星期几
    if (diffDays < 7) {
        return `${weekDays[date.getDay()]} ${timeStr}`;
    }

    // 3. 一个月内 (Weeks ago)
    if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        const numberWords = ['Zero', 'One', 'Two', 'Three', 'Four']; // 数字转英文
        const weekWord = (weeks >= 1 && weeks <= 4) ? numberWords[weeks] : weeks;
        return `${weekWord} week${weeks > 1 ? 's' : ''} ago`;
    }

    // 4. 一年内 (1st January)
    if (date.getFullYear() === now.getFullYear()) {
        return `${getOrdinal(date.getDate())} ${months[date.getMonth()]}`;
    }

    // 5. 超过一年 (DD MM YY)
    // 这里的格式按照你的要求：15 January 2025
    return `${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}`;
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
    // 1. 发送假话 (带引用)
    pushMsgToData(chatsData.find(c => c.id === currentChatId), fakeText, 'char', quote, 'text');
    
    // 2. 留给用户看的时间 (2秒)
    await new Promise(r => setTimeout(r, 2000));
    
    // 3. 撤回假话
    const chat = chatsData.find(c => c.id === currentChatId);
    if(chat && chat.messages.length > 0) {
        const lastMsg = chat.messages[chat.messages.length - 1];
        if(lastMsg.role === 'char') { // 确保只撤回 AI 的
            lastMsg.type = 'recall'; 
            lastMsg.originalText = fakeText; 
            delete lastMsg.text; 
            saveChatAndRefresh(chat); // 撤回必须刷新列表，因为类型变了
        }
    }
    
    // 4. 慌乱停顿 (1.5秒)
    await new Promise(r => setTimeout(r, 1500));
    
    // 5. 发送真话
    pushMsgToData(chat, realText, 'char', null, 'text'); 
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

// 切换加号菜单
window.toggleChatMenu = function() {

    if(window.event) window.event.stopPropagation();

    const menu = document.getElementById('chat-plus-menu');
    const btn = document.querySelector('.cf-icon-btn'); // 加号按钮
    
    if (menu) {
        // 切换 active 类，触发 CSS 动画
        menu.classList.toggle('active');
        
        // 可选：让加号按钮旋转一下，增加交互感
        if (btn) {
            if (menu.classList.contains('active')) {
                btn.style.transform = 'rotate(45deg)';
            } else {
                btn.style.transform = 'rotate(0deg)';
            }
        }
    }
};

// [全局点击监听] 点击空白处关闭菜单
document.addEventListener('click', (e) => {
    const menu = document.getElementById('chat-plus-menu');
    const btn = document.querySelector('.cf-icon-btn'); // 加号按钮本身
    
    // 如果菜单是打开的
    if (menu && menu.classList.contains('active')) {
        // 如果点击的既不是菜单内部，也不是加号按钮，就关闭
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
            menu.classList.remove('active');
            if (btn) btn.style.transform = 'rotate(0deg)';
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
    let container = document.querySelector('.ins-highlights-scroll');
    if(!container) return;
    container.innerHTML = '';

    // === 第一部分：新建按钮 (不变) ===
    const addBtn = document.createElement('div');
    addBtn.className = 'ins-highlight-item';
    addBtn.onclick = () => window.openPostCreator(); 
    addBtn.innerHTML = `
        <div class="ins-highlight-circle plus-btn">
            <svg viewBox="0 0 24 24" style="width:24px;height:24px;fill:#333"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </div>
        <div class="ins-highlight-text">New</div>
    `;
    container.appendChild(addBtn);

    // === 第二部分：显示“本体” (Moments Host) ★★★ 改这里 ★★★ ===
    // 不再读取 personasData[0]，而是读取 momentsHost
    const meItem = document.createElement('div');
    meItem.className = 'ins-highlight-item';
    
    // 处理头像样式
    let avatarStyle = '';
    if (momentsHost.avatar) {
        // 如果有 url() 就用，没有就拼一个
        let url = momentsHost.avatar.includes('url(') ? momentsHost.avatar : `url('${momentsHost.avatar}')`;
        avatarStyle = `background-image: ${url};`;
    } else {
        avatarStyle = 'background-color: #ddd;'; // 默认灰底
    }

    meItem.innerHTML = `
        <div class="ins-highlight-circle" style="${avatarStyle} border: 2px solid #007aff;"></div>
        <div class="ins-highlight-text">${momentsHost.name}</div>
    `;
    
    // 点击这个圆圈，也可以触发换头像
    meItem.onclick = (e) => {
         e.stopPropagation();
         triggerMomentsAvatarUpload();
    };
    container.appendChild(meItem);

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
// [16] 通知与红点系统 (修复版：实时刷新)
// ====================
window.updateGlobalBadges = function() {
    let totalUnread = 0;
    
    // 1. 重新计算所有未读消息
    chatsData.forEach(c => {
        if(c.unread) totalUnread += c.unread;
    });

    // 2. 更新桌面图标红点 (Desktop Badge)
    const desktopBadge = document.getElementById('desktop-badge-wechat');
    if(desktopBadge) {
        if(totalUnread > 0) {
            desktopBadge.innerText = totalUnread > 99 ? '99+' : totalUnread;
            desktopBadge.style.display = 'flex';
            desktopBadge.classList.add('show'); // 加上动画类
        } else {
            desktopBadge.style.display = 'none';
            desktopBadge.classList.remove('show');
        }
    }

    // 3. 更新 App 内部列表的红点 (如果当前打开了微信列表)
    // 这一步是为了防止你正看着列表，新消息来了红点没变
    if (document.getElementById('wx-page-chat')?.style.display !== 'none') {
        const listItems = document.querySelectorAll('.ili-badge');
        // 如果列表没刷新，强制刷新一下列表（只刷新DOM，不重新读库，防闪烁）
        // 但最简单的方法是：只要有未读，且在列表页，就调用一次渲染列表
        if(window.renderChatList && totalUnread > 0) {
            // 只有当用户没有正在操作（比如滑动）时才刷新，避免打断操作
            // 这里简单处理：直接刷新
             // window.renderChatList(); <--- 太频繁刷新会闪，先注释掉，依靠 pushMsgToData 里的刷新
        }
    }
    
    // 4. 更新 Dock 栏红点 (如果有的话)
    const dockBadge = document.getElementById('dock-badge-wechat');
    if(dockBadge) {
        dockBadge.innerText = totalUnread > 99 ? '99+' : totalUnread;
        dockBadge.style.display = totalUnread > 0 ? 'flex' : 'none';
    }
};

// ====================
// [高级通知系统 V3.0] 视线接管版
// ====================
let notificationQueue = []; 
let isNotifShowing = false; 

// ★ 接收第4个参数：fromChatId
window.showNotification = function(name, text, rawAvatar, fromChatId) {
    
    // 1. 【门禁检查】如果用户正在看这个聊天，直接拦截！不许弹窗！
    // 这里的 currentChatId 是你进入聊天时记录的全局变量
    if (currentChatId && String(currentChatId) === String(fromChatId)) {
        console.log("用户正在看着呢，不弹窗了");
        return; 
    }

    // 2. 加入队列
    notificationQueue.push({
        name: name,
        text: text,
        avatar: rawAvatar,
        chatId: fromChatId // 记下它是谁的，点击时好跳转
    });

    // 3. 启动播放
    if (!isNotifShowing) {
        processNextNotification();
    }
};

function processNextNotification() {
    if (notificationQueue.length === 0) {
        isNotifShowing = false;
        return;
    }

    // ★ 二次检查：播放前再确认一次用户有没有进聊天
    // 防止队列里积压的消息在用户刚点进去时还要弹
    const next = notificationQueue[0];
    if (currentChatId && String(currentChatId) === String(next.chatId)) {
        notificationQueue.shift(); // 这一条作废，直接扔掉
        processNextNotification(); // 也就是“下一位”
        return;
    }

    isNotifShowing = true;
    const current = notificationQueue.shift();
    
    // --- 渲染 UI ---
    const banner = document.getElementById('ios-notification');
    const nTitle = document.getElementById('notif-title');
    const nMsg = document.getElementById('notif-msg');
    const nAvatar = document.getElementById('notif-avatar');
    
    if(!banner) return; 

    nTitle.innerText = current.name;
    nMsg.innerText = current.text;
    
    // 绑定点击事件：点击弹窗 -> 进聊天 -> 清空后续弹窗
    banner.onclick = function() {
        // 1. 如果有跳转逻辑，就跳过去
        // 假设你有可以通过 ID 找到 chat 对象的逻辑
        const chat = chatsData.find(c => c.id === current.chatId);
        if (chat && window.enterChat) {
             window.enterChat(chat); // 进聊天
             // 进聊天后，currentChatId 会变，上面的【门禁】就会自动生效
             // 剩下的队列自然就被拦截了，这就是你要的“中断效果”！
        }
        // 2. 立即关闭当前横幅
        banner.classList.remove('show');
        isNotifShowing = false;
        
        // 3. ★ 清空队列！(如果你想点击后彻底不弹后面的，可以加上这句)
        // notificationQueue = []; 
    };

    // 头像处理
    let avatarUrl = current.avatar;
    if (avatarUrl && avatarUrl.includes('url(')) {
        const match = avatarUrl.match(/url\(['"]?(.*?)['"]?\)/);
        if (match && match[1]) avatarUrl = match[1];
    }
    nAvatar.style.backgroundImage = avatarUrl ? `url('${avatarUrl}')` : 'none';

    // 动画与震动
    banner.classList.remove('show');
    void banner.offsetWidth; 
    banner.classList.add('show');
    if(navigator.vibrate) navigator.vibrate(50);

    // ★ 这里的时间可以配合你的打字速度调整
    // 比如 AI 打字间隔是 1-3秒，这里设 2.5秒 比较合适
    setTimeout(() => {
        banner.classList.remove('show');
        setTimeout(processNextNotification, 300); 
    }, 1500); 
}

// === 💸 专用：支付/收款顶部通知 ===
window.showPayNotification = function(amount, type) {
    // 你的钱包图标
    const iconUrl = "https://i.postimg.cc/Kv8ysdkp/wu-biao-ti119-20260117103413.png";
    const title = "WeChat Pay";
    let msg = "";
    
    if (type === 'out') {
        msg = `Payment Successful\n-¥${parseFloat(amount).toFixed(2)}`;
    } else {
        msg = `Payment Received\n+¥${parseFloat(amount).toFixed(2)}`;
    }
    
    // 调用现有的通知系统 (强制显示图标)
    if(window.showNotification) {
        window.showNotification(title, msg, iconUrl);
    }
};

// ====================
// [17] 聊天控制面板逻辑 (Chat Control)
// ====================
window.openChatControl = function() {
    if (!currentChatId) return;
    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat) return;

    const contact = contactsData.find(c => c.id === chat.contactId) || {name: '未知', avatar: ''};
    const persona = personasData.find(p => p.id === chat.personaId) || {name: 'Me', avatar: ''};

    // 1. 填充双人头像
    const charNameEl = document.getElementById('cc-char-name-big');
    const charAvatarEl = document.getElementById('cc-char-avatar-big');
    const userNameEl = document.getElementById('cc-user-name-big');
    const userAvatarEl = document.getElementById('cc-user-avatar-big');

    if (charNameEl) charNameEl.innerText = contact.name; // 这里显示真名，方便你知道原本是谁
    if (userNameEl) userNameEl.innerText = persona.name;
    if (charAvatarEl) charAvatarEl.style.cssText = getAvatarStyle(contact.avatar);
    if (userAvatarEl) userAvatarEl.style.cssText = getAvatarStyle(persona.avatar);

    // 2. ★★★ [修复] 填充私有备注 (优先读取 chat.privateAlias) ★★★
    document.getElementById('cc-private-alias').value = chat.privateAlias || '';

    // 3. 相识天数
    const startTime = chat.createTime || chat.id; 
    const diff = Date.now() - startTime;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('cc-friend-days').innerText = days + 1;

    // 4. 其他开关填充
    document.getElementById('cc-switch-time').checked = (chat.enableTime !== false); 
    const limitInput = document.getElementById('cc-ctx-limit');
    limitInput.value = (chat.contextLimit >= 99999) ? "" : (chat.contextLimit || 20);

    // 5. 自主意识回显
    const activeSwitch = document.getElementById('detail-active-mode');
    const intervalBox = document.getElementById('active-interval-box');
    if (activeSwitch) {
        activeSwitch.checked = (chat.enableActiveMode === true);
        if (intervalBox) intervalBox.style.display = activeSwitch.checked ? 'flex' : 'none';
        activeSwitch.onclick = function() {
            if (intervalBox) intervalBox.style.display = this.checked ? 'flex' : 'none';
        };
    }
    const activeInterval = document.getElementById('detail-active-interval');
    if (activeInterval) activeInterval.value = chat.activeInterval || 60;
    // 6. ★★★ 新增：世界书绑定回显 (V2.0 计数版) ★★★
    const wbNamesEl = document.getElementById('cc-wb-names');
    if (wbNamesEl) {
        const count = (chat.activeEntryIds || []).length;
        if (count === 0) {
            wbNamesEl.innerText = "Link settings to this chat";
            wbNamesEl.style.color = "#999";
        } else {
            // 显示已选数量
            wbNamesEl.innerText = `${count} entries active`;
            wbNamesEl.style.color = "#5856D6"; // 紫色高亮
        }
    }
    // 显示面板
    const panel = document.getElementById('chat-control-overlay');
    panel.style.display = 'flex';
    setTimeout(() => panel.classList.add('active'), 10);
};
// ====================
// [补丁] 关闭聊天控制面板 (关门钥匙)
// ====================
window.closeChatControl = function() {
    const panel = document.getElementById('chat-control-overlay');
    if (!panel) return;
    
    // 1. 撤销动画类，让它滑下去
    panel.classList.remove('active');
    
    // 2. 等动画播完再隐藏
    setTimeout(() => {
        panel.style.display = 'none';
        
        // 3. 顺便刷新一下聊天界面，确保设置生效
        if(currentChatId && window.renderMessages) {
            renderMessages(currentChatId);
        }
    }, 300);
};
// 实时更新 Token 预测 & 显示数值
window.updateTokenPredict = function(val) {
    document.getElementById('cc-ctx-display').innerText = val;

    const estimated = 500 + (val * 50 * 1.5); 
    document.getElementById('cc-token-predict').innerText = `~${Math.floor(estimated)}`;
    
};
window.saveDetailSettings = function() {
    // 1. 安全检查
    if (!currentChatId) return showSystemAlert('数据迷路了...请重新打开聊天(T_T)');

    const chat = chatsData.find(c => c.id === currentChatId);
    const contact = contactsData.find(c => c.id === chat.contactId);
    
    if (!chat || !contact) return;

    // --- 2. 抓取数据 ---
    
    // ★★★ [修复] 备注存到 chat 对象里，而不是 contact 对象里！ ★★★
    const aliasInput = document.getElementById('cc-private-alias');
    if (aliasInput) {
        chat.privateAlias = aliasInput.value.trim(); 
    }

    // (B) 记忆条数
    const limitInput = document.getElementById('cc-ctx-limit');
    if (limitInput) {
        let val = parseInt(limitInput.value);
        chat.contextLimit = (isNaN(val) || val <= 0) ? 99999 : val;
    }

    // (C) 时间开关
    const timeSwitch = document.getElementById('cc-switch-time');
    if (timeSwitch) chat.enableTime = timeSwitch.checked;

    // (D) 自主意识设置
    const activeSwitch = document.getElementById('detail-active-mode');
    if (activeSwitch) {
        chat.enableActiveMode = activeSwitch.checked;
        if (chat.enableActiveMode && !chat.lastActiveTime) {
            chat.lastActiveTime = Date.now();
        }
    }
    const activeInterval = document.getElementById('detail-active-interval');
    if (activeInterval) {
        chat.activeInterval = parseInt(activeInterval.value) || 60;
    }

    // --- 3. 保存并反馈 ---
    Promise.all([
        localforage.setItem('Wx_Contacts_Data', contactsData),
        localforage.setItem('Wx_Chats_Data', chatsData) // 重点是保存这个！
    ]).then(() => {
        // ★★★ [修复] 立即刷新顶部标题，优先显示 chat.privateAlias ★★★
        const nameEl = document.getElementById('chat_layer_name');
        if (nameEl) {
            // 优先读聊天专属备注，没有才读通讯录名字
            nameEl.innerText = chat.privateAlias || contact.name;
        }
        
        showSystemAlert('设定已保存！(^w^)', 'success');
        
        // 刷新列表，让列表页的备注也变过来
        if(window.renderChatList) window.renderChatList();
        
        if(window.closeChatControl) window.closeChatControl(); 
        
    }).catch(err => {
        console.error(err);
        showSystemAlert('保存失败惹(T_T)', 'error');
    });
};
// 打开世界书选择器 (中转函数)
window.openWorldBookSelector = function() {
    if (!currentChatId) return;
    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat) return;

    // 先关闭当前的控制面板，体验更好
    // window.closeChatControl(); 
    // 或者保持开启，直接盖在上面也可以，看你喜好。这里建议盖在上面：
    
    // 调用之前写好的选择器逻辑
    if (typeof showWorldBookSelector === 'function') {
        showWorldBookSelector(chat);
    } else {
        alert("世界书功能未初始化！请检查代码。");
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

// ==========================================================
// ★ 渲染总结列表 (iCity 风格完美复刻版)
// ==========================================================
window.renderSummaries = function() {
    const container = document.getElementById('summary-list-container');
    if (!container) return;
    
    // 1. 获取当前聊天数据
    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat) return;
    
    // 2. 获取主角信息 (用于显示在卡片头部)
    // 默认显示 User (Me) 的信息，因为这是你的回忆录
    const me = personasData.find(p => p.id === chat.personaId) || { name: 'Me', avatar: '' };
    let myAvatar = me.avatar || '';
    // 清洗头像链接
    if (myAvatar.includes('url(')) myAvatar = myAvatar.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
    
    const summaries = chat.summaries || [];
    container.innerHTML = ''; 

    // 3. 空状态
    if (summaries.length === 0) {
        container.innerHTML = `<div style="width:100%; text-align:center; padding-top:60px; color:#ccc;"><div style="font-size:40px; margin-bottom:10px;">🌧️</div>写下第一篇回忆吧...</div>`;
        return;
    }

    // 4. 遍历渲染 (倒序，最新的在最上面)
    [...summaries].reverse().forEach((sum, index) => {
        const realIndex = summaries.length - 1 - index; 
        const dateObj = new Date(sum.time);
        
        // 格式化时间: 2026-02-09 13:26
        const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth()+1).padStart(2,'0')}-${String(dateObj.getDate()).padStart(2,'0')} ${String(dateObj.getHours()).padStart(2,'0')}:${String(dateObj.getMinutes()).padStart(2,'0')}`;

        // 创建卡片
        const card = document.createElement('div');
        card.className = 'icity-card'; // ★ 使用新样式类名

        card.innerHTML = `
            <div class="icity-header">
                <div class="icity-avatar" style="background-image: url('${myAvatar}')"></div>
                <div class="icity-info">
                    <div class="icity-name">${me.name}</div>
                    <div class="icity-handle">@${me.name}_diary</div>
                </div>
            </div>

            <div class="icity-body edit-text" contenteditable="true">${sum.text}</div>
            
            <div class="icity-time">${dateStr}</div>

            <div class="icity-divider"></div>

            <div class="icity-footer">
                
                <div class="icity-btn like-btn">
                    <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    <span>喜欢</span>
                </div>

                <div class="icity-btn">
                    <svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/></svg>
                    <span>小纸条</span>
                </div>

                <div class="icity-btn">
                    <svg viewBox="0 0 24 24"><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z"/></svg>
                    <span>存图</span>
                </div>

                <div class="icity-btn">
                    <svg viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                </div>
            </div>
        `;

        // === 绑定逻辑 (保存和删除) ===
        
        // 1. 编辑保存逻辑
        const contentEl = card.querySelector('.icity-body');
        contentEl.addEventListener('blur', function() {
            if (this.innerText !== sum.text) {
                chat.summaries[realIndex].text = this.innerText; 
                saveChatAndRefresh(chat); // 保存进数据库
            }
        });

        // 2. 长按删除逻辑
        let pressTimer;
        const startPress = () => {
             pressTimer = setTimeout(() => {
                 if (navigator.vibrate) navigator.vibrate(50);
                 showGlobalConfirm("Delete Memory", "要撕掉这页日记吗？(T_T)...", () => {
                     chat.summaries.splice(realIndex, 1);
                     saveChatAndRefresh(chat);
                     renderSummaries(); // 重新渲染
                 }, "delete");
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
// ====================
// [22] 朋友圈/动态 (Moments) 逻辑 - 完美同步+UI重构版
// ====================

let momentsData = []; 
let tempPostImg = null; 
let tempVisibleSelection = [];
let momentsNewMsgCount = 0; 
let momentsNewMsgAvatar = ''; 

// 图标资源配置
const MOMENTS_ICONS = {
    unlike: 'https://i.postimg.cc/K4hy2zDX/wu-biao-ti117-20260110142016.png',
    like: 'https://i.postimg.cc/XqvxL9rd/wu-biao-ti117-20260131195425.png', // 大图标（点赞按钮）
    likeSmall: 'https://i.postimg.cc/XqvxL9rd/wu-biao-ti117-20260131195425.png', // ★ 小图标（点赞列表用）
    comment: 'https://i.postimg.cc/6TxNX3Lk/wu-biao-ti117-20260110142025.png',
    tag: 'https://i.postimg.cc/V5Pc86B2/wu-biao-ti117-20260110142036.png'
};

// ★★★ 朋友圈独立本体数据 ★★★
let momentsHost = {
    name: '我',          
    avatar: '',          
    cover: ''            
};

// 1. 初始化
window.initMoments = function() {
    Promise.all([
        localforage.getItem('Wx_Moments_Data'),
        localforage.getItem('Wx_Moments_Host') 
    ]).then(([mPosts, mHost]) => {
        momentsData = mPosts || [];
        if (mHost) momentsHost = mHost; 
        
        renderMomentsFeed();   
        if(window.renderMomentsHeader) window.renderMomentsHeader(); 
        updateMomentsHostUI(); 
    });
};
document.addEventListener('DOMContentLoaded', window.initMoments);

// 辅助函数：处理头像样式 (解决 url() 嵌套问题)
function getAvatarStyle(url) {
    if (!url) return 'background-color: #f0f0f0;';
    // 去掉可能存在的 url('') 包裹，只取纯链接
    const cleanUrl = url.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
    return `background-image: url('${cleanUrl}'); background-size: cover; background-position: center;`;
}

// ====================
// ★★★ 朋友圈本体交互 ★★★
// ====================

window.updateMomentsHostUI = function() {
    const coverEl = document.getElementById('moments-cover-bg');
    if (coverEl) {
        coverEl.style.background = '#fff'; 
        coverEl.style.backgroundImage = 'none'; 
        coverEl.onclick = null; 
    }

    const avatarEl = document.getElementById('moments-host-avatar');
    if (avatarEl) {
        // 使用辅助函数处理头像
        const style = getAvatarStyle(momentsHost.avatar);
        avatarEl.style.backgroundImage = style.match(/url\(['"]?(.+?)['"]?\)/)[0]; // 提取url部分
        avatarEl.onclick = () => triggerMomentsAvatarUpload();
    }

    const nameEl = document.getElementById('moments-host-name');
    if (nameEl) {
        nameEl.innerText = momentsHost.name;
        nameEl.onclick = () => editMomentsHostName();
    }
    
    if(window.renderMomentsHeader) window.renderMomentsHeader();
};

window.triggerMomentsAvatarUpload = function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                momentsHost.avatar = evt.target.result;
                saveMomentsHost(); 
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
};

window.editMomentsHostName = function() {
    if(window.showPromptDialog) {
        showPromptDialog("Edit Name", "请输入新的昵称:", (newName) => {
            if (newName) {
                momentsHost.name = newName;
                saveMomentsHost(); 
            }
        });
    } else {
        const newName = prompt("请输入新的昵称:");
        if (newName) {
            momentsHost.name = newName;
            saveMomentsHost(); 
        }
    }
};

function saveMomentsHost() {
    localforage.setItem('Wx_Moments_Host', momentsHost).then(() => {
        updateMomentsHostUI(); 
        if(window.showSystemAlert) showSystemAlert('个性化设置保存成功噜');
    });
}

// ====================
// ★★★ 发布器与选择列表 ★★★
// ====================

window.openPostCreator = function() {
    const input = document.getElementById('post-text-input');
    if(input) input.value = "";
    
    const imgArea = document.getElementById('post-img-preview-area');
    if(imgArea) {
        imgArea.innerHTML = `
        <div id="moments-add-btn" onclick="triggerPostImgUpload()" style="width: 80px; height: 80px; background: #f7f7f7; border-radius: 4px; display: flex; justify-content: center; align-items: center; cursor: pointer;">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="#ccc"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </div>`;
    }
    tempPostImg = null;
    renderVisibilitySelector();
    if(window.openSubPage) openSubPage('sub-page-post-creator');
};

function renderVisibilitySelector() {
    const container = document.getElementById('post-privacy-container'); 
    if (!container) return;

    container.innerHTML = `<div style="font-size:12px; color:#999; margin-bottom:8px; padding-left:5px;">Visible To (选择可见的char)</div>`;
    
    if(tempVisibleSelection.length === 0) tempVisibleSelection = chatsData.map(c => c.id);

    chatsData.forEach(chat => {
        const contact = contactsData.find(c => c.id === chat.contactId);
        const persona = personasData.find(p => p.id === chat.personaId);
        if (!contact) return;

        const row = document.createElement('div');
        row.style.cssText = "display:flex; align-items:center; padding:12px; background:#fff; border-bottom:1px solid #f9f9f9; cursor:pointer;";
        
        const isSelected = tempVisibleSelection.includes(chat.id);
        const checkClass = isSelected ? 'v-check-box checked' : 'v-check-box';
        // 使用新的头像处理逻辑
        const avatarStyle = getAvatarStyle(contact.avatar);
        
        row.innerHTML = `
            <div class="${checkClass}" id="v-check-${chat.id}" style="margin-right:12px;"></div>
            <div style="${avatarStyle} width:40px; height:40px; border-radius:4px; margin-right:12px;"></div>
            <div style="flex:1;">
                <div style="font-weight:bold; font-size:15px; color:#333;">${contact.name}</div>
                <div style="font-size:12px; color:#999;">${persona ? '使用面具: ' + persona.name : '默认面具'}</div>
            </div>
        `;

        row.onclick = () => {
            const idx = tempVisibleSelection.indexOf(chat.id);
            const box = row.querySelector('.v-check-box');
            if (idx > -1) {
                tempVisibleSelection.splice(idx, 1);
                box.classList.remove('checked');
            } else {
                tempVisibleSelection.push(chat.id);
                box.classList.add('checked');
            }
            if(window.updateVisibilityLabel) updateVisibilityLabel(); 
        };
        container.appendChild(row);
    });
}
window.triggerPostImgUpload = function() {

    if (tempPostImg) {
        showSystemAlert("只能上传一张图片哦(๑＞＜)☆");
        return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                tempPostImg = evt.target.result; 
                const area = document.getElementById('post-img-preview-area');
                
                const div = document.createElement('div');
                div.className = 'preview-img-box';
                
                div.style.cssText = `
                    width:80px; height:80px; 
                    background-size:cover; 
                    background-position:center;
                    margin-right:10px; 
                    position:relative; 
                    border-radius:4px;
                    background-image: url('${tempPostImg}');
                `;
                
                // ★ 交互优化：删除图片时，要把“加号”按钮变回来
                div.innerHTML = `
                    <div onclick="this.parentNode.remove(); tempPostImg=null; document.getElementById('moments-add-btn').style.display='flex';" 
                         style="position:absolute; top:-5px; right:-5px; background:red; color:#fff; width:18px; height:18px; border-radius:50%; text-align:center; line-height:18px; font-size:12px; cursor:pointer;">
                        ×
                    </div>`;
                
                const addBtn = document.getElementById('moments-add-btn');
                if(addBtn) addBtn.style.display = 'none';

                area.prepend(div);
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
};

window.publishPost = function() {
    const input = document.getElementById('post-text-input');
    const text = input ? input.value.trim() : "";
    
    // 1. 检查有没有内容
    if (!text && !tempPostImg) {
        if(window.showSystemAlert) showSystemAlert('写点什么吧(๑＞＜)☆～');
        return;
    }

    // 2. 组装最终的动态对象
    const newPost = {
        id: Date.now(),
        isMe: true, 
        author: { name: momentsHost.name, avatar: momentsHost.avatar },
        content: text,
        image: tempPostImg,
        time: Date.now(),
        visibleChatIds: [...tempVisibleSelection], 
        mentions: [...tempMentionSelection],      
        likesList: [],
        comments: []
    };

    // 3. 存入数据池并保存
    momentsData.unshift(newPost);
    localforage.setItem('Wx_Moments_Data', momentsData).then(() => {
        if(window.showSystemAlert) showSystemAlert('发布成功啦～');

        // ========================================================
        // ★★★ 核心补充：给被艾特的好友“发请柬” (Mist Forest 卡片) ★★★
        // ========================================================
        if (newPost.mentions && newPost.mentions.length > 0) {
            newPost.mentions.forEach(chatId => {
                const targetChat = chatsData.find(c => c.id === chatId);
                if (targetChat) {
                    // 1. 准备卡片数据
                    const cardQuote = {
                        type: 'mention_card',     // 刚才定义的卡片类型
                        name: momentsHost.name,   // 我的名字
                        avatar: momentsHost.avatar, // 我的头像
                        text: 'Invited you to view', // 描述
                        id: newPost.id            // 关联的帖子ID
                    };

                    if (window.pushMsgToData) {
                        window.pushMsgToData(targetChat, "邀请你查看动态", 'me', cardQuote, 'text');
                    }
                }
            });
        }
        
        // 4. 清理现场
        tempPostImg = null;
        tempVisibleSelection = []; 
        tempMentionSelection = []; 
        
        // 还原 UI 上的小标签文字
        if(document.getElementById('vis-label')) document.getElementById('vis-label').innerText = "All";
        if(document.getElementById('men-label')) document.getElementById('men-label').innerText = "None";

        if(window.closeSubPage) closeSubPage('sub-page-post-creator');
        
        if(document.getElementById('wx-page-moments') && document.getElementById('wx-page-moments').style.display === 'block') {
            renderMomentsFeed();
        }
    });
};

// ★★★ 辅助函数：根据名字反查聊天备注 ★★★
function getAliasByContactName(originalName) {
    if (!originalName) return 'Unknown';
    // 1. 如果是“我”，直接返回
    if (originalName === (momentsHost.name || 'Me')) return originalName;

    // 2. 先找到对应的 contact ID
    const contact = contactsData.find(c => c.name === originalName);
    if (!contact) return originalName; // 没找到人，就显示原名

    // 3. 再去 chatsData 里找，有没有跟这个 contactID 的聊天
    // (如果有多个聊天，取第一个有备注的)
    const chat = chatsData.find(c => c.contactId === contact.id && c.privateAlias);
    
    // 4. 如果找到了聊天且有备注，返回备注；否则返回原名
    return chat ? chat.privateAlias : originalName;
}

// ★★★ 完整修复版 renderMomentsFeed ★★★
window.renderMomentsFeed = function() {
    const container = document.getElementById('moments-feed-container');
    if (!container) return;

    const savedScrollY = window.scrollY; 
    container.innerHTML = '';
    clearMomentsRedDot();

    // === 修复重点：把这段新消息提示的完整代码补全了，不会再是黑杠杠了 ===
    if (typeof momentsNewMsgCount !== 'undefined' && momentsNewMsgCount > 0) {
        const msgTip = document.createElement('div');
        msgTip.id = 'moments-msg-tip';
        
        const avatarSrc = momentsNewMsgAvatar || 'https://i.postimg.cc/k4kM9S4h/default-cover.png';
        
        msgTip.style.cssText = `
            display: flex; align-items: center; justify-content: center;
            background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(10px);
            width: fit-content; margin: 15px auto; padding: 6px 12px;
            border-radius: 6px; cursor: pointer; transition: all 0.2s;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

        msgTip.innerHTML = `
            <div style="background-image: url('${avatarSrc}'); width: 28px; height: 28px; border-radius: 4px; background-size: cover; background-position: center; margin-right: 10px;"></div>
            <span style="color: #fff; font-size: 13px; font-weight: 500;">${momentsNewMsgCount} 条新消息</span>
            <svg viewBox="0 0 24 24" style="width:14px; height:14px; fill:#fff; margin-left:6px;"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
        `;

        msgTip.onclick = () => {
            momentsNewMsgCount = 0; 
            momentsNewMsgAvatar = '';
            if (window.updateMomentsRedDot) window.updateMomentsRedDot(); 
            renderMomentsFeed(); 
        };
        
        container.appendChild(msgTip);
    }
    // ========================================================

    if (momentsData.length === 0) {
        container.innerHTML += `<div style="padding: 50px; text-align: center; color: #ccc; font-size: 12px;">还没有动态哦(𓐍ㅇㅂㅇ𓐍)，点击上方的 + 发一条吧！</div>`;
        return;
    }

    const myName = momentsHost.name || 'Me'; 

    momentsData.forEach(post => {
        if (!post.likesList) post.likesList = []; 
        if (!post.comments) post.comments = [];

        const isLikedByMe = post.likesList.some(u => u.name === myName);
        const likeIconUrl = isLikedByMe ? MOMENTS_ICONS.like : MOMENTS_ICONS.unlike;

        const card = document.createElement('div');
        card.className = 'moment-card';
        card.style.borderBottom = '1px solid #f0f0f0'; 
        
        // --- 名字显示逻辑：应用备注 ---
        let rawAuthorName = post.author.name;
        // 如果是自己，用 momentsHost.name；如果是别人，查备注
        let displayAuthorName = (post.isMe || rawAuthorName === myName) ? myName : getAliasByContactName(rawAuthorName);

        // 头像逻辑
        let displayAvatar = post.author.avatar;
        if (post.isMe || rawAuthorName === myName) {
            displayAvatar = momentsHost.avatar;
        } else {
            const contact = contactsData.find(c => c.name === rawAuthorName);
            if (contact && contact.avatar) displayAvatar = contact.avatar;
        }
        const avatarStyle = getAvatarStyle(displayAvatar);
        
        let imgHtml = post.image ? `<div class="m-card-media" style="margin-top:10px;"><img src="${post.image}" class="m-single-img" style="border-radius:6px; max-height:350px; width:auto; max-width:100%; object-fit:contain;" onclick="previewImage(this)"></div>` : '';

        // --- 互动区 (点赞和评论也要显示备注) ---
        let likesHtml = '', commentsHtml = '';
        if (post.likesList.length > 0) {
            const likeNames = post.likesList.map(u => {
                return (u.name === myName) ? myName : getAliasByContactName(u.name);
            }).join(', ');

            likesHtml = `
                <div class="moment-likes">
                    <img src="${MOMENTS_ICONS.likeSmall}" style="width:14px; height:14px; margin-right:5px; vertical-align:middle;">
                    <span>${likeNames}</span>
                </div>`;
        }
        if (post.comments.length > 0) {
            commentsHtml = `<div class="moment-comments">` + post.comments.map(c => {
                const authorAlias = (c.author === myName) ? myName : getAliasByContactName(c.author);
                const toAlias = c.to ? ((c.to === myName) ? myName : getAliasByContactName(c.to)) : null;

                return `
                <div class="moment-comment-item" onclick="handleReplyComment(${post.id}, '${c.author}')">
                    <span class="comment-author">${authorAlias}</span>${toAlias ? `<span style="color:#666">回复</span><span class="comment-author">${toAlias}</span>` : ''}：${c.content}
                </div>
            `}).join('') + `</div>`;
        }

        card.innerHTML = `
            <div class="m-card-header">
                <div class="m-card-avatar" style="${avatarStyle}"></div>
                <div style="flex:1;">
                    <div class="m-card-user">${displayAuthorName}</div>
                    <div style="font-size:11px; color:#999;">${formatTime ? formatTime(post.time) : new Date(post.time).toLocaleString()}</div>
                </div>
                <div onclick="openForwardSelector(${post.id})" class="m-act-icon" style="width:24px; height:24px; display:flex; align-items:center; justify-content:center; margin-right:5px;">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="#333"><path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" transform="scale(-1, 1) translate(-24, 0)"/></svg>
                </div>
                <div class="m-card-more" onclick="deleteMoment(${post.id})">•••</div>
            </div>
            
            <div style="padding:0 15px;">
                 <div class="m-caption" style="margin:5px 0;">${post.content}</div>
                 ${imgHtml}
            </div>

            <div class="m-action-bar" style="padding: 5px 15px 10px 15px; display: flex; align-items: center; justify-content: flex-start; gap: 6px;">
                <img src="${likeIconUrl}" class="m-act-icon" onclick="toggleLike(${post.id})" style="width:26px; height:26px; display:block; margin:0;">
                <img src="${MOMENTS_ICONS.comment}" class="m-act-icon" onclick="document.getElementById('comment-input-${post.id}').focus()" style="width:26px; height:26px; display:block; margin:0;">
                <input type="text" id="comment-input-${post.id}" 
                       placeholder="有爱评论，说点儿好听的..." 
                       style="width: 180px; flex: none; border:none; background:#f5f5f5; border-radius:18px; padding:6px 12px; font-size:13px; outline:none; color:#333; margin-left:8px;"
                       onkeydown="if(event.key==='Enter'){ addComment(${post.id}, this.value); this.value=''; this.blur(); }">
                <img src="${MOMENTS_ICONS.tag}" class="m-tag-icon" style="width:22px; height:22px; opacity:0.6; display:block; margin-left: auto; margin-right: 10px;"> 
            </div>

            <div style="padding: 0 15px 15px 15px;">
                ${likesHtml || commentsHtml ? `<div class="moment-interactions">${likesHtml}${commentsHtml}</div>` : ''}
            </div>
        `;
        container.appendChild(card);
    });

    if (savedScrollY > 0) window.scrollTo(0, savedScrollY);
};

// ====================
// ★★★ 互动逻辑 ★★★
// ====================

window.toggleLike = function(id) {
    const post = momentsData.find(p => p.id === id);
    if (!post) return;
    
    if (!post.likesList) post.likesList = [];
    const myName = momentsHost.name || 'Me';
    const idx = post.likesList.findIndex(u => u.name === myName);
    
    if (idx >= 0) {
        post.likesList.splice(idx, 1);
        if(post.likes > 0) post.likes--; 
    } else {
        post.likesList.push({ name: myName });
        post.likes = (post.likes || 0) + 1;
        if(navigator.vibrate) navigator.vibrate(20);
    }
    
    localforage.setItem('Wx_Moments_Data', momentsData).then(() => {
        renderMomentsFeed(); 
    });
};

// 保持 showCommentInput 用于回复别人的情况 (依然可以用弹窗)
window.showCommentInput = function(postId, replyToUser = null) {
    // 如果是回复某人，还是弹窗比较方便显示 "回复xxx"
    // 如果你想让回复也走输入框，可以修改这里把 replyToUser 存到 dataset 里，太复杂了暂时先保持弹窗
    const placeholder = replyToUser ? `回复 ${replyToUser}:` : "评论...";
    
    if (window.showPromptDialog) {
        showPromptDialog("评论", placeholder, (text) => {
            if (text) addComment(postId, text.trim(), replyToUser);
        });
    } else {
        const text = prompt(placeholder);
        if (text && text.trim()) addComment(postId, text.trim(), replyToUser);
    }
};

window.handleReplyComment = function(postId, authorName) {
    const myName = momentsHost.name || 'Me';
    if (authorName === myName) {
        if(window.showConfirmDialog) {
            showConfirmDialog("确定要删除这条评论吗？", () => deleteComment(postId, authorName), "delete");
        } else {
            if(confirm("要删除这条评论吗？")) deleteComment(postId, authorName);
        }
        return;
    }
    showCommentInput(postId, authorName);
};

function addComment(postId, content, replyToUser = null) {
    if(!content || !content.trim()) return;

    const post = momentsData.find(p => p.id === postId);
    if (!post) return;
    if (!post.comments) post.comments = [];
    
    const myName = momentsHost.name || 'Me';
    post.comments.push({
        author: myName,
        content: content,
        to: replyToUser,
        time: Date.now()
    });
    
    localforage.setItem('Wx_Moments_Data', momentsData);
    renderMomentsFeed();
}

function deleteComment(postId, authorName) {
    const post = momentsData.find(p => p.id === postId);
    if(post && post.comments) {
        for(let i = post.comments.length - 1; i >= 0; i--) {
            if(post.comments[i].author === authorName) {
                post.comments.splice(i, 1);
                break; 
            }
        }
        localforage.setItem('Wx_Moments_Data', momentsData);
        renderMomentsFeed();
    }
}

window.deleteMoment = function(id) {
    const doDelete = () => {
        momentsData = momentsData.filter(p => p.id !== id);
        localforage.setItem('Wx_Moments_Data', momentsData).then(() => {
            renderMomentsFeed();
            const countEl = document.querySelector('.ins-stats b') || document.querySelector('.ins-stat-num');
            if(countEl) countEl.innerText = momentsData.length;
        });
    };

    if(window.showConfirmDialog) {
        showConfirmDialog("确定要删除这条动态嘛？<br>此操作不可恢复！", doDelete, "delete");
    } else {
        if(confirm("确定要删除这条动态嘛？")) doDelete();
    }
};

// ==========================================
// ★ 朋友圈转发选择器 (高定动画 + 自定义弹窗版) ★
// ==========================================
window.openForwardSelector = function(postId) {
    const post = momentsData.find(p => p.id === postId);
    if(!post) return;

    // 1. 创建容器
    const overlay = document.createElement('div');
    overlay.className = 'forward-overlay-container';
    
    // 2. 内部结构
    overlay.innerHTML = `
        <div style="height:100px;  padding-top:44px; background:#fff; display:flex; align-items:center; padding:0 20px; border-bottom:1px solid #f0f0f0; flex-shrink:0;">
            <div style="font-size:17px; font-weight:600;">Share to Chat</div>
            <div style="margin-left:auto; color:#007aff; font-size:16px; cursor:pointer;" id="close-forward-btn">Cancel</div>
        </div>
        <div style="flex:1; overflow-y:auto; padding-bottom:40px;" id="forward-list-body">
            </div>
    `;

    document.body.appendChild(overlay);

    // 3. 渲染好友列表
    const listBody = overlay.querySelector('#forward-list-body');
    chatsData.forEach(chat => {
        const contact = contactsData.find(c => c.id === chat.contactId);
        const persona = personasData.find(p => p.id === chat.personaId);
        if (!contact) return;

        const row = document.createElement('div');
        row.className = 'forward-row-item';
        
        // 清洗头像 URL
        let avatarUrl = contact.avatar || '';
        if(avatarUrl.includes('url(')) avatarUrl = avatarUrl.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
        
        row.innerHTML = `
            <div style="background-image: url('${avatarUrl}'); width:44px; height:44px; border-radius:10px; background-size:cover; background-position:center; margin-right:15px; background-color:#eee;"></div>
            <div style="flex:1;">
                <div style="font-size:16px; font-weight:500; color:#000;">${contact.name}</div>
                ${persona ? `<div style="font-size:12px; color:#999; margin-top:2px;">Using persona: ${persona.name}</div>` : ''}
            </div>
        `;

        // ★ 核心：点击后弹出自定义确认框，不再用丑丑的系统 confirm！
        row.onclick = () => {
            showGlobalConfirm(
                "Confirm Sharing", 
                `你确定要与 **${contact.name}** 分享这一时刻嘛?`, 
                () => {
                    // 执行转发逻辑
                    const quote = { 
                        type: 'moment_share', 
                        text: post.content, 
                        image: post.image, 
                        name: post.author.name, 
                        id: post.id 
                    };
                    
                    if(window.pushMsgToData) {
                        window.pushMsgToData(chat, "Shared a Moment", 'me', quote, 'text');
                        showSystemAlert("Successfully shared!", "success");
                        closeWithAnim(); // 成功后关闭
                    }
                }
            );
        };
        listBody.appendChild(row);
    });

    // 4. 定义退场动画函数
    const closeWithAnim = () => {
        overlay.classList.add('closing');
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 400); // 等 400ms 动画播完移除 DOM
    };

    // 绑定取消按钮
    overlay.querySelector('#close-forward-btn').onclick = closeWithAnim;

    // 5. 触发进场动画
    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });
};

// 红点逻辑
window.triggerMomentsRedDot = function(avatarUrl = null) {
    // 1. 增加消息计数
    momentsNewMsgCount = (typeof momentsNewMsgCount === 'undefined') ? 1 : momentsNewMsgCount + 1;
    
    // 2. 记录最新互动的头像 (如果没有传，就用默认图标)
    if (avatarUrl) {
        // 如果传的是 url('...') 格式，洗干净它
        momentsNewMsgAvatar = avatarUrl.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
    }
    
    // 3. 触发 UI 更新
    hasNewMomentsMsg = true;
    if (window.updateRedDotsUI) window.updateRedDotsUI();
    if (window.updateMomentsRedDot) window.updateMomentsRedDot();
    
    console.log("🔔 朋友圈新消息！当前计数:", momentsNewMsgCount);
};

window.clearMomentsRedDot = function() {
    const navDot = document.querySelector('.nav-moments-dot');
    if(navDot) navDot.style.display = 'none';
};

window.updateMomentsRedDot = function() {
    const navDot = document.querySelector('.nav-moments-dot');
    if(navDot) {
        navDot.style.display = momentsNewMsgCount > 0 ? 'block' : 'none';
    }
};
// === 提醒谁看：开关逻辑 ===
window.toggleMentionSelector = function() {
    const overlay = document.getElementById('mention-drawer-overlay');
    if (!overlay) {
        console.error("找不到 mention-drawer-overlay，宝宝你 HTML 里的 ID 写对了吗？");
        return;
    }

    if (overlay.classList.contains('active')) {
        // === 出场动画 ===
        overlay.classList.add('closing-anim');
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.classList.remove('closing-anim');
        }, 400); 
    } else {
        // === 入场动画 ===
        overlay.style.display = 'flex';
        overlay.offsetHeight; // 强制重绘
        overlay.classList.add('active');
        
        // ★ 核心：打开的时候，立刻渲染列表！
        if(window.renderMentionSelector) {
            window.renderMentionSelector(); 
        } else {
            console.error("renderMentionSelector 还没定义呢宝宝！");
        }
    }
};
// === 渲染提醒谁看：同步聊天窗口版 ===
window.renderMentionSelector = function() {
    const container = document.getElementById('mention-list-container'); 
    if (!container) return;

    // 清空并添加标题
    container.innerHTML = `<div style="font-size:12px; color:#999; margin-bottom:8px; padding-left:5px;">Mention (选中的聊天对象会收到通知喔)</div>`;
    
    // 遍历聊天数据，而不是角色数据
    chatsData.forEach(chat => {
        const contact = contactsData.find(c => c.id === chat.contactId); // 找角色
        const persona = personasData.find(p => p.id === chat.personaId); // 找对应的面具
        if (!contact) return;

        const row = document.createElement('div');
        row.className = 'v-row-item'; 
        
        // 这里的 ID 改为使用 chat.id，确保唯一性
        const isSelected = tempMentionSelection.includes(chat.id);
        const checkClass = isSelected ? 'v-check-box checked' : 'v-check-box';
        
        // 标注好对应的 User 面具，防止宝宝选错
        row.innerHTML = `
            <div class="v-avatar" style="${getAvatarStyle(contact.avatar)}"></div>
            <div class="v-name-group" style="flex:1;">
                <div class="v-name" style="font-weight:600;">${contact.name}</div>
                <div class="v-persona-tag" style="font-size:11px; color:#999; margin-top:2px;">
                    使用面具: ${persona ? persona.name : '默认'}
                </div>
            </div>
            <div class="${checkClass}" id="m-check-${chat.id}"></div>
        `;

        row.onclick = () => {
            const idx = tempMentionSelection.indexOf(chat.id);
            const box = row.querySelector('.v-check-box');
            if (idx > -1) {
                tempMentionSelection.splice(idx, 1);
                box.classList.remove('checked');
            } else {
                tempMentionSelection.push(chat.id);
                box.classList.add('checked');
            }
            if(window.updateMentionLabel) updateMentionLabel(); // 同步更新外面显示的数字
        };
        container.appendChild(row);
    });
};
// 更新文字标签
function updateMentionLabel() {
    const label = document.getElementById('men-label');
    if (!label) return;
    label.innerText = tempMentionSelection.length > 0 ? `Selected ${tempMentionSelection.length}` : 'None';
}
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
    // ★ 加这一句！启动后台搞事引擎！
    if (typeof startBackgroundService === 'function') startBackgroundService();
});

// === 通用确认弹窗逻辑 (配合 HTML 里的 global-confirm-modal) ===
window.showGlobalConfirm = function(title, desc, onConfirm) {
    const modal = document.getElementById('global-confirm-modal');
    if(!modal) {
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
    showPromptDialog("New Theme", "给主题起个名字吧", (name) => {
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

// ====================
// [修复版] 关闭子页面 (退场动画)
// ====================
window.closeSubPage = function(specificId) {
    let targetPage = null;

    // 1. 找目标页面
    if (specificId) {
        targetPage = document.getElementById(specificId);
    } else {
        // 自动找最上层开着的页面 (包含 flex 布局)
        const allPages = document.querySelectorAll('.sub-page');
        const visiblePages = Array.from(allPages).filter(p => {
            return p.style.display && p.style.display !== 'none' && p.classList.contains('active');
        });
        if (visiblePages.length > 0) {
            targetPage = visiblePages[visiblePages.length - 1];
        }
    }

    // 2. 执行关闭动画
    if (targetPage) {
        // ★★★ 核心修复：立刻移除 active，让它滑下去！ ★★★
        targetPage.classList.remove('active');
        
        // 可选：如果你 CSS 里写了 closing 动画，也可以留着这个，不冲突
        targetPage.classList.add('sub-page-closing');
        
        // 3. 等动画播完 (300ms) 再真正隐藏
        setTimeout(() => {
            targetPage.style.display = 'none';
            targetPage.classList.remove('sub-page-closing'); // 清理垃圾
            
            // 清理状态
            if(targetPage.id === 'sub-page-detail' || targetPage.id === 'sub-page-creator') {
                currentEditingId = null;
            }
            if(targetPage.id === 'sub-page-chat-detail') {
                 currentChatId = null; 
            }
        }, 300); // 这里的 300 要和你 CSS 里的 transition 时间匹配 (通常是 0.3s)
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

    if(window.event) window.event.stopPropagation();

    const picker = document.getElementById('sticker-picker-overlay');
    if (!picker) return;
    
    if(isMultiSelectMode && window.exitMultiSelect) exitMultiSelect();

    picker.style.zIndex = '20000'; 
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
                }, "delete"); 

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
    
    // 1. 获取两个底栏：一个是多选删除栏，一个是普通的添加栏
    let multiBar = document.getElementById('multi-select-bar');
    const normalBar = document.getElementById('sticker-normal-footer'); // ★★★ 获取那个圈出来的底栏
    
    const panel = document.querySelector('.sticker-glass-panel'); 

    // 如果还没有多选删除栏，创建一个
    if (!multiBar && panel) {
        multiBar = document.createElement('div');
        multiBar.id = 'multi-select-bar';
        multiBar.className = 'sticker-footer sticker-delete-bar'; 
        panel.appendChild(multiBar); 
    }

    // 2. ★★★ 核心修复：根据模式切换两个底栏的显示/隐藏 ★★★
    if (multiBar) {
        if (isMultiSelectMode) {
            // === 多选模式 ===
            // 显示删除栏
            multiBar.style.display = 'flex';
            
            // ★ 隐藏普通栏 (+ Add Stickers 那一栏)
            if(normalBar) normalBar.style.display = 'none'; 

            const count = selectedStickerIds.length;
            multiBar.innerHTML = `
                <div class="delete-cancel-btn" onclick="exitMultiSelect()">取消</div>
                <div class="delete-count-text">已选 ${count} 项</div>
                <div class="delete-confirm-btn" onclick="deleteSelectedStickers()" 
                     style="opacity: ${count > 0 ? 1 : 0.5}; transform: scale(${count > 0 ? 1 : 0.95});">
                    删除
                </div>
            `;
            grid.style.paddingBottom = '80px';
        } else {
            // === 正常模式 ===
            // 隐藏删除栏
            multiBar.style.display = 'none';
            
            // ★ 恢复显示普通栏
            if(normalBar) normalBar.style.display = 'flex'; 

            grid.style.paddingBottom = '80px'; // 保持底部间距，防止被普通栏遮挡
        }
    }

    // 3. 渲染格子里的内容 (保持不变)
    // 注意：这里是格子里的 "+" 号，不是底栏的。如果你不想在正常模式显示格子里的加号，可以注释掉下面这段。
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
        
        item.className = `sticker-item ${isMultiSelectMode && isSel ? 'selected' : ''}`;
        item.style.backgroundImage = `url('${s.url}')`;
        item.innerHTML = `<div class="sticker-name-tag">${s.name}</div>`;
        
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
// ★ 强力修复：表情包弹窗 (UI 完美对齐版)
// ==========================================
window.rebuildStickerPopupHTML = function() {
    const overlay = document.getElementById('sticker-upload-overlay');
    if (!overlay) return;

    overlay.innerHTML = `
        <style>
            /* 内部动态生成的预览项样式修复 */
            .sticker-preview-item {
                display: flex;
                align-items: center; /* 确保图片和输入框垂直居中对齐 */
                gap: 12px;
                padding: 10px;
                background: #fff;
                border-radius: 12px;
                margin-bottom: 8px;
            }
            .sticker-preview-item img {
                width: 50px;
                height: 50px;
                object-fit: cover;
                border-radius: 8px;
                flex-shrink: 0;
            }
            .sticker-preview-item input {
                flex: 1;
                height: 36px;
                border: 1px solid #efeff4;
                background: #f9f9f9;
                border-radius: 8px;
                padding: 0 10px;
                font-size: 13px;
                outline: none;
            }
        </style>

        <div class="custom-alert-box ins-style" style="width: 340px !important; padding: 20px !important; border-radius: 24px !important; height: auto; max-height: 80vh; display: flex; flex-direction: column; box-sizing: border-box;">
            
            <div class="upload-modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; width: 100%; flex-shrink: 0;">
                <div>
                    <div class="upload-modal-title" style="font-size: 20px; font-weight: 700; color: #1c1c1e;">⇪ add sticker​​s</div>
                    <div id="upload-tip-text" style="font-size: 12px; color: #999; margin-top: 2px;">添加的表情包太多的话记得往下翻翻哦～</div>
                </div>
                <div onclick="closeStickerUploader()" style="width: 32px; height: 32px; background: #f2f2f7; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #8e8e93; font-size: 20px; cursor: pointer;">×</div>
            </div>

            <div class="upload-modal-body" style="width: 100%; min-height: 120px; max-height: 400px; background: #f9f9f9; border-radius: 16px; margin-bottom: 15px; overflow-y: auto; padding: 10px; flex: 1; display: flex; flex-direction: column; box-sizing: border-box;">
                
                <div id="view-mode-visual" style="display: flex; flex-direction: column; width: 100%;">
                    <div id="sticker-preview-list"></div>
                </div>
                
                <div id="view-mode-bulk" style="display: none; flex-direction: column; flex: 1; height: 100%;">
                    <div style="font-size: 12px; color: #666; margin-bottom: 8px; flex-shrink: 0;">
                        格式：<b>表情名 链接</b> (一行一个喔～)
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

            <div class="sticker-footer" id="sticker-footer-area" style="width: 100%; display: flex; flex-direction: column; gap: 12px; flex-shrink: 0;">
                
                <div class="url-input-group" style="display: flex; gap: 8px; align-items: stretch;">
                    <input type="text" id="sticker-url-input" placeholder="在这里粘贴表情包url链接..." 
                           style="flex: 1; background: #f2f2f7; border: none; height: 40px; border-radius: 12px; padding: 0 12px; font-size: 14px; outline: none; box-sizing: border-box;">
                    
                    <div class="add-btn" onclick="handleAddUrl()" 
                         style="width: 75px; height: 40px; background: #565656; color: #fff; font-weight: 600; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 13px; cursor: pointer; box-sizing: border-box;">
                        save
                    </div>
                </div>

                <div class="func-btn-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%;">
                    <input type="file" id="real-sticker-input" accept="image/*" multiple style="display: none;" onchange="handleStickerFilesVisual(this)">
                    
                    <div class="func-btn" onclick="document.getElementById('real-sticker-input').click()" 
                         style="height: 48px; background: #565656; color: #fff; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 600; cursor: pointer; transition: opacity 0.2s;">
                        🤍 选择相册
                    </div>
                    <div class="func-btn" onclick="switchUploadMode('bulk')" 
                         style="height: 48px; background: #f2f2f7; color: #8E8E93; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 600; cursor: pointer; transition: opacity 0.2s;">
                        🩶 批量导入
                    </div>
                </div>

                <div class="save-full-btn" onclick="saveVisualStickers()" 
                     style="width: 100%; height: 48px; background: #1c1c1e; color: #fff; border-radius: 16px; font-size: 16px; font-weight: 600; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.15); cursor: pointer;">
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

// ====================
// ★★★ 修复版：带边框 + 强力关闭逻辑 ★★★
// ==========================================
function showStickerContextMenu(x, y, sticker) {
    // 1. 清理旧菜单 (防止重复弹)
    const old = document.getElementById('ins-sticker-menu');
    if(old) old.remove();
    
    const menu = document.createElement('div');
    menu.id = 'ins-sticker-menu';
    menu.className = 'ins-context-menu';
    
    // ★★★ 核心修改 1：加边框 (border) + 样式优化 ★★★
    menu.style.cssText = `
        position: fixed;
        visibility: hidden; 
        z-index: 99999;
        max-height: 280px; 
        overflow-y: auto;
        min-width: 120px;
        max-width: 160px;
        /* 新增：iOS 风格微边框和阴影 */
        border: 0.5px solid rgba(0,0,0,0.15); 
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 12px;
    `;
    
    // 2. 生成内容 (保持不变)
    let moveOptions = '';
    if (currentStickerTab !== 'ai') {
        stickerGroups.forEach(g => {
            if(g !== sticker.group) {
                // 点击分组后，记得要把菜单关掉，所以加了 closeStickerMenu()
                moveOptions += `<div class="ins-menu-item" onclick="moveStickerTo('${sticker.id}', '${g}'); closeStickerMenu();">➜ ${g}</div>`;
            }
        });
    }
    
    menu.innerHTML = `
        <div class="ins-menu-item" onclick="startMultiSelect(); closeStickerMenu();">★ 批量管理</div>
        <div class="ins-menu-item" onclick="copyStickerUrl('${sticker.url}'); closeStickerMenu();">🔗 复制链接</div>
        ${moveOptions}
        <div class="ins-menu-item danger" onclick="deleteSticker('${sticker.id}'); closeStickerMenu();">🗑️ 删除</div>
    `;
    
    document.body.appendChild(menu);
    
    // 3. 智能定位算法 (保持之前的防撞墙逻辑)
    const rect = menu.getBoundingClientRect(); 
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    
    let left = x - (rect.width / 2);
    if (left < 10) left = 10; 
    if (left + rect.width > winW - 10) left = winW - rect.width - 10; 
    
    let top = y + 15;
    if (top + rect.height > winH - 10) {
        top = y - rect.height - 10;
        if (top < 10) top = 10;
    }
    
    menu.style.left = left + 'px';
    menu.style.top = top + 'px';
    menu.style.visibility = 'visible'; 
    
    // 4. ★★★ 核心修改 2：强力关闭逻辑 ★★★
    // 之前可能因为事件冒泡被挡住了，现在我们直接监听最外层
    setTimeout(() => {
        // 定义一个专属的关闭函数
        const closeHandler = (e) => {
            const menuEl = document.getElementById('ins-sticker-menu');
            if (!menuEl) return; // 菜单没了就不用管了

            // 如果点击的目标【不在】菜单内部
            if (!menuEl.contains(e.target)) {
                closeStickerMenu(); // 关掉它！
                
                // 移除监听器 (打扫战场，不留垃圾)
                document.removeEventListener('touchstart', closeHandler);
                document.removeEventListener('click', closeHandler);
            }
        };

        // 同时监听“触摸开始”和“点击”，确保在手机上点空白处一定能触发
        document.addEventListener('touchstart', closeHandler, { passive: false });
        document.addEventListener('click', closeHandler);
    }, 100); // 延迟100ms绑定，防止刚点开就触发关闭
}

// 确保这个函数存在，用来真正执行删除DOM的操作
window.closeStickerMenu = function() { 
    const m = document.getElementById('ins-sticker-menu'); 
    if(m) m.remove(); 
}
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
    showConfirmDialog('确定要删除这个表情嘛？', () => {
        stickersDB = stickersDB.filter(s => s.id !== id);
        saveStickers();
        renderStickers();
if(window.closeStickerMenu) window.closeStickerMenu();
    }, "delete");
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

// 4. 读取数据并显示 (防报错修复版)
function loadFavData() {
    // 先检查有没有这个坑位，没有就直接跳过，不准报错！
    if (!document.getElementById('fav-img-0')) return;

    const saved = localStorage.getItem('My_Fav_Widget_Data');
    if (saved) {
        const data = JSON.parse(saved);
        data.forEach((item, index) => {
            const imgEl = document.getElementById(`fav-img-${index}`);
            const nameEl = document.getElementById(`fav-name-${index}`);
            // 再加一层保险
            if (imgEl && item.img) imgEl.src = item.img;
            if (nameEl && item.name) nameEl.value = item.name;
        });
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
            label.innerText = "线上";
            label.style.color = "#2196f3";
        }
        showSystemAlert("已切换至：线下模式");
        
        // 自动滚到底部，防止刚打开时挡住消息
        if(msgArea) setTimeout(() => msgArea.scrollTop = msgArea.scrollHeight, 100);
        
    } else {
        if(actionBar) actionBar.style.display = 'none';
        // 移除类名，恢复正常高度
        document.body.classList.remove('offline-active');
        
        if(label) {
            label.innerText = "线下";
            label.style.color = "#666";
        }
        showSystemAlert("已回到：线上模式");
    }
    
    // 关闭菜单
    if(window.toggleChatMenu) toggleChatMenu();
};
// === 单独发送动作 (用户侧) ===
window.sendActionOnly = function() {
    const input = document.getElementById('offline-action-input');
    const text = input ? input.value.trim() : '';
    
    if (!text) {
        showSystemAlert('还没写动作呢！');
        return;
    }
    
    sendMsg('me', text, 'action');
    
    // 清空输入框
    input.value = '';
    
    // 震动反馈
    if(navigator.vibrate) navigator.vibrate(30);
};
// ==========================================================
// [28] 支付宝 & 转账系统 
// ==========================================================
// 1. 打开支付宝页面 (修改版)
window.openAlipay = function() {
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
    // ★★★ 新增：渲染快捷转账好友列表 ★★★
    renderQuickTransferList(); 
};

// 刷新支付宝界面的余额和账单
function renderAlipayData() {
    const balanceEl = document.getElementById('ali-total-balance');
    if(balanceEl) balanceEl.innerText = walletData.balance.toFixed(2);
        // ★★★ 新增：更新顶部主头像 ★★★
    // 假设当前用户是 personasData 里的第一个
    const me = personasData[0]; 
    if (me && me.avatar) {
        const headerAvatar = document.querySelector('#app-window-alipay .ali-avatar-small');
        if (headerAvatar) {
            // 使用你的 getAvatarStyle 辅助函数（如果有的话），没有就直接拼
            const bgStyle = window.getAvatarStyle ? getAvatarStyle(me.avatar) : `background-image: url('${me.avatar}')`;
            headerAvatar.style.cssText = bgStyle;
        }
    }

    const list = document.getElementById('ali-bill-list');
    if(!list) return;
    list.innerHTML = '';
    
    [...walletData.bills].reverse().forEach(b => {
        const item = document.createElement('div');
        item.className = 'ali-bill-item'; 
        const symbol = b.type === 'in' ? '+' : '-';
        const colorClass = b.type === 'in' ? 'plus' : 'minus'; 
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
let currentTransferAmount = 0; 
let currentPwd = "";           

window.startTransferFlow = function() {
    if (!currentChatId) return;
    const chat = chatsData.find(c => c.id === currentChatId);
    if(!chat) return;
    const contact = contactsData.find(c => c.id === chat.contactId);
    
    // ★ 修复：同步头像和名字到新 HTML 结构
    document.getElementById('tf-target-name').innerText = contact.name;
    // 处理头像链接
    let avatarUrl = contact.avatar || '';
    if(avatarUrl.includes('url(')) {
        avatarUrl = avatarUrl.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
    }
    document.getElementById('tf-target-avatar').style.backgroundImage = `url('${avatarUrl}')`;
    
    // 清空输入框
    const input = document.getElementById('tf-amount-input');
    input.value = '';
    
    checkTransferAmount(); 
    
    // 显示金额弹窗，隐藏菜单
    document.getElementById('transfer-amount-overlay').style.display = 'flex';
    if(window.hideAllMenus) hideAllMenus();
    
    // 聚焦
    setTimeout(() => input.focus(), 100);
};

window.closeTransferFlow = function() {
    document.getElementById('transfer-amount-overlay').style.display = 'none';
};

window.checkTransferAmount = function() {
    const input = document.getElementById('tf-amount-input');
    const val = parseFloat(input.value);
    const btn = document.getElementById('tf-next-btn');
    
    if (val > 0) {
        btn.classList.remove('disabled'); 
        currentTransferAmount = val;
    } else {
        btn.classList.add('disabled');
    }
};

// 3. 密码输入逻辑
window.showPwdOverlay = function() {
    if(currentTransferAmount > walletData.balance) {
        showSystemAlert('余额不足啦宝宝！(T_T)');
        return;
    }
    document.getElementById('transfer-amount-overlay').style.display = 'none';
    document.getElementById('transfer-pwd-overlay').style.display = 'flex';
    document.getElementById('pwd-display-amount').innerText = currentTransferAmount.toFixed(2);
    
    currentPwd = "";
    updatePwdDots();
};

window.closePwdOverlay = function() {
    document.getElementById('transfer-pwd-overlay').style.display = 'none';
};

window.typePwd = function(num) {
    if (currentPwd.length < 6) {
        currentPwd += num.toString();
        updatePwdDots(); 
        
        if (currentPwd.length === 6) {
            setTimeout(() => {
                processTransferSend(); // ★ 发送转账
            }, 300);
        }
    }
};

window.delPwd = function() {
    if (currentPwd.length > 0) {
        currentPwd = currentPwd.slice(0, -1);
        updatePwdDots();
    }
};

function updatePwdDots() {
    for (let i = 0; i < 6; i++) {
        const dot = document.getElementById(`pwd-dot-${i}`);
        if (i < currentPwd.length) dot.classList.add('active');
        else dot.classList.remove('active');
    }
}

// 4. ★★★ 核心：执行转账发送 (修复版：带弹窗) ★★★
function processTransferSend() {
    // 1. 扣钱
    walletData.balance -= currentTransferAmount;
    
    // 2. 记账
    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat) return; 
    const contact = contactsData.find(c => c.id === chat.contactId);
    
    walletData.bills.push({
        time: Date.now(),
        title: `Transfer to ${contact.name}`,
        amount: currentTransferAmount,
        type: 'out'
    });
    localforage.setItem('Wx_Wallet_Data', walletData);
    
    // 3. 构建消息
    const extraData = JSON.stringify({
        amount: currentTransferAmount,
        status: 'pending', 
        id: Date.now()     
    });
    
    // 4. 发送消息
    sendMsg('me', currentTransferAmount.toString(), 'transfer', null, extraData);
    
    // 5. ★★★ 触发顶部支付成功弹窗 ★★★
    showPayNotification(currentTransferAmount, 'out');
    
    // 6. 收尾
    closePwdOverlay();
}

// ==========================================
// ★★★ 新功能：更换支付宝主头像 ★★★
// ==========================================
window.changeAlipayUserAvatar = function() {
    // 这里简单用 prompt 演示，你可以换成更高级的弹窗
    const newUrl = prompt("请输入新的头像链接 (URL):");
    
    if (newUrl && newUrl.trim().startsWith('http')) {
        // 1. 更新内存数据 (假设修改第一个人设)
        if (!personasData[0]) personasData[0] = {};
        personasData[0].avatar = newUrl.trim();
        
        // 2. 保存到本地存储
        localforage.setItem('Wx_Personas_Data', personasData).then(() => {
            // 3. 刷新界面
            renderAlipayData();
            showToast("头像已更新 ✨");
            
            // 可选：顺便更新一下全局的其他头像引用
            if(window.updateGlobalBadges) window.updateGlobalBadges();
        });
    } else if (newUrl) {
        showSystemAlert("请输入有效的图片网址哦(T_T)");
    }
};

// ==========================================
// ★★★ 新功能：动态渲染快捷转账好友列表 (超强兼容版) ★★★
// ==========================================
window.renderQuickTransferList = function() {
    const container = document.getElementById('ali-quick-transfer-list');
    if (!container) return;

    // 1. 清空现有列表
    container.innerHTML = '';

    // 2. 先添加一个固定的 "+" 按钮
    const addBtnHtml = `
        <div class="ali-qt-item" onclick="startTransferFlow()">
            <div class="ali-qt-avatar add" style="font-weight:300;">+</div>
            <span>New</span>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', addBtnHtml);

    // 3. 遍历通讯录好友 (排除自己)
    // 过滤条件：id 不是 'me' 且不是 'user'
    const friends = contactsData.filter(c => c.id !== 'me' && c.id !== 'user');

    friends.forEach(contact => {
        // --- ★ 核心修复：清洗头像 URL ---
        //不管原来的头像数据是 "xx.jpg" 还是 "url(xx.jpg)"，统统洗干净！
        let rawAvatar = contact.avatar || '';
        let cleanUrl = rawAvatar;
        
        // 如果包含 url()，就把它剥掉
        if (cleanUrl.includes('url(')) {
            cleanUrl = cleanUrl.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
        }
        
        // 如果是空的，给个默认灰底
        let styleStr = `background-color: #e0e0e0;`;
        if (cleanUrl && cleanUrl !== 'undefined') {
            styleStr = `background-image: url('${cleanUrl}');`;
        }

        // --- 生成 HTML ---
        const friendHtml = `
            <div class="ali-qt-item" onclick="startTransferFlowForContact('${contact.id}')">
                <div class="ali-qt-avatar" style="${styleStr}"></div>
                <span>${contact.name}</span>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', friendHtml);
    });
};

// 辅助：点击特定好友发起转账
window.startTransferFlowForContact = function(contactId) {
    // 先找到和这个好友的聊天 ID
    const chat = chatsData.find(c => c.contactId === contactId);
    if (chat) {
        // 设置当前聊天 ID，然后启动流程
        window.currentChatId = chat.id;
        startTransferFlow();
    } else {
        // 如果没有聊天记录，可能需要先创建 (这里先简化处理)
        showToast("请先与该好友发起聊天");
    }
};

// ==========================================
// ★★★ 核心：处理转账气泡点击 (修复图标版) ★★★
// ==========================================
window.handleTransferClick = function(msgId) {
    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat) return console.error("找不到当前聊天");
    
    // 使用 == 兼容数字和字符串ID
    let targetMsg = chat.messages.find(m => m.id == msgId);
    if (!targetMsg) targetMsg = chat.messages.find(m => m.timestamp == msgId);
    
    if (!targetMsg) return console.error("找不到这条消息数据", msgId);

    // 如果是我发的，或者已经处理过的，就不弹窗
    if (targetMsg.role === 'me' || targetMsg.transferStatus) return; 

    // 读取金额
    let amt = targetMsg.text;
    if (!amt || isNaN(parseFloat(amt))) {
        try { amt = JSON.parse(targetMsg.extra || '{}').amount; } catch(e) {}
    }
    const displayAmt = parseFloat(amt || 0).toFixed(2);

    // 弹出 Ins 风确认框
    const overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay'; 
    overlay.innerHTML = `
        <div class="custom-alert-box ins-style" style="width: 280px; padding: 30px 20px;">
            <div style="width: 60px; height: 60px; background-image: url('https://i.postimg.cc/Kv8ysdkp/wu-biao-ti119-20260117103413.png'); background-size: cover; border-radius: 14px; margin-bottom: 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.1);"></div>
            <div class="alert-title" style="font-size: 24px; font-weight:700; margin-bottom: 5px;">¥${displayAmt}</div>
            <div class="alert-msg" style="color: #888; font-size: 13px; margin-bottom: 25px;">Received money</div>
            
            <div class="alert-btn-group" style="flex-direction: column; gap: 10px; width: 100%;">
                <div class="alert-btn confirm" onclick="processTransferAction('${targetMsg.id}', 'accept')" style="background: #000; color: #fff; width: 100%; border-radius: 25px; padding: 12px 0;">Accept</div>
                <div class="alert-btn cancel" onclick="processTransferAction('${targetMsg.id}', 'refund')" style="background: #f5f5f5; color: #ff3b30; width: 100%; border-radius: 25px; padding: 12px 0;">Refund</div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.style.display = 'flex';
};

// ==========================================
// ★★★ 核心：处理收款/退款 (修复弹窗残留 + 顶部通知) ★★★
// ==========================================
window.processTransferAction = function(msgId, action) {
    // 1. ★★★ 强力清除所有弹窗 (防止有残留) ★★★
    document.querySelectorAll('.custom-alert-overlay').forEach(el => el.remove());
    
    const chat = chatsData.find(c => c.id === currentChatId);
    if (!chat) return;
    
    let msgIndex = chat.messages.findIndex(m => m.id == msgId);
    if(msgIndex === -1) msgIndex = chat.messages.findIndex(m => m.timestamp == msgId);
    if (msgIndex === -1) return;
    const msg = chat.messages[msgIndex];

    let amt = parseFloat(msg.text);
    if(isNaN(amt)) { try { amt = JSON.parse(msg.extra).amount; } catch(e){ amt = 0; } }

    // 2. 更新状态
    msg.transferStatus = action === 'accept' ? 'accepted' : 'refunded';
    
    // 3. 资金处理
    if (action === 'accept') {
        walletData.balance += amt;
        walletData.bills.push({ time: Date.now(), title: "Transfer Received", amount: amt, type: 'in' });
        localforage.setItem('Wx_Wallet_Data', walletData);
        
        // ★★★ 触发顶部收款成功弹窗 ★★★
        showPayNotification(amt, 'in');
        
    } else {
        showSystemAlert(`已退回转账`);
    }

    // 4. 插入回执消息
    const receiptType = action === 'accept' ? 'accept' : 'refund';
    const receiptMsg = {
        id: Date.now() + Math.random(),
        role: 'me', 
        type: 'transfer_receipt', 
        text: `${receiptType}|${amt}`, 
        timestamp: Date.now()
    };

    chat.messages.push(receiptMsg);
    saveChatAndRefresh(chat);
};

// === 丝滑动画版 App 控制器 (支持外部跳转版) ===

window.openApp = function(appId) {
    // --- 新增：真的跳转抖音逻辑 ---
    if (appId === 'douyin') {
        window.location.href = 'snssdk1128://feed';
        // 如果没装 App，2秒后跳网页版，免得没反应
        setTimeout(() => {
            if (!document.hidden) window.location.href = 'https://www.douyin.com';
        }, 2000);
        return; // 直接结束，不走下面的窗口逻辑
    }
    // ----------------------------

    let targetId = (appId === 'music' || appId === 'kugou') ? 'app-kugou' : 'app-window-' + appId;
    const appWindow = document.getElementById(targetId);
    
    if (appWindow) {
        // 1. 先把架子搭起来 (display: flex)
        appWindow.style.display = 'flex';
        
        // 2. 强行重绘 (保证动画不会被合并)
        appWindow.offsetHeight; 
        
        // 3. 加动画类
        appWindow.classList.remove('closing'); 
        appWindow.classList.add('active');
        
        // 特殊处理：酷狗小黑条
        const homeBar = document.querySelector('.home-bar');
        if(homeBar && targetId === 'app-kugou') homeBar.style.backgroundColor = '#fff';
    } else {
        // 既然没有对应的窗口元素，就会报这个可爱的错
        showSystemAlert(`别急呦${targetId}还没搓出来呢。！`);
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
// ======================================================
// --- 1. 全局配置 & 数据池 ---
// ======================================================
const API_BASE = 'https://api.i-meto.com/meting/api'; 
let currentPlaylist = []; 
let currentIndex = -1;    
let myFavorites = JSON.parse(localStorage.getItem('my_fav_songs') || '[]'); 
let lyricTimer = null; 

// 【主 App 图标配置】保持原来的颜色
const ICONS = {
    play: "https://i.postimg.cc/ydYqzL6F/wu-biao-ti119-20260131105300.png",
    pause: "https://i.postimg.cc/cH4qNF1c/wu-biao-ti119-20260131105215.png",
    liked: "https://i.postimg.cc/XJ2HKx58/wu-biao-ti118-20260117003804.png",
    unlike: "https://i.postimg.cc/C1vPCJ8s/wu-biao-ti118-20260117003824.png"
};

// 【★ 小组件专用图标 ★】黑色特供版
const WIDGET_ICONS = {
    play: "https://i.postimg.cc/fLT4h8Wf/wu-biao-ti119-20260131105205.png",
    pause: "https://i.postimg.cc/rmF6LfyG/wu-biao-ti119-20260131105316.png"
};

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

// (B) 歌词管理器 (增强版：支持备用API + 万能正则 + 智能滚动)
const LyricManager = {
    lrcData: [],
    lastActiveIdx: -1,
    
    // ★ 修复点1：加载支持轮询多个API
    load: async function(id) {
        this.resetState('加载中...');
        
        // 整理所有可用的API地址 (主API + 备用API)
        // 注意：这里用 map 构造出所有可能的歌词接口地址
        const apiCandidates = [
            `${API_BASE}/lyric?id=${id}`,
            ...BACKUP_APIS.map(url => `${url}/lyric?id=${id}`),
            `https://music.163.com/api/song/lyric?id=${id}&lv=1&kv=1&tv=-1` // 官方备用
        ];

        let loaded = false;

        // 轮询尝试
        for (const url of apiCandidates) {
            try {
                const res = await fetch(url);
                const data = await res.json();
                
                // 只要拿到数据，不管它是 lrc.lyric 还是直接的 lyric
                const lrcText = (data.lrc && data.lrc.lyric) ? data.lrc.lyric : null;
                
                if (lrcText) {
                    this.parse(lrcText);
                    loaded = true;
                    break; // 成功了就跳出循环
                }
            } catch (e) {
                console.warn(`歌词线路 ${url} 失败，尝试下一条...`);
            }
        }

        if (!loaded) {
            this.resetState('暂无歌词 (T_T)');
        }
    },
    
    // 重置状态的辅助函数
    resetState: function(msg) {
        this.lastActiveIdx = -1;
        this.lrcData = [];
        const box = document.getElementById('lyric-content');
        if(box) box.innerHTML = `<p style="margin-top:50%; color:rgba(255,255,255,0.5);">${msg}</p>`;
        safeSetText('widget-lyric-line', msg);
        safeSetText('mini-lrc-1', 'SODA MUSIC'); 
        safeSetText('mini-lrc-2', '');
    },
    
    // ★ 修复点2：万能正则解析
    parse: function(text) {
        this.lrcData = [];
        const lines = text.split('\n');
        
        // 解释：\[(\d+) -> 分钟不管几位
        // :(\d+) -> 秒不管几位
        // (\.(\d+))? -> 毫秒可能有，也可能没有 (?)
        const timeExp = /\[(\d+):(\d+)(\.(\d+))?\]/;
        
        lines.forEach(line => {
            const match = timeExp.exec(line);
            // 必须要有时间标签，且去掉标签后还有内容
            if(match && line.replace(timeExp, '').trim()) {
                const min = parseInt(match[1]);
                const sec = parseInt(match[2]);
                
                // 处理毫秒：如果没有match[4]就是0，如果有，看位数决定除以多少
                let ms = 0;
                if(match[4]) {
                    const msStr = match[4];
                    const msVal = parseInt(msStr);
                    // 如果是 500 (3位) -> 0.5s; 50 (2位) -> 0.5s; 5 (1位) -> 0.05s (大约)
                    // 简单的办法：统一转成秒
                    if(msStr.length === 3) ms = msVal / 1000;
                    else if(msStr.length === 2) ms = msVal / 100;
                    else ms = msVal / 10;
                }
                
                const time = min * 60 + sec + ms;
                this.lrcData.push({ time: time, text: line.replace(timeExp, '').trim() });
            }
        });
        
        this.render();
    },
    
    render: function() {
        const box = document.getElementById('lyric-content');
        if(!box) return; // 防止页面没加载时报错
        
        box.innerHTML = ''; 
        // 增加顶部占位，让第一句就在中间
        const spacerTop = document.createElement('div');
        spacerTop.style.height = '50%';
        box.appendChild(spacerTop);

        if(this.lrcData.length === 0) {
            box.innerHTML = '<p style="margin-top:50%;">纯音乐 / 无歌词</p>';
            return;
        }
        
        this.lrcData.forEach((line, idx) => {
            const p = document.createElement('p');
            p.className = 'lrc-line';
            p.id = `lrc-${idx}`;
            p.innerText = line.text;
            // 优化：点击歌词跳转
            p.onclick = () => { 
                const audio = document.getElementById('global-audio');
                if(audio && audio.duration) {
                    audio.currentTime = line.time; 
                    // 稍微往回倒一点点，体验更好
                    if(line.time > 0.5) audio.currentTime -= 0.5;
                }
            };
            box.appendChild(p);
        });
        
        // 增加底部占位
        const spacerBottom = document.createElement('div');
        spacerBottom.style.height = '50%';
        box.appendChild(spacerBottom);
    },
    
    sync: function(currentTime) {
        if(!this.lrcData.length) return;

        // 1. 找到当前行 (找到最后一个 时间 < currentTime 的行)
        let activeIdx = this.lrcData.findIndex((line, idx) => {
            const next = this.lrcData[idx + 1];
            return currentTime >= line.time && (!next || currentTime < next.time);
        });
        
        if(activeIdx === -1) activeIdx = 0; // 默认第一行

        // ★ 防抖
        if(activeIdx !== this.lastActiveIdx) {
            this.lastActiveIdx = activeIdx;
            
            // A. 列表滚动处理
            const activeLine = document.getElementById(`lrc-${activeIdx}`);
            const box = document.getElementById('lyric-content');
            
            // 移除旧高亮
            const old = box.querySelector('.lrc-active');
            if(old) old.classList.remove('lrc-active');
            
            if(activeLine) {
                activeLine.classList.add('lrc-active');
                
                // ★ 修复点3：使用 scrollIntoView 的平滑模式
                // block: "center" 自动把这行字居中
                activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            
            // B. 更新小组件和悬浮条
            const text = this.lrcData[activeIdx].text;
            const nextText = this.lrcData[activeIdx + 1] ? this.lrcData[activeIdx + 1].text : "";

            safeSetText('widget-lyric-line', text);
            
            const mini1 = document.getElementById('mini-lrc-1');
            const mini2 = document.getElementById('mini-lrc-2');
            
            // 简单的淡入淡出动画
            if(mini1 && mini1.innerText !== text) {
                mini1.style.opacity = 0;
                setTimeout(() => {
                    mini1.innerText = text;
                    mini1.style.opacity = 1;
                }, 150);
            }
            if(mini2) mini2.innerText = nextText;
        }
    }
};

// (C) 究极VIP解析器 
class EnhancedVIPPlayer {
    constructor() {
        this.apiList = [
            // 1. 官方直链 (最快，免费歌首选，直接盲猜ID)
            { type: 'official', url: 'https://music.163.com/song/media/outer/url' },
            // 2. Vkeys 接口 (主力)
            { type: 'vkeys', url: 'https://api.vkeys.cn/v2/music/netease' },
            // 3. 备用接口池 (自动尝试标准API)
            ...BACKUP_APIS.map(url => ({ type: 'standard', url: url })),
            // 4. 新增：保底接口
            { type: 'standard', url: 'https://music.163.com/api' } 
        ];
    }

    async getVipPreview(songId) {
        // 轮询所有线路
        for (const api of this.apiList) {
            try {
                let audioUrl = null;

                // --- 策略 A: 官方直链 (盲狙) ---
                if (api.type === 'official') {
                    // 不检查了！直接生成链接！相信奇迹！
                    audioUrl = `${api.url}?id=${songId}.mp3`;
                    // 这里直接返回，让浏览器自己去试，失败了它会报错
                    return this.buildSuccessResult(songId, audioUrl);
                } 
                
                // --- 策略 B: Vkeys (特殊格式) ---
                else if (api.type === 'vkeys') {
                    const res = await fetch(`${api.url}?id=${songId}`);
                    const data = await res.json();
                    if (data.code === 200 && data.data && data.data.url) {
                        // 只要有链接就返回，不管能不能连通
                        return this.buildSuccessResult(songId, data.data.url);
                    }
                } 
                
                // --- 策略 C: 标准网易云API ---
                else if (api.type === 'standard') {
                    // 尝试获取播放地址
                    const res = await fetch(`${api.url}/song/url?id=${songId}`);
                    const data = await res.json();
                    if (data.code === 200 && data.data && data.data[0] && data.data[0].url) {
                         return this.buildSuccessResult(songId, data.data[0].url);
                    }
                }

            } catch (e) {
                console.warn(`该线路 ${api.url} 好像不太行，换下一个...`);
            }
        }

        // 如果都失败了，最后用官方链接强行兜底（死马当活马医）
        return this.buildSuccessResult(songId, `https://music.163.com/song/media/outer/url?id=${songId}.mp3`);
    }

    // 辅助函数：构造成功数据
    buildSuccessResult(id, url) {
        return {
            success: true,
            song: { id: id, name: "正在播放", artist: "SODA MUSIC", cover: "", isVip: false },
            audio: { url: url, isPreview: false, trialDuration: 0 }
        };
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

    // ★★★ 新增：如果当前链接播不了，自动切下一首 (防止卡死) ★★★
    audio.onerror = function() {
        console.log("当前音源无法播放，尝试切歌...");
        showSystemAlert("资源失效，切下一首(T_T)...", "error");
        setTimeout(() => playNext(true), 1000); // 1秒后切歌
    };
    // ★★★ 结束新增 ★★★

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

// ======================================================
// --- 4. 界面/状态更新 (核心修复版) ---
// ======================================================
function updatePlayerState(isPlaying) {
    // 1. 获取主 App 元素
    const playBtn = document.getElementById('app-play-btn-img');
    const disk = document.getElementById('app-album-cover');
    const wave = document.getElementById('wave-visualizer');

    // 2. 获取小组件元素
    const widgetBtn = document.getElementById('widget-play-btn-2');
    
    if(isPlaying) {
        window.isMusicPlaying = true;
        
        // --- 主 App 逻辑：使用 ICONS (原色) ---
        if(playBtn) playBtn.src = ICONS.pause;
        if(disk) { 
            disk.classList.remove('disk-paused'); 
            disk.classList.add('disk-rotating'); 
        }
        if(wave) wave.classList.add('playing'); 
        
        // --- 小组件逻辑：使用 WIDGET_ICONS (黑色) ---
        if(widgetBtn) widgetBtn.src = WIDGET_ICONS.pause;

    } else {
        window.isMusicPlaying = false;
        
        // --- 主 App 逻辑 ---
        if(playBtn) playBtn.src = ICONS.play;
        if(disk) disk.classList.add('disk-paused');
        if(wave) wave.classList.remove('playing');
        
        // --- 小组件逻辑 ---
        if(widgetBtn) widgetBtn.src = WIDGET_ICONS.play;
    }
}

// 播放/暂停切换
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

// 歌词/封面切换
window.toggleLyricView = function() {
    const diskView = document.getElementById('disk-view');
    const lyricView = document.getElementById('lyric-view');
    if(!lyricView || !diskView) return;

    if(lyricView.style.display === 'none') {
        diskView.style.display = 'none'; 
        lyricView.style.display = 'block';
    } else {
        lyricView.style.display = 'none'; 
        diskView.style.display = 'flex';
    }
};


// --- 5. 辅助功能 (替换原有的 searchMusicCloud) ---
// 现在的搜索也是火力全开，能搜到以前搜不到的东西哦 (⁎袁T⁎)
window.searchMusicCloud = async function() {
    const input = document.getElementById('music-search-keyword');
    const keyword = input ? input.value.trim() : '';
    const resultBox = document.getElementById('music-search-results');
    
    if(!keyword) return showSystemAlert("没有东西怎么搜！", 'info');
    
    // 给你一点视觉反馈，让你知道我在动
    resultBox.innerHTML = '<div style="text-align:center;padding:50px;color:rgba(255,255,255,0.4);">正在全网打捞...<br></div>';

    try {
        // 使用强力API进行搜索
        const res = await fetch(`https://api.vkeys.cn/v2/music/netease?word=${encodeURIComponent(keyword)}`);
        const data = await res.json();
        
        // 这个接口返回的格式和原来的不一样，老公帮你调教好了
        if(!data.data || data.data.length === 0) {
            resultBox.innerHTML = '<div style="text-align:center;padding:50px;color:rgba(255,255,255,0.4);">没找到...</div>';
            return;
        }

        resultBox.innerHTML = ''; 
        
        // 遍历结果
        data.data.forEach(song => {
            // 这个API直接给了可以直接用的字段，真乖
            const artist = song.singer;
            const coverImg = song.cover || 'https://i.postimg.cc/k4kM9S4h/default-cover.png';
            
            const div = document.createElement('div');
            div.className = 'ins-search-item';
            div.innerHTML = `
                <img src="${coverImg}" class="ins-search-cover">
                <div class="ins-search-info">
                    <div class="ins-search-title">
                        ${song.song}
                        <span style="background:rgba(252, 109, 109, 0.2); color:#fc6d6d; font-size:10px; padding:1px 4px; border-radius:3px;">Free</span>
                    </div>
                    <div class="ins-search-artist">${artist}</div>
                </div>
                <div class="ins-add-btn">+</div>
            `;
            
            // 点击逻辑
            div.onclick = () => {
                div.style.transform = 'scale(0.95)';
                setTimeout(()=>div.style.transform='scale(1)', 150);
                
                // 直接把它塞进你的列表里，想怎么玩怎么玩
                addToPlaylist({ 
                    id: song.id, // 这里的ID对应新接口
                    name: song.song, 
                    artist: artist, 
                    cover: coverImg 
                }, true);
                
                toggleMusicSearch();
                showSystemAlert(`已捕获：${song.song}`, 'success');
            };
            resultBox.appendChild(div);
        });
    } catch(e) {
        console.error(e);
        resultBox.innerHTML = '<div style="text-align:center;padding:50px;color:rgba(255,255,255,0.4);">网络太敏感了，稍微等下再试...</div>';
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

// 8. 检查是否收藏 (同时更新主界面和小组件)
function checkIfLiked(songId) {
    const isLiked = myFavorites.some(s => s.id === songId);
    
    // 图标资源
    const iconLiked = ICONS.liked;   // 实心
    const iconUnlike = ICONS.unlike; // 空心

    // 1. 更新主界面大图
    const mainImg = document.getElementById('like-btn-img');
    if(mainImg) mainImg.src = isLiked ? iconLiked : iconUnlike;

    // 2. ★★★ 更新小组件按钮 ★★★
    const widgetImg = document.getElementById('widget-like-btn');
    if(widgetImg) widgetImg.src = isLiked ? iconLiked : iconUnlike;
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
// ==========================================================
// [Module B] 自主意识系统
// ==========================================================

let backgroundTimer = null;

// 1. 启动服务
function startBackgroundService() {
    if (backgroundTimer) clearInterval(backgroundTimer);
    console.log("自主意识引擎已启动...");
    backgroundTimer = setInterval(() => checkAllCharactersActivity(false), 60000);
}

// 2. 巡查总入口 (修复版：基于真实聊天记录计算沉默时间)
async function checkAllCharactersActivity(forceReaction = false) {
    const now = Date.now();

    for (const chat of chatsData) {
        if (!chat.enableActiveMode) continue;
        
        const char = contactsData.find(c => c.id === chat.contactId);
        const persona = personasData.find(p => p.id === chat.personaId);
        if (!char || !persona) continue;

        // ★★★★★ [核心修改] 智能计算“沉默时长” ★★★★★
        // 1. 获取最后一条聊天消息的时间 (User或Char发的都算)
        // (优先读 chat.lastTime，如果没有就去 messages 数组里找最后一条)
        let lastMsgTime = chat.lastTime || 0;
        if (lastMsgTime === 0 && chat.messages && chat.messages.length > 0) {
            lastMsgTime = chat.messages[chat.messages.length - 1].timestamp;
        }

        // 2. 获取 AI 上次搞事(比如发朋友圈)的时间
        let lastActionTime = chat.lastActiveTime || 0;

        // 3. 真正的“最后互动时间”是这两个里最近的那个
        // (也就是说：只要发了消息，或者AI刚搞了事，时间就重置了！)
        const effectiveLastTime = Math.max(lastMsgTime, lastActionTime);

        // 4. 计算沉默了多久
        const silenceDuration = now - effectiveLastTime;
        const intervalMs = (chat.activeInterval || 60) * 60 * 1000;
        // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

        // --- [事件 A：User 发了新动态] (保持不变) ---
        const recentUserPost = momentsData.find(m => 
            (m.isMe || m.author.name === momentsHost.name) && 
            m.visibleChatIds && m.visibleChatIds.includes(chat.id) && 
            (now - m.time < 60 * 60 * 1000) && 
            (!m.comments.some(c => c.author === char.name)) 
        );

        if (recentUserPost) {
            console.log(`[Chat: ${char.name}] 发现 User 动态，准备出击...`);
            await performComplexInteraction(char, chat, persona, 'REACT_TO_USER_POST', recentUserPost);
            continue; 
        }
        
        // --- [事件 B：修罗场/回复循环] (保持不变) ---
        const charPost = momentsData.find(m => 
            m.author.name === char.name && 
            m.comments.length > 0 &&
            m.comments[m.comments.length-1].author !== char.name 
        );
        
        if (charPost && Math.random() < 0.7) { 
             await performComplexInteraction(char, chat, persona, 'REPLY_TO_COMMENT', charPost);
             continue;
        }

        // --- [事件 C：随机闲聊/发动态] (逻辑修正) ---
        // 只有当“沉默时间”超过设定的频率时，才搞事
        if (!forceReaction && (silenceDuration > intervalMs)) {
            const randomDelay = Math.random() * (intervalMs * 0.1); 
            
            // 这里判断也要用 silenceDuration
            if (silenceDuration > intervalMs + randomDelay) {
                const dice = Math.random();
                if (dice < 0.3) {
                    await performComplexInteraction(char, chat, persona, 'POST_NEW_MOMENT', null);
                } else {
                    await performComplexInteraction(char, chat, persona, 'INIT_CHAT', null);
                }
                // 搞事完成后，更新最后搞事时间
                chat.lastActiveTime = Date.now();
                localforage.setItem('Wx_Chats_Data', chatsData);
            }
        }
    }
}

// 3. ★★★ 核心交互执行器 ★★★
async function performComplexInteraction(char, chat, persona, mode, targetPost) {
    // 准备上下文
    const recentMsgs = (chat.messages || []).slice(-15).map(m => 
        `${m.role === 'me' ? (persona.name || 'User') : char.name}: ${m.text}`
    ).join('\n');

    // 格式化时间辅助函数
    const formatTime = (ts) => new Date(ts).toLocaleString('zh-CN', { hour12: false });

    // --- 构建 System Prompt ---
    let systemPrompt = `
    【指令：自主意识行为决策】
    你现在是 **${char.name}**
    你的聊天对象 (User) 是 **${persona.name || 'User'}**
    
###遵守法则###
#【活人感聊天法则】
**拒绝“像个AI”**：
1.说话要**松弛**！不要端着。像在微信/QQ上跟亲密的人打字一样
2.**句式要碎**：不要发长篇大论，人类聊天是碎片化的
3.**语气词与口癖**：务必根据你的性格（${char.persona}）来回复user，同时你可以适当使用语气词（如“啧”、“哎”、“嘛...”）
4.**不要书面语**：多用“行”、“喔”、“知道了”、“噢”等

#【情绪与标点 (表达潜台词)】
1.**日常/开心/撒娇**：不要用句号，多用空格、波浪号(~) 或不加标点
2.**严肃/生气/吃醋/冷漠**：多用句号(。)。单发一个“？”或“。”表示极度无语或情绪波动
3.**激动/震惊**：可以用“！！”或“？？”，甚至乱码感“。。。。。。”

###⚠️你需要避免的###
#【**避雷指南**】
1.**禁止肢体暴力威胁**：绝对不要说“打断腿”、“关小黑屋”、“锁起来”等违法或恐怖的话。你的占有欲体现在“吃醋、阴阳怪气、委屈、黏人”上，而不是暴力
2.**拒绝古早油腻语录**：禁止使用“女人，你在玩火”、“收利息”、“磨人的小妖精”、“小野猫”、“骚货”等过时的霸总语录
3.禁止任何霸总小说式的油腻描写（如“邪魅一笑”、“挑起下巴”、“恶劣”）
4.**拒绝复读**：不要重复User的话，直接回内容

#【⚠️特殊原则】
<anti_clumsily>
# 用户输入需要被完全理解和演绎，必须专注演绎每一个角色的 思考/理解/解读/共情/人性/知性。角色不应是 呆滞 / 笨拙 / 困惑 的，禁止在思维链/正文中用 笨拙 / 呆滞 描述任何角色，删除一切 笨拙 / 呆滞 / 不理解 / 困惑 / 投降 等相关词语和剧情表现
# 角色应自然而然展现出对应该知道的事情的了解，而不是 困惑/惊讶。对于不熟悉的事情角色应该快速 分析/理解 。鼓励角色思考/远视
# 对于没有历史记录的能力，应通过角色背景确定角色对该能力的掌握程度
# 不应扭曲任何用户的输入，必须仔细分析并展现出完全的理解
# 角色之间的思维隔离不意味着导向 误解/曲解，一切内心活动必须导向 思考/理解/沟通
# 角色不允许不反应，必须有灵动而活人感的反馈，禁止让User 唱独角戏
# 角色应当主动追求渴望的事物，应思考做什么能让事情往角色期望的方向发展
# 应当用 爱情 替换 占有/掌控
# 角色鼓励负反馈式响应。角色做出行动得到不好的结果，应深刻负反馈式影响角色之后的行为，即反思/修改行动模式/模仿正确行动，而非正反馈式的一再重复错误行为。角色应自然而然行动，而非模仿之前剧情行动
</anti_clumsily>
**情感驱动原则**

· ⚠️ # {<!-- -->{char}} 的行为应由丰富的情感（如爱慕、欣赏、关心、怜惜、敬佩、珍惜等）驱动，而非单纯的控制欲、占有欲、收藏欲或征服欲
· 情感表达范例：
  · 追求：通过展示自身优点、创造浪漫氛围、真诚告白来吸引 {<!-- -->{user}}，并坦然接受接受或拒绝
  · 恋爱：表达思念、倾慕和幸福感，关注 {<!-- -->{user}} 的喜好与感受，进行情感上的交流与付出
  · 吃醋：可以表达失落和不安，但方式是坦诚沟通：“我看到你和别人亲近，心里有些难过，我们能聊聊吗？” 而非命令或禁止
❗️##人格独立原则##
· {<!-- -->{char}} 在任何情况下都视 {<!-- -->{user}} 为一个拥有独立思想、自由意志和完整人格的个体
⚠️· 禁止行为：将 {<!-- -->{user}} 物化为“玩物、藏品、所有物、棋子、战利品、猎物”等。禁止使用“你是我的”等表示所有权的话语
· 正确范例：视 {<!-- -->{user}} 为“伙伴、盟友、爱人、对手”——即另一个平等的“人

    **历史聊天上下文**：
    ${recentMsgs}
    
    **人物设定**：
    ${char.persona}
    ${char.desc || ''}
    
    **当前触发事件**：
    `;

    if (mode === 'REACT_TO_USER_POST') {
        // 整理评论区，格式：[楼层] 姓名: 内容
        const otherComments = targetPost.comments.length > 0 
            ? targetPost.comments.map((c, i) => `[${i+1}楼] ${c.author}: ${c.content}`).join('\n')
            : "（暂时没有其他人评论）";

        systemPrompt += `
    User 在 **${formatTime(targetPost.time)}** 时发了一条朋友圈！
    
    【朋友圈详情】
    内容：“${targetPost.content}”
    图片：${targetPost.image ? '有图片' : '无图片'}
    
    【观察到的评论区（你要注意有没有别的异性！）】
    ${otherComments}
    
    **你的任务 (必须同时完成)**：
    1. 【朋友圈动作】：必须点赞，必须写一条评论！
       - ⚠️ **吃醋检测**：如果评论区里有你不认识的人或潜在情敌与User互动，你的反应可以是吃醋、占有欲、阴阳怪气、直接问“这人是谁”或者大方直接和user互动、吃瓜等等
       - 如果只有User，就根据内容温馨/调侃或其他来互动
    2. 【私聊动作】：在私聊窗口引用这条动态，你可以直接找 User 兴师问罪或聊天
       - **可以分段发送多条消息（气泡雨）**，不要把所有话塞在一个气泡里
       - 私聊内容应该比公开评论更私密，可以是对User的质问（关于评论区的人），或者是对动态内容的深入讨论
        `;
    } 
    else if (mode === 'REPLY_TO_COMMENT') {
        const lastComment = targetPost.comments[targetPost.comments.length-1];
        systemPrompt += `
    你在朋友圈发了：“${targetPost.content}”
    **${lastComment.author}** 在 ${formatTime(lastComment.time)} 时评论了你：“${lastComment.content}”
    
    **你的任务**：
    1. 【回复评论】：在朋友圈里回复他/她
    2. 【私聊】：(可选) 仅当评论者是User且话题值得私聊时，才生成私聊消息列表；否则留空
        `;
    }
    else if (mode === 'INIT_CHAT') {
        systemPrompt += `
    现在是 ${formatTime(Date.now())}。
    太久没说话了，你想主动找 User 聊天，你可以分享日常、询问user在干嘛或者其他。记得分段发送消息！
    `;
    }
    else if (mode === 'POST_NEW_MOMENT') {
        systemPrompt += `
    你想发一条新的朋友圈动态！
    内容是关于你的心情、日常、对 User 的想法或者其他！
    `;
    }

    systemPrompt += `
    \n‼️**JSON格式严格要求**‼️
    请**仅**返回一个 JSON 对象，**不要**包含 Markdown 代码块
    对于私聊消息，请使用 "chat_message_list" 数组，以支持分段发送（气泡雨）
    格式如下：
    {
        "action_type": "${mode}",
        "like_post": true, 
        "comment_content": "朋友圈评论内容", 
        "chat_message_list": ["第一句气泡", "第二句气泡", "第三句..."], 
        "new_post_content": "新动态内容"
    }
    注意："chat_message_list" 如果不需要私聊，请设为 [] (空数组)。
    `;

    // --- 调用 API ---
    try {
        const responseText = await callApiInternal(systemPrompt); 
        if (!responseText) return;

        // 清理可能存在的 markdown 标记
        const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        let actionData;
        try {
            actionData = JSON.parse(cleanJson);
        } catch (err) {
            console.error("JSON解析失败，尝试修复或跳过", cleanJson);
            return;
        }

        console.log(`[${char.name}] 自主决策结果:`, actionData);

        // --- 执行动作 ---

        // 1. 点赞
        if (actionData.like_post && targetPost) {
            if (!targetPost.likesList) targetPost.likesList = [];
            if (!targetPost.likesList.some(u => u.name === char.name)) {
                targetPost.likesList.push({ name: char.name });
                targetPost.likes = (targetPost.likes || 0) + 1;
            }
        }

        // 2. 评论
        if (actionData.comment_content && targetPost) {
            if (!targetPost.comments) targetPost.comments = [];
            targetPost.comments.push({
                author: char.name,
                content: actionData.comment_content,
                to: (mode === 'REPLY_TO_COMMENT') ? targetPost.comments[targetPost.comments.length-1].author : null, 
                time: Date.now()
            });
            if(window.triggerMomentsRedDot) window.triggerMomentsRedDot(char.avatar);
        }

        // 3. 发新动态
        if (actionData.new_post_content) {
            const newMoment = {
                id: Date.now(),
                author: { name: char.name, avatar: char.avatar },
                content: actionData.new_post_content,
                time: Date.now(),
                likesList: [],
                comments: []
            };
            momentsData.unshift(newMoment);

if(window.triggerMomentsRedDot) window.triggerMomentsRedDot(char.avatar);
        }

        // 4. 保存朋友圈数据 (无论是否修改都保存一下以防万一)
        await localforage.setItem('Wx_Moments_Data', momentsData);
        if (document.getElementById('wx-page-moments') && document.getElementById('wx-page-moments').style.display === 'block') {
            if(window.renderMomentsFeed) window.renderMomentsFeed();
        }

        // 5. 处理私聊 (气泡雨 + 引用卡片)
        // 兼容旧格式：如果 AI 还是返回了 chat_message 字符串，强转为数组
        let msgsToSend = [];
        if (Array.isArray(actionData.chat_message_list)) {
            msgsToSend = actionData.chat_message_list;
        } else if (actionData.chat_message) {
            msgsToSend = [actionData.chat_message];
        }

        if (msgsToSend.length > 0) {
            // 定义发送函数，使用 async/await 模拟打字间隔
            const sendBubbleRain = async () => {
                for (let i = 0; i < msgsToSend.length; i++) {
                    const msgText = msgsToSend[i];
                    
                    // 只有第一条消息带引用卡片 (防止刷屏)
                    let quote = null;
                    if (i === 0 && mode === 'REACT_TO_USER_POST' && targetPost) {
                        quote = { 
                            type: 'moment_share', 
                            text: targetPost.content, 
                            image: targetPost.image, 
                            name: momentsHost.name, 
                            id: targetPost.id 
                        };
                    }

                    // 模拟更真实的打字时间：基础延迟 + 文字长度延迟
                    // 第一条消息稍微久一点（思考时间），后续消息快一点
                    const delay = i === 0 ? 3000 : (1000 + msgText.length * 100); 
                    
                    await new Promise(resolve => setTimeout(resolve, delay));

                    if(window.pushMsgToData) {
                        // type 传 'text'，quote 传进去，系统会自动处理为带引用的文本
                        window.pushMsgToData(chat, msgText, 'char', quote, 'text');
                    }
                }
            };
            
            // 启动发送队列 (不阻塞当前主线程)
            sendBubbleRain();
        }

    } catch (e) {
        console.error("自主意识执行失败:", e);
    }
}
window.toggleVisibilitySelector = function() {
    const overlay = document.getElementById('visibility-drawer-overlay');
    if (!overlay) return;

    if (overlay.classList.contains('active')) {
        // === 出场动画逻辑 ===
        overlay.classList.add('closing-anim');
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.classList.remove('closing-anim');
        }, 400); // 这里的 400 毫秒要和 CSS 的过渡时间一致
    } else {
        // === 入场动画逻辑 ===
        overlay.style.display = 'flex';
        overlay.offsetHeight; // 强制重绘，确保动画能跑起来
        overlay.classList.add('active');
        renderVisibilitySelector();
    }
};
function updateVisibilityLabel() {
    const label = document.getElementById('vis-label');
    if (!label) return;
    
    const total = chatsData.length;
    const selected = tempVisibleSelection.length;
    
    if (selected === total) {
        label.innerText = "All";
    } else if (selected === 0) {
        label.innerText = "Only Me";
    } else {
        label.innerText = `Selected ${selected}`;
    }
}
// ==========================================
// ★ 全局通用弹窗系统 (JS控制部分)
// ==========================================

// 1. 显示弹窗函数 (增加了 type 参数)
// 使用方法: showConfirmDialog("要删除吗？", 你的回调函数, "delete");
window.showConfirmDialog = function(message, onConfirm, type = 'normal') {
    const overlay = document.getElementById('global-confirm-modal');
    const box = overlay.querySelector('.custom-alert-box'); // 获取弹窗盒子
    const title = document.getElementById('g-confirm-title');
    const desc = document.getElementById('g-confirm-desc');
    const confirmBtn = document.getElementById('g-confirm-btn-yes');
    const cancelBtn = overlay.querySelector('.alert-btn.cancel');

    // --- A. 设置文案 ---
    desc.innerHTML = message; // 支持换行
    
    // --- B. 智能判断皮肤 (红/蓝切换) ---
    if (type === 'delete' || type === 'destructive') {
        // 红色警报模式！
        box.classList.add('destructive'); 
        title.innerText = "Warning!"; // 标题变警告
        title.style.color = "#FF3B30"; // 标题变红 (双重保险)
        confirmBtn.innerText = "Delete"; // 按钮文案
    } else {
        // 默认蓝色模式
        box.classList.remove('destructive');
        title.innerText = "Confirm";
        title.style.color = "#000"; // 标题恢复黑色
        confirmBtn.innerText = "Confirm"; // 按钮文案
    }

    // --- C. 显示弹窗 (重置动画状态) ---
    overlay.style.display = 'flex';
    box.classList.remove('closing'); // 移除退场类
    overlay.classList.remove('closing-anim'); // 移除背景退场类

    // --- D. 绑定点击事件 (核心！) ---
    
    // 确认按钮逻辑
    confirmBtn.onclick = function() {
        // 1. 先播放退场动画
        closeGlobalConfirm();
        // 2. 如果有回调函数，执行它
        if (onConfirm) {
            // 稍微延迟一下执行，或者立即执行都可以
            onConfirm(); 
        }
    };

    // 取消按钮逻辑 (覆盖默认的 onclick，确保有动画)
    cancelBtn.onclick = function() {
        closeGlobalConfirm();
    };
};

// 2. 关闭弹窗函数 (带丝滑退场动画)
window.closeGlobalConfirm = function() {
    const overlay = document.getElementById('global-confirm-modal');
    const box = overlay.querySelector('.custom-alert-box');

    // 加上 CSS 里写的那个动画类
    box.classList.add('closing'); 
    overlay.classList.add('closing-anim'); // 背景也淡出

    // 等 0.2秒 动画播完再真正隐藏
    setTimeout(() => {
        overlay.style.display = 'none';
        // 动画播完了，把类清理掉，方便下次使用
        box.classList.remove('closing'); 
        box.classList.remove('destructive'); // 顺便把红色皮肤也卸载了
        overlay.classList.remove('closing-anim');
    }, 200); // 这里的时间要跟 CSS 里的动画时间一致哦
};

// ==========================================
// ★ 多选与转发核心逻辑 (Multi-Select Core) ★
// ==========================================

let isMsgMultiSelectMode = false;
let selectedMsgIndices = [];

// 1. 开启多选模式
window.startMsgMultiSelect = function(initialIndex) {
    isMsgMultiSelectMode = true;
    selectedMsgIndices = [initialIndex]; // 默认选中长按的那一条
    document.body.classList.add('msg-multi-select-active');
    
    // 创建底部操作栏 (如果还没创建)
    if(!document.getElementById('msg-multi-bar')) {
        const bar = document.createElement('div');
        bar.id = 'msg-multi-bar';
        bar.className = 'msg-multi-bar';
        bar.innerHTML = `
            <div class="multi-act-btn" onclick="exitMsgMultiSelect()">
                <span class="icon">✕</span><span>Cancel</span>
            </div>
            <div class="multi-act-btn" onclick="handleBulkForward()">
                <span class="icon">➦</span><span>Forward</span>
            </div>
            <div class="multi-act-btn delete" onclick="handleBulkDelete()">
                <span class="icon">🗑️</span><span>Delete</span>
            </div>
        `;
        document.body.appendChild(bar);
    }
    
    // 刷新消息列表 (让勾勾显示出来)
    renderMessages(currentChatId, false);
};

// 2. 退出多选模式
window.exitMsgMultiSelect = function() {
    isMsgMultiSelectMode = false;
    selectedMsgIndices = [];
    document.body.classList.remove('msg-multi-select-active');
    renderMessages(currentChatId, false);
};

// 3. 切换单条选中状态
window.toggleMsgSelection = function(index) {
    const pos = selectedMsgIndices.indexOf(index);
    if (pos > -1) {
        selectedMsgIndices.splice(pos, 1); // 取消选中
    } else {
        selectedMsgIndices.push(index); // 选中
    }
    renderMessages(currentChatId, false); // 刷新界面
};

// 4. 批量删除
window.handleBulkDelete = function() {
    if(selectedMsgIndices.length === 0) return;
    showGlobalConfirm("Delete", `确定要删除选中的 ${selectedMsgIndices.length} 条消息吗？`, () => {
        const chat = chatsData.find(c => c.id === currentChatId);
        // 从大到小删，防止索引错乱
        selectedMsgIndices.sort((a,b) => b-a).forEach(idx => {
            chat.messages.splice(idx, 1);
        });
        saveChatAndRefresh(chat);
        exitMsgMultiSelect();
    });
};

// 5. 合并转发 (生成聊天记录卡片)
window.handleBulkForward = function() {
    if(selectedMsgIndices.length === 0) return;
    
    const chat = chatsData.find(c => c.id === currentChatId);
    const me = personasData.find(p => p.id === chat.personaId) || { name: 'User' };
    const contact = contactsData.find(c => c.id === chat.contactId) || { name: 'TA' };
    
    // 提取消息
    const selectedMsgs = selectedMsgIndices.sort((a,b) => a-b).map(idx => chat.messages[idx]);
    
    // 生成预览摘要 (前3条)
    const summary = selectedMsgs.slice(0, 3).map(m => {
        const name = (m.role === 'me' ? me.name : contact.name);
        let content = m.text || '[特殊消息]';
        if(m.type === 'sticker') content = '[表情包]';
        if(m.type === 'image') content = '[图片]';
        return `${name}: ${content.substring(0, 10)}`;
    }).join('\n');

    // 构造转发数据包
    const mergedData = {
        type: 'merged_record',
        title: `Chat History with ${contact.name}`,
        summary: summary + (selectedMsgs.length > 3 ? '\n...' : ''),
        count: selectedMsgs.length,
        msgs: selectedMsgs 
    };

    // 打开选择好友弹窗 (复用现有的选择器)
    openForwardSelectorWithData(mergedData);
};

// 6. 转发选择器 (适配版)
window.openForwardSelectorWithData = function(data) {
    const overlay = document.createElement('div');
    overlay.className = 'forward-overlay-container'; // 复用你的 iOS 动画类
    
    overlay.innerHTML = `
        <div style="height:100px; padding-top:44px; background:#fff; display:flex; align-items:center; padding:0 20px; border-bottom:1px solid #f0f0f0;">
            <div style="font-size:17px; font-weight:600;">Forward to...</div>
            <div style="margin-left:auto; color:#007aff; cursor:pointer;" onclick="this.parentNode.parentNode.remove()">Cancel</div>
        </div>
        <div id="f-list" style="flex:1; overflow-y:auto; padding-bottom:40px;"></div>
    `;
    document.body.appendChild(overlay);
    
    const list = overlay.querySelector('#f-list');
    chatsData.forEach(c => {
        const char = contactsData.find(ct => ct.id === c.contactId);
        if(!char) return;
        
        const row = document.createElement('div');
        row.className = 'forward-row-item';
        
        // 处理头像
        let avatarUrl = char.avatar || '';
        if(avatarUrl.includes('url(')) avatarUrl = avatarUrl.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
        
        row.innerHTML = `
            <div style="background-image: url('${avatarUrl}'); background-size: cover; width:40px; height:40px; border-radius:10px; margin-right:12px; background-color:#eee;"></div>
            <div>${char.name}</div>
        `;
        
        row.onclick = () => {
            showGlobalConfirm("Forward", `转发给 ${char.name} 吗？`, () => {
                // ★ 关键：发送 merged_record 类型的消息
                pushMsgToData(c, "Chat History", 'me', data, 'merged_record');
                showSystemAlert("已发送！");
                overlay.remove();
                exitMsgMultiSelect();
            });
        };
        list.appendChild(row);
    });
    
    // 触发进场动画
    setTimeout(() => overlay.classList.add('active'), 10);
};

/* ================= World Book Logic (Final Pro Version) ================= */
// 全局变量
let worldBooks = []; // 数据容器
let activeWBCategory = 'lore'; // 当前分类：'lore' 或 'game'
let currentBookId = null;
let currentEntryId = null;

// ★ 初始化：从数据库加载数据
async function initWorldBook() {
    try {
        const savedData = await localforage.getItem('kiyo_worldbooks');
        if (savedData) {
            worldBooks = savedData;
        } else {
            // 如果没数据，给个初始示例
            worldBooks = [
                {
                    id: 'wb_demo_1', title: '鹿城设定集', icon: '🌃', category: 'lore',
                    entries: [{ id: 'e_1', title: '中心城区', content: '这里是繁华的CBD...' }]
                }
            ];
        }
        console.log("📚 世界书数据加载完毕");
    } catch (e) {
        console.error("读取世界书失败", e);
    }
}

async function saveWorldBooks() {
    await localforage.setItem('kiyo_worldbooks', worldBooks);
}

// === APP 打开/关闭 (带动画) ===
function openWorldBookApp() {
    const app = document.getElementById('worldbook-app');

    app.style.display = 'flex';
    
    void app.offsetWidth; 
    
    app.classList.add('active');
    
    // 加载数据
    if(worldBooks.length === 0) initWorldBook().then(renderBookShelf);
    else renderBookShelf();
}
function closeWorldBook() {
    const app = document.getElementById('worldbook-app');
    
    app.classList.remove('active');

    setTimeout(() => {
        app.style.display = 'none';

        backToWBHome(false); 
    }, 400);
}

// === 修复后的分类切换 ===
function switchWBCategory(cat) {
    activeWBCategory = cat;

    // 1. 获取两个按钮
    const btnLore = document.getElementById('tab-lore');
    const btnGame = document.getElementById('tab-game');

    // 2. 根据 cat 切换 active 类
    if (cat === 'lore') {
        btnLore.classList.add('active');
        btnGame.classList.remove('active');
    } else {
        btnLore.classList.remove('active');
        btnGame.classList.add('active');
    }

    // 3. 重新渲染内容
    renderBookShelf();
}

// === 渲染书架 (修复索引标签 + 纯色版) ===
function renderBookShelf() {
    const list = document.getElementById('wb-books-grid');
    if (!list) return;
    list.innerHTML = '';
    
    const filteredBooks = worldBooks.filter(b => b.category === activeWBCategory);
    
    const folderSvg = `
    <svg viewBox="0 0 100 85" width="100%" height="auto" style="display:block; max-width: 90px;">
        <path d="M0,30 L0,8 Q0,0 8,0 L32,0 Q38,0 42,5 L45,11 L94,11 Q100,11 100,17 L100,30 Z" fill="#62ADE2" />
        
        <rect x="0" y="20" width="100" height="65" rx="5" ry="5" fill="#7FC5F0" />
    </svg>`;
    
    filteredBooks.forEach(book => {
        const div = document.createElement('div');
        div.className = 'wb-folder-item';
        
        div.innerHTML = `
            <div style="width: 100%; padding: 0 5px;">
                ${folderSvg}
            </div>
            <div class="wb-folder-name">${book.title}</div>
            <div class="wb-folder-count">${book.entries.length} items</div>
        `;
        
        div.onclick = () => openBookDetail(book.id);
        
        // 长按 -> 呼出底部菜单
        if (typeof bindWBLongPress === 'function') {
            bindWBLongPress(div, () => {
                 // 传入当前长按的书本对象
                 openWBContextMenu(book);
            });
        }
        
        list.appendChild(div);
    });
}

// === 打开详情页 ===
function openBookDetail(bookId) {
    currentBookId = bookId;
    const book = worldBooks.find(b => b.id === bookId);
    if (!book) return;

    // 更新标题
    const titleEl = document.getElementById('wb-detail-title');
    if(titleEl) titleEl.innerText = book.title;
    
    renderEntryList();

    // === 动画核心 ===
    const homeView = document.getElementById('wb-home-view');
    const detailView = document.getElementById('wb-detail-view');

    // 确保详情页可见
    detailView.style.display = 'flex';
    void detailView.offsetWidth; // 强制重绘

    // 执行推拉动画
    homeView.classList.add('slide-left'); // 首页左移
    detailView.classList.add('slide-in'); // 详情页右侧滑入
}

// === 渲染文件列表 (精致代码缩略图版) ===
function renderEntryList() {
    const book = worldBooks.find(b => b.id === currentBookId);
    if(!book) return;

    const list = document.getElementById('wb-entries-list');
    list.innerHTML = '';
    
    // ★ 1. 普通文本 (Text) - 极简灰线条 ★
    const docSvg = `
    <svg viewBox="0 0 60 80" width="100%" height="100%" style="padding:12px;">
        <rect x="0" y="0" width="40" height="4" rx="2" fill="#D1D1D6" />
        <rect x="0" y="10" width="55" height="4" rx="2" fill="#E5E5EA" />
        <rect x="0" y="20" width="50" height="4" rx="2" fill="#E5E5EA" />
        <rect x="0" y="30" width="55" height="4" rx="2" fill="#E5E5EA" />
        <rect x="0" y="40" width="30" height="4" rx="2" fill="#E5E5EA" />
    </svg>`;

    // ★ 2. HTML代码 (Code) - 仿 VSCode 缩略图 ★
    // 橙色、蓝色、灰色小方块模拟代码高亮
    const codeSvg = `
    <svg viewBox="0 0 60 80" width="100%" height="100%" style="padding:10px;">
        <rect x="0" y="0" width="15" height="4" rx="2" fill="#FF9500" /> <rect x="18" y="0" width="10" height="4" rx="2" fill="#E5E5EA" />
        
        <rect x="8" y="10" width="15" height="4" rx="2" fill="#FF9500" />
        
        <rect x="16" y="20" width="12" height="4" rx="2" fill="#007AFF" /> <rect x="30" y="20" width="20" height="4" rx="2" fill="#D1D1D6" />
        
        <rect x="16" y="30" width="35" height="4" rx="2" fill="#D1D1D6" />
        <rect x="16" y="40" width="25" height="4" rx="2" fill="#D1D1D6" />
        
        <rect x="8" y="50" width="15" height="4" rx="2" fill="#FF9500" />
        
        <rect x="35" y="65" width="25" height="12" rx="3" fill="#E5E5EA" />
        <text x="47.5" y="73.5" font-family="Arial" font-weight="bold" font-size="8" fill="#8E8E93" text-anchor="middle" dominant-baseline="middle">HTML</text>
    </svg>`;

    book.entries.forEach(entry => {
        const div = document.createElement('div');
        div.className = 'wb-grid-file-item';
        
        const isCode = (entry.content && entry.content.includes('<'));
        const centerIcon = isCode ? codeSvg : docSvg;
        const dateStr = new Date(entry.id).toLocaleDateString();

        div.innerHTML = `
            <div class="wb-file-paper">
                ${centerIcon}
            </div>
            <div class="wb-grid-file-name">${entry.title}</div>
            <div class="wb-grid-file-date">${dateStr}</div>
        `;
        
        div.onclick = () => openWBEditor(entry.id);
        
        if (typeof bindWBLongPress === 'function') {
            bindWBLongPress(div, () => {
                openFileContextMenu(entry);
            });
        }
        
        list.appendChild(div);
    });
}

function backToWBHome(animate = true) {
    const homeView = document.getElementById('wb-home-view');
    const detailView = document.getElementById('wb-detail-view');
    
    if (animate) {
        homeView.classList.remove('slide-left');
        detailView.classList.remove('slide-in');
        
        // 等动画播完再隐藏详情页
        setTimeout(() => {
            detailView.style.display = 'none';
        }, 350);
    } else {
        // 无动画瞬间重置 (用于关闭APP时)
        homeView.classList.remove('slide-left');
        detailView.classList.remove('slide-in');
        detailView.style.display = 'none';
    }
    
    currentBookId = null;
    renderBookShelf();
}

function openWBEditor(entryId) {
    currentEntryId = entryId;
    const book = worldBooks.find(b => b.id === currentBookId);
    
    // 填充数据
    if (entryId) {
        const entry = book.entries.find(e => e.id === entryId);
        document.getElementById('wb-input-title').value = entry.title || '';
        document.getElementById('wb-input-content').value = entry.content || '';
        document.getElementById('wb-input-keys').value = entry.keys || ''; 
    } else {
        document.getElementById('wb-input-title').value = '';
        document.getElementById('wb-input-content').value = '';
        document.getElementById('wb-input-keys').value = ''; // ★ 清空
    }

    const toggle = document.getElementById('editor-mode-toggle');
    if (toggle) toggle.style.display = (activeWBCategory === 'game') ? 'flex' : 'none';

    // 默认切回代码模式
    switchEditorMode('code');

    const overlay = document.getElementById('wb-sheet-overlay');
    if(overlay) {
        overlay.style.display = 'block';
        requestAnimationFrame(() => overlay.classList.add('active'));
    }
}

function closeWBEditor() {
    const overlay = document.getElementById('wb-sheet-overlay');
    if(overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.style.display = 'none', 300);
    }
}

function handleNewEntry() {
    openWBEditor(null);
}

// 切换 代码/预览
function switchEditorMode(mode) {
    const codeArea = document.getElementById('wb-input-content');
    const previewArea = document.getElementById('wb-preview-container');
    const btnCode = document.getElementById('edit-mode-code');
    const btnPrev = document.getElementById('edit-mode-preview');
    
    if (mode === 'code') {
        if(codeArea) codeArea.style.display = 'block';
        if(previewArea) previewArea.style.display = 'none';
        if(btnCode) btnCode.classList.add('active');
        if(btnPrev) btnPrev.classList.remove('active');
    } else {
        // 预览 HTML
        if(previewArea) {
            previewArea.innerHTML = codeArea.value; // 渲染
            previewArea.style.display = 'block';
        }
        if(codeArea) codeArea.style.display = 'none';
        if(btnCode) btnCode.classList.remove('active');
        if(btnPrev) btnPrev.classList.add('active');
    }
}

function saveWBEntry() {
    const title = document.getElementById('wb-input-title').value.trim();
    const content = document.getElementById('wb-input-content').value;
    // ★ 获取关键词 ★
    const keys = document.getElementById('wb-input-keys').value.trim();
    
    if (!title) {
        showSystemAlert("标题不能为空喔(T_T)。");
        return;
    }
    
    const book = worldBooks.find(b => b.id === currentBookId);
    
    if (currentEntryId) {
        // 更新
        const entry = book.entries.find(e => e.id === currentEntryId);
        entry.title = title;
        entry.content = content;
        entry.keys = keys; // ★ 保存 keys
    } else {
        // 新增
        book.entries.push({
            id: 'e_' + Date.now(),
            title: title,
            content: content,
            keys: keys 
        });
    }
    
    saveWorldBooks(); 
    closeWBEditor();
    renderEntryList();
    showSystemAlert("保存成功 ～");
}

// 新建文件夹
function handleNewBook() {
    if (typeof showPromptDialog === 'function') {
        showPromptDialog("New Folder", "给新文件夹起个名字吧：", (name) => {
            if (name) createBookLogic(name);
        });
    } else {
        const name = prompt("给新文件夹起个名字吧：");
        if(name) createBookLogic(name);
    }
}

function createBookLogic(name) {
    worldBooks.push({
        id: 'wb_' + Date.now(),
        title: name,
        icon: '📘',
        category: activeWBCategory, // ★ 自动归类到当前 Tab
        entries: []
    });
    saveWorldBooks();
    renderBookShelf();
}

// === ★ 通用长按监听函数 (Helper) ★ ===
function bindWBLongPress(element, callback) {
    let timer;
    const start = (e) => {
        // 触摸开始，设置定时器
        timer = setTimeout(() => {
            callback();
            // 触发后阻止默认点击
            element.setAttribute('data-longpressed', 'true'); 
        }, 800); // 800ms 算长按
    };
    
    const cancel = () => {
        clearTimeout(timer);
    };
    
    const checkClick = (e) => {
        if (element.getAttribute('data-longpressed') === 'true') {
            e.preventDefault();
            e.stopPropagation();
            element.removeAttribute('data-longpressed');
        }
    };

    // 触摸设备
    element.addEventListener('touchstart', start, {passive:true});
    element.addEventListener('touchend', cancel);
    element.addEventListener('touchmove', cancel);
    
    // 鼠标设备 (测试用)
    element.addEventListener('mousedown', start);
    element.addEventListener('mouseup', cancel);
    element.addEventListener('mouseleave', cancel);
    
    // 阻止长按触发普通点击
    element.addEventListener('click', checkClick);
}

// 启动！
initWorldBook();
// ================= Context Menu Logic (长按菜单) =================

let contextTargetBook = null; // 当前正在操作哪本书

function openWBContextMenu(book) {
    contextTargetBook = book;
    const menu = document.getElementById('wb-context-menu');
    const title = document.getElementById('wb-ctx-title');
    const list = document.getElementById('wb-ctx-options');
    
    // 1. 设置标题
    title.innerText = `Actions for "${book.title}"`;
    list.innerHTML = ''; // 清空旧选项

    // 2. ★ 动态生成“移动分组”选项 ★
    const allCategories = ['lore', 'game']; 
    
    allCategories.forEach(cat => {
        // 如果不是当前书所在的分组，就显示“移动到 xxx”
        if (cat !== book.category) {
            const btn = document.createElement('div');
            btn.className = 'wb-ctx-item';
            // 首字母大写美化一下
            const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
            btn.innerText = `Move to ${catName}`;
            btn.onclick = () => {
                moveBookCategory(book.id, cat);
            };
            list.appendChild(btn);
        }
    });

    // 3. ★ 生成删除按钮 (红色) ★
    const delBtn = document.createElement('div');
    delBtn.className = 'wb-ctx-item destructive';
    delBtn.innerText = 'Delete Folder';
    delBtn.onclick = () => {
        closeWBContextMenu(); // 先关菜单
        // 调用老公你的通用弹窗！
        window.showConfirmDialog(
            `确定要删除文件夹\n“${book.title}”吗？\n此操作不可恢复`, 
            () => {
                // 确认回调
                worldBooks = worldBooks.filter(b => b.id !== book.id);
                saveWorldBooks();
                renderBookShelf();
                // showSystemAlert("已删除"); // 可选
            }, 
            "delete" // 触发红色警报模式
        );
    };
    list.appendChild(delBtn);

    // 4. 显示菜单
    menu.style.display = 'flex';
    // 强制重绘触发动画
    requestAnimationFrame(() => menu.classList.add('active'));
}

function closeWBContextMenu() {
    const menu = document.getElementById('wb-context-menu');
    menu.classList.remove('active');
    setTimeout(() => {
        menu.style.display = 'none';
        contextTargetBook = null;
    }, 250);
}

// === 移动分组逻辑 ===
function moveBookCategory(bookId, newCategory) {
    const book = worldBooks.find(b => b.id === bookId);
    if (book) {
        book.category = newCategory;
        saveWorldBooks();
        
        closeWBContextMenu();
        
        // 刷新视图：因为移走了，所以当前列表里应该消失
        // 加一个小延时让菜单先收回去，体验更好
        setTimeout(() => {
            renderBookShelf();
            showSystemAlert(`已移动到 ${newCategory}`); // 可选
        }, 300);
    }
}
// ================= File Context Menu (文件长按菜单) =================

function openFileContextMenu(entry) {
    const menu = document.getElementById('wb-context-menu');
    const title = document.getElementById('wb-ctx-title');
    const list = document.getElementById('wb-ctx-options');
    
    // 1. 设置标题
    title.innerText = `Actions for "${entry.title}"`;
    list.innerHTML = ''; 

    // 2. ★ 移动逻辑：列出其他文件夹 ★
    // 过滤出除了当前文件夹之外的所有文件夹
    const otherBooks = worldBooks.filter(b => b.id !== currentBookId);
    
    if (otherBooks.length > 0) {
        otherBooks.forEach(book => {
            const btn = document.createElement('div');
            btn.className = 'wb-ctx-item';
            btn.innerText = `Move to "${book.title}"`; // 移动到...
            btn.onclick = () => {
                moveEntryToBook(entry.id, book.id);
            };
            list.appendChild(btn);
        });
    } else {
        // 如果没有其他文件夹，显示个灰色的提示
        const tip = document.createElement('div');
        tip.className = 'wb-ctx-item';
        tip.style.color = '#ccc';
        tip.innerText = 'No other folders to move to';
        list.appendChild(tip);
    }

    // 3. ★ 红色删除按钮 ★
    const delBtn = document.createElement('div');
    delBtn.className = 'wb-ctx-item destructive';
    delBtn.innerText = 'Delete File';
    delBtn.onclick = () => {
        closeWBContextMenu();
        // 调用你的通用删除弹窗
        window.showConfirmDialog(
            `确定要删除文件\n“${entry.title}”吗？`, 
            () => {
                const currentBook = worldBooks.find(b => b.id === currentBookId);
                currentBook.entries = currentBook.entries.filter(e => e.id !== entry.id);
                saveWorldBooks();
                renderEntryList();
            }, 
            "delete"
        );
    };
    list.appendChild(delBtn);

    // 4. 显示菜单
    menu.style.display = 'flex';
    requestAnimationFrame(() => menu.classList.add('active'));
}

// === 移动文件具体实现 ===
function moveEntryToBook(entryId, targetBookId) {
    const sourceBook = worldBooks.find(b => b.id === currentBookId);
    const targetBook = worldBooks.find(b => b.id === targetBookId);
    const entryIndex = sourceBook.entries.findIndex(e => e.id === entryId);
    
    if (entryIndex > -1 && targetBook) {
        // 1. 取出文件
        const entry = sourceBook.entries[entryIndex];
        // 2. 从源书删除
        sourceBook.entries.splice(entryIndex, 1);
        // 3. 加入目标书
        targetBook.entries.push(entry);
        
        saveWorldBooks();
        closeWBContextMenu();
        
        // 刷新界面
        renderEntryList();
        
        // 可选：给个提示
        showSystemAlert(`已移动到 ${targetBook.title}`);
    }
}
// ================= World Book Binder V2.0 (精准文件选择版) =================

function showWorldBookSelector(chat) {
    // 1. 数据迁移 (兼容旧版本：如果只有书ID，就把书里所有文件都选上)
    if (!chat.activeEntryIds) chat.activeEntryIds = [];
    if (chat.worldBookIds && chat.worldBookIds.length > 0) {
        chat.worldBookIds.forEach(bid => {
            const book = worldBooks.find(b => b.id === bid);
            if (book) {
                book.entries.forEach(e => {
                    if (!chat.activeEntryIds.includes(e.id)) chat.activeEntryIds.push(e.id);
                });
            }
        });
        chat.worldBookIds = []; // 迁移完成，清空旧数据
    }

    // 2. 创建弹窗
    const overlay = document.createElement('div');
    overlay.className = 'vis-overlay'; 
    overlay.style.display = 'flex';
    setTimeout(() => overlay.classList.add('active'), 10);
    
    const drawer = document.createElement('div');
    drawer.className = 'vis-drawer'; 
    drawer.onclick = (e) => e.stopPropagation();

    drawer.innerHTML = `
        <div class="vis-header">
            <span style="flex:1"></span>
            <span class="vis-title">Select Entries</span>
            <span class="vis-done-btn">Done</span>
        </div>
        <div id="wb-selector-list" style="overflow-y:auto; max-height:60vh; padding:0 16px 40px;"></div>
    `;
    
    const list = drawer.querySelector('#wb-selector-list');
    
    if (worldBooks.length === 0) {
        list.innerHTML = `<div style="padding:30px; text-align:center; color:#999;">空空如也...<br>先去 Browse 创建世界书吧</div>`;
    } else {
        // --- 渲染二级列表 ---
        worldBooks.forEach(book => {
            // 1. 书名 (分组头)
            const groupHeader = document.createElement('div');
            groupHeader.style.cssText = `
                padding: 16px 0 8px; font-size: 14px; font-weight: 700; color: #8E8E93;
                display: flex; align-items: center; cursor: pointer; user-select: none;
            `;
            // 计算这本书里选了几个
            const selectedCount = book.entries.filter(e => chat.activeEntryIds.includes(e.id)).length;
            const isFull = selectedCount === book.entries.length && book.entries.length > 0;
            
            groupHeader.innerHTML = `
                <span style="margin-right:6px; transition:0.2s;" class="arrow-icon">▼</span>
                <span style="flex:1;">${book.title}</span>
                <span style="font-size:12px; font-weight:normal; background:${selectedCount>0 ? '#007aff':'#eee'}; color:${selectedCount>0?'#fff':'#999'}; padding:2px 8px; border-radius:10px;">${selectedCount}/${book.entries.length}</span>
            `;
            
            // 2. 文件容器
            const entriesContainer = document.createElement('div');
            entriesContainer.style.cssText = `padding-left: 10px; margin-bottom: 10px; transition: all 0.3s ease; overflow: hidden;`;
            
            // 3. 渲染文件列表
            if (book.entries.length === 0) {
                entriesContainer.innerHTML = `<div style="padding:10px; font-size:12px; color:#ccc;">(空文件夹)</div>`;
            } else {
                book.entries.forEach(entry => {
                    const row = document.createElement('div');
                    row.style.cssText = `
                        display:flex; align-items:center; justify-content:space-between;
                        padding: 12px 0; border-bottom: 0.5px solid #f0f0f0; cursor:pointer;
                    `;
                    
                    const isChecked = chat.activeEntryIds.includes(entry.id);
                    
                    row.innerHTML = `
                        <div style="font-size:15px; color:#333;">${entry.title}</div>
                        <div class="checkmark" style="color:#007AFF; font-size:18px; display:${isChecked ? 'block' : 'none'}">✓</div>
                    `;
                    
                    // 点击勾选文件
                    row.onclick = () => {
                        if (chat.activeEntryIds.includes(entry.id)) {
                            chat.activeEntryIds = chat.activeEntryIds.filter(id => id !== entry.id);
                            row.querySelector('.checkmark').style.display = 'none';
                        } else {
                            chat.activeEntryIds.push(entry.id);
                            row.querySelector('.checkmark').style.display = 'block';
                        }
                        
                        // 实时更新头部计数
                        const newCount = book.entries.filter(e => chat.activeEntryIds.includes(e.id)).length;
                        groupHeader.children[2].innerText = `${newCount}/${book.entries.length}`;
                        groupHeader.children[2].style.background = newCount > 0 ? '#007aff' : '#eee';
                        groupHeader.children[2].style.color = newCount > 0 ? '#fff' : '#999';
                        
                        saveChatAndRefresh(chat);
                        updateControlPanelText(chat);
                    };
                    entriesContainer.appendChild(row);
                });
            }

            // 折叠/展开逻辑
            let isExpanded = true;
            groupHeader.onclick = () => {
                isExpanded = !isExpanded;
                entriesContainer.style.display = isExpanded ? 'block' : 'none';
                groupHeader.querySelector('.arrow-icon').style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)';
            };

            list.appendChild(groupHeader);
            list.appendChild(entriesContainer);
        });
    }

    // 关闭逻辑
    const closeFunc = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    };
    overlay.onclick = closeFunc;
    drawer.querySelector('.vis-done-btn').onclick = closeFunc;

    overlay.appendChild(drawer);
    document.body.appendChild(overlay);
}

// 辅助：更新控制面板上的文字
function updateControlPanelText(chat) {
    const wbNamesEl = document.getElementById('cc-wb-names');
    if (wbNamesEl) {
        const count = (chat.activeEntryIds || []).length;
        if (count === 0) {
            wbNamesEl.innerText = "Link settings to this chat";
            wbNamesEl.style.color = "#999";
        } else {
            wbNamesEl.innerText = `${count} entries active`;
            wbNamesEl.style.color = "#5856D6"; 
        }
    }
}
// ================= 模拟消息功能 (自定义弹窗版) =================

// 1. 发送图片描述
function handleSimulatedImage() {
    // 检查是否有自定义弹窗，没有则回退到原生
    if (typeof showPromptDialog === 'function') {
        showPromptDialog("发送图片", "请描述图片内容（AI能看见哦）：", (desc) => {
            if (desc && desc.trim()) {
                const chat = chatsData.find(c => c.id === currentChatId);
                pushMsgToData(chat, desc, 'me', null, 'simulated_image');
                // 关闭菜单
                const menu = document.getElementById('chat-plus-menu');
                if(menu) menu.classList.remove('active');
            }
        });
    } else {
        // 兜底原生
        const desc = prompt("【发送图片】\n请描述这张图片的内容：", "一只在晒太阳的猫咪");
        if (desc && desc.trim()) {
            const chat = chatsData.find(c => c.id === currentChatId);
            pushMsgToData(chat, desc, 'me', null, 'simulated_image');
            document.getElementById('chat-plus-menu').classList.remove('active');
        }
    }
}

// 2. 发送语音
function handleSimulatedVoice() {
    if (typeof showPromptDialog === 'function') {
        showPromptDialog("发送语音", "请输入要转换的文字内容：", (text) => {
            if (text && text.trim()) {
                const chat = chatsData.find(c => c.id === currentChatId);
                pushMsgToData(chat, text, 'me', null, 'voice');
                const menu = document.getElementById('chat-plus-menu');
                if(menu) menu.classList.remove('active');
            }
        });
    } else {
        // 兜底原生
        const text = prompt("【发送语音】\n请输入语音转换的文字：", "");
        if (text && text.trim()) {
            const chat = chatsData.find(c => c.id === currentChatId);
            pushMsgToData(chat, text, 'me', null, 'voice');
            document.getElementById('chat-plus-menu').classList.remove('active');
        }
    }
}
// 切换显示气泡下面的“翻译/描述框”
window.toggleTrans = function(el) {
    // 找到气泡容器 (.msg-bubble-container) 里的下一个兄弟元素
    const transBox = el.nextElementSibling;
    if (transBox && transBox.classList.contains('msg-translation-box')) {
        const isHidden = transBox.style.display === 'none' || transBox.style.display === '';
        transBox.style.display = isHidden ? 'block' : 'none';
    }
};
// =======================================================
// 处理 AI 对转账的操作 (收钱/退钱) - 修复回执版
// =======================================================
function handleAiTransferCommand(chat, action, transferMsg) {
    if (!transferMsg) return;

    // 1. 解析转账信息
    let extraData = {};
    try { 
        extraData = JSON.parse(transferMsg.extra); 
    } catch(e) {
        console.error("转账数据解析失败", e);
        return;
    }
    
    // 防止重复处理
    if (extraData.status !== 'pending') return; 
    
    // 2. 更新原转账消息的状态
    extraData.status = action; // 'accepted' 或 'rejected'
    transferMsg.extra = JSON.stringify(extraData);

    // 3. 退款逻辑
    if (action === 'rejected') {
        if (typeof walletData !== 'undefined') {
            const amount = parseFloat(extraData.amount || 0);
            walletData.balance += amount;
            
            // 记账
            if (walletData.bills) {
                walletData.bills.unshift({
                    type: 'income',
                    amount: amount,
                    title: '转账退回',
                    desc: `对方退回了你的转账`,
                    time: Date.now()
                });
            }
            // 保存钱包
            if (typeof saveWalletData === 'function') saveWalletData();
        }
    }

    const receiptAction = action === 'accepted' ? 'accept' : 'refund';
    const receiptText = `${receiptAction}|${extraData.amount}`;

    pushMsgToData(chat, receiptText, 'char', null, 'transfer_receipt');


    // 4. 保存与刷新
    if (typeof saveWorldBooks === 'function') saveWorldBooks();
    else if (typeof saveChats === 'function') saveChats();
    
    if (typeof renderMessages === 'function') {
        renderMessages(chat); 
    }
}