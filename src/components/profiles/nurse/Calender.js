import React, { Component } from 'react'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

// import './main.scss' // webpack must be configured to do this


 class Calender extends Component {
    render() {
        return (
            <div>
                <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
                
            </div>
        )
    }
}


export default Calender;
