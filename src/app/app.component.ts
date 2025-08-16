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
  cars: any[] = [];
  allCars: any[] = [
    {
      id: 1,
      name: "EasytoDrop",
      link: 'https://easytodrop.netlify.app',
      image: "assets/projects/easytodrop_laptop.png",
      type: "Websites"
    },
    {
      id: 2,
      name: "Portfolio",
      link: 'https://itsggokul.netlify.app',
      image: "assets/projects/gokulgovindaraj_portfolio_laptop.png",
      type: "Portfolio"
    },
  ];
  typeofCars: string[] = ['All', 'Portfolio', 'Websites', 'Apps'];
  selectedType: string = 'All';
  disablePrev = true;
  disableNext = false;
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
    this.cars = [...this.allCars]; // load all cars initially
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

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  @ViewChildren('carCard') carCards!: QueryList<ElementRef>;
  filterCars(type: string) {
    this.selectedType = type;

    if (type === 'All') {
      this.cars = [...this.allCars]; // show all
    } else {
      this.cars = this.allCars.filter(car => car.type === type); // filtered list
    }

    // Smoothly scroll back to start
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }
  }
  ngAfterViewInit() {
    // Scroll to Tariff
    this.scrollContainer.nativeElement.addEventListener('scroll', () => {
      this.updateButtonState();
    });
  }
  private getCardWidth(): number {
    if (this.carCards.first) {
      // Card width + gap (gap is usually 16px = 1rem in Tailwind for gap-4)
      const style = window.getComputedStyle(this.carCards.first.nativeElement);
      const gap = parseInt(style.marginRight || '16', 10) || 16;
      return this.carCards.first.nativeElement.offsetWidth + gap;
    }
    return 320; // fallback
  }

  scrollNext() {
    const amount = this.getCardWidth();
    this.scrollContainer.nativeElement.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(() => this.updateButtonState(), 300);
  }

  scrollPrev() {
    const amount = this.getCardWidth();
    this.scrollContainer.nativeElement.scrollBy({ left: -amount, behavior: 'smooth' });
    setTimeout(() => this.updateButtonState(), 300);
  }

  updateButtonState() {
    const container = this.scrollContainer.nativeElement;
    this.disablePrev = container.scrollLeft <= 0;
    this.disableNext = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
  }
}
