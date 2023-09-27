import React, { useState, useEffect } from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBCollapse
} from 'mdb-react-ui-kit';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import TimeSlotInput from '../Components/TimeSlot';
import Calendar from '../Components/classSchedule';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export default function UserHome({ selectedLocation }) {
    const [basicActive, setBasicActive] = useState('Your classes');
    const [enrollments,setEnrollments]=useState({});
    const [upenrollments,setUpEnrollments]=useState({});
    const [oldenrollments,setOldEnrollments]=useState({});
    const [logs,setLogs]=useState({});
    const [showShow, setShowShow] = useState(false);
    let userdetails=JSON.parse(window.sessionStorage.getItem("userdetails"));

    const toggleShow = () => setShowShow(!showShow);

    useEffect(()=>{
        getEnrollments();
        fetchLogs();
    },[]);

    const getEnrollments=async()=>{
        const res=await axios.get(`${BACKEND_URL}/enroll/getEnrollmentByEmail/${userdetails.email}`).catch(err=>console.log(err))
        const data=await res.data;
        console.log("ER:",data.enrollment);
        setEnrollments(data.enrollment);
        const date = new Date();
        const formattedDate = date.toISOString();
        console.log("formattedDate:",formattedDate);
        console.log("enrollment.starttime :",data.enrollment[0].starttime);
        const filteredEnrollments = data.enrollment.filter(
            (enrollment) => enrollment.starttime > formattedDate
          );

        const filteredOld = data.enrollment.filter(
            (enrollment) => enrollment.starttime < formattedDate
          );
        //"2023-03-07T05:00:00.000Z"
        setUpEnrollments(filteredEnrollments);
        setOldEnrollments(filteredOld);
        console.log("setEnrollments:",enrollments);
        return data;
    }

    const fetchLogs = async() => {
        console.log("userdetails.email",userdetails?.email);
        const res=await axios.post(`${BACKEND_URL}/log/getLogByEmail`, { 
            email: userdetails.email
      });
      const dats=await res.data;
      console.log("Logs:",dats);
      setLogs(dats.logs);

    }

    const handleBasicClick = (value) => {
        if (value === basicActive) {
            return;
        }

        setBasicActive(value);

        if(value === 'Past Activities'){
            fetchLogs();
        }
    };
    return (
        <>
        {(userdetails?.role=="user"||userdetails?.role=="User")?<section style={{ backgroundColor: '#eee', paddingTop: "40px" }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol lg="2" style={{paddingTop: "510px"}}>
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid />
                                <p className="text-muted mb-1"> Name: {userdetails?.firstname} {userdetails?.lastname}</p>
                                <p className="text-muted mb-4">Role : {userdetails?.role}</p>
                                <div className="d-flex justify-content-center mb-2">
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                    <MDBCol lg="10" style={{paddingTop: "500px"}}>
                        <MDBCard className="mb-4">
                            <MDBTabs className='mb-3'>
                                <MDBTabsItem>
                                    <MDBTabsLink onClick={() => handleBasicClick('Your classes')} active={basicActive === 'Your classes'}>
                                        Your classes
                                    </MDBTabsLink>
                                </MDBTabsItem>
                                <MDBTabsItem>
                                    <MDBTabsLink onClick={() => handleBasicClick('Past Activities')} active={basicActive === 'Past Activities'}>
                                        Past Activities
                                    </MDBTabsLink>
                                </MDBTabsItem>
                                <MDBTabsItem>
                                    <MDBTabsLink onClick={() => handleBasicClick('Log hours')} active={basicActive === 'Log hours'}>
                                        Log hours
                                    </MDBTabsLink>
                                </MDBTabsItem>
                                {/* <MDBTabsItem>
                                    <MDBTabsLink onClick={() => handleBasicClick('Class Signup')} active={basicActive === 'Class Signup'}>
                                        Class Signup
                                    </MDBTabsLink>
                                </MDBTabsItem> */}
                            </MDBTabs>

                            <MDBTabsContent>
                                <MDBTabsPane show={basicActive === 'Your classes'}>
                                    <div>Upcoming Classes:</div><br></br>
                                <MDBTable striped>
                                <MDBTableHead>
                                    <tr>
                                    <th scope='col'>Class ID</th>
                                    <th scope='col'>Class Name</th>
                                    <th scope='col'>Date</th>
                                    <th scope='col'>Start Time</th>
                                    <th scope='col'>End Time</th>
                                    <th scope='col'>Location</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {console.log("setEnrollments:",enrollments)}
                                    {console.log("setuppppp:",upenrollments)}
                                {upenrollments.length > 0 && upenrollments.map((enrollment) => (
                                    <tr key={enrollment._id}>
                                    <td >{enrollment.classid }</td>
                                    <td >{enrollment.classname}</td>
                                    <td >{enrollment.starttime.substr(0,10)}</td>
                                    <td >{enrollment.starttime.substr(11,5)}</td>
                                    <td >{enrollment.endtime.substr(11,5)}</td>
                                    <td >{enrollment.location}</td>
                                    </tr>
                                ))}
                                </MDBTableBody>
                                </MDBTable>

                                </MDBTabsPane>
                                <MDBTabsPane show={basicActive === 'Past Activities'}>
                                    <div>Past Classes:</div><br></br>
                                    <MDBTable striped >
                                        <MDBTableHead onClick={toggleShow}>
                                            <tr>
                                                <th scope='col'>Class ID</th>
                                                <th scope='col'>Class Name</th>
                                                <th scope='col'>Date</th>
                                                <th scope='col'>Start Time</th>
                                                <th scope='col'>End Time</th>
                                                <th scope='col'>Location</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {console.log("setEnrollments:", enrollments)}
                                            {console.log("setuppppp:", upenrollments)}
                                            {oldenrollments.length > 0 && oldenrollments.map((enrollment) => (
                                                <tr key={enrollment._id}>
                                                    <td >{enrollment.classid}</td>
                                                    <td >{enrollment.classname}</td>
                                                    <td >{enrollment.starttime.substr(0, 10)}</td>
                                                    <td >{enrollment.starttime.substr(11, 5)}</td>
                                                    <td >{enrollment.endtime.substr(11, 5)}</td>
                                                    <td >{enrollment.location}</td>
                                                </tr>
                                            ))}
                                        </MDBTableBody>
                                    </MDBTable>
                                    <span>Past Logs:</span>  <a href="#" onClick={toggleShow}>Expand</a><br></br>
                                    
                                    <MDBCollapse show={showShow}>
                                    <MDBTable striped>
                                <MDBTableHead>
                                    <tr>
                                    <th scope='col'>Date</th>
                                    <th scope='col'>machine type</th>
                                    <th scope='col'>hours</th>
                                    <th scope='col'>Location</th>
                                    </tr>
                                </MDBTableHead>
                                
                                <MDBTableBody>
                                    {console.log("setEnrollments:",enrollments)}
                                    {console.log("setuppppp:",upenrollments)}
                                {logs.length > 0 && logs.map((log) => (
                                    <tr key={log._id}>
                                    <td >{log.date.substr(0, 10)}</td>
                                    <td >{log.machinetype}</td>
                                    <td >{log.hours}</td>
                                    <td >{log.location}</td>
                                    </tr>
                                ))}
                                </MDBTableBody>
                                </MDBTable>
                                </MDBCollapse>
                                {showShow && <a href="#" onClick={toggleShow}>Collapse</a>}

                                </MDBTabsPane>

                                <MDBTabsPane show={basicActive === 'Log hours'}>
                                    <TimeSlotInput />
                                </MDBTabsPane>
                                <MDBTabsPane show={basicActive === 'Class Signup'}>

                                </MDBTabsPane>
                            </MDBTabsContent>
                            <MDBCardBody>

                            </MDBCardBody>
                        </MDBCard>

                        <MDBRow>
                            {/* <MDBCol md="6">
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1"></span>Machine Stats</MDBCardText>
                                        <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Treadmill</MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                                        </MDBProgress>

                                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Cardio</MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                                        </MDBProgress>

                                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Elliptical</MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                                        </MDBProgress>

                                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Bike</MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                                        </MDBProgress>

                                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Weights</MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                                        </MDBProgress>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol> */}

                            {/* <MDBCol md="6">
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                                        <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                                        </MDBProgress>

                                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                                        </MDBProgress>

                                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                                        </MDBProgress>

                                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                                        </MDBProgress>

                                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                                        </MDBProgress>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol> */}
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
                <Calendar selectedLocation={selectedLocation} />
            </MDBContainer>
        </section>:<p>You are not authorized to access this page</p>}
        </>
    );
}
