import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Gokul_Portfolio';
  emailForm!: FormGroup;
  isMenuOpen = false;
  isSending = false;
  typeofProjects: string[] = ['All', 'Websites', 'Apps'];
  selectedType: string = 'All';
  projects: any[] = [];
  message: string = '';
  isShowingToast: boolean = false;

  isDarkMode = false;
  highlights: string[] = [
    'Healthcare and IoT dashboards with real-time data',
    'Reusable Angular components and clean architecture',
    'Cross-platform mobile apps with Ionic, shipped to Play Store'
  ];

  stats: any[] = [
    { value: '4+', label: 'Years Experience', icon: 'ri-briefcase-line', gradient: 'from-purple-500 to-purple-900' },
    { value: '7', label: 'Web Projects', icon: 'ri-global-line', gradient: 'from-sky-500 to-indigo-800' },
    { value: '5', label: 'Mobile Apps', icon: 'ri-smartphone-line', gradient: 'from-emerald-500 to-teal-800' },
    { value: '10+', label: 'Technologies', icon: 'ri-stack-line', gradient: 'from-orange-500 to-red-700' }
  ];
  works: any[] = [
    {
      icon: 'ri-shopping-cart-2-line',
      category: 'Web App',
      title: 'E-commerce Platform',
      description: 'Responsive store with dynamic product listings, cart and a smooth checkout flow.',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS'],
      type: 'Personal project',
      gradient: 'from-orange-500 to-red-700',
      link: ''
    },
    {
      icon: 'ri-graduation-cap-line',
      category: 'Web App',
      title: 'Learning Management System',
      description: 'Modern LMS interface with interactive course modules and real-time feedback.',
      tags: ['Angular', 'REST API', 'Bootstrap'],
      type: 'Professional work',
      gradient: 'from-indigo-500 to-blue-800',
      link: ''
    },
    {
      icon: 'ri-heart-pulse-line',
      category: 'Dashboard',
      title: 'Healthcare Dashboard',
      description: 'Real-time dashboards with dynamic charts and intelligent monitoring alerts.',
      tags: ['Angular', 'Charts', 'REST API'],
      type: 'Professional work',
      gradient: 'from-rose-500 to-red-800',
      link: ''
    },
    {
      icon: 'ri-cpu-line',
      category: 'Dashboard',
      title: 'IoT Solutions',
      description: 'Live device data visualised with interactive charts and performance tracking.',
      tags: ['Angular', 'WebSockets', 'Charts'],
      type: 'Professional work',
      gradient: 'from-teal-500 to-emerald-800',
      link: ''
    },
    {
      icon: 'ri-code-s-slash-line',
      category: 'Frontend',
      title: 'Static & SPA Development',
      description: 'Static websites and advanced single-page applications built from scratch.',
      tags: ['HTML', 'Tailwind CSS', 'Angular'],
      type: 'Personal projects',
      gradient: 'from-purple-500 to-purple-900',
      link: ''
    },
    {
      icon: 'ri-smartphone-line',
      category: 'Mobile App',
      title: 'Mobile Applications',
      description: 'Full apps from UI design to Play Store deployment.',
      tags: ['Ionic', 'Firebase', 'Android'],
      type: 'Play Store',
      gradient: 'from-sky-500 to-indigo-800',
      link: ''
    }
  ];
  features: any[] = [
    {
      icon: 'devicon-angularjs-plain',
      title: 'Angular',
      heading: 'Scalable Web Apps',
      description: 'Component-driven SPAs with RxJS, routing and clean architecture.',
      gradient: 'from-red-600 to-red-950'
    },
    {
      icon: 'devicon-react-plain',
      title: 'React.js',
      heading: 'Component-Based UI',
      description: 'Reusable components and hooks for modern frontends.',
      gradient: 'from-sky-500 to-sky-950'
    },
    {
      icon: 'devicon-javascript-plain',
      title: 'JavaScript',
      heading: 'Dynamic Interfaces',
      description: 'Modern ES6+ for fast, interactive user experiences.',
      gradient: 'from-yellow-500 via-yellow-700 to-yellow-950'
    },
    {
      icon: 'devicon-typescript-plain',
      title: 'TypeScript',
      heading: 'Type-Safe Code',
      description: 'Strongly typed, maintainable and bug-resistant logic.',
      gradient: 'from-blue-600 to-indigo-950'
    },
    {
      icon: 'devicon-ionic-original',
      title: 'Ionic',
      heading: 'Cross-Platform Mobile',
      description: 'Hybrid iOS and Android apps from a single codebase.',
      gradient: 'from-indigo-500 to-indigo-950'
    },
    {
      icon: 'devicon-html5-plain',
      title: 'HTML5',
      heading: 'Semantic Markup',
      description: 'Accessible, SEO-friendly page structure.',
      gradient: 'from-orange-500 to-orange-950'
    },
    {
      icon: 'devicon-css3-plain',
      title: 'CSS3',
      heading: 'Responsive Styling',
      description: 'Flexbox, Grid and animations for pixel-perfect layouts.',
      gradient: 'from-blue-500 to-blue-950'
    },
    {
      icon: 'devicon-nodejs-plain',
      title: 'Node.js',
      heading: 'Server-Side JavaScript',
      description: 'Fast, event-driven backends and API services.',
      gradient: 'from-lime-600 to-green-950'
    },
    {
      icon: 'devicon-express-original',
      title: 'Express.js',
      heading: 'REST API Development',
      description: 'Routing, middleware and clean API endpoints.',
      gradient: 'from-zinc-600 to-zinc-950'
    },
    {
      icon: 'devicon-mongodb-plain',
      title: 'MongoDB',
      heading: 'NoSQL Database',
      description: 'Flexible document storage with schemas and aggregation.',
      gradient: 'from-emerald-500 to-emerald-950'
    },
    {
      icon: 'devicon-mysql-plain',
      title: 'MySQL',
      heading: 'Relational Database',
      description: 'Structured data, joins and optimized queries.',
      gradient: 'from-blue-600 to-slate-950'
    },
    {
      icon: 'devicon-bootstrap-plain',
      title: 'Bootstrap',
      heading: 'Rapid UI Building',
      description: 'Grid system and ready components for quick layouts.',
      gradient: 'from-purple-600 to-purple-950'
    },
    {
      icon: 'devicon-tailwindcss-original',
      title: 'Tailwind CSS',
      heading: 'Utility-First Design',
      description: 'Consistent, custom UI with built-in dark mode.',
      gradient: 'from-cyan-500 to-cyan-950'
    },
    {
      icon: 'devicon-androidstudio-plain',
      title: 'Android Studio',
      heading: 'Native Android Builds',
      description: 'Build, debug and package Android apps.',
      gradient: 'from-green-500 to-teal-950'
    },
    {
      icon: 'devicon-xcode-plain',
      title: 'Xcode',
      heading: 'iOS App Development',
      description: 'Build, test and ship iOS apps with Apple\'s toolchain.',
      gradient: 'from-blue-400 to-indigo-950'
    }
  ];

  allProjects: any[] = [
    {
      id: 1,
      name: "QuickKing",
      category: "Websites",
      title: "Booking & Ride Platform",
      link: "https://quickking.netlify.app",
      image: "assets/projects/quickking_logo.webp",
      tech: ["Angular", "Tailwind CSS"],
      description: "A responsive ride booking platform with clean UI and smooth user experience.",
      github: null,
      playStore: null,
      apkLink: null
    },
    {
      id: 2,
      name: "Gokul Govindaraj - Portfolio",
      category: "Websites",
      title: "Personal Developer Portfolio",
      link: "https://itsggokul.netlify.app",
      image: "assets/projects/glogo.webp",
      tech: ["Angular", "Tailwind CSS"],
      description: "Modern developer portfolio showcasing skills, projects, and experience.",
      github: null,
      playStore: null,
      apkLink: null
    },
    {
      id: 3,
      name: "Gbuy",
      category: "Apps",
      title: "E-Commerce Application",
      link: null,
      image: "assets/projects/gbuy_logo.webp",
      tech: ["Ionic Angular"],
      description: "Cross-platform e-commerce mobile app built using Ionic framework.",
      github: null,
      playStore: null,
      apkLink: "assets/apks/Gbuy.apk"
    },
    {
      id: 4,
      name: "Expenslytic",
      category: "Apps",
      title: "Expense Tracker",
      link: "https://expenslytic.vercel.app",
      image: "assets/projects/expenslytic.webp",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
      description: "A full-stack expense management application built with the MERN stack to track income and expenses, manage categories, view monthly summaries, and analyze spending through interactive dashboards.",
      github: null,
      playStore: null,
      apkLink: null
    }
  ];

  constructor(private fb: FormBuilder) {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
  }

  ngOnInit() {
    this.isDarkMode = true;
    this.applyTheme();
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true, // animation only once
    });

    this.emailForm = this.fb.group({
      fname: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      lname: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      subject: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
    this.projects = [...this.allProjects]; // load all projects initially

    const consent = localStorage.getItem('cookieConsent');

    if (!consent) {
      this.showBanner = true;
      return;
    }

    try {
      const data = JSON.parse(consent);
      this.analyticsEnabled = data.analytics;
    } catch {
      localStorage.removeItem('cookieConsent');
      this.showBanner = true;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  // Getter for easy access in template
  get f() {
    return this.emailForm.controls;
  }

  toastType: 'success' | 'error' = 'success';
  emailSubmit(): void {

    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      this.showToast('error', 'Please fill all required fields.');
      return;
    }

    this.isSending = true;

    const formData = new FormData();
    formData.append("First Name", this.emailForm.value.fname);
    formData.append("Last Name", this.emailForm.value.lname);
    formData.append("Subject", this.emailForm.value.subject);
    formData.append("Email", this.emailForm.value.email);
    formData.append("Message", this.emailForm.value.message);
    formData.append("_captcha", "false");
    formData.append("_template", "table");

    fetch("https://formsubmit.co/gokulgovindaraj44@gmail.com", {
      method: "POST",
      body: formData
    })
      .then(res => {
        this.isSending = false;
        if (res.ok) {
          this.emailForm.reset();
          this.showToast('success', 'Your message has been delivered successfully 🚀');
        } else {
          this.showToast('error', 'Failed to send email. Try again.');
        }
      })
      .catch(() => {
        this.isSending = false;
        this.showToast('error', 'Failed to send email. Try again.');
      });
  }

  private showToast(type: 'success' | 'error', msg: string) {
    this.toastType = type;
    this.message = msg;
    this.isShowingToast = true;

    setTimeout(() => {
      this.isShowingToast = false;
    }, 2000);
  }

  @ViewChildren('carCard') carCards!: QueryList<ElementRef>;
  filterprojects(type: string) {
    this.selectedType = type;
    if (type === 'All') {
      this.projects = [...this.allProjects]; // show all
    } else {
      this.projects = this.allProjects.filter(car => car.category === type); // filtered list
    }
  }


  // Cookies settings

  showBanner = false;
  showSettings = false;
  analyticsEnabled = false;
  acceptAll() {

    const consent = {
      analytics: true
    };

    localStorage.setItem('cookieConsent', JSON.stringify(consent));

    this.analyticsEnabled = true;
    this.showBanner = false;

    this.loadAnalytics();
  }

  rejectAll() {

    const consent = {
      analytics: false
    };

    localStorage.setItem('cookieConsent', JSON.stringify(consent));

    this.analyticsEnabled = false;
    this.showBanner = false;
  }

  openSettings() {
    this.showSettings = true;
  }

  savePreferences() {

    const consent = {
      analytics: this.analyticsEnabled
    };

    localStorage.setItem('cookieConsent', JSON.stringify(consent));

    this.showSettings = false;
    this.showBanner = false;

    this.loadAnalytics();
  }

  loadAnalytics() {

    const script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-11R4WNNG2M";
    script.async = true;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];

    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }

    gtag('js', new Date());
    gtag('config', 'G-11R4WNNG2M');

  }
}
