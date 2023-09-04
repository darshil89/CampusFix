function login(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username.length==0){
        alert("Please enter username");
        return false;
    }
    if(password.length==0){
        alert("Please enter password");
        return false;
    }
    alert("Login successful")
    
}