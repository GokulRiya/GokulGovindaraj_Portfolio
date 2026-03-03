import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as AOS from 'aos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
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

  allProjects: any[] = [
    {
      id: 1,
      name: "EasytoDrop",
      category: "Websites",
      title: "Booking & Ride Platform",
      link: "https://easytodrop.netlify.app",
      image: "assets/projects/easytodrop_mobile.png",
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
      tech: ["Ionic Angular"],
      description: "Cross-platform e-commerce mobile app built using Ionic framework.",
      github: null,
      playStore: null,
      apkLink: "assets/apks/Gbuy.apk"
    }
  ];

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
  }

  isDarkMode = true;
  ngOnInit() {
    this.isDarkMode = false;
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

  emailSubmit(): void {
    this.isSending = true;
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      this.toastr.error("Please fill out the form correctly.");
      this.isSending = false;
      return;
    }

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
      .then((response: any) => {
        console.log(response);
        if (response.status === 200) {
          this.toastr.success("Email sent successfully.");
          this.emailForm.reset();
          this.isSending = false;
        } else {
          this.toastr.error("Failed to send email. Try again.");
          this.isSending = false;
        }
      })
      .catch(() => {
        this.toastr.error("Failed to send email. Try again.");
        this.isSending = false;
      });
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
