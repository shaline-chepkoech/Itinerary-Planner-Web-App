from flask import Flask, jsonify
from flask_restx import Api, Resource
from config import DevConfig
from models import User
from exts import db
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object(DevConfig)
CORS(app)
api = Api(app, doc='/docs')

@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {'message': 'Hello, World!'}
    
@app


DB_CONFIG ={ 
    "dbname":"postgres",
    "user": "postgres.aavlsynffybvvklwhczu",
    "password": "Password@27?",
    "host": "aws-0-ap-south-1.pooler.supabase.com",
    "port": "5432",  
}


app.config['SQLALCHEMY_DATABASE_URI']=f"postgresql://{DB_CONFIG['user']}:{DB_CONFIG['password']}@{DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['dbname']}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db = SQLAlchemy(app) 


migrate = Migrate(app, db)



   
        
class Itinerary(db.Model):
    __tablename__ = "Itineraries"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    details = db.Column(db.String(100), nullable=False)
    #budgets = db.relationship('Budget', backref='itinerary')
    date = db.Column(db.Date, nullable=False)
    
    def __init__(self, user_id, destination, date, details, budgets):
        self.user_id = user_id
        self.destination = destination
        self.date = date
        self.details = details
        #self.budgets = budgets
        
        
class Activity(db.Model):
    __tablename__ = "Activities"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    itinerary_id = db.Column(db.Integer, db.ForeignKey('Itineraries.id'), nullable=False)
    activity_name = db.Column(db.String(100), nullable=False)
    duration = db.Column(db.String(10), nullable=False)
    
    def __init__(self, itinerary_id, activity_name, duration):
        self.itinerary_id = itinerary_id
        self.activity_name = activity_name
        self.duration = duration
        
        
class Budget(db.model):
    __tablename__ = "Budgets"   
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    itinerary_id = db.Column(db.Integer, db.ForeignKey('Itineraries.id'), nullable=False)
    activity_id = db.Column(db.Integer, db.ForeignKey('Activity.id'), nullable=False)
    activity_budget = db.Column(db.Float, nullable=True)
    total_amount = db.Column(db.Float, nullable=False)
    
    def __init__(self, itinerary_id , total_amount, activity_id, activity_budget):
        self.itinerary_id = itinerary_id       
        self.total_amount = total_amount
        self.activity_id = activity_id
        self.activity_budget = activity_budget
        
class Notification(db.model):
    __tablename__ = "Notifications"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    itinerary_id = db.Column(db.Integer, db.ForeignKey('Itineraries.id'), nullable=False)
    notification_message = db.Column(db.String(200), nullable=False)
    
    
if __name__ == "__main__":
    app.run(debug=True)       

