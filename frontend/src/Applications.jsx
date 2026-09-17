import { useState } from "react";
import { useTracker } from "./TrackerContext";

function Applications() {
  const { applications, setApplications } = useTracker();

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [company, setCompany] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const [editId, setEditId] = useState(null);

  function clearForm() {
    setCompany("");
    setJobRole("");
    setApplicationDate("");
    setStatus("");
    setLocation("");
    setNotes("");
    setEditId(null);
  }

  function saveApplication() {
    if (
      company === "" ||
      jobRole === "" ||
      applicationDate === "" ||
      status === "" ||
      location === "" ||
      notes === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    const applicationData = {
      company,
      jobRole,
      applicationDate,
      status,
      location,
      notes
    };

    // UPDATE
    if (editId !== null) {
      fetch(`http://localhost:8080/api/applications/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(applicationData)
      })
        .then((response) => response.json())
        .then((updatedApplication) => {
          setApplications(
            applications.map((application) =>
              application.id === editId
                ? updatedApplication
                : application
            )
          );

          clearForm();
          setShowForm(false);
        })
        .catch((error) => {
          console.error(
            "Error updating application:",
            error
          );
        });

      return;
    }

    // CREATE
    fetch("http://localhost:8080/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(applicationData)
    })
      .then((response) => response.json())
      .then((newApplication) => {
        setApplications([
          ...applications,
          newApplication
        ]);

        clearForm();
        setShowForm(false);
      })
      .catch((error) => {
        console.error(
          "Error adding application:",
          error
        );
      });
  }

  function editApplication(application) {
    setCompany(application.company);
    setJobRole(application.jobRole);
    setApplicationDate(application.applicationDate);
    setStatus(application.status);
    setLocation(application.location);
    setNotes(application.notes);

    setEditId(application.id);
    setShowForm(true);
  }

  function deleteApplication(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) {
      return;
    }

    fetch(`http://localhost:8080/api/applications/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setApplications(
          applications.filter(
            (application) =>
              application.id !== id
          )
        );
      })
      .catch((error) => {
        console.error(
          "Error deleting application:",
          error
        );
      });
  }

  const filteredApplications = applications.filter(
    (application) => {
      const matchesSearch =
        application.company
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        application.jobRole
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        application.location
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  return (
    <div>
      <h2>Applications</h2>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm
          ? "Close Form"
          : "Add Application"}
      </button>

      {showForm && (
        <div className="company-form">

          <h3>
            {editId !== null
              ? "Edit Application"
              : "Add New Application"}
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
            placeholder="Job Role"
            value={jobRole}
            onChange={(e) =>
              setJobRole(e.target.value)
            }
          />

          <input
            type="date"
            value={applicationDate}
            onChange={(e) =>
              setApplicationDate(e.target.value)
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

            <option value="Applied">
              Applied
            </option>

            <option value="Shortlisted">
              Shortlisted
            </option>

            <option value="Interview">
              Interview
            </option>

            <option value="Selected">
              Selected
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />

          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
          />

          <button onClick={saveApplication}>
            {editId !== null
              ? "Update Application"
              : "Add Application"}
          </button>

        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="🔍 Search applications..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">
            All Status
          </option>

          <option value="Applied">
            Applied
          </option>

          <option value="Shortlisted">
            Shortlisted
          </option>

          <option value="Interview">
            Interview
          </option>

          <option value="Selected">
            Selected
          </option>

          <option value="Rejected">
            Rejected
          </option>
        </select>
      </div>

      <div>
        <h3>Application List</h3>

        {filteredApplications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          filteredApplications.map(
            (application) => (
              <div
                key={application.id}
                className="card"
              >
                <h3>
                  {application.company}
                </h3>

                <p>
                  Job Role:{" "}
                  {application.jobRole}
                </p>

                <p>
                  Application Date:{" "}
                  {application.applicationDate}
                </p>

                <p>
                  Status:{" "}
                  {application.status}
                </p>

                <p>
                  Location:{" "}
                  {application.location}
                </p>

                <p>
                  Notes: {application.notes}
                </p>

                <button
                  onClick={() =>
                    editApplication(application)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteApplication(
                      application.id
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

export default Applications;