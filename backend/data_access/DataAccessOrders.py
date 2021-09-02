from .DataAccess import DataAccess
from bson.objectid import ObjectId
class DataAccessOrders(DataAccess):
    
    def get_orders_in_period(self, firs_date, second_date):
        self.collection = self.mydb['orders']
        result = self.collection.find( )

    def add_order(self, order):
        self.collection = self.mydb['orders']
        self.collection.insert_one({"name":order.name,"telefon":order.telefon, "email":order.email,
        "location":order.location,"date":order.date,"time":order.time, "eventType":order.eventType,"note":order.note})

    def update_order(self, order):
        self.collection = self.mydb['orders']
        myquery = { "_id": order.id }
        newvalues = { "$set": {"name":order.name,"telefon":order.telefon, "email":order.email,
         "location":order.location,"date":order.date,"time":order.time, "eventType":order.eventType,"note":order.note } }     
        self.collection.update_one(myquery, newvalues)






    def delete_order(self, orderId):
        self.collection = self.mydb['orders']
        myquery = { '_id':ObjectId(orderId)}
        return  self.collection.delete_one(myquery)

    def get_orders(self):
        self.collection = self.mydb['orders']
        return list(map(lambda order: {
            "id":str(order.get('_id')),
            "date":  order["date"],
            "time" : order["time"],
            "name":order["name"],
            "telefon":order["telefon"],
            "email":order["email"],
            "location":order["location"],
            "eventType":order["eventType"],
            "note":order["note"],             
        } ,self.collection.find()))
         

 