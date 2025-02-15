import { FiUploadCloud } from "react-icons/fi";
import axios from "axios";
import styles from './UploadPDF.module.css';

export default function UploadPDF({ onSuccess }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    try {
      const formData = new FormData();
      formData.append("pdf", file);
  
      const response = await axios.post("http://localhost:5000/api/resumes/upload-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      onSuccess(response.data.parsedResume);
    } catch (error) {
      alert("Failed to upload and parse PDF. Please check the file format.");
    }
  };  

  return (
    <label className={styles.uploadLabel}>
      <FiUploadCloud className={styles.uploadIcon} />
      Upload PDF
      <input
        type="file"
        accept=".pdf"
        onChange={handleUpload}
        className={styles.fileInput}
      />
    </label>
  );
}