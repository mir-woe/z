// FIX!!!!






// //light dark button switch
// const themeToggler = document.querySelector("#changeDarkLight");

// // stored theme colour
// const currentTheme = localStorage.getItem("theme");

// console.log (currentTheme)

// function lightMode(){
//     document.body.classList.toggle("light-theme");
// }

// if (currentTheme == "light") {
//     document.body.classList.add("light-theme");
//     // themeToggler.innerHTML = "dark_mode";
// } else {
//     document.body.classList.add("dark-theme");
//     // themeToggler.innerHTML = "light_mode";
// }
  
  


// themeToggler.addEventListener("click", function () {
//     console.log ("press")
//     lightMode()
//     let theme = "dark";
//     themeToggler.innerHTML = "light_mode";
//         if (document.body.classList.contains("light-theme")) {
//         theme = "light";    
//         themeToggler.innerHTML = "dark_mode";
//     } localStorage.setItem("theme", theme);
// });

// let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;
// window.onload = function () {
//     if (currentTheme == null){
//         if(matched){
//             themeToggler.innerHTML = "dark_mode";
//             localStorage.setItem('theme', "dark")
//             console.log('Currently in dark mode');
//         } else if(!matched){
//             localStorage.setItem('theme', "light")
//             lightMode()
//             themeToggler.innerHTML = "light_mode";
//             console.log (theme)
//         } else {
//             themeToggler.innerHTML = "light_mode";
//             localStorage.setItem('theme', "light")
//             console.log('Currently in light mode');}
// }}













//light dark button switch
const themeToggler = document.querySelector("#changeDarkLight");

// stored theme colour
var currentTheme = localStorage.getItem("theme");

console.log (currentTheme)

if (currentTheme == "light") {
    document.body.classList.add("light-theme");
    // themeToggler.innerHTML = "dark_mode";
} else {
    document.body.classList.add("dark-theme");
    // themeToggler.innerHTML = "light_mode";
}
  
  


themeToggler.addEventListener("click", function () {

    document.body.classList.remove(currentTheme)
    console.log ("removed:" + currentTheme)
     if (currentTheme ==  "dark"){
        console.log ("dark")
        document.body.classList.toggle("light-theme");
        document.body.classList.toggle("dark-theme");
        currentTheme = "dark"
        themeToggler.innerHTML = "light_mode";
    }
    else if (currentTheme == "light"){
        console.log ("light")
        document.body.classList.toggle("dark-theme");
        document.body.classList.toggle("light-theme");
        currentTheme = "light"
        themeToggler.innerHTML = "dark_mode";

    }

    
    console.log ("press")
    
    localStorage.setItem("theme", "dark");
});



let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (currentTheme == null){
        if(matched){
            darkMode()
            themeToggler.innerHTML = "dark_mode";
            localStorage.setItem('theme', "dark")
            console.log('Currently in dark mode');
        } else if(!matched){
            lightMode()
            localStorage.setItem('theme', "light")
            themeToggler.innerHTML = "light_mode";
        } else {
            themeToggler.innerHTML = "light_mode";
            localStorage.setItem('theme', "light")
            console.log('Currently in light mode');
        }
    }


