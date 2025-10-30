document.getElementById("submit").addEventListener("click", async function(e) {
    e.preventDefault();

    const form = document.getElementById("myform");

    if (!form.checkValidity()) {
        alert("کد ملی اشتباه است");
        return;
    }

    const nationalcode = form.querySelector("input[name=national_code]").value.trim();

    if (!nationalcode) {
        document.getElementById("hi").innerText = "کد ملی را وارد کنید!";
        return;
    }

    try {
        const response = await fetch("/api/nationalcode", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({national_code: nationalcode})
        });

        const data = await response.text();
        console.log("Server response:", data);

        if (!response.ok) {
            alert(data); // پیام خطا
            return;
        }

        alert("کد ملی معتبر است، وارد شوید");
        window.location.href = "/student.html";
    } catch (error) {
        console.error(error);
        alert("ارتباط با سرور برقرار نشد");
    }
});
