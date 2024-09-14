import React, { useEffect, useState } from 'react'
import Layout from './../../components/Layout';
// import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Col, Form, Input, message, Row, TimePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import moment from 'moment';


const Profile = () => {
    const { user } = useSelector(state => state.user);
    const [doctor, setDoctor] = useState(null);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // update doc
    // handle form
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/doctor/updateProfile', {
                ...values, userId: user._id, timings: [
                    moment(values.timing[0].format("HH:mm")),
                    moment(values.timing[1].format("HH:mm"))
                ],
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                navigate('/');
            } else {
                message.error(res.data.success);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something went wrong');
        }
    }

    // getdoc Details
    const getDoctorInfo = async () => {
        try {
            const res = await axios.post('/api/v1/doctor/getDoctorInfo', { userId: params.id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDoctorInfo();
        //eslint-disable-next-line
    }, [])

    return (
        <Layout>
            <h1>Manage Profile</h1>
            {doctor && (
                <Form layout="vertical" onFinish={handleFinish} className='m-3' initialValues={{
                    ...doctor,
                    timings: [
                        moment(doctor.timigs[0], 'HH:mm'),
                        moment(doctor.timigs[1], 'HH:mm'),
                    ]
                }}>
                    <h4 className="">Personal Details:</h4>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
                                <Input type="text" placeholder="Your first name" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                                <Input type="text" placeholder="Your last name" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Phone no." name="phone" required rules={[{ required: true }]}>
                                <Input type="text" placeholder="Your mobile number" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
                                <Input type="text" placeholder="Enter your email" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Website URL" name="website" >
                                <Input type="text" placeholder="Your website URL" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Address" name="address" required rules={[{ required: true }]}>
                                <Input type="text" placeholder="Your clinic address" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Professional details  */}
                    <h4 className="">Professional Details:</h4>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Specialization" name="specialization" required rules={[{ required: true }]}>
                                <Input type="text" placeholder="Enter your specialization" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Experience" name="experience" required rules={[{ required: true }]}>
                                <Input type="text" placeholder="Enter your experience" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Fees Per Cunsaltation" name="feesPerCunsaltation" required rules={[{ required: true }]}>
                                <Input type="text" placeholder="Your fees" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Timing" name="timing" required rules={[{ required: true }]}>
                                <TimePicker.RangePicker />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" type='submit'>Update</button>
                    </div>
                </Form>
            )}
        </Layout>
    )
}

export default Profile