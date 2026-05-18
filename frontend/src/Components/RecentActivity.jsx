import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function RecentActivity({ refresh }) {

  const [transactions, setTransactions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH RECENT ACTIVITY
  const fetchRecentActivity =
    async () => {

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            "http://127.0.0.1:8000/api/transactions/",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        // SHOW LATEST 5
        const latestTransactions =
          response.data
            .slice()
            .reverse()
            .slice(0, 5);

        setTransactions(
          latestTransactions
        );

        setLoading(false);

      } catch (error) {

        console.log(
          "RECENT ACTIVITY ERROR:",
          error
        );

        setLoading(false);

      }

    };

  // AUTO REFRESH
  useEffect(() => {

    fetchRecentActivity();

  }, [refresh]);

  // LOADING
  if (loading) {

    return (

      <div className="bg-white p-6 rounded-3xl shadow-lg">

        <h2 className="text-3xl font-bold text-blue-600 mb-6">

          Recent Activity

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

        Recent Activity

      </h2>

      {

        transactions.length > 0 ? (

          <div className="space-y-4">

            {

              transactions.map(
                (item) => (

                  <div
                    key={item.id}
                    className="border p-4 rounded-2xl"
                  >

                    <h3 className="text-xl font-bold text-gray-800">

                      {item.category}

                    </h3>

                    <p className="text-gray-600">

                      Merchant:
                      {" "}
                      {item.merchant}

                    </p>

                    <p className="text-green-600 font-bold">

                      ₹{item.amount}

                    </p>

                    <p className="text-sm text-gray-500">

                      {item.date}

                    </p>

                  </div>

                )
              )

            }

          </div>

        ) : (

          <p className="text-gray-500">

            No Recent Activity

          </p>

        )

      }

    </div>

  );

}

export default RecentActivity;