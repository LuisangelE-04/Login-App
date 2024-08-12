from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_cors import CORS


mongo = PyMongo()
jwt = JWTManager()


def create_app():
  app = Flask(__name__)
  app.config.from_object('backend.config.Config')

  mongo.init_app(app)
  jwt.init_app(app)
  CORS(app, origins=["http://10.0.0.149:3000"])

  from backend.routes import main as main_blueprint
  app.register_blueprint(main_blueprint)

  return app