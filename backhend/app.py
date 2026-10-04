from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # allow frontend to connect

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["campuskit"]

# Lost & Found API
@app.route("/lostfound", methods=["POST"])
def add_item():
    data = request.json
    db.lostfound.insert_one(data)
    return jsonify({"message": "Item added!"})

@app.route("/lostfound", methods=["GET"])
def get_items():
    items = list(db.lostfound.find({}, {"_id":0}))
    return jsonify(items)

# Study Planner API
@app.route("/planner", methods=["POST"])
def add_plan():
    data = request.json
    db.planner.insert_one(data)
    return jsonify({"message": "Plan added!"})

@app.route("/planner", methods=["GET"])
def get_plans():
    plans = list(db.planner.find({}, {"_id":0}))
    return jsonify(plans)

if __name__ == "__main__":
    app.run(debug=True)
