const username = document.querySelector(".username");
const email_address = document.querySelector(".email_address")
const usergithub = document.querySelector(".userGithub")
const userFullname = document.querySelector(".userFullname")

const fullName = sessionStorage.getItem("fullName"); 
const email = sessionStorage.getItem("email");
const github = sessionStorage.getItem("github");
const base64 = sessionStorage.getItem("imageData");

if (username && email_address && usergithub) {
    username.textContent = fullName;
    email_address.textContent = email;
    usergithub.textContent = github;
    userFullname.textContent = fullName;


}

const userImage = document.querySelector(".userImage"); 

if (userImage && base64) {
    console.log(base64)
    userImage.style.backgroundImage = `url(${base64})`;
}