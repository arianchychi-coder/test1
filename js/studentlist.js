fetch("/api/admin")
.then(response => response.json())
.then(data =>{
    const tbody = document.getElementById("table-body")
    tbody.innerHTML = '';
    data.forEach((item,index)=>{
        const row = document.createElement("tr")
         row.innerHTML = `
        <th scope="row">${index+1}</th>
        <td>${item.first_name || ''}</td>
        <td>${item.last_name || ''}</td>
          <td>${item.national_code || ''}</td>
        `;
        tbody.appendChild(row);
    })
})
.catch(error=>{
    console.error("Error: ",error)
})