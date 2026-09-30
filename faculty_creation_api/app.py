from flask import Flask
from flask_cors import CORS
from routes.faculty_routes import faculty_bp

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(faculty_bp, url_prefix='/api')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)