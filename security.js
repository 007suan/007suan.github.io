/* ======================================================
   ☁️ Supabase 云端验证逻辑 (Doris专属版)
   ====================================================== */

// 1. 你的云端地址 (我已经帮你填好了，不用动！)
const SUPABASE_URL = "https://ngdyidywcrnkpibssgvw.supabase.co"; 

// 2. ★★★ 你的钥匙 (请把那个 sb_publishable 开头的长串粘贴在引号里！) ★★★
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nZHlpZHl3Y3Jua3BpYnNzZ3Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1MjkzODYsImV4cCI6MjA4NjEwNTM4Nn0.5BdxUs2p3v4nAzY2BEEDn0dj0WIHKUXVvIBRfw5UgsQ"; 


// 3. 页面一加载，保安就开始工作
window.addEventListener('DOMContentLoaded', () => {
    // 检查口袋里有没有“通行证”
    if (localStorage.getItem('site_activated') === 'true') {
        // 有证！直接把门拆了
        const gate = document.getElementById('activation-gate');
        if(gate) gate.remove();
        document.body.style.overflow = 'auto'; // 允许滚动
    } else {
        // 没证！锁死，不许动
        document.body.style.overflow = 'hidden';
    }
});

// 4. 点击“立即解锁”按钮时触发
async function checkActivation() {
    const input = document.getElementById('activation-input');
    const errorMsg = document.getElementById('gate-error');
    const btn = document.querySelector('.gate-btn');
    const userCode = input.value.trim(); // 拿到用户输入的码

    if (!userCode) return;

    // 按钮变灰，防止重复点
    btn.innerText = "Wait a moment...";
    btn.disabled = true;
    errorMsg.style.display = 'none';

    try {
        // --- 第一步：去云端查这个码是否存在 ---
        // 翻译：去 activation_codes 表，找 code 等于 userCode 的那一千行
        const queryUrl = `${SUPABASE_URL}/rest/v1/activation_codes?code=eq.${userCode}&select=*`;
        
        const response = await fetch(queryUrl, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        
        const data = await response.json();

        // 如果 data 是空的，说明没这个码
        if (data.length === 0) {
            throw new Error("无效的激活码");
        }
        
        const codeInfo = data[0]; // 拿到这个码的信息

        // --- 第二步：检查这个码是不是被人用过了 ---
        if (codeInfo.is_used === true) {
            throw new Error("此激活码已被使用！请获取新的哦。");
        }

        // --- 第三步：验证通过！把它标记为“已使用” (焚毁) ---
        const updateUrl = `${SUPABASE_URL}/rest/v1/activation_codes?id=eq.${codeInfo.id}`;
        
        await fetch(updateUrl, {
            method: 'PATCH', // 修改
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ is_used: true }) // 打开“已使用”开关
        });

        // --- 第四步：放行 ---
        // 发给用户一张永久通行证，下次不用输了
        localStorage.setItem('site_activated', 'true');
        
        // 播放个动画让门消失
        const gate = document.getElementById('activation-gate');
        gate.style.transition = 'opacity 0.5s ease';
        gate.style.opacity = '0';
        setTimeout(() => gate.remove(), 500);
        document.body.style.overflow = 'auto';
        
        alert(`欢迎就餐！激活码 ${userCode} 将会失效～`);

    } catch (error) {
        // 如果出错了
        errorMsg.style.display = 'block';
        errorMsg.innerText = error.message || "网络连接失败";
        input.style.border = "2px solid #ff3b30";
        
        // 恢复按钮
        btn.innerText = "立即解锁";
        btn.disabled = false;
    }
}
