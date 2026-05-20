import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function SpendingChart({ refresh }) {

  const [data, setData] =
    useState([]);

  // FETCH DATA
  const fetchChartData =
    async () => {

      try {

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

              name:
                item.category,

              value:
                item.amount,

            })
          );

        setData(
          formattedData
        );

      } catch (error) {

        console.log(
          error
        );

      }

    };

  // AUTO REFRESH
  useEffect(() => {

    fetchChartData();

  }, [refresh]);

  const COLORS = [

    "#0088FE",

    "#00C49F",

    "#FFBB28",

    "#FF8042",

    "#A855F7",

    "#EC4899",

  ];

  return (

    <div className="bg-white p-6 rounded-3xl shadow-lg">

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">

        Spending Chart

      </h2>

      {

        data.length > 0 ? (

          <ResponsiveContainer
            width="100%"
            height={400}
          >

            <PieChart>

              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={130}
                dataKey="value"
                label
              >

                {

                  data.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />

                    )
                  )

                }

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        ) : (

          <div className="text-center text-gray-500 text-xl">

            No Chart Data Available

          </div>

        )

      }

    </div>

  );

}

export default SpendingChart;