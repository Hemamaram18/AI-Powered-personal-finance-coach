import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function BudgetTracker({
  refresh,
  refreshData
}) {

  const [budgets, setBudgets] =
    useState([]);

  const [category, setCategory] =
    useState("");

  const [monthlyLimit,
    setMonthlyLimit] =
    useState("");

  const [month, setMonth] =
    useState("");

  // EDIT STATES
  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({
      category: "",
      monthly_limit: "",
      month: ""
    });

  const token =
    localStorage.getItem("token");


  // FETCH BUDGETS
  const fetchBudgets = async () => {

    try {

      const response =
        await axios.get(
          "http://127.0.0.1:8000/api/budget-analytics/",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setBudgets(
        response.data
      );

    } catch (error) {

      console.log(
        "BUDGET FETCH ERROR:",
        error
      );

    }

  };


  // AUTO REFRESH
  useEffect(() => {

    fetchBudgets();

  }, [refresh]);


  // ADD BUDGET
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/budgets/",
        {
          category: category,
          monthly_limit:
            monthlyLimit,
          month: month
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert("Budget Added");

      setCategory("");

      setMonthlyLimit("");

      setMonth("");

      fetchBudgets();

      if (refreshData) {

        refreshData();

      }

    } catch (error) {

      console.log(error);

      alert("Budget Add Failed");

    }

  };


  // DELETE BUDGET
  const deleteBudget =
    async (id) => {

      try {

        await axios.delete(
          `http://127.0.0.1:8000/api/budgets/delete/${id}/`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        alert("Budget Deleted");

        fetchBudgets();

        if (refreshData) {

          refreshData();

        }

      } catch (error) {

        console.log(error);

        alert("Delete Failed");

      }

    };


  // UPDATE BUDGET
  const updateBudget =
    async (id) => {

      try {

        await axios.patch(
          `http://127.0.0.1:8000/api/budgets/update/${id}/`,
          {
            category:
              editData.category,

            monthly_limit:
              editData.monthly_limit,

            month:
              editData.month
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        alert("Budget Updated");

        setEditingId(null);

        fetchBudgets();

        if (refreshData) {

          refreshData();

        }

      } catch (error) {

        console.log(error);

        alert("Update Failed");

      }

    };


  return (

    <div>

      <h2 className="text-3xl font-bold mb-6 text-green-400">

        Budget Tracker

      </h2>


      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="w-full p-3 rounded-xl bg-gray-800 text-white"
          required
        >

          <option value="">
            Select Category
          </option>

          <option>
            Food
          </option>

          <option>
            Travel
          </option>

          <option>
            Shopping
          </option>

          <option>
            Bills
          </option>

          <option>
            Entertainment
          </option>

          <option>
            Health
          </option>

          <option>
            Education
          </option>

          <option>
            Other
          </option>

        </select>


        <input
          type="number"
          placeholder="Monthly Limit"
          value={monthlyLimit}
          onChange={(e) =>
            setMonthlyLimit(
              e.target.value
            )
          }
          className="w-full p-3 rounded-xl bg-gray-800 text-white"
          required
        />


        <input
          type="text"
          placeholder="Month Example: May"
          value={month}
          onChange={(e) =>
            setMonth(
              e.target.value
            )
          }
          className="w-full p-3 rounded-xl bg-gray-800 text-white"
          required
        />


        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-xl font-semibold"
        >

          Add Budget

        </button>

      </form>


      {/* BUDGET LIST */}
      <div className="mt-8 space-y-4">

        {

          budgets.length > 0 ? (

            budgets.map((item) => (

              <div
                key={item.id}
                className="bg-gray-800 p-4 rounded-xl"
              >

                {

                  editingId === item.id ? (

                    <div className="space-y-4">

                      <input
                        type="text"
                        value={
                          editData.category
                        }
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            category:
                              e.target.value
                          })
                        }
                        className="w-full p-3 rounded-xl bg-gray-700 text-white"
                      />

                      <input
                        type="number"
                        value={
                          editData.monthly_limit
                        }
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            monthly_limit:
                              e.target.value
                          })
                        }
                        className="w-full p-3 rounded-xl bg-gray-700 text-white"
                      />

                      <input
                        type="text"
                        value={
                          editData.month
                        }
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            month:
                              e.target.value
                          })
                        }
                        className="w-full p-3 rounded-xl bg-gray-700 text-white"
                      />

                      <div className="flex gap-3">

                        <button
                          onClick={() =>
                            updateBudget(item.id)
                          }
                          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                        >

                          Save

                        </button>

                        <button
                          onClick={() =>
                            setEditingId(null)
                          }
                          className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg"
                        >

                          Cancel

                        </button>

                      </div>

                    </div>

                  ) : (

                    <div className="flex justify-between items-center">

                      <div>

                        <p className="font-bold text-xl">

                          {item.category}

                        </p>

                        <p className="text-gray-400 mt-1">

                          Budget:
                          ₹{item.budget}

                        </p>

                        <p className="text-gray-400">

                          Spent:
                          ₹{item.spent}

                        </p>

                        <p
                          className={
                            item.remaining >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }
                        >

                          {

                            item.remaining >= 0

                              ? `Remaining: ₹${item.remaining}`

                              : `Exceeded by ₹${Math.abs(item.remaining)}`

                          }

                        </p>

                      </div>

                      <div className="flex gap-3">

                        <button
                          onClick={() => {

                            setEditingId(
                              item.id
                            );

                            setEditData({
                              category:
                                item.category,

                              monthly_limit:
                                item.budget,

                              month:
                                item.month || ""
                            });

                          }}
                          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg"
                        >

                          Edit

                        </button>

                        <button
                          onClick={() =>
                            deleteBudget(
                              item.id
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                        >

                          Delete

                        </button>

                      </div>

                    </div>

                  )

                }

              </div>

            ))

          ) : (

            <div className="text-gray-400 text-center">

              No Budgets Added

            </div>

          )

        }

      </div>

    </div>

  );

}

export default BudgetTracker;