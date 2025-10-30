document.getElementById("submit2").addEventListener("click", async function(e) {
    e.preventDefault();

    const form = document.getElementById("myform2");

    if (!form.checkValidity()) {
        alert("کد ملی اشتباه است");
        return;
    }

    const teachernationalcode2 = form.querySelector("input[name=teachernationalcode]").value.trim();

    if (!teachernationalcode2) {
        document.getElementById("hi").innerText = "کد ملی را وارد کنید!";
        return;
    }

    try {
        const response = await fetch("/api/teachernationalcodeRouter", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({teachernationalcode: teachernationalcode2})
        });

        const data = await response.text();
        console.log("Server response:", data);

        if (!response.ok) {
            alert(data); // پیام خطا
            return;
        }

        alert("کد ملی معتبر است، وارد شوید");
        window.location.href = "/teacher.html";
    } catch (error) {
        console.error(error);
        alert("ارتباط با سرور برقرار نشد");
    }
});
