import React, {
  useState,
  useEffect
} from "react";

import axios from "axios";

import {
  toast
} from "react-toastify";

function TransactionForm({

  editData,
  setEditData,
  fetchTransactions,
  fetchDashboard

}) {

  const [merchant, setMerchant] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [type, setType] =
    useState("");

  const [date, setDate] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  // AUTO FILL WHEN EDIT
  useEffect(() => {

    if (editData) {

      console.log(
        "EDIT DATA:",
        editData
      );

      setMerchant(
        editData.merchant || ""
      );

      setAmount(
        editData.amount || ""
      );

      setCategory(
        editData.category || ""
      );

      setType(
        editData.type || ""
      );

      // FIX DATE FORMAT
      setDate(

        editData.date
          ? editData.date.split("T")[0]
          : ""

      );

      setDescription(
        editData.description || ""
      );

    }

  }, [editData]);

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const transactionData = {

        merchant,
        amount,
        category,
        type,
        date,
        description,

      };

      // UPDATE
      if (editData) {

        console.log(
          "UPDATE ID:",
          editData.id
        );

        await axios.patch(

          `https://finance-ai-backend-q477.onrender.com/api/transactions/update/${editData.id}/`,

          transactionData,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Transaction Updated Successfully"
        );

        setEditData(null);

      }

      // ADD
      else {

        await axios.post(

          "https://finance-ai-backend-q477.onrender.com/api/transactions/",

          transactionData,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Transaction Added Successfully"
        );

      }

      // RESET
      setMerchant("");
      setAmount("");
      setCategory("");
      setType("");
      setDate("");
      setDescription("");

      // LIVE REFRESH
      if (fetchTransactions) {

        await fetchTransactions();

      }

      if (fetchDashboard) {

        await fetchDashboard();

      }

    } catch (error) {

      console.log(
        "FULL ERROR:",
        error.response?.data
      );

      console.log(
        "STATUS:",
        error.response?.status
      );

      toast.error(

        error.response?.data?.error ||

        error.response?.data?.detail ||

        "Something went wrong"

      );

    }

  };

  return (

    <div className="bg-white p-8 rounded-3xl shadow-lg">

      <h2 className="text-4xl font-bold text-blue-600 mb-6">

        {
          editData
          ? "Update Transaction"
          : "Add Transaction"
        }

      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* MERCHANT */}
        <input
          type="text"
          placeholder="Merchant"
          value={merchant}
          onChange={(e) =>
            setMerchant(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl bg-white text-black"
          required
        />

        {/* AMOUNT */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl bg-white text-black"
          required
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl bg-white text-black"
          required
        >

          <option value="">
            Select Category
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

        {/* TYPE */}
        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl bg-white text-black"
          required
        >

          <option value="">
            Select Type
          </option>

          <option value="Expense">
            Expense
          </option>

          <option value="Income">
            Income
          </option>

        </select>

        {/* DATE */}
        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl bg-white text-black"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl bg-white text-black"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700"
        >

          {
            editData
            ? "Update Transaction"
            : "Add Transaction"
}

        </button>    

      </form>

    </div>
  );
}

export default TransactionForm;
