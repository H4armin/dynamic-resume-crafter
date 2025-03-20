
import React, { createContext, useContext, useState, ReactNode } from "react";

export type FontSize = "small" | "medium" | "large";
export type Spacing = "compact" | "normal" | "spacious";
export type SectionOrder = {
  summary: number;
  experience: number;
  education: number;
  skills: number;
};

type ThemeColors = {
  primary: string;
  secondary: string;
  text: string;
  background: string;
  accent: string;
};

type CustomizationContextType = {
  colors: ThemeColors;
  setColors: (colors: ThemeColors | ((prev: ThemeColors) => ThemeColors)) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  spacing: Spacing;
  setSpacing: (spacing: Spacing) => void;
  sectionOrder: SectionOrder;
  updateSectionOrder: (section: keyof SectionOrder, order: number) => void;
  resetCustomization: () => void;
};

const defaultColors: ThemeColors = {
  primary: "#0ea5e9", // Default blue
  secondary: "#6366f1",
  text: "#1e293b",
  background: "#ffffff",
  accent: "#f59e0b"
};

const defaultSectionOrder: SectionOrder = {
  summary: 1,
  experience: 2,
  education: 3,
  skills: 4
};

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export const CustomizationProvider = ({ children }: { children: ReactNode }) => {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);
  const [fontSize, setFontSize] = useState<FontSize>("medium");
  const [spacing, setSpacing] = useState<Spacing>("normal");
  const [sectionOrder, setSectionOrder] = useState<SectionOrder>(defaultSectionOrder);

  const updateSectionOrder = (section: keyof SectionOrder, order: number) => {
    setSectionOrder(prev => ({ ...prev, [section]: order }));
  };

  const resetCustomization = () => {
    setColors(defaultColors);
    setFontSize("medium");
    setSpacing("normal");
    setSectionOrder(defaultSectionOrder);
  };

  return (
    <CustomizationContext.Provider
      value={{
        colors,
        setColors,
        fontSize,
        setFontSize,
        spacing,
        setSpacing,
        sectionOrder,
        updateSectionOrder,
        resetCustomization
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (context === undefined) {
    throw new Error("useCustomization must be used within a CustomizationProvider");
  }
  return context;
};
