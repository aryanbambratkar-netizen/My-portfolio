/* ==========================================================================
   ARYAN BAMBRATKAR - PORTFOLIO SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Progress Bar
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }

    // Navbar Scroll Background Change
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // 2. Mobile Menu Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        if (navToggle) navToggle.innerHTML = '☰';
      });
    });
  }

  // 3. Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href*=${sectionId}]`);

      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });

  // 4. Reveal Animations on Scroll
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));

  // 5. Interactive Growth Quote Generator
  const quotes = [
    "\"Right now, I'm just building myself—one skill, one mistake, one experience, and one day at a time.\"",
    "\"I don't have everything figured out yet. Maybe that's okay.\"",
    "\"I know I still have a long way to go. But I also know I'm not going to stay the same person forever.\"",
    "\"Sometimes even a simple concept feels difficult. But I keep asking questions until I understand it.\"",
    "\"I want to become better—not just academically, but as a person. Confident, disciplined, and independent.\"",
    "\"I know I'm trying. Every small step counts towards the future self I want to be proud of.\""
  ];

  let currentQuoteIndex = 0;
  const quoteText = document.getElementById('interactive-quote');
  const nextBtn = document.getElementById('next-quote-btn');

  if (quoteText && nextBtn) {
    nextBtn.addEventListener('click', () => {
      quoteText.style.opacity = '0';
      setTimeout(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        quoteText.textContent = quotes[currentQuoteIndex];
        quoteText.style.opacity = '1';
      }, 300);
    });
    // Add smooth transition for quote text
    quoteText.style.transition = 'opacity 0.3s ease';
  }

  // 6. Subtle Glow Follower Effect
  const glowOrbs = document.querySelectorAll('.glow-orb');
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    glowOrbs.forEach((orb, idx) => {
      const factor = (idx + 1) * 15;
      orb.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
    });
  });
});
fetch("/api/about")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message
      })
    });

    const data = await response.json();

    document.getElementById("formMessage").textContent = data.message;

    contactForm.reset();

  } catch (error) {
    console.error("Error:", error);
    document.getElementById("formMessage").textContent =
      "Something went wrong.";
  }
});
// Ask Anything About Me
const askButton = document.getElementById("askButton");
const questionInput = document.getElementById("question");
const answerBox = document.getElementById("answer");

askButton.addEventListener("click", function () {
  const question = questionInput.value.toLowerCase().trim();

  if (question === "") {
    answerBox.textContent = "Please ask me something about Aryan.";
    return;
  }

  let answer = "";

  if (question.includes("who is aryan") || question.includes("about aryan")) {
    answer = "Aryan Bambratkar is a Computer Technology student who is interested in technology, programming, fitness and personal growth.";
  }
  else if (question.includes("study") || question.includes("college")) {
    answer = "Aryan studies Computer Technology at Yeshwantrao Chavan College of Engineering (YCCE).";
  }
  else if (question.includes("where") && question.includes("live")) {
    answer = "Aryan is from Nagpur, Maharashtra.";
  }
  else if (question.includes("hobby") || question.includes("hobbies")) {
    answer = "Aryan enjoys working out, cycling, playing cricket, watching web series, listening to music, discovering hiking spots and spending time in nature.";
  }
  else if (question.includes("interest") || question.includes("interested")) {
    answer = "Aryan is interested in programming, web development, technology, fitness and learning new skills.";
  }
  else if (question.includes("personality") || question.includes("describe aryan")) {
    answer = "Aryan describes himself as calm, friendly, loyal, supportive and responsible. He values discipline, honesty, respect and personal growth.";
  }
  else if (question.includes("goal") || question.includes("future")) {
    answer = "Aryan's goal is to keep improving himself, develop strong technical skills and build useful projects.";
  }
  else if (question.includes("gym") || question.includes("fitness")) {
    answer = "Fitness is an important part of Aryan's routine. He enjoys working out and focuses on maintaining discipline.";
  }
  else {
    answer = "I don't have that information about Aryan yet. Try asking about his college, hobbies, interests, personality or goals.";
  }

  answerBox.textContent = answer;
});