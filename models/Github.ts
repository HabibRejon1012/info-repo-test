
export type GithubUserRequest = {
    items: UserGithub[],
    total_count: number
}

export type GithubRepositoriesRequest = {
  items: RepositoryGithub[],
  total_count: number
}

export type UserGithub = {
    login: string; // Nombre de usuario en GitHub
    id: number; // ID único del usuario
    node_id: string; // ID global único en formato GraphQL
    avatar_url: string; // URL del avatar del usuario
    gravatar_id: string | null; // ID de Gravatar (generalmente vacío)
    url: string; // URL de la API del usuario
    html_url: string; // URL del perfil en GitHub
    followers_url: string; // URL para obtener los seguidores del usuario
    following_url: string; // URL para obtener los usuarios seguidos
    gists_url: string; // URL para obtener los gists del usuario
    starred_url: string; // URL para obtener los repositorios con estrellas
    subscriptions_url: string; // URL para obtener las suscripciones
    organizations_url: string; // URL para obtener las organizaciones del usuario
    repos_url: string; // URL para obtener los repositorios del usuario
    events_url: string; // URL para obtener eventos del usuario
    received_events_url: string; // URL para eventos recibidos
    type: string; // Tipo de usuario (puede ser "User" o "Organization")
    site_admin: boolean; // Si el usuario es administrador del sitio
    name: string | null; // Nombre completo del usuario
    company: string | null; // Compañía del usuario
    blog: string | null; // Blog del usuario
    location: string | null; // Ubicación del usuario
    email: string | null; // Email público del usuario
    hireable: boolean | null; // Si está disponible para contratación
    bio: string | null; // Biografía del usuario
    twitter_username: string | null; // Nombre de usuario de Twitter
    public_repos: number; // Número de repositorios públicos
    public_gists: number; // Número de gists públicos
    followers: number; // Número de seguidores
    following: number; // Número de usuarios seguidos
    created_at: string; // Fecha de creación de la cuenta
    updated_at: string; // Fecha de la última actualización de la c
}

export type RepositoryGithub = {

  id: number; // ID único del repositorio
  node_id: string; // ID global único en formato GraphQL
  name: string; // Nombre del repositorio
  full_name: string; // Nombre completo del repositorio (owner/repo)
  owner: {
    login: string; // Nombre de usuario del propietario
    id: number; // ID único del propietario
    node_id: string; // ID global del propietario
    avatar_url: string; // URL del avatar del propietario
    gravatar_id: string | null; // ID de Gravatar (generalmente vacío)
    url: string; // URL de la API del propietario
    html_url: string; // URL del perfil del propietario
    type: string; // Tipo de propietario ("User" o "Organization")
    site_admin: boolean; // Si el propietario es administrador del sitio
  };
  private: boolean; // Si el repositorio es privado
  html_url: string; // URL del repositorio en GitHub
  description: string | null; // Descripción del repositorio
  fork: boolean; // Si es un fork de otro repositorio
  url: string; // URL de la API del repositorio
  forks_url: string; // URL para obtener forks
  keys_url: string; // URL para obtener llaves de despliegue
  collaborators_url: string; // URL para obtener colaboradores
  teams_url: string; // URL para obtener equipos asociados
  hooks_url: string; // URL para obtener hooks
  issue_events_url: string; // URL para eventos de issues
  events_url: string; // URL para eventos
  assignees_url: string; // URL para obtener asignados
  branches_url: string; // URL para obtener ramas
  tags_url: string; // URL para obtener tags
  blobs_url: string; // URL para obtener blobs
  git_tags_url: string; // URL para obtener tags de Git
  git_refs_url: string; // URL para obtener referencias de Git
  trees_url: string; // URL para obtener árboles de Git
  statuses_url: string; // URL para obtener estatus
  languages_url: string; // URL para obtener lenguajes usados
  stargazers_url: string; // URL para obtener estrellas
  contributors_url: string; // URL para obtener contribuidores
  subscribers_url: string; // URL para obtener suscriptores
  subscription_url: string; // URL para manejar suscripción
  commits_url: string; // URL para obtener commits
  git_commits_url: string; // URL para obtener commits de Git
  comments_url: string; // URL para obtener comentarios
  issue_comment_url: string; // URL para obtener comentarios de issues
  contents_url: string; // URL para obtener contenido
  compare_url: string; // URL para comparar ramas
  merges_url: string; // URL para merges
  archive_url: string; // URL para obtener el archivo del repositorio
  downloads_url: string; // URL para obtener descargas
  issues_url: string; // URL para obtener issues
  pulls_url: string; // URL para obtener pull requests
  milestones_url: string; // URL para obtener hitos
  notifications_url: string; // URL para obtener notificaciones
  labels_url: string; // URL para obtener etiquetas
  releases_url: string; // URL para obtener releases
  deployments_url: string; // URL para obtener despliegues
  created_at: string; // Fecha de creación
  updated_at: string; // Última fecha de actualización
  pushed_at: string; // Fecha del último push
  git_url: string; // URL de Git
  ssh_url: string; // URL SSH
  clone_url: string; // URL para clonar el repositorio
  svn_url: string; // URL para SVN
  homepage: string | null; // Página de inicio del proyecto
  size: number; // Tamaño del repositorio en KB
  stargazers_count: number; // Número de estrellas
  watchers_count: number; // Número de watchers
  language: string | null; // Lenguaje principal del repositorio
  has_issues: boolean; // Si el repositorio tiene issues activados
  has_projects: boolean; // Si tiene proyectos activados
  has_downloads: boolean; // Si tiene descargas activadas
  has_wiki: boolean; // Si tiene un wiki activado
  has_pages: boolean; // Si tiene páginas de GitHub activadas
  forks_count: number; // Número de forks
  mirror_url: string | null; // URL del repositorio espejo (si existe)
  archived: boolean; // Si el repositorio está archivado
  disabled: boolean; // Si el repositorio está deshabilitado
  open_issues_count: number; // Número de issues abiertas
  license: {
    key: string; // Clave de la licencia
    name: string; // Nombre de la licencia
    spdx_id: string; // Identificador SPDX
    url: string | null; // URL de la licencia
    node_id: string; // ID global de la licencia
  } | null; // Información de la licencia (puede ser null)
  visibility: string; // Visibilidad del repositorio ("public", "private", etc.)
  forks: number; // Número total de forks
  open_issues: number; // Número total de issues abiertas
  watchers: number; // Número total de watchers
  default_branch: string; // Rama por defecto del repositorio
  permissions?: {
    admin: boolean; // Permiso de administrador
    push: boolean; // Permiso de push
    pull: boolean; // Permiso de pull
  }; // Permisos (opcional, depende del contexto)
}

