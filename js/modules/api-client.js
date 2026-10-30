// ============================================================================
// CATALOGCRAFT API CLIENT
// Handles all communication between the frontend and FastAPI backend.
// Falls back to localStorage when the backend is unavailable.
// ============================================================================

(function() {
  'use strict';

  const DEFAULT_BASE_URL = window.location.origin;
  const API_PREFIX = '/api';
  const STORAGE_KEY = 'catalogcraft_state';
  const PROJECTS_INDEX_KEY = 'catalogcraft_projects_index';

  let baseUrl = DEFAULT_BASE_URL;
  let backendAvailable = null; // null = unknown, true/false after check
  let currentProjectId = null;

  // ── Utility ────────────────────────────────────────────────────────────

  async function request(method, path, body) {
    const url = baseUrl + API_PREFIX + path;
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (body !== undefined) {
      opts.body = JSON.stringify(body);
    }
    const resp = await fetch(url, opts);
    if (!resp.ok) {
      const detail = await resp.text().catch(() => '');
      throw new Error(`API ${method} ${path} failed (${resp.status}): ${detail}`);
    }
    if (resp.status === 204) return null;
    return resp.json();
  }

  // ── Backend Availability ───────────────────────────────────────────────

  async function checkBackend() {
    try {
      const data = await request('GET', '/health');
      backendAvailable = data && data.status === 'ok';
    } catch (e) {
      backendAvailable = false;
    }
    return backendAvailable;
  }

  function isBackendAvailable() {
    return backendAvailable === true;
  }

  // ── Project CRUD ───────────────────────────────────────────────────────

  /**
   * Save the current STATE to the backend as a new project.
   * Returns the created project object with its id.
   */
  async function createProject(state) {
    if (!backendAvailable) {
      return saveToLocalStorage(state);
    }
    const result = await request('POST', '/projects', stateToPayload(state));
    currentProjectId = result.id;
    // Also save locally as fallback
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e) {}
    return result;
  }

  /**
   * Update an existing project.
   */
  async function updateProject(projectId, state) {
    if (!backendAvailable) {
      return saveToLocalStorage(state);
    }
    const id = projectId || currentProjectId;
    if (!id) {
      return createProject(state);
    }
    const result = await request('PUT', '/projects/' + id, stateToPayload(state));
    // Also save locally as fallback
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e) {}
    return result;
  }

  /**
   * Save state — creates or updates depending on whether we have a project ID.
   */
  async function saveProject(state) {
    if (!backendAvailable) {
      return saveToLocalStorage(state);
    }
    if (currentProjectId) {
      return updateProject(currentProjectId, state);
    } else {
      return createProject(state);
    }
  }

  /**
   * Load a project by ID from the backend.
   * Returns the state in frontend-compatible format.
   */
  async function loadProject(projectId) {
    if (!backendAvailable) {
      return loadFromLocalStorage();
    }
    const data = await request('GET', '/projects/' + projectId);
    currentProjectId = projectId;
    return data;
  }

  /**
   * List all projects (summaries).
   */
  async function listProjects() {
    if (!backendAvailable) {
      return listLocalProjects();
    }
    return request('GET', '/projects');
  }

  /**
   * Delete a project.
   */
  async function deleteProject(projectId) {
    if (!backendAvailable) {
      removeLocalProject(projectId);
      return;
    }
    await request('DELETE', '/projects/' + projectId);
    if (currentProjectId === projectId) {
      currentProjectId = null;
    }
  }

  /**
   * Duplicate a project.
   */
  async function duplicateProject(projectId) {
    if (!backendAvailable) {
      return null; // Local-only duplication not supported
    }
    const result = await request('POST', '/projects/' + projectId + '/duplicate');
    return result;
  }

  // ── Product CRUD ───────────────────────────────────────────────────────

  async function addProduct(projectId, product) {
    if (!backendAvailable) return product;
    return request('POST', '/projects/' + projectId + '/products', product);
  }

  async function updateProduct(projectId, productId, product) {
    if (!backendAvailable) return product;
    return request('PUT', '/projects/' + projectId + '/products/' + productId, product);
  }

  async function deleteProduct(projectId, productId) {
    if (!backendAvailable) return;
    return request('DELETE', '/projects/' + projectId + '/products/' + productId);
  }

  // ── State Format Conversion ────────────────────────────────────────────

  /**
   * Convert frontend STATE to the payload format expected by the API.
   */
  function stateToPayload(state) {
    return {
      store: state.store || {},
      designSystem: state.designSystem || 'modern-saas',
      tokenOverrides: state.tokenOverrides || {},
      bgPreset: state.bgPreset || '',
      layout: state.layout || 'grid',
      buttonShape: state.buttonShape || 'shape-soft',
      buttonEffect: state.buttonEffect || '',
      sections: state.sections || {},
      products: (state.products || []).map((p, idx) => ({
        id: p.id,
        n: p.n,
        p: p.p,
        op: p.op || '',
        c: p.c || '',
        e: p.e || '',
        d: p.d || '',
        x: p.x || '',
        f: p.f || false,
        rating: p.rating || 0,
        i: p.i || '',
        sort_order: idx
      })),
      features: state.features || [],
      faqs: state.faqs || [],
      elementOverrides: (window.FullControl && window.FullControl.elementOverrides) || state.elementOverrides || {},
      motion: state.motion || (window.MotionStudio && window.MotionStudio.getMotionState()) || {}
    };
  }

  // ── localStorage Fallback ──────────────────────────────────────────────

  function saveToLocalStorage(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('CatalogCraft: localStorage save failed', e);
    }
    return { id: 'local', saved: true };
  }

  function loadFromLocalStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('CatalogCraft: localStorage load failed', e);
      return null;
    }
  }

  function listLocalProjects() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const state = JSON.parse(raw);
      return [{
        id: 'local',
        name: (state.store && state.store.name) || 'Untitled Project',
        updated_at: new Date().toISOString()
      }];
    } catch (e) {
      return [];
    }
  }

  function removeLocalProject(id) {
    if (id === 'local') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  // ── Auto-Save Integration ──────────────────────────────────────────────

  let autoSaveTimer = null;
  let autoSaveEnabled = false;

  /**
   * Schedule an auto-save. Debounces to avoid excessive API calls.
   */
  function scheduleAutoSave(getStateFn) {
    if (!autoSaveEnabled || !backendAvailable) return;
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(async () => {
      try {
        const state = getStateFn();
        await saveProject(state);
      } catch (e) {
        console.warn('CatalogCraft: Auto-save to backend failed', e);
      }
    }, 2000); // 2 second debounce
  }

  function enableAutoSave() {
    autoSaveEnabled = true;
  }

  function disableAutoSave() {
    autoSaveEnabled = false;
    clearTimeout(autoSaveTimer);
  }

  // ── Public API ─────────────────────────────────────────────────────────

  window.CatalogCraftAPI = {
    // Connection
    checkBackend,
    isBackendAvailable,
    setBaseUrl: function(url) { baseUrl = url; },

    // Project CRUD
    createProject,
    updateProject,
    saveProject,
    loadProject,
    listProjects,
    deleteProject,
    duplicateProject,

    // Product CRUD
    addProduct,
    updateProduct,
    deleteProduct,

    // Auto-save
    scheduleAutoSave,
    enableAutoSave,
    disableAutoSave,

    // Current project
    getCurrentProjectId: function() { return currentProjectId; },
    setCurrentProjectId: function(id) { currentProjectId = id; },

    // localStorage fallback
    saveToLocalStorage,
    loadFromLocalStorage,

    // Utils
    stateToPayload
  };

})();
