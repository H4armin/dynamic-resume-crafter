
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Generic configuration for PDF export
const PDF_CONFIG = {
  scale: 4, // Higher resolution
  useCORS: true,
  allowTaint: true,
  logging: false,
  backgroundColor: "#ffffff",
  margin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  }
};

/**
 * Core PDF generation function that works with any resume template
 * @param elementId - DOM ID of the element to export
 * @param filename - Output PDF filename
 * @returns Promise<boolean> - Success status
 */
export const generatePDF = async (elementId: string, filename: string = "resume.pdf"): Promise<boolean> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error("Element not found:", elementId);
      return false;
    }

    // Force any pending layout calculations and wait for styles/images
    window.dispatchEvent(new Event('resize'));
    
    // Add PDF rendering class to optimize styling for PDF export
    element.classList.add("pdf-rendering");
    
    // Wait for all images to load
    const images = Array.from(element.getElementsByTagName("img"));
    await Promise.all(
      images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );
    
    // Wait for any styles to apply
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get template type to apply specific optimizations
    const templateType = getTemplateType(element);
    
    // Create canvas with template-specific settings
    const canvas = await html2canvas(element, {
      ...PDF_CONFIG,
      width: getOptimalWidth(templateType),
      height: getOptimalHeight(templateType),
      onclone: documentClone => optimizeForPrint(documentClone, elementId, templateType)
    });

    // Remove the temporary class after capturing
    element.classList.remove("pdf-rendering");
    
    // A4 dimensions in points (72 DPI)
    const a4Width = 595.28;
    const a4Height = 841.89;
    
    // Calculate dimensions while preserving aspect ratio
    const imgWidth = a4Width - (PDF_CONFIG.margin.left + PDF_CONFIG.margin.right);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create new PDF document
    const pdf = new jsPDF({
      unit: "pt",
      format: "a4",
      orientation: imgHeight > a4Height ? "landscape" : "portrait",
    });
    
    // Handle multi-page output if needed
    await addImageToPDF(pdf, canvas, imgWidth, imgHeight);
    
    // Save the PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
};

/**
 * Detect template type to apply specific optimizations
 */
function getTemplateType(element: HTMLElement): string {
  if (element.querySelector(".border-l-8.border-blue-600")) return "template2";
  if (element.querySelector(".bg-gray-900.text-white")) return "template3";
  if (element.querySelector(".grid-cols-\\[2\\.5fr\\,1fr\\]")) return "template4";
  return "template1"; // Default
}

/**
 * Get optimal width based on template type
 */
function getOptimalWidth(templateType: string): number | undefined {
  switch (templateType) {
    case "template2": return 1200;
    case "template3": return 1200;
    case "template4": return 1200;
    default: return undefined; // Use element's natural width
  }
}

/**
 * Get optimal height based on template type
 */
function getOptimalHeight(templateType: string): number | undefined {
  switch (templateType) {
    case "template2": return 1698; // A4 proportional height at 1200px width
    case "template3": return 1698;
    case "template4": return 1698;
    default: return undefined; // Use element's natural height
  }
}

/**
 * Optimize document clone for PDF output
 */
function optimizeForPrint(
  documentClone: Document, 
  elementId: string, 
  templateType: string
): Document {
  const elementClone = documentClone.getElementById(elementId);
  if (!elementClone) return documentClone;

  // Add global PDF styling
  const styleElement = documentClone.createElement('style');
  styleElement.innerHTML = `
    /* Global PDF rendering styles */
    #${elementId} * {
      visibility: visible !important;
      opacity: 1 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    /* Force proper display of layout elements */
    #${elementId} .flex {
      display: flex !important;
    }
    
    #${elementId} .grid {
      display: grid !important;
    }
    
    /* Template-specific optimizations */
    ${getTemplateSpecificStyles(templateType)}
  `;
  
  documentClone.head.appendChild(styleElement);
  
  // Apply template-specific dimensions
  elementClone.style.width = getOptimalWidth(templateType) ? `${getOptimalWidth(templateType)}px` : "100%";
  elementClone.style.maxWidth = "100%";
  elementClone.style.margin = "0";
  elementClone.style.padding = templateType === "template2" ? "3rem" : "inherit";
  
  // Ensure specific elements render correctly based on template
  applyTemplateSpecificFixes(elementClone, templateType);
  
  return documentClone;
}

/**
 * Get template-specific CSS styles
 */
