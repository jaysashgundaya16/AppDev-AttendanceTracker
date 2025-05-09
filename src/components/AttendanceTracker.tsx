import React, { useEffect, useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonToggle,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonList,
  IonItem,
  IonText,
} from '@ionic/react';


const AttendanceTracker: React.FC = () => {
  const STORAGE_KEY_STUDENTS = 'attendance_students';
  const STORAGE_KEY_ATTENDANCE = 'attendance_records';

  const [students, setStudents] = useState<string[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<{ [date: string]: { [name: string]: boolean } }>({});
  const [currentView, setCurrentView] = useState<'mark' | 'history'>('mark');
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDate());
  const [newStudentName, setNewStudentName] = useState<string>('');

  function getTodayDate() {
    const d = new Date();
    return d.toISOString().substring(0, 10);
  }

  useEffect(() => {
    loadFromStorage();
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

  const addStudent = () => {
    const trimmedName = newStudentName.trim();
    if (!trimmedName || students.includes(trimmedName)) return;
    const updatedStudents = [...students, trimmedName];
    setStudents(updatedStudents);
    saveStudents(updatedStudents);
    setNewStudentName('');
  };

  const markAttendance = (name: string, present: boolean) => {
    const updatedRecords = { ...attendanceRecords };
    if (!updatedRecords[selectedDate]) updatedRecords[selectedDate] = {};
    updatedRecords[selectedDate][name] = present;
    setAttendanceRecords(updatedRecords);
    saveAttendanceRecords(updatedRecords);
  };

  const renderStudentsList = () => {
    if (students.length === 0) {
      return <IonText color="medium" className="ion-text-center" style={{ marginTop: '1rem' }}>No students added yet.</IonText>;
    }
    return (
      <IonList>
        {students.map(name => {
          const isPresent = attendanceRecords[selectedDate]?.[name] || false;
          return (
            <IonItem key={name}>
              <IonLabel>{name}</IonLabel>
              <IonToggle checked={isPresent} onIonChange={e => markAttendance(name, e.detail.checked)} />
            </IonItem>
          );
        })}
      </IonList>
    );
  };

  const renderHistoryList = () => {
    if (students.length === 0) {
      return <IonText color="medium" className="ion-text-center" style={{ marginTop: '1rem' }}>No students added yet.</IonText>;
    }
    const dayAttendance = attendanceRecords[selectedDate] || {};
    return (
      <>
        <IonText className="ion-text-center" style={{ fontWeight: 600, fontSize: '1.2rem', marginBottom: '1rem', display: 'block' }}>
          Attendance for {selectedDate}
        </IonText>
        <IonList>
          {students.map(name => (
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
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Attendance Tracker</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonSegment value={currentView} onIonChange={e => setCurrentView(e.detail.value as 'mark' | 'history')}>
          <IonSegmentButton value="mark">
            <IonLabel>Mark Attendance</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="history">
            <IonLabel>View History</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {currentView === 'mark' && (
          <>
            <IonInput
              placeholder="Enter student name"
              value={newStudentName}
              onIonInput={e => setNewStudentName(e.detail.value!)}
              clearInput
            />
            <IonButton disabled={!newStudentName.trim()} expand="block" onClick={addStudent} style={{ marginTop: '0.5rem' }}>
              Add
            </IonButton>
            {renderStudentsList()}
          </>
        )}

        {currentView === 'history' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
              <IonButton color="medium" size="small" onClick={() => changeDate(-1)}>&lt; Prev</IonButton>
              <IonLabel style={{ margin: '0 10px', fontWeight: 600, fontSize: '1.2rem' }}>{selectedDate}</IonLabel>
              <IonButton color="medium" size="small" onClick={() => changeDate(1)}>Next &gt;</IonButton>
            </div>
            {renderHistoryList()}
          </>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default AttendanceTracker;
