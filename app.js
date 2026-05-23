/* ==========================================================================
   Otlobly (اطلبلي) - Real-time Core Javascript Application Logic
   ========================================================================== */

// --- Constant Menu & App Configuration ---
const APP_CONFIG = {
    restaurant: {
        name: "ويشا (Wisha)",
        phone: "0123456789",
        items: [
            { id: "foul", name_ar: "فول", name_en: "Foul", price: 15, icon: "fa-bowl-food" },
            { id: "taameya", name_ar: "طعمية", name_en: "Taameya", price: 15, icon: "fa-circle" },
            { id: "potatoes", name_ar: "بطاطس محمرة", name_en: "French Fries", price: 20, icon: "fa-cookie-bite" }
        ]
    }
};

// --- Translation Dictionary (Flawless Bilingual Support) ---
const TRANSLATIONS = {
    ar: {
        "app-title": "اطلبلي",
        "app-tagline": "منسق الفطار الذكي في العمل",
        "status-disconnected": "غير متصل بقاعدة البيانات",
        "status-connected": "متصل بـ Supabase ✅",
        "welcome-title": "أهلاً بك في اطلبلي! 👋",
        "welcome-subtitle": "تجميع طلبات الفطار وتزامنها لحظياً مع زملائك.",
        "supabase-help": "التطبيق يعمل بقاعدة بيانات Supabase الخاصة بك لخصوصية تامة وبدون تكاليف. يرجى إدخال إعدادات الاتصال الخاصة بمشروعك للبدء.",
        "configure-now": "تهيئة الاتصال بقاعدة البيانات",
        "setup-title": "افتح أوردر فطار جديد",
        "setup-subtitle": "ابدأ جلسة فطار اليوم ودع زملائك يضيفون طلباتهم بأنفسهم!",
        "label-host-name": "اسمك (المنسّق):",
        "label-restaurant": "المطعم:",
        "restaurant-note": "* الأدمن فقط يحدد المطعم. حالياً تم ضبط \"ويشا\" كخيار افتراضي.",
        "label-delivery": "تكلفة التوصيل (ج.م):",
        "btn-open-order": "فتح الأوردر وبدء الاستقبال 🚀",
        "join-title": "طلب فطار مفتوح! 🎉",
        "label-your-name": "اكتب اسمك للمشاركة معهم:",
        "btn-join": "معاكم 🙋‍♂️",
        "session-active-badge": "جاري الطلب...",
        "menu-select-items": "اضغط على الأصناف لإضافتها لطلبك:",
        "cart-title": "طلباتك الحالية",
        "cart-subtotal": "إجمالي الأصناف:",
        "cart-delivery-note": "التوصيل (مقسم بالعد):",
        "btn-finish": "خلصت الأوردر بتاعي ✅",
        "waiting-host-msg": "تم حفظ طلبك! في انتظار المنسق ليقفل الأوردر ويحسب الحساب...",
        "btn-copy-link": "نسخ رابط المشاركة للزملاء",
        "coworkers-status-title": "حالة الزملاء المشتركين",
        "live-aggregation-title": "تجميع الأوردر اللحظي",
        "btn-close-order": "قفل الأوردر وحساب التوصيل 🔒",
        "close-action-note": "* بالضغط على الزر، سيتم غلق الاستقبال وتوجيه الجميع فوراً لصفحة الحساب التفصيلية.",
        "receipt-title": "قُفِل الأوردر! 🔒",
        "receipt-subtitle": "إليك ملخص طلبك وقيمة حسابك شاملة مصاريف التوصيل:",
        "receipt-delivery-share": "نصيبك من التوصيل (موزع بالعد):",
        "receipt-total-due": "المبلغ الإجمالي المطلوب منك:",
        "how-to-pay": "كيف تدفع للمنسق؟",
        "btn-back-home": "الرجوع للرئيسية / بدء أوردر جديد",
        "host-closed-title": "تم إغلاق الأوردر بنجاح! 🍽️",
        "host-closed-subtitle": "ملخص المكالمة لتطلب من مطعم ويشا ومتابعة حسابات الزملاء:",
        "call-restaurant-header": "اتصل بالمطعم لتسجيل الطلب",
        "restaurant-name-label": "مطعم ويشا",
        "call-note": "املهم الطلبات المجمعة التالية دفعة واحدة:",
        "grouped-items-title": "الأصناف المجمعة للطلب:",
        "btn-copy": "نسخ الطلب المجمع",
        "personal-order-header": "طلبك الشخصي:",
        "payments-tracker-title": "دفتر تحصيل الحسابات",
        "collected-total-label": "إجمالي المبلغ المحصل:",
        "col-name": "الزميل",
        "col-order": "الطلب",
        "col-due": "الحساب المطلـوب",
        "col-status": "الحالة",
        "drawer-help": "يرجى نسخ رابط الـ Project URL ومفتاح الـ Anon Key من لوحة تحكم Supabase الخاصة بك لتهيئة التطبيق.",
        "btn-save-credentials": "حفظ وتنشيط الاتصال",
        "sql-setup-header": "هل تحتاج لإنشاء الجداول؟",
        "sql-setup-note": "لقد أنشأنا ملف setup_supabase.sql في مجلد المشروع، انسخه والصقه في الـ SQL Editor لتجهيز الجداول في ثوانٍ!"
    },
    en: {
        "app-title": "Otlobly",
        "app-tagline": "Smart workplace breakfast coordinator",
        "status-disconnected": "Database Disconnected",
        "status-connected": "Supabase Connected ✅",
        "welcome-title": "Welcome to Otlobly! 👋",
        "welcome-subtitle": "Collect breakfast orders and sync them in real-time with your colleagues.",
        "supabase-help": "This application uses your private Supabase database for 100% privacy and zero cost. Please input your connection credentials to begin.",
        "configure-now": "Configure Database Connection",
        "setup-title": "Start a New Breakfast Session",
        "setup-subtitle": "Start today's order and let coworkers join and add their items!",
        "label-host-name": "Your Name (Host):",
        "label-restaurant": "Restaurant:",
        "restaurant-note": "* Only the host sets the restaurant. Wisha is selected by default.",
        "label-delivery": "Delivery Fee (EGP):",
        "btn-open-order": "Open Order & Receive 🚀",
        "join-title": "Breakfast Order is Open! 🎉",
        "label-your-name": "Enter your name to join:",
        "btn-join": "Join 🙋‍♂️",
        "session-active-badge": "Ordering Active...",
        "menu-select-items": "Click on items to add to your order:",
        "cart-title": "Your Current Items",
        "cart-subtotal": "Items Total:",
        "cart-delivery-note": "Delivery (split equally):",
        "btn-finish": "I'm Done Ordering ✅",
        "waiting-host-msg": "Your order is saved! Waiting for the host to close intake and calculate totals...",
        "btn-copy-link": "Copy Share Link for Coworkers",
        "coworkers-status-title": "Coworkers Status List",
        "live-aggregation-title": "Grouped Order Preview",
        "btn-close-order": "Close Order & Split Delivery 🔒",
        "close-action-note": "* Closing the order halts intake and pushes final receipt calculations to everyone immediately.",
        "receipt-title": "Order Closed! 🔒",
        "receipt-subtitle": "Here is your order summary and your total split bill details:",
        "receipt-delivery-share": "Your delivery share (split equally):",
        "receipt-total-due": "Total Amount Owed:",
        "how-to-pay": "How to pay the host?",
        "btn-back-home": "Back to Home / New Order",
        "host-closed-title": "Order Closed Successfully! 🍽️",
        "host-closed-subtitle": "Call the restaurant to order and track coworker payments:",
        "call-restaurant-header": "Call Restaurant to Order",
        "restaurant-name-label": "Wisha Restaurant",
        "call-note": "Read these aggregated totals to them:",
        "grouped-items-title": "Grouped Items for Call:",
        "btn-copy": "Copy Grouped Order",
        "personal-order-header": "Your Personal Items:",
        "payments-tracker-title": "Coworker Debts Ledger",
        "collected-total-label": "Total Cash Collected:",
        "col-name": "Coworker",
        "col-order": "Order Details",
        "col-due": "Amount Due",
        "col-status": "Status",
        "drawer-help": "Copy the Project URL and Anon Key from your Supabase dashboard project settings.",
        "btn-save-credentials": "Save & Activate Connection",
        "sql-setup-header": "Need to setup database?",
        "sql-setup-note": "We created setup_supabase.sql in the project root directory. Copy and paste it in your Supabase SQL Editor!"
    }
};

