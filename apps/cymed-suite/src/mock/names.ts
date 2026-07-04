export const PATIENT_NAMES = [
  "Ahmed Al-Zahra",
  "Fatima Al-Rashid",
  "Mohammed Al-Sabah",
  "Layla Karim",
  "Omar Hassan",
  "Nour El-Din",
  "Yasmin Farid",
  "Khalid Mansour",
  "Zainab Habib",
  "Ali Reza",
  "Sarah Johnson",
  "Michael Chen",
  "Emma Rodriguez",
  "James Wilson",
  "Priya Patel",
  "Robert Nakamura",
  "Chloe Dubois",
  "Marcus Andersen",
  "Aisha Osman",
  "Tariq Sharif",
  "Elena Petrova",
  "David Miller",
  "Sophie Laurent",
  "Rahul Verma",
  "Anna Kowalski",
];

export const CLINICIAN_NAMES = [
  "Dr. Ahmed Al-Farid",
  "Dr. Layla Rahman",
  "Dr. Michael Chen",
  "Dr. Priya Patel",
  "Dr. Sarah Johnson",
  "Dr. Omar Hassan",
  "Dr. Elena Novak",
  "Dr. James Wilson",
  "Dr. Fatima Aziz",
  "Dr. David Kim",
  "Dr. Aisha Osman",
  "Dr. Rahul Verma",
];

export const NURSE_NAMES = [
  "Nurse Maria Santos",
  "Nurse Chen Wei",
  "Nurse Fatima Aziz",
  "Nurse Grace Kimani",
  "Nurse Amara Johnson",
  "Nurse Reem Hakim",
  "Nurse Anna Kowalski",
  "Nurse Priya Devi",
];

export const DEPARTMENTS = [
  "Emergency",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "OB/GYN",
  "General Surgery",
  "Internal Medicine",
  "Oncology",
  "Radiology",
  "Anesthesiology",
  "ICU",
];

export const DRUGS = [
  { name: "Paracetamol 500mg", form: "Tablet", price: 3.5 },
  { name: "Amoxicillin 500mg", form: "Capsule", price: 5.2 },
  { name: "Metformin 500mg", form: "Tablet", price: 4.8 },
  { name: "Atorvastatin 20mg", form: "Tablet", price: 7.5 },
  { name: "Lisinopril 10mg", form: "Tablet", price: 6.0 },
  { name: "Omeprazole 20mg", form: "Capsule", price: 5.8 },
  { name: "Salbutamol Inhaler 100mcg", form: "Inhaler", price: 12.4 },
  { name: "Insulin Glargine 100 IU/mL", form: "Injection", price: 45.0 },
  { name: "Warfarin 5mg", form: "Tablet", price: 3.9 },
  { name: "Azithromycin 500mg", form: "Tablet", price: 8.6 },
  { name: "Sertraline 50mg", form: "Tablet", price: 6.4 },
  { name: "Levothyroxine 50mcg", form: "Tablet", price: 4.2 },
];

export const LAB_TESTS = [
  { code: "CBC", name: "Complete Blood Count", panel: "Hematology", tat: 30 },
  { code: "BMP", name: "Basic Metabolic Panel", panel: "Biochemistry", tat: 45 },
  { code: "CMP", name: "Comprehensive Metabolic Panel", panel: "Biochemistry", tat: 60 },
  { code: "LFT", name: "Liver Function Test", panel: "Biochemistry", tat: 50 },
  { code: "TFT", name: "Thyroid Function Test", panel: "Biochemistry", tat: 90 },
  { code: "HbA1c", name: "Glycated Hemoglobin", panel: "Biochemistry", tat: 60 },
  { code: "UA", name: "Urinalysis", panel: "Chemistry", tat: 25 },
  { code: "TROP", name: "Troponin I", panel: "Cardiac", tat: 15 },
  { code: "BNP", name: "B-type Natriuretic Peptide", panel: "Cardiac", tat: 30 },
  { code: "PT/INR", name: "Prothrombin Time", panel: "Coagulation", tat: 20 },
  { code: "CULTURE-BLOOD", name: "Blood Culture", panel: "Microbiology", tat: 4320 },
  { code: "CULTURE-URINE", name: "Urine Culture", panel: "Microbiology", tat: 2880 },
];

export const MODALITIES = [
  { code: "CT", name: "CT Scan", body: ["Head", "Chest", "Abdomen", "Pelvis", "Spine"] },
  { code: "MRI", name: "MRI", body: ["Brain", "Spine", "Knee", "Shoulder", "Cardiac"] },
  { code: "XR", name: "X-Ray", body: ["Chest", "Abdomen", "Extremity", "Spine"] },
  { code: "US", name: "Ultrasound", body: ["Abdomen", "Obstetric", "Cardiac", "Vascular"] },
  { code: "MAMMO", name: "Mammography", body: ["Bilateral"] },
];

export const MENU_ITEMS = [
  { name: "Margherita Pizza", cat: "Pizza", price: 32, cost: 8 },
  { name: "Grilled Chicken Shawarma", cat: "Mains", price: 28, cost: 7 },
  { name: "Beef Burger Combo", cat: "Mains", price: 42, cost: 12 },
  { name: "Chicken Caesar Salad", cat: "Salads", price: 26, cost: 6 },
  { name: "Falafel Wrap", cat: "Wraps", price: 18, cost: 4 },
  { name: "Fresh Orange Juice", cat: "Drinks", price: 12, cost: 3 },
  { name: "Espresso", cat: "Drinks", price: 10, cost: 1 },
  { name: "Tiramisu", cat: "Desserts", price: 22, cost: 5 },
  { name: "Cheesecake", cat: "Desserts", price: 20, cost: 5 },
  { name: "Fries", cat: "Sides", price: 12, cost: 2 },
];
