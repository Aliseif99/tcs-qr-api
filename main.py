
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import qrcode
from io import BytesIO

app = Flask(__name__)
CORS(app)

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    file = request.files.get('file')
    if not file:
        return jsonify({"error": "لم يتم تحميل ملف"}), 400

    # تحويل الملف إلى رمز QR
    qr = qrcode.make(file.read())
    qr_io = BytesIO()
    qr.save(qr_io, 'PNG')
    qr_io.seek(0)

    # إرسال الصورة الناتجة كـ QR
    return send_file(qr_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
