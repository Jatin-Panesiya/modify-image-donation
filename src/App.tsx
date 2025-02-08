import { useState } from "react";
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import html2canvas from "html2canvas";

const App = () => {
  const [img, setImage] = useState("");
  const [name, setName] = useState("");
  const [donation, setDonation] = useState("");
  function getImageFileObject(imageFile: any) {
    setImage(imageFile.dataUrl);
  }

  function runAfterImageDelete(file: any) {
    console.log({ file });
  }

  // Function to download only the combined image
  const handleDownload = () => {
    const captureElement = document.getElementById("capture");

    if (captureElement) {
      html2canvas(captureElement).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = "combined-image.png";
        link.click();
      });
    }
  };

  return (
    <div className="px-2 space-y-5">
      <ImageUploader
        onFileAdded={(img: any) => getImageFileObject(img)}
        onFileRemoved={(img: any) => runAfterImageDelete(img)}
      />
      <div>
        <div className="pb-1">
          <p className="pb-1">Name</p>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter Name"
            className="border px-2 w-[270px]"
          />
        </div>
        <div>
          <p className="pb-1">Donation</p>
          <input
            onChange={(e) => {
              setDonation(e.target.value);
            }}
            placeholder="Enter Name"
            className="border px-2 w-[270px]"
          />
        </div>
      </div>
      {/* This div will be captured and downloaded */}
      <div className="relative w-[270px] h-[480px] border" id="capture">
        {/* Background Image */}
        <img src="/photo.png" alt="full" className="w-[270px] h-[480px]" />
        {/* Uploaded Profile Image */}
        <div className="absolute z-40 bottom-[145px] left-3 font-bold">
          {name}
        </div>
        <div className="absolute z-40 top-[210px] left-[140px] break-all font-bold w-[130px]">
          {donation}
        </div>
        {img && (
          <img
            src={img}
            alt="profile"
            className="absolute z-40 bottom-[172px] left-[6px]"
            style={{ width: "120px", height: "140px" }}
          />
        )}
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Download Image
      </button>
    </div>
  );
};

export default App;
