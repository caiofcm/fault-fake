import numpy as np



def create_signals(d):
    tspan = d['tspan']
    tags =  d['tags']
    params = d['params']
    types = d['types']
    signal_return = np.zeros((len(tspan), len(tags)))
    for i, tag in enumerate(tags):
        p = params[i]
        if types[i] == 'gbn':
            signal_return[:,i] = gbn(tspan, **p)[:,0]
        elif types[i] == 'random_walk':
            signal_return[:, i] = random_walk(tspan, **p)[:, 0]
        else:
            raise ValueError('Unknown {} type to create signal'.format(types[i]))

    return signal_return

# Original Source: origin  git@github.com:caiofcm/py_utils_cm_toolbox.gitb
def gbn(tspan: (list, np.ndarray),
        low_value: (list, np.ndarray),
        upp_value: (list, np.ndarray),
        prob_change: (list, np.ndarray),
        min_constant: (list, np.ndarray)) -> np.ndarray:
    low_value = np.atleast_1d(low_value)
    upp_value = np.atleast_1d(upp_value)
    prob_change = np.atleast_1d(prob_change)
    min_constant = np.atleast_1d(min_constant)
    previous_signal = low_value.copy()
    n = len(previous_signal)
    last_t_change = np.zeros(n)
    nt = len(tspan)
    dt = tspan[1] - tspan[0]
    signal = np.zeros((nt, n))
    np.random.seed()
    for k in range(nt):
        actual_time = tspan[k]
        signal_aux = np.zeros(n)
        R = np.random.uniform(size=n)
        for i in range(n):
            if R[i] < prob_change[i]:
                if int((actual_time - last_t_change[i])/dt) < min_constant[i]:
                    if previous_signal[i] == upp_value[i]:
                        signal_aux[i] = upp_value[i]
                    else:
                        signal_aux[i] = low_value[i]
                else:
                    if previous_signal[i] == upp_value[i]:
                        signal_aux[i] = low_value[i]
                    else:
                        signal_aux[i] = upp_value[i]
                    last_t_change[i] = actual_time
            else:
                if previous_signal[i] == upp_value[i]:
                    signal_aux[i] = upp_value[i]
                else:
                    signal_aux[i] = low_value[i]
        signal[k, :] = signal_aux
        previous_signal = signal_aux.copy()

    return signal


def ramp(tspan: np.ndarray,
         start_vals: np.ndarray,
         final_vals: np.ndarray):
    Npts = len(tspan)
    step = (final_vals - start_vals) / (Npts - 1)
    out_vals = start_vals + np.tile(np.arange(0, Npts).reshape((-1, 1)), 2) * step
    return out_vals


def random_walk(tspan: np.ndarray,
                start_val: (float, list, np.ndarray),
                prob_down: (float, list, np.ndarray),
                prob_up: (float, list, np.ndarray),
                amplitude: (float, list, np.ndarray)):
    Npts = len(tspan)
    start_val = np.atleast_1d(start_val)
    prob_down = np.atleast_1d(prob_down)
    prob_up = np.atleast_1d(prob_up)
    amplitude = np.atleast_1d(amplitude)
    n = len(start_val)
    # prob_up = 1.0 - prob_down

    out_vals = np.zeros((Npts, n))
    for i in np.arange(n):
        # Probability to move up or down
        # prob = [0.05, 0.95]
        prob = [prob_up[i], prob_down[i]]
        p_down = prob_down[i]
        p_up = prob_up[i]

        # statically defining the starting position
        # start = 2
        positions = [start_val[i]]

        # creating the random points
        rr = np.random.random(Npts)

        for j in np.arange(Npts):
            step = -1 if rr[j] < p_down else (1 if rr[j] < p_down + p_up else 0)
            positions.append(positions[-1] + step * amplitude[i])

        # downp = rr < prob[0]
        # upp = rr > prob[1]

        # for idownp, iupp in zip(downp, upp):
        #     down = idownp #and positions[-1] > 1
        #     up = iupp #and positions[-1] < 4
        #     positions.append(positions[-1] - down + up)

        out_vals[:, i] = np.array(positions[0:-1])

    return out_vals
