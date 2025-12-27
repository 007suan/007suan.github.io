// ==========================================================
// 记忆系统(Infinite_Storage)
// ==========================================================
// 修复版：
// 1. 救回了丢失的括号，页面复活。
// 2. 实现了头像/昵称的三端同步 (左上角、个人页、设置页)。
// 3. 点击文字编辑时，光标自动跳到末尾。
// ==========================================================

const MEMORY_KEY = 'XuShiyu_System_Data_V4'; 

// 配置大仓库
localforage.config({
    driver: localforage.INDEXEDDB, 
    name: 'XuShiyu_Love_OS',
    storeName: 'memory_store'
});

document.addEventListener('DOMContentLoaded', () => {
    loadMemory();
    startClock();
    initInteractions();
    if(document.getElementById('icon-setting-grid')) initIconSettingsGrid();
});

// ==========================================================
// [核心] 记忆存取系统
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

    // 存图片 (包含 sync-avatar)
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

    localforage.setItem(MEMORY_KEY, data).catch(err => {
        console.error("保存失败", err);
    });
}

function loadMemory() {
    localforage.getItem(MEMORY_KEY).then(data => {
        if (!data) return;

        // 1. 恢复文字
        if (data.texts) {
            document.querySelectorAll('.edit-text').forEach((el, index) => {
                const key = getUniqueKey(el, index, 'txt');
                if (data.texts[key]) el.innerText = data.texts[key];
            });
        }

        // 2. 恢复图片
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

            // ★★★【新增修复代码】强制头像同步 ★★★
            // 加载完所有图片后，以“个人页大头像”为标准，强制覆盖其他所有同步头像
            // 这样无论历史数据怎么乱，每次打开都会统一！
            const masterAvatar = document.getElementById('wx_p2_big_avatar');
            if (masterAvatar && masterAvatar.style.backgroundImage) {
                const masterBg = masterAvatar.style.backgroundImage;
                // 只有当大头像有图时，才去覆盖别人
                if (masterBg && masterBg !== 'none' && masterBg !== 'initial') {
                    document.querySelectorAll('.sync-avatar').forEach(avatar => {
                        avatar.style.backgroundImage = masterBg;
                        avatar.style.backgroundColor = 'transparent';
                        avatar.style.backgroundSize = 'cover';
                        avatar.style.backgroundPosition = 'center';
                    });
                }
            }
        }

        // 3. 恢复开关
        if (data.switches) {
            document.querySelectorAll('.ios-switch input').forEach((el, index) => {
                const key = getUniqueKey(el, index, 'sw');
                if (data.switches[key] !== undefined) el.checked = data.switches[key];
            });
        }

        // 4. 恢复壁纸
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
// [交互] 修复版：已闭合括号，且含同步逻辑
// ==========================================================

function initInteractions() {
    // 1. 全局点击监听
    document.addEventListener('click', (e) => {
        const target = e.target;

        // --- 文字编辑逻辑 ---
        if (target.classList.contains('edit-text')) {
            if (!target.isContentEditable) {
                target.contentEditable = "true";
                target.focus();
                
                // ★★★ 魔法：把光标移动到最后面 ★★★
                if (target.innerText.length > 0) {
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(target);
                    range.collapse(false); // false 表示折叠到末尾
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
            return;
        }

        // --- 图片上传逻辑 ---
        if (target.classList.contains('upload-img') || 
            target.classList.contains('profile-avatar') || 
            target.classList.contains('polaroid-img') ||
            target.classList.contains('wx-big-avatar') || 
            target.classList.contains('wx-p2-header-bg') || 
            target.classList.contains('wx-big-avatar-new') ||
            target.classList.contains('sync-avatar')) {
            
            // 防误触：左上角小头像只跳转
            if (target.id === 'wx_small_avatar_top') return;

            e.stopPropagation();
            handleImageUpload(target);
        }
    }); // <--- 宝宝！之前就是这里丢了这个括号和分号！现在补上了！

    // 2. 焦点移开自动保存 (含文字同步)
    document.addEventListener('focusout', (e) => {
        if (e.target.classList.contains('edit-text')) {
            e.target.contentEditable = "false";
            
            // ★★★ 同步名字 ★★★
            // 如果改的是带 sync-name 的名字，就把所有 sync-name 都改成一样的
            if (e.target.classList.contains('sync-name')) {
                const newName = e.target.innerText;
                document.querySelectorAll('.sync-name').forEach(el => {
                    if (el !== e.target) el.innerText = newName;
                });
            }

            saveMemory();
        }
    });
    
    // 3. 回车键处理
    document.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('edit-text') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    });

    // 4. 开关处理
    document.body.addEventListener('change', (e) => {
        if (e.target.matches('.ios-switch input')) {
            saveMemory();
        }
    });

    // ★★★【新增】底部触控条开关逻辑 ★★★
    const homeBarSwitch = document.getElementById('switch_homebar');
    // 获取所有的 home-bar (包括全局的和设置里的)
    const homeBars = document.querySelectorAll('.home-bar');

/* script.js */

    function toggleHomeBar() {
        if (homeBarSwitch) {
            const isVisible = homeBarSwitch.checked; // 开关是否打开
            
            homeBars.forEach(bar => {
                if (isVisible) {
                    // ★ 开启状态（黑色）：要美观！
                    bar.style.backgroundColor = '#000';
                    // 移除那个“隐身模式”的类，让它回到下面去
                    bar.classList.remove('hidden-mode');
                } else {
                    // ★ 关闭状态（透明）：要好用！
                    // 加上这个类，让它自动 1.变透明 2.往上跑 3.变大
                    bar.classList.add('hidden-mode');
                }
            });
        }
    }

    // 监听开关点击
    if (homeBarSwitch) {
        homeBarSwitch.addEventListener('change', () => {
            toggleHomeBar();
            saveMemory(); // 顺便保存一下状态
        });
    }
    
    // 初始化时执行 (放在延时里，确保读取完记忆后再刷新状态)
    setTimeout(() => {
        toggleHomeBar();
    }, 150);

    // ★★★【新增】状态栏开关逻辑 ★★★
    const statusBarSwitch = document.getElementById('switch_statusbar');
    const globalStatusBar = document.getElementById('global_status_bar');

    // 定义一个切换函数
    function toggleStatusBar() {
        if (statusBarSwitch && globalStatusBar) {
            if (statusBarSwitch.checked) {
                globalStatusBar.style.display = 'flex';
            } else {
                globalStatusBar.style.display = 'none';
            }
        }
    }

    // 监听开关点击
    if (statusBarSwitch) {
        statusBarSwitch.addEventListener('change', toggleStatusBar);
    }
    
    // 初始化时执行一次 (防止刷新后状态不对)
    // 为了保险起见，我们稍微延时一点点执行，确保记忆加载完毕
    setTimeout(toggleStatusBar, 100);
}

// === 上传核心 (含图片同步) ===
const hiddenInput = document.createElement('input');
hiddenInput.type = 'file';
hiddenInput.accept = 'image/*';
hiddenInput.style.display = 'none';
document.body.appendChild(hiddenInput);

let currentUploadEl = null;

function handleImageUpload(element) {
    currentUploadEl = element;
    hiddenInput.click();
}

hiddenInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && currentUploadEl) {
        const reader = new FileReader();
        reader.onload = (evt) => {
            const url = `url(${evt.target.result})`;
            
            // ★★★ 同步头像 ★★★
            // 如果上传的是 sync-avatar，就把所有 sync-avatar 都换成这张图
            if (currentUploadEl.classList.contains('sync-avatar')) {
                document.querySelectorAll('.sync-avatar').forEach(avatar => {
                    avatar.style.backgroundImage = url;
                    avatar.style.backgroundColor = 'transparent';
                    avatar.style.backgroundSize = 'cover';
                    avatar.style.backgroundPosition = 'center';
                });
            } else {
                // 普通图片只改自己
                currentUploadEl.style.backgroundImage = url;
                currentUploadEl.style.backgroundColor = 'transparent';
                currentUploadEl.style.backgroundSize = 'cover';
                currentUploadEl.style.backgroundPosition = 'center';
            }
            
            saveMemory();
            if(window.initIconSettingsGrid) window.initIconSettingsGrid();
        };
        reader.readAsDataURL(file);
    }
    hiddenInput.value = '';
});

