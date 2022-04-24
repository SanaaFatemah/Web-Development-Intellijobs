import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
const BarChartGraph = ({data}) => {
    return (
        <ResponsiveContainer width="100%" height={270}>
        <BarChart data={data} margin={{top:50}}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date'/>
            <YAxis allowDecimals={false}/>
            <Tooltip />
            <Bar dataKey='count' fill='#b2d7eb' barSize={75}/>
        </BarChart>
        </ResponsiveContainer>
    )
}

export default BarChartGraph;