// --- Application Core Reactive State ---
const state = {
    currentLanguage: "ar", // default to Arabic
    supabase: null,
    credentials: { 
        url: "https://dokvzfetsgxcdntdqrks.supabase.co", 
        key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRva3Z6ZmV0c2d4Y2RudGRxcmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NTE4OTgsImV4cCI6MjA5NTEyNzg5OH0.wBuLYz71k2BLa4cS7kU4X5EQrrCnLUHyzIp6i4vHzoA" 
    },
    session: null,         // Active sessions record
    user: {
        role: "",          // 'host' or 'coworker'
        name: "",
        id: "",            // Coworker order ID in DB
    },
    cart: {},              // Local items dictionary { item_id: qty }
    coworkers: [],         // Array of order records in active session
    realtimeChannels: []   // Reference to open subscriptions
};

// --- Application Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initLanguage();
    loadCredentials();
    checkUrlForSession();
    setupLanguageSwitcher();
});

// --- Language Controller & Translation Swapper ---
function initLanguage() {
    const savedLang = localStorage.getItem("otlobly_lang");
    if (savedLang) {
        state.currentLanguage = savedLang;
    }
    applyLanguage();
}

function setupLanguageSwitcher() {
    const langBtn = document.getElementById("lang-switch");
    langBtn.addEventListener("click", () => {
        state.currentLanguage = state.currentLanguage === "ar" ? "en" : "ar";
        localStorage.setItem("otlobly_lang", state.currentLanguage);
        applyLanguage();
        renderMenu(); // Re-render menu cards with updated item names
    });
}

