console.log('in second script')
import displaySelectedImage from "./show.js";
import {client} from "https://cdn.jsdelivr.net/npm/@gradio/client@0.1.4/dist/index.min.js";
console.log('gradio imported')
const imageInput = document.getElementById("imageInput");
const imageExamples = document.querySelectorAll(".example-image");
const selectedImageContainer = document.getElementById("selectedImage");
// Event listener for selecting an image from examples
imageExamples.forEach(example => {
    example.addEventListener("click", () => {
        const imageUrl = example.getAttribute("src");
        displaySelectedImage(imageUrl);
    });
});

// Event listener for uploading a custom image
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        displaySelectedImage(imageUrl);
    }
});
// Function to trigger the prediction and update the result on the webpage
async function predictWithGradio(imageDataURL) {
    console.log('Button clicked')
    console.log('got image data URL')
    // Convert the data URL to a Blob
    console.log(imageDataURL)
    const response_0 = await fetch(imageDataURL);
    console.log(response_0)
    const exampleImage = await response_0.blob();
    // const exampleImage = dataURLToBlob(imageDataURL);
    console.log('got image')
    console.log(typeof exampleImage)

    const app = await client("https://dhits-weed-classifier.hf.space/");
    console.log("app is ready")
    const result = await app.predict("/predict", [exampleImage]);
    console.log(result.data);
    // Update the result on the webpage
    document.getElementById("prediction-result").innerText = 'Test';
    document.getElementById("prediction-result").innerText = JSON.stringify(result.data, null, 2);
}

// Function to convert a data URL to a Blob
function dataURLToBlob(dataURL) {

    const arr = dataURL.split(",");
    console.log(arr.length)
    console.log(arr[0])

    const mime = arr[0].match(/:(.*?);/)[1];
    const byteString = atob(arr[1]);
    console.log(arr[1])

    let n = byteString.length;
    const uint8Array = new Uint8Array(n);
    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([uint8Array], { type: mime });
}

// Add event listener to the button
document.getElementById("predict-button").addEventListener("click", predictWithGradio.bind(null, imageInput));
