async function uploadImages() {
    const fileInput = document.getElementById("file-input");
    const qrList = document.getElementById("qr-list");
    qrList.innerHTML = ""; // تنظيف القائمة قبل عرض الصور الجديدة

    for (const file of fileInput.files) {
        const formData = new FormData();
        formData.append("file", file);

        try {
            // استخدم رابط Flask API من Render هنا
            const response = await fetch("https://tcs-qr-api.onrender.com", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const qrImage = document.createElement("img");
                qrImage.src = url;
                qrImage.classList.add("qr-image");
                qrList.appendChild(qrImage);
            } else {
                const errorData = await response.json();
                alert("خطأ من الخادم: " + errorData.error);
            }
        } catch (error) {
            alert("فشل الاتصال بالخادم. تأكد من تشغيل Flask.");
        }
    }
}