function applyLanguage() {
    const html = document.documentElement;
    const langLabel = document.querySelector(".lang-label");
    
    if (state.currentLanguage === "ar") {
        html.setAttribute("lang", "ar");
        html.setAttribute("dir", "rtl");
        langLabel.textContent = "EN";
    } else {
        html.setAttribute("lang", "en");
        html.setAttribute("dir", "ltr");
        langLabel.textContent = "عربي";
    }
    
    // Scan DOM for elements with data-tr attribute and translate
    document.querySelectorAll("[data-tr]").forEach(element => {
        const key = element.getAttribute("data-tr");
        if (TRANSLATIONS[state.currentLanguage][key]) {
            element.textContent = TRANSLATIONS[state.currentLanguage][key];
        }
    });

    // Translate dynamic placeholders in forms
    const hostInput = document.getElementById("host-name");
    const coworkerInput = document.getElementById("coworker-name");
    if (hostInput) hostInput.placeholder = state.currentLanguage === "ar" ? "مثال: أحمد، سارة..." : "e.g., Ahmed, Sarah...";
    if (coworkerInput) coworkerInput.placeholder = state.currentLanguage === "ar" ? "مثال: عمر، نادين..." : "e.g., Omar, Nadine...";
}

// --- Screen Router Engine ---
function showScreen(screenId) {
    document.querySelectorAll("section.card").forEach(card => {
        card.classList.remove("active-screen");
    });
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add("active-screen");
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Credentials & Connection Handler ---
function loadCredentials() {
    // Credentials are hardcoded! Initialize connection immediately.
    initSupabase();
}

function initSupabase() {
    try {
        state.supabase = supabase.createClient(state.credentials.url, state.credentials.key);
        updateConnectionBadge(true);
        showScreen("screen-setup");
    } catch (err) {
        console.error("Failed to connect to Supabase: ", err);
        updateConnectionBadge(false);
        showScreen("screen-credentials");
    }
}

function saveCredentials() {
    const url = document.getElementById("supabase-url").value.trim();
    const key = document.getElementById("supabase-key").value.trim();
    
    if (!url || !key) {
        showAlertModal(
            state.currentLanguage === "ar" ? "حقول فارغة" : "Required Fields",
            state.currentLanguage === "ar" ? "يرجى تعبئة كلا الحقلين للاستمرار." : "Please fill in both fields to proceed."
        );
        return;
    }
    
    localStorage.setItem("otlobly_sb_url", url);
    localStorage.setItem("otlobly_sb_key", key);
    
    state.credentials.url = url;
    state.credentials.key = key;
    
    closeConfig();
    initSupabase();
}

function updateConnectionBadge(isConnected) {
    const badge = document.getElementById("connection-badge");
    const badgeText = document.getElementById("badge-text");
    
    badge.className = isConnected ? "badge badge-connected" : "badge badge-disconnected";
    badgeText.setAttribute("data-tr", isConnected ? "status-connected" : "status-disconnected");
    badgeText.textContent = TRANSLATIONS[state.currentLanguage][isConnected ? "status-connected" : "status-disconnected"];
}

function openConfig() {
    document.getElementById("config-drawer").classList.add("open");
}

function closeConfig() {
    document.getElementById("config-drawer").classList.remove("open");
}

// --- Active Session Tracker (Host & Join Router) ---
async function checkUrlForSession() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session");
    
    if (sessionId && state.supabase) {
        // A session query exists, load it from Supabase
        await loadSharedSession(sessionId);
    }
}

async function loadSharedSession(sessionId) {
    try {
        const { data, error } = await state.supabase
            .from("sessions")
            .select("*")
            .eq("id", sessionId)
            .single();
            
        if (error || !data) {
            console.error("Session not found", error);
            showAlertModal(
                state.currentLanguage === "ar" ? "جلسة غير موجودة" : "Session Expired",
                state.currentLanguage === "ar" ? "عذراً، أوردر الفطار هذا غير موجود أو تم حذفه." : "Sorry, this breakfast order session was not found."
            );
            window.history.replaceState({}, document.title, window.location.pathname);
            showScreen("screen-setup");
            return;
        }
        
        state.session = data;
        
        // Handle screen state based on active session status
        if (data.status === "closed") {
            // Already closed, we cannot join.
            if (state.user.role === "host") {
                await loadClosedDashboard();
            } else {
                showCoworkerClosedReceipt(data);
            }
        } else {
            // Session is open! Route coworker to join form
            state.user.role = "coworker";
            
            // Set dynamic invite message
            const inviteText = document.getElementById("join-invite-text");
            const restaurantText = APP_CONFIG.restaurant.name;
            inviteText.innerHTML = state.currentLanguage === "ar" ?
                `دعاك <strong>${data.host_name}</strong> للمشاركة في أوردر فطار من مطعم <strong>${restaurantText}</strong>.` :
                `<strong>${data.host_name}</strong> invited you to join a breakfast order from <strong>${restaurantText}</strong>.`;
                
            showScreen("screen-join");
            subscribeToSessionChanges(sessionId);
        }
    } catch (err) {
        console.error("Error loading session:", err);
    }
}

