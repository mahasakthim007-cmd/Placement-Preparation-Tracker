import { createContext, useContext, useEffect, useState } from "react";

const TrackerContext = createContext();

export function TrackerProvider({ children }) {
  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [preparations, setPreparations] = useState([]);
  const [interviews, setInterviews] = useState([]);

  // Load Companies
  useEffect(() => {
    fetch("http://localhost:8080/api/companies")
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  // Load Applications
  useEffect(() => {
    fetch("http://localhost:8080/api/applications")
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
      });
  }, []);

  // Load Preparations
  useEffect(() => {
    fetch("http://localhost:8080/api/preparations")
      .then((response) => response.json())
      .then((data) => {
        setPreparations(data);
      })
      .catch((error) => {
        console.error("Error fetching preparations:", error);
      });
  }, []);

  // Load Interviews
  useEffect(() => {
    fetch("http://localhost:8080/api/interviews")
      .then((response) => response.json())
      .then((data) => {
        console.log("Interviews loaded:", data);
        setInterviews(data);
      })
      .catch((error) => {
        console.error("Error fetching interviews:", error);
      });
  }, []);

  return (
    <TrackerContext.Provider
      value={{
        companies,
        setCompanies,

        applications,
        setApplications,

        preparations,
        setPreparations,

        interviews,
        setInterviews
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  return useContext(TrackerContext);
}