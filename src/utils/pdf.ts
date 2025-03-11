
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

    // Force any pending layout calculations
    window.dispatchEvent(new Event('resize'));
    
    // Wait for any potential DOM updates to complete
    await new Promise(resolve => setTimeout(resolve, 300));

    // Create the canvas with improved settings
    const canvas = await html2canvas(element, {
      scale: 3, // Higher quality (increased from 2)
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 1200, // Use a fixed width for consistency
      onclone: (documentClone) => {
        // Apply additional styles to the clone for better PDF rendering
        const elementClone = documentClone.getElementById(elementId);
        if (elementClone) {
          // Ensure proper dimensions
          elementClone.style.width = "100%";
          elementClone.style.maxWidth = "100%";
          elementClone.style.margin = "0";
          
          // Force specific CSS for optimal PDF rendering
          const styleElement = documentClone.createElement('style');
          styleElement.innerHTML = `
            /* Force all elements to be visible */
            #${elementId} * {
              visibility: visible !important;
              opacity: 1 !important;
              transform: none !important;
            }
            
            /* Force grid and flex layouts */
            #${elementId} .grid {
              display: grid !important;
            }
            #${elementId} .flex {
              display: flex !important;
            }
            
            /* Fix specific display issues */
            #${elementId} .text-orange-500 {
              color: #F97316 !important;
            }
            #${elementId} h1 {
              font-size: 2.5rem !important;
            }
            #${elementId} h2 {
              font-size: 1.5rem !important;
            }
            #${elementId} .font-serif {
              font-family: Georgia, serif !important;
            }
            #${elementId} .rounded-full {
              border-radius: 9999px !important;
            }
            
            /* Fix layout ordering */
            #${elementId} .order-1, #${elementId} .order-2,
            #${elementId} .sm\\:order-1, #${elementId} .sm\\:order-2 {
              order: initial !important;
            }
            
            /* Fix background colors */
            #${elementId} .bg-white {
              background-color: #FFFFFF !important;
            }
            #${elementId} .bg-gray-100 {
              background-color: #F3F4F6 !important;
            }
            
            /* Fix text colors */
            #${elementId} .text-gray-700, 
            #${elementId} .text-gray-600, 
            #${elementId} .text-gray-900 {
              color: #000000 !important;
            }
          `;
          documentClone.head.appendChild(styleElement);
          
          // Apply specific fixes for Template1
          if (elementClone.querySelector('.font-serif')) {
            // Ensure proper layout for Template1
            const container = elementClone.querySelector('.grid');
            if (container) {
              container.setAttribute('style', 'display: grid !important; grid-template-columns: 1.5fr 1fr !important; gap: 1rem !important;');
            }
            
            // Fix profile image rendering
            const profileImg = elementClone.querySelector('.rounded-full img');
            if (profileImg) {
              profileImg.setAttribute('style', 'display: block !important; width: 100% !important; height: 100% !important; object-fit: cover !important;');
            }
            
            // Fix header layout
            const header = elementClone.querySelector('.flex.flex-col.sm\\:flex-row');
            if (header) {
              header.setAttribute('style', 'display: flex !important; flex-direction: row !important; gap: 1.5rem !important;');
              
              // Fix order of elements
              const headerItems = header.querySelectorAll('.order-1, .order-2, .sm\\:order-1, .sm\\:order-2');
              headerItems.forEach((item) => {
                (item as HTMLElement).style.order = 'initial';
              });
            }
          }
        }
      }
    });

    // Remove the temporary class
    element.classList.remove("pdf-rendering");

    // A4 dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true
    });

    // Calculate aspect ratio of the canvas
    const canvasAspectRatio = canvas.width / canvas.height;
    
    // Calculate dimensions to fit A4 while maintaining aspect ratio
    let imgWidth = pdfWidth;
    let imgHeight = pdfWidth / canvasAspectRatio;
    
    // If height exceeds A4, adjust both dimensions
    if (imgHeight > pdfHeight) {
      imgHeight = pdfHeight - 10; // Add a small margin
      imgWidth = imgHeight * canvasAspectRatio;
    }
    
    // Calculate margins to center the image
    const marginLeft = (pdfWidth - imgWidth) / 2;
    const marginTop = 5; // Add a small top margin
    
    // Add image to PDF with proper positioning
    pdf.addImage(
      canvas.toDataURL("image/jpeg", 1.0),
      "JPEG",
      marginLeft,
      marginTop,
      imgWidth,
      imgHeight,
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
