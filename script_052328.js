// Navigation toggle for mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Portfolio filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 100);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Modal functionality
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');

// Project data
const projects = {
  project1: {
    title: 'تصميم رقمي - منزل الرعب',
    description: 'تصميم فني إبداعي يجمع بين الواقعية والخيال في مشهد مرعب ومثير، يُظهر مهارات التلاعب بالصور والإضاءة الدرامية.',
    image: 'attached_assets/FB_IMG_1754425998046_1755005498378.jpg',
    specs: ['Adobe Photoshop', 'تلاعب بالصور', 'إضاءة درامية', 'تأثيرات بصرية'],
    price: '$120',
    category: 'فنون رقمية'
  },
  project2: {
    title: 'شعار ELSAWY DESIGN المتطور',
    description: 'شعار أنيق وعصري يجمع بين البساطة والاحترافية، مصمم بألوان متدرجة رائعة تعكس الحداثة والإبداع.',
    image: 'attached_assets/ELSAWYDESIGN_20250717_034439_٠٠٠٠_1755007147885.png',
    specs: ['تصميم متجه', 'ألوان متدرجة', 'تايبوغرافيا عصرية', 'شعار احترافي'],
    price: '$85',
    category: 'تصميم الشعارات'
  },
  project7: {
    title: 'بطاقة عمل Elsawy Design',
    description: 'تصميم بطاقة عمل عصرية بتأثيرات ثلاثية الأبعاد وألوان متدرجة جذابة تعكس الاحترافية والإبداع.',
    image: 'attached_assets/E_20250717_032236_٠٠٠٠_1755007147701.png',
    specs: ['تأثيرات ثلاثية الأبعاد', 'ألوان متدرجة', 'طباعة عالية الجودة', 'تصميم عصري'],
    price: '$45',
    category: 'الهوية البصرية'
  },
  project8: {
    title: 'تصميم مطبوعة Mr Hussein Hashem',
    description: 'تصميم فني إبداعي يدمج بين النصوص العربية والإنجليزية بأسلوب عصري وجذاب مع خلفية فنية مميزة.',
    image: 'attached_assets/تم القبض على_20250803_233515_٠٠٠٠_1755005498352.png',
    specs: ['دمج النصوص', 'خلفية فنية', 'تايبوغرافيا إبداعية', 'تصميم مفاهيمي'],
    price: '$60',
    category: 'مطبوعات'
  },
  project3: {
    title: 'شعار شركة تقنية',
    description: 'شعار عصري وأنيق لشركة تطوير البرمجيات، يعكس الابتكار والتقنية الحديثة.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    specs: ['Adobe Illustrator', 'تصميم متجه', 'ألوان متعددة', 'قابل للتطبيق على جميع المنصات'],
    price: '$75',
    category: 'تصميم الشعارات'
  },
  project4: {
    title: 'هوية بصرية متكاملة',
    description: 'هوية بصرية شاملة لمطعم عربي تتضمن الشعار، القائمة، البطاقات التجارية والمطبوعات.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    specs: ['هوية متكاملة', 'دليل الاستخدام', '15 قطعة تصميم', 'ملفات مفتوحة المصدر'],
    price: '$300',
    category: 'الهوية البصرية'
  },
  project5: {
    title: 'تصميم موقع إلكتروني',
    description: 'تصميم واجهة موقع تجاري للأزياء النسائية بتصميم عصري وسهل الاستخدام.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    specs: ['تصميم متجاوب', '5 صفحات رئيسية', 'واجهة سهلة الاستخدام', 'ملفات Figma'],
    price: '$400',
    category: 'تصميم الويب'
  },
  project6: {
    title: 'منشورات سوشيال ميديا',
    description: 'تصاميم جذابة لمنصات التواصل الاجتماعي تزيد من تفاعل جمهورك وتعزز الهوية البصرية.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    specs: ['منشورات إنستغرام', 'قصص متحركة', 'تصاميم متنوعة', 'جاهز للنشر'],
    price: '$35',
    category: 'سوشيال ميديا'
  }
};

// Testimonials functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const navBtns = document.querySelectorAll('.nav-btn');

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.toggle('active', i === index);
  });
  
  navBtns.forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials
setInterval(nextTestimonial, 5000);

// Nav buttons for testimonials
navBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
  });
});

// FAQ functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all other FAQ items
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
      }
    });
    
    // Toggle current item
    item.classList.toggle('active', !isActive);
  });
});

function openProject(projectId) {
  const project = projects[projectId];
  if (!project) return;

  modalContent.innerHTML = `
    <div class="project-details">
      <h2>${project.title}</h2>
      <img src="${project.image}" alt="${project.title}">
      <p>${project.description}</p>

      <div class="project-info">
        <div class="project-specs">
          <h3>مواصفات المشروع</h3>
          <ul>
            ${project.specs.map(spec => `<li>• ${spec}</li>`).join('')}
          </ul>
          <p><strong>التصنيف:</strong> ${project.category}</p>
        </div>

        <div class="purchase-info">
          <h3>معلومات الشراء</h3>
          <div class="price">${project.price}</div>
          <p>يشمل السعر:</p>
          <ul>
            <li>• ملفات التصميم الأصلية</li>
            <li>• نسخ بصيغ متعددة</li>
            <li>• تعديل واحد مجاني</li>
            <li>• دعم فني لمدة شهر</li>
          </ul>
          <button class="purchase-btn" onclick="contactForPurchase('${projectId}')">
            اطلب الآن
          </button>
        </div>
      </div>
    </div>
  `;

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function contactForPurchase(projectId) {
  const project = projects[projectId];
  const message = `مرحباً، أريد طلب مشروع: ${project.title} - السعر: ${project.price}`;
  const whatsappUrl = `https://wa.me/201093376913?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;

    const whatsappMessage = `مرحباً، اسمي ${name}\nالبريد الإلكتروني: ${email}\nالرسالة: ${message}`;
    const whatsappUrl = `https://wa.me/201093376913?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank');

    // Reset form
    this.reset();
    alert('شكراً لتواصلك معنا! سيتم توجيهك إلى واتساب.');
  });
}

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.portfolio-item, .service-card, .stat');

  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Loading animation for images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');

  images.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });

    img.style.transition = 'opacity 0.3s ease';
    img.style.opacity = '0.7';
  });
});