import { FiDownload, FiUploadCloud, FiShare2 } from 'react-icons/fi';
import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import UploadPDF from '../UploadPDF/UploadPDF';
import styles from './Toolbar.module.css';

export default function Toolbar({ resumeData, onTemplateChange, onPDFUpload }) {
  const handleDownloadPDF = async () => {
    const previewElement = document.getElementById('resume-preview');
    const doc = new jsPDF('p', 'mm', 'a4');
    
    await doc.html(previewElement, {
      callback: () => doc.save('resume.pdf'),
      margin: [15, 15, 15, 15],
      autoPaging: 'text',
      width: 190, // A4 width in mm
      windowWidth: previewElement.scrollWidth,
    });
  };

  const handleDownloadImage = async (format = 'png') => {
    const previewElement = document.getElementById('resume-preview');
    const dataUrl = await (format === 'png' ? toPng : toJpeg)(previewElement, {
      quality: 1.0,
      pixelRatio: 3, // For higher resolution
    });

    const link = document.createElement('a');
    link.download = `resume.${format}`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className={styles.toolbar}>
      <button 
        onClick={handleDownloadPDF}
        className={styles.button}
      >
        <FiDownload className={styles.icon} /> PDF
      </button>

      <button 
        onClick={() => handleDownloadImage('png')}
        className={styles.button}
      >
        <FiDownload className={styles.icon} /> PNG
      </button>

      <UploadPDF onSuccess={onPDFUpload} />

      <button className={styles.button}>
        <FiShare2 className={styles.icon} /> Share
      </button>
    </div>
  );
}