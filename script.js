// ==========================================================
// [禁止橡皮筋效果] 终极方案
// ==========================================================
document.body.addEventListener('touchmove', function(e) {
    // 检查是否在允许滚动的区域内
    let target = e.target;
    let isScrollable = false;

    // 向上遍历，寻找是否有 .scrollable 类
    while (target && target !== document.body) {
        // 如果找到了 scrollable 类
        if (target.classList && target.classList.contains('scrollable')) {
            const isAtTop = target.scrollTop <= 0;
            const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight;
            
            // 如果在顶部还要往下拉，或者在底部还要往上拉 -> 禁止（防止扯动整个页面）
            // 只有在中间滑动时，才允许
            if ((isAtTop && e.deltaY > 0) || (isAtBottom && e.deltaY < 0)) {
               // 这里其实可以稍微放宽一点，为了绝对防白边，我们严格一点：
               // 只有内容确实比容器高，才标记为可滚动
               if (target.scrollHeight > target.clientHeight) {
                   isScrollable = true;
               }
            } else {
               // 在中间滑动，允许
               isScrollable = true;
            }
            break;
        }
        target = target.parentNode;
    }

    // 如果不在可滚动区域，或者触达边缘，直接杀掉事件
    if (!isScrollable) {
        e.preventDefault();
    }
}, { passive: false });

// 修复 iOS 15+ 底部地址栏导致的高度计算问题
function fixHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', fixHeight);
fixHeight();

// ==========================================================
// [(≧∇≦)] 核心系统与记忆 (System Core)
// ==========================================================

const MEMORY_KEY = 'XuShiyu_System_Data_V5'; 

// 全局数据变量 (放在最前面，防止冲突)
let contactsData = []; // 角色列表
let personasData = []; // 我的面具列表
let chatsData = [];    // 会话列表
let creatorMode = 'character'; // 当前捏人模式: 'character' | 'persona'
let currentEditingId = null;   // 当前正在编辑的ID

// 1. 初始化数据库
localforage.config({
    driver: localforage.INDEXEDDB, 
    name: 'XuShiyu_Love_OS',
    storeName: 'memory_store'
});

// 2. 启动核心
document.addEventListener('DOMContentLoaded', () => {
    loadMemory();       // 载入记忆 (壁纸、开关等)
    startClock();       // 启动时钟
    initInteractions(); // 启动交互 (点击/编辑)
    loadAllData();      // 载入通讯录、面具、会话
    
    // 初始化设置页图标网格
    if(document.getElementById('icon-setting-grid')) initIconSettingsGrid();
});

// ==========================================================
// [数据加载] 统一加载入口
// ==========================================================
window.loadAllData = function() {
    // 1. 加载联系人 (Characters)
    localforage.getItem('Wx_Contacts_Data').then(data => {
        contactsData = data || [];
        // 默认显示全部联系人
        if(document.getElementById('contact-list-container')) {
             switchContactTab('all');
        }
    });

    // 2. 加载面具 (Personas)
    localforage.getItem('Wx_Personas_Data').then(data => {
        personasData = data || [];
    });

    // 3. 加载会话 (Chats)
    localforage.getItem('Wx_Chats_Data').then(data => {
        chatsData = data || [];
        renderChatList(); // 渲染微信首页
    });
    
    // 4. 加载API配置
    loadApiConfig();
};

// ==========================================================
// [系统] 记忆存取 (含头像同步)
// ==========================================================

function getUniqueKey(el, index, prefix) {
    if (el.id) return `ID:${el.id}`;
    return `AUTO:${prefix}_${index}`;
}

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
    const imgSelectors = '.upload-img, .app-icon, .profile-avatar, .polaroid-img, .wx-big-avatar, .wx-small-avatar, .wx-p2-header-bg, .wx-big-avatar-new, .sync-avatar';
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

