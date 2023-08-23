const selectedImageContainer = document.getElementById("selectedImage");
// Function to display the selected image
function displaySelectedImage(imageURL) {
    selectedImageContainer.innerHTML = `<img src="${imageURL}" alt="Selected Image">`;
}

export default displaySelectedImage