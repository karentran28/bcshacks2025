from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import subprocess
import json
import os

app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/", methods=["GET"])
def home():
    return "MicDrop backend is running! 🎤"

@app.route("/run-low", methods=["POST"])
@cross_origin()  
def run_low():
    try:
        print("Received /run-low request")  # Add this line

        #run low.py
        subprocess.run(["python3", "low.py"], check=True)

        #open and parse file
        with open("low_note_pitch.json", "r") as f:
            data = json.load(f) 

        #return proper file in json format
        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5050)
