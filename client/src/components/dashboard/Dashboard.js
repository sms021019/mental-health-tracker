import React, { useEffect, useState } from "react";
import "./dashboard.css";
import BarChart from "./BarChart";
import GoogleBarChart from "./BarChart";
import CircleChart from "./CircleChart";
import { getAllUsersAPIMethod, getUserById } from "../../api/client";
import Lottie from "lottie-react";
import NoData from "../../assets/lottie/NoData.json";

const DashBoard = () => {
  const [recommendation, setRecommendation] = useState(
    "Try taking a walk and talking to your friends! It is scientifically proven that walks enhance mood by 10%!"
  );
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [completedToday, setCompletedToday] = useState(false);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  useEffect(() => {
    const fetchUser = async () => {
      // const fetchedUser = await getUserById("65bee3d46072d6d72f0e7bb1");
      const fetchedUser = await getUserById("65becb586072d6d72f0e7bb0");

      setUserData(fetchedUser.userData);
      const isTodayInArray = fetchedUser.userData.some((obj) => {
        const formattedObjectDate = new Date(obj.datetime)
          .toISOString()
          .split("T")[0];
        // console.log("formattedObjectDate: ", formattedObjectDate);
        // console.log("formattedDate: ", formattedDate);
        return formattedObjectDate === formattedDate;
      });
      setCompletedToday(isTodayInArray);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (userData) {
      console.log("hi");
      const isTodayInArray = userData.some((obj) => {
        const formattedObjectDate = new Date(obj.datetime)
          .toISOString()
          .split("T")[0];

        return formattedObjectDate === formattedDate;
      });
      setCompletedToday(isTodayInArray);
    }
  }, []);

  return (
    <div className="dashboard_container">
      <div className="dashboard">
        {completedToday ? (
          <div className="dashboard_left">
            <p>Today, you are feeling</p>
            <h1>Depressed</h1>
          </div>
        ) : (
          <div className="dashboard_left">
            <h1 style={{ textDecoration: "none", fontWeight: 200 }}>NO DATA</h1>
          </div>
        )}
      </div>
      <div className="dashboard_bottom">
        {completedToday ? (
          <>
            <div className="circlechart">
              {userData != null && <CircleChart userData={userData} />}
            </div>
            <div className="barchart">
              {userData != null && <BarChart userData={userData} />}
            </div>
          </>
        ) : (
          <button
            class="button"
            type="button"
            data-hover="Click To Fill Out Todays Form"
            data-active="Let's Begin!"
          >
            <span>You Haven't Completed Your Form Yet!</span>
          </button>
        )}
      </div>
      {completedToday ? (
        <div className="dashboard_right">
          <>
            <div className="dashboard_right_left">
              <p>{recommendation}</p>
            </div>
            <div className="dashboard_right_right">
              <h1>5</h1>
              <h3>people feel the same way!</h3>
            </div>
          </>
        </div>
      ) : (
        <div>
          <Lottie
            style={{ width: "20rem", height: "20rem" }}
            animationData={NoData}
          />
        </div>
      )}
    </div>
  );
};

export default DashBoard;
