const inputFile = document.getElementById("input-file");
const imgField = document.querySelector(".img-field");
const uploadedImg = document.querySelector(".uploaded-img");
const iconUpload = document.querySelector(".icon-upload");
const limitUpload = document.querySelector(".limit_upload");
const sizeLimitIcon = document.querySelector(".limit_upload svg");
const paths = sizeLimitIcon.querySelectorAll("path");
const emailLimitIcon = document.querySelector(".email_input svg");
const emailPaths = emailLimitIcon.querySelectorAll("path");
const removeImage = document.querySelector(".removeImage");
const modificationImage = document.querySelector(".modificationImage");
const dragOver = document.querySelector(".dragOver");
const limitUploadSpan = document.querySelector(".limit_upload span")
const emailInput = document.querySelector(".email_input");
const submitBtn = document.getElementById("submit");
const form = document.getElementById("form");
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let currentFile = null;



inputFile.addEventListener("change", uploadImage);

function uploadImage() {
    const typeAuthorized = ["image/jpeg", "image/png"]
    let file = inputFile.files[0];
    let fileZise = file.size;
    let imgURL = URL.createObjectURL(file) ;

    if (typeAuthorized.includes(file.type)){
        limitUploadSpan.textContent = "Upload your photo (JPG or PNG, max size: 500KB)";
            if (fileZise > 512000) {
        limitUploadSpan.textContent = "File too large. Please upload a photo under 500KB";
        limitUpload.classList.add("invalid")
        paths.forEach(path => {
            path.setAttribute("stroke", "#e16151");
        });

        uploadedImg.style.backgroundImage = ``;
        uploadedImg.classList.remove("added");
        iconUpload.classList.remove("removed");
        modificationImage.classList.add("removed");
        dragOver.classList.remove("removed");
    }
        else{
            currentFile = file;
            uploadedImg.style.backgroundImage = `url(${imgURL})`;
            uploadedImg.classList.add("added");
            iconUpload.classList.add("removed")
            limitUpload.classList.remove("invalid")
            paths.forEach(path => {
                 path.setAttribute("stroke", "#D1D0D5");
             });

            modificationImage.classList.remove("removed");
            dragOver.classList.add("removed");
    }
    }
    else{
        removePhoto();
        limitUploadSpan.textContent = "Only JPG or PNG files are accepted";
        limitUpload.classList.add("invalid");
        
         paths.forEach(path => {
            path.setAttribute("stroke", "#e16151");
        });
    } 
};
removeImage.addEventListener("click", removePhoto);


function removePhoto() {
        uploadedImg.style.backgroundImage = ``;
        limitUploadSpan.textContent = "Upload your photo (JPG or PNG, max size: 500KB)";
        uploadedImg.classList.remove("added");
        iconUpload.classList.remove("removed");
        modificationImage.classList.add("removed");
        dragOver.classList.remove("removed");
        paths.forEach(path => {
            path.setAttribute("stroke", "#D1D0D5");
        });
        
}

     imgField.addEventListener("dragover", function(e){
    e.preventDefault();
})
    imgField.addEventListener("drop", function(e){
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadImage();
})

function validerChamp(condition, inputElement, paths, couleurErreur = "#e16151") {
  if (condition) {
    inputElement.classList.add("removed");
    paths.forEach(path => path.setAttribute("stroke", ""));
    return true;
  } else {
    inputElement.classList.remove("removed");
    paths.forEach(path => path.setAttribute("stroke", couleurErreur));
    return false;
  }
}
function convertirEnBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}


form.addEventListener("submit", async function(e) {
    e.preventDefault();
    const userFullName = document.getElementById("fName").value;
    const userEmail = document.getElementById("email").value;
    const userGithub = document.getElementById("gUsername").value;
    const inputs = [userFullName, userEmail, userGithub];
    console.log(currentFile);

    if (inputs.includes("")) {
        alert("All fields are required");
    } 
    else {
    const emailValide = validerChamp(regexEmail.test(userEmail), emailInput, emailPaths);
    if (emailValide) {
        if (currentFile) {
        const base64 = await convertirEnBase64(currentFile);
        sessionStorage.setItem("imageData", base64);
    }
        sessionStorage.setItem("fullName", userFullName);
        sessionStorage.setItem("email", userEmail);
        sessionStorage.setItem("github", userGithub);
        
        window.location.href = "invitation.html";
     }
    }
}) 


