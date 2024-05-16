import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go"

export const AddUser = () => {
    const { store, actions } = useContext(Context);
    const [selectedRole, setSelectedRole] = useState('');
    const [isUsers, setIsUsers] = useState(true);
    const [certificate, setCertificate] = useState('');
    const [counter, setCounter] = useState(5);
    const [redirectPath, setRedirectPath] = useState('');
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        name: '',
        lastName: '',
        username: '',
        numberDocument: '',
        phone: '',
        age: '',
        gender: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'isPeople') {
            setSelectedRole(value);
            let updatedData = {};
            if (value === 'user') {
                updatedData = { isUser: isUsers };
                setUserData(prevState => ({
                    ...prevState,
                    ...updatedData,
                    isTeacher: undefined,
                    isManager: undefined
                }));
            } else if (value === 'teacher') {
                updatedData = { isTeacher: isUsers };
                setUserData(prevState => ({
                    ...prevState,
                    ...updatedData,
                    isUser: undefined,
                    isManager: undefined,
                    certificateTeacher: certificate
                }));
            } else if (value === 'manager') {
                updatedData = { isManager: isUsers };
                setUserData(prevState => ({
                    ...prevState,
                    ...updatedData,
                    isUser: undefined,
                    isTeacher: undefined
                }));
            }
        } else {
            setUserData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    async function handleSubmit(event) {
        event.preventDefault();
        await actions.createUser(userData, selectedRole);
        setCounter(0)
    }

    function handlerGoToLogIn() {
        navigate('/LogIn');
    }

    function handlerHome() {
        navigate('/');
    }

    useEffect(() => {
        if (redirectPath !== '') {
            navigate(redirectPath);
        }
    }, [navigate, redirectPath]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => {
                if (store.error === '' && counter === 4) {
                    setRedirectPath('/LogIn');
                    clearInterval(interval);
                }
                return prevCounter + 1;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [setRedirectPath, store.error, counter]);


    const msgError = typeof store.error === 'string' ? store.error : JSON.stringify(store.error)

    return (
        <div className='container'>
            {/* Msg */}
            <div className='position-relative'>
                <div className='d-flex justify-content-center position-absolute top-0 start-50 translate-middle-x' style={{ zIndex: 1 }}>
                    {msgError === ''
                        ? <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 3) ? "alert alert-success" : "d-none"}`}>
                            {"Sign Up Successfully"}
                        </div>
                        : <div className={`text-center mt-3 fs-4 fw-bold w-100 ${(counter >= 1 && counter <= 3) ? "alert alert-danger" : "d-none"}`}>
                            {msgError}
                        </div>}
                </div>
            </div>
            
            <div className="d-flex justify-content-center align-items-center position-relative mt-3 mb-5" style={{ zIndex: 0 }}>
                <div className='d-flex justify-content-center align-items-center mx-2 fs-4 position-absolute start-0'
                    onClick={handlerHome}
                    style={{ cursor: "pointer" }}>
                    <GoArrowLeft />
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <h1>Record your Personal Data</h1>
                </div>
            </div>



            <form className=" mt-5 mb-5 row g-3 needs-validation" onSubmit={handleSubmit} noValidate>

                {/* Role */}
                <div className='col-12'>
                    <label className="form-label">Role</label>
                    <div className="input-group has-validation">
                        <select className="form-select" name='isPeople' onChange={handleChange} value={selectedRole} required>
                            <option value="">--Choose--</option>
                            <option value='teacher'>Teacher</option>
                            <option value='user'>Student</option>
                            <option value='manager'>Manager</option>
                        </select>
                    </div>
                </div>
                {/* Name */}
                <div className='col-md-6'>
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name='name'
                        onChange={handleChange}
                        value={userData.name}
                        required />
                </div>
                {/* Last Name */}
                <div className='col-md-6'>
                    <label className="form-label">Last name</label>
                    <input
                        type="text"
                        className="form-control"
                        name='lastName'
                        onChange={handleChange}
                        value={userData.lastName}
                        required />
                </div>
                {/* Username */}
                <div className={`${(selectedRole === 'teacher' || selectedRole === 'user') ? 'd-block col-md-12' : 'd-none'}`}>
                    <label className="form-label">Username</label>
                    <div className="input-group has-validation">
                        <input
                            type="text"
                            className="form-control"
                            name='username'
                            onChange={handleChange}
                            value={userData.username}
                            required />
                    </div>
                </div>
                {/* Number Document */}
                <div className={`col-md-3 ${(selectedRole === 'manager') ? 'd-none' : 'd-block'}`}>
                    <label className="form-label">Number Document</label>
                    <input
                        type="text"
                        className="form-control"
                        name='numberDocument'
                        onChange={handleChange}
                        value={userData.numberDocument}
                        required />
                </div>
                {/* Gender */}
                <div className={`col-md-3 ${(selectedRole === 'manager') ? 'd-none' : 'd-block col-md-3'}`}>
                    <label className="form-label">Gender</label>
                    <select className="form-select" name='gender' onChange={handleChange} value={userData.gender} required>
                        <option value="">--Choose--</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                    <div className="invalid-tooltip">Please select a Gender</div>
                </div>
                {/* Phone */}
                <div className={`${(selectedRole === 'manager') ? 'd-block col-md-4' : 'd-block col-md-3'}`}>
                    <label className="form-label">Phone</label>
                    <input
                        type="phone"
                        className="form-control"
                        name='phone'
                        onChange={handleChange}
                        value={userData.phone}
                        required />
                    <div className="invalid-tooltip">Please provide a valid Phone.</div>
                </div>
                {/* Age */}
                <div className={`${(selectedRole === 'manager') ? 'd-none' : 'd-block col-md-3 '}`}>
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        name='age'
                        onChange={handleChange}
                        value={userData.age}
                        required />
                    <div className="invalid-tooltip">Please provide a valid Age.</div>
                </div>
                {/* Certificate */}
                <div className={`${(selectedRole === 'teacher') ? 'd-block col-md-12' : 'd-none'}`}>
                    <label className="form-label">Do you have a Certificate?</label>
                    <input
                        type="text"
                        className="form-control"
                        name='certificateTeacher'
                        onChange={(eve) => { setCertificate(eve.target.value) }}
                        value={certificate}
                        required />
                    <div className="invalid-tooltip">Please provide a valid certificate.</div>
                </div>
                {/* Email */}
                <div className={`${(selectedRole === 'manager') ? 'd-block col-md-4' : 'col-md-6 '}`}>
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        name='email'
                        onChange={handleChange}
                        value={userData.email}
                        required />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>
                {/* Password */}
                <div className={`${(selectedRole === 'manager') ? 'd-block col-md-4' : 'col-md-6'}`}>
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name='password'
                        onChange={handleChange}
                        value={userData.password}
                        required />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}>
                    {
                        (store.spinner)
                            ? <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            : <div class="row align-items-center ">
                                <div class="col align-self-center text-center fs-4">
                                    <span>Create User</span>
                                </div>
                            </div>
                    }
                </button>

                <div className='col-md my-3 text-center text-decoration-underline' style={{ cursor: "pointer" }}>
                    <a onClick={handlerGoToLogIn}>You already have an account.</a>
                </div>
            </form>
        </div>
    );
};
