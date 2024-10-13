async function loadUserData() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "auth";
    }

    const role = localStorage.getItem("role");
    if (role !== "2") {
        window.location.href = "403";
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get("name");

    const loader = document.querySelector(".loader");

    try {
        loader.style.display = "block";
        const response = await fetch(`http://localhost:3000/api/organization/receive/${name}`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Ошибка при загрузке данных");
        }

        const org = await response.json();
        const userTableBody = document.getElementById("userTableBody");

        userTableBody.innerHTML = "";


        const row = document.createElement("tr");
        const id = org.id;
        const org_name = org.name;
        const org_phone = org.phone;
        const org_email = org.email;
        const org_responsiblePerson = org.responsiblePerson;
        const org_address = org.address;
        row.id = `org-${org.id}`;
        row.innerHTML = `
                    <td class="id-cell">${id}</td>
                    <td class="name-cell">${org_name}</td>
                    <td class="address-cell">${org_address}</td>
                    <td class="phone-cell">${org_phone}</td>
                    <td class="email-cell">${org_email}</td>
                    <td class="responsiblePerson-cell">${org_responsiblePerson}</td>
                `;
        userTableBody.appendChild(row);


    } catch (error) {
        console.error(error);
    } finally {
        loader.style.display = "none";
    }
}

window.addEventListener("DOMContentLoaded", loadUserData);