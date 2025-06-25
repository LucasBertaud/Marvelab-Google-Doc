/**
 * Configuration de l'API Marvelab
 */
const API_BASE_URL = "https://marvelab-api.loca.lt";

/**
 * Configuration du thème visuel
 */
const THEME = {
  primary: "#2E3440",
  secondary: "#5E81AC",
  accent: "#88C0D0",
  text: "#2E3440",
  muted: "#4C566A",
  background: "#ECEFF4",
  border: "#D8DEE9",
  success: "#A3BE8C",
  warning: "#EBCB8B",
};

/**
 * Fonction qui s'exécute à l'ouverture du document
 */
function onOpen() {
  const ui = DocumentApp.getUi();
  ui.createMenu("🔬 Marvelab Assistant")
    .addItem("📋 Ouvrir l'assistant", "showSidebar")
    .addItem("🔧 Test de connexion", "testConnection")
    .addItem("ℹ️ À propos", "showAbout")
    .addToUi();
}

/**
 * Afficher la sidebar
 */
function showSidebar() {
  try {
    const htmlOutput = HtmlService.createTemplateFromFile("sidebar")
      .evaluate()
      .setWidth(350)
      .setTitle("🔬 Marvelab Assistant");

    DocumentApp.getUi().showSidebar(htmlOutput);
  } catch (error) {
    DocumentApp.getUi().alert(
      "❌ Erreur",
      `Impossible d'ouvrir l'assistant: ${error.message}`,
      DocumentApp.getUi().ButtonSet.OK
    );
  }
}

/**
 * Inclure des fichiers CSS/JS dans le HTML
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Récupérer tous les projets pour la sidebar
 */
