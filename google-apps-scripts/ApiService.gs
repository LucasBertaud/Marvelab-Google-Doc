/**
 * Récupérer tous les projets
 */
function getProjects() {
  const url = `${API_BASE_URL}/projects`;

  try {
    const response = UrlFetchApp.fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.getResponseCode() === 200) {
      return JSON.parse(response.getContentText());
    } else {
      throw new Error(`API Error: ${response.getResponseCode()}`);
    }
  } catch (error) {
    console.error("Erreur getProjects:", error);
    throw error;
  }
}

/**
 * Récupérer un projet avec ses relations
 */
function getProjectWithRelations(projectId) {
  const url = `${API_BASE_URL}/projects/${projectId}/with-relations`;

  try {
    const response = UrlFetchApp.fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.getResponseCode() === 200) {
      return JSON.parse(response.getContentText());
    } else {
      throw new Error(`API Error: ${response.getResponseCode()}`);
    }
  } catch (error) {
    console.error("Erreur getProjectWithRelations:", error);
    throw error;
  }
}

/**
 * Récupérer toutes les ressources pour debug
 */
function getResources() {
  const url = `${API_BASE_URL}/resources`;

  try {
    const response = UrlFetchApp.fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.getResponseCode() === 200) {
      return JSON.parse(response.getContentText());
    } else {
      throw new Error(`API Error: ${response.getResponseCode()}`);
    }
  } catch (error) {
    console.error("Erreur getResources:", error);
    throw error;
  }
}
