const fileInput = document.getElementById("postImage");
const fileMessage = document.getElementById("messageFile");

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0){
    fileMessage.innerText = `Arquivo selecionado: ${fileInput.files[0].name}`
  }
});