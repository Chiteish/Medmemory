import { create } from "zustand";

export interface MedicalReport {
  id: string;
  name: string;
  date: string;
  type: "PDF" | "Scan" | "Report" | "Prescription";
  status: "Completed" | "Processing" | "Failed";
  patientId: string; // "self" or family member id
  extractedInsights: string;
  indicators: {
    glucose?: number | string;
    cholesterol?: number | string;
    bloodPressure?: string;
    hba1c?: string;
    medicines?: string[];
  };
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: "Parent" | "Spouse" | "Child" | "Other";
  age: number;
  conditions: string[];
  emergencyAccess: boolean;
  sharingRole: "Full Access" | "Emergency Only" | "View Only";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface UserProfile {
  name: string;
  email: string;
  healthScore: number;
  nextAppointment: {
    doctor: string;
    specialty: string;
    date: string;
    time: string;
  };
}

interface HealthState {
  // Auth state
  user: UserProfile | null;
  isAuthenticated: boolean;
  isVerifyingOtp: boolean;
  rememberMe: boolean;
  loginEmail: string;

  // Reports
  reports: MedicalReport[];
  isUploading: boolean;
  uploadProgress: number;

  // Family
  familyMembers: FamilyMember[];

  // Chat
  chatHistory: ChatMessage[];
  isChatTyping: boolean;

  // Settings
  theme: "light" | "dark";
  notifications: boolean;
  privacyControls: boolean;
  language: string;

