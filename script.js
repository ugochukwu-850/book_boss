document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#authbtn").addEventListener("click", (e) => {
    // send a request and on auth create the table of user data

    fetch("/enpoint_for_generatingUUIS", {
      method: "POST",
      body: JSON.stringify({
        auth_key: document.querySelector("#authkey").value,
      }),
    }).then((response) => {
      if (response.status == 200 && response.message == "successful") {
        // create the header

        let header_cont = document.createElement("div");
        let header = document.createElement("h2");
        let download_act = document.createElement("h4");
        download_act.textContent = "Download";
        download_act.addEventListener(e, handle_script_download());
        header.textContent = "Records";
        header_cont.appendChild(header);
        header_cont.appendChild(download_act);
        document.querySelector("body").appendChild(header_cont);

        let table = document.createElement("table");
        table.className = "record_table";

        let recs = response.json();

        table.textContent += `<th><td>Fullname</td>td>Email</td>,td>Phone Number</td>td>Joined</td></th>`;

        recs.forEach((record) => {
          table.textContent += `<tr><td>${record.fullname}</td><td>${record.email}</td><td>${record.number}</td><td>${record.joined}</td></tr>`;
        });

        document.querySelector("body").appendChild(table);
      } else {
        throw new Error("A server error occured");
      }
    });
  });
});
