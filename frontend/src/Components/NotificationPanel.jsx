import React, { useEffect, useState } from "react";
import axios from "axios";

function NotificationPanel() {

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchNotifications();

    // AUTO UPDATE
    const handleTransactionAdded = () => {

      fetchNotifications();

    };

    window.addEventListener(
      "transactionAdded",
      handleTransactionAdded
    );

    return () => {

      window.removeEventListener(
        "transactionAdded",
        handleTransactionAdded
      );

    };

  }, []);

  const fetchNotifications = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/api/notifications/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setNotifications(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  // LOADING
  if (loading) {

    return (

      <div className="bg-white p-8 rounded-3xl shadow-xl">

        <h2 className="text-3xl font-bold text-red-500 mb-6">

          Budget Alerts

        </h2>

        <p className="text-gray-500">

          Loading Notifications...

        </p>

      </div>

    );

  }

  return (

    <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300">

      <h2 className="text-3xl font-bold text-red-500 mb-6">

        Budget Alerts

      </h2>

      {notifications.length === 0 ? (

        <p className="text-gray-500">

          No Notifications

        </p>

      ) : (

        <div className="space-y-4">

          {notifications.map(
            (item, index) => (

              <div
                key={index}
                className="bg-red-100 border-l-4 border-red-500 p-5 rounded-2xl"
              >

                <p className="text-lg text-red-700 font-semibold">

                  {item.message}

                </p>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );

}

export default NotificationPanel;