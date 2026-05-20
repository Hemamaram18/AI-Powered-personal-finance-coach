import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function MonthlyTrends({ refresh }) {

  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH MONTHLY DATA
  const fetchMonthlyData =
    async () => {

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            "https://finance-ai-backend-q477.onrender.com/api/chart-data/",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        // FORMAT DATA
        const formattedData =
          response.data.map(
            (item) => ({

              month:
                item.category,

              amount:
                item.amount,

            })
          );

        setData(
          formattedData
        );

        setLoading(false);

      } catch (error) {

        console.log(
          "MONTHLY TRENDS ERROR:",
          error
        );

        setLoading(false);

      }

    };

  // AUTO REFRESH
  useEffect(() => {

    fetchMonthlyData();

  }, [refresh]);

  // LOADING
  if (loading) {

    return (

      <div className="bg-white p-6 rounded-3xl shadow-lg">

        <h2 className="text-3xl font-bold text-blue-600 mb-6">

          Monthly Expense Trends

        </h2>

        <p className="text-gray-500">

          Loading...

        </p>

      </div>

    );

  }

  return (

    <div className="bg-white p-6 rounded-3xl shadow-lg">

      <h2 className="text-3xl font-bold text-blue-600 mb-6">

        Monthly Expense Trends

      </h2>

      {

        data.length > 0 ? (

          <ResponsiveContainer
            width="100%"
            height={400}
          >

            <LineChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2563eb"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        ) : (

          <p className="text-gray-500 text-center">

            No Trend Data Available

          </p>

        )

      }

    </div>

  );

}

export default MonthlyTrends;