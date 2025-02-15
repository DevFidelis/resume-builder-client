import { useState } from 'react';
import { 
  FiPlus, 
  FiArrowUp, 
  FiArrowDown, 
  FiEye, 
  FiEyeOff, 
  FiEdit 
} from 'react-icons/fi';
import styles from './ResumeSection.module.css';

export default function ResumeSection({
  index,
  section,
  data,
  totalSections,
  onMoveUp,
  onMoveDown,
  onToggleVisibility,
  onChange,
  onAddEntry,
  onChangeTitle
}) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(section.title);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitleInput(newTitle);
    onChangeTitle(newTitle);
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleContainer}>
          {editingTitle ? (
            <input
              type="text"
              value={titleInput}
              onChange={handleTitleChange}
              onBlur={() => setEditingTitle(false)}
              className={styles.titleInput}
              autoFocus
            />
          ) : (
            <div 
              className={styles.titleWrapper} 
              onClick={() => setEditingTitle(true)}
            >
              <h3 className={styles.sectionTitle}>{titleInput}</h3>
              <FiEdit className={styles.editIcon} />
            </div>
          )}
        </div>
        <div className={styles.sectionControls}>
          <button onClick={onToggleVisibility} className={styles.iconButton}>
            {section.visible ? <FiEye /> : <FiEyeOff />}
          </button>
          <button 
            onClick={onMoveUp} 
            disabled={index === 0} 
            className={styles.iconButton}
          >
            <FiArrowUp />
          </button>
          <button 
            onClick={onMoveDown} 
            disabled={index === totalSections - 1} 
            className={styles.iconButton}
          >
            <FiArrowDown />
          </button>
        </div>
      </div>

      <div className={styles.sectionContent}>
        {(Array.isArray(data) ? data : [data]).map((entry, entryIndex) => (
          <div key={entryIndex} className={styles.sectionEntry}>
            {section.fields.map((field) => (
              field === 'description' ? (
                <textarea
                  key={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={entry[field] || ''}
                  onChange={(e) => onChange(field, e.target.value, entryIndex)}
                  className={styles.textareaField}
                  rows="3"
                />
              ) : (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={entry[field] || ''}
                  onChange={(e) => onChange(field, e.target.value, entryIndex)}
                  className={styles.inputField}
                />
              )
            ))}
          </div>
        ))}
        {Array.isArray(data) && (
          <button onClick={onAddEntry} className={styles.addEntryButton}>
            <FiPlus /> Add {section.type === 'work' ? 'Experience' : 'Entry'}
          </button>
        )}
      </div>
    </div>
  );
}