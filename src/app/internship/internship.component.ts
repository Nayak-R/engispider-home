import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

interface InternshipRegistration {
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  college: string;
  otherCollege?: string;
  degree: string;
  otherDegree?: string;
  branch: string;
  otherBranch?: string;
  semester: string;
  selectedProgramTitle: string;
  transactionId: string;
  amount: number;
  paymentScreenshot: string; // Base64 encoded image
  paymentDate: string;
}

interface InternshipProgram {
  title: string;
  description: string;
  icon: string;
}

enum RegistrationStep {
  FORM = 'form',
  PAYMENT = 'payment',
  UPLOAD = 'upload'
}

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})
export class InternshipComponent {
  internshipPrograms: InternshipProgram[] = [
    {
      title: 'Website Development',
      description: 'Gain hands-on experience in building responsive and user-friendly websites.',
      icon: 'bx bx-code-alt'
    },
    {
      title: 'Mobile App Development',
      description: 'Develop cross-platform mobile applications using industry-standard frameworks.',
      icon: 'bx bx-mobile-alt'
    },
    {
      title: 'Java Development',
      description: 'Master the art of Java programming and build robust and scalable applications.',
      icon: 'bx bxl-java'
    },
    {
      title: 'UI/UX Design',
      description: 'Learn the principles of user interface and user experience design, creating intuitive interfaces.',
      icon: 'bx bx-palette'
    },
    {
      title: 'Dot Net Development',
      description: 'Develop enterprise-grade applications using the .NET framework.',
      icon: 'bx bx-code-curly'
    },
    {
      title: 'Manual Testing and SQL',
      description: 'Learn essential testing methodologies and database management skills.',
      icon: 'bx bx-data'
    },
    {
      title: 'API Integration',
      description: 'Gain practical experience in integrating APIs and working on real-world projects.',
      icon: 'bx bx-link'
    }
  ];

  colleges: string[] = [
    'GIET University, Gunupur',
    'Gandhi Institute of Technology and Management',
    'Silicon Institute of Technology',
    'CV Raman Global University',
    'KIIT University',
    'SOA University',
    'Gandhi Engineering College',
    'Raajdhani Engineering College',
    'Trident Academy of Technology ',
    'Other'
  ];

  selectedProgram: InternshipProgram | null = null;
  currentStep: RegistrationStep = RegistrationStep.FORM;
  formData: InternshipRegistration = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
    college: '',
    otherCollege: '',
    degree: '',
    otherDegree: '',
    branch: '',
    otherBranch: '',
    semester: '',
    selectedProgramTitle: '',
    transactionId: '',
    amount: 2300,
    paymentScreenshot: '',
    paymentDate: ''
  };

  addressError: string = '';
  semesterError: string = '';
  emailError: string = '';
  phoneError: string = '';
  upiId = '9937000553@hdfcbank';
  qrCodeUrl: string = '';
  isQrLoading: boolean = false;

  validateAddress(): boolean {
    if (!this.formData.address) {
      this.addressError = 'Address is required';
      return false;
    }
    if (this.formData.address.length < 10) {
      this.addressError = 'Address must be at least 10 characters long';
      return false;
    }
    this.addressError = '';
    return true;
  }

  validateSemester(): boolean {
    const semester = parseInt(this.formData.semester);
    if (!this.formData.semester) {
      this.semesterError = 'Semester is required';
      return false;
    }
    if (semester < 1 || semester > 8) {
      this.semesterError = 'Semester must be between 1 and 8';
      return false;
    }
    this.semesterError = '';
    return true;
  }

  validateEmail(): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.formData.email) {
      this.emailError = 'Email is required';
      return false;
    }
    if (!emailRegex.test(this.formData.email)) {
      this.emailError = 'Please enter a valid email address';
      return false;
    }
    this.emailError = '';
    return true;
  }

  validatePhone(): boolean {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!this.formData.phone) {
      this.phoneError = 'Phone number is required';
      return false;
    }
    if (!phoneRegex.test(this.formData.phone)) {
      this.phoneError = 'Please enter a valid 10-digit Indian mobile number';
      return false;
    }
    this.phoneError = '';
    return true;
  }

  onSubmit(): void {
    if (this.selectedProgram && this.currentStep === RegistrationStep.FORM) {
      if (this.validateEmail() && this.validatePhone() && this.validateAddress() && this.validateSemester()) {
        this.isQrLoading = true;
        this.formData.transactionId = uuidv4();
        this.formData.selectedProgramTitle = this.selectedProgram.title;
        this.formData.paymentDate = new Date().toISOString();
        
        const message = `${this.formData.transactionId}`;
        const payeeName = "EngiSpiderTechnologies";
        const upiUrl = `upi://pay?pa=${this.upiId}&pn=${encodeURIComponent(payeeName)}&am=${this.formData.amount}&tn=${encodeURIComponent(message)}&cu=INR&mode=04`;
        
        this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

        // Add event listener to handle QR code image load
        const img = new Image();
        img.onload = () => {
          this.isQrLoading = false;
        };
        img.onerror = () => {
          this.isQrLoading = false;
        };
        img.src = this.qrCodeUrl;

        this.currentStep = RegistrationStep.PAYMENT;
      }
    }
  }

  openRegistrationForm(program: InternshipProgram): void {
    this.selectedProgram = program;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.formData.paymentScreenshot = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  closeModal(): void {
    this.selectedProgram = null;
    this.currentStep = RegistrationStep.FORM;
    this.resetForm();
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      gender: '',
      address: '',
      college: '',
      degree: '',
      branch: '',
      semester: '',
      selectedProgramTitle: '',
      transactionId: '',
      amount: 2300,
      paymentScreenshot: '',
      paymentDate: ''
    };
    this.emailError = '';
    this.phoneError = '';
    this.addressError = '';
    this.semesterError = '';
    this.qrCodeUrl = '';
  }

  submitPaymentProof(): void {
    if (this.formData.paymentScreenshot && this.selectedProgram) {
      console.log('Submitting registration data:', this.formData);

      this.resetForm();
      this.selectedProgram = null;
      this.currentStep = RegistrationStep.FORM;
    }
  }
}
