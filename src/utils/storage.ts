
import { ResumeFormValues } from "@/types/resume";

const STORAGE_KEY = "resume_data";

export const saveResumeToStorage = (data: ResumeFormValues) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return false;
  }
};

export const loadResumeFromStorage = (): ResumeFormValues | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
};
