import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

function StudentYear() {

  return (
    <>
      <div className="bg-green-500 mt-10">
        <div className="bg-red-500">
          {/* parent accordion for year of student  */}
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Fourth Year</Accordion.Header>
              <Accordion.Body>
                {/* child accordion for branch of students */}
                <Accordion alwaysOpen>
                  <Accordion.Item eventKey="0A">
                    <Accordion.Header>Computer Engineering</Accordion.Header>
                    <Accordion.Body>
                        10 Students
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="0B">
                    <Accordion.Header>Civil Engineering</Accordion.Header>
                    <Accordion.Body>
                        10 Students
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="0C">
                    <Accordion.Header>ECS Engineering</Accordion.Header>
                    <Accordion.Body>
                        10 Students
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="0D">
                    <Accordion.Header>AIDS Engineering</Accordion.Header>
                    <Accordion.Body>
                        10 Students
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Third Year</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Second Year</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>First Year</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>


      </div>
    </>
  )
}

export default StudentYear
