document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Simple Fade-in Animation on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to sections elements
    const animatedElements = document.querySelectorAll('.section-title, .about-text, .about-image, .room-card, .dining-text, .dining-image, .gallery-grid, .contact-info');

    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        observer.observe(el);
    });
    // Chatbot Logic
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const chatOptions = document.getElementById('chatOptions');

    const faqData = [
        { label: 'Room Prices', answer: 'Our Room Rates per night:\n• Double Room: PKR 15,000\n• Triple Room: PKR 18,000\n• Family Suite: PKR 25,000\n(Rates may vary by season)' },
        { label: 'Location', answer: 'We are located on Main Kalam Road, Bahrain, Swat. Right next to the river!' },
        { label: 'Facilities', answer: 'We offer:\n• River View Rooms\n• Free WiFi & Parking\n• 24/7 Hot Water\n• In-house Restaurant (Chinese & Local)' },
        { label: 'Contact Staff', action: 'whatsapp' }
    ];

    let isChatOpen = false;

    // Toggle Chat
    chatToggle.addEventListener('click', () => {
        isChatOpen = !isChatOpen;
        chatWindow.classList.toggle('active');
        if (isChatOpen && chatMessages.children.length === 0) {
            // Send welcome message only once
            addBotMessage("Welcome to Kuwait Continental Hotel! How can I help you today?");
            renderOptions();
        }
    });

    closeChat.addEventListener('click', () => {
        isChatOpen = false;
        chatWindow.classList.remove('active');
    });

    function addBotMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-message';
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user-message';
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function renderOptions() {
        chatOptions.innerHTML = '';
        faqData.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.innerText = option.label;
            btn.addEventListener('click', () => handleOptionClick(option));
            chatOptions.appendChild(btn);
        });
    }

    function handleOptionClick(option) {
        addUserMessage(option.label);

        if (option.action === 'whatsapp') {
            setTimeout(() => {
                addBotMessage("Connecting you to our staff on WhatsApp...");
                setTimeout(() => {
                    window.open('https://wa.me/923456881617', '_blank');
                }, 1000);
            }, 500);
        } else {
            setTimeout(() => {
                addBotMessage(option.answer);
            }, 500);
        }
    }
});