// --- Real-time Realtime Subscriptions ---
function subscribeToSessionChanges(sessionId) {
    // Clear old channels
    unsubscribeAll();
    
    const sessionChannel = state.supabase
        .channel(`session-${sessionId}`)
        .on("postgres_changes", {
            event: "UPDATE",
            schema: "public",
            table: "sessions",
            filter: `id=eq.${sessionId}`
        }, payload => {
            const updatedSession = payload.new;
            state.session = updatedSession;
            
            // If session was closed, coworkers must be pushed to checkout receipt immediately!
            if (updatedSession.status === "closed" && state.user.role === "coworker") {
                loadReceiptForCoworker();
            }
        })
        .subscribe();
        
    state.realtimeChannels.push(sessionChannel);
}

function unsubscribeAll() {
    state.realtimeChannels.forEach(ch => {
        state.supabase.removeChannel(ch);
    });
    state.realtimeChannels = [];
}

// --- Action 1: Create Session (Host Setup) ---
async function handleCreateSession(event) {
    event.preventDefault();
    if (!state.supabase) {
        showAlertModal(
            state.currentLanguage === "ar" ? "تنبيه" : "Alert",
            state.currentLanguage === "ar" ? "يرجى ربط قاعدة بيانات Supabase أولاً." : "Please connect your Supabase database first."
        );
        openConfig();
        return;
    }
    
    const hostName = document.getElementById("host-name").value.trim();
    const deliveryFee = parseFloat(document.getElementById("delivery-fee").value);
    
    if (!hostName) return;
    
    // Disable create button
    const btn = document.getElementById("btn-create-session");
    btn.disabled = true;
    
    try {
        const { data, error } = await state.supabase
            .from("sessions")
            .insert({
                host_name: hostName,
                restaurant_name: "ويشا",
                delivery_fee: deliveryFee,
                phone_number: APP_CONFIG.restaurant.phone,
                status: "open"
            })
            .select()
            .single();
            
        if (error) throw error;
        
        state.session = data;
        state.user.role = "host";
        state.user.name = hostName;
        
        // Add Host as the first participant implicitly in orders list
        const { data: hostOrder, error: orderErr } = await state.supabase
            .from("orders")
            .insert({
                session_id: data.id,
                coworker_name: hostName,
                status: "ordering",
                items: []
            })
            .select()
            .single();
            
        if (orderErr) throw orderErr;
        
        state.user.id = hostOrder.id;
        
        // Append session to URL for sharing
        const shareUrl = `${window.location.origin}${window.location.pathname}?session=${data.id}`;
        window.history.pushState({ path: shareUrl }, '', shareUrl);
        
        // Show host real-time dashboard and start real-time listeners
        setupHostDashboard();
        
    } catch (err) {
        console.error("Failed to start session:", err);
        showAlertModal(
            state.currentLanguage === "ar" ? "فشل فتح الأوردر" : "Error opening order",
            err.message
        );
        btn.disabled = false;
    }
}

// --- Action 2: Join Session (Coworker Join) ---
async function handleJoinSession(event) {
    event.preventDefault();
    if (!state.session) return;
    
    const coworkerName = document.getElementById("coworker-name").value.trim();
    if (!coworkerName) return;
    
    try {
        // Create an entry in orders for this coworker
        const { data, error } = await state.supabase
            .from("orders")
            .insert({
                session_id: state.session.id,
                coworker_name: coworkerName,
                status: "ordering",
                items: []
            })
            .select()
            .single();
            
        if (error) throw error;
        
        state.user.name = coworkerName;
        state.user.id = data.id;
        state.user.role = "coworker";
        state.cart = {};
        
        // Setup Coworker Ordering Screen
        document.getElementById("display-coworker-name").textContent = coworkerName;
        document.getElementById("menu-restaurant-title").textContent = 
            state.currentLanguage === "ar" ? "مطعم ويشا - قائمة الطعام" : "Wisha Restaurant - Menu";
            
        renderMenu();
        updateCartUi();
        
        // Hide waiting screens or menus
        document.getElementById("menu-waiting-status").style.display = "none";
        document.getElementById("menu-items-container").style.pointerEvents = "auto";
        document.getElementById("btn-finish-order").style.display = "flex";
        
        showScreen("screen-menu");
        
    } catch (err) {
        console.error("Failed to join session:", err);
        showAlertModal(
            state.currentLanguage === "ar" ? "فشل الانضمام" : "Join Error",
            err.message
        );
    }
}

