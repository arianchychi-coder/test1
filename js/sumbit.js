document.getElementById("submitBtn").addEventListener("click",async function(e) {
    e.preventDefault();

    const form = document.getElementById("registrationForm")

    if (!form.checkValidity()) {
        alert ("لطفا تمامی فیلد ها را با دقت وارد کنید")
        return;
    }

    const first_name = form.querySelector("input[name=first_name]").value
    const last_name = form.querySelector("input[name=last_name]").value
    const father_name = form.querySelector("input[name=father_name]").value

    const mother_name = form.querySelector("input[name=mother_name]").value
    const national_code = form.querySelector("input[name=national_code]").value
    const birth_certificate_place = form.querySelector("input[name=birth_certificate_place]").value

    const birth_certificate_number = form.querySelector("input[name=birth_certificate_number]").value
    const birth_date = form.querySelector("input[name=birth_date]").value
    const academic_year = form.querySelector("select[name=academic_year]").value

    const education_level = form.querySelector("select[name=education_level]").value
    const student_phone = form.querySelector("input[name=student_phone]").value
    const father_phone = form.querySelector("input[name=father_phone]").value

    const father_job = form.querySelector("input[name=father_job]").value
    const mother_phone = form.querySelector("input[name=mother_phone]").value
    const emergency_phone = form.querySelector("input[name=emergency_phone]").value

    const mother_job = form.querySelector("input[name=mother_job]").value
    const marital_status = form.querySelector("select[name=marital_status]").value
    const guardian_name = form.querySelector("input[name=guardian_name]").value

    const guardian_relation = form.querySelector("input[name=guardian_relation]").value
    const guardian_phone = form.querySelector("input[name=guardian_phone]").value
    const previous_school_name = form.querySelector("input[name=previous_school_name]").value

    const home_address = form.querySelector("input[name=home_address]").value
    const residence_status = form.querySelector("select[name=residence_status]").value
    const postal_code = form.querySelector("input[name=postal_code]").value
    const home_phone = form.querySelector("input[name=home_phone]").value

    try {
        const response = await fetch("/", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({first_name,last_name,father_name,mother_name,national_code,birth_certificate_place,birth_certificate_number,birth_date,academic_year,education_level,student_phone,father_phone,father_job,mother_phone,emergency_phone,mother_job,marital_status,guardian_name,guardian_relation,guardian_phone,previous_school_name,home_address,residence_status,postal_code,home_phone})
        })

        const data = await response.text();

        alert(data)
        window.location.href = "/maneigment.html"
    } catch (error) {
        console.log("Error:",error);
    }
})