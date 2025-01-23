from flask import Flask, jsonify
from flask_restx import Api, Resource
from config import DevConfig
from models import User
from exts import db
#from flask_sqlalchemy import SQLAlchemy
#from flask_migrate import Migrate
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object(DevConfig)
CORS(app)

db.init_app(app)

api = Api(app, doc='/docs')

User_model = api.model(
    'User',
    {
        'id': fields.Integer(description='The unique identifier of a user.'),
        'name': fields.String(required=True, description='The name of the user.'),
        'email': fields.String(required=True, description='The email of the user.'),
        'phone_number': fields.String(required=True, description='The phone number of the user.')
    }
)

@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {'message': 'Hello, World!'}
    
@api.route('/User')
class UserResource(Resource):
    @api.marshal_list_with(User)
    def get(self):
        
        User=User.query.all()
        
        return User
        
    
    def post(self):
        pass
    
    
@api.route('/User/<int:id>')
class UserResource(Resource):
     def get(self,id):
         pass
     
     def put(self,id):
         pass
     
     def delete(self, id):
         pass
     
    
@app.shell_context_processor
def make_shell_context():
    return {
            'db': db, 
            'User': User
            }


#db = SQLAlchemy(app) 


#migrate = Migrate(app, db)



   
    
# class Itinerary(db.Model):
#     __tablename__ = "Itineraries"
    
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
#     destination = db.Column(db.String(100), nullable=False)
#     details = db.Column(db.String(100), nullable=False)
#     #budgets = db.relationship('Budget', backref='itinerary')
#     date = db.Column(db.Date, nullable=False)
    
#     def __init__(self, user_id, destination, date, details, budgets):
#         self.user_id = user_id
#         self.destination = destination
#         self.date = date
#         self.details = details
#         #self.budgets = budgets
        
        
# class Activity(db.Model):
#     __tablename__ = "Activities"
    
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     itinerary_id = db.Column(db.Integer, db.ForeignKey('Itineraries.id'), nullable=False)
#     activity_name = db.Column(db.String(100), nullable=False)
#     duration = db.Column(db.String(10), nullable=False)
    
#     def __init__(self, itinerary_id, activity_name, duration):
#         self.itinerary_id = itinerary_id
#         self.activity_name = activity_name
#         self.duration = duration
        
        
# class Budget(db.Model):
#     __tablename__ = "Budgets"   
    
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     itinerary_id = db.Column(db.Integer, db.ForeignKey('Itineraries.id'), nullable=False)
#     activity_id = db.Column(db.Integer, db.ForeignKey('Activity.id'), nullable=False)
#     activity_budget = db.Column(db.Float, nullable=True)
#     total_amount = db.Column(db.Float, nullable=False)
    
#     def __init__(self, itinerary_id , total_amount, activity_id, activity_budget):
#         self.itinerary_id = itinerary_id       
#         self.total_amount = total_amount
#         self.activity_id = activity_id
#         self.activity_budget = activity_budget
        
# class Notification(db.model):
#     __tablename__ = "Notifications"
    
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     itinerary_id = db.Column(db.Integer, db.ForeignKey('Itineraries.id'), nullable=False)
#     notification_message = db.Column(db.String(200), nullable=False)
    
    
    
if __name__ == "__main__":
    app.run(debug=True)       

