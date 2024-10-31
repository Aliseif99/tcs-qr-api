
async function uploadImages() {
    const fileInput = document.getElementById("file-input");
    const qrList = document.getElementById("qr-list");
    qrList.innerHTML = ""; // تنظيف القائمة قبل عرض الصور الجديدة

    // التأكد من وجود ملفات مرفوعة
    if (fileInput.files.length === 0) {
        alert("يرجى اختيار صورة");
        return;
    }

    // معالجة كل ملف يتم رفعه
    for (const file of fileInput.files) {
        const formData = new FormData();
        formData.append("file", file);

        try {
            // رابط API الخاص بك مع المسار `/generate_qr`
            const response = await fetch("https://your-app-name.onrender.com/generate_qr", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                // الحصول على الصورة الناتجة وعرضها على الموقع
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const qrImage = document.createElement("img");
                qrImage.src = url;
                qrImage.classList.add("qr-image");
                qrList.appendChild(qrImage);
            } else {
                // عرض رسالة خطأ إذا كان هناك مشكلة في الخادم
                const errorData = await response.json();
                alert("خطأ من الخادم: " + errorData.error);
            }
        } catch (error) {
            alert("فشل الاتصال بالخادم. تأكد من أن Flask API يعمل.");
        }
    }
}
