fetch("/api/teacheradmin")
.then(response => response.json())
.then(data=>{
    const tbody = document.getElementById("table-body2")
    tbody.innerHTML = '';
    data.forEach((item,index)=>{
        const row = document.createElement("tr")
        row.innerHTML =`
        <th scope="row">${index + 1}</th>
        <td>${item.teachername || ''}</td>
          <td>${item.teacherlastname || ''}</td>
          <td>${item.teachernationalcode || ''}</td>
        `;
        tbody.appendChild(row)
    })
})
.catch(err=>{
    console.error("Error: ",err)
})