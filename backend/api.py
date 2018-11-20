# import main Flask class and request object
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)  # create the Flask app
CORS(app)

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
    # req_data = request.get_json()
    # req_form = request.form.to_dict()
    # print(req_data)
    # print(req_form)
    # print(request.form)
    # print(request)
    print(request.files)
    print(request.files.get('file'))
    # print(request.get_data())
    # print(request.stream.read())
    # mso = req_data['mso']
    # flw = req_data['flowsheet']
    # res = {
    #     'msg': 'EMSO Wrapper successfull initialized',
    #     'status': 0,
    # }
    # return jsonify(res)
    return '<h1>Hello CORS</h1>'


if __name__ == '__main__':
    app.run(debug=True, port=5000)  # run app in debug mode on port 5000
