from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app, origins=["*"])
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Hello, World!"})
@app.route("/signup", methods=["POST"])
def signup():
    try:
        request_data = request.get_json()
        name = request_data.get("name")
        email = request_data.get("email")
        password = request_data.get("password")
        if not name or not email or not password:
            return jsonify({"error": "Missing required fields"}), 400
        print(f"Name: {name}, Email: {email}, Password: {password}")
        return jsonify({"message": "User signed up successfully!"})
    except Exception as e:
        return jsonify({"error": "Error occurred while signing up user"}), 400
if __name__== "__main__":
    app.run(host = "0.0.0.0", port = 5000)