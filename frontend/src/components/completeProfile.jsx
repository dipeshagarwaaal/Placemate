import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';


function CptProfile() {
  const BASE_URL = "http://localhost:4518";
  const navigate = useNavigate();
  const [data, setData] = useState({});


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4518/user/detail', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log("CptProfile.jsx => ", error);
      }
    }
    fetchUserData();
  }, []);

  const handleDataChange = (e) => setData({ ...data, [e.target.name]: e.target.value })


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:4518/student/complete-profile',
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      // console.log(response.data);
      if (response.data.msg === "Success") {
        // console.log(response.data.msg);
        navigate("../student/dashboard");
      }
    } catch (error) {
      console.log("CptProfile => ", error);
    }
  }

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profileImgs', file);
      formData.append('userId', data.id);

      try {
        const response = await axios.post("http://localhost:4518/student/upload-photo", formData);
        setData({ ...data, profile: response.data.file });
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    }
  }

  // for formating date of birth
  const formatDate = (isoString) => {
    if (!isoString || isoString === "undefined") return "";
    const date = new Date(isoString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  };

  return (
    <>
      <div className="px-4 py-10 bg-gradient-to-r from-cyan-500 from-10% via-purple-400 via-40% to-pink-500 to-100%">
        <h1 className='text-4xl font-semibold'>Complete Profile</h1>
        <form onSubmit={handleSubmit}>
          {/* personal info  */}
          <div className=" my-8 backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400 p-6">
            <span className='text-2xl'>Personal Details</span>
            <div className="grid grid-cols-3">
              <div className="px-2 py-3 flex flex-col gap-3">
                <FloatingLabel controlId="floatingFirstName" label="First Name">
                  <Form.Control type="text" placeholder="First Name" name='first_name' value={data.first_name === "undefined" ? "" : data.first_name} onChange={handleDataChange} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingMiddleName" label="Middle Name">
                  <Form.Control type="text" placeholder="Middle Name" name='middle_name' value={data.middle_name === "undefined" ? "" : data.middle_name} onChange={handleDataChange} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingLastName" label="Last Name">
                  <Form.Control type="text" placeholder="Last Name" name='last_name' value={data.last_name === "undefined" ? "" : data.last_name} onChange={handleDataChange} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingEmail" label="Email address">
                  <Form.Control type="email" placeholder="Email address" name='email' value={data.email === "undefined" ? "" : data.email} onChange={handleDataChange} disabled />
                </FloatingLabel>
                <FloatingLabel controlId="floatingNumber" label="Mobile Number" name='number' value={data.number === "undefined" ? "" : data.number} onChange={handleDataChange} >
                  <Form.Control
                    type="number"
                    placeholder="Mobile Number"
                    name='number'
                    value={data.number === "undefined" ? "" : data.number}
                    onChange={handleDataChange}
                    maxLength={10}
                    pattern="\d{10}"
                    onInput={(e) => {
                      if (e.target.value.length > 10) {
                        e.target.value = e.target.value.slice(0, 10);
                      }
                    }}
                  />
                </FloatingLabel>
              </div>
              <div className="px-2 py-3 flex flex-col gap-3">
                <FloatingLabel controlId="floatingSelectGender" label="Gender">
                  <Form.Select aria-label="Floating label select gender" className='cursor-pointer' name='gender' value={data.gender} onChange={handleDataChange} >
                    <option disabled value="undefined" className='text-gray-400'>Enter Your Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="floatingBirthDate" label="Date of Birth">
                  <Form.Control type="date" placeholder="Date of Birth" name='dataOfBirth' value={formatDate(data.dataOfBirth)} onChange={handleDataChange} />
                </FloatingLabel>
                <FloatingLabel className='w-full' controlId="floatingTextareaAddress" label="Address">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter Full Address here..."
                    style={{ height: '150px', resize: "none" }}
                    name='address'

                    value={data.address === "undefined" ? "" : data.address}
                    onChange={handleDataChange}
                  />
                </FloatingLabel>
                <Form.Control
                  type="number"
                  placeholder="Pincode"
                  maxLength={6}
                  name='pincode'
                  value={data.pincode === "undefined" ? "" : data.pincode}
                  onChange={handleDataChange}
                  pattern="\d{6}"
                  onInput={(e) => {
                    if (e.target.value.length > 6) {
                      e.target.value = e.target.value.slice(0, 6);
                    }
                  }}
                />
              </div>

              <div className="px-2 py-3 flex flex-col items-center gap-4 my-1">
                <Col xs={8} md={4}>
                  <Image src={BASE_URL + data.profile} roundedCircle />
                </Col>
                <span className='text-xl'>
                  {data.first_name !== "undefined" && data.first_name + " "}
                  {data.middle_name !== "undefined" && data.middle_name + " "}
                  {data.last_name !== "undefined" && data.last_name}
                </span>
                <FloatingLabel controlId="floatingFirstName" label="Change Profile Image">
                  <Form.Control type="file" accept='.jpg, .png, .jpeg' placeholder="Change Profile Image" name='profile' onChange={handlePhotoChange} />
                </FloatingLabel>
              </div>

            </div>
          </div>

          {
            data.role === "student" &&
            (
              <>
                {/* college info  */}
                <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400 p-6 my-8">
                  <span className='text-2xl'>College Information</span>
                  <div className="grid grid-cols-3">
                    <div className="px-2 py-3 flex flex-col gap-3">
                      <FloatingLabel controlId="floatingUIN" label="UIN" >
                        <Form.Control type="text" placeholder="UIN" name='uin' value={data.uin === "undefined" ? "" : data.uin} onChange={handleDataChange} />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingRollNumber" label="Roll Number" >
                        <Form.Control type="number" placeholder="Roll Number" name='rollNumber' value={data.rollNumber === "undefined" ? "" : data.rollNumber} onChange={handleDataChange} />
                      </FloatingLabel>
                    </div>

                    <div className="px-2 py-3 flex flex-col gap-3">
                      <FloatingLabel controlId="floatingSelectDepartment" label="Department">
                        <Form.Select aria-label="Floating label select department" className='cursor-pointer' name='department' value={data.department} onChange={handleDataChange} >
                          <option disabled value="undefined" className='text-gray-400'>Enter Your Department</option>
                          <option value="Computer">Computer</option>
                          <option value="Civil">Civil</option>
                          <option value="ECS">ECS</option>
                          <option value="AIDS">AIDS</option>
                          <option value="Mechanical">Mechanical</option>
                        </Form.Select>
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingSelectYear" label="Year">
                        <Form.Select aria-label="Floating label select year" className='cursor-pointer' name='year' value={data.year} onChange={handleDataChange} >
                          <option disabled value="undefined" className='text-gray-400'>Enter Your Year</option>
                          <option value="1">1st</option>
                          <option value="2">2nd</option>
                          <option value="3">3rd</option>
                          <option value="4">4th</option>
                        </Form.Select>
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingAdmissionYear" label="Admission Year">
                        <Form.Control
                          type="number"
                          placeholder="Addmission Year"
                          maxLength={4}
                          pattern="\d{4}"
                          name='addmissionYear'
                          value={data.addmissionYear === "undefined" ? "" : data.addmissionYear}
                          onChange={handleDataChange}
                          onInput={(e) => {
                            if (e.target.value.length > 4) {
                              e.target.value = e.target.value.slice(0, 4);
                            }
                          }}
                        />
                      </FloatingLabel>
                    </div>

                    <div className="px-2 py-3 flex flex-wrap gap-2">
                      <FloatingLabel controlId="floatingSem1" label="Sem 1">
                        <Form.Control type="number" placeholder="Sem 1" name='sem1' value={data.sem1 === "undefined" ? "" : data.sem1} onChange={handleDataChange} />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingSem2" label="Sem 2">
                        <Form.Control type="number" placeholder="Sem 2" name='sem2' value={data.sem2 === "undefined" ? "" : data.sem2} onChange={handleDataChange} />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingSem3" label="Sem 3">
                        <Form.Control type="number" placeholder="Sem 3" name='sem3' value={data.sem3 === "undefined" ? "" : data.sem3} onChange={handleDataChange} />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingSem4" label="Sem 4">
                        <Form.Control type="number" placeholder="Sem 4" name='sem4' value={data.sem4 === "undefined" ? "" : data.sem4} onChange={handleDataChange} />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingSem5" label="Sem 5">
                        <Form.Control type="number" placeholder="Sem 5" name='sem5' value={data.sem5 === "undefined" ? "" : data.sem5} onChange={handleDataChange} />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingSem6" label="Sem 6">
                        <Form.Control type="number" placeholder="Sem 6" name='sem6' value={data.sem6 === "undefined" ? "" : data.sem6} onChange={handleDataChange} />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingSem7" label="Sem 7">
                        <Form.Control type="number" placeholder="Sem 7" name='sem7' value={data.sem7 === "undefined" ? "" : data.sem7} onChange={handleDataChange} />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingSem8" label="Sem 8">
                        <Form.Control type="number" placeholder="Sem 8" name='sem8' value={data.sem8 === "undefined" ? "" : data.sem8} onChange={handleDataChange} />
                      </FloatingLabel>
                    </div>

                  </div>
                </div>

                {/* past qualification  */}
                <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400 p-6 my-8">
                  <span className='text-2xl'>Past Qualification</span>
                  <div className="grid grid-cols-3">
                    <div className="px-2 py-3 flex flex-col gap-2">
                      <FloatingLabel controlId="floatingSelectSSC" label="SSC Board Name">
                        <Form.Select aria-label="Floating label select SSCBoard" className='cursor-pointer' name='sscBoard' value={data.sscBoard} onChange={handleDataChange} >
                          <option disabled value="undefined" className='text-gray-400'>Enter Your SSC Board Name</option>
                          <option value="Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)">Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)</option>
                          <option value="Central Board of Secondary Education (CBSE)">Central Board of Secondary Education (CBSE)</option>
                          <option value="Council for the Indian School Certificate Examinations (CISCE)">Council for the Indian School Certificate Examinations (CISCE)</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingSSCMarks" label="SSC Percentage">
                        <Form.Control type="number" placeholder="SSC Percentage" name='sscPercentage' value={data.sscPercentage === "undefined" ? "" : data.sscPercentage} onChange={handleDataChange} />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingSelectSSCPassingYear" label="SSC Passing Year">
                        <Form.Control type="number" placeholder="SSC Passing Year" name='sscPassingYear' value={data.sscPassingYear === "undefined" ? "" : data.sscPassingYear} onChange={handleDataChange} />
                      </FloatingLabel>
                    </div>

                    <div className="px-2 py-3 flex flex-col gap-2">
                      <FloatingLabel controlId="floatingSelectHSC" label="HSC Board Name">
                        <Form.Select aria-label="Floating label select HSC Board" className='cursor-pointer' name='hscBoard' value={data.hscBoard} onChange={handleDataChange}>
                          <option disabled value="undefined" className='text-gray-400'>Enter Your SSC Board Name</option>
                          <option value="Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)">Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)</option>
                          <option value="Central Board of Secondary Education (CBSE)">Central Board of Secondary Education (CBSE)</option>
                          <option value="Council for the Indian School Certificate Examinations (CISCE)">Council for the Indian School Certificate Examinations (CISCE)</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingHSCMarks" label="HSC Percentage">
                        <Form.Control type="number" placeholder="HSC Percentage" name='hscPercentage' value={data.hscPercentage === "undefined" ? "" : data.hscPercentage} onChange={handleDataChange} />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingSelectHSCPassingYear" label="HSC Passing Year">
                        <Form.Control type="number" placeholder="HSC Passing Year" name='hscPassingYear' value={data.hscPassingYear === "undefined" ? "" : data.hscPassingYear} onChange={handleDataChange} />
                      </FloatingLabel>
                    </div>

                    <div className="px-2 py-3 flex flex-col gap-2">
                      <FloatingLabel controlId="floatingSelectDiploma" label="Diploma Board Name">
                        <Form.Select aria-label="Floating label select Diploma Board" className='cursor-pointer' name='diplomaBoard' value={data.diplomaBoard} onChange={handleDataChange}>
                          <option disabled value="undefined" className='text-gray-400'>Enter Your Diploma University Name</option>
                          <option value="Mumbai University">Mumbai University</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingDiplomaMarks" label="Diploma Percentage or CGPA">
                        <Form.Control type="number" placeholder="Diploma Percentage" name='diplomaPercentage' value={data.diplomaPercentage === "undefined" ? "" : data.diplomaPercentage} onChange={handleDataChange} />
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingSelectDiplomaPassingYear" label="Diploma Passing Year">
                        <Form.Control type="number" placeholder="Diploma Passing Year" name='diplomaPassingYear' value={data.diplomaPassingYear === "undefined" ? "" : data.diplomaPassingYear} onChange={handleDataChange} />
                      </FloatingLabel>
                    </div>

                  </div>
                </div>
              </>
            )
          }
          <div className="flex flex-col justify-center items-center gap-2">
            <Button variant="primary" type='submit' size='lg'>Save</Button>
            <span className='text-black'>
              {
                data.role === "student" ?
                "Note: All field are required, except sem 3 to 8 and HSC or Diploma!"
                :
                "Note: All field are required!"
              }
            </span>
          </div>
        </form>
      </div >
    </>
  )
}

export default CptProfile