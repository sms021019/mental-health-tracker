import React, { useEffect, useState } from 'react';
import './dashboard.css';
import BarChart from './BarChart';
import GoogleBarChart from './BarChart';
import CircleChart from './CircleChart';
import { getAllUsersAPIMethod, getUserById } from '../../api/client';
import { selectUser } from '../../features/userSlice';
import { useSelector } from "react-redux";

const DashBoard = () => {
    const [recommendation, setRecommendation] = useState("Try taking a walk and talking to your friends! It is scientifically proven that walks enhance mood by 10%!");
    // const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [completedToday, setCompletedToday] = useState(false);
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const user = useSelector(selectUser);
    console.log("USER: ", user.token);
    const valueFromLocalStorage = localStorage.getItem('token');
    console.log("VAL: ", valueFromLocalStorage);


    // useEffect(() => {
    //     const fetchUser = async () => {
    //         // const fetchedUser = await getUserById("65bee3d46072d6d72f0e7bb1");
    //         var fetchedUser = null;
    //         if (user) {
    //             fetchedUser = await getUserById(user.token);
    //         }

    //         setUserData(fetchedUser.userData);
    //         const isTodayInArray = fetchedUser.userData.some(obj => {
    //             const formattedObjectDate = new Date(obj.datetime).toISOString().split('T')[0];
    //             // console.log("formattedObjectDate: ", formattedObjectDate);
    //             // console.log("formattedDate: ", formattedDate);
    //             return formattedObjectDate === formattedDate;

    //         });
    //         setCompletedToday(isTodayInArray);
    //     }
    //     fetchUser();
    // }, []);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Ensure user and formattedDate are declared as dependencies
                if (!user || !formattedDate) {
                    return;
                }

                // Assuming getUserById returns an object with a 'userData' property
                const fetchedUser = await getUserById(valueFromLocalStorage);

                setUserData(fetchedUser.userData);

                const isTodayInArray = fetchedUser.userData.some(obj => {
                    const formattedObjectDate = new Date(obj.datetime).toISOString().split('T')[0];
                    return formattedObjectDate === formattedDate;
                });

                setCompletedToday(isTodayInArray);
            } catch (error) {
                console.error('Error fetching user:', error);
                // Handle the error (e.g., show an error message to the user)
            }
        };

        fetchUser();
    }, [user, formattedDate]);

    useEffect(() => {
        if (userData) {
            console.log("hi");
            const isTodayInArray = userData.some(obj => {
                const formattedObjectDate = new Date(obj.datetime).toISOString().split('T')[0];
                // console.log("formattedObjectDate: ", formattedObjectDate);
                // console.log("formattedDate: ", formattedDate);
                return formattedObjectDate === formattedDate;

            });
            setCompletedToday(isTodayInArray);
        }
    }, []);

    return (
        <div className='dashboard_container'>
            {console.log("completed today? ", completedToday)}
            <div className='dashboard'>
                {completedToday ? (
                    <div className='dashboard_left'>
                        <p>Today, you are feeling</p>
                        <h1>Depressed</h1>
                    </div>
                ) : (
                    <div className="dashboard_left">
                        <h2>Please fill out today's questionnaire!</h2>
                    </div>
                )}

            </div>
            <div className='dashboard_bottom'>
                {completedToday ? (
                    <>
                        <div className='circlechart'>
                            {userData != null && (
                                <CircleChart userData={userData} />
                            )}
                        </div>
                        <div className='barchart'>
                            {userData != null && (
                                <BarChart userData={userData} />
                            )}
                        </div>
                    </>
                ) : (
                    <p className='dashboard_noData'>No data</p>
                )}

            </div>
            <div className="dashboard_right">
                {completedToday ? (
                    <>
                        <div className="dashboard_right_left">
                            <p>{recommendation}</p>
                        </div>
                        <div className="dashboard_right_right">
                            <h1>5</h1>
                            <h3>people feel the same way!</h3>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="dashboard_right_left">
                            <p>No data</p>
                        </div>
                        <div className="dashboard_right_right">
                            <p>No data</p>
                        </div>
                    </>
                )}


            </div>
            {/* <div className="container">
                <div className="tree">
                    {[0, 1, 2, 3].map((x) => (
                        <div
                            className="branch"
                            key={x}
                            style={{ '--x': x, '--i': 0 }}
                        >
                            {[0, 1, 2, 3].map((i) => (
                                <span key={i} style={{ '--i': i }}></span>
                            ))}
                        </div>
                    ))}
                    <div className="stem">
                        {[0, 1, 2, 3].map((i) => (
                            <span key={i} style={{ '--i': i }}></span>
                        ))}
                    </div>
                    <span className="shadow"></span>
                </div>
            </div> */}
        </div>
    )
}

export default DashBoard;