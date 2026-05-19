import React, {
  useState,
  useEffect
} from "react";

import {
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login";

import Dashboard from "./components/Dashboard";

import TransactionForm from "./components/TransactionForm";

import TransactionList from "./components/TransactionList";

import SpendingChart from "./components/SpendingChart";

import AIRecommendation from "./components/AIRecommendation";

import GoalTracker from "./components/GoalTracker";

import BudgetTracker from "./components/BudgetTracker";

import NotificationPanel from "./components/NotificationPanel";

import SpendingPrediction from "./components/SpendingPrediction";

import CategoryAnalytics from "./components/CategoryAnalytics";

import RecentActivity from "./components/RecentActivity";

import MonthlyTrends from "./components/MonthlyTrends";

function App() {

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      !!localStorage.getItem("token")
    );

  const [refresh, setRefresh] =
    useState(false);

  // THEME STATE
  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem("theme") !== "light"
    );

  // SAVE THEME
  useEffect(() => {

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );

  }, [darkMode]);

  // GLOBAL REFRESH
  const refreshData = () => {

    setRefresh((prev) => !prev);

  };

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    setIsLoggedIn(false);

  };

  // LOGIN CHECK
  if (!isLoggedIn) {

    return (

      <Login
        setIsLoggedIn={setIsLoggedIn}
      />

    );

  }

  return (

    <div
      className={

        darkMode

          ? "min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-x-hidden"

          : "min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 text-black overflow-x-hidden"

      }
    >

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">

          <div>

            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">

              AI Personal Finance Coach

            </h1>

            <p
              className={
                darkMode
                  ? "text-gray-400 mt-2 text-lg"
                  : "text-gray-700 mt-2 text-lg"
              }
            >

              Smart Expense Tracking & Financial Insights

            </p>

          </div>

          <div className="flex gap-4">

            {/* THEME BUTTON */}
            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
            >

              {
                darkMode
                  ? "☀️ Light"
                  : "🌙 Dark"
              }

            </button>

            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
            >

              Logout

            </button>

          </div>

        </div>

        {/* DASHBOARD */}
        <div
          className={
            darkMode
              ? "bg-gray-900/60 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-gray-800"
              : "bg-white rounded-3xl p-6 shadow-2xl border border-gray-300"
          }
        >

          <Dashboard refresh={refresh} />

        </div>

        {/* FORM + GOALS + BUDGET */}
        <div className="grid md:grid-cols-3 gap-8 mt-8 items-start">

          {/* TRANSACTION FORM */}
          <div
            className={
              darkMode
                ? "bg-gray-900/60 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-gray-800"
                : "bg-white rounded-3xl p-6 shadow-xl border border-gray-300"
            }
          >

            <TransactionForm
              fetchTransactions={refreshData}
              fetchDashboard={refreshData}
            />

          </div>

          {/* GOAL TRACKER */}
          <div
            className={
              darkMode
                ? "bg-gray-900/60 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-gray-800"
                : "bg-white rounded-3xl p-6 shadow-xl border border-gray-300"
            }
          >

            <GoalTracker
              refresh={refresh}
              refreshData={refreshData}
            />

          </div>

          {/* BUDGET TRACKER */}
          <div
            className={
              darkMode
                ? "bg-gray-900/60 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-gray-800"
                : "bg-white rounded-3xl p-6 shadow-xl border border-gray-300"
            }
          >

            <BudgetTracker
              refresh={refresh}
              refreshData={refreshData}
            />

          </div>

        </div>

        {/* TRANSACTION LIST */}
        <div
          className={
            darkMode
              ? "mt-8 bg-gray-900/60 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-gray-800"
              : "mt-8 bg-white rounded-3xl p-6 shadow-xl border border-gray-300"
          }
        >

          <TransactionList
            refresh={refresh}
            refreshData={refreshData}
          />

        </div>

        {/* CHART + AI */}
        <div className="grid md:grid-cols-2 gap-8 mt-8 items-start">

          {/* SPENDING CHART */}
          <div
            className={
              darkMode
                ? "bg-gray-900/60 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-gray-800"
                : "bg-white rounded-3xl p-6 shadow-xl border border-gray-300"
            }
          >

            <SpendingChart
              refresh={refresh}
            />

          </div>

          {/* AI RECOMMENDATION */}
          <div
            className={
              darkMode
                ? "bg-gray-900/60 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-gray-800"
                : "bg-white rounded-3xl p-6 shadow-xl border border-gray-300"
            }
          >

            <AIRecommendation
              refresh={refresh}
            />

          </div>

        </div>

        {/* ANALYTICS + PREDICTION */}
        <div className="grid md:grid-cols-2 gap-8 mt-8 items-start">

          {/* CATEGORY ANALYTICS */}
          <div
            className={
              darkMode
                ? "bg-gray-900/60 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-gray-800"
                : "bg-white rounded-3xl p-6 shadow-xl border border-gray-300"
            }
          >

            <CategoryAnalytics
              refresh={refresh}
            />

          </div>

          {/* SPENDING PREDICTION */}
          <div
            className={
              darkMode
                ? "bg-gray-900/60 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-gray-800"
                : "bg-white rounded-3xl p-6 shadow-xl border border-gray-300"
            }
          >

            <SpendingPrediction
              refresh={refresh}
            />

          </div>

        </div>

        {/* MONTHLY TRENDS */}
        <div
          className={
            darkMode
              ? "mt-8 bg-gray-900/60 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-gray-800"
              : "mt-8 bg-white rounded-3xl p-6 shadow-xl border border-gray-300"
          }
        >

          <MonthlyTrends
            refresh={refresh}
          />

        </div>

        {/* NOTIFICATIONS + RECENT */}
        <div className="grid md:grid-cols-2 gap-8 mt-8 mb-10 items-start">

          {/* NOTIFICATIONS */}
          <div
            className={
              darkMode
                ? "bg-gray-900/60 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-gray-800"
                : "bg-white rounded-3xl p-6 shadow-xl border border-gray-300"
            }
          >

            <NotificationPanel
              refresh={refresh}
            />

          </div>

          {/* RECENT ACTIVITY */}
          <div
            className={
              darkMode
                ? "bg-gray-900/60 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-gray-800"
                : "bg-white rounded-3xl p-6 shadow-xl border border-gray-300"
            }
          >

            <RecentActivity
              refresh={refresh}
            />

          </div>

        </div>

      </div>

      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

    </div>

  );

}

export default App;