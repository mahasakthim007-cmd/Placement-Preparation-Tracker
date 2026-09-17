import { useState } from "react";
import { useTracker } from "./TrackerContext";

function Interviews() {
  const { interviews, setInterviews } = useTracker();

  const [showForm, setShowForm] = useState(false);

  const [company, setCompany] = useState("");
  const [roundName, setRoundName] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [result, setResult] = useState("");
  const [feedback, setFeedback] = useState("");

  const [editId, setEditId] = useState(null);

  function clearForm() {
    setCompany("");
    setRoundName("");
    setInterviewDate("");
    setResult("");
    setFeedback("");
    setEditId(null);
  }

  function saveInterview() {
    if (
      company === "" ||
      roundName === "" ||
      interviewDate === "" ||
      result === "" ||
      feedback === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    const interviewData = {
      company,
      roundName,
      interviewDate,
      result,
      feedback
    };

    // UPDATE
    if (editId !== null) {
      fetch(
        `http://localhost:8080/api/interviews/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(interviewData)
        }
      )
        .then((response) => response.json())
        .then((updatedInterview) => {
          setInterviews(
            interviews.map((interview) =>
              interview.id === editId
                ? updatedInterview
                : interview
            )
          );

          clearForm();
          setShowForm(false);
        })
        .catch((error) => {
          console.error(
            "Error updating interview:",
            error
          );
        });

      return;
    }

    // CREATE
    fetch("http://localhost:8080/api/interviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(interviewData)
    })
      .then((response) => response.json())
      .then((newInterview) => {
        setInterviews([
          ...interviews,
          newInterview
        ]);

        clearForm();
        setShowForm(false);
      })
      .catch((error) => {
        console.error(
          "Error adding interview:",
          error
        );
      });
  }

  function editInterview(interview) {
    setCompany(interview.company);
    setRoundName(interview.roundName);
    setInterviewDate(interview.interviewDate);
    setResult(interview.result);
    setFeedback(interview.feedback);

    setEditId(interview.id);
    setShowForm(true);
  }

  function deleteInterview(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmed) {
      return;
    }

    fetch(
      `http://localhost:8080/api/interviews/${id}`,
      {
        method: "DELETE"
      }
    )
      .then(() => {
        setInterviews(
          interviews.filter(
            (interview) =>
              interview.id !== id
          )
        );
      })
      .catch((error) => {
        console.error(
          "Error deleting interview:",
          error
        );
      });
  }

  return (
    <div>
      <h2>Interviews</h2>

      <button
        onClick={() =>
          setShowForm(!showForm)
        }
      >
        {showForm
          ? "Close Form"
          : "Add Interview"}
      </button>

      {showForm && (
        <div className="company-form">

          <h3>
            {editId !== null
              ? "Edit Interview"
              : "Add New Interview"}
          </h3>

          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) =>
              setCompany(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Round Name"
            value={roundName}
            onChange={(e) =>
              setRoundName(e.target.value)
            }
          />

          <input
            type="date"
            value={interviewDate}
            onChange={(e) =>
              setInterviewDate(e.target.value)
            }
          />

          <select
            value={result}
            onChange={(e) =>
              setResult(e.target.value)
            }
          >
            <option value="">
              Select Result
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Passed">
              Passed
            </option>

            <option value="Failed">
              Failed
            </option>
          </select>

          <textarea
            placeholder="Feedback"
            value={feedback}
            onChange={(e) =>
              setFeedback(e.target.value)
            }
          />

          <button onClick={saveInterview}>
            {editId !== null
              ? "Update Interview"
              : "Add Interview"}
          </button>

        </div>
      )}

      <div>
        <h3>Interview List</h3>

        {interviews.length === 0 ? (
          <p>
            No interview records added yet.
          </p>
        ) : (
          interviews.map((interview) => (
            <div
              key={interview.id}
              className="card"
            >
              <h3>
                {interview.company}
              </h3>

              <p>
                Round:{" "}
                {interview.roundName}
              </p>

              <p>
                Date:{" "}
                {interview.interviewDate}
              </p>

              <p>
                Result:{" "}
                {interview.result}
              </p>

              <p>
                Feedback:{" "}
                {interview.feedback}
              </p>

              <button
                onClick={() =>
                  editInterview(interview)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteInterview(
                    interview.id
                  )
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Interviews;