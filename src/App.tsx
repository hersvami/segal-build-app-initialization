import { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ProjectForm } from './components/ProjectForm';
import { SendWelcomeEmailModal } from './components/SendWelcomeEmailModal';
import { VariationBuilder } from './components/VariationBuilder';
import { ExternalQuoteModal } from './components/ExternalQuoteModal';
import { ProjectChat } from './components/ProjectChat';
import { LoadingSpinner } from './components/LoadingSpinner';
import { VariationReport } from './components/report/VariationReport';
import type { ExternalQuoteReference, Project, Variation } from './types/domain';
import { usePersistedAppState, createProject, selectProject, deleteProject, createVariation, updateVariation, hasApprovedQuote } from './logic/state';
import { generateId } from './utils/helpers';
import { getCompanyById } from './constants/companies';
import { downloadProjectExport } from './utils/helpers';
import { calculateQuote } from './utils/pricing/quoteCalculator';

export default function App() {
  const { state, setState } = usePersistedAppState();
  const [showBuilder, setShowBuilder] = useState(false);
  const [showExternalBaselineModal, setShowExternalBaselineModal] = useState(false);
  const [builderDocType, setBuilderDocType] = useState<'quote' | 'variation'>('quote');

  const activeProject = state.projects.find(p => p.id === state.activeProjectId);
  const activeCompany = getCompanyById(state.activeCompanyId);
  const variations = state.activeProjectId ? (state.variations[state.activeProjectId] || []) : [];

  const handleNewProject = useCallback(() => {
    setState(prev => ({ ...prev, uiState: { ...prev.uiState, showProjectForm: true } }));
  }, [setState]);

  const handleCreateProject = useCallback((data: { name: string; address: string; customerName: string; customerEmail: string; customerPhone: string; heroPhoto?: string }) => {
    const project: Project = {
      id: generateId(),
      name: data.name,
      address: data.address,
      customer: { name: data.customerName, email: data.customerEmail, phone: data.customerPhone },
      companyId: state.activeCompanyId,
      createdAt: new Date().toISOString(),
      heroPhoto: data.heroPhoto,
    };
    setState(prev => createProject(prev, project));
  }, [setState, state.activeCompanyId]);

  const handleSelectProject = useCallback((id: string) => {
    setState(prev => selectProject(prev, id));
  }, [setState]);

  const handleDeleteProject = useCallback((id: string) => {
    if (!confirm('Delete this project and all its data? This cannot be undone.')) return;
    setState(prev => deleteProject(prev, id));
  }, [setState]);

  const handleExportProject = useCallback((id: string) => {
    const project = state.projects.find(p => p.id === id);
    if (!project) return;
    const data = {
      projectName: project.name,
      address: project.address,
      customer: project.customer,
      variations: state.variations[id] || [],
      exportedAt: new Date().toISOString(),
    };
    downloadProjectExport(data);
  }, [state.projects, state.variations]);

  const handleSaveVariation = useCallback((variation: Variation) => {
    if (!state.activeProjectId) return;
    setState(prev => createVariation(prev, state.activeProjectId!, variation));
    setShowBuilder(false);
  }, [setState, state.activeProjectId]);

  const handleUpdateVariation = useCallback((variation: Variation) => {
    if (!state.activeProjectId) return;
    setState(prev => updateVariation(prev, state.activeProjectId!, variation));
  }, [setState, state.activeProjectId]);

  const handleNewQuote = useCallback(() => {
    setBuilderDocType('quote');
    setShowBuilder(true);
  }, []);

  const handleNewVariation = useCallback(() => {
    if (!activeProject) return;
    if (!hasApprovedQuote(state, activeProject.id)) {
      setShowExternalBaselineModal(true);
      return;
    }
    setBuilderDocType('variation');
    setShowBuilder(true);
  }, [activeProject, state]);

  const handleSaveExternalBaseline = useCallback((payload: ExternalQuoteReference) => {
    if (!state.activeProjectId || !activeProject) return;
    const now = new Date().toISOString();
    const baseline: Variation = {
      id: generateId(),
      title: `External Quote Baseline - ${payload.referenceNumber}`,
      description: payload.summaryScope,
      status: 'approved',
      documentType: 'quote',
      source: 'external',
      externalQuoteRef: payload,
      scopes: [],
      pricing: calculateQuote(payload.originalApprovedAmount, activeCompany.defaultOverheadPercent, activeCompany.defaultProfitPercent, 0),
      changeLog: [
        {
          id: generateId(),
          action: 'external-baseline-linked',
          timestamp: now,
          user: 'Builder',
          details: `Linked external quote ${payload.referenceNumber}`,
        },
      ],
      createdAt: now,
      updatedAt: now,
      internalNotes: payload.notes ? [payload.notes] : [],
    };

    setState((prev) => createVariation(prev, state.activeProjectId!, baseline));
    setShowExternalBaselineModal(false);
    setBuilderDocType('variation');
    setShowBuilder(true);
  }, [activeCompany.defaultOverheadPercent, activeCompany.defaultProfitPercent, activeProject, setState, state.activeProjectId]);

  const handleBackToWelcome = useCallback(() => {
    setState(prev => ({ ...prev, uiState: { ...prev.uiState, view: 'welcome', showProjectForm: false, showWelcomeEmail: false }, activeProjectId: null }));
  }, [setState]);

  const handleSwitchCompany = useCallback((id: string) => {
    setState(prev => ({ ...prev, activeCompanyId: id }));
  }, [setState]);

  // Loading check
  if (!state) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar
        state={state}
        onSelectProject={handleSelectProject}
        onNewProject={handleNewProject}
        onDeleteProject={handleDeleteProject}
        onExportProject={handleExportProject}
        onSwitchCompany={handleSwitchCompany}
        onNewQuote={handleNewQuote}
        onNewVariation={handleNewVariation}
        onBackToWelcome={handleBackToWelcome}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {!activeProject && state.uiState.view === 'welcome' && (
          <WelcomeScreen company={activeCompany} onNewProject={handleNewProject} />
        )}

        {activeProject && (
          <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Project Header */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {activeProject.heroPhoto && (
                <div className="relative h-48 w-full">
                  <img src={activeProject.heroPhoto} alt={activeProject.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <h1 className="text-2xl font-bold text-white drop-shadow-lg">{activeProject.name}</h1>
                    <p className="text-sm text-white/80 mt-1">{activeProject.address}</p>
                  </div>
                  <div className="absolute top-4 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700">{variations.length} document(s)</div>
                  </div>
                </div>
              )}
              <div className={`p-6 ${activeProject.heroPhoto ? 'pt-4' : ''}`}>
                <div className="flex items-start justify-between">
                  <div>
                    {!activeProject.heroPhoto && <h1 className="text-2xl font-bold text-slate-900">{activeProject.name}</h1>}
                    {!activeProject.heroPhoto && <p className="text-sm text-slate-500 mt-1">{activeProject.address}</p>}
                    <p className="text-sm text-slate-500">Customer: {activeProject.customer.name} ({activeProject.customer.email}){activeProject.customer.phone && ` | ${activeProject.customer.phone}`}</p>
                  </div>
                  <div className="text-right">
                    {!activeProject.heroPhoto && <div className="text-sm text-slate-500">{variations.length} document(s)</div>}
                    {hasApprovedQuote(state, activeProject.id) && (
                      <span className="inline-block mt-1 px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">Quote Approved</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Variations / Reports */}
            {variations.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-900">Documents</h2>
                {variations.map(v => (
                  <VariationReport
                    key={v.id}
                    variation={v}
                    project={activeProject}
                    company={activeCompany}
                    onUpdate={handleUpdateVariation}
                  />
                ))}
              </div>
            )}

            {variations.length === 0 && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">No documents yet</h2>
                <p className="text-slate-500 mb-4">Create your first quote to get started, then issue variations as needed.</p>
                <button onClick={handleNewQuote} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                  Create First Quote
                </button>
              </div>
            )}

            {/* Project Chat */}
            <ProjectChat project={activeProject} />
          </div>
        )}
      </div>

      {/* Modals */}
      {state.uiState.showProjectForm && (
        <ProjectForm onSubmit={handleCreateProject} onCancel={() => setState(prev => ({ ...prev, uiState: { ...prev.uiState, showProjectForm: false } }))} />
      )}

      {state.uiState.showWelcomeEmail && activeProject && (
        <SendWelcomeEmailModal
          projectName={activeProject.name}
          customerName={activeProject.customer.name}
          customerEmail={activeProject.customer.email}
          customerPhone={activeProject.customer.phone}
          company={activeCompany}
          onClose={() => setState(prev => ({ ...prev, uiState: { ...prev.uiState, showWelcomeEmail: false } }))}
        />
      )}

      {showBuilder && activeProject && (
        <VariationBuilder
          project={activeProject}
          documentType={builderDocType}
          existingQuotes={variations}
          companyOH={activeCompany.defaultOverheadPercent}
          companyProfit={activeCompany.defaultProfitPercent}
          onSave={handleSaveVariation}
          onCancel={() => setShowBuilder(false)}
        />
      )}

      {showExternalBaselineModal && (
        <ExternalQuoteModal
          onCancel={() => setShowExternalBaselineModal(false)}
          onSubmit={handleSaveExternalBaseline}
        />
      )}
    </div>
  );
}
