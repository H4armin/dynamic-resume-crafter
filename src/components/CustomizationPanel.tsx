
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Palette, 
  Type, 
  Maximize, 
  ListRestart,
  RotateCcw
} from "lucide-react";
import { useCustomization, FontSize, Spacing, SectionOrder } from "@/contexts/CustomizationContext";

const colorOptions = [
  { name: "Blue", primary: "#0ea5e9", secondary: "#6366f1", accent: "#f59e0b" },
  { name: "Green", primary: "#10b981", secondary: "#059669", accent: "#f97316" },
  { name: "Purple", primary: "#8b5cf6", secondary: "#7c3aed", accent: "#ec4899" },
  { name: "Orange", primary: "#f97316", secondary: "#ea580c", accent: "#0ea5e9" },
  { name: "Red", primary: "#ef4444", secondary: "#dc2626", accent: "#84cc16" },
  { name: "Custom", primary: "", secondary: "", accent: "" },
];

export const CustomizationPanel = () => {
  const { 
    colors, 
    setColors, 
    fontSize, 
    setFontSize, 
    spacing, 
    setSpacing, 
    sectionOrder,
    updateSectionOrder,
    resetCustomization
  } = useCustomization();

  const [customColors, setCustomColors] = React.useState({
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent
  });

  const handleColorPresetChange = (preset: typeof colorOptions[0]) => {
    if (preset.name === "Custom") {
      setColors({
        ...colors,
        primary: customColors.primary,
        secondary: customColors.secondary,
        accent: customColors.accent
      });
    } else {
      setColors({
        ...colors,
        primary: preset.primary,
        secondary: preset.secondary,
        accent: preset.accent
      });
      setCustomColors({
        primary: preset.primary,
        secondary: preset.secondary,
        accent: preset.accent
      });
    }
  };

  const handleCustomColorChange = (colorType: keyof typeof customColors, value: string) => {
    setCustomColors(prev => ({ ...prev, [colorType]: value }));
    if (colorOptions[5].name === "Custom") {
      setColors(prev => ({ ...prev, [colorType]: value }));
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Customize Template</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white"
          onClick={resetCustomization}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <Tabs defaultValue="colors">
        <TabsList className="grid grid-cols-3 mb-6 bg-white/10">
          <TabsTrigger value="colors" className="data-[state=active]:bg-white/20">
            <Palette className="w-4 h-4 mr-2" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="data-[state=active]:bg-white/20">
            <Type className="w-4 h-4 mr-2" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="layout" className="data-[state=active]:bg-white/20">
            <Maximize className="w-4 h-4 mr-2" />
            Layout
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          <div className="space-y-4">
            <Label>Color Theme</Label>
            <div className="grid grid-cols-3 gap-2">
              {colorOptions.map((option) => (
                <Button
                  key={option.name}
                  variant="outline"
                  className={`h-auto py-2 px-3 flex flex-col items-center justify-center border-white/20 hover:border-white/40 ${
                    colors.primary === (option.name === "Custom" ? customColors.primary : option.primary)
                      ? "border-white border-2"
                      : ""
                  }`}
                  onClick={() => handleColorPresetChange(option)}
                >
                  {option.name === "Custom" ? (
                    <div className="flex gap-1 mt-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: customColors.primary }} />
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: customColors.secondary }} />
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: customColors.accent }} />
                    </div>
                  ) : (
                    <div className="flex gap-1 mt-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: option.primary }} />
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: option.secondary }} />
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: option.accent }} />
                    </div>
                  )}
                  <span className="text-xs mt-2">{option.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <Label>Custom Colors</Label>
            <div className="space-y-4">
              <div className="grid grid-cols-[auto,1fr] gap-4 items-center">
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: customColors.primary }}
                />
                <Input
                  type="text"
                  value={customColors.primary}
                  className="bg-white/5 border-white/10 text-white"
                  onChange={(e) => handleCustomColorChange("primary", e.target.value)}
                  placeholder="#0ea5e9"
                />
              </div>
              <div className="grid grid-cols-[auto,1fr] gap-4 items-center">
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: customColors.secondary }}
                />
                <Input
                  type="text"
                  value={customColors.secondary}
                  className="bg-white/5 border-white/10 text-white"
                  onChange={(e) => handleCustomColorChange("secondary", e.target.value)}
                  placeholder="#6366f1"
                />
              </div>
              <div className="grid grid-cols-[auto,1fr] gap-4 items-center">
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: customColors.accent }}
                />
                <Input
                  type="text"
                  value={customColors.accent}
                  className="bg-white/5 border-white/10 text-white"
                  onChange={(e) => handleCustomColorChange("accent", e.target.value)}
                  placeholder="#f59e0b"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <div className="space-y-4">
            <Label>Font Size</Label>
            <RadioGroup 
              value={fontSize} 
              onValueChange={(value) => setFontSize(value as FontSize)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="font-small" />
                <Label htmlFor="font-small" className="cursor-pointer text-sm">Small</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="font-medium" />
                <Label htmlFor="font-medium" className="cursor-pointer">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="font-large" />
                <Label htmlFor="font-large" className="cursor-pointer text-lg">Large</Label>
              </div>
            </RadioGroup>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <div className="space-y-4">
            <Label>Spacing</Label>
            <RadioGroup 
              value={spacing} 
              onValueChange={(value) => setSpacing(value as Spacing)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="spacing-compact" />
                <Label htmlFor="spacing-compact" className="cursor-pointer">Compact</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="spacing-normal" />
                <Label htmlFor="spacing-normal" className="cursor-pointer">Normal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="spacious" id="spacing-spacious" />
                <Label htmlFor="spacing-spacious" className="cursor-pointer">Spacious</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <Label>Section Order</Label>
            <div className="space-y-4">
              <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
                <Label>Summary</Label>
                <Slider 
                  min={1} 
                  max={4} 
                  step={1} 
                  value={[sectionOrder.summary]}
                  onValueChange={(value) => updateSectionOrder("summary", value[0])}
                  className="w-32"
                />
              </div>
              <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
                <Label>Experience</Label>
                <Slider 
                  min={1} 
                  max={4} 
                  step={1} 
                  value={[sectionOrder.experience]}
                  onValueChange={(value) => updateSectionOrder("experience", value[0])}
                  className="w-32"
                />
              </div>
              <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
                <Label>Education</Label>
                <Slider 
                  min={1} 
                  max={4} 
                  step={1} 
                  value={[sectionOrder.education]}
                  onValueChange={(value) => updateSectionOrder("education", value[0])}
                  className="w-32"
                />
              </div>
              <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
                <Label>Skills</Label>
                <Slider 
                  min={1} 
                  max={4} 
                  step={1} 
                  value={[sectionOrder.skills]}
                  onValueChange={(value) => updateSectionOrder("skills", value[0])}
                  className="w-32"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomizationPanel;
