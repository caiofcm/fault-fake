from signalgenerator.signal_generator import signals
from flask import escape, jsonify
# from flask_cors import cross_origin
# from signalgenerator.signal_generator import utils

# [START functions_helloworld_http]
# @cross_origin()
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


    # Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

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
    # signal_json.headers.set('Access-Control-Allow-Origin', '*') #MODIFY IT
    # signal_json.headers.set('Access-Control-Allow-Methods', 'GET, POST')
    # signal_json.headers.set('Access-Control-Allow-Headers' , 'Origin, Content-Type, X-Auth-Token')



    # return signal_json
    return (signal_json, 200, headers)  

# def cors_enabled_function(request):
#     # For more information about CORS and CORS preflight requests, see
#     # https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
#     # for more information.

#     # Set CORS headers for the preflight request
#     if request.method == 'OPTIONS':
#         # Allows GET requests from any origin with the Content-Type
#         # header and caches preflight response for an 3600s
#         headers = {
#             'Access-Control-Allow-Origin': '*',
#             'Access-Control-Allow-Methods': 'GET',
#             'Access-Control-Allow-Headers': 'Content-Type',
#             'Access-Control-Max-Age': '3600'
#         }

#         return ('', 204, headers)

#     # Set CORS headers for the main request
#     headers = {
#         'Access-Control-Allow-Origin': '*'
#     }

#     return ('Hello World!', 200, headers)    
