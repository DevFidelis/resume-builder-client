import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import ResumeSection from '../ResumeSection/ResumeSection';
import ResumePreview from '../ResumePreview/ResumePreview';
import Toolbar from '../Toolbar/Toolbar';
import styles from './ResumeCreator.module.css';

const DEFAULT_SECTIONS = [
  {
    id: 'personal',
    type: 'personal',
    title: 'Personal Details',
    fields: ['name', 'email', 'phone', 'website', 'location'],
    visible: true
  },
  {
    id: 'work',
    type: 'work',
    title: 'Work Experience',
    fields: ['company', 'role', 'dates', 'description'],
    visible: true
  },
  {
    id: 'education',
    type: 'education',
    title: 'Education',
    fields: ['institution', 'degree', 'dates'],
    visible: true
  },
  {
    id: 'skills',
    type: 'skills',
    title: 'Skills',
    fields: ['list'],
    visible: true
  }
];

export default function ResumeCreator() {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : {
      personal: { name: '', email: '', phone: '', website: '', location: '' },
      work: [{}],
      education: [{}],
      skills: [{}],
      custom: []
    };
  });

  const [sections, setSections] = useState(() => {
    const saved = localStorage.getItem('sections');
    return saved ? JSON.parse(saved) : DEFAULT_SECTIONS;
  });

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    localStorage.setItem('sections', JSON.stringify(sections));
  }, [resumeData, sections]);

  const handleSectionChange = (sectionType, entryIndex, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [sectionType]: Array.isArray(prev[sectionType]) 
        ? prev[sectionType].map((item, i) => 
            i === entryIndex ? { ...item, [field]: value } : item
          )
        : { ...prev[sectionType], [field]: value }
    }));
  };

  const addSectionEntry = (sectionType) => {
    setResumeData(prev => ({
      ...prev,
      [sectionType]: [...prev[sectionType], {}]
    }));
  };

  const moveSection = (index, direction) => {
    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[index + direction];
    newSections[index + direction] = temp;
    
    setSections(newSections);
    
    // Reorder data to match sections
    const newData = {};
    newSections.forEach(section => {
      newData[section.type] = resumeData[section.type];
    });
    setResumeData({ ...resumeData, ...newData });
  };

  const toggleSectionVisibility = (index) => {
    const newSections = [...sections];
    newSections[index].visible = !newSections[index].visible;
    setSections(newSections);
  };

  const addCustomSection = () => {
    const newSection = {
      id: `custom-${Date.now()}`,
      type: `custom-${Date.now()}`,
      title: 'New Section',
      fields: ['Field 1'],
      visible: true
    };
    setSections([...sections, newSection]);
    setResumeData(prev => ({
      ...prev,
      [newSection.type]: [{}]
    }));
  };

  return (
    <div className={styles.resumeApp}>
      <Toolbar
        resumeData={resumeData}
        onTemplateChange={() => {}}
        onPDFUpload={(parsedData) => {
          setResumeData(prev => ({
            ...prev,
            personal: {
              ...prev.personal,
              ...parsedData.personal
            },
            work: parsedData.work || prev.work,
            education: parsedData.education || prev.education,
            skills: parsedData.skills || prev.skills,
          }));
        }}
      />

      <div className={styles.editorPreviewContainer}>
        <div className={styles.editorPanel}>
          {sections.map((section, index) => (
            <ResumeSection
              key={section.id}
              index={index}
              section={section}
              data={resumeData[section.type]}
              totalSections={sections.length}
              onMoveUp={() => moveSection(index, -1)}
              onMoveDown={() => moveSection(index, 1)}
              onToggleVisibility={() => toggleSectionVisibility(index)}
              onChangeTitle={(newTitle) => {
                const newSections = [...sections];
                newSections[index].title = newTitle;
                setSections(newSections);
              }}
              onChange={(field, value, entryIndex) => 
                handleSectionChange(section.type, entryIndex, field, value)
              }
              onAddEntry={() => addSectionEntry(section.type)}
            />
          ))}
          <button 
            onClick={addCustomSection}
            className={styles.addSectionButton}
          >
            <FiPlus /> Add Custom Section
          </button>
        </div>

        <div className={styles.previewPanel}>
          <ResumePreview data={resumeData} sections={sections} />
        </div>
      </div>
    </div>
  );
}