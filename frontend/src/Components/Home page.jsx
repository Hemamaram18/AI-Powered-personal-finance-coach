import TransactionList from "../TransactionList";

function Home() {
  return (
    <div className="container mt-5">

      <h1 className="text-center mb-4">
        AI Personal Finance Coach
      </h1>

      <div className="card p-4 mb-4">

        <h3>Welcome 👋</h3>

        <p>
          Manage your transactions,
          goals, and budgets.
        </p>

      </div>

      <TransactionList />

    </div>
  );
}

export default Home;
