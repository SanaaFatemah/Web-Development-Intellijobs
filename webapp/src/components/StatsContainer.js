import StatItem from "./StatItem"
import { useContextApp } from "../context/contextApp"
import {FaSuitcaseRolling, FaBug, FaCalendarCheck} from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'


const StatsContainer = () => {
    const {stats} = useContextApp()

    const defaultStats = [
        {
            title: 'Pending',
            count: stats.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: '#e9b949',
            bcg: '#fcefc7'
        },
        {
            title: 'Interview',
            count: stats.interview || 0,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg: '#e0e8f9'
        },
        {
            title: 'Rejected',
            count: stats.declined || 0,
            icon: <FaBug />,
            color: '#d66a6a',
            bcg: '#ffeeee'
        },
        
    ]
return (
    <Wrapper>
        {defaultStats.map((item,index)=> {
            return <StatItem key={index} {...item} />
        })}
    </Wrapper>
)
}

export default StatsContainer