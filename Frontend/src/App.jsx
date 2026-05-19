import axios from 'axios';
import { useState, useEffect } from 'react';
import Auth from './components/Auth'; 

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:5000/get-all-books')
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/add-book', { title, author, price })
      .then(() => {
        alert("Book Added!");
        fetchBooks();
        setTitle(''); setAuthor(''); setPrice(''); 
      });
  };

  const handleEdit = (book) => {
    setEditId(book._id);
    setTitle(book.title);
    setAuthor(book.author);
    setPrice(book.price);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/update-book/${editId}`, { title, author, price })
      .then(() => {
        alert("Book Updated!");
        setEditId(null);
        setTitle(''); setAuthor(''); setPrice('');
        fetchBooks();
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      axios.delete(`http://localhost:5000/delete-book/${id}`).then(() => fetchBooks());
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setEditId(null);
    setTitle(''); setAuthor(''); setPrice('');
  };

  if (!currentUser) {
    return <Auth onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-gray-800">

      <div className="max-w-6xl mx-auto flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-600">Logged in as: <strong className="text-gray-900">{currentUser.email}</strong></span>
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
            currentUser.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
          }`}>
            {currentUser.role}
          </span>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-4 py-2 rounded-lg text-sm transition-all active:scale-95">
          Logout 
        </button>
      </div>

      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10">
        Library Management System
      </h1>

      {currentUser.role === 'admin' ? (
        <form 
          onSubmit={editId ? handleUpdate : handleAddBook} 
          className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-12">
          <h3 className="text-xl font-bold mb-6 text-center text-gray-700">
            {editId ? "Edit Book Details" : "Add New Book"}
          </h3>
          
          <div className="flex flex-col gap-4">
            <input 
              required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} 
            />
            <input 
              required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} 
            />
            <input 
              required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} 
            />
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all active:scale-95"
            >
              {editId ? "Save Changes" : "Add to Collection"}
            </button>

            {editId && (
              <button 
                type="button"
                onClick={() => { setEditId(null); setTitle(''); setAuthor(''); setPrice(''); }}
                className="text-gray-400 hover:text-gray-600 text-sm font-medium mt-1"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="max-w-md mx-auto bg-blue-50 text-blue-700 p-4 rounded-xl text-center font-medium border border-blue-100 mb-12">
          💡 You are logged in as a <strong>Student</strong>. You have read-only access to search and view library files.
        </div>
      )}
      
      <div className="max-w-6xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Author name..."
            className="w-full p-4 pl-12 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-4 top-4 text-gray-400">🔍</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {books
          .filter((book) => 
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((book) => (
          <div key={book._id} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-all">
            <h4 className="text-xl font-bold text-gray-800 truncate">{book.title}</h4>
            <p className="text-gray-500 mb-4 italic">by {book.author}</p>
            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-2xl font-black text-green-600">${book.price}</span>
              
              {currentUser.role === 'admin' && (
                <div className="flex gap-3">
                  <button onClick={() => handleEdit(book)} className="text-blue-500 hover:underline text-sm font-bold">Edit</button>
                  <button onClick={() => handleDelete(book._id)} className="text-red-400 hover:text-red-600 text-sm font-bold">Remove</button>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;