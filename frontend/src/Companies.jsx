import { useState } from "react";
import { useTracker } from "./TrackerContext";

function Companies() {
  const { companies, setCompanies } = useTracker();

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");

  const [editId, setEditId] = useState(null);

  function clearForm() {
    setCompanyName("");
    setIndustry("");
    setLocation("");
    setWebsite("");
    setEditId(null);
  }

  function saveCompany() {
    if (
      companyName === "" ||
      industry === "" ||
      location === "" ||
      website === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    const companyData = {
      companyName,
      industry,
      location,
      website
    };

    // UPDATE
    if (editId !== null) {
      fetch(`http://localhost:8080/api/companies/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(companyData)
      })
        .then((response) => response.json())
        .then((updatedCompany) => {
          setCompanies(
            companies.map((company) =>
              company.id === editId
                ? updatedCompany
                : company
            )
          );

          clearForm();
          setShowForm(false);
        })
        .catch((error) => {
          console.error("Error updating company:", error);
        });

      return;
    }

    // CREATE
    fetch("http://localhost:8080/api/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(companyData)
    })
      .then((response) => response.json())
      .then((newCompany) => {
        setCompanies([...companies, newCompany]);

        clearForm();
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error adding company:", error);
      });
  }

  function editCompany(company) {
    setCompanyName(company.companyName);
    setIndustry(company.industry);
    setLocation(company.location);
    setWebsite(company.website);

    setEditId(company.id);
    setShowForm(true);
  }

  function deleteCompany(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmed) {
      return;
    }

    fetch(`http://localhost:8080/api/companies/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setCompanies(
          companies.filter(
            (company) => company.id !== id
          )
        );
      })
      .catch((error) => {
        console.error("Error deleting company:", error);
      });
  }

  const filteredCompanies = companies.filter(
    (company) =>
      company.companyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      company.industry
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      company.location
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Companies</h2>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add Company"}
      </button>

      {showForm && (
        <div className="company-form">
          <h3>
            {editId !== null
              ? "Edit Company"
              : "Add New Company"}
          </h3>

          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) =>
              setCompanyName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Industry"
            value={industry}
            onChange={(e) =>
              setIndustry(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Website"
            value={website}
            onChange={(e) =>
              setWebsite(e.target.value)
            }
          />

          <button onClick={saveCompany}>
            {editId !== null
              ? "Update Company"
              : "Add Company"}
          </button>
        </div>
      )}

      <input
        type="text"
        placeholder="🔍 Search companies..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />

      <div>
        <h3>Company List</h3>

        {filteredCompanies.length === 0 ? (
          <p>No companies found.</p>
        ) : (
          filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="card"
            >
              <h3>{company.companyName}</h3>

              <p>
                Industry: {company.industry}
              </p>

              <p>
                Location: {company.location}
              </p>

              <p>
                Website: {company.website}
              </p>

              <button
                onClick={() =>
                  editCompany(company)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteCompany(company.id)
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

export default Companies;