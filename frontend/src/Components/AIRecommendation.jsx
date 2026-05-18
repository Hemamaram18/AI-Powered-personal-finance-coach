import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function AIRecommendation({ refresh }) {

  const [recommendation, setRecommendation] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // FETCH AI RECOMMENDATION
  const fetchRecommendation =
    async () => {

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        console.log(
          "TOKEN:",
          token
        );

        const response =
          await axios.get(
            "http://127.0.0.1:8000/api/ai/",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        console.log(
          "AI RESPONSE:",
          response.data
        );

        setRecommendation(
          response.data.recommendation
        );

        setLoading(false);

      } catch (error) {

        console.log(
          "AI ERROR:",
          error
        );

        setLoading(false);

      }

    };

  // AUTO REFRESH
  useEffect(() => {

    fetchRecommendation();

  }, [refresh]);

  // LOADING
  if (loading) {

    return (

      <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl">

        <h2 className="text-3xl font-bold mb-6">

          AI Financial Insights

        </h2>

        <p className="text-lg text-gray-400">

          Loading Recommendation...

        </p>

      </div>

    );

  }

  return (

    <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300">

      <h2 className="text-3xl font-bold mb-6">

        AI Financial Insights

      </h2>

      <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 rounded-2xl">

        <p className="text-lg leading-relaxed text-white">

          {recommendation}

        </p>

      </div>

    </div>

  );

}

export default AIRecommendation;