import React, {useState, useRef} from 'react'
import '../css/sellpage.css'


export default function SellPage() {
    
    const [vehicleImage, setVehicleImage] = useState('')
    const [prediction, setPrediction] = useState('')
    const [base64image, setBase64Image] = useState('')
    const imageSelector = useRef(null)

    const submit = () => {
        console.log('change')           
            //when file reader has read image, save it in dataURL as a url which saves image data as base64 string
            let reader = new FileReader()
            reader.onload = (e) => {
                let dataURL = reader.result
                // set selectedImage src to dataURL so image is shown on DOM
                setVehicleImage(dataURL)
                setBase64Image(formatImageString(dataURL))
            }
            if (imageSelector.current.files.length !== 0) {
              //read function occurs and then calls onload
              reader.readAsDataURL(imageSelector.current.files[0])

            }
      }

    //format image string 
    const formatImageString = (imageStr) => {
      console.log(imageStr.split('').splice(11, 3).join(''))
      if (imageStr.split('').splice(11, 3).join('') === 'jpe') {
          imageStr =  imageStr.replace('data:image/jpeg;base64,', '')
      } else if (imageStr.split('').splice(11, 3).join('') === 'png') {
          imageStr =  imageStr.replace('data:image/png;base64,', '')
      } else if (imageStr.split('').splice(11, 3).join('') === 'web') {
          imageStr = imageStr.replace('data:image/webp;base64,', '')
      }
          return imageStr
      }
    
    //send image data to server, get back prediction from AI model
    const predict = () => {
      console.log('sent')
      let message = {
          image: base64image
      }
      fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(message)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setPrediction(data.prediction)
      })
      }



  return (
      <div>
        <div id='main-container'>
          <div id='image-predictor'>
          <h4>Upload Image</h4>
            <img src={vehicleImage} id='vehicle-image' alt=''></img>
            <input id='image-selector' ref={imageSelector} type='file' />
            <button id='submit-button' onClick={submit}>Submit</button>
            <button id="predict-button" onClick={predict}>Predict</button>
          </div>
          <div id='sell-form'>
            <label for='type'>Type </label>
            <input id='vehicle-type' name='type' value={prediction} /> 
            <label for='make'>Make </label>
            <input id='vehicle-make' name='make' />
            <label for='model'>Model </label>
            <input id='vehicle-model' name='model'/>
            <label for='color'>Color </label>
            <input id='vehicle-color' name='color' />
            <button>Post for auction</button>
          </div>

        </div>
      </div>
        
  )
}
