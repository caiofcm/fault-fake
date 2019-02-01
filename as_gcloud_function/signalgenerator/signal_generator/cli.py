import os
import sys
import click
import numpy as np
from signal_generator import signals
from signal_generator import utils



# @click.command()
# def oi():
#     print('Oi')

# @click.command()
# @click.argument('input', type=click.Path(exists=True))
# @click.argument('output', type=click.Path())
# @click.option('-t', '--with-tspan', 'with_tspan', is_flag=True)
# def main_keep_older(input, output, with_tspan, show_plot):
#     # fin = './samples/config1.ini'
#     # fout = './samples/out.csv'

#     d = utils.load_config(input)
#     signal = signals.gbn(
#         d['tspan'],
#         d['low'], d['upp'],
#         d['prob'], d['min_const']
#     )
#     tags_to_show = d['tags']

#     if with_tspan:
#         signal = np.hstack((d['tspan'].reshape((-1, 1)), signal))
#         tags_to_show = ['t'] + tags_to_show

#     np.savetxt(output, signal, delimiter='\t',
#         header='\t'.join(tags_to_show),
#         comments='')

#     pass


@click.command()
@click.argument('input_file', type=click.Path(exists=True))
@click.argument('output', type=click.Path())
@click.option('-t', '--with-tspan', 'with_tspan', is_flag=True)
@click.option('-p', '--plot', 'show_plot', is_flag=True)
def main(input_file, output, with_tspan, show_plot):
    """
    Creates signals

    [Arguments]

    - input: Configuration file\n
    - output: Signals output file\n
    """

    d, signal = auxiliary_main(input_file, output, with_tspan)

    tags_to_show = d['tags']
    if with_tspan:
        signal, tags_to_show = augment_with_tspan(d['tags'], signal, d['tspan'])

    np.savetxt(output, signal, delimiter='\t',
               header='\t'.join(tags_to_show),
               comments='')

    if show_plot:
        from matplotlib import pyplot as plt
        for i in range(len(d['tags'])):
            plt.figure()
            plt.plot(d['tspan'], signal[:, i], '.-k',
                     lw=2, label=d['tags'][i])
        plt.show()

    pass


def auxiliary_main(input_file, output, with_tspan):
    d = utils.load_config(input_file)
    s = signals.create_signals(d)
    return d, s

def augment_with_tspan(tags, signal, tspan):
    tags_to_show = tags
    signal = np.hstack((tspan.reshape((-1, 1)), signal))
    tags_to_show = ['t'] + tags_to_show
    return signal, tags_to_show

# if __name__ == "__main__":
#     main()
    # sys.exit(main())  # pragma: no cover
