
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

    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: true,
      backgroundColor: "#ffffff",
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

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
