
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Simple, reliable PDF generation function that matches UI
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
    
    // Wait for styles to apply
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create high-resolution canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff"
    });
    
    // A4 dimensions in points (72 DPI)
    const a4Width = 595.28;
    const a4Height = 841.89;
    
    // Calculate dimensions while preserving aspect ratio
    const imgWidth = a4Width - 40; // 20pt margin on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create new PDF document
    const pdf = new jsPDF({
      unit: "pt",
      format: "a4",
      orientation: imgHeight > a4Height ? "landscape" : "portrait",
    });
    
    // Add image to PDF
    pdf.addImage(
      canvas.toDataURL("image/jpeg", 1.0),
      "JPEG",
      20, // left margin
      20, // top margin
      imgWidth,
      imgHeight,
      undefined,
      "FAST"
    );
    
    // Save the PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
};

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
