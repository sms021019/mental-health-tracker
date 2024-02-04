import React, { useEffect, useState } from 'react';
import './dashboard.css';
import BarChart from './BarChart';
import GoogleBarChart from './BarChart';
import CircleChart from './CircleChart';
import { getAllUsersAPIMethod, getUserById } from '../../api/client';

const DashBoard = () => {
    const [recommendation, setRecommendation] = useState("Try taking a walk and talking to your friends! It is scientifically proven that walks enhance mood by 10%!");
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const fetchedUser = await getUserById("65becb586072d6d72f0e7bb0");
    //         setUserData(fetchUser);
    //     }
    //     fetchUser();
    // }, []);
    return (
        <div className='dashboard_container'>
            {console.log(userData)}
            <div className='dashboard'>
                <div className='dashboard_left'>
                    <p>Today, you are feeling</p>
                    <h1>Depressed</h1>
                </div>
            </div>
            <div className='dashboard_bottom'>
                <div className='barchart'>
                    <BarChart />
                </div>
                <div className='circlechart'>
                    <CircleChart />
                </div>
            </div>
            <div className="dashboard_right">
                <div className="dashboard_right_left">
                    <p>{recommendation}</p>
                </div>
                <div className="dashboard_right_right">
                    <h1>5</h1>
                    <h3>people feel the same way!</h3>
                </div>
            </div>
            <div className="container">
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
            </div>
        </div>
    )
}

export default DashBoard;