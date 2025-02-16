import { useState, useEffect } from "react";
import axios from "axios";

export default function LogoManager() {
  const [logos, setLogos] = useState({ logo1: null, logo2: null });

  // Fetch logos
  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/get-logos").then((res) => {
      const logoData = res.data.logos.reduce((acc, logo) => {
        acc[logo.type] = logo.url;
        return acc;
      }, {});
      setLogos(logoData);
    });
  }, []);

  // Handle file upload
  const handleUpload = async (e, logoType) => {
    const formData = new FormData();
    formData.append("logo", e.target.files[0]);

    await axios.post(`http://localhost:5000/api/admin/upload-logo/${logoType}`, formData);
    window.location.reload(); // Reload to update images
  };

  // Handle delete logo
  const handleDelete = async (logoType) => {
    await axios.delete(`http://localhost:5000/api/admin/delete-logo/${logoType}`);
    window.location.reload(); // Reload to update images
  };

  return (
    <div>
      <h2>Logo Management</h2>
      {["logo1", "logo2"].map((logoType) => (
        <div key={logoType}>
          <h3>{logoType.toUpperCase()}</h3>
          {logos[logoType] ? (
            <>
              <img src={logos[logoType]} alt={logoType} width={150} />
              <button onClick={() => handleDelete(logoType)}>Delete</button>
            </>
          ) : (
            <p>No logo uploaded</p>
          )}
          <input type="file" onChange={(e) => handleUpload(e, logoType)} />
        </div>
      ))}
    </div>
  );
}
