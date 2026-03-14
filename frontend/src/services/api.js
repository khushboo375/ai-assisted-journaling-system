import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const createJournal = (data) => API.post("/journal", data);

export const getJournals = (userId) =>
  API.get(`/journal/${userId}`);

export const getInsights = (userId) =>
  API.get(`/journal/insights/${userId}`);