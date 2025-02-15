import styles from './ResumePreview.module.css';

export default function ResumePreview({ data, sections }) {
  return (
    <div id="resume-preview" className={styles.preview}>
      {sections.map(section => 
        section.visible && (
          <div key={section.id} className={styles.section}>
            {section.type === 'personal' ? (
              <div className={styles.header}>
                <h1 className={styles.name}>{data.personal?.name || 'Your Name'}</h1>
                <div className={styles.contactInfo}>
                  {data.personal?.email && <span>{data.personal.email}</span>}
                  {data.personal?.phone && <span>{data.personal.phone}</span>}
                  {data.personal?.website && <span>{data.personal.website}</span>}
                  {data.personal?.location && <span>{data.personal.location}</span>}
                </div>
              </div>
            ) : (
              <>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                {data[section.type]?.map((entry, index) => (
                  <div key={index} className={styles.entryItem}>
                    {section.fields.map(field => {
                      if (field === 'list') return null;
                      if (!entry[field]) return null;
                      
                      return (
                        <div key={field} className={styles.entryRow}>
                          <span className={styles.entryLabel}>
                            {field.charAt(0).toUpperCase() + field.slice(1)}:
                          </span>
                          <span className={styles.entryValue}>{entry[field]}</span>
                        </div>
                      );
                    })}
                    {section.type === 'skills' && entry.list && (
                      <div className={styles.skillsList}>
                        {entry.list.split(',').map((skill, i) => (
                          <span key={i} className={styles.skillTag}>
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )
      )}
    </div>
  );
}