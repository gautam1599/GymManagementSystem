import React, {Component, useState} from 'react';
import Card from 'react-bootstrap/Card';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
//import "./CalendarStyles.css";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import axios from "axios";
import { BACKEND_URL } from '../config';


const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px",
    marginLeft: "50px"
  },
  main: {
    flexGrow: "1",
    marginRight: "50px",
    marginLeft: "10px"
  }
};

const allEvents = [
  {
    id: 1,
    gymLocation: "one",
    text: "Event 1",
    start: "2023-03-07T10:30:00",
    end: "2023-03-07T13:00:00"
  },
  {
    id: 2,
    gymLocation: "one",
    text: "Event 2",
    start: "2023-03-08T09:30:00",
    end: "2023-03-08T11:30:00",
    backColor: "#6aa84f"
  },
  {
    id: 3,
    gymLocation: "two",
    text: "Event 3",
    start: "2023-03-08T12:00:00",
    end: "2023-03-08T15:00:00",
    backColor: "#f1c232"
  },
  {
    id: 4,
    gymLocation: "three",
    text: "Event 4",
    start: "2023-03-06T11:30:00",
    end: "2023-03-06T14:30:00",
    backColor: "#cc4125"
  },
];

let userdetails=JSON.parse(window.sessionStorage.getItem("userdetails"));

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      data: null,
      enrollModalShow: false,
      enrollModalClass: null,
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("You must login to register for classes", "Event 1");
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
      },
      //eventDeleteHandling: "Update",
      onEventClick: async args => {
        const dp = this.calendar;
        let logstatus=JSON.parse(window.sessionStorage.getItem("isLoggedIn"))?JSON.parse(window.sessionStorage.getItem("isLoggedIn")):false;
        logstatus && this.setState({ enrollModalShow: true });
        const enrollModalEvent = this.state.data.filter(event => event.text === args.e.text());
        console.log("enrollModalEvent",enrollModalEvent[0].text);
        this.setState({ enrollModalClass: enrollModalEvent[0]});
        // const modal = await DayPilot.Modal.prompt("Confirm Enrollment for the below activity?", args.e.text());
        // if (!modal.result) { return; }
        // const e = args.e;
        // e.data.text = modal.result;
        // dp.events.update(e);
      },
    };
  }
  
  get calendar() {
    return this.calendarRef.current.control;
  }

  setEnrollModal = (arg) => this.setState({ enrollModalShow: arg });

  sendRequest=async()=>{
    console.log("substrrrrrr",this.state.enrollModalClass.text);
    const res=await axios.post(`${BACKEND_URL}/enroll/addEnrollment`,{
        email:userdetails?.email,
        classid: this.state.enrollModalClass.text.substr(0, 4),
        status: true,
        starttime: this.state.enrollModalClass.start,
        endtime: this.state.enrollModalClass.end,
        classname: this.state.enrollModalClass.text.substr(6),
        location: this.state.enrollModalClass.gymLocation,
    }).catch(err=>console.log(err))
    const ress=await res.data;
    return ress;
}
  componentDidMount() {

    fetch(`${BACKEND_URL}/class/viewClasses`)
      .then(response => response.json())
      .then(data =>{
        console.log("events",data);
        const newData = data.map(item => ({
          id: item._id,
          gymLocation: item.location,
          text: item.classid+"- "+item.classname,
          start: item.starttime.substr(0,19),
          end: item.endtime.substr(0,19),
          backColor: "#D10000"
        }));
        this.setState({ data: newData });
      })
      .catch(error => console.error(error));
    

    const events = this.state.data ? this.state.data.filter(event => event.gymLocation === this.props.selectedLocation): null;
   // const events = this.state.data ? this.state.data : null;
    console.log("events",events);
    const startDate = "2023-03-07";

    this.calendar.update({startDate, events});
    

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps && prevProps.selectedLocation !== this.props.selectedLocation) {
      console.log(`count has changed from ${prevProps.selectedLocation} to ${this.props.selectedLocation}`);
      const events = this.state.data ? this.state.data.filter(event => event.gymLocation === this.props.selectedLocation):null;
      
      const startDate = "2023-03-07";
      this.calendar.update({startDate, events});
    }

    if(prevState.data!=this.state.data){
      console.log("selected loc",this.props.selectedLocation);
      const events = this.state.data ? this.state.data.filter(event => event.gymLocation === this.props.selectedLocation): null;
      const startDate = "2023-03-07";
      this.calendar.update({startDate, events});
    }
  }

  render() {
    const { data } = this.state;
    console.log("dataaa",data);
    return (
      <Card body style={{ paddingTop: 40 }}>
      <div><h1 style={{ fontFamily: "Brush Script MT" }} >Class Schedules</h1></div>
      {data && <div>
        {data.map(classDet => (
          <div key={classDet.classid}>{classDet.classname}</div>
          ))

        }
      </div>}
      <div style={styles.wrap}>
        
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            showMonths={1}
            //skipMonths={3}
            startDate={"2023-03-07"}
            selectionDay={"2023-03-07"}
            onTimeRangeSelected={ args => {
              this.calendar.update({
                startDate: args.day
              });
            }}
          />
        </div>
        <div style={styles.main}>
        {/* <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: separate; border: 0px none;"><tbody><tr><td style="padding: 0px; border: 0px none;"><div class="calendar_default_corner" style="position: relative; width: 60px; height: 30px;"><div class="calendar_default_corner_inner"></div></div></td></tr></tbody></table> */}
          
          <DayPilotCalendar
            {...this.state}
            ref={this.calendarRef}
          />
        </div>
      </div>

      <MDBModal show={this.state.enrollModalShow} setShow={this.setEnrollModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Enroll to below class? </MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody>Class Name : {this.state.enrollModalClass && this.state.enrollModalClass.text}</MDBModalBody>

            <MDBModalFooter>
              {/* <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn> */}
              <MDBBtn onClick={this.sendRequest} color='dark'>Enroll</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      </Card>
    );
  }
}

export default Calendar;