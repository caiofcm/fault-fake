from signalgenerator.signal_generator import signals
from flask import escape, jsonify
# from signalgenerator.signal_generator import utils

# [START functions_helloworld_http]
def signal_gen_http(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <http://flask.pocoo.org/docs/1.0/api/#flask.Request>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>.

      Test string:
      {
        "method": "Signal.create_signal",
          "params": {
            "tspan": [1,2,3],
            "type_serie": "gbn",
            "params": {
              "low_value": [0, -1, 1],
          "upp_value": [10, 20, 30], 
              "prob_change": [0.5, 0.5, 0.5],
              "min_constant": [1, 1, 1]
            }
          }
      }
    """
    request_json = request.get_json(silent=True)
    # request_args = request.args

    if not request_json:
      return 'Not JSON'
    if 'method' not in request_json:
      return 'Method is required'
    if request_json['method'] != 'Signal.create_signal':
      return 'Method unknown'
    if 'params' not in request_json:
      return 'params field required'
    params = request_json['params']
    if 'tspan' not in params:
      return 'tspan required!'
    if 'type_serie' not in params:
      return 'type_serie required!'
    if 'params' not in params:
      return 'params required!'

    tspan = params['tspan']
    type_serie = params['type_serie']
    inner_params = params['params']
    d = {
        'tspan': tspan,
        'tags': ['dummy'],
        'params': [inner_params],
        'types': [type_serie]
    }
    signal = signals.create_signals(d)
    signal_json = jsonify(signal.tolist())
    signal_json.headers.set('Access-Control-Allow-Origin', '*') #MODIFY IT
    signal_json.headers.set('Access-Control-Allow-Methods', 'GET, POST')
    # if request_json and 'method' in request_json:

    # if request_json and 'name' in request_json:
    #     name = request_json['name']
    # elif request_args and 'name' in request_args:
    #     name = request_args['name']
    # else:
    #     name = 'World'
    # return 'Hello {}!'.format(escape(request_json['type_serie']))
    return signal_json
