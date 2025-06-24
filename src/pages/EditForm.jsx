import React from 'react';
import '../styles/editform.css'; // reuse addbook.css or use this

const EditBook = () => {
  return (
    <div className="edit-book-page">
      <div className="form-container">
        <h1 className="form-title">Edit Book</h1>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input type="text" placeholder="Book title" defaultValue="The Alchemist" />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input type="text" placeholder="Author name" defaultValue="Paulo Coelho" />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="Description">An inspiring story about chasing dreams.</textarea>
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input type="number" placeholder="Price" defaultValue="499" />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input type="number" placeholder="Stock quantity" defaultValue="10" />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select defaultValue="Fiction">
              <option>Fiction</option>
              <option>Non Fiction</option>
              <option>Romance</option>
              <option>Mystery & Thriller</option>
              <option>Sci-fi</option>
              <option>Biography</option>
              <option>Children</option>
              <option>Fantasy</option>
              <option>Comic & Graphics Novels</option>
              <option>Business & Economics</option>
              <option>Poetry</option>
              <option>Others</option>
            </select>
          </div>

          <div className="form-group">
            <label>Rating (0 - 5)</label>
            <input type="number" placeholder="Rating" defaultValue="4.8" />
          </div>

          <div className="form-group">
            <label>Change Cover Image</label>
            <input type="file" accept="image/*" />
          </div>

          <button type="submit" className="submit-btn">Update Book</button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
