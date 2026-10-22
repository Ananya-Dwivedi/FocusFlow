
import { useEffect, useState } from "react";

function loadProjects() {
  try {
    const savedProjects = localStorage.getItem("focusflow-projects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  } catch {
    return [];
  }
}

function ProjectsPage() {
  const [projects, setProjects] = useState(loadProjects);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "focusflow-projects",
      JSON.stringify(projects)
    );
  }, [projects]);

  function handleAddProject(event) {
    event.preventDefault();

    const trimmedName = projectName.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) return;

    const newProject = {
      id: crypto.randomUUID(),
      name: trimmedName,
      description: trimmedDescription,
      createdAt: new Date().toISOString(),
    };

    setProjects((currentProjects) => [
      ...currentProjects,
      newProject,
    ]);

    setProjectName("");
    setDescription("");
  }

  function handleDeleteProject(projectId) {
    setProjects((currentProjects) =>
      currentProjects.filter(
        (project) => project.id !== projectId
      )
    );
  }

  return (
    <section className="page-content">
      <header className="page-header">
        <h1>My Projects</h1>
        <p>Organize and track your projects in one place.</p>
      </header>

      <form onSubmit={handleAddProject}>
        <label htmlFor="project-name">Project name</label>
        <input
          id="project-name"
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
          placeholder="e.g. Portfolio Website"
          required
        />

        <label htmlFor="project-description">Description</label>
        <textarea
          id="project-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What do you want to accomplish?"
        />

        <button type="submit">Create project</button>
      </form>

      <div className="projects-list">
        {projects.length === 0 ? (
          <div className="projects-empty-state">
            <h2>No projects yet</h2>
            <p>Create your first project using the form above.</p>
          </div>
        ) : (
          projects.map((project) => (
            <article className="project-card" key={project.id}>
              <h2>{project.name}</h2>
              <p>{project.description || "No description added."}</p>

              <button
                type="button"
                onClick={() => handleDeleteProject(project.id)}
              >
                Delete project
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default ProjectsPage;
