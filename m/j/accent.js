accentButton = document.getElementsByClassName("accent")

var accentColour = localStorage.getItem("accentColour");

var defaultAccent = "blue-accent"

console.log (accentColour)
  
clr = accentColour+"-accent"

try {
  document.body.classList.add(clr);
} catch(err) {
  console.log(err)
}

var i;
for (i = 0; i < accentButton.length; i++) {
    accentButton[i].addEventListener("click", function () {

        try {
          document.body.classList.remove(clr)
        } catch (err){
          console.log(err)
        }
        console.log ("removed" + clr)
        var accentColour = this.innerHTML+"-accent"
        var accentColour = accentColour.replaceAll(' ','');
        document.body.classList.add(accentColour);
        console.log ("added" + accentColour)
        localStorage.setItem("accentColour",  this.innerHTML)
        clr = accentColour
  });
}

  if (accentColour == null){
    document.body.classList.add("blue-accent"); 
    localStorage.setItem("accentColour",  "blue")
  }


// accents = document.querySelectorAll("[class*=accent]")