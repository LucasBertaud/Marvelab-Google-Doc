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
      const project = JSON.parse(response.getContentText());
      
      // Récupérer méthodologies et expérimentations en parallèle
      const methodologiesResult = getMethodologiesByProject(projectId);
      const experimentsResult = getExperimentsByProject(projectId);
      
      // Ajouter les données au projet
      project.methodologies = methodologiesResult.success ? methodologiesResult.data : [];
      project.experiments = experimentsResult.success ? experimentsResult.data : [];
      
      return project;
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

/**
 * Récupérer les méthodologies par projet
 */
function getMethodologiesByProject(projectId) {
  try {
    const url = `${API_BASE_URL}/methodologies?projectId=${projectId}`;
    const response = UrlFetchApp.fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      muteHttpExceptions: true
    });

    if (response.getResponseCode() !== 200) {
      throw new Error(`Erreur API: ${response.getResponseCode()}`);
    }

    const data = JSON.parse(response.getContentText());
    return { success: true, data: data };
  } catch (error) {
    console.error('Erreur lors de la récupération des méthodologies:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Récupérer les expérimentations par projet
 */
function getExperimentsByProject(projectId) {
  try {
    const url = `${API_BASE_URL}/experiments?projectId=${projectId}`;
    const response = UrlFetchApp.fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      muteHttpExceptions: true
    });

    if (response.getResponseCode() !== 200) {
      throw new Error(`Erreur API: ${response.getResponseCode()}`);
    }

    const data = JSON.parse(response.getContentText());
    return { success: true, data: data };
  } catch (error) {
    console.error('Erreur lors de la récupération des expérimentations:', error);
    return { success: false, error: error.message };
  }
}
