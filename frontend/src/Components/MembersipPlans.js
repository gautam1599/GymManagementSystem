import React from 'react';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';


const MembershipPlans = () =>{
    return(<div>
        {/* <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Membership</th>
          <th>cardio & Weights</th>
          <th>Trainer</th>
          <th>Spa access</th>
          <th>Pool access</th>
          <th>Buddy passes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td><Badge pill bg="dark" text="Platinum">
          Platinum
      </Badge>{' '}</td>
          <td>✔</td>
          <td>✔</td>
          <td>✔</td>
          <td>✔</td>
          <td>✔</td>
        </tr>
        
        <tr>
          <td>2</td>
          <td><Badge pill bg="warning" text="dark">
        Gold
      </Badge>{' '}</td>
          <td style={{ color: 'red' }}>✔</td>
          <td style={{ color: 'green' }}>✔</td>
          <td style={{ color: 'green' }}>✔</td>
          <td style={{ color: 'green' }}>✔</td>
          <td> <p style={{ color: 'red' }}>✘</p></td>
        </tr>
        <tr>
          <td>3</td>
          <td ><Badge pill bg="light" text="dark">
        Silver
      </Badge>{' '}</td>
          <td style={{ color: 'green' }}>✔</td>
          <td style={{ color: 'green' }}>✔</td>
          <td style={{ color: 'red' }}>✘</td>
          <td style={{ color: 'red' }}>✘</td>
          <td style={{ color: 'red' }}>✘</td>
        </tr>
      </tbody>
    </Table> */}
    <div><h1 style={{ fontFamily: "Brush Script MT" , paddingTop: "40px" }} >Memberships</h1></div>
    <Table striped bordered hover style={{ width: "70%"  , marginLeft: "15%" , paddingBottom: "50px"}}>
    
      <thead>
        
        <tr>
        <th></th>
          <th><Badge pill bg="light" text="dark">
        Silver
      </Badge>{' '}</th>
          <th><Badge pill bg="warning" text="dark">
        Gold
      </Badge>{' '}</th>
          <th><Badge pill bg="dark" text="Platinum">
          Platinum
      </Badge>{' '}</th>
        </tr>
        
      </thead>
      <tbody>
      
        <tr>
          <td><b>cardio & Weights</b></td>
          <td style={{ color: 'green' }}>✔</td>
          <td style={{ color: 'green' }}>✔</td>
          <td style={{ color: 'green' }}>✔</td>
        </tr>
        <tr>
          <td><b>Trainer</b></td>
          <td style={{ color: 'green' }}>✔</td>
          <td style={{ color: 'green' }}>✔</td>
          <td style={{ color: 'green' }}>✔</td>
        </tr>
        <tr>
          <td><b>Spa access</b></td>
          <td style={{ color: 'red' }}>✘</td>
          <td style={{ color: 'green' }}>✔</td>
          <td style={{ color: 'green' }}>✔</td>
          
        </tr>
        <tr>
          <td><b>Pool access</b></td>
          <td style={{ color: 'red' }}>✘</td>
          <td style={{ color: 'green' }}>✔</td>
          <td style={{ color: 'green' }}>✔</td>
        </tr>
        <tr>
          <td><b>Buddy passes</b></td>
          <td style={{ color: 'red' }}>✘</td>
          <td style={{ color: 'red' }}>✘</td>
          <td style={{ color: 'green' }}>✔</td>
        </tr>
      </tbody>
    </Table>
    </div>
    )
}

export default MembershipPlans