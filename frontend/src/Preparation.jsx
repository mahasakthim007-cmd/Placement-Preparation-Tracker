import { useState } from "react";
import { useTracker } from "./TrackerContext";

function Preparation() {
  const { preparations, setPreparations } = useTracker();

  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [progress, setProgress] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  const [editId, setEditId] = useState(null);

  function clearForm() {
    setTopic("");
    setCategory("");
    setProgress("");
    setStatus("");
    setNotes("");
    setEditId(null);
  }

  function savePreparation() {
    if (
      topic === "" ||
      category === "" ||
      progress === "" ||
      status === "" ||
      notes === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (progress < 0 || progress > 100) {
      alert("Progress must be between 0 and 100.");
      return;
    }

    const preparationData = {
      topic,
      category,
      progress,
      status,
      notes
    };

    // UPDATE
    if (editId !== null) {
      fetch(
        `http://localhost:8080/api/preparations/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(preparationData)
        }
      )
        .then((response) => response.json())
        .then((updatedPreparation) => {
          setPreparations(
            preparations.map((preparation) =>
              preparation.id === editId
                ? updatedPreparation
                : preparation
            )
          );

          clearForm();
          setShowForm(false);
        })
        .catch((error) => {
          console.error(
            "Error updating preparation:",
            error
          );
        });

      return;
    }

    // CREATE
    fetch("http://localhost:8080/api/preparations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(preparationData)
    })
      .then((response) => response.json())
      .then((newPreparation) => {
        setPreparations([
          ...preparations,
          newPreparation
        ]);

        clearForm();
        setShowForm(false);
      })
      .catch((error) => {
        console.error(
          "Error adding preparation:",
          error
        );
      });
  }

  function editPreparation(preparation) {
    setTopic(preparation.topic);
    setCategory(preparation.category);
    setProgress(preparation.progress);
    setStatus(preparation.status);
    setNotes(preparation.notes);

    setEditId(preparation.id);
    setShowForm(true);
  }

  function deletePreparation(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this preparation?"
    );

    if (!confirmed) {
      return;
    }

    fetch(
      `http://localhost:8080/api/preparations/${id}`,
      {
        method: "DELETE"
      }
    )
      .then(() => {
        setPreparations(
          preparations.filter(
            (preparation) =>
              preparation.id !== id
          )
        );
      })
      .catch((error) => {
        console.error(
          "Error deleting preparation:",
          error
        );
      });
  }

  const categories = [
    ...new Set(
      preparations.map(
        (preparation) => preparation.category
      )
    )
  ];

  const filteredPreparations = preparations.filter(
    (preparation) => {
      const matchesSearch =
        preparation.topic
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        preparation.notes
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        preparation.category === categoryFilter;

      return matchesSearch && matchesCategory;
    }
  );

  return (
    <div>
      <h2>Preparation</h2>

      <button
        onClick={() =>
          setShowForm(!showForm)
        }
      >
        {showForm
          ? "Close Form"
          : "Add Preparation"}
      </button>

      {showForm && (
        <div className="company-form">
          <h3>
            {editId !== null
              ? "Edit Preparation"
              : "Add New Preparation"}
          </h3>

          <input
            type="text"
            placeholder="Topic"
            value={topic}
            onChange={(e) =>
              setTopic(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Progress (%)"
            value={progress}
            onChange={(e) =>
              setProgress(e.target.value)
            }
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="">
              Select Status
            </option>

            <option value="Not Started">
              Not Started
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>
          </select>

          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
          />

          <button onClick={savePreparation}>
            {editId !== null
              ? "Update Preparation"
              : "Add Preparation"}
          </button>
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="🔍 Search topics..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
        >
          <option value="All">
            All Categories
          </option>

          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Preparation List</h3>

        {filteredPreparations.length === 0 ? (
          <p>No preparation records found.</p>
        ) : (
          filteredPreparations.map(
            (preparation) => (
              <div
                key={preparation.id}
                className="card"
              >
                <h3>
                  {preparation.topic}
                </h3>

                <p>
                  Category:{" "}
                  {preparation.category}
                </p>

                <p>
                  Progress:{" "}
                  {preparation.progress}%
                </p>

                <p>
                  Status:{" "}
                  {preparation.status}
                </p>

                <p>
                  Notes:{" "}
                  {preparation.notes}
                </p>

                <button
                  onClick={() =>
                    editPreparation(
                      preparation
                    )
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deletePreparation(
                      preparation.id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default Preparation;