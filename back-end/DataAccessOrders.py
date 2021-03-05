from DataAccess import DataAccess
from bson.objectid import ObjectId
class DataAccessOrders(DataAccess):
    
    def get_orders_inPeriod(self, firsDate, secondDate):
        self.imagesCollection = self.mydb['orders']
        result = self.imagesCollection.find( )
    
    def insert_order(self):
        pass
    #  db.orders.insert({"name":"string","secondName":"string", "telephon":"number","email":"string","date":"date", "time":"string"})?

    def addOrder(self, order):
        self.mycollection = self.mydb['orders']
        self.mycollection.insert_one({"name":order.name,"telefon":order.telefon, "email":order.email, "location":order.location,"date":order.date,"time":order.time, "eventType":order.eventType,"note":order.note})

    def updateOrder(self, order):
        self.mycollection = self.mydb['orders']
        myquery = { "_id": order.id }
        newvalues = { "$set": {"name":order.name,"telefon":order.telefon, "email":order.email, "location":order.location,"date":order.date,"time":order.time, "eventType":order.eventType,"note":order.note } }     
        self.mycollection.update_one(myquery, newvalues)

 

 
    

    def deleteOrder(self, orderId):
        self.mycollection = self.mydb['orders']
        myquery = { '_id':ObjectId(orderId)}
        self.mycollection.delete_one(myquery)
        return True

    def getOrders(self):
        self.orderCollection = self.mydb['orders']
        orders = []
        result = self.orderCollection.find( )
        
        for order in result:
            print(order.get('_id'))
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
        print(orders)
        return orders

# c= DataAccessOrders()
# c.getOrders() 