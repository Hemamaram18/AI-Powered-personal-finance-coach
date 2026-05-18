import React, { useEffect, useState } from "react";

function FraudAlert() {

  const [fraudData, setFraudData] = useState({
    fraud_count: 0,
    fraud_transactions: []
  });

  // FETCH FRAUD DATA
  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/fraud-detection/")
      .then((response) => response.json())
      .then((data) => {

        setFraudData(data);

      });

  }, []);

  return (

    <div>

      <h2 className="text-3xl font-bold text-red-700 mb-6">

        Fraud Detection Alerts

      </h2>

      {/* FRAUD COUNT */}
      <div className="bg-red-100 border border-red-400 rounded-xl p-5 mb-6">

        <p className="text-xl font-bold text-red-700">

          Suspicious Transactions Found:
          {" "}
          {fraudData.fraud_count}

        </p>

      </div>

      {/* NO FRAUD */}
      {fraudData.fraud_count === 0 ? (

        <div className="bg-green-100 border border-green-400 text-green-700 p-5 rounded-xl">

          No suspicious transactions detected.

        </div>

      ) : (

        <div className="space-y-6">

          {fraudData.fraud_transactions.map((transaction) => (

            <div
              key={transaction.id}
              className="bg-white shadow-lg rounded-2xl p-6 border-l-8 border-red-500"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* USER */}
                <div>

                  <p className="font-semibold text-gray-600">
                    User
                  </p>

                  <p className="text-xl font-bold text-blue-700">

                    {transaction.user}

                  </p>

                </div>

                {/* MERCHANT */}
                <div>

                  <p className="font-semibold text-gray-600">
                    Merchant
                  </p>

                  <p className="text-xl font-bold">

                    {transaction.merchant}

                  </p>

                </div>

                {/* AMOUNT */}
                <div>

                  <p className="font-semibold text-gray-600">
                    Amount
                  </p>

                  <p className="text-2xl font-bold text-red-600">

                    ₹{transaction.amount}

                  </p>

                </div>

                {/* CATEGORY */}
                <div>

                  <p className="font-semibold text-gray-600">
                    Category
                  </p>

                  <p className="text-lg font-bold">

                    {transaction.category}

                  </p>

                </div>

                {/* DATE */}
                <div>

                  <p className="font-semibold text-gray-600">
                    Date
                  </p>

                  <p className="text-lg">

                    {transaction.date}

                  </p>

                </div>

              </div>

              {/* FRAUD REASON */}
              <div className="mt-5 bg-red-50 border border-red-300 rounded-lg p-4">

                <p className="font-bold text-red-700">

                  Fraud Reason

                </p>

                <p className="mt-2 text-lg">

                  {transaction.reason}

                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default FraudAlert;