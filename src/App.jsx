import Expense from "./Components/Expense";
import Summary from "./Components/Summary";
import "./Styles/App.scss";
function App() {
  return (
    <div className="App">
      <h1> Budget Tracker</h1>
      <Summary />
      <Expense />
    </div>
  );
}

export default App;
