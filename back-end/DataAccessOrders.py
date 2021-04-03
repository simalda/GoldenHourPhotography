from DataAccess import DataAccess
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
        self.collection.delete_one(myquery)
        return True

    def get_orders(self):
        orders = []
        self.collection = self.mydb['orders']
        result = self.collection.find( )     
        for order in result:
            orders.append({
            "id":str(order.get('_id')),
            "date":  order["date"],
            "time" : order["time"],
            "name":order["name"],
            "telefon":order["telefon"],
            "email":order["email"],
            "location":order["location"],
            "eventType":order["eventType"],
            "note":order["note"],             
        })
        return orders

 