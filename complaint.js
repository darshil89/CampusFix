function verify(){
    let name=document.getElementById("name").value;
    let select=document.getElementById("select").value;
    let number=document.getElementById("number").value;
    let room = document.getElementById("room").value;
    let description = document.getElementById("description").value; 
    if(name.length!=0 || number.length!=0 || room.length!=0 || description.length!=0 || select!="Select"){
         alert("Complaint recorded!")
    }
    else{
        alert("Fill in all the fields before submitting")
    }
}