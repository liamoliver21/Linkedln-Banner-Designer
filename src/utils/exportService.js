import { jsPDF } from "jspdf";

export const downloadBannerAsJPEG = (canvasId, filename = "banner.jpg") => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error("Canvas element not found");
        return;
    }

    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/jpeg', 0.95); // High quality
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const downloadBannerAsPDF = (canvasId, filename = "banner.pdf") => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error("Canvas element not found");
        return;
    }

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    // Standard PDF dimensions or custom? 
    // Banner is 1584x396px. 
    // Let's create a PDF with matching aspect ratio or fit to A4 landscape?
    // User requested "Proper dimensions maintained".

    // Create custom size PDF matching the pixels (converted to points/mm approx)
    // 1px = 0.75 point usually
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1584, 396]
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, 1584, 396);
    pdf.save(filename);
};