// --- Action 3: Interactive Ordering & Cart Engine ---
function renderMenu() {
    const container = document.getElementById("menu-items-container");
    container.innerHTML = "";
    
    APP_CONFIG.restaurant.items.forEach(item => {
        const itemBtn = document.createElement("button");
        itemBtn.className = "menu-item-btn";
        itemBtn.type = "button";
        itemBtn.onclick = () => addToCart(item.id);
        
        const count = state.cart[item.id] || 0;
        const countBadge = count > 0 ? `<span class="item-counter-badge">${count}</span>` : "";
        const itemName = state.currentLanguage === "ar" ? item.name_ar : item.name_en;
        
        itemBtn.innerHTML = `
            ${countBadge}
            <i class="fa-solid ${item.icon} item-icon"></i>
            <span class="item-name">${itemName}</span>
            <span class="item-price">${item.price} EGP</span>
        `;
        
        container.appendChild(itemBtn);
    });
}

function addToCart(itemId) {
    state.cart[itemId] = (state.cart[itemId] || 0) + 1;
    renderMenu();
    updateCartUi();
    pushCartToDatabase();
}

function removeFromCart(itemId) {
    if (state.cart[itemId]) {
        state.cart[itemId]--;
        if (state.cart[itemId] === 0) {
            delete state.cart[itemId];
        }
        renderMenu();
        updateCartUi();
        pushCartToDatabase();
    }
}

