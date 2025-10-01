// Utility functions
function $(q) { return document.querySelector(q) }
function $$(q) { return document.querySelectorAll(q) }

// Navigation toggle
function toggleMenu() { 
  $('#nav-links')?.classList.toggle('active') 
}

// Theme switcher (without localStorage for compatibility)
const themeBtn = $('#theme-btn')
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light')
    // Update button emoji
    themeBtn.textContent = document.body.classList.contains('light') ? '☀️' : '🌙'
  })
}

// Typewriter effect
const words = ["CS Student", "Frontend Dev", "AI Enthusiast", "Problem Solver"]
let wordIndex = 0
let charIndex = 0
let isDeleting = false

function typewriter() {
  const el = $('.typewriter')
  if (!el) return
  
  const currentWord = words[wordIndex]
  
  if (!isDeleting) {
    el.textContent = currentWord.slice(0, ++charIndex)
    
    if (charIndex === currentWord.length) {
      isDeleting = true
      setTimeout(typewriter, 1500)
      return
    }
  } else {
    el.textContent = currentWord.slice(0, --charIndex)
    
    if (charIndex === 0) {
      isDeleting = false
      wordIndex = (wordIndex + 1) % words.length
    }
  }
  
  setTimeout(typewriter, isDeleting ? 60 : 120)
}

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // Start typewriter
  typewriter()
  
  // Intersection Observer for fade-in animations
  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          fadeObserver.unobserve(entry.target) // Stop observing after animation
        }
      })
    },
    { threshold: 0.2 }
  )
  
  $$('.fade-in-up').forEach(el => fadeObserver.observe(el))
  
  // Animate skill bars
  const skillBars = $$('.skills .bar div')
  if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target
            const width = bar.dataset.width
            if (width) {
              bar.style.width = width + '%'
            }
            skillObserver.unobserve(bar)
          }
        })
      },
      { threshold: 0.5 }
    )
    
    skillBars.forEach(bar => skillObserver.observe(bar))
  }
  
  // Contact form submission
  const contactForm = $('#contact-form')
  const formStatus = $('#form-status')
  
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      
      const formData = new FormData(e.target)
      const name = formData.get('name')
      const email = formData.get('email')
      const message = formData.get('message')
      
      formStatus.textContent = 'Sending...'
      formStatus.className = 'status-sending'
      
      // Option 1: Use mailto as fallback (opens email client)
      const mailtoLink = `mailto:iamshaikhahmed07@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(email)}`
      
      // Option 2: For production, replace with your actual Formspree endpoint
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrbyqdol' // Replace with your actual ID
      
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        })
        
        if (response.ok) {
          formStatus.textContent = 'Message sent successfully! ✅'
          formStatus.className = 'status-success'
          e.target.reset()
        } else {
          // Fallback to mailto if form service fails
          formStatus.textContent = 'Opening your email client... 📧'
          formStatus.className = 'status-info'
          window.location.href = mailtoLink
        }
      } catch (error) {
        // Fallback to mailto on network error
        formStatus.textContent = 'Opening your email client... 📧'
        formStatus.className = 'status-info'
        window.location.href = mailtoLink
      }
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        formStatus.textContent = ''
        formStatus.className = ''
      }, 5000)
    })
  }
})

// Smooth scroll for anchor links
document.addEventListener('click', (e) => {
  const target = e.target.closest('a[href^="#"]')
  if (target) {
    e.preventDefault()
    const id = target.getAttribute('href')
    const element = document.querySelector(id)
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Close mobile menu if open
      const navLinks = $('#nav-links')
      if (navLinks?.classList.contains('active')) {
        navLinks.classList.remove('active')
      }
    }
  }
})