import os
import json
import numpy as np
import configparser

def load_config(input):
    filename, file_extension = os.path.splitext(input)
    if file_extension == '.ini':
        return load_config_ini(input)
    elif file_extension == '.json':
        return load_config_json(input)
    else:
        raise ValueError('Unknown configuration file type')
    pass


def load_config_ini(file_config):

    config = configparser.ConfigParser()
    config.read(file_config)

    sections = config.sections()

    t0 = float(config['tspan']['t0'])
    tf = float(config['tspan']['tf'])
    Npts = int(config['tspan']['Npts'])
    tspan = np.linspace(t0, tf, Npts)

    num_tags = len(config.sections()) - 1
    tags = config.sections()
    tags.remove('tspan')
    np_low = np.zeros(num_tags)
    np_upp = np.zeros(num_tags)
    np_prob = np.zeros(num_tags)
    np_min_const = np.zeros(num_tags)
    for i, key in enumerate(tags):
        np_low[i] = config[key]['low']
        np_upp[i] = config[key]['upp']
        np_prob[i] = config[key]['prob']
        np_min_const[i] = config[key]['min_const']


    return {
        'tags': tags,
        'tspan': tspan,
        'low': np_low,
        'upp': np_upp,
        'prob': np_prob,
        'min_const': np_min_const,
    }

def load_config_json(file_config):

    with open(file_config) as f:
        cfg = json.load(f)
    tags = [sig['tag'] for sig in cfg['signals']]
    tspan = np.linspace(cfg['tspan']['t0'], cfg['tspan']['tf'], cfg['tspan']['Npts'])
    params_per_tag = [sig['params'] for sig in cfg['signals']]
    type_per_tag = [sig['type'] for sig in cfg['signals']]

    return {
        'tags': tags,
        'tspan': tspan,
        'params': params_per_tag,
        'types': type_per_tag,
        # 'low': np_low,
        # 'upp': np_upp,
        # 'prob': np_prob,
        # 'min_const': np_min_const,
    }