// ==========================================================
// [功能] APP逻辑、时钟、微信
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
    document.querySelectorAll('.app-window').forEach(win => win.style.display = 'none');
    if (document.getElementById('wx-profile-view')) {
        document.getElementById('wx-profile-view').style.display = 'none';
    }
    document.querySelectorAll('.sub-page, .sub-page-root').forEach(p => p.classList.remove('active'));
};

/* script.js - 替换原来的 switchWxTab */

window.switchWxTab = function(tabName, element) {
    // 1. 隐藏所有页面
    ['chat', 'contacts', 'moments'].forEach(t => {
        const p = document.getElementById(`wx-page-${t}`);
        if(p) p.style.display = 'none';
    });
    
    // 2. 显示目标页面
    const target = document.getElementById(`wx-page-${tabName}`);
    if(target) target.style.display = 'block';

    // 3. 底部图标高亮处理
    document.querySelectorAll('.wx-tab-item').forEach(el => el.classList.remove('active'));
    if(element) element.classList.add('active');

    // ★★★ 核心修改：控制顶部 Header 的显隐 ★★★
    // 只有在 'chat' 页面时，才显示那个复杂的 Header
    const header = document.querySelector('.wx-header');
    if (header) {
        if (tabName === 'chat') {
            header.style.display = 'flex'; // 聊天页：显示
        } else {
            header.style.display = 'none'; // 通讯录/朋友圈：隐藏
        }
    }
};