function getProjectsForSidebar() {
  try {
    const projects = getProjects();
    return {
      success: true,
      data: projects,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Récupérer un projet avec ses relations pour la sidebar
 */
function getProjectDetailsForSidebar(projectId) {
  try {
    const project = getProjectWithRelations(projectId);
    return {
      success: true,
      data: project,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Insérer un projet avec style simple
 */
function insertProject(projectData) {
  try {
    const doc = DocumentApp.getActiveDocument();
    const body = doc.getBody();
    const cursor = doc.getCursor();

    if (cursor) {
      const projectText = `\n🚀 PROJET: ${projectData.title}\n📄 ${projectData.description}\n\n`;
      cursor.insertText(projectText);
    } else {
      // Titre du projet
      const title = body.appendParagraph(`🚀 PROJET: ${projectData.title}`);
      title.setHeading(DocumentApp.ParagraphHeading.HEADING1);
      title
        .getChild(0)
        .asText()
        .setForegroundColor(THEME.primary)
        .setBold(true)
        .setFontSize(16);

      // Description
      const desc = body.appendParagraph(`📄 ${projectData.description}`);
      desc
        .getChild(0)
        .asText()
        .setForegroundColor(THEME.secondary)
        .setItalic(true)
        .setFontSize(12);

      body.appendParagraph("");
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Insérer une note avec style amélioré
 */
function insertNote(noteData, projectTitle) {
  try {
    const doc = DocumentApp.getActiveDocument();
    const body = doc.getBody();
    const cursor = doc.getCursor();

    if (cursor) {
      const noteText = `\n📝 NOTE [${projectTitle}]\n${
        noteData.content
      }\n📅 ${new Date(noteData.created_at).toLocaleString("fr-FR")}\n\n`;
      cursor.insertText(noteText);
    } else {
      // Encadré titre pour la note
      const titleTable = body.appendTable([
        [`📝 NOTE DE RECHERCHE - ${projectTitle}`],
      ]);

      // Style du titre
      const titleCell = titleTable.getRow(0).getCell(0);
      titleCell.setBackgroundColor("#1976D2");
      titleCell
        .getChild(0)
        .asText()
        .setForegroundColor("#FFFFFF")
        .setBold(true)
        .setFontSize(14);
      titleCell.setPaddingTop(12);
      titleCell.setPaddingBottom(12);
      titleCell.setPaddingLeft(16);
      titleCell.setPaddingRight(16);
      titleTable.setBorderWidth(0);

      // Contenu de la note dans un encadré stylé
      const contentTable = body.appendTable([[noteData.content]]);
      const contentCell = contentTable.getRow(0).getCell(0);

      contentCell.setBackgroundColor("#E3F2FD");
      contentCell
        .getChild(0)
        .asText()
        .setForegroundColor("#0D47A1")
        .setFontSize(12)
        .setLineSpacing(1.4);

      // Padding généreux pour le contenu
      contentCell.setPaddingTop(20);
      contentCell.setPaddingBottom(20);
      contentCell.setPaddingLeft(20);
      contentCell.setPaddingRight(20);

      // Bordure colorée
      contentTable.setBorderColor("#2196F3");
      contentTable.setBorderWidth(3);

      // Date stylée
      const dateTable = body.appendTable([
        [
          `📅 Créé le ${new Date(noteData.created_at).toLocaleDateString(
            "fr-FR"
          )} à ${new Date(noteData.created_at).toLocaleTimeString("fr-FR")}`,
        ],
      ]);

      const dateCell = dateTable.getRow(0).getCell(0);
      dateCell.setBackgroundColor("#BBDEFB");
      dateCell
        .getChild(0)
        .asText()
        .setForegroundColor("#1565C0")
        .setItalic(true)
        .setFontSize(10);
      dateCell.setPaddingTop(8);
      dateCell.setPaddingBottom(8);
      dateCell.setPaddingLeft(16);
      dateCell.setPaddingRight(16);
      dateTable.setBorderWidth(0);

      body.appendParagraph("");
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Insérer une interprétation avec style amélioré
 */
function insertInterpretation(interpData, projectTitle) {
  try {
    const doc = DocumentApp.getActiveDocument();
    const body = doc.getBody();
    const cursor = doc.getCursor();

    if (cursor) {
      const interpText = `\n🧠 INTERPRÉTATION [${projectTitle}]\n${
        interpData.content
      }\n📅 ${new Date(interpData.created_at).toLocaleString("fr-FR")}\n\n`;
      cursor.insertText(interpText);
    } else {
      // Encadré titre pour l'interprétation
      const titleTable = body.appendTable([
        [`🧠 INTERPRÉTATION SCIENTIFIQUE - ${projectTitle}`],
      ]);

      // Style du titre
      const titleCell = titleTable.getRow(0).getCell(0);
      titleCell.setBackgroundColor("#388E3C");
      titleCell
        .getChild(0)
        .asText()
        .setForegroundColor("#FFFFFF")
        .setBold(true)
        .setFontSize(14);
      titleCell.setPaddingTop(12);
      titleCell.setPaddingBottom(12);
      titleCell.setPaddingLeft(16);
      titleCell.setPaddingRight(16);
      titleTable.setBorderWidth(0);

      // Contenu de l'interprétation dans un encadré stylé
      const contentTable = body.appendTable([[interpData.content]]);
      const contentCell = contentTable.getRow(0).getCell(0);

      contentCell.setBackgroundColor("#E8F5E8");
      contentCell
        .getChild(0)
        .asText()
        .setForegroundColor("#1B5E20")
        .setFontSize(12)
        .setLineSpacing(1.4);

      // Padding généreux pour le contenu
      contentCell.setPaddingTop(20);
      contentCell.setPaddingBottom(20);
      contentCell.setPaddingLeft(20);
      contentCell.setPaddingRight(20);

      // Bordure colorée
      contentTable.setBorderColor("#4CAF50");
      contentTable.setBorderWidth(3);

      // Date stylée
      const dateTable = body.appendTable([
        [
          `📅 Créé le ${new Date(interpData.created_at).toLocaleDateString(
            "fr-FR"
          )} à ${new Date(interpData.created_at).toLocaleTimeString("fr-FR")}`,
        ],
      ]);

      const dateCell = dateTable.getRow(0).getCell(0);
      dateCell.setBackgroundColor("#C8E6C9");
      dateCell
        .getChild(0)
        .asText()
        .setForegroundColor("#2E7D32")
        .setItalic(true)
        .setFontSize(10);
      dateCell.setPaddingTop(8);
      dateCell.setPaddingBottom(8);
      dateCell.setPaddingLeft(16);
      dateCell.setPaddingRight(16);
      dateTable.setBorderWidth(0);

      body.appendParagraph("");
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Insérer une ressource avec image directe depuis l'API
 */
function insertResource(resourceData, projectTitle) {
  try {
    const doc = DocumentApp.getActiveDocument();
    const body = doc.getBody();
    const cursor = doc.getCursor();

    const typeIcon =
      resourceData.type === "image"
        ? "🖼️"
        : resourceData.type === "graph"
        ? "📊"
        : "📎";

    if (cursor) {
      // Mode curseur - insérer du texte simple
      const resourceText = `\n${typeIcon} RESSOURCE [${projectTitle}]\nType: ${resourceData.type.toUpperCase()}\nDescription: ${
        resourceData.alt_text
      }\n[Image chargée depuis l'API]\n\n`;
      cursor.insertText(resourceText);

      // Essayer d'insérer l'image après le texte si possible
      if (resourceData.id) {
        try {
          const imageUrl = `${API_BASE_URL}/resources/${resourceData.id}/image`;
          const response = UrlFetchApp.fetch(imageUrl);

          if (response.getResponseCode() === 200) {
            const blob = response.getBlob();
            // Insérer l'image après le texte
            cursor.insertInlineImage(blob);
            cursor.insertText("\n\n");
          }
        } catch (imageError) {
          console.error("Erreur insertion image en mode curseur:", imageError);
        }
      }
    } else {
      // Mode normal - insérer avec des tableaux stylés

      // Encadré titre pour la ressource
      const titleTable = body.appendTable([
        [
          `${typeIcon} RESSOURCE ${resourceData.type.toUpperCase()} - ${projectTitle}`,
        ],
      ]);

      // Style du titre
      const titleCell = titleTable.getRow(0).getCell(0);
      titleCell.setBackgroundColor("#F57C00");
      titleCell
        .getChild(0)
        .asText()
        .setForegroundColor("#FFFFFF")
        .setBold(true)
        .setFontSize(14);
      titleCell.setPaddingTop(12);
      titleCell.setPaddingBottom(12);
      titleCell.setPaddingLeft(16);
      titleCell.setPaddingRight(16);
      titleTable.setBorderWidth(0);

      // Informations de la ressource
      const infoTable = body.appendTable([
        ["📋 Type", resourceData.type.toUpperCase()],
        ["📝 Description", resourceData.alt_text || "Aucune description"],
        ["📅 Date", new Date(resourceData.created_at).toLocaleString("fr-FR")],
      ]);

      // Style du tableau d'informations
      for (let i = 0; i < 3; i++) {
        const labelCell = infoTable.getRow(i).getCell(0);
        const valueCell = infoTable.getRow(i).getCell(1);

        labelCell.setBackgroundColor("#FF8F00");
        labelCell
          .getChild(0)
          .asText()
          .setForegroundColor("#FFFFFF")
          .setBold(true)
          .setFontSize(10);

        valueCell.setBackgroundColor("#FFF8E1");
        valueCell
          .getChild(0)
          .asText()
          .setForegroundColor("#E65100")
          .setFontSize(11);

        // Padding
        labelCell.setPaddingTop(8);
        labelCell.setPaddingBottom(8);
        labelCell.setPaddingLeft(12);
        labelCell.setPaddingRight(12);

        valueCell.setPaddingTop(8);
        valueCell.setPaddingBottom(8);
        valueCell.setPaddingLeft(12);
        valueCell.setPaddingRight(12);
      }

      infoTable.setBorderColor("#FF9800");
      infoTable.setBorderWidth(2);

      // Conteneur pour l'image - CETTE PARTIE EST CRUCIALE
      const imageTable = body.appendTable([
        ["🔄 Chargement de l'image depuis l'API..."],
      ]);
      const imageCell = imageTable.getRow(0).getCell(0);

      // Charger l'image depuis l'API
      if (resourceData.id) {
        try {
          console.log(`Chargement image pour ressource ID: ${resourceData.id}`);

          // Utiliser la nouvelle route de l'API
          const imageUrl = `${API_BASE_URL}/resources/${resourceData.id}/image`;
          console.log(`URL de l'image: ${imageUrl}`);

          const response = UrlFetchApp.fetch(imageUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log(`Code de réponse API: ${response.getResponseCode()}`);

          if (response.getResponseCode() === 200) {
            const blob = response.getBlob();
            console.log(
              `Blob reçu - Nom: ${blob.getName()}, Taille: ${blob.getSize()} bytes`
            );

            // Vider la cellule et insérer l'image
            imageCell.clear();
            const image = imageCell.appendInlineImage(blob);

            console.log("Image insérée avec succès dans le document");

            // Redimensionner automatiquement l'image
            const maxWidth = 400;
            const maxHeight = 300;

            try {
              const originalWidth = image.getWidth();
              const originalHeight = image.getHeight();

              console.log(
                `Dimensions originales: ${originalWidth}x${originalHeight}`
              );

              let newWidth = originalWidth;
              let newHeight = originalHeight;

              if (originalWidth > maxWidth) {
                newWidth = maxWidth;
                newHeight = (originalHeight * maxWidth) / originalWidth;
              }

              if (newHeight > maxHeight) {
                newHeight = maxHeight;
                newWidth = (newWidth * maxHeight) / newHeight;
              }

              image.setWidth(Math.round(newWidth));
              image.setHeight(Math.round(newHeight));

              console.log(
                `Image redimensionnée: ${Math.round(newWidth)}x${Math.round(
                  newHeight
                )}`
              );
            } catch (resizeError) {
              console.error("Erreur redimensionnement:", resizeError);
              // L'image est quand même insérée, juste pas redimensionnée
            }

            // Style du conteneur d'image
            imageCell.setBackgroundColor("#FFFFFF");
            imageCell.setPaddingTop(15);
            imageCell.setPaddingBottom(15);
            imageCell.setPaddingLeft(15);
            imageCell.setPaddingRight(15);
          } else {
            console.error(`Erreur API: Code ${response.getResponseCode()}`);
            console.error(`Réponse: ${response.getContentText()}`);

            imageCell.clear();
            const errorPara = imageCell.appendParagraph(
              `❌ Image non disponible (HTTP ${response.getResponseCode()})`
            );
            errorPara
              .getChild(0)
              .asText()
              .setForegroundColor("#D32F2F")
              .setItalic(true);
          }
        } catch (imageError) {
          console.error(
            "Erreur complète lors du chargement de l'image:",
            imageError
          );

          imageCell.clear();
          const errorPara = imageCell.appendParagraph(
            `⚠️ Erreur de chargement: ${imageError.message}`
          );
          errorPara
            .getChild(0)
            .asText()
            .setForegroundColor("#FF6F00")
            .setItalic(true);
        }
      } else {
        console.error("ID de ressource manquant");
        imageCell.clear();
        const noPara = imageCell.appendParagraph(
          "❌ ID de ressource manquant - impossible de charger l'image"
        );
        noPara
          .getChild(0)
          .asText()
          .setForegroundColor("#D32F2F")
          .setItalic(true);
      }

      // Bordure pour le conteneur d'image
      imageTable.setBorderColor("#FF9800");
      imageTable.setBorderWidth(3);

      // Espaceur
      body.appendParagraph("");
    }

    return { success: true };
  } catch (error) {
    console.error("Erreur insertion ressource complète:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Test de connexion
 */
function testConnection() {
  const ui = DocumentApp.getUi();

  try {
    const projects = getProjects();
    ui.alert(
      "✅ Test réussi !",
      `Connexion API établie avec succès !\n\n${projects.length} projets trouvés.\n\nUtilisez "📋 Ouvrir l'assistant" pour commencer.`,
      ui.ButtonSet.OK
    );
  } catch (error) {
    ui.alert(
      "❌ Erreur de connexion",
      `Impossible de se connecter à l'API:\n${error.message}`,
      ui.ButtonSet.OK
    );
  }
}

function showAbout() {
  const ui = DocumentApp.getUi();
  ui.alert(
    "ℹ️ Marvelab Assistant v3.0",
    "Assistant interactif pour l'insertion de données de recherche.\n\n" +
      "Fonctionnalités:\n" +
      "• Interface latérale interactive\n" +
      "• Style coloré pour notes (bleu), interprétations (vert), ressources (orange)\n" +
      "• Images servies directement par l'API\n" +
      "• Mise en forme professionnelle\n\n" +
      "Développé pour le Workshop 3 - MBA1",
    ui.ButtonSet.OK
  );
}

/**
 * Générer une réponse IA basée sur un prompt et un projet
 */
function generateAIResponse(prompt, projectId) {
  try {
    const url = `${API_BASE_URL}/ai/generate-response/${projectId}`;
    
    const response = UrlFetchApp.fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      payload: JSON.stringify({
        prompt: prompt
      })
    });

    // Accepter 200 (OK) et 201 (Created) comme succès
    if (response.getResponseCode() === 200 || response.getResponseCode() === 201) {
      const aiResponse = response.getContentText();
      return {
        success: true,
        data: aiResponse
      };
    } else {
      return {
        success: false,
        error: `Erreur API: ${response.getResponseCode()}`
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Insérer une réponse IA avec style amélioré
 */
function insertAIResponse(aiResponse, prompt, projectTitle) {
  try {
    const doc = DocumentApp.getActiveDocument();
    const body = doc.getBody();
    const cursor = doc.getCursor();

    if (cursor) {
      // Version simple pour insertion au curseur
      const aiText = `\n🤖 IA [${projectTitle}]\n${aiResponse}\n\n`;
      cursor.insertText(aiText);
    } else {
      // Ajouter un espace avant
      body.appendParagraph("");

      // === HEADER PRINCIPAL ===
      const headerPara = body.appendParagraph("🤖 INTELLIGENCE ARTIFICIELLE");
      headerPara.setHeading(DocumentApp.ParagraphHeading.HEADING2);
      headerPara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
      headerPara.getChild(0).asText()
        .setForegroundColor("#6A1B9A")
        .setBold(true)
        .setFontSize(16);

      // === SOUS-TITRE PROJET ===
      const projectPara = body.appendParagraph(`Projet: ${projectTitle}`);
      projectPara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
      projectPara.getChild(0).asText()
        .setForegroundColor("#424242")
        .setItalic(true)
        .setFontSize(12);

      // === LIGNE DE SÉPARATION ===
      const separatorPara = body.appendParagraph("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      separatorPara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
      separatorPara.getChild(0).asText()
        .setForegroundColor("#AB47BC")
        .setBold(true);

      // === CONTENU IA DIRECTEMENT ===
      const responseTable = body.appendTable([[aiResponse]]);
      const responseCell = responseTable.getRow(0).getCell(0);
      
      // Style de la réponse
      responseCell.setBackgroundColor("#FCE4EC");
      responseCell.getChild(0).asText()
        .setForegroundColor("#1A1A1A")
        .setFontSize(11)
        .setLineSpacing(1.6);
      
      // Padding généreux
      responseCell.setPaddingTop(20);
      responseCell.setPaddingBottom(20);
      responseCell.setPaddingLeft(24);
      responseCell.setPaddingRight(24);
      
      // Bordure élégante
      responseTable.setBorderColor("#F8BBD9");
      responseTable.setBorderWidth(1);

      // === FOOTER AVEC DATE ===
      const createdDate = new Date();
      const footerTable = body.appendTable([
        [`🕒 Généré le ${createdDate.toLocaleDateString("fr-FR")} à ${createdDate.toLocaleTimeString("fr-FR", {hour: '2-digit', minute:'2-digit'})}`]
      ]);
      
      const footerCell = footerTable.getRow(0).getCell(0);
      footerCell.setBackgroundColor("#F3E5F5");
      footerCell.getChild(0).asText()
        .setForegroundColor("#7B1FA2")
        .setItalic(true)
        .setFontSize(9)
        .setFontFamily("Google Sans");
      
      footerCell.setPaddingTop(8);
      footerCell.setPaddingBottom(8);
      footerCell.setPaddingLeft(16);
      footerCell.setPaddingRight(16);
      footerTable.setBorderWidth(0);

      // Espacement final
      body.appendParagraph("");
      body.appendParagraph("");
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Fonction appelée depuis la sidebar pour générer et insérer une réponse IA
 */
function generateAndInsertAI(prompt, projectId, projectTitle) {
  try {
    // Générer la réponse IA
    const aiResult = generateAIResponse(prompt, projectId);
    
    if (!aiResult.success) {
      return {
        success: false,
        error: `Erreur génération IA: ${aiResult.error}`
      };
    }

    // Insérer la réponse dans le document
    const insertResult = insertAIResponse(aiResult.data, prompt, projectTitle);
    
    if (!insertResult.success) {
      return {
        success: false,
        error: `Erreur insertion: ${insertResult.error}`
      };
    }

    return {
      success: true,
      message: "Réponse IA générée et insérée avec succès!"
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Créer une page de garde professionnelle avec sommaire automatique
 */
function createCoverPageWithSummary(projectId) {
  try {
    const project = getProjectDetailsForSidebar(projectId);
    if (!project.success) {
      return { success: false, error: project.error };
    }
    
    const projectData = project.data;
    const doc = DocumentApp.getActiveDocument();
    const body = doc.getBody();
    
    // Vider le document
    body.clear();
    
    // === PAGE DE GARDE ===
    
    // Logo/Header décoratif
    const decorHeader = body.appendParagraph("🔬 ═══════════════════════════════════════ 🔬");
    decorHeader.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    decorHeader.getChild(0).asText()
      .setForegroundColor("#2E3440")
      .setBold(true)
      .setFontSize(14);
    
    body.appendParagraph(""); // Espace
    
    // Titre principal
    const titlePara = body.appendParagraph("RAPPORT DE RECHERCHE");
    titlePara.setHeading(DocumentApp.ParagraphHeading.TITLE);
    titlePara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    titlePara.getChild(0).asText()
      .setForegroundColor("#2E3440")
      .setBold(true)
      .setFontSize(24);
    
    body.appendParagraph(""); // Espace
    
    // Titre du projet
    const projectTitlePara = body.appendParagraph(projectData.title);
    projectTitlePara.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    projectTitlePara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    projectTitlePara.getChild(0).asText()
      .setForegroundColor("#5E81AC")
      .setBold(true)
      .setFontSize(20);
    
    // Description du projet
    if (projectData.description) {
      body.appendParagraph(""); // Espace
      const descPara = body.appendParagraph(projectData.description);
      descPara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
      descPara.getChild(0).asText()
        .setForegroundColor("#4C566A")
        .setItalic(true)
        .setFontSize(12);
    }
    
    body.appendParagraph(""); // Espace
    body.appendParagraph(""); // Espace
    
    // Informations du projet dans un tableau élégant
    const infoTable = body.appendTable([
      ["📅 Date de création", projectData.created_at ? new Date(projectData.created_at).toLocaleDateString("fr-FR") : "Non spécifiée"],
      ["🔬 Type de recherche", projectData.research_type || "Recherche générale"],
      ["📊 Statut", projectData.status || "En cours"],
      ["📄 Document généré", new Date().toLocaleDateString("fr-FR") + " à " + new Date().toLocaleTimeString("fr-FR", {hour: '2-digit', minute:'2-digit'})]
    ]);
    
    // Style du tableau d'informations
    for (let i = 0; i < infoTable.getNumRows(); i++) {
      const row = infoTable.getRow(i);
      const labelCell = row.getCell(0);
      const valueCell = row.getCell(1);
      
      // Style des labels
      labelCell.setBackgroundColor("#ECEFF4");
      labelCell.getChild(0).asText()
        .setForegroundColor("#2E3440")
        .setBold(true)
        .setFontSize(11);
      labelCell.setPaddingTop(8);
      labelCell.setPaddingBottom(8);
      labelCell.setPaddingLeft(12);
      labelCell.setPaddingRight(12);
      
      // Style des valeurs
      valueCell.setBackgroundColor("#F9F9F9");
      valueCell.getChild(0).asText()
        .setForegroundColor("#4C566A")
        .setFontSize(11);
      valueCell.setPaddingTop(8);
      valueCell.setPaddingBottom(8);
      valueCell.setPaddingLeft(12);
      valueCell.setPaddingRight(12);
    }
    
    infoTable.setBorderColor("#D8DEE9");
    infoTable.setBorderWidth(1);
    
    // Saut de page
    body.appendPageBreak();
    
    // === SOMMAIRE AUTOMATIQUE ===
    
    const summaryTitle = body.appendParagraph("📋 SOMMAIRE");
    summaryTitle.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    summaryTitle.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    summaryTitle.getChild(0).asText()
      .setForegroundColor("#2E3440")
      .setBold(true)
      .setFontSize(18);
    
    body.appendParagraph(""); // Espace
    
    // Ligne décorative
    const decorLine = body.appendParagraph("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    decorLine.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    decorLine.getChild(0).asText()
      .setForegroundColor("#5E81AC")
      .setBold(true);
    
    body.appendParagraph(""); // Espace
    
    // Compter les éléments pour le sommaire
    const notesCount = projectData.notes ? projectData.notes.length : 0;
    const interpretationsCount = projectData.interpretations ? projectData.interpretations.length : 0;
    const resourcesCount = projectData.resources ? projectData.resources.length : 0;
    
    // Tableau du sommaire
    const summaryTable = body.appendTable([
      ["1.", "Informations du projet", "Page 1"],
      ["2.", "Notes de recherche", `${notesCount} élément(s)`],
      ["3.", "Interprétations", `${interpretationsCount} élément(s)`],
      ["4.", "Ressources", `${resourcesCount} élément(s)`],
      ["5.", "Analyses IA", "Selon besoins"],
      ["6.", "Conclusions", "À compléter"]
    ]);
    
    // Style du sommaire
    for (let i = 0; i < summaryTable.getNumRows(); i++) {
      const row = summaryTable.getRow(i);
      
      // Numéro
      const numCell = row.getCell(0);
      numCell.setBackgroundColor("#5E81AC");
      numCell.getChild(0).asText()
        .setForegroundColor("#FFFFFF")
        .setBold(true)
        .setFontSize(12);
      numCell.setPaddingTop(10);
      numCell.setPaddingBottom(10);
      numCell.setPaddingLeft(8);
      numCell.setPaddingRight(8);
      
      // Titre de section
      const titleCell = row.getCell(1);
      titleCell.setBackgroundColor("#ECEFF4");
      titleCell.getChild(0).asText()
        .setForegroundColor("#2E3440")
        .setBold(true)
        .setFontSize(12);
      titleCell.setPaddingTop(10);
      titleCell.setPaddingBottom(10);
      titleCell.setPaddingLeft(16);
      titleCell.setPaddingRight(16);
      
      // Info/Page
      const infoCell = row.getCell(2);
      infoCell.setBackgroundColor("#F9F9F9");
      infoCell.getChild(0).asText()
        .setForegroundColor("#4C566A")
        .setItalic(true)
        .setFontSize(10);
      infoCell.setPaddingTop(10);
      infoCell.setPaddingBottom(10);
      infoCell.setPaddingLeft(12);
      infoCell.setPaddingRight(12);
    }
    
    summaryTable.setBorderColor("#D8DEE9");
    summaryTable.setBorderWidth(1);
    
    body.appendParagraph(""); // Espace
    body.appendParagraph(""); // Espace
    
    // Note de bas de page
    const footerNote = body.appendParagraph("📌 Ce document a été généré automatiquement par l'assistant Marvelab");
    footerNote.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    footerNote.getChild(0).asText()
      .setForegroundColor("#8FBCBB")
      .setItalic(true)
      .setFontSize(9);
    
    // Saut de page pour commencer le contenu
    body.appendPageBreak();
    
    return { success: true, message: "Page de garde et sommaire créés avec succès!" };
    
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Insérer une méthodologie avec style amélioré
 */
function insertMethodology(methodologyData, projectTitle) {
  try {
    const doc = DocumentApp.getActiveDocument();
    const body = doc.getBody();
    const cursor = doc.getCursor();

    if (cursor) {
      // Mode curseur - insertion simple
      const methodText = `\n🔬 MÉTHODOLOGIE [${projectTitle}]\nTitre: ${methodologyData.title}\nDescription: ${methodologyData.description}\n📅 ${new Date(methodologyData.created_at).toLocaleString("fr-FR")}\n\n`;
      cursor.insertText(methodText);
    } else {
      // Mode tableau stylé avec thème vert
      const titleTable = body.appendTable([
        [`🔬 MÉTHODOLOGIE DE RECHERCHE - ${projectTitle}`]
      ]);
      
      const titleCell = titleTable.getRow(0).getCell(0);
      titleCell.setBackgroundColor("#2E7D32");
      titleCell.getChild(0).asText()
        .setBold(true)
        .setForegroundColor("#FFFFFF")
        .setFontSize(14);
      titleCell.setPaddingTop(12);
      titleCell.setPaddingBottom(12);
      titleCell.setPaddingLeft(16);
      titleCell.setPaddingRight(16);
      titleTable.setBorderWidth(0);
      
      // Tableau d'informations
      const infoTable = body.appendTable([
        [`Titre:`, methodologyData.title],
        [`Description:`, methodologyData.description],
        [`Date de création:`, new Date(methodologyData.created_at).toLocaleString("fr-FR")]
      ]);
      
      infoTable.setBorderWidth(1);
      infoTable.setBorderColor("#A5D6A7");
      
      for (let i = 0; i < infoTable.getNumRows(); i++) {
        const row = infoTable.getRow(i);
        const labelCell = row.getCell(0);
        const contentCell = row.getCell(1);
        
        labelCell.setBackgroundColor("#E8F5E8");
        labelCell.getChild(0).asText()
          .setBold(true)
          .setForegroundColor("#2E7D32");
        
        contentCell.setBackgroundColor("#F1F8E9");
        contentCell.getChild(0).asText()
          .setForegroundColor("#1B5E20");
        
        if (i === 0) contentCell.getChild(0).asText().setBold(true);
        if (i === 1) contentCell.getChild(0).asText().setItalic(true);
      }
      
      body.appendParagraph("");
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Insérer une expérimentation avec style amélioré
 */
function insertExperiment(experimentData, projectTitle) {
  try {
    const doc = DocumentApp.getActiveDocument();
    const body = doc.getBody();
    const cursor = doc.getCursor();

    if (cursor) {
      // Mode curseur - insertion simple
      const expText = `\n🧪 EXPÉRIMENTATION [${projectTitle}]\nTitre: ${experimentData.title}\nProtocole: ${experimentData.protocol}\n${experimentData.results ? `Résultats: ${experimentData.results}\n` : ''}📅 ${new Date(experimentData.created_at).toLocaleString("fr-FR")}\n\n`;
      cursor.insertText(expText);
    } else {
      // Mode tableau stylé avec thème violet
      const titleTable = body.appendTable([
        [`🧪 EXPÉRIMENTATION SCIENTIFIQUE - ${projectTitle}`]
      ]);
      
      const titleCell = titleTable.getRow(0).getCell(0);
      titleCell.setBackgroundColor("#7B1FA2");
      titleCell.getChild(0).asText()
        .setBold(true)
        .setForegroundColor("#FFFFFF")
        .setFontSize(14);
      titleCell.setPaddingTop(12);
      titleCell.setPaddingBottom(12);
      titleCell.setPaddingLeft(16);
      titleCell.setPaddingRight(16);
      titleTable.setBorderWidth(0);
      
      // Tableau d'informations
      const infoRows = [
        [`Titre:`, experimentData.title],
        [`Protocole:`, experimentData.protocol],
        [`Date de création:`, new Date(experimentData.created_at).toLocaleString("fr-FR")]
      ];
      
      if (experimentData.results) {
        infoRows.splice(2, 0, [`Résultats:`, experimentData.results]);
      }
      
      const infoTable = body.appendTable(infoRows);
      infoTable.setBorderWidth(1);
      infoTable.setBorderColor("#CE93D8");
      
      for (let i = 0; i < infoTable.getNumRows(); i++) {
        const row = infoTable.getRow(i);
        const labelCell = row.getCell(0);
        const contentCell = row.getCell(1);
        
        labelCell.setBackgroundColor("#F3E5F5");
        labelCell.getChild(0).asText()
          .setBold(true)
          .setForegroundColor("#7B1FA2");
        
        contentCell.setBackgroundColor("#FCE4EC");
        contentCell.getChild(0).asText()
          .setForegroundColor("#4A148C");
        
        if (i === 0) contentCell.getChild(0).asText().setBold(true);
        if (i === 1 || (experimentData.results && i === 2)) contentCell.getChild(0).asText().setItalic(true);
      }
      
      body.appendParagraph("");
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
