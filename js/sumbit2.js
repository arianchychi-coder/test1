document.getElementById("submitBtn2").addEventListener("click",async function(e) {
    e.preventDefault();

    const form = document.getElementById("registrationForm2")

    if (!form.checkValidity()) {
        alert ("لطفا تمامی فیلد ها را با دقت وارد کنید")
        return;
    }

    const teachername = form.querySelector("input[name=teachername]").value
    const teacherlastname = form.querySelector("input[name=teacherlastname]").value
    const teachernationalcode = form.querySelector("input[name=teachernationalcode]").value

    const teacherplaceholder = form.querySelector("input[name=teacherplaceholder]").value
    const teachercertificatenumber = form.querySelector("input[name=teachercertificatenumber]").value
    const teacherdate = form.querySelector("input[name=teacherdate]").value

    const teacheracademicyear = form.querySelector("select[name=teacheracademicyear]").value

    const teacherdeagree = form.querySelector("select[name=teacherdeagree]").value


    const teacherphone = form.querySelector("input[name=teacherphone]").value
    const teacheremergencyphone = form.querySelector("input[name=teacheremergencyphone]").value
    const teacheredjucation = form.querySelector("select[name=teacheredjucation]").value

    const teacherlastschool = form.querySelector("input[name=teacherlastschool]").value
    const teacheradress = form.querySelector("input[name=teacheradress]").value
    const teacherpostcode = form.querySelector("input[name=teacherpostcode]").value


    try {
        const response = await fetch("/teacher", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({teachername,teacherlastname,teachernationalcode,teacherplaceholder,teachercertificatenumber,teacherdate,teacheracademicyear,teacherdeagree,teacherphone,teacheremergencyphone,teacheredjucation,teacherlastschool,teacheradress,teacherpostcode})
        })

        const data = await response.text();

        alert(data)
        window.location.href = "/maneigment.html"
    } catch (error) {
        console.log("Error:",error);
    }
})