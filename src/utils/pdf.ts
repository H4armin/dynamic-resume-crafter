
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (elementId: string, filename: string = "resume.pdf") => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error("Element not found:", elementId);
      return false;
    }

    // Wait for all images to load
    const images = element.getElementsByTagName("img");
    await Promise.all(Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }));

    // Add a temporary class to improve rendering for PDF
    element.classList.add("pdf-rendering");

    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      onclone: (documentClone) => {
        // Apply additional styles to the clone for better PDF rendering
        const elementClone = documentClone.getElementById(elementId);
        if (elementClone) {
          // Use setAttribute for non-standard CSS properties
          elementClone.setAttribute("style", elementClone.getAttribute("style") || "" + "font-display: swap;");
          
          // Enhance text rendering
          const allTextElements = elementClone.querySelectorAll('h1, h2, h3, p, span, div');
          allTextElements.forEach(el => {
            (el as HTMLElement).style.textRendering = 'optimizeLegibility';
          });
        }
      }
    });

    // Remove the temporary class
    element.classList.remove("pdf-rendering");

    // A4 dimensions in mm
    const imgWidth = 210;
    const imgHeight = 297;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // Calculate the scaling ratio to fit the content to A4
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Add image to PDF maintaining A4 proportions
    pdf.addImage(
      canvas.toDataURL("image/jpeg", 1.0),
      "JPEG",
      0,
      0,
      pdfWidth,
      pdfHeight,
      undefined,
      'FAST'
    );

    pdf.save(filename);
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
};

// Add a function to open a preview modal
export const previewResume = (elementId: string) => {
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
