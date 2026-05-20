import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function GoalTracker({
  refresh,
  refreshData
}) {

  const [goals, setGoals] =
    useState([]);

  const [goalName, setGoalName] =
    useState("");

  const [targetAmount,
    setTargetAmount] =
    useState("");

  const [savedAmount,
    setSavedAmount] =
    useState("");

  const [months, setMonths] =
    useState("");

  // EDIT STATES
  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({
      goal_name: "",
      target_amount: "",
      saved_amount: "",
      months: ""
    });

  // AUTO REFRESH
  useEffect(() => {

    fetchGoals();

  }, [refresh]);

  // FETCH GOALS
  const fetchGoals = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          "https://finance-ai-backend-q477.onrender.com/api/goals/",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setGoals(response.data);

    } catch (error) {

      console.log(
        "GOAL FETCH ERROR:",
        error
      );

    }

  };

  // ADD GOAL
  const addGoal = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(
        "https://finance-ai-backend-q477.onrender.com/api/goals/",
        {
          goal_name: goalName,
          target_amount: targetAmount,
          saved_amount: savedAmount,
          months: months,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert("Goal Added");

      setGoalName("");
      setTargetAmount("");
      setSavedAmount("");
      setMonths("");

      fetchGoals();

      if (refreshData) {

        refreshData();

      }

    } catch (error) {

      console.log(error);

      alert(
        JSON.stringify(
          error.response?.data
        )
      );

    }

  };

  // DELETE GOAL
  const deleteGoal = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `https://finance-ai-backend-q477.onrender.com/api/goals/delete/${id}/`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert("Goal Deleted");

      fetchGoals();

      if (refreshData) {

        refreshData();

      }

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };

  // UPDATE GOAL
  const updateGoal = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.patch(
        `https://finance-ai-backend-q477.onrender.com/api/goals/update/${id}/`,
        {
          goal_name:
            editData.goal_name,

          target_amount:
            editData.target_amount,

          saved_amount:
            editData.saved_amount,

          months:
            editData.months,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert("Goal Updated");

      setEditingId(null);

      fetchGoals();

      if (refreshData) {

        refreshData();

      }

    } catch (error) {

      console.log(error);

      alert("Update Failed");

    }

  };

  return (

    <div className="bg-white p-8 rounded-3xl shadow-xl text-black">

      <h2 className="text-4xl font-bold text-blue-600 mb-8">

        Goal Tracker

      </h2>

      {/* FORM */}
      <form
        onSubmit={addGoal}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Goal Name"
          value={goalName}
          onChange={(e) =>
            setGoalName(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl"
          required
        />

        <input
          type="number"
          placeholder="Target Amount"
          value={targetAmount}
          onChange={(e) =>
            setTargetAmount(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl"
          required
        />

        <input
          type="number"
          placeholder="Saved Amount"
          value={savedAmount}
          onChange={(e) =>
            setSavedAmount(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl"
          required
        />

        <input
          type="number"
          placeholder="Months"
          value={months}
          onChange={(e) =>
            setMonths(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl"
        >

          Add Goal

        </button>

      </form>

      {/* GOAL LIST */}
      <div className="mt-10 space-y-5">

        {

          goals.length === 0 ? (

            <p className="text-gray-500">

              No Goals Added

            </p>

          ) : (

            goals.map((goal) => (

              <div
                key={goal.id}
                className="bg-gray-100 p-6 rounded-2xl"
              >

                {

                  editingId === goal.id ? (

                    <div className="space-y-4">

                      <input
                        type="text"
                        value={
                          editData.goal_name
                        }
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            goal_name:
                              e.target.value
                          })
                        }
                        className="w-full p-4 border rounded-2xl"
                      />

                      <input
                        type="number"
                        value={
                          editData.target_amount
                        }
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            target_amount:
                              e.target.value
                          })
                        }
                        className="w-full p-4 border rounded-2xl"
                      />

                      <input
                        type="number"
                        value={
                          editData.saved_amount
                        }
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            saved_amount:
                              e.target.value
                          })
                        }
                        className="w-full p-4 border rounded-2xl"
                      />

                      <input
                        type="number"
                        value={
                          editData.months
                        }
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            months:
                              e.target.value
                          })
                        }
                        className="w-full p-4 border rounded-2xl"
                      />

                      <div className="flex gap-3">

                        <button
                          onClick={() =>
                            updateGoal(goal.id)
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
                        >

                          Save

                        </button>

                        <button
                          onClick={() =>
                            setEditingId(null)
                          }
                          className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-3 rounded-xl"
                        >

                          Cancel

                        </button>

                      </div>

                    </div>

                  ) : (

                    <div className="flex justify-between items-center">

                      <div>

                        <h3 className="text-2xl font-bold">

                          {goal.goal_name}

                        </h3>

                        <p>

                          Target:
                          ₹{goal.target_amount}

                        </p>

                        <p>

                          Saved:
                          ₹{goal.saved_amount}

                        </p>

                        <p>

                          Months:
                          {goal.months}

                        </p>

                      </div>

                      <div className="flex gap-3">

                        <button
                          onClick={() => {

                            setEditingId(
                              goal.id
                            );

                            setEditData({
                              goal_name:
                                goal.goal_name,

                              target_amount:
                                goal.target_amount,

                              saved_amount:
                                goal.saved_amount,

                              months:
                                goal.months
                            });

                          }}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl"
                        >

                          Edit

                        </button>

                        <button
                          onClick={() =>
                            deleteGoal(goal.id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
                        >

                          Delete

                        </button>

                      </div>

                    </div>

                  )

                }

              </div>

            ))

          )

        }

      </div>

    </div>

  );

}

export default GoalTracker;