from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@db:5432/bookshare'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50), nullable=False)

db.create_all()

@app.route('/')
def home():
    return "Welcome to the Book Share API!", 200

@app.route('/books', methods=['POST'])
def add_book():
    data = request.json
    book = Book(title=data['title'], author=data['author'], genre=data['genre'])
    db.session.add(book)
    db.session.commit()
    return jsonify({"message": "Book added successfully!"}), 201

@app.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    books_list = [{"id": b.id, "title": b.title, "author": b.author, "genre": b.genre} for b in books]
    return jsonify(books_list), 200

@app.route('/books/<int:id>', methods=['GET'])
def get_book(id):
    book = Book.query.get_or_404(id)
    return jsonify({"id": book.id, "title": book.title, "author": book.author, "genre": book.genre}), 200

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