window.openWxProfile = function() {
    document.getElementById('wx-profile-view').style.display = 'flex';
};
window.closeWxProfile = function() {
    document.getElementById('wx-profile-view').style.display = 'none';
};

window.openSubPage = function(id) {
    const p = document.getElementById(id);
    if(p) p.classList.add('active');
};
window.closeSubPage = function(id) {
    const p = document.getElementById(id);
    if(p) p.classList.remove('active');
};

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

    preview.onclick = () => {
        handleImageUpload(targetRealIcon);
    };

    const txt = document.createElement('span');
    txt.innerText = labelText;
    txt.style.fontSize = '12px';
    txt.style.color = '#888';

    slot.appendChild(preview);
    slot.appendChild(txt);
    container.appendChild(slot);
}

let isMusicPlaying = false;
window.toggleMusic = function() {
    isMusicPlaying = !isMusicPlaying;
    const btn = document.getElementById('soda-play-btn');
    if(btn) {
        isMusicPlaying ? btn.classList.add('playing') : btn.classList.remove('playing');
    }
};

// ==========================================
// [新增] 微信联系人管理系统 (Persona System)
// ==========================================

let contactsData = [];

// 1. 初始化：加载联系人
function loadContacts() {
    localforage.getItem('Wx_Contacts_Data').then(data => {
        if (data) {
            contactsData = data;
            renderContactList();
        }
    });
}
// 在 DOMContentLoaded 时调用它
document.addEventListener('DOMContentLoaded', () => {
    // ... 原有的 init ...
    loadContacts(); // <--- 记得加上这句
});

// 2. 打开/关闭 添加页面
window.openAddContactPage = function() {
    document.getElementById('wx-sub-add-contact').classList.add('active');
    // 清空输入框
    document.getElementById('new-contact-name').value = '';
    document.getElementById('new-contact-desc').value = '';
    document.getElementById('new-contact-avatar').style.backgroundImage = '';
    document.getElementById('new-contact-avatar').innerText = 'Upload\nAvatar';
};

// 3. 保存新联系人
window.saveNewContact = function() {
    const name = document.getElementById('new-contact-name').value;
    const desc = document.getElementById('new-contact-desc').value;
    const avatarEl = document.getElementById('new-contact-avatar');
    let avatarUrl = avatarEl.style.backgroundImage;

    // 简单的校验
    if (!name) { alert('宝宝，给他起个名字嘛！'); return; }
    
    // 处理背景图 URL 格式
    if (!avatarUrl || avatarUrl === 'none' || avatarUrl === 'initial') {
        avatarUrl = ''; // 没图就留空，回头给默认图
    }

    const newContact = {
        id: Date.now(), // 用时间戳做唯一ID
        name: name,
        desc: desc,
        avatar: avatarUrl
    };

    contactsData.push(newContact);
    
    // 保存到本地存储
    localforage.setItem('Wx_Contacts_Data', contactsData).then(() => {
        renderContactList(); // 刷新列表
        closeSubPage('wx-sub-add-contact'); // 关闭页面
    });
};

// 4. 渲染通讯录列表
function renderContactList() {
    const container = document.getElementById('contact-list-container');
    if (!container) return;
    container.innerHTML = ''; // 清空

    contactsData.forEach(c => {
        const row = document.createElement('div');
        row.className = 'contact-row';
        row.onclick = () => { alert('下一步我们将实现点击这里直接跳转聊天！'); }; // 暂时占位

        // 如果没有头像，用默认色块
        const bgStyle = c.avatar ? `background-image: ${c.avatar}` : 'background-color: #ddd';

        row.innerHTML = `
            <div class="c-avatar-small" style="${bgStyle}"></div>
            <div class="c-info">
                <div class="c-row-name">${c.name}</div>
                <div class="c-row-desc">${c.desc || 'No bio'}</div>
            </div>
        `;
        container.appendChild(row);
    });
}