function loadMemory() {
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
        if (data.images) {
            const imgSelectors = '.upload-img, .app-icon, .profile-avatar, .polaroid-img, .wx-big-avatar, .wx-small-avatar, .wx-p2-header-bg, .wx-big-avatar-new, .sync-avatar';
            document.querySelectorAll(imgSelectors).forEach((el, index) => {
                const key = getUniqueKey(el, index, 'img');
                if (data.images[key]) {
                    el.style.backgroundImage = data.images[key];
                    el.style.backgroundColor = 'transparent'; 
                    el.style.backgroundSize = 'cover';
                    el.style.backgroundPosition = 'center';
                }
            });
            // 同步头像
            const masterAvatar = document.getElementById('wx_p2_big_avatar');
            if (masterAvatar && masterAvatar.style.backgroundImage) {
                const masterBg = masterAvatar.style.backgroundImage;
                if (masterBg && masterBg !== 'none' && masterBg !== 'initial') {
                    document.querySelectorAll('.sync-avatar').forEach(avatar => {
                        avatar.style.backgroundImage = masterBg;
                    });
                }
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
    });
}

// ==========================================================
// [交互] 点击、上传、开关
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
            
            if (target.id === 'wx_small_avatar_top') return; 

            e.stopPropagation();
            handleImageUpload(target);
        }
    });

    // 焦点移开自动保存
    document.addEventListener('focusout', (e) => {
        if (e.target.classList.contains('edit-text')) {
            e.target.contentEditable = "false";
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

    // 开关变化
    document.body.addEventListener('change', (e) => {
        if (e.target.matches('.ios-switch input')) {
            if(e.target.id === 'switch_homebar') toggleHomeBar();
            if(e.target.id === 'switch_statusbar') toggleStatusBar();
            saveMemory();
        }
    });

    setTimeout(() => { toggleHomeBar(); toggleStatusBar(); }, 150);
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

// === 上传处理 ===
const hiddenInput = document.createElement('input');
hiddenInput.type = 'file';
hiddenInput.accept = 'image/*';
hiddenInput.style.display = 'none';
document.body.appendChild(hiddenInput);

let currentUploadEl = null;

window.handleImageUpload = function(element) {
    // 标记角色头像
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
            
            // 角色头像特殊处理
            if (currentUploadEl.id === 'creator-avatar') {
                 // 尝试隐藏提示文字，如果有的话
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
// [APP] 基础功能
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

// 桌面图标设置
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

// 音乐播放
let isMusicPlaying = false;
window.toggleMusic = function() {
    isMusicPlaying = !isMusicPlaying;
    const btn = document.getElementById('soda-play-btn');
    if(btn) isMusicPlaying ? btn.classList.add('playing') : btn.classList.remove('playing');
};

// ==========================================================
// [微信] 核心逻辑 (Chat / Contacts / Moments)
// ==========================================================
window.switchWxTab = function(tabName) {
    const globalHeader = document.querySelector('.wx-header');
    
    // 隐藏所有页面
    ['wx-page-chat', 'wx-page-contacts', 'wx-page-moments', 'wx-page-profile'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // 移除Tab激活
    document.querySelectorAll('.wx-tab-item').forEach(el => el.classList.remove('active'));

    // 逻辑分流
    if (tabName === 'chat') {
        if(globalHeader) globalHeader.style.display = 'flex'; 
        document.getElementById('wx-page-chat').style.display = 'block'; 
        document.querySelectorAll('.wx-tab-item')[0].classList.add('active');
        renderChatList();
    } 
    else if (tabName === 'contacts') {
        if(globalHeader) globalHeader.style.display = 'none'; // 通讯录自带标题，隐藏Header
        document.getElementById('wx-page-contacts').style.display = 'flex';
        document.querySelectorAll('.wx-tab-item')[1].classList.add('active');
        // 默认显示全部联系人
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
document.addEventListener('click', (e) => {
    const menu = document.getElementById('wx-header-menu');
    const trigger = e.target.closest('.wx-h-action-box');
    if (!trigger && menu && menu.classList.contains('active')) menu.classList.remove('active');
});

// ==========================================================
// [角色系统] Character Creator (修复版：保存退出 & 逻辑重写)
// ==========================================================

// 1. 自动调整文本框高度
window.autoResize = function(el) {
    el.style.height = 'auto'; 
    el.style.height = el.scrollHeight + 'px';
};

// 2. 核心：打开角色编辑界面 (修复版：自动切换 ME/TA 文案)
window.openCreatorPage = function(id = null) {
    const page = document.getElementById('sub-page-creator');
    if (!page) return;

    // ★ 强制显示逻辑
    page.style.display = 'flex';
    setTimeout(() => page.classList.add('active'), 10);

    // 获取需要修改文字的标签
    const infoSubtitle = page.querySelector('.exp-info-subtitle');
    const aboutTitle = page.querySelector('.exp-sec-title'); // 找 About Me 那个标题

    // 获取输入框
    const realnameInput = document.getElementById('creator-realname');
    const descInput = document.getElementById('creator-desc');
    const personaInput = document.getElementById('creator-persona');
    const hobbiesInput = document.getElementById('creator-hobbies');
    
    // 清空旧数据
    page.querySelectorAll('input, textarea').forEach(el => el.value = '');
    document.getElementById('creator-avatar').style.backgroundImage = '';
    const tip = page.querySelector('.exp-avatar-tip');
    if(tip) tip.style.display = 'block'; // 重置头像提示

    if (creatorMode === 'persona') {
        // === 模式：捏自己 (Me) ===
        // 1. 修改文案
        if(infoSubtitle) infoSubtitle.innerHTML = "The following is<br>About <b>my</b> basic information";
        if(aboutTitle) aboutTitle.innerText = "ABOUT Me";

        // 2. 修改提示词
        realnameInput.placeholder = "我的名称｜User Name";
        descInput.placeholder = "关于我 (ME) 的故事... \n例如：我出身富裕，是一个非常可爱的人！";
        personaInput.placeholder = "在这写下ME的性格设定... \n例如：温良｜高冷｜黏人｜爱撒娇🥺";
        hobbiesInput.placeholder = "在这写下ME的爱好... \n例如：听歌｜发呆｜画画｜篮球";
    } else {
        // === 模式：捏角色 (TA) ===
        // 1. 修改文案 (这里改成 TA 啦！)
        if(infoSubtitle) infoSubtitle.innerHTML = "The following is<br>About <b>TA's</b> basic information";
        if(aboutTitle) aboutTitle.innerText = "ABOUT TA";

        // 2. 修改提示词
        realnameInput.placeholder = "角色名称｜Char Name";
        descInput.placeholder = "关于TA的故事... \n例如：他or她出生富裕，是一个非常幽默的人！";
        personaInput.placeholder = "在这写下TA的性格细节... \n例如：温良｜高冷｜黏人｜爱撒娇🥺";
        hobbiesInput.placeholder = "在这写下TA的爱好... \n例如：听歌｜发呆｜画画｜篮球";
    }

    currentEditingId = id;

    // 如果是编辑模式，回填数据
    if (id) {
        const sourceData = (creatorMode === 'persona') ? personasData : contactsData;
        const c = sourceData.find(i => i.id === id);
        
        if (c) {
            document.getElementById('creator-realname').value = c.realname || '';
            document.getElementById('creator-name').value = c.name || '';
            document.getElementById('creator-alias').value = c.alias || '';
            document.getElementById('creator-height').value = c.height || '';
            document.getElementById('creator-age').value = c.age || '';
            document.getElementById('creator-bday').value = c.bday || '';
            document.getElementById('creator-gender').value = c.gender || '';
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
    
    // 自动调整高度
    page.querySelectorAll('textarea').forEach(el => autoResize(el));
};

// 3. 核心：保存功能
window.saveCharacter = function() {
    console.log("正在保存... 模式:", creatorMode);

    const elRealName = document.getElementById('creator-realname');
    const elNickName = document.getElementById('creator-name');
    const elAvatar   = document.getElementById('creator-avatar');
    
    const realname = elRealName ? elRealName.value.trim() : "";
    const nickname = elNickName ? elNickName.value.trim() : "";
    
    if (!realname && !nickname) { 
        alert('至少给个名字嘛...(T_T)！'); 
        return; 
    }

    const avatarUrl = elAvatar ? elAvatar.style.backgroundImage : "";

    const newChar = {
        id: currentEditingId || Date.now(),
        realname: realname,
        name: nickname || realname,
        alias: document.getElementById('creator-alias')?.value || "",
        height: document.getElementById('creator-height')?.value || "",
        age: document.getElementById('creator-age')?.value || "",
        mbti: document.getElementById('creator-mbti')?.value || "",
        tags: document.getElementById('creator-tags')?.value || "",
        hobbies: document.getElementById('creator-hobbies')?.value || "",
        desc: document.getElementById('creator-desc')?.value || "",
        persona: document.getElementById('creator-persona')?.value || "",
        avatar: (avatarUrl && avatarUrl !== 'none') ? avatarUrl : ''
    };

    // 分流保存
    if (creatorMode === 'persona') {
        updateList(personasData, newChar);
        localforage.setItem('Wx_Personas_Data', personasData).then(() => {
            alert('ME的面具保存成功啦！(｡･ω･｡)');
            finishCreatorAction('me');
        });
    } else {
        updateList(contactsData, newChar);
        localforage.setItem('Wx_Contacts_Data', contactsData).then(() => {
            alert('角色保存成功啦！(｡･ω･｡)～请查收你的char！');
            finishCreatorAction('all');
        });
    }
};

// 4. 辅助：保存后的收尾动作
function finishCreatorAction(tabToRefresh) {
    // 1. 刷新列表
    if (window.switchContactTab) switchContactTab(tabToRefresh);
    
    // 2. 强制关闭页面！
    const page = document.getElementById('sub-page-creator');
    if (page) {
        page.classList.remove('active');
        setTimeout(() => {
            page.style.display = 'none';
        }, 300);
    }
}

function updateList(list, item) {
    const idx = list.findIndex(c => c.id === item.id);
    if (idx !== -1) list[idx] = item;
    else list.push(item);
}

// 5. 删除功能
window.showDeleteAlert = function() {
    if (!currentEditingId) {
        finishCreatorAction(creatorMode === 'persona' ? 'me' : 'all');
        return;
    }
    document.getElementById('delete-alert-overlay').style.display = 'flex';
};

window.closeDeleteAlert = function() {
    document.getElementById('delete-alert-overlay').style.display = 'none';
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

// 6. 退出确认
window.showExitAlert = function() {
    const name = document.getElementById('creator-name').value;
    if(!name && !currentEditingId) {
        finishCreatorAction(creatorMode === 'persona' ? 'me' : 'all');
        return;
    }
    document.getElementById('custom-alert-overlay').style.display = 'flex';
};

window.closeExitAlert = function() {
    document.getElementById('custom-alert-overlay').style.display = 'none';
};

window.confirmExitAction = function() {
    closeExitAlert();
    finishCreatorAction(creatorMode === 'persona' ? 'me' : 'all');
};

// ==========================================================
// [通讯录逻辑] Tab切换与渲染
// ==========================================================

// 点击加号 -> 弹窗询问
window.openCreatorModeChoice = function() {
    document.getElementById('creator-mode-overlay').style.display = 'flex';
};

// 开始捏人
window.startCreator = function(mode) {
    creatorMode = mode; 
    document.getElementById('creator-mode-overlay').style.display = 'none';
    openCreatorPage(null); // 新建
};

// 切换 Tab (全部 vs ME)
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

function renderListItems(dataList, type) {
    const container = document.getElementById('contact-list-container');
    container.innerHTML = ''; // 清空

    if(!dataList || dataList.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:50px; color:#ccc;">Empty...</div>`;
        return;
    }
    
    [...dataList].reverse().forEach(c => {
        let bgStyle = c.avatar ? `background-image: ${c.avatar}` : 'background-color: #eee';
        const item = document.createElement('div');
        item.className = 'im-contact-card';
        item.innerHTML = `
            <div class="im-c-avatar" style='${bgStyle}'></div>
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
// [会话逻辑] 添加聊天与列表
// ==========================================================
let tempChatObj = {}; 

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

function renderSheetItem(data, clickFn) {
    const bg = data.avatar ? `background-image:${data.avatar}` : 'background-color:#eee';
    // 临时挂载点击事件
    const fnName = `tempClick_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    window[fnName] = clickFn;
    
    return `
        <div class="sheet-item" onclick="window['${fnName}']()">
            <div class="sheet-avatar" style="${bg}; background-size:cover; background-position:center;"></div>
            <div class="sheet-name">${data.name}</div>
        </div>
    `;
}

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

window.renderChatList = function() {
    const container = document.getElementById('chat-sub-view-chat');
    if(!container) return;
    container.innerHTML = '';
    
    chatsData.forEach(chat => {
        const contact = contactsData.find(c => c.id === chat.contactId);
        if (!contact) return;
        
        const bg = contact.avatar ? `background-image:${contact.avatar}` : 'background-color:#eee';
        
        const div = document.createElement('div');
        div.className = 'blink-card';
        div.innerHTML = `
            <div class="b-avatar" style="${bg}"></div>
            <div class="b-content">
                <div class="b-top"><span class="b-name">${contact.name}</span> <span class="b-time">${chat.time}</span></div>
                <div class="b-msg">${chat.lastMsg}</div>
            </div>
        `;
        div.onclick = () => enterChat(chat);
        container.appendChild(div);
    });
};

window.enterChat = function(chat) {
    const contact = contactsData.find(c => c.id === chat.contactId);
    if(contact) document.getElementById('chat-header-name').innerText = contact.name;
    
    document.getElementById('sub-page-chat-detail').style.display = 'flex';
    setTimeout(() => document.getElementById('sub-page-chat-detail').classList.add('active'), 10);
};

window.closeChatDetail = function() {
    closeSubPage('sub-page-chat-detail');
};

window.closeChatFlow = function() {
    document.getElementById('chat-flow-overlay').style.display = 'none';
};

// ==========================================================
// [系统] API 配置逻辑
// ==========================================================

let apiConfig = {
    mode: 'direct', 
    main: { host: '', key: '', model: 'gpt-4o-mini' },
    sub:  { host: '', key: '', model: 'gpt-3.5-turbo' },
    temperature: 1.0
};
let apiPresets = [];

function loadApiConfig() {
    localforage.getItem('Wx_Api_Config').then(data => {
        if (data) {
            if (data.host !== undefined) {
                apiConfig.main.host = data.host;
                apiConfig.main.key = data.key;
                apiConfig.main.model = data.model;
                apiConfig.mode = data.mode;
            } else {
                apiConfig = data;
            }
        }
        renderApiUI();
    });
    localforage.getItem('Wx_Api_Presets').then(data => {
        if (data) apiPresets = data;
        renderPresetDropdown();
    });
}

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
        if(!hostInput.value || hostInput.value.includes('openai.com')) {
             hostInput.value = googleUrl;
        }
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

// 预设逻辑
window.showSavePresetAlert = function() { document.getElementById('preset-name-overlay').style.display = 'flex'; };
window.confirmSavePreset = function() {
    const name = document.getElementById('preset-name-input').value;
    if(!name) { alert('给个名字嘛！'); return; }
    
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
        document.getElementById('preset-name-input').value = ''; 
        document.getElementById('api-preset-select').value = name;
    });
};

function renderPresetDropdown() {
    const select = document.getElementById('api-preset-select');
    select.innerHTML = '<option value="">-- 切换预设 --</option>';
    apiPresets.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.name;
        opt.innerText = p.name;
        select.appendChild(opt);
    });
}

window.loadSelectedPreset = function() {
    const name = document.getElementById('api-preset-select').value;
    if(!name) return;
    const preset = apiPresets.find(p => p.name === name);
    if(preset) {
        document.getElementById('api-main-host').value = preset.main.host;
        document.getElementById('api-main-key').value = preset.main.key;
        updateModelSelect('main', preset.main.model);
        document.getElementById('api-sub-host').value = preset.sub.host;
        document.getElementById('api-sub-key').value = preset.sub.key;
        updateModelSelect('sub', preset.sub.model);
        document.getElementById('api-temp').value = preset.temperature || 1.0;
        document.getElementById('temp-display').innerText = preset.temperature || 1.0;
    }
};

window.showDeletePresetAlert = function() {
    const name = document.getElementById('api-preset-select').value;
    if(!name) { alert('请先选择一个要删除的预设！'); return; }
    document.getElementById('preset-del-overlay').style.display = 'flex';
};

window.confirmDeletePreset = function() {
    const name = document.getElementById('api-preset-select').value;
    apiPresets = apiPresets.filter(p => p.name !== name);
    localforage.setItem('Wx_Api_Presets', apiPresets).then(() => {
        renderPresetDropdown();
        document.getElementById('preset-del-overlay').style.display = 'none';
        alert('预设已删除！');
    });
};

window.clearApiSection = function(section) {
    document.getElementById(`api-${section}-host`).value = '';
    document.getElementById(`api-${section}-key`).value = '';
};

window.fetchModels = async function(section) {
    let host = document.getElementById(`api-${section}-host`).value;
    if (!host) host = "https://generativelanguage.googleapis.com/v1beta"; 
    
    const key = document.getElementById(`api-${section}-key`).value;
    if (!key) { alert(`请先填写 ${section === 'main'?'主':'副'}API 的 Key！`); return; }
    
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "wait...";

    let baseUrl = host.replace(/\/$/, '');
    let fetchUrl = `${baseUrl}/models`;
    const isGoogle = baseUrl.includes('generativelanguage.googleapis.com');
    if (isGoogle) fetchUrl = `${baseUrl}/models?key=${key}`;

    try {
        const headers = { 'Content-Type': 'application/json' };
        if (!isGoogle) headers['Authorization'] = `Bearer ${key}`;

        const response = await fetch(fetchUrl, { method: 'GET', headers: headers });
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const data = await response.json();
        
        let models = [];
        if (data.models) models = data.models.map(m => m.name.replace('models/', '')); 
        else if (data.data) models = data.data.map(m => m.id); 
        else throw new Error('格式无法识别');

        if (models.length > 0) {
            const select = document.getElementById(`api-${section}-model`);
            select.innerHTML = ''; 
            models.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m;
                opt.innerText = m;
                select.appendChild(opt);
            });
            const prefer = models.find(m => m.includes('gemini-1.5-flash') || m.includes('gpt-4o'));
            select.value = prefer || models[0];
            alert(`拉取成功！`);
        } else {
            alert('ohno...列表为空！');
        }
    } catch (error) {
        alert("拉取失败：" + error.message);
    } finally {
        btn.innerText = originalText;
    }
};

// ==========================================================
// [修复] 加号按钮监听 (防止重复绑定)
// ==========================================================
const addBtnHandler = function(e) {
    const btn = e.target.closest('.im-add-btn');
    if (btn) {
        e.stopPropagation();
        e.preventDefault();
        
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => btn.style.transform = 'scale(1)', 100);

        if (typeof window.openCreatorModeChoice === 'function') {
            window.openCreatorModeChoice(); 
        }
    }
};

document.removeEventListener('touchend', addBtnHandler); 
document.removeEventListener('click', addBtnHandler);
document.addEventListener('touchend', addBtnHandler, { passive: false, capture: true });
document.addEventListener('click', addBtnHandler, true);

// ==========================================================
// [♪( ´▽｀)] 覆盖原生丑陋的 alert 弹窗
// ==========================================================

// 1. 定义关闭函数
window.closeSystemAlert = function() {
    const el = document.getElementById('system-alert-overlay');
    if (el) el.style.display = 'none';
};

// 2. 定义打开函数
window.showSystemAlert = function(msg) {
    const el = document.getElementById('system-alert-overlay');
    const msgEl = document.getElementById('system-alert-msg');
    
    // 如果还没把 HTML 放进去，就还是用丑的顶一下，防止报错
    if (!el || !msgEl) {
        console.warn("没找到 system-alert-overlay，请检查 index.html");
        return; 
    }

    msgEl.innerHTML = msg; // 支持一点简单的 HTML 比如换行
    el.style.display = 'flex';
};

// 3. ★ 核心魔法：劫持 window.alert
// 这样你之前代码里所有的 alert('...') 都会自动变成漂亮的弹窗！
window.alert = window.showSystemAlert;