import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as AOS from 'aos';
import * as emailjs from '@emailjs/browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Gokul_Portfolio';

  features: any[] = [
    {
      icon: 'ri-html5-line',
      title: 'HTML5',
      description: 'Intelligent scheduling that learns your preferences and optimizes your time.'
    },
    {
      icon: 'ri-css3-line',
      title: 'CSS3',
      description: 'Automatically block time for focused work and personal activities.'
    },
    {
      icon: 'ri-javascript-line',
      title: 'Javascript',
      description: 'AI suggests optimal times for meetings and events based on your habits.'
    },
    {
      icon: 'ri-angularjs-line',
      title: 'Angular',
      description: 'Access your schedule across all devices in real-time.'
    },
    {
      icon: 'ri-bootstrap-line',
      title: 'Bootstrap',
      description: 'Easily coordinate schedules with team members and clients.'
    },
    {
      icon: 'ri-tailwind-css-line',
      title: 'Tailwind CSS',
      description: 'Contextual notifications that adapt to your schedule and priorities.'
    },
    {
      icon: 'ri-android-line',
      title: 'Android Studio',
      description: 'Contextual notifications that adapt to your schedule and priorities.'
    }
  ];

  emailForm!: FormGroup;
  isMenuOpen = false;
  projects: any[] = [];
  allProjects: any[] = [
    {
      id: 1,
      name: "EasytoDrop",
      category: "Websites",
      title: "Booking & Ride Platform",
      link: "https://easytodrop.netlify.app",
      image: "assets/projects/easytodrop_mobile.png",
      tech: ["Angular", "Tailwind CSS", "Firebase"],
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
      image: "assets/projects/gokulgovindaraj_portfolio_mobile.png",
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
      image: "assets/projects/gbuy_mobile.png",
      tech: ["Ionic Angular", "Firebase"],
      description: "Cross-platform e-commerce mobile app built using Ionic framework.",
      github: null,
      playStore: null,
      apkLink: "assets/apks/Gbuy.apk"
    }
  ];
  typeofProjects: string[] = ['All', 'Websites', 'Apps'];
  selectedType: string = 'All';

  constructor(private fb: FormBuilder) {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
  }
  ngOnInit() {
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
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  emailSubmit(): void {
    if (this.emailForm.invalid) {
      this.showPopup("Please fill out the form correctly.", false);
      this.emailForm.markAllAsTouched();
      return;
    }

    const params = this.emailForm.value;

    emailjs.send('service_h8ttj7j', 'template_ys27fdu', params, 'KbDAK0x0JKuDWkItb')
      .then(() => {
        this.showPopup("Email sent successfully.", true);
        this.emailForm.reset();
      })
      .catch(() => {
        this.showPopup("Failed to send email. Try again.", false);
      });
  }

  hasError(control: string, error: string) {
    return this.emailForm.get(control)?.hasError(error) && this.emailForm.get(control)?.touched;
  }

  showToast = false;
  toastMessage = '';
  toastColor = 'bg-green-600';

  showPopup(message: string, success: boolean = true) {
    this.toastMessage = message;
    this.toastColor = success ? 'bg-green-600' : 'bg-red-600';
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
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

}
