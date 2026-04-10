const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const openSidebarBtn = document.getElementById("openSidebar");
const closeSidebarBtn = document.getElementById("closeSidebar");

const setSidebarState = (shouldOpen) => {
    if (!sidebar || !overlay) {
        return;
    }
    const isVisible = Boolean(shouldOpen);
    sidebar.classList.toggle("is-visible", isVisible);
    overlay.classList.toggle("is-visible", isVisible);
    sidebar.setAttribute("aria-hidden", String(!isVisible));
    openSidebarBtn?.setAttribute("aria-expanded", String(isVisible));
    overlay.setAttribute("aria-hidden", String(!isVisible));

    if (isVisible) {
        closeSidebarBtn?.focus();
    } else {
        openSidebarBtn?.focus();
    }
};

const openSidebar = () => setSidebarState(true);
const closeSidebar = () => setSidebarState(false);

if (sidebar && overlay) {
    openSidebarBtn?.addEventListener("click", openSidebar);
    closeSidebarBtn?.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);
    sidebar.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeSidebar);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && sidebar.classList.contains("is-visible")) {
            closeSidebar();
        }
    });
}

const floatingNav = document.querySelector("[data-nav='floating']");

if (floatingNav) {
    const updateFloatingNav = () => {
        floatingNav.classList.toggle("is-scrolled", window.scrollY > 16);
    };

    updateFloatingNav();
    window.addEventListener("scroll", updateFloatingNav, { passive: true });
}

// Scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => animateOnScroll.observe(el));

    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showLoginSuccess();
        });
    }

    // Designer form handler
    const designerForm = document.getElementById('designerForm');
    if (designerForm) {
        designerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showDesignerSuccess();
        });

        // File upload handler
        const fileInput = document.getElementById('designs');
        const fileList = document.getElementById('fileList');
        if (fileInput && fileList) {
            fileInput.addEventListener('change', function() {
                const files = Array.from(this.files);
                if (files.length > 0) {
                    fileList.innerHTML = `<p style="color: #22c55e; margin-top: 0.5rem;"><i class="fas fa-check-circle"></i> ${files.length} file(s) selected</p>`;
                } else {
                    fileList.innerHTML = '';
                }
            });
        }
    }

    // Product "Add to Cart" buttons handler
    const addToCartButtons = document.querySelectorAll('.product .btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.product').querySelector('h2').textContent;
            showAddToCartPopup(productName);
        });
    });
});

// Popup functions
function showLoginSuccess() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.add('show');
    }
}

function showDesignerSuccess() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.add('show');
    }
}

function showAddToCartPopup(productName) {
    // Create popup dynamically if not exists
    let popup = document.getElementById('cartPopup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'cartPopup';
        popup.className = 'popup';
        popup.innerHTML = `
            <div class="popup-content scale-in">
                <div class="popup-icon success">✓</div>
                <h2>Added to Cart!</h2>
                <p id="cartMessage"></p>
                <button class="popup-btn" onclick="closeCartPopup()">Continue Shopping</button>
            </div>
        `;
        document.body.appendChild(popup);
    }
    
    const message = document.getElementById('cartMessage');
    if (message) {
        message.textContent = `"${productName}" has been added to your cart.`;
    }
    popup.classList.add('show');
}

function closePopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 300);
    }
}

function closeCartPopup() {
    const popup = document.getElementById('cartPopup');
    if (popup) {
        popup.classList.remove('show');
    }
}

window.openSidebar = openSidebar;
window.closeSidebar = closeSidebar;
window.closePopup = closePopup;
window.closeCartPopup = closeCartPopup;