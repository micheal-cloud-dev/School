// ─────────────────────────────────────────
//  MY KINGDOM - Shared API Helper (api.js)
//  Include this in every HTML page
// ─────────────────────────────────────────

const API = "https://mykingdom-backend.onrender.com/api";

// Check login on every page
function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return null;
  }
  return token;
}

// Logout function
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// Generic API call with auth token
async function apiCall(endpoint, method = "GET", body = null) {
  const token = checkAuth();
  if (!token) return null;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  if (body) options.body = JSON.stringify(body);

  try {
    const response = await fetch(`${API}${endpoint}`, options);

    // Token expired - redirect to login
    if (response.status === 401) {
      logout();
      return null;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
}

// Get logged in user info
function getCurrentUser() {
  return {
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token")
  };
}
