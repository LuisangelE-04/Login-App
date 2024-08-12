from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from flask_pymongo import PyMongo
from pymongo import MongoClient
from . import mongo


main = Blueprint('main', __name__)



@main.route('/register', methods=['POST'])
def register():
  username = request.json.get('username')
  password = request.json.get('password')
  if mongo.db.users.find_one({'username': username}):
    return jsonify({"msg": "User already exists"}), 400
  mongo.db.users.insert_one({'username': username, 'password': password})

  return jsonify({"msg": "Registered successfully!"}), 201


@main.route('/login', methods=['POST'])
def login():
  username = request.json.get('username')
  password = request.json.get('password')
  user = mongo.db.users.find_one({'username': username})
  if user and user['password'] == password:
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)
  
  return jsonify({"msg": "Incorrect username or password"}), 401

