import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, query, onSnapshot, serverTimestamp } from 'firebase/firestore';

// Tabbatar an yi amfani da global variables da Canvas ya bayar
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Yanayin Aiki (Views)
const VIEWS = {
  SUBMIT: 'submit',
  REVIEW: 'review',
  DASHBOARD: 'dashboard'
};

const App = () => {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [reports, setReports] = useState([]);
  const [currentView, setCurrentView] = useState(VIEWS.DASHBOARD);
  const [isLoading, setIsLoading] = useState(true);
  const [newReport, setNewReport] = useState({ summary: '', location: '', evidenceUrl: '' });
  const [message, setMessage] = useState('');

  // 1. Shiga da kuma Fara Aiki da Firebase
  useEffect(() => {
    try {
      if (Object.keys(firebaseConfig).length === 0) {
        throw new Error("Firebase config ba a samar da shi ba.");
      }
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const firebaseAuth = getAuth(app);
      setDb(firestore);
      setAuth(firebaseAuth);

      const handleAuth = async () => {
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(firebaseAuth, initialAuthToken);
          } else {
            await signInAnonymously(firebaseAuth);
          }
        } catch (error) {
          console.error("Kuskuren shiga:", error);
        }
      };

      const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          setUserId(null);
        }
        setIsLoading(false);
      });

      handleAuth();
      return () => unsubscribe();
    } catch (error) {
      console.error("Kuskuren Fara Aiki da Firebase:", error);
      setIsLoading(false);
    }
  }, []);

  // 2. Sauraron Rahotanni a Real-Time
  useEffect(() => {
    if (db && userId) {
      // Wannan hanya ce ta PUBLIC (domin dukkan jami'an Intelligence za su iya ganin rahoton Unit ɗin)
      const reportsCollectionPath = `artifacts/${appId}/public/data/intelligenceReports`;
      const q = query(collection(db, reportsCollectionPath));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedReports = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate()); // Sabbin Rahotanni a sama
        setReports(fetchedReports);
      }, (error) => {
        console.error("Kuskuren sauraron Rahotanni:", error);
      });

      return () => unsubscribe();
    }
  }, [db, userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport(prev => ({ ...prev, [name]: value }));
  };

  const showNotification = (msg, duration = 3000) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), duration);
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!db || !userId) {
      showNotification("Ba a shiga ba ko kuma Firebase bai fara aiki ba.");
      return;
    }

    if (!newReport.summary || !newReport.location) {
      showNotification("Dole ne a cika Takaitaccen Bayani da Wurin da Matsalar Take.");
      return;
    }

    try {
      const reportsCollectionPath = `artifacts/${appId}/public/data/intelligenceReports`;
      const docRef = doc(collection(db, reportsCollectionPath));

      await setDoc(docRef, {
        ...newReport,
        reporterId: userId,
        createdAt: serverTimestamp(),
        status: 'Pending Verification'
      });

      setNewReport({ summary: '', location: '', evidenceUrl: '' });
      showNotification("An aika Rahoton Sirri cikin nasara! ✅");
      setCurrentView(VIEWS.REVIEW); // Koma shafin Dubawa
    } catch (error) {
      console.error("Kuskuren Aikawa Rahoto:", error);
      showNotification(`Kuskure: Ba a iya aika rahoton ba. ${error.message}`);
    }
  };
  
  // Raba sunan mai amfani don nuna shi a UI
  const displayUserId = userId ? `${userId.substring(0, 4)}...${userId.substring(userId.length - 4)}` : 'N/A';
  
  // Nuna Loading
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-slate-900 text-emerald-400 text-xl">
      <p>⏳ Ana shiga zuwa Intelligence Dashboard...</p>
    </div>;
  }
  
  // Taimakon Dashboard
  const Dashboard = () => (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-emerald-400 mb-6">Barka da Zuwa, Jami'in Hisbah!</h2>
      <p className="text-slate-300 mb-8">Wannan shine Dashboard na Unit ɗin ku. Anan ne zaku ga taƙaitaccen bayanin rahotannin da aka aiko.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-700 p-6 rounded-lg shadow-xl border-t-4 border-red-600">
          <p className="text-sm text-slate-400">Jimillar Rahotanni (Unit)</p>
          <p className="text-4xl font-extrabold text-white mt-1">{reports.length}</p>
        </div>
        <div className="bg-slate-700 p-6 rounded-lg shadow-xl border-t-4 border-red-600">
          <p className="text-sm text-slate-400">Rahotanni Na (Kaɗai)</p>
          <p className="text-4xl font-extrabold text-white mt-1">{reports.filter(r => r.reporterId === userId).length}</p>
        </div>
        <div className="bg-slate-700 p-6 rounded-lg shadow-xl border-t-4 border-red-600">
          <p className="text-sm text-slate-400">Jami'in (ID)</p>
          <p className="text-xl font-mono text-emerald-400 mt-3">{displayUserId}</p>
        </div>
      </div>
      
      <div className="mt-10 bg-slate-800 p-6 rounded-lg shadow-2xl">
        <h3 className="text-2xl font-bold text-red-400 mb-4">Muhimman Dokoki</h3>
        <ul className="space-y-3 text-slate-300">
          <li className="flex items-center"><span className="text-red-500 text-xl mr-2">🚨</span> Kada ka taɓa raba bayanan shiga.</li>
          <li className="flex items-center"><span className="text-red-500 text-xl mr-2">📝</span> Aika rahoton ka kawai bayan ka tattara cikakkiyar shaida.</li>
          <li className="flex items-center"><span className="text-red-500 text-xl mr-2">🤫</span> Kada a bayyana asalin mai aikawa a cikin bayanin rahoton.</li>
        </ul>
      </div>
    </div>
  );

  // Taimakon Aikawa Rahoto
  const SubmitReport = () => (
    <div className="p-4 md:p-8 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-emerald-400 mb-6">📝 Aika Rahoton Sirri</h2>
      <p className="text-slate-300 mb-6">Cika fom ɗin da ke ƙasa da bayanan sirri da ka tattara. Ka tabbatar da cewa Wuri da Bayani suna da cikakken bayani.</p>
      
      <form onSubmit={handleSubmitReport} className="space-y-6 bg-slate-800 p-6 rounded-lg shadow-xl">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-1">Wurin da Matsalar Take (Misali: Shagon XYZ, Kofar Arewa)</label>
          <input
            type="text"
            id="location"
            name="location"
            value={newReport.location}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-slate-300 mb-1">Bayani Dalla-Dalla (Abin da ya faru)</label>
          <textarea
            id="summary"
            name="summary"
            rows="4"
            value={newReport.summary}
            onChange={handleInputChange}
            placeholder="Misali: An ga wasu matasa suna siyar da kwaya a kusa da Masallacin Juma'a da misalin karfe 8:30 na dare..."
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="evidenceUrl" className="block text-sm font-medium text-slate-300 mb-1">Hanyar Shaida (Photo/Video Link, Idan Akwai)</label>
          <input
            type="url"
            id="evidenceUrl"
            name="evidenceUrl"
            value={newReport.evidenceUrl}
            onChange={handleInputChange}
            placeholder="Misali: https://drive.google.com/..."
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold transition duration-200 shadow-md"
        >
          Aika Rahoton (Confidential)
        </button>
      </form>
    </div>
  );

  // Taimakon Duba Rahotanni
  const ReviewReports = () => (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-emerald-400 mb-6">📑 Duba Rahotannin Unit</h2>
      <p className="text-slate-300 mb-6">Ga dukkan Rahotannin Sirri da Unit ɗin ku suka aiko. A yi amfani da su cikin sirri da kulawa sosai.</p>
      
      {reports.length === 0 ? (
        <p className="text-slate-400 bg-slate-800 p-4 rounded-lg text-center">Babu Rahoton Sirri da aka samu tukuna.</p>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-slate-800 p-4 rounded-lg shadow-lg border-l-4 border-red-500">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-white">{report.location}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${report.status === 'Pending Verification' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}>
                  {report.status}
                </span>
              </div>
              <p className="text-slate-400 mb-3">{report.summary}</p>
              <div className="text-sm text-slate-500 border-t border-slate-700 pt-2">
                <p>Mai Aikawa: <span className="font-mono">{report.reporterId === userId ? 'Kai (You)' : report.reporterId}</span></p>
                <p>Kwanan Wata: {report.createdAt?.toDate().toLocaleDateString('ha-NG') || 'Pending...'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Akwatin Sanarwa (Notification Box) */}
      {message && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 z-50 p-4 bg-emerald-600 text-white rounded-lg shadow-xl transition duration-300">
          {message}
        </div>
      )}

      {/* Taimakon Navigation */}
      <nav className="bg-slate-800 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-red-500 mr-2">🚨</span>
              <span className="text-xl font-bold text-white">Hisbah Intelligence</span>
            </div>
            <div className="flex space-x-4 items-center">
              <button
                onClick={() => setCurrentView(VIEWS.DASHBOARD)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${currentView === VIEWS.DASHBOARD ? 'bg-red-600' : 'text-slate-300 hover:bg-slate-700'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView(VIEWS.SUBMIT)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${currentView === VIEWS.SUBMIT ? 'bg-red-600' : 'text-slate-300 hover:bg-slate-700'}`}
              >
                Aika Rahoto
              </button>
              <button
                onClick={() => setCurrentView(VIEWS.REVIEW)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${currentView === VIEWS.REVIEW ? 'bg-red-600' : 'text-slate-300 hover:bg-slate-700'}`}
              >
                Duba Rahotanni
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Abubuwan da ke Cikin Shafin */}
      <div className="max-w-7xl mx-auto pb-10">
        {currentView === VIEWS.DASHBOARD && <Dashboard />}
        {currentView === VIEWS.SUBMIT && <SubmitReport />}
        {currentView === VIEWS.REVIEW && <ReviewReports />}
      </div>
      
       <footer className="bg-slate-800 text-center p-4 text-sm text-slate-500">
          Intelligence Unit User ID: {userId || 'Signing In...'}
      </footer>
    </div>
  );
};

export default App;
