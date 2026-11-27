import {
  Banknote,
  Briefcase,
  CalendarCheck,
  GraduationCap,
  Network,
  Plane,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface HrModule {
  /** Short label used in the configurator preview. */
  shortName: string;
  name: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  /** The API's code for a priced service. Absent on core modules, which every subscription includes. */
  serviceCode?: string;
}

export const hrModules: HrModule[] = [
  {
    shortName: "Employee",
    name: "Employee Management",
    description: "One home for every employee record.",
    features: ["Employee profiles", "Employee records", "Employment information"],
    icon: Users,
  },
  {
    shortName: "Attendance",
    serviceCode: "ATTENDANCE_MANAGEMENT",
    name: "Attendance Management",
    description: "Track presence and working time.",
    features: ["Daily attendance", "Check-in / Check-out", "Working hours"],
    icon: CalendarCheck,
  },
  {
    shortName: "Leave",
    serviceCode: "LEAVE_MANAGEMENT",
    name: "Leave Management",
    description: "Time off from request to approval.",
    features: ["Leave requests", "Leave approvals", "Leave balances"],
    icon: Plane,
  },
  {
    shortName: "Recruitment",
    serviceCode: "RECRUITMENT",
    name: "Recruitment Management",
    description: "Hire the right people faster.",
    features: ["Job vacancies", "Candidate management", "Interview scheduling"],
    icon: Briefcase,
  },
  {
    shortName: "Payroll",
    serviceCode: "PAYROLL_SERVICES",
    name: "Payroll Management",
    description: "Accurate, on-time salary processing.",
    features: ["Salary processing", "Payroll calculations", "Payslips"],
    icon: Banknote,
  },
  {
    shortName: "Training",
    serviceCode: "TRAINING_DEVELOPMENT",
    name: "Training & Development",
    description: "Grow skills across your workforce.",
    features: ["Training programs", "Employee development"],
    icon: GraduationCap,
  },
  {
    shortName: "Department",
    name: "Department Management",
    description: "Model your organizational structure.",
    features: ["Department configuration", "Organizational structure"],
    icon: Network,
  },
];

export interface CapacityRange {
  label: string;
  /**
   * The headcount to price this range at: its upper end. Absent for larger organizations, which are
   * quoted rather than priced from a range.
   */
  employees?: number;
  caption: string;
}

export const capacityRanges: CapacityRange[] = [
  { label: "1–10", employees: 10, caption: "Small teams" },
  { label: "11–25", employees: 25, caption: "Growing teams" },
  { label: "26–50", employees: 50, caption: "employees" },
  { label: "51–100", employees: 100, caption: "employees" },
  { label: "101–250", employees: 250, caption: "employees" },
  { label: "251–500", employees: 500, caption: "Large organizations" },
  { label: "500+", caption: "Custom quote" },
];

export const navLinks = [
  { label: "Why Brand B HR", href: "#why" },
  { label: "Modules", href: "#modules" },
  { label: "Pricing", href: "#pricing" },
  { label: "How it works", href: "#how" },
  { label: "FAQ", href: "#faq" },
];

export const howItWorks = [
  {
    title: "Register Your Business",
    body: "Create your account and enter your company information.",
  },
  {
    title: "Customize Your HR System",
    body: "Select employee capacity and the HR modules you require, then add your branding.",
  },
  {
    title: "Activate Your Subscription",
    body: "Complete billing and start managing your team in your own workspace.",
  },
];

export const faqs = [
  {
    question: "Is there a fixed plan I must choose?",
    answer:
      "No. Your subscription is based on your employee capacity and the modules you select, so you configure it to match your business.",
  },
  {
    question: "Do I have to use every module?",
    answer:
      "No. Employee and department management are included in every subscription. Add only the other modules you need.",
  },
  {
    question: "Can I change modules or capacity later?",
    answer: "Yes. You can adjust your configuration as your business grows.",
  },
  {
    question: "What do I need to get started?",
    answer:
      "Create an account, register your business, and follow the guided setup. You can save progress and continue later.",
  },
  {
    question: "What about organizations with more than 500 employees?",
    answer: "Larger organizations get a custom configuration. Our team will help you set it up.",
  },
];

/** Contact details carried over from the previous site; shown in the footer. */
export const contactDetails = {
  email: "hello@brandbhr.com",
  phone: "+94 11 234 5678",
  address: "42 Galle Road, Colombo 03, Sri Lanka",
};

/** Until there is a booking form, a demo request is an email to the team. */
export const demoRequestUrl = `mailto:${contactDetails.email}?subject=${encodeURIComponent(
  "Brand B HR demo request",
)}`;
