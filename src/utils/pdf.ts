
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (elementId: string, filename: string = "resume.pdf") => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error("Element not found:", elementId);
      return false;
    }

    // Force any pending layout calculations
    window.dispatchEvent(new Event('resize'));
    
    // Add PDF rendering class
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

    // Determine which template is being used for specific optimizations
    const isTemplate2 = element.querySelector(".border-l-8.border-blue-600") !== null;
    
    // Create canvas with improved settings
    const canvas = await html2canvas(element, {
      scale: 4, // Higher resolution
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: isTemplate2 ? 1200 : undefined, // Fixed width for Template2
      height: isTemplate2 ? 1698 : undefined, // A4 proportional height at 1200px width
      onclone: (documentClone) => {
        const elementClone = documentClone.getElementById(elementId);
        if (elementClone) {
          // Add extra styling to ensure content renders correctly
          const styleElement = documentClone.createElement('style');
          styleElement.innerHTML = `
            /* Override colors and visibility */
            #${elementId} * {
              visibility: visible !important;
              opacity: 1 !important;
            }
            
            /* Template2 specific fixes */
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
            
            #${elementId} .text-gray-600 {
              color: #4B5563 !important;
            }
            
            #${elementId} .text-gray-400 {
              color: #9CA3AF !important;
            }
            
            #${elementId} .text-gray-700 {
              color: #374151 !important;
            }
            
            #${elementId} .text-gray-800 {
              color: #1F2937 !important;
            }
            
            #${elementId} .bg-gray-50 {
              background-color: #F9FAFB !important;
              color: #374151 !important;
              padding: 0.5rem 1rem !important;
              border-radius: 0.5rem !important;
              display: inline-block !important;
            }
            
            #${elementId} .grid-cols-2 {
              display: grid !important;
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              gap: 3rem !important;
            }
            
            /* Fix spacing issues */
            #${elementId} .mb-12 {
              margin-bottom: 3rem !important;
            }
            
            #${elementId} .mb-8 {
              margin-bottom: 2rem !important;
            }
            
            #${elementId} .mb-6 {
              margin-bottom: 1.5rem !important;
            }
            
            #${elementId} .mb-4 {
              margin-bottom: 1rem !important;
            }
            
            #${elementId} .mb-3 {
              margin-bottom: 0.75rem !important;
            }
            
            /* Fix flex layout */
            #${elementId} .flex {
              display: flex !important;
            }
            
            #${elementId} .flex-wrap {
              flex-wrap: wrap !important;
            }
            
            #${elementId} .gap-2 {
              gap: 0.5rem !important;
            }
          `;
          documentClone.head.appendChild(styleElement);
          
          // Ensure proper dimensions
          elementClone.style.width = isTemplate2 ? "1200px" : "100%";
          elementClone.style.maxWidth = "100%";
          elementClone.style.margin = "0";
          elementClone.style.padding = isTemplate2 ? "3rem" : "inherit";
          
          // Ensure borders are visible
          const borderElement = elementClone.querySelector(".border-l-8");
          if (borderElement) {
            borderElement.setAttribute("style", 
              "border-left: 8px solid #2563EB !important; padding-left: 2rem !important;"
            );
          }
        }
      }
    });

    // Remove the temporary class
    element.classList.remove("pdf-rendering");
    
    // A4 dimensions in points (72 DPI)
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    
    // Calculate dimensions while preserving aspect ratio
    const imgWidth = pageWidth - 40; // Add margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create new PDF document
    const pdf = new jsPDF({
      unit: "pt",
      format: "a4",
      orientation: imgHeight > pageHeight ? "landscape" : "portrait",
    });
    
    // If the height is greater than the page height, we need multiple pages
    let position = 20; // Top margin
    const leftMargin = 20; // Left margin
    
    if (imgHeight <= pageHeight - 40) {
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
      let pageHeight = pdf.internal.pageSize.height - 40; // Page height minus margins
      
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
    
    // Save the PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
};

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