  // Actions
  login: (email: string) => void;
  signup: (email: string, name: string) => void;
  submitOtp: (code: string) => boolean;
  logout: () => void;
  setRememberMe: (val: boolean) => void;
  setLoginEmail: (email: string) => void;
  addReport: (report: Omit<MedicalReport, "id">) => void;
  simulateUpload: (file: File, callback?: () => void) => void;
  addFamilyMember: (member: Omit<FamilyMember, "id">) => void;
  sendChatMessage: (content: string) => void;
  toggleTheme: () => void;
  setNotifications: (val: boolean) => void;
  setPrivacyControls: (val: boolean) => void;
  setLanguage: (val: string) => void;
  updateProfileName: (name: string) => void;
  updateProfileEmail: (email: string) => void;
}

// Initial Mock Reports
const initialReports: MedicalReport[] = [
  {
    id: "r1",
    name: "Diabetes Screening.pdf",
    date: "2024-07-24",
    type: "PDF",
    status: "Completed",
    patientId: "self",
    extractedInsights: "Fasting glucose increased from 94 in 2022 to 108 in 2024. HbA1c is 5.9% which falls in the prediabetic range. Review diet plan.",
    indicators: {
      glucose: "108 mg/dL",
      hba1c: "5.9%",
      medicines: ["Metformin 500mg (recommended)"]
    }
  },
  {
    id: "r2",
    name: "Lipid Profile Scan.jpg",
    date: "2023-03-15",
    type: "Scan",
    status: "Completed",
    patientId: "self",
    extractedInsights: "Total Cholesterol is 240 mg/dL (High). LDL is 155 mg/dL (Elevated). Cardioprotective dietary adjustments recommended.",
    indicators: {
      cholesterol: "240 mg/dL"
    }
  },
  {
    id: "r3",
    name: "BP Prescription.png",
    date: "2025-01-10",
    type: "Prescription",
    status: "Completed",
    patientId: "self",
    extractedInsights: "Lisinopril 10mg prescribed once daily for mild hypertension control. Blood pressure recorded at 135/85 mmHg.",
    indicators: {
      bloodPressure: "135/85 mmHg",
      medicines: ["Lisinopril 10mg"]
    }
  },
  {
    id: "r4",
    name: "Blood Test Report - Comprehensive.pdf",
    date: "2024-11-02",
    type: "Report",
    status: "Completed",
    patientId: "self",
    extractedInsights: "General blood indices normal. Hemoglobin: 14.2 g/dL. Vitamin D level is slightly low (24 ng/mL). Supplementation advised.",
    indicators: {
      medicines: ["Vitamin D3 2000 IU"]
    }
  }
];

// Initial Family Members
const initialFamily: FamilyMember[] = [
  {
    id: "f1",
    name: "Elena Rivera",
    relation: "Spouse",
    age: 34,
    conditions: ["Thyroiditis"],
    emergencyAccess: true,
    sharingRole: "Full Access"
  },
  {
    id: "f2",
    name: "Thomas Rivera",
    relation: "Parent",
    age: 68,
    conditions: ["Hypertension", "Type 2 Diabetes"],
    emergencyAccess: true,
    sharingRole: "Full Access"
  },
  {
    id: "f3",
    name: "Sofia Rivera",
    relation: "Child",
    age: 8,
    conditions: ["Asthma"],
    emergencyAccess: false,
    sharingRole: "View Only"
  }
];

// Initial Chat History
const initialChat: ChatMessage[] = [
  {
    id: "m1",
    role: "assistant",
    content: "Hello! I am your MedMemory health assistant. I have reviewed your uploaded medical records, including your recent Lipid Profile and Diabetes Screenings. How can I help you today?",
    timestamp: "11:00 AM"
  }
];

export const useHealthStore = create<HealthState>((set, get) => ({
  // Auth state defaults
  user: {
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    healthScore: 82,
    nextAppointment: {
      doctor: "Dr. Sarah Jenkins",
      specialty: "Endocrinologist",
      date: "June 14, 2026",
      time: "10:30 AM"
    }
  },
  isAuthenticated: false, // Default is logged out to show Auth Pages first
  isVerifyingOtp: false,
  rememberMe: true,
  loginEmail: "",

  // Reports state
  reports: initialReports,
  isUploading: false,
  uploadProgress: 0,

  // Family state
  familyMembers: initialFamily,

  // Chat state
  chatHistory: initialChat,
  isChatTyping: false,

  // Settings defaults
  theme: "light",
  notifications: true,
  privacyControls: true,
  language: "English",

  // Actions
  login: (email: string) => {
    set({ loginEmail: email, isAuthenticated: true, isVerifyingOtp: false });
  },

  signup: (email: string, name: string) => {
    set({
      user: {
        name,
        email,
        healthScore: 75,
        nextAppointment: {
          doctor: "Dr. Robert Chen",
          specialty: "General Physician",
          date: "July 01, 2026",
          time: "09:00 AM"
        }
      },
      loginEmail: email,
      isAuthenticated: true,
      isVerifyingOtp: false
    });
  },

  submitOtp: (code: string) => {
    if (code.length === 6) {
      set({ isAuthenticated: true, isVerifyingOtp: false });
      return true;
    }
    return false;
  },

  logout: () => {
    set({ isAuthenticated: false, isVerifyingOtp: false });
  },

  setRememberMe: (val: boolean) => set({ rememberMe: val }),
  setLoginEmail: (email: string) => set({ loginEmail: email }),

  addReport: (report) => {
    const newReport: MedicalReport = {
      ...report,
      id: "r_" + Math.random().toString(36).substr(2, 9)
    };
    set((state) => ({ reports: [newReport, ...state.reports] }));
  },

  simulateUpload: (file: File, callback?: () => void) => {
    set({ isUploading: true, uploadProgress: 5 });

    let progress = 5;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 5;
      if (progress >= 100) {
        clearInterval(interval);
        set({ uploadProgress: 100 });

        // Add report to state
        setTimeout(() => {
          const isPdf = file.name.endsWith(".pdf");
          const isPrescription = file.name.toLowerCase().includes("rx") || file.name.toLowerCase().includes("prescription");
          
          let reportName = file.name;
          let extractedInsights = "Extracted data shows normal levels. Standard parameters analyzed.";
          let indicators: MedicalReport["indicators"] = {};

          if (isPdf) {
            reportName = file.name;
            extractedInsights = "Your Fasting Glucose is 105 mg/dL. Total Cholesterol is 210 mg/dL. Blood pressure 125/82 mmHg. Standard review recommended.";
            indicators = {
              glucose: "105 mg/dL",
              cholesterol: "210 mg/dL",
              bloodPressure: "125/82 mmHg"
            };
          } else if (isPrescription) {
            extractedInsights = "Atorvastatin 20mg prescribed once daily. Re-check lipids in 6 weeks.";
            indicators = {
              medicines: ["Atorvastatin 20mg"]
            };
          } else {
            extractedInsights = "Thyroid profile scan uploaded. TSH level is 2.4 mIU/L (Within normal range of 0.4 - 4.0).";
            indicators = {
              hba1c: "5.4%"
            };
          }

          get().addReport({
            name: reportName,
            date: new Date().toISOString().split('T')[0],
            type: isPdf ? "PDF" : (isPrescription ? "Prescription" : "Scan"),
            status: "Completed",
            patientId: "self",
            extractedInsights,
            indicators
          });

          set({ isUploading: false, uploadProgress: 0 });
          if (callback) callback();
        }, 800);
      } else {
        set({ uploadProgress: progress });
      }
    }, 200);
  },

  addFamilyMember: (member) => {
    const newMember: FamilyMember = {
      ...member,
      id: "f_" + Math.random().toString(36).substr(2, 9)
    };
    set((state) => ({ familyMembers: [...state.familyMembers, newMember] }));
  },

  sendChatMessage: (content: string) => {
    const userMsg: ChatMessage = {
      id: "msg_" + Math.random().toString(36).substr(2, 9),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    set((state) => ({
      chatHistory: [...state.chatHistory, userMsg],
      isChatTyping: true
    }));

    // Formulate a response based on keywords in content
    setTimeout(() => {
      let replyContent = "I've reviewed your medical records. Please clarify which reading you are asking about.";
      const query = content.toLowerCase();

      if (query.includes("sugar") || query.includes("glucose") || query.includes("diabetes")) {
        replyContent = "Based on your Diabetes Screening from July 2024, your fasting glucose increased from 94 mg/dL in 2022 to 108 mg/dL in 2024. Your HbA1c is at 5.9%, which indicates a prediabetic range. You should monitor sugar intake and check in with Dr. Jenkins.";
      } else if (query.includes("cholesterol") || query.includes("lipid") || query.includes("fat")) {
        replyContent = "According to your Lipid Profile Scan from March 2023, your total cholesterol is 240 mg/dL (High) and LDL is 155 mg/dL (Elevated). Your doctor might suggest a dietary check or starting low-dose statins if it remains high.";
      } else if (query.includes("medicine") || query.includes("medication") || query.includes("pills") || query.includes("taken")) {
        replyContent = "Based on your prescriptions and records, you are currently prescribed:\n- Lisinopril 10mg once daily for high blood pressure (Prescribed Jan 2025)\n- Metformin 500mg (recommended in your screening, Jul 2024)\n- Vitamin D3 2000 IU (advised Nov 2024).";
      } else if (query.includes("blood pressure") || query.includes("bp") || query.includes("hypertension")) {
        replyContent = "Your last recorded blood pressure in January 2025 was 135/85 mmHg, which falls into the prehypertension range. You are currently taking Lisinopril 10mg to manage it.";
      } else if (query.includes("appointment") || query.includes("doctor")) {
        replyContent = `You have an upcoming appointment with Dr. Sarah Jenkins (Endocrinologist) on June 14, 2026 at 10:30 AM. Let me know if you would like me to compile a brief summary of your health trends for her!`;
      } else if (query.includes("hello") || query.includes("hi")) {
        replyContent = `Hello! How can I help you navigate your MedMemory records today? You can ask me about your sugar, cholesterol, medications, or checkups.`;
      }

      const botMsg: ChatMessage = {
        id: "msg_" + Math.random().toString(36).substr(2, 9),
        role: "assistant",
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      set((state) => ({
        chatHistory: [...state.chatHistory, botMsg],
        isChatTyping: false
      }));
    }, 1500);
  },

  toggleTheme: () => {
    set((state) => {
      const nextTheme = state.theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        const root = document.documentElement;
        if (nextTheme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
      return { theme: nextTheme };
    });
  },

  setNotifications: (val) => set({ notifications: val }),
  setPrivacyControls: (val) => set({ privacyControls: val }),
  setLanguage: (val) => set({ language: val }),
  updateProfileName: (name) => set((state) => ({ user: state.user ? { ...state.user, name } : null })),
  updateProfileEmail: (email) => set((state) => ({ user: state.user ? { ...state.user, email } : null }))
}));
