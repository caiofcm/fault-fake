
const randomArray = (length, max) => [...new Array(length)]
.map(() => (Math.random() * max));

const LEN = 50

const data = [
    {tag: 'tag1', values: randomArray(LEN, 10.0), id: 1},
    {tag: 'tag2', values: randomArray(LEN, 3.0), id: 2},
    {tag: 'tag3', values: randomArray(LEN, 1.0), id: 3},
]

const loadData  = () => data

export default loadData;