function getTemplateSpecificStyles(templateType: string): string {
  switch (templateType) {
    case "template2":
      return `
        #${elementId} .border-l-8.border-blue-600 {
          border-left: 8px solid #2563EB !important;
          padding-left: 2rem !important;
        }
        
        #${elementId} h1 {
          font-size: 40px !important;
          font-weight: 900 !important;
          color: #121212 !important;
        }
        
        #${elementId} h2 {
          font-size: 24px !important;
          font-weight: 700 !important;
          color: #2563EB !important;
        }
        
        #${elementId} .grid-cols-2 {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 3rem !important;
        }
      `;
    
    case "template3":
      return `
        #${elementId} .bg-gray-900 {
          background-color: #1A1A1A !important;
          color: white !important;
        }
        
        #${elementId} .grid-cols-\\[1fr\\,2\\.5fr\\] {
          display: grid !important;
          grid-template-columns: 1fr 2.5fr !important;
        }
      `;
      
    case "template4":
      return `
        #${elementId} .grid-cols-\\[2\\.5fr\\,1fr\\] {
          display: grid !important;
          grid-template-columns: 2.5fr 1fr !important;
          gap: 2rem !important;
        }
        
        #${elementId} .border-b-2 {
          border-bottom-width: 2px !important;
        }
      `;
      
    default:
      return `
        /* Common styles for all templates */
        #${elementId} .text-gray-600 {
          color: #4B5563 !important;
        }
        
        #${elementId} .text-gray-700 {
          color: #374151 !important;
        }
      `;
  }
}

/**
 * Apply template-specific element fixes
 */
function applyTemplateSpecificFixes(elementClone: HTMLElement, templateType: string): void {
  // Template2 border fix
  if (templateType === "template2") {
    const borderElement = elementClone.querySelector(".border-l-8");
    if (borderElement) {
      borderElement.setAttribute("style", 
        "border-left: 8px solid #2563EB !important; padding-left: 2rem !important;"
      );
    }
  }
  
  // Template3 column layout fix
  if (templateType === "template3") {
    const gridElement = elementClone.querySelector(".grid");
    if (gridElement) {
      gridElement.setAttribute("style",
        "display: grid !important; grid-template-columns: 1fr 2.5fr !important;"
      );
    }
  }
  
  // Template4 grid fix
  if (templateType === "template4") {
    const gridElement = elementClone.querySelector(".grid");
    if (gridElement) {
      gridElement.setAttribute("style",
        "display: grid !important; grid-template-columns: 2.5fr 1fr !important; gap: 2rem !important;"
      );
    }
  }
}

/**
 * Add canvas image to PDF, handling multi-page documents if needed
 */
async function addImageToPDF(
  pdf: jsPDF, 
  canvas: HTMLCanvasElement, 
  imgWidth: number, 
  imgHeight: number
): Promise<void> {
  const pageHeight = pdf.internal.pageSize.height - 40; // Page height minus margins
  let position = 20; // Top margin
  const leftMargin = 20; // Left margin
  
  if (imgHeight <= pageHeight) {
    // Image fits on a single page
    pdf.addImage(
      canvas.toDataURL("image/jpeg", 1.0),
      "JPEG",
      leftMargin,
      position,
      imgWidth,
      imgHeight,
      undefined,
      "FAST"
    );
  } else {
    // Image needs multiple pages
    let heightLeft = imgHeight;
    
    // Add first page
    pdf.addImage(
      canvas.toDataURL("image/jpeg", 1.0),
      "JPEG",
      leftMargin,
      position,
      imgWidth,
      imgHeight,
      undefined,
      "FAST"
    );
    heightLeft -= pageHeight;
    
    // Add subsequent pages if needed
    while (heightLeft > 0) {
      position = 20; // Reset position for new page
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL("image/jpeg", 1.0),
        "JPEG",
        leftMargin,
        position - (pageHeight * (imgHeight - heightLeft)) / imgHeight,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );
      heightLeft -= pageHeight;
    }
  }
}

/**
 * Live preview function for resume
 */
export const previewResume = (elementId: string): boolean => {
  const element = document.getElementById(elementId);
  if (!element) return false;
  
  // Create a modal overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
  overlay.style.zIndex = '9999';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.padding = '2rem';
  
  // Close button
  const closeButton = document.createElement('button');
  closeButton.innerText = '× Close Preview';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '1rem';
  closeButton.style.right = '1rem';
  closeButton.style.backgroundColor = '#ffffff';
  closeButton.style.color = '#000000';
  closeButton.style.border = 'none';
  closeButton.style.borderRadius = '4px';
  closeButton.style.padding = '0.5rem 1rem';
  closeButton.style.cursor = 'pointer';
  closeButton.style.fontWeight = 'bold';
  closeButton.onclick = () => document.body.removeChild(overlay);
  
  // Clone the element to display in the modal
  const previewContent = document.createElement('div');
  previewContent.style.backgroundColor = 'white';
  previewContent.style.width = '100%';
  previewContent.style.maxWidth = '800px';
  previewContent.style.height = '90%';
  previewContent.style.overflowY = 'auto';
  previewContent.style.padding = '0';
  previewContent.style.borderRadius = '8px';
  previewContent.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
  
  // Clone the resume and append to preview
  const resumeClone = element.cloneNode(true) as HTMLElement;
  resumeClone.style.transform = 'scale(1)';
  resumeClone.style.transformOrigin = 'top center';
  previewContent.appendChild(resumeClone);
  
  // Add elements to the DOM
  overlay.appendChild(closeButton);
  overlay.appendChild(previewContent);
  document.body.appendChild(overlay);
  
  return true;
};
