import { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ContentEditor from './components/ContentEditor';
import initialSections, { generateId, STATUS } from './data/initialSections';
import './App.css';

function findSection(sections, id) {
  for (const s of sections) {
    if (s.id === id) return s;
    if (s.children) {
      const found = findSection(s.children, id);
      if (found) return found;
    }
  }
  return null;
}

function updateInTree(sections, id, patch) {
  return sections.map((s) => {
    if (s.id === id) return { ...s, ...patch };
    if (s.children) return { ...s, children: updateInTree(s.children, id, patch) };
    return s;
  });
}

function addChildInTree(sections, parentId, newChild) {
  return sections.map((s) => {
    if (s.id === parentId) {
      return { ...s, children: [...(s.children || []), newChild] };
    }
    if (s.children) {
      return { ...s, children: addChildInTree(s.children, parentId, newChild) };
    }
    return s;
  });
}

function deleteInTree(sections, id) {
  return sections
    .filter((s) => s.id !== id)
    .map((s) => {
      if (s.children) return { ...s, children: deleteInTree(s.children, id) };
      return s;
    });
}

function App() {
  const [sections, setSections] = useState(initialSections);
  const [selectedId, setSelectedId] = useState(null);

  const selectedSection = selectedId ? findSection(sections, selectedId) : null;

  const handleUpdate = useCallback((id, patch) => {
    setSections((prev) => updateInTree(prev, id, patch));
  }, []);

  const handleAddChild = useCallback(
    (parentId) => {
      const newChild = {
        id: generateId(),
        title: 'New Section',
        status: STATUS.DRAFT,
        content: '',
        children: [],
      };
      setSections((prev) => addChildInTree(prev, parentId, newChild));
      setSelectedId(newChild.id);
    },
    [],
  );

  const handleAddRoot = useCallback(() => {
    const newSection = {
      id: generateId(),
      title: 'New Section',
      status: STATUS.DRAFT,
      content: '',
      children: [],
    };
    setSections((prev) => [...prev, newSection]);
    setSelectedId(newSection.id);
  }, []);

  const handleDelete = useCallback(
    (id) => {
      setSections((prev) => deleteInTree(prev, id));
      if (selectedId === id) setSelectedId(null);
    },
    [selectedId],
  );

  return (
    <div className="app-layout">
      <Sidebar
        sections={sections}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onUpdate={handleUpdate}
        onAddChild={handleAddChild}
        onDelete={handleDelete}
        onAddRoot={handleAddRoot}
      />
      <ContentEditor section={selectedSection} onUpdate={handleUpdate} />
    </div>
  );
}

export default App;