// ==========================================
// [新增] 聊天会话管理 (Chat Session System)
// ==========================================

// 1. 存储当前的聊天列表 (只存ID)
let chatSessionIds = [];

// 2. 点击星星：弹出“选择联系人”窗口
// 请去 index.html 把星星那里的 onclick 改成 onclick="openContactSelector()"
window.openContactSelector = function() {
    // 这里我们简单粗暴一点，用浏览器自带的 prompt 或者 confirm 
    // 为了美观，我们复用一下“添加联系人”那个界面，或者直接动态生成一个简单的列表
    
    // 检查有没有联系人
    if (contactsData.length === 0) {
        alert('通讯录是空的！先去 Contacts 页面捏一个人设吧！');
        return;
    }

    // 创建一个临时的遮罩层来选人
    const selectorId = 'temp-contact-selector';
    let selector = document.getElementById(selectorId);
    
    if (!selector) {
        selector = document.createElement('div');
        selector.id = selectorId;
        selector.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:2000; display:flex; justify-content:center; align-items:center; flex-direction:column;';
        document.body.appendChild(selector);
    }
    
    // 生成列表内容
    let listHtml = '<div style="background:#fff; width:80%; max-height:60%; border-radius:20px; overflow:hidden; display:flex; flex-direction:column;">';
    listHtml += '<div style="padding:15px; font-weight:bold; border-bottom:1px solid #eee; text-align:center;">Select a Friend</div>';
    listHtml += '<div style="overflow-y:auto; flex:1;">';
    
    contactsData.forEach(c => {
        const bg = c.avatar ? `background-image:${c.avatar}` : 'background-color:#eee';
        listHtml += `
            <div onclick="addToChatList(${c.id})" style="padding:15px; display:flex; align-items:center; border-bottom:1px solid #f9f9f9; cursor:pointer;">
                <div style="width:40px; height:40px; border-radius:50%; margin-right:10px; ${bg}; background-size:cover; background-position:center;"></div>
                <div>${c.name}</div>
            </div>
        `;
    });
    
    listHtml += '</div><div onclick="document.getElementById(\''+selectorId+'\').remove()" style="padding:15px; text-align:center; color:#999; border-top:1px solid #eee; cursor:pointer;">Cancel</div></div>';
    
    selector.innerHTML = listHtml;
};

// 3. 把人添加到聊天列表
window.addToChatList = function(contactId) {
    // 移除选择框
    const selector = document.getElementById('temp-contact-selector');
    if(selector) selector.remove();

    // 避免重复添加
    if (chatSessionIds.includes(contactId)) {
        // 如果已经在列表里，就直接跳转去聊天（以后做）
        // 这里暂时不做任何事，或者提示
        alert('他已经在列表里啦！');
        return;
    }

    chatSessionIds.push(contactId);
    renderChatList(); // 刷新界面
    
    // 切换回聊天页
    // 模拟点击底部的“Chat”按钮
    document.querySelector('.wx-tab-item').click();
};

// 4. 渲染消息列表
function renderChatList() {
    const container = document.getElementById('wx-page-chat');
    if (!container) return;
    container.innerHTML = ''; // 清空

    // 倒序遍历，新加的在最上面
    [...chatSessionIds].reverse().forEach(id => {
        const contact = contactsData.find(c => c.id === id);
        if (!contact) return;

        const bgStyle = contact.avatar ? `background-image: ${contact.avatar}` : 'background-color: #eee';
        
        // 生成 Blink 风格的卡片
        const card = document.createElement('div');
        card.className = 'blink-card';
        card.innerHTML = `
            <div class="b-avatar" style="${bgStyle}"></div>
            <div class="b-content">
                <div class="b-top"><span class="b-name">${contact.name}</span> <span class="b-time">Just Now</span></div>
                <div class="b-msg">Hey! I'm here. (点击开始聊天)</div>
            </div>
        `;
        // 点击卡片进入聊天（留个接口，下次做）
        card.onclick = () => { alert('下次我们做点进聊天的功能！'); };
        
        container.appendChild(card);
    });
}
