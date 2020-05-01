const selectTag = document.querySelector("select");
const getCountry = localStorage.getItem("country");

selectTag.addEventListener("change", e => {
    localStorage.setItem("country", e.target.value);
});

if (getCountry) {
    console.log("aa");
    selectTag.value = getCountry;
}
