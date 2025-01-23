from flask import Flask, jsonify, request
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import User
from exts import db
#from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object(DevConfig)
CORS(app)

db.init_app(app)


migrate = Migrate(app, db)

api = Api(app, doc='/docs')

User_model = api.model(
    'User',
    {
        "id": fields.Integer(description='The unique identifier of a user.'),
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
class UsersResource(Resource):
    @api.marshal_list_with(User_model)
    def get(self):
        
        users = User.query.all()
        
        return users
        
    @api.marshal_with(User_model)
    def post(self):
        
        data=request.get_json()
        
        new_user=User(
            name=data.get('name'),
            email=data.get('email'),
            phone_number=data.get('phone_number')
        )
        new_user.save()
        
        return new_user, 201
           
        
    
    
@api.route('/User/<int:id>')
class UserResource(Resource):
     
     @api.marshal_with(User_model)
     def get(self,id):
         #get user by id
        user=User.query.get_or_404(id)
        
        return user
    
     @api.marshal_with(User_model)
     def put(self,id):
         
         user_to_update=User.query.get_or_404(id)
         
         data=request.get_json()
         
         user_to_update.update(
             data.get('name'),
             data.get('email'),
             data.get('phone_number')
             
         )
         return user_to_update, 200
     
     @api.marshal_with(User_model)
     
     def delete(self, id):
         user_to_delete=User.query.get_or_404(id)
         
         user_to_delete.delete()
         
         return {'message': 'User deleted successfully.'}, 200
     
    
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

