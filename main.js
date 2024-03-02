document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#submit").addEventListener("click", (e) => {
    submit_form(e);
  });
});

function submit_form(e) {
  e.target.setAttribute("disabled", "false");
  let fullname = document.getElementById("fullname").value;
  let email = document.getElementById("email").value;
  let number = document.getElementById("number").value;
  if (fullname.length < 4 || /*(!email.contains("@")) ||*/ number.length < 1) {
    alert("Please input valid options");
    throw new Error("Please input valid options")
  }
  let endpoint = "https://index-ui.onrender.com/destino/file";
  fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      fullname: fullname,
      email: email,
      phone_number: parseInt(number),
    }),
  }).then((response) => {
    if (!response.ok) {
      alert(response.status);
      throw new Error("A server error occurred");
      location.reload();
    }
    return response.blob(); // Corrected this line
  }).then((book_data) => { // Changed the argument here to the actual blob data
    let book_url = URL.createObjectURL(book_data);
    let book = document.createElement("a");
    book.setAttribute("hidden", "true"); // Corrected the value of hidden attribute
    book.href = book_url;
    book.download = "Sales Mastery.pdf";
    book.click();
    location.reload();
  }).catch((error) => {
    alert("Check Your Network Connection::Net:Err");
    console.log(error);
    location.reload();
  });
}  

function scroll_to(to) {
  let location = document.querySelector(to);
  location.scrollIntoView({
    behavior: 'smooth'
  })
}