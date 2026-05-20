import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import ExportReport from "./ExportReport";

function TransactionList({

  refresh,
  refreshData

}) {

  const [transactions, setTransactions] =
    useState([]);

  const [filteredTransactions,
    setFilteredTransactions] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // FILTER STATES
  const [typeFilter, setTypeFilter] =
    useState("");

  const [categoryFilter,
    setCategoryFilter] =
    useState("");

  // EDIT STATES
  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({
      amount: "",
      category: "",
      merchant: "",
    });

  // AUTO REFRESH WHEN DATA CHANGES
  useEffect(() => {

    fetchTransactions();

  }, [refresh]);

  // FETCH TRANSACTIONS
  const fetchTransactions = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          "https://finance-ai-backend-q477.onrender.com/api/transactions/",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setTransactions(response.data);

      setFilteredTransactions(
        response.data
      );

    } catch (error) {

      console.log(
        "FETCH ERROR:",
        error.response
      );

    }

  };

  // SEARCH + FILTER
  const handleSearch = () => {

    const filtered =
      transactions.filter((item) => {

        const matchesSearch =

          item.category
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          item.merchant
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesType =

          typeFilter === "" ||
          item.type === typeFilter;

        const matchesCategory =

          categoryFilter === "" ||
          item.category === categoryFilter;

        return (
          matchesSearch &&
          matchesType &&
          matchesCategory
        );

      });

    setFilteredTransactions(
      filtered
    );

  };

  // RESET
  const handleReset = () => {

    setSearch("");

    setTypeFilter("");

    setCategoryFilter("");

    setFilteredTransactions(
      transactions
    );

  };

  // DELETE
  const deleteTransaction =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(
          `https://finance-ai-backend-q477.onrender.com/api/transactions/delete/${id}/`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Transaction Deleted"
        );

        // REFRESH ALL COMPONENTS
        if (refreshData) {

          refreshData();

        }

      } catch (error) {

        console.log(
          error.response
        );

        alert(
          "Delete Failed"
        );

      }

    };

  // UPDATE
  const updateTransaction =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.patch(
          `https://finance-ai-backend-q477.onrender.com/api/transactions/update/${id}/`,
          {
            merchant:
              editData.merchant,

            amount:
              editData.amount,

            category:
              editData.category,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Transaction Updated"
        );

        setEditingId(null);

        // REFRESH ALL COMPONENTS
        if (refreshData) {

          refreshData();

        }

      } catch (error) {

        console.log(
          error.response
        );

        alert(
          "Update Failed"
        );

      }

    };

  return (

    <div>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

        <h2 className="text-5xl font-bold text-blue-600">

          Transactions

        </h2>

        <ExportReport
          transactions={transactions}
        />

      </div>

      {/* SEARCH + FILTERS */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="p-4 rounded-2xl border-2 border-gray-700 bg-white text-black"
        />

        {/* TYPE FILTER */}
        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(
              e.target.value
            )
          }
          className="p-4 rounded-2xl border-2 border-gray-700 bg-white text-black"
        >

          <option value="">
            All Types
          </option>

          <option value="Income">
            Income
          </option>

          <option value="Expense">
            Expense
          </option>

        </select>

        {/* CATEGORY FILTER */}
        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(
              e.target.value
            )
          }
          className="p-4 rounded-2xl border-2 border-gray-700 bg-white text-black"
        >

          <option value="">
            All Categories
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Travel">
            Travel
          </option>

          <option value="Shopping">
            Shopping
          </option>

          <option value="Bills">
            Bills
          </option>

          <option value="Entertainment">
            Entertainment
          </option>

          <option value="Health">
            Health
          </option>

          <option value="Education">
            Education
          </option>

          <option value="Other">
            Other
          </option>

        </select>

        <div className="flex gap-2">

          <button
            onClick={handleSearch}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-bold"
          >
            Search
          </button>

          <button
            onClick={handleReset}
            className="flex-1 bg-gray-700 hover:bg-gray-800 text-white px-6 py-4 rounded-2xl font-bold"
          >
            Reset
          </button>

        </div>

      </div>

      {/* LIST */}
      <div className="space-y-6">

        {

          filteredTransactions.length > 0 ? (

            filteredTransactions.map(
              (transaction) => (

                <div
                  key={transaction.id}
                  className="bg-gray-100 p-6 rounded-3xl shadow-lg"
                >

                  {

                    editingId ===
                    transaction.id ? (

                      <div className="space-y-4">

                        <input
                          type="text"
                          value={
                            editData.amount
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              amount:
                                e.target
                                  .value,
                            })
                          }
                          className="w-full p-4 rounded-2xl border border-gray-400 bg-white text-black"
                        />

                        <input
                          type="text"
                          value={
                            editData.category
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              category:
                                e.target
                                  .value,
                            })
                          }
                          className="w-full p-4 rounded-2xl border border-gray-400 bg-white text-black"
                        />

                        <input
                          type="text"
                          value={
                            editData.merchant
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              merchant:
                                e.target
                                  .value,
                            })
                          }
                          className="w-full p-4 rounded-2xl border border-gray-400 bg-white text-black"
                        />

                        <div className="flex gap-3 mt-4">

                          <button
                            onClick={() =>
                              updateTransaction(
                                transaction.id
                              )
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-bold"
                          >
                            Save
                          </button>

                          <button
                            onClick={() =>
                              deleteTransaction(
                                transaction.id
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-bold"
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    ) : (

                      <div>

                        <h3 className="text-4xl font-bold text-gray-800 mb-4">

                          {
                            transaction.category
                          }

                        </h3>

                        <p className="text-xl text-purple-600 font-bold mb-2">

                          Type:
                          {" "}
                          {transaction.type}

                        </p>

                        <p className="text-2xl text-gray-600 mb-2">

                          Merchant:

                          <span className="font-bold ml-2">

                            {
                              transaction.merchant
                            }

                          </span>

                        </p>

                        <p className="text-2xl text-green-600 font-bold mb-2">

                          Amount:
                          ₹{
                            transaction.amount
                          }

                        </p>

                        <p className="text-lg text-gray-500">

                          Date:
                          {
                            transaction.date
                          }

                        </p>

                        <div className="flex gap-3 mt-4">

                          <button
                            onClick={() => {

                              setEditingId(
                                transaction.id
                              );

                              setEditData({
                                amount:
                                  transaction.amount || "",

                                category:
                                  transaction.category || "",

                                merchant:
                                  transaction.merchant || "",
                              });

                            }}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-2xl font-bold"
                          >

                            Edit

                          </button>

                          <button
                            onClick={() =>
                              deleteTransaction(
                                transaction.id
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-bold"
                          >

                            Delete

                          </button>

                        </div>

                      </div>

                    )

                  }

                </div>

              )
            )

          ) : (

            <div className="text-center text-2xl text-gray-400 py-10">

              No Transactions Found

            </div>

          )

        }

      </div>

    </div>

  );

}

export default TransactionList;