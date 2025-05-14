import React, { useEffect, useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonToggle,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonList,
  IonItem,
  IonText,
  IonButton,
  IonFab,
  IonFabButton,
} from '@ionic/react';

const AttendanceTracker: React.FC = () => {
  const STORAGE_KEY_STUDENTS = 'attendance_students';
  const STORAGE_KEY_ATTENDANCE = 'attendance_records';

  const [students, setStudents] = useState<string[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<{ [date: string]: { [name: string]: boolean } }>({});
  const [currentView, setCurrentView] = useState<'mark' | 'history'>('mark');
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDate());

  const [newStudentName, setNewStudentName] = useState<string>('');

  // For FAB form inputs & toggle
  const [showFabForm, setShowFabForm] = useState(false);
  const [fabName, setFabName] = useState('');
  const [fabDate, setFabDate] = useState(getTodayDate());

  // For editing student names
  const [editingStudent, setEditingStudent] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState<string>('');

  function getTodayDate() {
    const d = new Date();
    return d.toISOString().substring(0, 10);
  }

  useEffect(() => {
    loadFromStorage();
    setSelectedDate(getTodayDate());
  }, []);

  const loadFromStorage = () => {
    const storedStudents = localStorage.getItem(STORAGE_KEY_STUDENTS);
    const storedRecords = localStorage.getItem(STORAGE_KEY_ATTENDANCE);
    setStudents(storedStudents ? JSON.parse(storedStudents) : []);
    setAttendanceRecords(storedRecords ? JSON.parse(storedRecords) : {});
  };

  const saveStudents = (updatedStudents: string[]) => {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(updatedStudents));
  };

  const saveAttendanceRecords = (updatedRecords: { [date: string]: { [name: string]: boolean } }) => {
    localStorage.setItem(STORAGE_KEY_ATTENDANCE, JSON.stringify(updatedRecords));
  };

  // Original addStudent from input on main view
  const addStudent = () => {
    const trimmedName = newStudentName.trim();
    if (!trimmedName || students.includes(trimmedName)) return;
    const updatedStudents = [...students, trimmedName];
    setStudents(updatedStudents);
    saveStudents(updatedStudents);
    setNewStudentName('');
  };

  // Add student from FAB form with date input
  const addStudentWithFab = () => {
    const trimmedName = fabName.trim();
    if (!trimmedName) return;
    if (!students.includes(trimmedName)) {
      const updatedStudents = [...students, trimmedName];
      setStudents(updatedStudents);
      saveStudents(updatedStudents);
    }
    if (!attendanceRecords[fabDate]) {
      attendanceRecords[fabDate] = {};
      setAttendanceRecords({ ...attendanceRecords });
      saveAttendanceRecords(attendanceRecords);
    }
    setFabName('');
    setFabDate(getTodayDate());
    setShowFabForm(false);
  };

  const markAttendance = (name: string, present: boolean) => {
    const updatedRecords = { ...attendanceRecords };
    if (!updatedRecords[selectedDate]) {
      updatedRecords[selectedDate] = {};
    }
    updatedRecords[selectedDate][name] = present;
    setAttendanceRecords(updatedRecords);
    saveAttendanceRecords(updatedRecords);
  };

  // DELETE student function
  const deleteStudent = (nameToDelete: string) => {
    const updatedStudents = students.filter((name) => name !== nameToDelete);

    // Remove from attendance records
    const updatedAttendanceRecords = { ...attendanceRecords };
    for (const date in updatedAttendanceRecords) {
      if (updatedAttendanceRecords[date][nameToDelete] !== undefined) {
        delete updatedAttendanceRecords[date][nameToDelete];
      }
    }

    setStudents(updatedStudents);
    setAttendanceRecords(updatedAttendanceRecords);
    saveStudents(updatedStudents);
    saveAttendanceRecords(updatedAttendanceRecords);

    // If we were editing this student, cancel edit mode
    if (editingStudent === nameToDelete) {
      setEditingStudent(null);
      setEditNameValue('');
    }
  };

  // START editing a student name
  const startEditing = (name: string) => {
    setEditingStudent(name);
    setEditNameValue(name);
  };

  // CANCEL editing
  const cancelEditing = () => {
    setEditingStudent(null);
    setEditNameValue('');
  };

  // SAVE edited student name
  const saveEditedName = () => {
    const trimmedNewName = editNameValue.trim();
    if (!trimmedNewName) return;
    if (students.includes(trimmedNewName) && trimmedNewName !== editingStudent) return; // avoid duplicates

    if (editingStudent) {
      const updatedStudents = students.map((name) => (name === editingStudent ? trimmedNewName : name));
      const updatedAttendanceRecords = { ...attendanceRecords };
      for (const date in updatedAttendanceRecords) {
        if (updatedAttendanceRecords[date][editingStudent]) {
          updatedAttendanceRecords[date][trimmedNewName] = updatedAttendanceRecords[date][editingStudent];
          delete updatedAttendanceRecords[date][editingStudent];
        }
      }

      setStudents(updatedStudents);
      setAttendanceRecords(updatedAttendanceRecords);
      saveStudents(updatedStudents);
      saveAttendanceRecords(updatedAttendanceRecords);

      setEditingStudent(null);
      setEditNameValue('');
    }
  };

  const renderStudentsList = () => {
    if (students.length === 0) {
      return (
        <IonText color="medium" className="ion-text-center" style={{ marginTop: '1rem' }}>
          No students added yet.
        </IonText>
      );
    }

    return (
      <IonList>
        {students.map((name) => {
          const isPresent = attendanceRecords[selectedDate]?.[name] ?? false;
          const isEditing = editingStudent === name;

          return (
            <IonItem key={name}>
              {isEditing ? (
                <>
                  <IonInput
                    value={editNameValue}
                    onIonInput={(e) => setEditNameValue(e.detail.value!)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEditedName();
                      if (e.key === 'Escape') cancelEditing();
                    }}
                    autofocus
                    style={{ flex: 1 }}
                  />
                  <IonButton size="small" onClick={saveEditedName} style={{ marginLeft: '8px' }}>
                    Save
                  </IonButton>
                  <IonButton size="small" color="medium" onClick={cancelEditing} style={{ marginLeft: '8px' }}>
                    Cancel
                  </IonButton>
                </>
              ) : (
                <>
                  <IonLabel onClick={() => startEditing(name)} style={{ flex: 1, cursor: 'pointer' }}>
                    {name}
                  </IonLabel>
                  <IonToggle checked={isPresent} onIonChange={(e) => markAttendance(name, e.detail.checked)} />
                  <IonButton
                    color="danger"
                    size="small"
                    onClick={() => deleteStudent(name)}
                    style={{ marginLeft: '8px' }}
                  >
                    Delete
                  </IonButton>
                </>
              )}
            </IonItem>
          );
        })}
      </IonList>
    );
  };

  const renderHistoryList = () => {
    if (students.length === 0) {
      return (
        <IonText color="medium" className="ion-text-center" style={{ marginTop: '1rem' }}>
          No students added yet.
        </IonText>
      );
    }

    const dayAttendance = attendanceRecords[selectedDate] || {};

    return (
      <>
        <IonText
          className="ion-text-center"
          style={{ fontWeight: 600, fontSize: '1.2rem', marginBottom: '1rem', display: 'block' }}
        >
          Attendance for {selectedDate}
        </IonText>
        <IonList>
          {students.map((name) => (
            <IonItem key={name}>
              <IonLabel>{name}</IonLabel>
              <IonText color={dayAttendance[name] ? 'success' : 'danger'}>
                {dayAttendance[name] ? 'Present' : 'Absent'}
              </IonText>
            </IonItem>
          ))}
        </IonList>
      </>
    );
  };

  const changeDate = (offsetDays: number) => {
    const dateObj = new Date(selectedDate);
    dateObj.setDate(dateObj.getDate() + offsetDays);
    setSelectedDate(dateObj.toISOString().substring(0, 10));
  };

  return (
    <IonCard style={{ width: '100%', margin: 0 }}>
      <IonCardHeader>
        <IonCardTitle>Attendance Tracker</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonSegment value={currentView} onIonChange={(e) => setCurrentView(e.detail.value as 'mark' | 'history')}>
          <IonSegmentButton value="mark">
            <IonLabel>Mark Attendance</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="history">
            <IonLabel>View History</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {currentView === 'mark' && (
          <>
            <IonText
              style={{
                fontWeight: 'bold',
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
                display: 'block',
              }}
            >
              Students Today
            </IonText>

            {renderStudentsList()}

            {/* FAB Button and expandable form */}
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton onClick={() => setShowFabForm(!showFabForm)}>{showFabForm ? '×' : '+'}</IonFabButton>

              {showFabForm && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '60px',
                    right: '0',
                    background: 'white',
                    padding: '10px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    width: '220px',
                    zIndex: 10,
                  }}
                >
                  <IonInput
                    type="date"
                    value={fabDate}
                    onIonInput={(e) => setFabDate(e.detail.value!)}
                    style={{ marginBottom: '8px' }}
                  />
                  <IonInput
                    placeholder="Enter student name"
                    value={fabName}
                    onIonInput={(e) => setFabName(e.detail.value!)}
                    style={{ marginBottom: '8px' }}
                  />
                  <IonButton expand="block" onClick={addStudentWithFab} disabled={!fabName.trim()}>
                    Add Student
                  </IonButton>
                </div>
              )}
            </IonFab>
          </>
        )}

        {currentView === 'history' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
              <IonButton color="medium" size="small" onClick={() => changeDate(-1)}>
                &lt; Prev
              </IonButton>
              <IonLabel style={{ margin: '0 10px', fontWeight: 600, fontSize: '1.2rem' }}>{selectedDate}</IonLabel>
              <IonButton color="medium" size="small" onClick={() => changeDate(1)}>
                Next &gt;
              </IonButton>
            </div>
            {renderHistoryList()}
          </>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default AttendanceTracker;
