import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function CategoryAnalytics({ refresh }) {

  const [analytics, setAnalytics] =
    useState({

      highest_spending_category:
      "",

      lowest_spending_category:
      "",

      category_totals: {}

    });

  const [loading, setLoading] =
    useState(true);

  // FETCH ANALYTICS
  const fetchAnalytics = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/api/category-analytics/",
        {
          headers: {
            Authorization:
            `Bearer ${token}`
          }
        }
      );

      setAnalytics(
        response.data
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  // AUTO REFRESH
  useEffect(() => {

    fetchAnalytics();

  }, [refresh]);

  // TOTAL SPENDING
  const totalSpending =
    Object.values(
      analytics.category_totals
    ).reduce(
      (total, current) =>
        total + current,
      0
    );

  // HIGHEST CATEGORY AMOUNT
  const highestAmount =
    analytics.category_totals[
      analytics.highest_spending_category
    ] || 0;

  // SMART SAVING IDEA
  const possibleSaving =
    highestAmount * 0.10;

  // LOADING
  if (loading) {

    return (

      <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl">

        <h2 className="text-3xl font-bold mb-6 text-yellow-400">

          Smart Spending Analytics

        </h2>

        <p className="text-lg text-gray-400">

          Loading Analytics...

        </p>

      </div>

    );

  }

  return (

    <div>

      <h2 className="text-3xl font-bold mb-6 text-yellow-400">

        Smart Spending Analytics

      </h2>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <div className="bg-red-500/20 border border-red-500 p-5 rounded-2xl">

          <h3 className="text-lg text-red-300">

            Highest Spending

          </h3>

          <p className="text-2xl font-bold mt-2">

            {
              analytics.highest_spending_category
            }

          </p>

        </div>

        <div className="bg-green-500/20 border border-green-500 p-5 rounded-2xl">

          <h3 className="text-lg text-green-300">

            Lowest Spending

          </h3>

          <p className="text-2xl font-bold mt-2">

            {
              analytics.lowest_spending_category
            }

          </p>

        </div>

      </div>

      {/* SMART INSIGHTS */}
      <div className="bg-blue-500/10 border border-blue-500 rounded-2xl p-6 mb-6">

        <h3 className="text-2xl font-bold text-blue-400 mb-4">

          AI Savings Insights

        </h3>

        <p className="text-lg mb-3">

          Total Spending:
          <span className="font-bold text-white ml-2">

            ₹{totalSpending.toFixed(2)}

          </span>

        </p>

        <p className="text-lg mb-3">

          Highest spending category is

          <span className="font-bold text-red-400 ml-2">

            {
              analytics.highest_spending_category
            }

          </span>

        </p>

        <p className="text-lg mb-3">

          Reducing

          <span className="font-bold text-yellow-400 mx-2">

            {
              analytics.highest_spending_category
            }

          </span>

          expenses by 10% can save approximately

          <span className="font-bold text-green-400 ml-2">

            ₹{possibleSaving.toFixed(2)}

          </span>

        </p>

        <p className="text-lg text-gray-300 mt-4">

          Smart Tip:
          Track unnecessary purchases and set realistic monthly limits.

        </p>

      </div>

      {/* CATEGORY TOTALS */}
      <div className="space-y-4">

        {

          Object.entries(
            analytics.category_totals
          ).map(
            ([category, amount]) => (

              <div
                key={category}
                className="bg-gray-800 p-4 rounded-2xl flex justify-between items-center"
              >

                <span className="font-semibold text-lg">

                  {category}

                </span>

                <span className="text-blue-400 font-bold text-xl">

                  ₹{amount}

                </span>

              </div>

            )
          )

        }

      </div>

    </div>

  );

}

export default CategoryAnalytics;