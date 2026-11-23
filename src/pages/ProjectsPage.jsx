import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

function ProjectsPage() {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch projects");
        }

        setProjects(data.projects || []);
        setError("");
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    if (token) fetchProjects();
  }, [token]);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = projectName.trim();
    if (!trimmedName) return;

    const isEditing = Boolean(editingProject);
    const url = isEditing
      ? `http://localhost:5000/api/projects/${editingProject.id}`
      : "http://localhost:5000/api/projects";

    try {
      const response = await fetch(url, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: trimmedName,
          description: description.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not save project");
      }

      if (isEditing) {
        setProjects((current) =>
          current.map((project) =>
            project.id === data.project.id ? data.project : project,
          ),
        );
      } else {
        setProjects((current) => [data.project, ...current]);
      }

      resetForm();
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  function startEditing(project) {
    setEditingProject(project);
    setProjectName(project.name || "");
    setDescription(project.description || "");
  }

  function resetForm() {
    setEditingProject(null);
    setProjectName("");
    setDescription("");
  }

  async function handleDeleteProject(projectId) {
    const confirmed = window.confirm(
      "Delete this project? Tasks linked to it will remain, but become unassigned.",
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/projects/${projectId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete project");
      }

      setProjects((current) =>
        current.filter((project) => project.id !== projectId),
      );
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <section className="page-content">
      <header className="page-header">
        <h1>My Projects</h1>
        <p>Organize and track your projects in one place.</p>
      </header>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">
          {editingProject ? "Save changes" : "Create project"}
        </button>

        {editingProject && (
          <button type="button" onClick={resetForm}>
            Cancel edit
          </button>
        )}
      </form>

      {error && <p role="alert">{error}</p>}

      <div className="projects-list">
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="projects-empty-state">
            <h2>No projects yet</h2>
            <p>Create your first project using the form above.</p>
          </div>
        ) : (
          projects.map((project) => (
            <article className="project-card" key={project.id}>
              <h2>{project.name}</h2>
              <p>{project.description || "No description added."}</p>

              <button type="button" onClick={() => startEditing(project)}>
                Edit project
              </button>
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
