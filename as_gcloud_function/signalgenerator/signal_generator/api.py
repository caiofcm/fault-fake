from flask import Flask, jsonify, request, Blueprint
from flask_jsonrpc import JSONRPC
from flask_cors import CORS, cross_origin
from signal_generator import signals
import numpy as np
from signal_generator import utils
app = Flask(__name__)

CORS(app)
# jsonrpc = JSONRPC(app, '/api', enable_web_browsable_api=True)

# Flask-JSONRPC
jsonrpc = JSONRPC(app, '/api', enable_web_browsable_api=True)


@jsonrpc.method('Signal.gbn(Array, Array, Array, Array, Array) -> Array', validate=True)
def api_create_gbn(tspan,
                   low,
                   upp,
                   prob,
                   min_const):

    # d = utils.load_config('./samples/config1.ini')
    tspan = np.array(tspan)
    low = np.array(low)
    upp = np.array(upp)
    prob = np.array(prob)
    min_const = np.array(min_const)
    signal = signals.gbn(
        tspan,
        low,
        upp,
        prob,
        min_const
    )

    return jsonify(signal.tolist())


@jsonrpc.method('Signal.create_signal(Array, String, Object)', validate=True)
def api_create_signal_single(tspan,
                   type_serie,
                   params):

    d = {
        'tspan': tspan,
        'tags': ['dummy'],
        'params': [params],
        'types': [type_serie]
    }
    signal = signals.create_signals(d)

    return jsonify(signal.tolist())


@jsonrpc.method('Signal.index')
def index():
    return u'Welcome to Flask JSON-RPC'

if __name__ == '__main__':
    # api_create_gbn()
    app.run(host='0.0.0.0', debug=True)
