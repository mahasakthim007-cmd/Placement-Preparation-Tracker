import "./App.css";
import Companies from "./Companies";
import Applications from "./Applications";
import Preparation from "./Preparation";
import Interviews from "./Interviews";
import { TrackerProvider, useTracker } from "./TrackerContext";

function Dashboard() {
  const {
    companies,
    applications,
    interviews,
    preparations
  } = useTracker();

  const selectedApplications =
    applications.filter(
      (application) =>
        application.status === "Selected"
    ).length;

  const preparationProgress =
    preparations.length === 0
      ? 0
      : Math.round(
          preparations.reduce(
            (total, preparation) =>
              total +
              Number(preparation.progress),
            0
          ) / preparations.length
        );

  return (
    <section
      id="dashboard"
      className="dashboard"
    >
      <h2>Dashboard</h2>

      <div className="cards">

        <div className="card">
          <h3>🏢 Companies</h3>
          <p>{companies.length}</p>
        </div>

        <div className="card">
          <h3>📝 Applications</h3>
          <p>{applications.length}</p>
        </div>

        <div className="card">
          <h3>🎤 Interviews</h3>
          <p>{interviews.length}</p>
        </div>

        <div className="card">
          <h3>✅ Selected</h3>
          <p>{selectedApplications}</p>
        </div>

      </div>

      <div className="card progress-card">

        <h3>
          📚 Overall Preparation Progress
        </h3>

        <div className="progress-container">

          <div
            className="progress-bar"
            style={{
              width: `${preparationProgress}%`
            }}
          >
            {preparationProgress}%
          </div>

        </div>

        <p>
          You have completed{" "}
          <strong>
            {preparationProgress}%
          </strong>{" "}
          of your preparation.
        </p>

      </div>

    </section>
  );
}

function App() {
  return (
    <TrackerProvider>

      <div className="app">

        <aside className="sidebar">

          <h2>
            Placement
            <br />
            Tracker
          </h2>

          <nav>

            <a href="#dashboard">
              🏠 Dashboard
            </a>

            <a href="#companies">
              🏢 Companies
            </a>

            <a href="#applications">
              📝 Applications
            </a>

            <a href="#preparation">
              📚 Preparation
            </a>

            <a href="#interviews">
              🎤 Interviews
            </a>

          </nav>

        </aside>

        <main className="main-content">

          <header className="header">

            <h1>
              Placement Preparation Tracker
            </h1>

            <p>
              Track your placement journey
              in one place.
            </p>

          </header>

          <Dashboard />

          <section
            id="companies"
            className="dashboard"
          >
            <Companies />
          </section>

          <section
            id="applications"
            className="dashboard"
          >
            <Applications />
          </section>

          <section
            id="preparation"
            className="dashboard"
          >
            <Preparation />
          </section>

          <section
            id="interviews"
            className="dashboard"
          >
            <Interviews />
          </section>

        </main>

      </div>

    </TrackerProvider>
  );
}

export default App;