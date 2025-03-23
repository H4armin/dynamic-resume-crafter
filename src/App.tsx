
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Templates from "@/pages/templates";
import Editor from "@/pages/editor";
import Preview from "@/pages/preview";
import NotFound from "@/pages/NotFound";
import { CustomizationProvider } from "@/contexts/CustomizationContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import "./App.css";
import "./styles/pdf.css"; // Import PDF styles globally

function App() {
  return (
    <CustomizationProvider>
      <div className="min-h-screen w-full overflow-hidden">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/editor/:templateId" element={<Editor />} />
            <Route path="/preview/:templateId" element={<Preview />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <SonnerToaster position="top-right" />
      </div>
    </CustomizationProvider>
  );
}

export default App;
