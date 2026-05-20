import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function SpendingPrediction({ refresh }) {

  const [prediction, setPrediction] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // FETCH PREDICTION
  const fetchPrediction = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "https://finance-ai-backend-q477.onrender.com/api/prediction/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setPrediction(
  response.data.predicted_spending
);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  // AUTO REFRESH
  useEffect(() => {

    fetchPrediction();

  }, [refresh]);

  // LOADING
  if (loading) {

    return (

      <div className="bg-white p-8 rounded-3xl shadow-xl">

        <h2 className="text-3xl font-bold text-purple-600 mb-6">

          Spending Prediction

        </h2>

        <p className="text-gray-500">

          Loading Prediction...

        </p>

      </div>

    );

  }

  return (

    <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300">

      <h2 className="text-3xl font-bold text-purple-600 mb-6">

        AI Spending Prediction

      </h2>

      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl">

        <p className="text-xl text-white font-semibold leading-relaxed">

          {prediction}

        </p>

      </div>

    </div>

  );

}

export default SpendingPrediction;