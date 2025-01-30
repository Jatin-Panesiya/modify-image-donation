import { useState } from 'react'
import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'
import html2canvas from 'html2canvas'

const App = () => {
  const [img, setImage] = useState('')
  
  function getImageFileObject(imageFile: any) {
    setImage(imageFile.dataUrl)
  }

  function runAfterImageDelete(file: any) {
    console.log({ file })
  }

  // Function to download the combined image
  const handleDownload = () => {
    const captureElement = document.getElementById('capture');

    if (captureElement) {
      html2canvas(captureElement).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'combined-image.png';
        link.click();
      });
    }
  };

  return (
    <div className='px-2'>
      <ImageUploader
        onFileAdded={(img: any) => getImageFileObject(img)}
        onFileRemoved={(img: any) => runAfterImageDelete(img)}
      />
      
      {/* The container to be captured */}
      <div className='relative w-fit' id="capture">
        <img src='/img.jpeg' alt='full' style={{ width: '400px', height: '700px' }} />
        {img && <img src={img} alt="profile" className='absolute z-40 bottom-[162px]' style={{ width: '200px', height: '180px' }} />}
      </div>

      {/* Download button */}
      <button onClick={handleDownload} className="mt-4 p-2 bg-blue-500 text-white rounded">Download Image</button>
    </div>
  )
}

export default App
