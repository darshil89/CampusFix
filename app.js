function validate(){
let username = document.getElementById("name").value;
let password = document.getElementById("password").value;
let email = document.getElementById("email").value;
let phone = document.getElementById("phone").value;

if(username.length==0){
    alert("Enter username.");
    return false;

}
if(password.length==0){
    alert("Enter password");
    return false;
}
if(email.length==0){
    alert("Enter email");
    return false;
}
if(phone.length==0){
    alert("Enter phone number");
    return false;
}
alert("Sign-up successful");
}