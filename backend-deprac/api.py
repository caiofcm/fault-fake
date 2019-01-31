# import main Flask class and request object
import os
from flask import Flask, request, jsonify, flash, redirect, url_for
from flask import send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import config
import utils
import numpy as np

app = Flask(__name__)  # create the Flask app
CORS(app)
app.config['UPLOAD_FOLDER'] = config.UPLOAD_FOLDER

@app.route('/initialize', methods=['POST'])
def initialize():
    req_data = request.get_json()
    mso = req_data['mso']
    flw = req_data['flowsheet']
    res = {
        'msg': 'EMSO Wrapper successfull initialized',
        'status': 0,
    }
    return jsonify(res)


@app.route('/file-upload', methods=['POST'])
def file_upload():
    print('Reached py!')

    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and utils.allowed_file(file.filename):
        filename = secure_filename(file.filename)
        data_read = np.genfromtxt(file, delimiter=',', names=True)
        print(data_read.dtype.names)
        return 'Done'

    return '<h1>Hello CORS</h1>'

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)



if __name__ == '__main__':
    app.run(debug=True, port=5000)  # run app in debug mode on port 5000
