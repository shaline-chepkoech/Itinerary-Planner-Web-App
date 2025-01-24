from flask import Flask, jsonify, request
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import User
from models import Itinerary
from exts import db
from flask_migrate import Migrate
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify


app = Flask(__name__)
app.config.from_object(DevConfig)
CORS(app)

db.init_app(app)


migrate = Migrate(app, db)

api = Api(app, doc='/docs')

Itinerary_model = api.model(
    'Itinerary',
    {
        'id': fields.Integer(description='The unique identifier of an itinerary.'),
        'title': fields.String(required=True, description='The title of the itinerary.'),
        'user_id': fields.Integer(required=True, description='The id of the user who created the itinerary.'),
        'destination': fields.String(required=True, description='The destination of the itinerary.'),
        'details': fields.String(required=True, description='The details of the itinerary.'),
        'date': fields.Date(required=True, description='The date of the itinerary.')
        }
    )

User_model = api.model(
    'User',
    {
        "id": fields.Integer(description='The unique identifier of a user.'),
        'username': fields.String(required=True, description='The name of the user.'),
        'email': fields.String(required=True, description='The email of the user.'),
        'phone_number': fields.String(required=True, description='The phone number of the user.')
    }
)
signup_model = api.model(
    'Signup',
    {
        'username': fields.String(required=True, description='The username for the user.'),
        'email': fields.String(required=True, description='The email for the user.'),
        'phone_number': fields.String(required=True, description='The phone number for the user.'),
        'password': fields.String(required=True, description='The password for the user.')
    }
    )

@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {'message': 'Hello, World!'}
  
@api.route('/signup')
class Signup(Resource): 
    @api.expect(signup_model)
    def post(self):
        data=request.get_json()
        
        username=data.get('username')
        
        db_user=User.query.filter_by(username=username).first()
        
        if db_user is not None:
            return jsonify({"message":f"user with username {username} already exists"})
            
        new_user=User(
            username=data.get('username'),
            email=data.get('email'),
            phone_number=data.get('phone_number'),
            password=generate_password_hash(data.get('password'))
        )
        
        new_user.save()
        
        return jsonify({"message":"user created successfully"})
        
        
    
@api.route('/login')
class Login(Resource):
    def post(self):
        pass
        

@api.route('/Itinerary')
class ItinerariesResource(Resource):
    @api.marshal_list_with(Itinerary_model)
    def get(self):
        
        itineraries = Itinerary.query.all()
        
        return itineraries
    
    @api.marshal_with(Itinerary_model)
    @api.expect(Itinerary_model)
    def post(self):
        
        data=request.get_json()
        
        new_itinerary=Itinerary(
            title=data.get('title'),
            user_id=data.get('user_id'),
            destination=data.get('destination'),
            details=data.get('details'),
            date=data.get('date')
        )
        new_itinerary.save()
        return new_itinerary, 201  
                      
    
@api.route('/Itinerary/<int:id>')
class ItineraryResource(Resource):
    @api.marshal_with(Itinerary_model)
    def get(self, id):
        itinerary = Itinerary.get_or_404(id)
        
        return itinerary
    
    @api.marshal_with(Itinerary_model)
    
    def put(self, id):
        itinerary_to_update=Itinerary.get_or_404(id)
        data=request.get_json()
        itinerary_to_update(
            data.get('title'),
            data.get('user_id'),
            data.get('destination'),
            data.get('details'),
            data.get('date')
            
            )
        return itinerary_to_update, 200
    
    
        
    @api.marshal_with(Itinerary_model)
    
    def delete(self, id):
        itinerary_to_delete=Itinerary.get_or_404(id)
        itinerary_to_delete.delete()
        
        return {"message": "Itinerary deleted successfully"}, 200
    

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
            username=data.get('username'),
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
             data.get('username'),
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
            'User': User,
            "Itinerary": Itinerary
            
            }
   
    
# class Itinerary(db.Model):
#     __tablename__ = "Itineraries"
    

    
#     def __init__(self, user_id, destination, date, details, budgets):
#         self.user_id = user_id
#         self.destination = destination
#         self.date = date
#         self.details = details
        #self.budgets = budgets
        
        
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