function updateCartUi() {
    const list = document.getElementById("cart-list");
    list.innerHTML = "";
    
    let subtotal = 0;
    
    Object.keys(state.cart).forEach(itemId => {
        const item = APP_CONFIG.restaurant.items.find(i => i.id === itemId);
        const qty = state.cart[itemId];
        const cost = item.price * qty;
        subtotal += cost;
        const itemName = state.currentLanguage === "ar" ? item.name_ar : item.name_en;
        
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <span class="cart-item-name">${itemName}</span>
                <span class="cart-item-calc"><span class="highlight-val">${qty}</span> x ${item.price} = <span class="highlight-val">${cost}</span> EGP</span>
            </div>
            <div class="cart-item-actions">
                <button class="btn-remove-qty" onclick="removeFromCart('${itemId}')" title="حذف">
                    <i class="fa-solid fa-minus"></i>
                </button>
            </div>
        `;
        list.appendChild(cartItem);
    });
    
    document.getElementById("cart-total-val").textContent = `${subtotal} EGP`;
    
    // Estimate delivery splits
    const totalPeople = Math.max(1, state.coworkers.length);
    const estimatedSplit = (state.session.delivery_fee / totalPeople).toFixed(2);
    document.getElementById("cart-delivery-split-estimated").textContent = 
        state.currentLanguage === "ar" ? 
            `~ ${estimatedSplit} ج.م (لعدد ${totalPeople} أفراد)` : 
            `~ ${estimatedSplit} EGP (for ${totalPeople} people)`;
}

// Push local cart status to Supabase dynamically (throttled/immediate)
async function pushCartToDatabase() {
    if (!state.supabase || !state.user.id) return;
    
    // Format cart to json array of objects
    const itemsDb = Object.keys(state.cart).map(itemId => {
        const item = APP_CONFIG.restaurant.items.find(i => i.id === itemId);
        return {
            id: itemId,
            name_ar: item.name_ar,
            name_en: item.name_en,
            price: item.price,
            quantity: state.cart[itemId]
        };
    });
    
    try {
        await state.supabase
            .from("orders")
            .update({
                items: itemsDb,
                updated_at: new Date()
            })
            .eq("id", state.user.id);
    } catch (err) {
        console.error("Cart DB sync failed:", err);
    }
}

// --- Action 4: Coworker done ordering ---
async function handleFinishOrder() {
    if (!state.supabase || !state.user.id) return;
    
    try {
        const { error } = await state.supabase
            .from("orders")
            .update({
                status: "done"
            })
            .eq("id", state.user.id);
            
        if (error) throw error;
        
        // Toggle UI ordering panel to waiting screen
        document.getElementById("menu-items-container").style.pointerEvents = "none";
        document.getElementById("btn-finish-order").style.display = "none";
        document.getElementById("menu-waiting-status").style.display = "flex";
        
    } catch (err) {
        console.error("Finish order error:", err);
    }
}

// --- Host Dashboard Controller (Real-time tracking of coworkers) ---
async function setupHostDashboard() {
    showScreen("screen-host-dashboard");
    
    // Load coworkers first
    await fetchSessionOrders();
    
    // Start listening to PG changes for coworker orders updates!
    const orderChannel = state.supabase
        .channel(`orders-${state.session.id}`)
        .on("postgres_changes", {
            event: "*",
            schema: "public",
            table: "orders",
            filter: `session_id=eq.${state.session.id}`
        }, async (payload) => {
            // Re-fetch or re-evaluate local list on any order insert/update/delete
            await fetchSessionOrders();
        })
        .subscribe();
        
    state.realtimeChannels.push(orderChannel);
    
    // Also enable personal ordering for host alongside hosting!
    // Since host wants to place their order too, let's inject a "Quick Host Order Panel" directly.
    // Host can join their own session as Ahmed. We created this in hostOrder.
    // They can order by opening the menu in a separate tab, or we can provide a shortcut. 
    // To make it easy, hosts can simply order via a separate window/tab of the same share link!
}

async function fetchSessionOrders() {
    try {
        const { data, error } = await state.supabase
            .from("orders")
            .select("*")
            .eq("session_id", state.session.id)
            .order("updated_at", { ascending: true });
            
        if (error) throw error;
        
        state.coworkers = data;
        
        // Re-render trackers and aggregations
        renderHostDashboardTrackers();
    } catch (err) {
        console.error("Fetch orders failed:", err);
    }
}

function renderHostDashboardTrackers() {
    const listContainer = document.getElementById("host-coworkers-list");
    listContainer.innerHTML = "";
    
    const aggregatedPreview = document.getElementById("host-aggregated-preview");
    aggregatedPreview.innerHTML = "";
    
    const groupCounts = {};
    
    state.coworkers.forEach(coworker => {
        // 1. Render status tracker rows
        const isDone = coworker.status === "done";
        const statusClass = isDone ? "status-done" : "status-ordering";
        const statusText = isDone ? 
            (state.currentLanguage === "ar" ? "✅ خلص" : "✅ Done") : 
            (state.currentLanguage === "ar" ? "📝 بيختار..." : "📝 Ordering...");
            
        const row = document.createElement("div");
        row.className = "coworker-status-row";
        row.innerHTML = `
            <span class="coworker-name-label"><strong>${coworker.coworker_name}</strong></span>
            <span class="status-indicator ${statusClass}">${statusText}</span>
        `;
        listContainer.appendChild(row);
        
        // 2. Accumulate items for live preview
        coworker.items.forEach(item => {
            if (!groupCounts[item.id]) {
                groupCounts[item.id] = {
                    name_ar: item.name_ar,
                    name_en: item.name_en,
                    price: item.price,
                    quantity: 0
                };
            }
            groupCounts[item.id].quantity += item.quantity;
        });
    });
    
    // 3. Render aggregated previews
    Object.keys(groupCounts).forEach(itemId => {
        const group = groupCounts[itemId];
        const itemName = state.currentLanguage === "ar" ? group.name_ar : group.name_en;
        
        const aggCard = document.createElement("div");
        aggCard.className = "agg-item";
        aggCard.innerHTML = `
            <div class="agg-details">
                <span class="agg-name">${itemName}</span>
                <span class="agg-price">${group.price} EGP / صنف</span>
            </div>
            <span class="agg-qty">${group.quantity}</span>
        `;
        aggregatedPreview.appendChild(aggCard);
    });
    
    // Update local cart preview context if Host's order is active
    const hostPersonalOrder = state.coworkers.find(c => c.coworker_name === state.user.name);
    if (hostPersonalOrder) {
        state.user.id = hostPersonalOrder.id;
        // Keep host cart state matching database
        state.cart = {};
        hostPersonalOrder.items.forEach(it => {
            state.cart[it.id] = it.quantity;
        });
    }
}

function copyShareLink() {
    const shareUrl = `${window.location.origin}${window.location.pathname}?session=${state.session.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
        showAlertModal(
            state.currentLanguage === "ar" ? "نسخ الرابط" : "Link Copied",
            state.currentLanguage === "ar" ? "تم نسخ رابط الأوردر بنجاح! أرسله لزملائك لينضموا إليك." : "Share link copied! Send it to your coworkers."
        );
    });
}

// --- Action 5: Close Session & Split Delivery Fee ---
async function handleCloseSession() {
    if (!state.session || !state.supabase) return;
    
    const uncompletedCoworkers = state.coworkers.filter(c => c.status !== "done");
    
    // If some coworkers haven't finished, confirm before closing
    if (uncompletedCoworkers.length > 0) {
        const confirmMsg = state.currentLanguage === "ar" ? 
            `هناك زملاء لم ينتهوا بعد (${uncompletedCoworkers.map(c=>c.coworker_name).join(', ')}). هل أنت متأكد من إغلاق الأوردر وتقسيم الحساب الآن؟` :
            `Some coworkers are still ordering (${uncompletedCoworkers.map(c=>c.coworker_name).join(', ')}). Are you sure you want to close and calculate now?`;
            
        if (!confirm(confirmMsg)) return;
    }
    
    try {
        const { error } = await state.supabase
            .from("sessions")
            .update({
                status: "closed"
            })
            .eq("id", state.session.id);
            
        if (error) throw error;
        
        // Pull closed dashboard views
        await loadClosedDashboard();
        
    } catch (err) {
        console.error("Close session error:", err);
    }
}

// --- Coworker Receipt Screen (Closed View) ---
async function loadReceiptForCoworker() {
    unsubscribeAll(); // Stop active listeners since session is closed
    
    try {
        const { data, error } = await state.supabase
            .from("orders")
            .select("*")
            .eq("id", state.user.id)
            .single();
            
        if (error) throw error;
        
        // Re-load the session details to get the final delivery split count
        const { data: updatedSession, error: sErr } = await state.supabase
            .from("sessions")
            .select("*")
            .eq("id", state.session.id)
            .single();
            
        if (sErr) throw sErr;
        
        state.session = updatedSession;
        showCoworkerClosedReceipt(data);
        
    } catch (err) {
        console.error("Load receipt failed:", err);
    }
}

async function showCoworkerClosedReceipt(coworkerOrder) {
    showScreen("screen-coworker-receipt");
    
    // Fetch total active orders in session to split delivery
    const { data: allOrders, error } = await state.supabase
        .from("orders")
        .select("id")
        .eq("session_id", state.session.id);
        
    const countPeople = error || !allOrders ? 1 : allOrders.length;
    const deliverySplit = state.session.delivery_fee / countPeople;
    
    // Render item details
    const list = document.getElementById("coworker-receipt-items");
    list.innerHTML = "";
    
    let foodCost = 0;
    
    coworkerOrder.items.forEach(item => {
        const itemName = state.currentLanguage === "ar" ? item.name_ar : item.name_en;
        const totalItemCost = item.price * item.quantity;
        foodCost += totalItemCost;
        
        const row = document.createElement("div");
        row.className = "receipt-item";
        row.innerHTML = `
            <span>${itemName} <span class="receipt-item-qty">x ${item.quantity}</span></span>
            <span class="highlight-val">${totalItemCost} EGP</span>
        `;
        list.appendChild(row);
    });
    
    const finalTotal = foodCost + deliverySplit;
    
    document.getElementById("receipt-subtotal-val").textContent = `${foodCost} EGP`;
    document.getElementById("receipt-delivery-val").textContent = `${deliverySplit.toFixed(2)} EGP`;
    document.getElementById("receipt-total-val").textContent = `${finalTotal.toFixed(2)} EGP`;
    
    // Update dynamic text details
    const payInstruct = document.getElementById("payment-host-details");
    payInstruct.innerHTML = state.currentLanguage === "ar" ?
        `يرجى دفع الحساب للمنسق <strong>(${state.session.host_name})</strong> بقيمة <strong class="highlight-val">${finalTotal.toFixed(2)} ج.م</strong> نقداً أو عبر المحفظة الإلكترونية / إنستاباي.` :
        `Please pay your due share to the host <strong>(${state.session.host_name})</strong> of <strong class="highlight-val">${finalTotal.toFixed(2)} EGP</strong> in cash or via mobile cash / InstaPay.`;
}

// --- Host Final Checkout Dashboard (Receipts list, Payments Tracker) ---
async function loadClosedDashboard() {
    unsubscribeAll(); // Stop active session listeners
    showScreen("screen-host-closed");
    
    // Fetch all orders in the closed session
    const { data: orders, error } = await state.supabase
        .from("orders")
        .select("*")
        .eq("session_id", state.session.id);
        
    if (error) {
        console.error("Failed to load checkout details:", error);
        return;
    }
    
    state.coworkers = orders;
    
    const totalPeople = orders.length;
    const deliverySplit = state.session.delivery_fee / totalPeople;
    
    // 1. Dynamic Phone hotline
    const phoneEl = document.getElementById("restaurant-phone-val");
    phoneEl.textContent = APP_CONFIG.restaurant.phone;
    phoneEl.href = `tel:${APP_CONFIG.restaurant.phone}`;
    
    // 2. Generate aggregated orders text box
    const groupCounts = {};
    orders.forEach(ord => {
        ord.items.forEach(it => {
            if (!groupCounts[it.id]) {
                groupCounts[it.id] = {
                    name_ar: it.name_ar,
                    name_en: it.name_en,
                    quantity: 0
                };
            }
            groupCounts[it.id].quantity += it.quantity;
        });
    });
    
    let textSummary = "";
    Object.keys(groupCounts).forEach(itemId => {
        const group = groupCounts[itemId];
        const name = state.currentLanguage === "ar" ? group.name_ar : group.name_en;
        textSummary += `• ${group.quantity} x ${name}\n`;
    });
    
    if (!textSummary) {
        textSummary = state.currentLanguage === "ar" ? "لم يطلب أحد أي أصناف!" : "No items ordered!";
    }
    
    document.getElementById("host-aggregated-final").textContent = textSummary;
    
    // 3. Render host's personal order summary
    const hostOrder = orders.find(ord => ord.coworker_name === state.user.name);
    const personalBox = document.getElementById("host-personal-order-list");
    personalBox.innerHTML = "";
    
    if (hostOrder && hostOrder.items.length > 0) {
        hostOrder.items.forEach(it => {
            const name = state.currentLanguage === "ar" ? it.name_ar : it.name_en;
            const li = document.createElement("div");
            li.style.fontSize = "13.5px";
            li.innerHTML = `• ${name} <strong class="highlight-val">x ${it.quantity}</strong> (${it.price * it.quantity} EGP)`;
            personalBox.appendChild(li);
        });
    } else {
        personalBox.textContent = state.currentLanguage === "ar" ? "لم تطلب لنفسك أي طعام 😢" : "No personal items ordered.";
    }
    
    // 4. Render coworkers debts checklist and payments table
    renderPaymentsLedger(deliverySplit);
}

function renderPaymentsLedger(deliverySplit) {
    const tbody = document.getElementById("host-payments-tbody");
    tbody.innerHTML = "";
    
    let totalSessionOwed = 0;
    let totalCollected = 0;
    
    state.coworkers.forEach(coworker => {
        let foodCost = 0;
        coworker.items.forEach(it => {
            foodCost += it.price * it.quantity;
        });
        
        const dueBill = foodCost + deliverySplit;
        totalSessionOwed += dueBill;
        
        if (coworker.paid) {
            totalCollected += dueBill;
        }
        
        const orderSummaryText = coworker.items.length > 0 ? 
            coworker.items.map(it => `${state.currentLanguage === "ar" ? it.name_ar : it.name_en} (${it.quantity})`).join(", ") : 
            "-";
            
        const isPaid = coworker.paid;
        const btnClass = isPaid ? "btn-status-toggle paid" : "btn-status-toggle unpaid";
        const btnText = isPaid ? 
            (state.currentLanguage === "ar" ? "<i class='fa-solid fa-circle-check'></i> دفع" : "<i class='fa-solid fa-circle-check'></i> Paid") :
            (state.currentLanguage === "ar" ? "<i class='fa-solid fa-circle-xmark'></i> مدفعش" : "<i class='fa-solid fa-circle-xmark'></i> Unpaid");
            
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${coworker.coworker_name}</strong></td>
            <td><span style="font-size:12px; color:var(--text-muted);">${orderSummaryText}</span></td>
            <td><span class="debt-col-val highlight-val">${dueBill.toFixed(2)} EGP</span></td>
            <td>
                <button class="${btnClass}" onclick="togglePaymentStatus('${coworker.id}', ${coworker.paid})">
                    ${btnText}
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Update progress numbers and progress bar
    document.getElementById("payment-progress-label").textContent = `${totalCollected.toFixed(2)} / ${totalSessionOwed.toFixed(2)} EGP`;
    
    const percentage = totalSessionOwed > 0 ? (totalCollected / totalSessionOwed) * 100 : 0;
    document.getElementById("payment-progress-bar").style.width = `${percentage}%`;
}

async function togglePaymentStatus(orderId, currentPaidStatus) {
    if (!state.supabase) return;
    
    try {
        const { error } = await state.supabase
            .from("orders")
            .update({
                paid: !currentPaidStatus
            })
            .eq("id", orderId);
            
        if (error) throw error;
        
        // Re-calculate session totals
        await loadClosedDashboard();
        
    } catch (err) {
        console.error("Toggle payment status failed:", err);
    }
}

function copyAggregatedText() {
    const text = document.getElementById("host-aggregated-final").textContent;
    const header = `📋 طلبات الفطار المجمعة من مطعم ويشا:\n\n`;
    navigator.clipboard.writeText(header + text).then(() => {
        showAlertModal(
            state.currentLanguage === "ar" ? "نسخ الملخص" : "Copy Summary",
            state.currentLanguage === "ar" ? "تم نسخ الطلب المجمع بنجاح! يمكنك لصقه وإرساله للمطعم في مكالمة أو واتساب." : "Grouped orders copied! Paste to send to restaurant."
        );
    });
}

// --- System Resets & Utilities ---
function resetApp() {
    // Reset browser address queries
    window.history.replaceState({}, document.title, window.location.origin + window.location.pathname);
    
    // Reset state
    unsubscribeAll();
    state.session = null;
    state.user.role = "";
    state.user.name = "";
    state.user.id = "";
    state.cart = {};
    state.coworkers = [];
    
    // Go to setup screen
    showScreen("screen-setup");
}

// --- Alert Modal Controls ---
function showAlertModal(title, message) {
    document.getElementById("alert-title").textContent = title;
    document.getElementById("alert-message").textContent = message;
    document.getElementById("alert-modal").classList.add("open");
}

function closeAlertModal() {
    document.getElementById("alert-modal").classList.remove("open");
}
