import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaExchangeAlt
} from "react-icons/fa";

function Dashboard() {

  const [data, setData] =
    useState({

      total_income: 0,
      total_expense: 0,
      balance: 0,
      total_transactions: 0,

    });

  // LOADING STATE
  const [loading, setLoading] =
    useState(true);

  // FETCH DASHBOARD
  const fetchDashboard = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      console.log("TOKEN:", token);

      const response = await axios.get(

        "http://127.0.0.1:8000/api/dashboard/",

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setData(response.data);

      setLoading(false);

    } catch (error) {

      console.log(
        "DASHBOARD ERROR:",
        error.response
      );

      setLoading(false);

    }

  };

  // AUTO REFRESH
  useEffect(() => {

    fetchDashboard();

    const interval =
      setInterval(() => {

        fetchDashboard();

      }, 10000);

    return () =>
      clearInterval(interval);

  }, []);

  // LOADING SCREEN
  if (loading) {

    return (

      <div className="flex justify-center items-center py-10">

        <div className="text-2xl font-bold animate-pulse text-blue-600">

          Loading Dashboard...

        </div>

      </div>

    );

  }

  return (

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

      {/* INCOME */}
      <div className="bg-green-500 text-white p-6 rounded-3xl shadow-lg transform hover:scale-105 transition duration-300 hover:shadow-2xl">

        <div className="flex items-center gap-3 mb-3">

          <FaArrowUp className="text-3xl" />

          <h2 className="text-2xl font-bold">
            Total Income
          </h2>

        </div>

        <p className="text-4xl font-bold">
          ₹{data.total_income}
        </p>

      </div>

      {/* EXPENSE */}
      <div className="bg-red-500 text-white p-6 rounded-3xl shadow-lg transform hover:scale-105 transition duration-300 hover:shadow-2xl">

        <div className="flex items-center gap-3 mb-3">

          <FaArrowDown className="text-3xl" />

          <h2 className="text-2xl font-bold">
            Total Expense
          </h2>

        </div>

        <p className="text-4xl font-bold">
          ₹{data.total_expense}
        </p>

      </div>

      {/* BALANCE */}
      <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg transform hover:scale-105 transition duration-300 hover:shadow-2xl">

        <div className="flex items-center gap-3 mb-3">

          <FaWallet className="text-3xl" />

          <h2 className="text-2xl font-bold">
            Balance
          </h2>

        </div>

        <p className="text-4xl font-bold">
          ₹{data.balance}
        </p>

      </div>

      {/* TRANSACTIONS */}
      <div className="bg-purple-600 text-white p-6 rounded-3xl shadow-lg transform hover:scale-105 transition duration-300 hover:shadow-2xl">

        <div className="flex items-center gap-3 mb-3">

          <FaExchangeAlt className="text-3xl" />

          <h2 className="text-2xl font-bold">
            Transactions
          </h2>

        </div>

        <p className="text-4xl font-bold">
          {data.total_transactions}
        </p>

      </div>

    </div>

  );

}

export default Dashboard;