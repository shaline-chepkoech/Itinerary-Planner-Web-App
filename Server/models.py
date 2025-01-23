from exts import db

class User(db.Model):
    __tablename__ = "Users"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), unique=True)
    phone_number = db.Column(db.String(15), unique=True)  
    password = db.Column(db.Text(), nullable=False)
    
    def __repr__(self):
        return f'<User {self.username}>'
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
    def update(self, name, email, phone_number):
        self.name = name
        self.email = email
        self.phone_number = phone_number        
        db.session.commit()
        
        
#Itinerary model

        
class Itinerary(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    details = db.Column(db.String(100), nullable=False)
    #budgets = db.relationship('Budget', backref='itinerary')
    date = db.Column(db.Date, nullable=False)
    
    
    def __repr__(self):
        return f'<Itinerary {self.id}>'
        