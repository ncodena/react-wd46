import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import domToImage from 'dom-to-image';


const MemeGenerator = () => {

    const [memeImages, setMemeImages] = useState([]);
    const [currentMemeIndex, setCurrentMemeIndex] = useState(0);
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [topTextFile, setTopTextFile] = useState("");
    const [bottomTextFile, setBottomTextFile] = useState("");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [memeImagesGenerated, setMemeImagesGenerated] = useState([]);

    const memeContainerRef = useRef(null);


    useEffect(() => {
        const fetchMemeImages = async () => {
          try {
            const response = await axios.get('https://api.imgflip.com/get_memes');
           setMemeImages(response.data.data.memes);
            console.log(response)
          } catch (error) {
            console.error('Error fetching meme images:', error);
          }
        }
      
        fetchMemeImages();
      }, []);

      console.log(memeImages, 'memeImages')

      const handlePreviousMeme = () => {
        setTopText("");
        setBottomText("");
        setCurrentMemeIndex((prevIndex) =>
          prevIndex === 0 ? memeImages.length - 1 : prevIndex - 1
        );
      };
    
      const handleNextMeme = () => {
        setTopText("");
        setBottomText("");
        setCurrentMemeIndex((prevIndex) =>
          (prevIndex + 1) % memeImages.length
        );
      };

      const handleImageUpload = (e) => {
        setTopTextFile('');
        setBottomTextFile('');
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            setUploadedImage(fileReader.result);
          };
          fileReader.readAsDataURL(uploadedFile);
        }
      };

      const generateImage = () => {
        domToImage.toPng(memeContainerRef.current)
          .then(dataUrl => {
            setGeneratedImage(dataUrl);
            setMemeImagesGenerated([...memeImagesGenerated, dataUrl])
          })
          .catch(error => {
            console.error('Error generating image:', error);
          });
      };

      const resetImage = () => {
        setUploadedImage(null);
        setGeneratedImage(null);
        setTopTextFile('');
        setBottomTextFile('');
      };
      console.log(memeImagesGenerated)
      return (
        <div>
            <h2>IMG FLIP MEMES</h2>
            <div className='main-container'>
                <div className="container">
                    <h4>Provide some text to the current meme displayed</h4>
                    <div className="inputs-buttons-container">
                        <input
                            type="text"
                            placeholder="Top text"
                            value={topText}
                            onChange={(e) => setTopText(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Bottom text"
                            value={bottomText}
                            onChange={(e) => setBottomText(e.target.value)}
                        />
                    </div>
                </div>

                <div className="inputs-buttons-container">
                    <button disabled={currentMemeIndex === 0} onClick={handlePreviousMeme}>Previous</button>
                    <button onClick={handleNextMeme}>Next</button>
                </div>
                
                {memeImages.length > 0 ? (
                    <div className="meme-container">
                        <img
                            className="meme-image"
                            src={memeImages[currentMemeIndex]?.url}
                            alt="Meme"
                        />
                        <div className="meme-text top-text">{topText}</div>
                        <div className="meme-text bottom-text">{bottomText}</div>
                    </div>
                        
                ) : (
                    <p>Loading...</p>
                )}

                <div className='meme-images-generated'>
                
                <h2>Generated Memes</h2>
                <div className="image-upload">
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
                
                </div>
            

                {uploadedImage ? (
                        <>
                            <div className="text-inputs">
                                <h4>Provide some text to the selected meme</h4>
                                <input
                                    type="text"
                                    placeholder="Top text"
                                    value={topTextFile}
                                    onChange={(e) => setTopTextFile(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Bottom text"
                                    value={bottomTextFile}
                                    onChange={(e) => setBottomTextFile(e.target.value)}
                                />
                            </div>
                            <div className="inputs-buttons-container">
                                <button onClick={generateImage}>Generate Image</button>
                                <button onClick={resetImage}>Reset</button>
                            </div>

                            <div className="meme-container" ref={memeContainerRef}>
                                <img
                                    className="meme-image"
                                    src={uploadedImage}
                                    alt="Meme"
                                />
                                <div className="meme-text top-text">{topTextFile}</div>
                                <div className="meme-text bottom-text">{bottomTextFile}</div>
                            </div>

                        </>
                ) : null}

                {memeImagesGenerated.length > 0 ? (
                    <div className='image-gallery'>
                        <h4>Your images uploaded</h4>
                    {memeImagesGenerated.map((image, index) => (
                        <div key={index} className="generated-meme">
                        <img src={image} alt={`Generated Meme ${index}`} />
                        </div>
                    ))}
                    </div>
                ) : <p>Start generating your own memes!</p>}
            </div>

            
        </div>
      );
    }

export default MemeGenerator;