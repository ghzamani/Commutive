import React from 'react';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import {FormControl} from 'react-bootstrap'
import moment from "moment"
 
class EventCalendar extends React.Component {
 
    constructor(props){
        super(props);
        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
        let end = moment(start).add(29, "days").subtract(1, "seconds");
    
        this.state = {
            start : start,
            end : end
        }
 
        this.applyCallback = this.applyCallback.bind(this);
    }
 
    applyCallback(startDate, endDate){
        this.setState({
                start: startDate,
                end : endDate
            }
        )
        this.props.setStart(startDate.format("YYYY-MM-DD HH:mm"))
        this.props.setEnd(endDate.format("YYYY-MM-DD HH:mm"))
    }
 
    render(){
            let now = new Date();
            let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
            let end = moment(start).add(29, "days").subtract(1, "seconds");
            let showMonthDropdowns = true;
            let opens='center';
            let ranges = {
                // "Today Only": [moment(start), moment(end)],
                // "Yesterday Only": [moment(start).subtract(1, "days"), moment(end).subtract(1, "days")],
                // "3 Days": [moment(start).subtract(3, "days"), moment(end)]
                
            }
            // ["Datetime has wrong format. Use one of these format… YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]."]
           


    //   `$('#demo').daterangepicker({
    //             "showDropdowns": true,
    //             "startDate": "12/12/2020",
    //             "endDate": "12/18/2020",
    //             "opens": "center",
    //             "drops": "up"
    //         }, function(start, end, label) {
    //           console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    //   });
      
            let local = {
                // "format":"DD-MM-YYYY HH:mm",
                "format":"YYYY-MM-DD HH:mm",
                // "format":"YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z].",
                "sundayFirst" : false
            }
            // let maxDate = moment(start).add()

            // let value = `${this.state.start.format(
            //     "YYYY-MM-DD HH:mm"
            //   )} - ${this.state.end.format("YYYY-MM-DD HH:mm")}`;
            //   let disabled = true;
            return(
                <div>
                    <DateTimeRangeContainer 
                        ranges={ranges}
                        showDMonthropdowns={showMonthDropdowns}
                        showMonthDropdown={true}
                        opens={opens}
                        start={this.state.start}
                        end={this.state.end}
                        local={local}

                        // maxDate={maxDate}
                        applyCallback={this.applyCallback}
                    >    
                         <FormControl
                        id="formControlsTextB"
                        type="text"
                        label="Text"
                        placeholder="Enter date"
                        />  
                         {/* <FormControl
                        id="formControlsTextB"
                        // value={""||value}
                        type="text"
                        label="daterange"
                        placeholder="Enter date"
                        />  */}
                    </DateTimeRangeContainer>
                    {/* {console.log(start)} */}
                </div>
            );
        }
}
export default EventCalendar;